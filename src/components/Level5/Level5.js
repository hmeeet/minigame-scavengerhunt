import React, { useState } from 'react';
import './Level5.css';

function Level5({ progressToNextLevel }) {
  const [boxes, setBoxes] = useState([false, false, false, false, false]);
  const emojis = ["💻", " 🔥", "📖", "⚙️", "🚀"];
  const chosenBox = 1; // The index of the "bug" emoji which is the correct answer to the riddle

  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleClickBox = index => {
    if (index === chosenBox) {
      setIsCorrect(true);
      setShowFeedback(true);
      
      const newBoxes = [...boxes];
      newBoxes[index] = true;
      setBoxes(newBoxes);
  
      setTimeout(() => {
        handleCompletion();
      }, 1500);  
      
    } else {
      setIsCorrect(false);
      setShowFeedback(true);
      
      const newBoxes = [...boxes];
      newBoxes[index] = true;
      setBoxes(newBoxes);

      setTimeout(() => {
        newBoxes[index] = false;  
        setBoxes(newBoxes);
        setShowFeedback(false);  
      }, 1000);
    }
  };
  

  const handleCompletion = () => {
    // console.log("Congratulations! You've completed the treasure hunt!");
    // You can also trigger an animation or effect here
    progressToNextLevel();
  };
  
  

  

  return (
    <div className="container">
      <h2>Riddle</h2>
      <p>Answer the riddle and select the right digital box.</p>
      <p className="riddle">I am not alive, but I can grow; I don't have lungs, but I need air; I don't have a mouth, but water kills me. What am I?</p>
      <div className="box-grid">
        {boxes.map((box, index) => (
          <div 
            key={index}
            className={`box ${box ? "open" : ""}`}
            onClick={() => handleClickBox(index)}
          >
            {(box && index === chosenBox) ? "🏆" : emojis[index]}  {}
          </div>
        ))}
      </div>
      {showFeedback && (
        <div style={{ color: isCorrect ? 'white' : 'red' }}>
          {isCorrect ? "Fire. That's Correct!" : "Wrong Answer, Try Again!"}
        </div>
      )}
    </div>
  );
}

export default Level5;
