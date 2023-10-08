import React from 'react';
import './App.css';
import Model, { Board, Group } from './model/Model.js'; // Import the Group class
import redrawCanvas from './boundary/Boundary.js';
import processClick from './controller/Controller';
import { selectGroup } from './controller/Controller';
import resetHandler from './controller/ResetController';
import { clockwiseHandler, counterClockwiseHandler } from './controller/RotateController';

function App() {
  const [model, setModel] = React.useState(new Model());
  const [redraw, forceRedraw] = React.useState(0);

  const appRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  const handleConfigClick = (configIndex) => {
    const newModel = new Model();
    newModel.currentConfig = configIndex;
    newModel.board = new Board(newModel.configs[newModel.currentConfig]);
    setModel(newModel);
  }

  React.useEffect (() => {
    redrawCanvas(model, canvasRef.current, appRef.current);
  }, [model, redraw])

  const handleClick = (e) => {
    const canvasRect = canvasRef.current.getBoundingClientRect();
    let x = Math.round(e.clientX - canvasRect.left);
    let y = Math.round(e.clientY - canvasRect.top);
    processClick(model, canvasRef.current, x , y);
  }

  return (
    <div className="App">
      <p>This is</p>
      <canvas
        tabIndex="1"
        className="App-canvas"
        ref={canvasRef}
        width="400"
        height="400"
        onClick={handleClick}
      />

      {/* Render the groups */}
      <div className="groups-container">
        {model.board.groups.map((group, index) => (
          <div key={index} className="group">
            <p>Group {index + 1}</p>
            {group.squares.map((square, squareIndex) => (
              <div
                key={squareIndex}
                className="square"
                style={{ backgroundColor: square.color }}
              ></div>
            ))}
            <p>Color: {group.hasSameColor() ? group.squares[0].color : 'Mixed'}</p>
          </div>
        ))}
      </div>

      <button className="reset_button" onClick={() => resetHandler(model, canvasRef.current)}>Reset</button>
      <button className="config_4x4_button" onClick={() => handleConfigClick(0)}>4x4</button>
      <button className="config_5x5_button" onClick={() => handleConfigClick(1)}>5x5</button>
      <button className="config_6x6_button" onClick={() => handleConfigClick(2)}>6x6</button>
      <button className="clockwise_button" onClick={() => clockwiseHandler(model, canvasRef.current)}>Clockwise</button>
      <button className="counterClockwise_button" onClick={() => counterClockwiseHandler(model, canvasRef.current)}>CounterClockwise</button>
    </div>
  );
}

export default App;
