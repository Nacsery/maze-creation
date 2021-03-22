//Author Burak Keser

import { GridMaker } from './modules/grid-maker.js';
import { MazeCreator } from './modules/maze-creator.js';
import { MultiBlockGrid } from './modules/multi-block-grid.js';

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

let gridMaker = new GridMaker(30);
let mazeCreator = new MazeCreator();
let grid = gridMaker.newGrid();
let multiBlockGrid = new MultiBlockGrid(gridMaker.gridRow, gridMaker.girdColumn,4);
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
    if(firstStart){
        if (multiGrid == true) {
            multiGrid = false;
            let sizeBlock = multiBlockSize-1;
            let roundedHeight = (gridMaker.gridRow-1) +  Math.abs(((gridMaker.gridRow-1) % sizeBlock) - sizeBlock) + 1;
            let roundedWidth = (gridMaker.girdColumn-1) +  Math.abs(((gridMaker.girdColumn-1) % sizeBlock) - sizeBlock) + 1;
    
            gridMaker.width = canvas.width = roundedWidth * gridMaker.blockSize;
            gridMaker.girdColumn = (gridMaker.width / gridMaker.blockSize) - 1
            document.getElementById('current-width').innerHTML = roundedWidth;
            gridMaker.newGrid();
    
            gridMaker.height = canvas.height =roundedHeight * gridMaker.blockSize;
            gridMaker.gridRow = (gridMaker.height / gridMaker.blockSize) - 1
            document.getElementById('current-height').innerHTML = roundedHeight;
            gridMaker.newGrid();
    
            grid = gridMaker.newGrid();
            multiBlockGrid.reset(gridMaker.gridRow,gridMaker.girdColumn,multiBlockSize)
    
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
//if it can be started it executionStatus is true
let stopStart = document.getElementById('stop-start');
let firstStart = true
let executionStatus = false;

//start and stop functionality for maze
stopStart.onclick = async () => {
    console.log( document.getElementById('multi-block').style.background );
    if (firstStart) {
        firstStart = false;
        mazeCreator.start();
        stopStart.value = 'Stop';
        grid = gridMaker.newGrid();
        mazeCreator.reset = false;
        document.getElementById('multi-block').style.background = 'grey';
        await mazeCreator.createMaze(grid, gridMaker.blockSize);

        if (mazeCreator.isReset) {
            mazeCreator.isReset = false;
            grid = gridMaker.newGrid();
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
    multiGrid = true;
    multiGridInput.value = 'Block Grid';
    stopStart.value = 'Start';
    firstStart = true
    executionStatus = false;
    grid = gridMaker.newGrid();
    document.getElementById('multi-block').style.background = buttonColour;
}

//Reset functionality
//Can be done after simulation ended
let clear = document.getElementById('reset-button');
clear.onclick = async () => {
    reset()
}