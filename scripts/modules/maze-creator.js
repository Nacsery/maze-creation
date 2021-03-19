//Author Burak Keser
export function MazeCreator() {
    //moving red block

    this.speed = 25;
    this.executionStatus = true;
    this.reset = false;
    //Promise for animation
    this.timer = ms => new Promise(res => setTimeout(res, ms))
    this.isReset = false;//Control for reset after procedure done
}

//Finds the unvisited neighbor of the given node
const unvisitedNeighbors = function (x, y, c, grid) {

    let gridRow = grid.length - 1;;
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
const randomUnvisitedNeighbor = async function (x, y, grid) {

    let neighbors = unvisitedNeighbors(x, y, 1, grid);
    let randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
    return randomNeighbor;
}

//Randomized Depth First Search algorithm
//Recursively go down on a random path on the nodes
//After encountering a node with surrounding nodes visited go up on the recursion
//While travelling unblock the wall between the nodes
MazeCreator.prototype.randomizedDFS = async function (x, y, grid) {
    if (this.reset == true) {
        this.isReset = true;
        return;
    }
    grid[y][x].visited = true;
    let nextBlock = await randomUnvisitedNeighbor(x, y, grid);
    while (nextBlock != undefined && !this.reset) {
        //github pages let red flakes sometimes without await.
        grid[y][x].drawInner('grey', 1, 2);
        while (this.executionStatus) {
            await this.timer(1);
        }
        await this.timer(this.speed);
        await grid[y][x].removeWall(nextBlock[2]);
        await this.randomizedDFS(nextBlock[0], nextBlock[1], grid);
        nextBlock = await randomUnvisitedNeighbor(x, y, grid);

    }
    //paint the last bits grey
    grid[y][x].drawInner('grey', 1, 2);x
}

//wrapper function for maze creation
MazeCreator.prototype.createMaze = async function (grid) {
    await this.randomizedDFS(0, 0, grid);
    this.reset = false;
}

MazeCreator.prototype.start = function () {
    this.executionStatus = false;
}

MazeCreator.prototype.stop = function () {
    this.executionStatus = true;
}

MazeCreator.prototype.restart = function () {
    this.reset = true;
    this.executionStatus = true;
}