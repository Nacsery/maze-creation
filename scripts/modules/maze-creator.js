//Author Burak Keser

import { Block } from './block.js';
import { grid as maze, size, unvisitedNeighbors, clearGrid, grid } from './grid.js';
//moving red block
let movingBlock = new Block(0, 0, 'black', size);

//speed of iteration
let speed = 25;
document.getElementById('current-speed').innerHTML = 75;
let speedInput = document.getElementById('speed');

//changes the speed of iteration and string near the range input
speedInput.oninput = () => {
    speed = (Number(document.getElementById('speed').value) - 100) * -1;
    document.getElementById('current-speed').innerHTML = document.getElementById('speed').value;
}

let executionStatus = true;
let stopStart = document.getElementById('stop-start');
const timer = ms => new Promise(res => setTimeout(res, ms))
let firstStart = true
//start and stop functionality for maze
stopStart.onclick = () => {
    if (firstStart) {
        executionStatus = false;
        stopStart.value = 'Stop';
        createMaze()
        firstStart = false;
    } else {
        if (executionStatus == true) {
            executionStatus = false;
            stopStart.value = 'Stop';

        } else {
            executionStatus = true;
            stopStart.value = 'Start';
        }
    }
}

let reset = true;
let clear = document.getElementById('reset-button');
clear.onclick = () => {
    if (reset) {
        clearGrid();
        movingBlock = new Block(0, 0, 'black', size);
    }
}



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
        //github pages let red flakes sometimes without await.
        movingBlock.drawInner('grey', 1, 2);
        movingBlock.update(x * size, y * size);
        movingBlock.drawInner('grey', 1, 2);
        movingBlock.drawInner('red', 4, 8);
        while (executionStatus) {
            await timer(1);
        }
        await timer(speed);
        await maze[y][x].removeWall(nextBlock[2]);
        await randomizedDFS(nextBlock[0], nextBlock[1]);
        nextBlock = await randomUnvisitedNeighbor(x, y);

    }
    //paint the last bits grey
    await maze[y][x].drawInner('grey', 1, 2);
    movingBlock.drawInner('grey', 1, 2);
}

//wrapper function for maze creation
export async function createMaze() {
    reset = false;
    clear.style.background = 'grey';
    await randomizedDFS(0, 0);
    executionStatus = true;
    firstStart = true;
    stopStart.value = 'Start';
    clear.style.background = 'white';
    reset = true;
}