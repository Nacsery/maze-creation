//Author Burak Keser
export { Block };


//Block object for the grid
function Block(x, y, color, size, ) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
    this.visited = false;
    this.canvas =  document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');;
}

//Draws an empty square for grid
Block.prototype.drawOuter = function () {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.rect(this.x, this.y, this.size, this.size);
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.fillStyle = 'white';
    this.ctx.rect(this.x + 1, this.y + 1, this.size - 2, this.size - 2);
    this.ctx.fill();
}
//Draw the inner square
Block.prototype.drawInner = function (color, c, z) {
    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.rect(this.x + c, this.y + c, this.size - z, this.size - z);
    this.ctx.fill();
}

//Deletion of the node from Screen
Block.prototype.delete = function () {
    this.ctx.beginPath();
    this.ctx.fillStyle = 'white';
    this.ctx.rect(this.x, this.y, this.size, this.size);
    this.ctx.fill();
}
//Updates the position of the block
//Used by moving block
Block.prototype.update = function (x, y) {
    this.x = x;
    this.y = y;
}
//Removes the Wall from given direction
Block.prototype.removeWall = function (direction) {
    this.ctx.beginPath();
    this.ctx.fillStyle = 'grey';
    let temp = this.size - 2;
    switch (direction) {
        case 'up':
            this.ctx.rect(this.x + 1, this.y - 4, temp, temp);
            break;
        case 'down':
            this.ctx.rect(this.x + 1, this.y + 4, temp, temp);
            break;
        case 'left':
            this.ctx.rect(this.x - 4, this.y + 1, temp, temp);
            break;
        case 'right':
            this.ctx.rect(this.x + 4, this.y + 1, temp, temp);
            break;

    }
    this.ctx.fill();
}
