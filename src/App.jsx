import { useState, useEffect, useRef } from 'react'
import Editor from './components/Editor'
import CallStack from './components/CallStack'
import WebAPIs from './components/WebAPIs'
import CallbackQueue from './components/CallbackQueue'
import MicrotaskQueue from './components/MicrotaskQueue'
import Console from './components/Console'
import Controls from './components/Controls'
import { runSimulation } from './engine/Runner'
import { ACTION_TYPES } from './engine/types'
import { TEMPLATES } from './constants/templates'
import EventLoop from './components/EventLoop'
import './App.css'

function App() {
  const [code, setCode] = useState(TEMPLATES[0].code);

  // Visualization State
  const [callStack, setCallStack] = useState([]);
  const [webAPIs, setWebAPIs] = useState([]);
  const [callbackQueue, setCallbackQueue] = useState([]);
  const [microtaskQueue, setMicrotaskQueue] = useState([]);
  const [logs, setLogs] = useState([]);

  // Playback Control State
  const [trace, setTrace] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  // Constants
  const STEP_DELAY = 800;

  const handleTemplateChange = (e) => {
    const selectedTemplate = TEMPLATES.find(t => t.name === e.target.value);
    if (selectedTemplate) {
      handleReset();
      setCode(selectedTemplate.code);
    }
  };

  // Run Simulation to generate trace
  const handleRun = () => {
    // Reset state
    setCallStack([]);
    setWebAPIs([]);
    setCallbackQueue([]);
    setMicrotaskQueue([]);
    setLogs([]);
    setStepIndex(0);
    setIsRunning(true);

    const generatedTrace = runSimulation(code);
    setTrace(generatedTrace);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setStepIndex(0);
    setCallStack([]);
    setWebAPIs([]);
    setCallbackQueue([]);
    setMicrotaskQueue([]);
    setLogs([]);
    setTrace([]);
  };

  const processStep = (step) => {
    switch (step.type) {
      case ACTION_TYPES.PUSH_STACK:
        setCallStack(prev => [...prev, step.payload]);
        break;
      case ACTION_TYPES.POP_STACK:
        setCallStack(prev => prev.slice(0, -1));
        break;
      case ACTION_TYPES.ADD_WEB_API:
        setWebAPIs(prev => [...prev, step.payload]);
        break;
      case ACTION_TYPES.REMOVE_WEB_API:
        setWebAPIs(prev => prev.filter(item => item.id !== step.payload.id));
        break;
      case ACTION_TYPES.ENQUEUE_CALLBACK:
        setCallbackQueue(prev => [...prev, step.payload]);
        break;
      case ACTION_TYPES.DEQUEUE_CALLBACK:
        setCallbackQueue(prev => prev.slice(1));
        break;
      case ACTION_TYPES.ENQUEUE_MICROTASK:
        setMicrotaskQueue(prev => [...prev, step.payload]);
        break;
      case ACTION_TYPES.DEQUEUE_MICROTASK:
        setMicrotaskQueue(prev => prev.slice(1));
        break;
      case ACTION_TYPES.CONSOLE_LOG:
        setLogs(prev => [...prev, step.payload]);
        break;
      default:
        console.warn('Unknown step type:', step.type);
    }
  };

  // Playback Loop
  useEffect(() => {
    if (isRunning && stepIndex < trace.length) {
      timerRef.current = setTimeout(() => {
        processStep(trace[stepIndex]);
        setStepIndex(prev => prev + 1);
      }, STEP_DELAY);
    } else if (stepIndex >= trace.length && isRunning) {
      // Use setTimeout to avoid synchronous state update during render
      timerRef.current = setTimeout(() => {
        setIsRunning(false);
      }, 0);
    }

    return () => clearTimeout(timerRef.current);
  }, [isRunning, stepIndex, trace]);

  // Determine if the Event Loop should be active (spinning)
  // The Event Loop explains how the Runtime pushes tasks from Queues to the Stack.
  // So we animate only when we are about to DEQUEUE a task.
  const currentAction = trace[stepIndex];
  const isLoopActive = isRunning && currentAction && (
    currentAction.type === ACTION_TYPES.DEQUEUE_CALLBACK ||
    currentAction.type === ACTION_TYPES.DEQUEUE_MICROTASK
  );

  return (
    <div className="app-container">
      <header>
        <div className="header-left">
          <h1>Event Loop Visualizer</h1>
          <select className="template-selector" onChange={handleTemplateChange}>
            {TEMPLATES.map(t => (
              <option key={t.name} value={t.name}>{t.name}</option>
            ))}
          </select>
        </div>
        <Controls
          isRunning={isRunning}
          onRun={!trace.length || stepIndex === trace.length ? handleRun : () => setIsRunning(true)}
          onPause={handlePause}
          onReset={handleReset}
          stepIndex={stepIndex}
          totalSteps={trace.length}
        />
      </header>

      <div className="main-layout">
        <div className="left-panel">
          <Editor code={code} setCode={setCode} />
          <Console logs={logs} />
        </div>

        <div className="right-panel">
          <div className="top-row">
            <CallStack stack={callStack} />
            <div className="center-column">
              <EventLoop active={isLoopActive} />
            </div>
            <WebAPIs items={webAPIs} />
          </div>

          <div className="bottom-row">
            <CallbackQueue items={callbackQueue} />
            <MicrotaskQueue items={microtaskQueue} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
