import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import "./Welcome.css";

function Welcome() {
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  const handleExploreClick = () => {
    setShowWelcome(false);
    setTimeout(() => {
      navigate('/home');
    }, 500);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <CSSTransition
      in={showWelcome}
      timeout={500}
      classNames="welcome"
      unmountOnExit
    >
      <div className="welcome">
        <h1>Welcome to SortVitz</h1>
        <p>A platform to help you Visualize Algorithms</p>
        <p>Learn and explore various algorithms</p>
        <div className="feature-buttons">
          <button onClick={handleExploreClick}>Start Learning</button>
          <button onClick={toggleDarkMode}>
            {darkMode ? 'Dark Mode' : 'Light Mode'}
          </button>
        </div>
      </div>
    </CSSTransition>
  );
}

export default Welcome;

