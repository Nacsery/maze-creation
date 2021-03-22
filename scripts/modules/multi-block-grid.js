//Author Burak Keser
import { MultiBlock } from './multiple-block.js';


export function MultiBlockGrid(gridRow, girdColumn, size) {
    this.multiBlockSize = size;
    this.gridRow = gridRow;
    this.girdColumn = girdColumn;
    this.multiBlockGrid = [];
}

MultiBlockGrid.prototype.newMultiBlockGrid = function (grid) {
    this.multiBlockGrid = [];
    for (let i = 0; i < this.girdColumn; i += this.multiBlockSize - 1) {
        let row = []
        
        for (let j = 0; j < this.gridRow - 1; j += this.multiBlockSize - 1) {
            let block = new MultiBlock(j, i, this.multiBlockSize);
            block.structInnerGrid(grid);
            row.push(block);
            block.draw();
        }
        this.multiBlockGrid.push(row);
    }
}

MultiBlockGrid.prototype.reset = function (gridRow, girdColumn, size) {
    this.gridRow = gridRow;
    this.girdColumn = girdColumn;
    this.multiBlockSize = size;
    this.multiBlockGrid = [];
}

