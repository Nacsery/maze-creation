//Author Burak Keser

import { Block } from './block.js';
import { grid as maze, size, unvisitedNeighbors } from './grid.js';

//speed of iteration
let speed = 15;

//moving red block
let movingBlock = new Block(0, 0, 'black', size);

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
export async function randomizedDFS(x, y) {
    maze[y][x].visited = true;
    let nextBlock = await randomUnvisitedNeighbor(x, y);
    while (nextBlock != undefined) {
        //github pages let red flakes sometimes without await.
        movingBlock.deleteInner();
        movingBlock.update(x * size, y * size);
        movingBlock.drawInner();
        await timer(speed);
        await maze[y][x].removeWall(nextBlock[2]);
        await randomizedDFS(nextBlock[0], nextBlock[1]);
        nextBlock = await randomUnvisitedNeighbor(x, y);
    }
    //paint the last bits grey
    await maze[y][x].deleteInner();
    movingBlock.deleteInner();
}