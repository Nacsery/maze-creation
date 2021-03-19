//Author Burak Keser

import { Block } from './block.js';
import { executionStatus } from './maze-creator.js';


const canvas = document.querySelector('canvas');
export const ctx = canvas.getContext('2d');

export let width = canvas.width = 1920;
export let height = canvas.height = 9 * width / 16;
//size factor for changing size
let tempBlockSize = 1;
let tempGridSize = 1;
//Block size
export let blockSize = 0.015625 * width * tempBlockSize;

//Maze size
export let mazeSize = 0.015625 * width * tempGridSize;

//Proportioned array limits of the canvas according to block size
export let gridRow = (height / blockSize) - 1;
export let girdColumn = (width / blockSize) - 1;

//gets size range element
document.getElementById('current-size').innerHTML = document.getElementById('size').value;
let sizeInput = document.getElementById('size');

//changes the size of blocks and string near the range input of size
sizeInput.oninput = () => {
    if (executionStatus) {
        switch (Number(document.getElementById('size').value)) {
            case 1:
                tempBlockSize = 0.25;
                break;
            case 2:
                tempBlockSize = 0.5;
                break;
            case 3:
                tempBlockSize = 1;
                break;
            case 4:
                tempBlockSize = 2;
                break;
            case 5:
                tempBlockSize = 4;
                break;
        }
        blockSize = 0.015625 * width * tempBlockSize
        gridRow = (height / blockSize) - 1
        girdColumn = (width / blockSize) - 1
        newGrid();
        document.getElementById('current-size').innerHTML = document.getElementById('size').value;
    }
}

//simulated grid
export let grid = [];

//Creates a grid
export function newGrid() {
    grid = [];
    for (let i = 0; i < height; i += blockSize) {
        let row = []
        for (let j = 0; j < width; j += blockSize) {
            let block = new Block(j, i, 'black', blockSize);
            row.push(block);
            block.drawOuter();
            block.drawInner('white', 1, 2);
        }
        grid.push(row);
    }
}

//Finds the unvisited neighbor of the given node
export function unvisitedNeighbors(x, y, c) {
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