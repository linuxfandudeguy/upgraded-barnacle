const express = require('express');
const { createCanvas } = require('canvas');
const path = require('path');

const app = express();
const PORT = 3000;

// Define grid size and canvas size
const GRID_SIZE = 16; // 16x16 grid
const CANVAS_SIZE = 640; // 640x640 canvas
const PIXEL_SIZE = CANVAS_SIZE / GRID_SIZE; // Pixel size dynamically calculated

// Color map for base10 colors
const COLOR_MAP = {
  0: '#000000', // black
  1: '#FFFFFF', // white
  2: '#FF0000', // red
  3: '#00FF00', // green
  4: '#0000FF', // blue
  5: '#FFFF00', // yellow
  6: '#FF00FF', // magenta
  7: '#00FFFF', // cyan
  8: '#FFA500', // orange
  9: '#808080', // gray
};

// Function to draw the bitmap on a canvas
function drawBitmap(bitmap) {
  const canvas = createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  const ctx = canvas.getContext('2d');

  const rows = bitmap.split('-');
  rows.forEach((row, rowIndex) => {
    row.split('').forEach((colorCode, colIndex) => {
      const color = COLOR_MAP[colorCode] || '#000000';
      ctx.fillStyle = color;
      ctx.fillRect(colIndex * PIXEL_SIZE, rowIndex * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
    });
  });

  return canvas;
}

// Attempt to serve static files from /views directory
const viewsDir = path.join(__dirname, 'views');
app.use(express.static(viewsDir));

// API endpoint to generate an image from a bitmap
app.get('/generate', (req, res) => {
  const { bitmap } = req.query;

  if (!bitmap || typeof bitmap !== 'string' || bitmap.split('-').length !== GRID_SIZE) {
    return res.status(400).send('Invalid bitmap. Must be 16 lines of 16 digits each.');
  }

  try {
    const canvas = drawBitmap(bitmap);
    res.setHeader('Content-Type', 'image/png');
    canvas.createPNGStream().pipe(res);
  } catch (err) {
    res.status(500).send('Error generating image.');
  }
});

// Handle cases where the /views directory doesn't exist (404 error for invalid static paths)
app.use((req, res) => {
  res.status(404).send('404: Cannot GET ');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
