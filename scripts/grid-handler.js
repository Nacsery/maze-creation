//Author Burak Keser

import { GridMaker } from './modules/grid-maker.js';
import { MazeCreator } from './modules/maze-creator.js';
import { MultiBlockGrid } from './modules/multi-block-grid.js';

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

let gridMaker = new GridMaker(30);
let mazeCreator = new MazeCreator();
let grid = gridMaker.newGrid();
let multiBlockGrid = new MultiBlockGrid(gridMaker.gridRow, gridMaker.girdColumn, 4);
let buttonColour = document.getElementById('multi-block').style.background;
//gets size range element
document.getElementById('current-height').innerHTML = gridMaker.heightFactor;
let heightInput = document.getElementById('height');

//changes the size of blocks and string near the range input of size
heightInput.oninput = () => {
    gridMaker.height = canvas.height = Number(document.getElementById('height').value) * gridMaker.blockSize;
    gridMaker.gridRow = (gridMaker.height / gridMaker.blockSize) - 1
    document.getElementById('current-height').innerHTML = document.getElementById('height').value;
    reset();
    grid = gridMaker.newGrid();
}

//gets size range element
document.getElementById('current-width').innerHTML = gridMaker.widthFactor;
let widthInput = document.getElementById('width');

//changes the size of blocks and string near the range input of size
widthInput.oninput = () => {
    gridMaker.width = canvas.width = Number(document.getElementById('width').value) * gridMaker.blockSize;
    gridMaker.girdColumn = (gridMaker.width / gridMaker.blockSize) - 1
    document.getElementById('current-width').innerHTML = document.getElementById('width').value;
    reset();
    grid = gridMaker.newGrid();
}


let multiBlockSize = 3;
document.getElementById('current-block-size').innerHTML = multiBlockSize;
let multiBlockSizeInput = document.getElementById('block-size');

//changes the size of blocks and string near the range input of size
multiBlockSizeInput.oninput = () => {
    multiBlockSize = Number(document.getElementById('block-size').value);
    document.getElementById('current-block-size').innerHTML = document.getElementById('block-size').value;
    reset();
}


let multiGrid = true
let multiGridInput = document.getElementById('multi-block');

//start and stop functionality for maze
multiGridInput.onclick = async () => {
    if (firstStart) {
        if (multiGrid == true) {
            multiGrid = false;
            let sizeBlock = multiBlockSize - 1;
            let roundedHeight = (gridMaker.gridRow - 1) + Math.abs(((gridMaker.gridRow - 1) % sizeBlock) - sizeBlock) + 1;
            let roundedWidth = (gridMaker.girdColumn - 1) + Math.abs(((gridMaker.girdColumn - 1) % sizeBlock) - sizeBlock) + 1;

            gridMaker.width = canvas.width = roundedWidth * gridMaker.blockSize;
            gridMaker.girdColumn = (gridMaker.width / gridMaker.blockSize) - 1
            document.getElementById('current-width').innerHTML = roundedWidth;
            gridMaker.newGrid();

            gridMaker.height = canvas.height = roundedHeight * gridMaker.blockSize;
            gridMaker.gridRow = (gridMaker.height / gridMaker.blockSize) - 1
            document.getElementById('current-height').innerHTML = roundedHeight;
            gridMaker.newGrid();

            grid = gridMaker.newGrid();
            multiBlockGrid.reset(gridMaker.gridRow, gridMaker.girdColumn, multiBlockSize)

            multiBlockGrid.newMultiBlockGrid(grid);
            multiGridInput.value = 'Clear Grid';

        } else {
            reset();
        }
    }
}

//speed of iteration
document.getElementById('current-speed').innerHTML = 75;
let speedInput = document.getElementById('speed');

//changes the speed of iteration and string near the range input
speedInput.oninput = () => {
    mazeCreator.speed = (Number(document.getElementById('speed').value) - 100) * -1;
    document.getElementById('current-speed').innerHTML = document.getElementById('speed').value;
}

let stopStart = document.getElementById('stop-start');
let firstStart = true

//start and stop functionality for maze
stopStart.onclick = async () => {
    if (firstStart) {

        firstStart = false;
        stopStart.value = 'Stop';
        grid = gridMaker.newGrid();
        document.getElementById('multi-block').style.background = 'grey';
        await mazeCreator.createMaze(grid, gridMaker.blockSize);
        if (mazeCreator.reset) {
            mazeCreator.reset = false;
            grid = gridMaker.newGrid();
        }
        stopStart.value = 'Start';

    } else {
        if (mazeCreator.executionStatus == false) {
            mazeCreator.start();
            stopStart.value = 'Stop';

        } else {
            mazeCreator.stop();
            stopStart.value = 'Start';
        }
    }
}

const reset = () => {
    let len = mazeCreator.restart();
    multiGrid = true;
    multiGridInput.value = 'Block Grid';
    stopStart.value = 'Start';
    firstStart = true
    document.getElementById('multi-block').style.background = buttonColour;
    console.log(len);
    if(len===0){
        grid = gridMaker.newGrid();
    }
}

//Reset functionality
//Can be done after simulation ended
let clear = document.getElementById('reset-button');
clear.onclick = () => {
    reset()
}