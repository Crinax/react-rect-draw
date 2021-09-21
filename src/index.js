import React from 'react';
import ReactDOM from 'react-dom';
import './general.css';

class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isHold: false,
      position: { x: 0, y: 0 },
      startPos: { x: false, y: false },
      rectWidth: 0,
      rectHeight: 0,
    };

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.drawRect = this.drawRect.bind(this);
    this.restorePositions = this.restorePositions.bind(this);
  }

  get randomColor() {
    const alphabet = '0123456789ABCDEF';
    let color = '#';
    
    for (let i = 0; i < 8; i++)
      color += alphabet[Math.floor(Math.random() * 16)];

    return color;
  }

  drawRect(position) {
    let startPos = this.state.startPos;
    const ctx = this.refs.canvas.getContext('2d');
    
    if (startPos.x === false || startPos.y === false) {
      ctx.fillStyle = this.randomColor;
      startPos = position;
      this.setState({ startPos: position });
    }
    
    const { width, height } = this.refs.canvas;
    ctx.clearRect(0, 0, width, height);

    ctx.fillRect(startPos.x, startPos.y, position.x - startPos.x, position.y - startPos.y);
  }
  
  restorePositions() {
    if (this.state.startPos.x !== false) {
      this.setState({
        startPos: { x: false, y: false },
      });
    }
  }

  handleMouseMove(e) {
    const [x, y] = [e.clientX, e.clientY];
    const position = { x, y };

    this.setState({ position });

    if (e.nativeEvent.which === 1) this.drawRect(position);
      else this.restorePositions();
  }

  render() {
    return (
      <canvas
        ref="canvas"
        className="canvas"
        width={ window.innerWidth }
        height={ window.innerHeight }
        onMouseMove={ this.handleMouseMove }
      ></canvas>
    );
  }
}

ReactDOM.render(
  <Canvas></Canvas>,
  document.getElementById('root')
)