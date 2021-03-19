//Author Burak Keser
export function MultiBlock(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.visited = false;
    this.innerGrid = [];
}



//Creates a grid
MultiBlock.prototype.structInnerGrid = function (grid) {
    for (let i = this.y; i < this.y + this.size; i++) {
        let row = []
        for (let j = this.x; j < this.x + this.size; j++) {
            row.push(grid[j][i]);
        }
        this.innerGrid.push(row);
    }
}

MultiBlock.prototype.draw = function () {
    for (let i = 0; i < this.innerGrid.length; i++) {
        this.innerGrid[i][0].drawInner('black', 1, 2);
    }
    for (let i = 0; i < this.innerGrid.length; i++) {
        this.innerGrid[i][this.innerGrid[0].length - 1].drawInner('black', 1, 2);
    }
    for (let i = 1; i < this.innerGrid.length - 1; i++) {
        this.innerGrid[0][i].drawInner('black', 1, 2);
        this.innerGrid[this.innerGrid[0].length - 1][i].drawInner('black', 1, 2);
    }
}