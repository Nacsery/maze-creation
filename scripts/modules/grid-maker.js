//Author Burak Keser
import { Block } from './block.js';

export function GridMaker() {

    this.blockSize = 30;
    this.widthFactor = 80;
    this.heightFactor = 45;
    this.canvas =  document.querySelector('canvas');
    this.width = this.canvas.width = this.blockSize * this.widthFactor;
    this.height = this.canvas.height = this.blockSize * this.heightFactor;
    this.gridRow = (this.height / this.blockSize) - 1;
    this.girdColumn = (this.width / this.blockSize) - 1;
}

//Creates a grid
GridMaker.prototype.newGrid = function () {
    let grid = [];
    for (let i = 0; i < this.height; i += this.blockSize) {
        let row = []
        for (let j = 0; j < this.width; j += this.blockSize) {
            let block = new Block(j, i, 'black', this.blockSize);
            row.push(block);
            block.drawOuter();
            block.drawInner('white', 1, 2);
        }
        grid.push(row);
    }
    return grid;
}