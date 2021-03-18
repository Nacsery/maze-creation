//Author Burak Keser

import { Block } from './block.js';
import { executionStatus} from './maze-creator.js';

const canvas = document.querySelector('canvas');
export const ctx = canvas.getContext('2d');

export let width = canvas.width = 1920;
export let height = canvas.height = 9 * width / 16;

let temp_size = 1;
export let size = 0.015625 * width * temp_size;
export let gridRow = (height / size) - 1;
export let girdColumn = (width / size) - 1;


document.getElementById('current-size').innerHTML = document.getElementById('size').value;
let sizeInput = document.getElementById('size');

//changes the speed of iteration and string near the range input
sizeInput.oninput = () => {
    if(executionStatus){
    switch (Number(document.getElementById('size').value)){
        case 1:
            temp_size = 0.5;
            break;
        case 2:
            temp_size = 1;
            break;
        case 3:
            temp_size = 2;
            break;
    }
    size = 0.015625 * width * temp_size
    gridRow = (height / size) - 1
    girdColumn = (width / size) - 1
    document.getElementById('current-size').innerHTML = document.getElementById('size').value;
    }
}

export let grid = [];

//Creates a grid
export function clearGrid() {
    grid = [];
    for (let i = 0; i < height; i += size) {
        let row = []
        for (let j = 0; j < width; j += size) {
            let block = new Block(j, i, 'black', size);
            row.push(block);
            block.drawOuter();
            block.drawInner('white', 1, 2);
        }
        grid.push(row);
    }
}

//Finds the unvisited neighbor of the given node
export function unvisitedNeighbors(x, y) {
    let unvisitedNeighbors = [];
    //Before the rightmost node and not visited before
    if (x < girdColumn && !grid[y][x + 1].visited) {
        unvisitedNeighbors.push([x + 1, y, 'right']);
    }
    //Before the lowermost node and not visited before
    if (y < gridRow && !grid[y + 1][x].visited) {
        unvisitedNeighbors.push([x, y + 1, 'down']);
    }
    //before the leftmost node and not visited before
    if (x > 0 && !grid[y][x - 1].visited) {
        unvisitedNeighbors.push([x - 1, y, 'left']);
    }
    //before the upmost node and not visited before
    if (y > 0 && !grid[y - 1][x].visited) {
        unvisitedNeighbors.push([x, y - 1, 'up']);
    }
    return unvisitedNeighbors;
}