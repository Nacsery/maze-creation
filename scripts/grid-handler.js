//Author Burak Keser

import { GridMaker } from './modules/grid-maker.js';
import { MazeCreator } from './modules/maze-creator.js';

export let canvas = document.querySelector('canvas');
export let ctx = canvas.getContext('2d');

let gridMaker = new GridMaker(30);
let mazeCreator = new MazeCreator();
let grid = gridMaker.newGrid();

//gets size range element
document.getElementById('current-height').innerHTML = gridMaker.heightFactor;
let heightInput = document.getElementById('height');

//changes the size of blocks and string near the range input of size
heightInput.oninput = () => {

    gridMaker.height = canvas.height = Number(document.getElementById('height').value) * gridMaker.blockSize;
    gridMaker.gridRow = (gridMaker.height / gridMaker.blockSize) - 1
    document.getElementById('current-height').innerHTML = document.getElementById('height').value;
    gridMaker.newGrid();
    reset();
}


//gets size range element
document.getElementById('current-width').innerHTML = gridMaker.widthFactor;
let widthInput = document.getElementById('width');

//changes the size of blocks and string near the range input of size
widthInput.oninput = () => {
    gridMaker.width = canvas.width = Number(document.getElementById('width').value) * gridMaker.blockSize;
    gridMaker.girdColumn = (gridMaker.width / gridMaker.blockSize) - 1
    document.getElementById('current-width').innerHTML = document.getElementById('width').value;
    gridMaker.newGrid();
    reset();


}

//speed of iteration
document.getElementById('current-speed').innerHTML = 75;
let speedInput = document.getElementById('speed');

//changes the speed of iteration and string near the range input
speedInput.oninput = () => {
    mazeCreator.speed = (Number(document.getElementById('speed').value) - 100) * -1;
    document.getElementById('current-speed').innerHTML = document.getElementById('speed').value;
}
//if it can be started it executionStatus is true
let stopStart = document.getElementById('stop-start');
let firstStart = true
let executionStatus = false;

//start and stop functionality for maze
stopStart.onclick = async () => {
    if (firstStart) {
        firstStart = false;
        mazeCreator.start();
        stopStart.value = 'Stop';
        let grid = gridMaker.newGrid();
        mazeCreator.reset = false;
        await mazeCreator.createMaze(grid, gridMaker.blockSize);

        if (mazeCreator.isReset) {
            mazeCreator.isReset = false;
            gridMaker.newGrid();
        }
        mazeCreator.stop();
        stopStart.value = 'Start';
        executionStatus = true;

    } else {
        if (executionStatus == true) {
            mazeCreator.start();
            stopStart.value = 'Stop';
            executionStatus = false;

        } else {
            mazeCreator.stop();
            stopStart.value = 'Start';
            executionStatus = true;
        }
    }
}

const reset = async () => {
    mazeCreator.restart();
    mazeCreator.start();
    stopStart.value = 'Start';
    firstStart = true
    executionStatus = false;
    gridMaker.newGrid();
}

//Reset functionality
//Can be done after simulation ended
let clear = document.getElementById('reset-button');
clear.onclick = async () => {
    reset()
}