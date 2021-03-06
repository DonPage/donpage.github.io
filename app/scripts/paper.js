/**
 * @function pen
 * @description - this function will handle drawing on canvas.
 * @param {HTMLElement} canvas - canvas element.
 * @return {Object}
 */
const pen = (canvas) => {
  const input = document.getElementById('occupation');

  const drawing = {
    state: false,
    map: {
      mousedown: (cords) => drawing.actions.start(cords),
      mousemove: (cords) => drawing.actions.move(cords),
      mouseup: (cords) => drawing.actions.stop(cords),
    },
    line: canvas.getContext('2d'),
    actions: {
      start: (cords) => {
        drawing.line.beginPath();
        drawing.line.moveTo(cords.x, cords.y);
        drawing.line.smoothingTimeConstant = true;
        drawing.line.antialias = true;
        drawing.state = true;
        // when starting, remove all pointer events from input
        canvas.style.zIndex = '999';
      },
      move: (cords) => {
        if (drawing.state === true) {
          canvas.style.zIndex = '999';
          drawing.line.smoothingTimeConstant = true;
          drawing.line.antialias = true;
          drawing.line.strokeStyle = '#fff';
          drawing.line.lineJoin = 'round';
          drawing.line.lineWidth = 5;
          drawing.line.lineTo(cords.x, cords.y);
          drawing.line.stroke();
        }
      },
      stop: () => {
        if (drawing.state === true) {
          drawing.state = false;
          canvas.style.zIndex = '0';
        }
      },
      draw: (e) => {
        const cords = {x: e.clientX, y: e.clientY};
        drawing.map[e.type](cords)
      }
    },
  };

  return drawing
};
