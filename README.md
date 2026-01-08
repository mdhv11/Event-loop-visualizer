# Event Loop Visualizer

**Understand JavaScript Asynchrony Visually.**

This project is an interactive educational tool designed to help developers visualize and understand the JavaScript Event Loop. It simulates how the Call Stack, Web APIs, Callback Queue, and Microtask Queue interact to execute synchronous and asynchronous code.

## 🚀 Features

-   **Interactive Visualization**: Watch tasks move between the Stack, Web APIs, and Queues in real-time.
-   **Step-by-Step Execution**: Control the flow with Run, Pause, and Reset buttons.
-   **Code Templates**: Choose from preset scenarios like:
    -   Synchronous Code
    -   `setTimeout` (Macrotasks)
    -   Promises (Microtasks)
    -   Complex Nesting & Chaining
-   **Live Code Editor**: Write and run your own custom code snippets to test specific behaviors.
-   **Event Loop Animation**: A central rotating icon that visually indicates when the Event Loop is actively transferring tasks from queues to the stack.
-   **Console Output**: See the exact order in which your code logs output.
-   **Premium UI**: A modern, dark-mode interface with glassmorphism effects and smooth animations.

## 🛠️ Tech Stack

-   **React** (Vite)
-   **Framer Motion** (Animations)
-   **PrismJS** (Syntax Highlighting)
-   **CSS Modules** (Styling)

## 📦 Installation & Usage

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/event-loop-visualizer.git
    cd event-loop-visualizer
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    # or
    yarn run dev
    ```

4.  **Open in Browser**:
    Visit the URL shown in your terminal (usually `http://localhost:5173`).

## 🎮 How to Use

1.  **Select a Template**: Use the dropdown in the top header to load a code example.
2.  **Edit Code (Optional)**: Modify the code in the editor on the left panel.
3.  **Run**: Click the **Run** button to start the simulation.
4.  **Observe**:
    -   **Call Stack**: Shows the currently executing function.
    -   **Web APIs**: Shows async operations like timers waiting to complete.
    -   **Queues**: See tasks waiting in the **Callback Queue** (Macrotasks) and **Microtask Queue** (Promises).
    -   **Event Loop**: Watch the central icon spin when it pushes tasks to the stack.
    -   **Console**: View the output logs.

## 🤝 Contribution

Feel free to fork this project and submit pull requests. Suggestions and improvements are welcome!
