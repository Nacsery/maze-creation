//Author Burak Keser

import { Block, canvas } from './block.js';

export let width = canvas.width = 1920;
export let height = canvas.height = 9 * width / 16;

export let size = 0.015625 * width;
export let gridRow = (height / size) - 1;
export let girdColumn = (width / size) - 1;

export let grid = [];

//Creates a grid
export function clearGrid() {
    for (let i = 0; i < height; i += size) {
        let row = []
        for (let j = 0; j < width; j += size) {
            let block = new Block(j, i, 'black', size);
            row.push(block);
            block.draw();
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