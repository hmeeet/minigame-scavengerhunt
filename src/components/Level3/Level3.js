import React, { useState } from 'react';
import './Level3.css';

function Level3({ progressToNextLevel }) {

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const questions = [
    {
      question: 'What is the SI unit of force?',
      options: ['Newton', 'Watt', 'Joule', 'Pascal'],
      correctAnswer: 0
    },
    {
      question: 'Which scientist is known for the theory of relativity?',
      options: ['Isaac Newton', 'Albert Einstein', 'Galileo Galilei', 'Marie Curie'],
      correctAnswer: 1
    },
    {
      question: 'What is the speed of light in a vacuum?',
      options: ['300,000 km/s', '150,000 km/s', '200,000 km/s', '250,000 km/s'],
      correctAnswer: 0
    }  
  ];

  const handleAnswer = () => {
    const correct = selectedAnswer === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
  
    setTimeout(() => {
      if (correct) {
        if (currentQuestion + 1 < questions.length) {
          setCurrentQuestion((prev) => prev + 1);
          setSelectedAnswer(null);
          setShowFeedback(false);
        } else {
          // User has completed all questions
          progressToNextLevel();
        }
      } else {
        setShowFeedback(false);
      }
    }, 1500);
  };  

  return (
    <div className="container">
      <h2>Trivia</h2>
      <p className="trivia-question">{questions[currentQuestion].question}</p>
      {questions[currentQuestion].options.map((option, index) => (
        <div 
          key={index}
          className={`option-box ${selectedAnswer === index ? "selected" : ""}`}
          onClick={() => setSelectedAnswer(index)}
        >
          <input 
            className="option-input"
            type="radio" 
            value={index} 
            checked={selectedAnswer === index}
            onChange={() => {}}
            readOnly
          />
          {option}
        </div>
      ))}
      {!showFeedback && <button className="button" onClick={handleAnswer}>Submit Answer</button>}
      {showFeedback && (
        <div style={{ color: isCorrect ? 'white' : 'red' }}>
          {isCorrect ? "Correct!" : "Wrong Answer, Try Again!"}
        </div>
      )}
    </div>
  );
}

export default Level3;
