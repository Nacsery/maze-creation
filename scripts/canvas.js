//Author Burak Keser
const canvas = document.querySelector('canvas');
//canvas
const ctx = canvas.getContext('2d');

//resolution
const width = canvas.width = 1920;
const height = canvas.height = 9 * width / 16;

//size of nodes
let size = 0.015625 * width;

//row and column numbers for the array containing the maze
const mazeRow = (height / size) - 1;
const mazeColumn = (width / size) - 1;

//maze array
let maze = [];

//speed of iteration
let speed = 15;

//moving red block
let movingBlock = new Block(0, 0, 'black', size);

//Block object for the grid
function Block(x, y, color, size) {

    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
    this.visited = false;
}
//Draws an empty square for grid
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
//Deletes the inner square
Block.prototype.deleteInner = function () {
    ctx.beginPath();
    ctx.fillStyle = 'grey';
    ctx.rect(this.x + 1, this.y + 1, this.size - 2, this.size - 2);
    ctx.fill();
}
//Draws an inner square
//used by moving node
Block.prototype.drawInner = function () {
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.rect(this.x + 1, this.y + 1, this.size - 2, this.size - 2);
    ctx.fill();
}
//Deletion of the node from Screen
Block.prototype.delete = function () {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.rect(this.x, this.y, this.size, this.size);
    ctx.fill();
}
//Updates the position of the block
//Used by moving block
Block.prototype.update = function (x, y) {
    this.x = x;
    this.y = y;
}
//Removes the Wall from given direction
Block.prototype.removeWall = function (direction) {
    ctx.beginPath();
    ctx.fillStyle = 'grey';
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

//Finds the unvisited neighbor of the given node
function unvisitedNeighbors(x, y) {
    let unvisitedNeighbors = [];
    //Before the rightmost node and not visited before
    if (x < mazeColumn && !maze[y][x + 1].visited) {
        unvisitedNeighbors.push([x + 1, y, 'right']);
    }
    //Before the lowermost node and not visited before
    if (y < mazeRow && !maze[y + 1][x].visited) {
        unvisitedNeighbors.push([x, y + 1, 'down']);
    }
    //before the leftmost node and not visited before
    if (x > 0 && !maze[y][x - 1].visited) {
        unvisitedNeighbors.push([x - 1, y, 'left']);
    }
    //before the upmost node and not visited before
    if (y > 0 && !maze[y - 1][x].visited) {
        unvisitedNeighbors.push([x, y - 1, 'up']);
    }
    return unvisitedNeighbors;
}

//Creates a grid for maze creation
function createGrid() {

    let block;
    for (let i = 0; i < height; i += size) {
        let row = []
        for (let j = 0; j < width; j += size) {
            block = new Block(j, i, 'black', size);
            row.push(block);
            block.draw();
        }
        maze.push(row);
    }
}

//Promise for the animation
const timer = ms => new Promise(res => setTimeout(res, ms))

//Returns random neighbor from unvisited neighbor array
async function randomUnvisitedNeighbor(x, y) {
    let neighbors = unvisitedNeighbors(x, y);
    let randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
    return randomNeighbor;
}

//Randomized Depth First Search algorithm
//Recursively go down on a random path on the nodes
//After encountering a node with surrounding nodes visited go up on the recursion
//While travelling unblock the wall between the nodes
//displays the current node with moving red block
async function randomizedDFS(x, y) {
    maze[y][x].visited = true;
    let nextBlock = await randomUnvisitedNeighbor(x, y);
    while (nextBlock != undefined) {
        movingBlock.deleteInner();
        movingBlock.update(x * size, y * size);
        movingBlock.drawInner();
        await timer(speed);
        maze[y][x].removeWall(nextBlock[2]);
        await randomizedDFS(nextBlock[0], nextBlock[1]);
        nextBlock = await randomUnvisitedNeighbor(x, y);
    }
    //paint the last bits grey
    maze[y][x].deleteInner();
    movingBlock.deleteInner();
}

//wrapper function for maze creation
function createMaze() {
    randomizedDFS(0, 0);
}

createGrid();
createMaze();
