import React, { useState } from 'react';
import './Level1.css';

function Level1({ progressToNextLevel }) {
  const [selectedWord, setSelectedWord] = useState("");
  const [selectedPositions, setSelectedPositions] = useState([]);
  const wordsToFind = ["ENTROPY", "INERTIA", "CONSERVATION", "ORBIT", "GRAVITY", "DRAG", "ATOM", "MASS", "FORCE", "ION"];
  const [foundWords, setFoundWords] = useState([]);
  
  const grid = [
    ['C', 'O', 'N', 'S', 'E', 'R', 'V', 'A', 'T', 'I', 'O', 'N'],
    ['H', 'H', 'R', 'S', 'P', 'X', 'J', 'K', 'T', 'W', 'E', 'B'],
    ['A', 'R', 'W', 'B', 'Y', 'T', 'I', 'V', 'A', 'R', 'G', 'T'],
    ['R', 'A', 'C', 'O', 'I', 'V', 'S', 'N', 'T', 'R', 'V', 'B'],
    ['D', 'D', 'V', 'M', 'A', 'T', 'E', 'O', 'O', 'H', 'O', 'A'],
    ['R', 'A', 'H', 'A', 'S', 'Y', 'R', 'E', 'M', 'E', 'G', 'I'],
    ['A', 'T', 'J', 'I', 'S', 'P', 'V', 'L', 'J', 'T', 'H', 'T'],
    ['G', 'A', 'D', 'N', 'F', 'O', 'R', 'C', 'E', 'A', 'R', 'R'],
    ['Q', 'B', 'E', 'R', 'T', 'R', 'R', 'I', 'O', 'P', 'L', 'E'],
    ['Z', 'M', 'A', 'S', 'S', 'T', 'I', 'A', 'W', 'E', 'R', 'N'],
    ['Y', 'G', 'I', 'O', 'P', 'N', 'S', 'D', 'P', 'G', 'H', 'I'],
    ['H', 'E', 'K', 'L', 'D', 'E', 'V', 'I', 'O', 'N', 'E', 'S']
  ];

  const [letterColors, setLetterColors] = useState(Array(grid.length).fill().map(() => Array(grid[0].length).fill("#CFCFCF")));

  const isAdjacent = (lastPosition, newPosition) => {
    if (!lastPosition) return true;
    const [lastRow, lastCol] = lastPosition;
    const [newRow, newCol] = newPosition;
    return Math.abs(newRow - lastRow) <= 1 && Math.abs(newCol - lastCol) <= 1;
  }

  const handleLetterClick = (letter, row, col) => {
    if (isAdjacent(selectedPositions[selectedPositions.length - 1], [row, col])) {
        setSelectedWord(prev => prev + letter);
        setSelectedPositions(prev => [...prev, [row, col]]);
        
        const newColors = [...letterColors];
        newColors[row][col] = "gold";
        setLetterColors(newColors);
    }
  }



  const checkWord = () => {
    const newColors = [...letterColors];

    if (wordsToFind.includes(selectedWord) && !foundWords.includes(selectedWord)) {
        setFoundWords(prev => [...prev, selectedWord]);

        // Make the letters gold on success
        for (let pos of selectedPositions) {
            newColors[pos[0]][pos[1]] = "green";
        }
    } else {
        // Revert back to the default color on failure
        for (let pos of selectedPositions) {
            newColors[pos[0]][pos[1]] = "#CFCFCF";
        }
    }

    setLetterColors(newColors);
    setSelectedWord("");
    setSelectedPositions([]);

    if (foundWords.length === wordsToFind.length - 1) {
        progressToNextLevel();
    }
  }
    

    return (
      <div className="container">
          <h2>Word Search</h2>
          <div className="word-grid">
              {grid.map((row, rowIndex) => (
                  <div key={rowIndex} className="grid-row">
                      {row.map((letter, colIndex) => (
                          <button
                            key={colIndex}
                            className="grid-letter"
                            style={{ color: letterColors[rowIndex][colIndex] }}
                            onClick={() => handleLetterClick(letter, rowIndex, colIndex)}
                          >
                              {letter}
                          </button>
                      
                      ))}
                  </div>
              ))}
          </div>
          <div>
              <h3>Selected Word: {selectedWord}</h3>
              <button className="button" onClick={checkWord}>Submit Word</button>
          </div>
          <div>
              <h3>Words to find:</h3>
              <div className="words-to-find-grid">
                  {wordsToFind.map((word, index) => (
                      <div key={word} className="word-item">
                          <p style={{ textDecoration: foundWords.includes(word) ? "line-through" : "none" }}>
                              {word}
                          </p>
                      </div>
                  ))}
              </div>
          </div>
      </div>
    );

}

export default Level1;
