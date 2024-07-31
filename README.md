# Plinko Game

A simple Plinko game implemented using HTML5 Canvas and JavaScript.

## Description

This project simulates a Plinko game where balls are dropped and bounce off obstacles, eventually landing in one of the sinks at the bottom. When a ball hits a sink, the text of the sink is displayed in a separate div.

## Features

- Balls can be added by clicking a button.
- Balls interact with obstacles and are affected by gravity.
- Sinks have text labels that are displayed when a ball hits them.
- Sinks are colored green with white text.

## Getting Started

### Prerequisites

To run this project, you need a modern web browser with JavaScript enabled.


## Usage

- Click the "Add Ball" button to add a new ball to the game.
- Balls will bounce off obstacles and eventually land in one of the sinks.
- The text of the sink hit by a ball will be displayed in the `#sink-text` div.

## Files

- `index.html`: The main HTML file containing the structure of the page.
- `index.css`: The CSS file for styling the page.
- `index.js`: The JavaScript file containing the game logic.

## Code Overview

### HTML

The HTML file sets up the canvas and the "Add Ball" button:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Plinko Game</title>
    <link rel="stylesheet" href="./index.css">
</head>
<body>
     <div id="container>
    <canvas id="plinkoCanvas" width="800" height="800"></canvas>
    <div id="add-ball">Add Ball</div>
    </div>
    <script src="./index.js"></script>
</body>
</html>
