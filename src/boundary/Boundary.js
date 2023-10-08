export default function redrawCanvas(model, canvasObj, appObj) {
    const ctx = canvasObj.getContext('2d');
    const squareSize = 60;

    ctx.clearRect(0, 0, canvasObj.width, canvasObj.height);

    // Loop through all squares on the board and draw them
    for (let sq of model.board.squares) {
        if (sq.isCircle) {
            // Draw white circle for squares with isCircle property set to true
            ctx.beginPath();
            ctx.arc(
                sq.column * squareSize + squareSize / 2, // X-coordinate of circle center
                sq.row * squareSize + squareSize / 2, // Y-coordinate of circle center
                squareSize / 4, // Radius of the circle (adjust as needed)
                0,
                2 * Math.PI
            );
            ctx.fillStyle = 'white';
            ctx.fill();
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 1;
            ctx.stroke();
        } else {
            // Draw colored squares
            ctx.fillStyle = sq.color;
            ctx.fillRect(sq.column * squareSize, sq.row * squareSize, squareSize, squareSize);
        }
    }
    
    // Loop through the 2x2 groups and draw white circles at their centers
    for (let i = 0; i < model.board.size - 1; i++) {
        for (let j = 0; j < model.board.size - 1; j++) {
            const centerX = (i * squareSize + (i + 2) * squareSize) / 2;
            const centerY = (j * squareSize + (j + 2) * squareSize) / 2;

            // Draw white circle at the center
            ctx.beginPath();
            ctx.arc(centerX, centerY, squareSize / 5, 0, 2 * Math.PI);
            ctx.fillStyle = 'white';
            ctx.fill();
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }
}
