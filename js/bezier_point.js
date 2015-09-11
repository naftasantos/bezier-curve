function BezierPoint(params) {
    this.canvas     = params.canvas;
    this.pos        = new Vector(params.x, params.y);
    this.color      = params.color;
    this.isMoving   = false;

    if(typeof(params.radius) === "undefined") {
        this.radius = 15;
    }
    else {
        this.radius = params.radius;
    }
}

BezierPoint.prototype.update = function(gameTime) {
    if(this.isMoving) {
        var mouseX = Input.MousePosition.x / this.canvas.width;
        var mouseY = 1 - (Input.MousePosition.y) / this.canvas.height;

        this.pos.x = mouseX;
        this.pos.y = mouseY;
    }
};

BezierPoint.prototype.draw = function(context) {
    context.beginPath();

    context.arc(this.canvasX(), this.canvasY(), this.radius, 0, 2 * Math.PI, false);
    context.fillStyle = this.color;
    context.fill();

    context.lineWidth = 1;
    context.strokeStyle = "#131313";
    context.stroke();

    context.closePath();
};

BezierPoint.prototype.canvasX = function() {
    return this.pos.x * this.canvas.width;
}

BezierPoint.prototype.canvasY = function() {
    // the reference is drawn as if the y0 is at the bottom,
    // so here there is the need to invert the y scale
    return (1 - this.pos.y) * this.canvas.height;
}

BezierPoint.prototype.canvasPos = function() {
    return new Vector(this.canvasX(), this.canvasY());
}