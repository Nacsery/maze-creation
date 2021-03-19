//Author Burak Keser
import { ctx } from './grid.js';
export { Block };


//Block object for the grid
function Block(x, y, color, size) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
    this.visited = false;
}

//Draws an empty square for grid
Block.prototype.drawOuter = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.rect(this.x, this.y, this.size, this.size);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.rect(this.x + 1, this.y + 1, this.size - 2, this.size - 2);
    ctx.fill();
}
//Draw the inner square
Block.prototype.drawInner = function (color, c, z) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.rect(this.x + c, this.y + c, this.size - z, this.size - z);
    ctx.fill();
}

//Deletion of the node from Screen
Block.prototype.delete = function () {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.rect(this.x, this.y, this.size, this.size);
    ctx.fill();
}
//Updates the position of the block
//Used by moving block
Block.prototype.update = function (x, y) {
    this.x = x;
    this.y = y;
}
//Removes the Wall from given direction
Block.prototype.removeWall = function (direction) {
    ctx.beginPath();
    ctx.fillStyle = 'grey';
    let temp = this.size - 2;
    switch (direction) {
        case 'up':
            ctx.rect(this.x + 1, this.y - 4, temp, temp);
            break;
        case 'down':
            ctx.rect(this.x + 1, this.y +4, temp, temp);
            break;
        case 'left':
            ctx.rect(this.x - 4, this.y +1, temp, temp);
            break;
        case 'right':
            ctx.rect(this.x + 4, this.y +1, temp, temp);
            break;

    }
    ctx.fill();
}
