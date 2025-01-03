import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import "./Welcome.css";

function Welcome() {
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = React.useState(true);
  const handleExploreClick = () => {
    setShowWelcome(false);
    setTimeout(() => {
        navigate('/home');
    }, 500);
  }
  return (
    <CSSTransition 
        in={showWelcome}
        timeout={500}
        classNames="welcome"
        unmountOnExit
    >
        <div className="welcome">
            <h1>Welcome to SortVitz</h1>
            <p>Visualize sorting algorithms efficiently</p>
            <button onClick={handleExploreClick}>Explore</button>
          </div>
    </CSSTransition>
  );
}

export default Welcome;
