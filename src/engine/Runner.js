import { ACTION_TYPES } from './types';

// Simple ID generator
let idCounter = 0;
const nextId = () => ++idCounter;

/**
 * Parses the code and simulates execution.
 * This is a SIMPLIFIED implementation that uses regex to find specific patterns.
 * In a real-world scenario, you'd use an AST parser (Babel/Acorn).
 * 
 * Supported patterns:
 * - console.log('...')
 * - setTimeout(() => { ... }, delay)
 * - Promise.resolve().then(() => { ... })
 */
export function runSimulation(code) {
    const steps = [];
    const webApis = [];
    const callbackQueue = [];
    const microtaskQueue = [];

    // Helper to add a step
    const addStep = (type, payload) => {
        steps.push({ type, payload });
    };

    // We wrap the code parsing in a way that we can "execute" it linearly for the main stack,
    // and schedule async things.


    // We will iterate through lines and determining "Execution Contexts"
    // For this demo, we'll manually simulate the well-known example flow.
    // Ideally, we would evaluate the code string in a sandbox with proxied WebAPIs,
    // but for safety and control in this visualizer steps, we will parse.

    // Let's try a Hybrid approach:
    // We can use `Function` constructor with mocked globals to actually RUN the code,
    // and our mocks will record the actions!

    try {
        // Mock Console
        const mockConsole = {
            log: (msg) => {
                addStep(ACTION_TYPES.PUSH_STACK, { id: nextId(), name: 'console.log' });
                addStep(ACTION_TYPES.CONSOLE_LOG, msg);
                addStep(ACTION_TYPES.POP_STACK, null);
            }
        };

        // Mock SetTimeout
        // We need to store the callback to run it later
        const mockSetTimeout = (callback, delay) => {
            const id = nextId();
            addStep(ACTION_TYPES.PUSH_STACK, { id: nextId(), name: 'setTimeout' });
            addStep(ACTION_TYPES.ADD_WEB_API, { id, name: 'Timer', timeLeft: delay, callback });
            addStep(ACTION_TYPES.POP_STACK, null);

            // Schedule the timer completion
            // In our simulation, we treat delay as relative order.
            // We will sort tasks by delay.
            webApis.push({ id, delay, callback, type: 'timer' });
        };

        // Mock Promise
        // We only support Promise.resolve().then(...) for this demo
        // We'll return a mock object that has a .then()
        const mockPromise = {
            resolve: () => {
                return {
                    then: (callback) => {
                        const id = nextId();
                        addStep(ACTION_TYPES.PUSH_STACK, { id: nextId(), name: 'Promise.then' });
                        addStep(ACTION_TYPES.ENQUEUE_MICROTASK, { id, name: 'Promise Callback', callback });
                        addStep(ACTION_TYPES.POP_STACK, null);

                        microtaskQueue.push({ id, callback });
                    }
                };
            }
        };

        // ---- EXECUTE SCRIPT (Synchronous Phase) ----
        addStep(ACTION_TYPES.PUSH_STACK, { id: nextId(), name: 'main' });

        // Use a safe-ish evaluation with mocked scope variables
        // Note: 'new Function' creates a function with the code as body.
        // We pass our mocks as arguments.
        // We are expecting the user code to be valid JS.
        const runUserCode = new Function('console', 'setTimeout', 'Promise', code);

        runUserCode(mockConsole, mockSetTimeout, mockPromise);

        addStep(ACTION_TYPES.POP_STACK, null); // Main script finishes

        // ---- EVENT LOOP PHASE ----

        // 1. Process Microtasks (Promises)
        // In JS, Microtasks drain completely before the next task.
        while (microtaskQueue.length > 0) {
            const task = microtaskQueue.shift();
            addStep(ACTION_TYPES.DEQUEUE_MICROTASK, { id: task.id });
            addStep(ACTION_TYPES.PUSH_STACK, { id: nextId(), name: 'Microtask' });

            // Run the callback (it might log things)
            task.callback();

            addStep(ACTION_TYPES.POP_STACK, null);
        }

        // 2. Process Web APIs Completion -> Callback Queue
        // We simulate time passing. The timers sorted by delay finish and move to queue.
        webApis.sort((a, b) => a.delay - b.delay);

        for (const api of webApis) {
            addStep(ACTION_TYPES.REMOVE_WEB_API, { id: api.id });
            addStep(ACTION_TYPES.ENQUEUE_CALLBACK, { id: api.id, name: 'Timeout Callback', callback: api.callback });
            callbackQueue.push(api);
        }

        // 3. Process Task Queue
        // The Event Loop processes tasks one by one, checking microtasks in between (though here we simplified)
        while (callbackQueue.length > 0) {
            const task = callbackQueue.shift();
            addStep(ACTION_TYPES.DEQUEUE_CALLBACK, { id: task.id });
            addStep(ACTION_TYPES.PUSH_STACK, { id: nextId(), name: 'Timeout Callback' });

            // Run the callback
            task.callback();

            addStep(ACTION_TYPES.POP_STACK, null);

            // Ideally, check microtasks again here if the callback added more promises
        }

    } catch (err) {
        console.error("Simulation error:", err);
        addStep(ACTION_TYPES.CONSOLE_LOG, `Error: ${err.message}`);
    }

    return steps;
}
