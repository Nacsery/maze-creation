//Author Burak Keser
export function MazeCreator() {
    //moving red block
    this.stack = [];
    this.speed = 25;
    this.executionStatus = true;
    this.reset = false;
    this.end = false;
    //Promise for animation
    this.timer = ms => new Promise(res => setTimeout(res, ms))
}

//Finds the unvisited neighbor of the given node
const unvisitedNeighbors = function (x, y, c, grid) {

    let gridRow = grid.length - 1;
    let girdColumn = grid[0].length - 1;

    let unvisitedNeighbors = [];
    //Before the rightmost node and not visited before
    if (x < girdColumn && !grid[y][x + c].visited) {
        unvisitedNeighbors.push([x + c, y, 'right']);
    }
    //Before the lowermost node and not visited before
    if (y < gridRow && !grid[y + c][x].visited) {
        unvisitedNeighbors.push([x, y + c, 'down']);
    }
    //before the leftmost node and not visited before
    if (x > 0 && !grid[y][x - c].visited) {
        unvisitedNeighbors.push([x - c, y, 'left']);
    }
    //before the upmost node and not visited before
    if (y > 0 && !grid[y - c][x].visited) {
        unvisitedNeighbors.push([x, y - c, 'up']);
    }
    return unvisitedNeighbors;
}

//Returns random neighbor from unvisited neighbor array
const randomUnvisitedNeighbor = function (x, y, grid) {
    let neighbors = unvisitedNeighbors(x, y, 1, grid);
    let randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
    return randomNeighbor;
}

//Stops the creation process till the executionStatus becomes false
MazeCreator.prototype.wait = async function () {
    while (!this.executionStatus) {
        await this.timer(1);
    }
}

MazeCreator.prototype.stackRandomizedDFS = async function (x, y, grid) {
    grid[y][x].visited = true;
    let nextBlock = randomUnvisitedNeighbor(x, y, grid);
    while (nextBlock != undefined) {
        this.stack.push([nextBlock[0], nextBlock[1], x, y, nextBlock[2]]);
        this.stackRandomizedDFS(nextBlock[0], nextBlock[1], grid);
        nextBlock = randomUnvisitedNeighbor(x, y, grid);
    }
}

MazeCreator.prototype.stackRender = async function (grid) {
    while (this.stack.length > 0) {
        let element = this.stack.shift();
        await this.wait();
        if (element) {
            await this.timer(this.speed);
            grid[element[3]][element[2]].drawInner('grey', 1, 2);
            grid[element[3]][element[2]].removeWall(element[4]);
            grid[element[1]][element[0]].drawInner('grey', 1, 2);
        }
    }
}

//wrapper function for maze creation
MazeCreator.prototype.createMaze = async function (grid) {
    this.reset = false;
    await this.stackRandomizedDFS(0, 0, grid);
    await this.stackRender(grid);
    this.stack = [];
    this.executionStatus = false;
    return this.reset;
}

MazeCreator.prototype.start = function () {
    this.executionStatus = true;
}

MazeCreator.prototype.stop = function () {
    this.executionStatus = false;
}

MazeCreator.prototype.restart = function () {
    this.reset = true;
    this.executionStatus = true;
    this.stack = []
    return this.stack.length
}