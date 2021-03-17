const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const bg_colour = window.getComputedStyle(document.querySelector('body')).backgroundColor
const width = canvas.width = 1920;
const height = canvas.height = 1080;
const mazeRow = (height/30)-1;
const mazeColumn = (width/30)-1;

let maze = [];

function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

function Edge(x, y, color, size) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
    this.visited = false;
}

Edge.prototype.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.rect(this.x, this.y, this.size, this.size);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = bg_colour;
    ctx.rect(this.x+1, this.y+1,28,28);
    ctx.fill();
}

Edge.prototype.delete = function () {
    ctx.beginPath();
    ctx.fillStyle = bg_colour;
    ctx.rect(this.x, this.y, this.size, this.size);
    ctx.fill();
}



function fillMaze(){
    let size = 30;
    let edge;
    for(let i = 0; i<height; i+=30){
        let row = []
        for(let j = 0; j<width; j+=30){
            edge = new Edge(j, i, 'blue', size);
            row.push(edge);
            edge.draw();
        }
        maze.push(row);
    }
}

fillMaze()
