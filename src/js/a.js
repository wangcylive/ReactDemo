import React from 'react'

console.log('a.js');

/*function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.toString = function () {
    return '(' + this.x + ', ' + this.y + ')';
};*/

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }

    static showName() {
        console.log('Point');
    }
}

Object.assign(Point.prototype, {
    toNumber() {
        return this.x + this.y;
    }
});

const point1 = new Point(1, 2);

console.log(new Point());

console.log(point1.constructor === Point.prototype.constructor);