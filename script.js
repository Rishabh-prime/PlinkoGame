const canvas = document.getElementById("plinkoCanvas");
const ctx = canvas.getContext("2d");
// canvas.style.backgroundColor = "black";

const DECIMAL_MULTIPLIER = 10000;

// !! Constants that we need

const WIDTH = 800;
const HEIGHT = 800;
const ballRadius = 7;
const obstacleRadius = 4;
const gravity = pad(0.2);
const horizontalFriction = 0.4;
const verticalFriction = 0.8;
let balls = [];

const obstacles = [];
const sinks = [];

// ! X axis logic 
function pad(n) {
    return n * DECIMAL_MULTIPLIER;
}
function unpad(n) {
    return Math.floor(n / DECIMAL_MULTIPLIER);
}

// !! Creating the obstacles 
const rows = 16;
for (let row = 2; row < rows; row++) {
    const numObstacles = row + 1;
    const y = 0 + row * 35;
    const spacing = 36;
    for (let col = 0; col < numObstacles; col++) {
        const x = WIDTH / 2 - spacing * (row / 2 - col);
        obstacles.push({ x: pad(x), y: pad(y), radius: obstacleRadius });
    }
}

// !! Creating the sinks
const sinkWidth = 36;
const NUM_SINKS = 15;
const sinkTexts = [7, 6, 5, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5, 6, 7];

for (let i = 0; i < NUM_SINKS; i++) {
    const x = WIDTH / 2 + (i - 15 / 2) * (sinkWidth) + obstacleRadius;
    const y = HEIGHT - 230;
    const width = sinkWidth;
    const height = width;
    sinks.push({ id: i + 1, className: 'sink', x, y, width, height, text: sinkTexts[i] });
}

// !! Creating the balls

class Ball {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.vx = 0;
        this.vy = 0;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(unpad(this.x), unpad(this.y), this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.vy = this.vy + gravity;
        this.x += this.vx;
        this.y += this.vy;

        obstacles.forEach(obstacle => {
            const distance = Math.hypot(this.x - obstacle.x, this.y - obstacle.y);
            if (distance < pad(this.radius + obstacle.radius)) {
                const angle = Math.atan2(this.y - obstacle.y, this.x - obstacle.x);
                const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                this.vx = (Math.cos(angle) * speed * horizontalFriction);
                this.vy = (Math.sin(angle) * speed * verticalFriction);
                const overlap = this.radius + obstacle.radius - unpad(distance);
                this.x += pad(Math.cos(angle) * overlap);
                this.y += pad(Math.sin(angle) * overlap);
            }
        });

        sinks.forEach(sink => {
            if (
                unpad(this.x) > sink.x - sink.width / 2 &&
                unpad(this.x) < sink.x + sink.width / 2 &&
                unpad(this.y) < this.radius > sink.y - sink.height / 2
            ) {
                this.vx = 0;
                this.vy = 0;
            }
        });
    }
}

// !! Initializing the balls

const initialBall = new Ball(pad(WIDTH / 2 + 23), pad(50), ballRadius, 'yellow');
balls.push(initialBall);

function drawObstacles() {
    ctx.fillStyle = 'yellow';
    obstacles.forEach(obstacle => {
        ctx.beginPath();
        ctx.arc(unpad(obstacle.x), unpad(obstacle.y), obstacle.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    });
}

function drawSinks() {
    for (let i = 0; i < sinks.length; i++) {
        const sink = sinks[i];

        ctx.fillStyle = 'yellow';
        ctx.fillRect(sink.x, sink.y - sink.height / 2, sink.width - obstacleRadius * 2, sink.height);

        ctx.fillStyle = 'black';
        ctx.font = '16px Arial';
        const text = sink.text.toString();
        const textWidth = ctx.measureText(text).width;
        const textX = sink.x + (sink.width - textWidth) / 2 - obstacleRadius;
        const textY = sink.y + (sink.height / 4) - 8;  // Adjusting to vertically center the text
        ctx.fillText(text, textX, textY);
    }
}

function addBall() {
    const newBall = new Ball(pad(WIDTH / 2 + 13), pad(50), ballRadius, 'yellow');
    balls.push(newBall);
}

document.getElementById('add-ball').addEventListener('click', addBall);

function draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    drawObstacles();
    drawSinks();
    balls.forEach(ball => {
        ball.draw();
        ball.update();
    });
}

function update() {
    draw();
    requestAnimationFrame(update);
}

update();
