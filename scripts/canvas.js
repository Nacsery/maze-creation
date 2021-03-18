//Author Burak Keser

import { clearGrid } from './modules/grid.js';
import { randomizedDFS } from './modules/maze-creator.js';



//wrapper function for maze creation
function createMaze() {
    randomizedDFS(0, 0);
}

clearGrid();
createMaze();