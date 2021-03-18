//Author Burak Keser

export { Block, canvas };
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

//Block object for the grid
function Block(x, y, color, size) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
    this.visited = false;
}

//Draws an empty square for grid
Block.prototype.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.rect(this.x, this.y, this.size, this.size);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.rect(this.x + 1, this.y + 1, this.size - 2, this.size - 2);
    ctx.fill();
}
//Deletes the inner square
Block.prototype.deleteInner = function () {
    ctx.beginPath();
    ctx.fillStyle = 'grey';
    ctx.rect(this.x + 1, this.y + 1, this.size - 2, this.size - 2);
    ctx.fill();
}
//Draws an inner square
//used by moving node
Block.prototype.drawInner = function () {
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.rect(this.x + 1, this.y + 1, this.size - 2, this.size - 2);
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
    let size = this.size - 2;
    switch (direction) {
        case 'up':
            ctx.rect(this.x + 1, this.y - 2, size, size);
            break;
        case 'down':
            ctx.rect(this.x + 1, this.y + 3, size, size);
            break;
        case 'left':
            ctx.rect(this.x - 2, this.y + 1, size, size);
            break;
        case 'right':
            ctx.rect(this.x + 3, this.y + 1, size, size);
            break;

    }
    ctx.fill();
}
