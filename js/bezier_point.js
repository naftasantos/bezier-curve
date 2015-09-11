function BezierPoint(params) {
    this.world      = params.world;
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
    var worldRect = this.world.rect();

    if(this.isMoving) {
        var convertedX = Input.MousePosition.x - worldRect.x;
        var convertedY = Input.MousePosition.y - worldRect.y;

        var mouseX = convertedX / worldRect.width;
        var mouseY = 1 - (convertedY / worldRect.height);

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

BezierPoint.prototype.worldX = function() {
    var worldRect = this.world.rect();
    return this.pos.x * worldRect.width;
};

BezierPoint.prototype.worldY = function() {
    var worldRect = this.world.rect();
    return (1 - this.pos.y) * worldRect.height;
};

BezierPoint.prototype.canvasX = function() {
    var worldRect = this.world.rect();
    return worldRect.x + this.worldX();
};

BezierPoint.prototype.canvasY = function() {
    var worldRect = this.world.rect();
    // the reference is drawn as if the y0 is at the bottom,
    // so here there is the need to invert the y scale
    return worldRect.y + this.worldY();
};

BezierPoint.prototype.canvasPos = function() {
    return new Vector(this.canvasX(), this.canvasY());
};

BezierPoint.prototype.worldPos = function() {
    return new Vector(this.worldX(), this.worldY());
};