//Author Burak Keser
import { gridRow, girdColumn, newGrid } from './grid-maker.js';
import { MultiBlock } from './multiple-block.js';

//Multi Block size, represents edge size of multi block
export let multiBlockSize = 4;

let multiBlockGridRow = gridRow / multiBlockSize - 1;
let multiBlockGridColumn = girdColumn / multiBlockSize - 1;

let multiGrid = true
let multiGridInput = document.getElementById('multi-block');


//start and stop functionality for maze
multiGridInput.onclick = () => {

    if (multiGrid == true) {
        multiGrid = false;
        newMultiBlockGrid();
        multiGridInput.value = 'Clear Block Grid';

    } else {
        multiGrid = true;
        newGrid();
        multiGridInput.value = 'Block Grid';
    }

}



//Multi block grid
export let multiBlockGrid = [];


export function newMultiBlockGrid(grid) {
    multiBlockGrid = [];
    for (let i = 0; i < girdColumn; i += multiBlockSize - 1) {
        let row = []
        for (let j = 0; j < gridRow - 1; j += multiBlockSize - 1) {
            let block = new MultiBlock(j, i, multiBlockSize);
            block.structInnerGrid(grid);
            row.push(block);
            block.draw();
        }
        multiBlockGrid.push(row);
    }
}

