# SortVitz
SortVitz is an interactive web application that visualizes various sorting algorithms in an engaging and user friendly manner.
It is designed to help users understand how sorting algorithms work through step-by-step graphical representations. The platform supports multiple algorithms, customization options, and performance metrics to provide a comprehensive learning experience.

---
## Features

### 1. Interactive Sorting Visualizations
- **Supported Algorithms:**
    - Sorting Algorithms
    - Search Algorithms
    - Graph Algorithms
- Real-time graphical representation of the sorting process

### 2. Customizable Array Input
- Users can generate random arrays of numbers or input their custom arrays for sorting

### 3. Adjustable Sorting Speed
- A slider to control the speed of the sorting animation, ranging from slow to Fast

### 4. Metrics Display
- Real-time updates on:
    - Number of Comparisons
    - Number of swaps

### 5. Explanation Section
- A detailed explanation of each algorithm is displayed alongside the visualization, helping users understand the logic and steps involved.

### 6. Code Snippet
- The code implementation for the selected algorithm is displayed in an easy-to-read format.

---

## Installation and setup

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (for running the development server)
- [npm](https://www.npmjs.com/) (for package management)
- [Git](https://git.scm.com/) (for cloning the repository)

### steps
1. Clone the repository:
    ```bash
    git clone https://github.com/donnellyCodes/alx-frontend-project
    ```
2. Navigate into the project directory:
    ```bash
    cd algorithmvisualizer
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the development server:
    ```bash
    npm run dev
    ```
5. Open your web browser at:
    ```
http://localhost:3000
    ```

---

## How to use
1. **Select an Algorithm according to the category:**
    - Choose an algorithm from the list provided.
2. **Generate an array automatically or input an array manually:**
    - Use the "Generate New Array" button for a random array to pop up or enter random values to form an array
3. **Adjust Speed:**
    - Use slider to set the sorting speed
4. **Start Sorting:**
    - Click "Start Sorting* to begin the visualization
5. **Replay:**
    - Click "Replay" to replay the sorting process for review

---

## Technologies Used
    - **Frontend:** React.js, HTML, CSS
    - **Styling:** Custom CSS and Google Fonts
    - **Visualization:** Dynamic rendering using React's state management

---

## Contributing
Contributions are welcome! If you have ideas ir improvements, feel free to fork the repository and submit a pull request.

---

## License
This project is licensed under the [MIT License](LICENSE)

---



# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
