const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const bg_colour = window.getComputedStyle(document.querySelector('body')).backgroundColor
const width = canvas.width = 1920;
const height = canvas.height = 1080;
const mazeRow = (height / 30) - 1;
const mazeColumn = (width / 30) - 1;
let maze = [];

function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

function Block(x, y, color, size) {

    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
    this.visited = false;
}

Block.prototype.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.rect(this.x, this.y, this.size, this.size);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.rect(this.x + 1, this.y + 1, this.size - 2, this.size - 2);
    ctx.fill();
}
Block.prototype.drawMoving = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.rect(this.x, this.y, this.size, this.size);
    ctx.fill();
}

Block.prototype.delete = function () {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.rect(this.x, this.y, this.size, this.size);
    ctx.fill();
}

Block.prototype.update = function (x, y) {
    this.x = x;
    this.y = y;
}

Block.prototype.removeWall = function (direction) {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    let size = this.size - 2;
    switch (direction) {
        case 'up':
            ctx.rect(this.x + 1, this.y - 2, size, size);
            break;
        case 'down':
            ctx.rect(this.x + 1, this.y + 3, size, size);
            break;
        case 'left':
            ctx.rect(this.x - 2, this.y + 1, size, size);
            break;
        case 'right':
            ctx.rect(this.x + 3, this.y + 1, size, size);
            break;

    }
    ctx.fill();
}

function unvisitedNeighbors(x, y) {
    let unvisitedNeighbors = [];
    if (x < mazeColumn && !maze[y][x + 1].visited) {
        unvisitedNeighbors.push([x + 1, y, 'right']);
    }
    if (y < mazeRow && !maze[y + 1][x].visited) {
        unvisitedNeighbors.push([x, y + 1, 'down']);
    }
    if (x > 0 && !maze[y][x - 1].visited) {
        unvisitedNeighbors.push([x - 1, y, 'left']);
    }
    if (y > 0 && !maze[y - 1][x].visited) {
        unvisitedNeighbors.push([x, y - 1, 'up']);
    }
    return unvisitedNeighbors;
}

function createGrid() {
    let size = 30;
    let block;
    for (let i = 0; i < height; i += 30) {
        let row = []
        for (let j = 0; j < width; j += 30) {
            block = new Block(j, i, 'black', size);
            row.push(block);
            block.draw();
        }
        maze.push(row);
    }
}

function randomUnvisitedNeighbor(x, y) {
    let neighbors = unvisitedNeighbors(x, y);
    let randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
    return randomNeighbor;
}

function randomizedDFS(x, y) {
    maze[y][x].visited = true;
    let nextBlock = randomUnvisitedNeighbor(x, y);
    while (nextBlock != undefined) {
        maze[y][x].removeWall(nextBlock[2]);
        randomizedDFS(nextBlock[0], nextBlock[1]);
        nextBlock = randomUnvisitedNeighbor(x, y);
    }
}

function createMaze() { 
    randomizedDFS(0, 0);
}

createGrid();
createMaze();