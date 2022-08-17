// See : https://github.com/pakastin/car/blob/master/car.js

class Car {
    constructor(x,y,width,height, controlType, maxSpeed=3) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        const maxPower = 0.075;
        const maxReverse = 0.0375;
        const powerFactor = 0.001;
        const reverseFactor = 0.0005;

        const drag = 0.95;
        const angularDrag = 0.95;
        const turnSpeed = 0.002;

        this.xVelocity = 0;
        this.yVelocity = 0;
        this.power = 0;
        this.reverse = false;
        this.angle = 0;
        this.angularVelocity = 0;

        this.speed = 0;
        this.xG = 0;
        this.yG = 0;

        this.isThrottling = false;
        this.isReversing = false;
        this.isTurningLeft = false;
        this.isTurningRight = false;

        this.isDamaged = false;
    }



    update() {

    }

    draw() {

    }
}