function BezierWorld(canvas){
    this.canvas = canvas;
    this.backgroundColor = "#fff";
    this.textColor = "#000";
    this.textFont = "12px Courier";
    this.fps = 0;

    this.points = [
        { 
            pos: new Vector(0.25, 0.1),
            color: this.getRandomColor()
        },
        {
            pos: new Vector(0.75, 0.9),
            color: this.getRandomColor()
        }
    ]

    this.reset();
};

BezierWorld.prototype.update = function(gameTime) {
    this.fps = gameTime.fps;
};

BezierWorld.prototype.draw = function(context) {
    context.fillStyle = this.backgroundColor;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    this.drawBackground(context);
    this.drawReference(context);
    this.drawPoints(context);

    context.fillStyle   = this.textColor;
    context.font        = this.textFont;

    context.fillText("fps: " + this.fps, 10, 15);
};

BezierWorld.prototype.drawPoints = function(context) {
    var pointRadius = 15;

    for(var i in this.points) {
        var point = this.points[i];

        var x = point.pos.x * context.canvas.width;
        var y = point.pos.y * context.canvas.height;

        context.beginPath();
        context.arc(x, y, pointRadius, 0, 2 * Math.PI, false);
        context.fillStyle = point.color;
        context.fill();
    }
};

BezierWorld.prototype.drawBackground = function(context) {
    var stripesCount = 10;
    var brightStripeColor = "#fff";
    var darkStripeColor = "#eeeeee";
    var stripeHeight = Math.round(context.canvas.height / stripesCount);

    for(var i=0; i < stripesCount; ++i) {
        context.fillStyle = i % 2 ? brightStripeColor : darkStripeColor;
        context.fillRect(0, i * stripeHeight, context.canvas.width, 
            stripeHeight);
    }
};

BezierWorld.prototype.drawReference = function(context) {
    context.fillStyle = "#000";
    context.fillRect(0, 0, 5, context.canvas.height);

    context.fillStyle = "#000";
    context.fillRect(0, context.canvas.height - 5, context.canvas.width, 
        context.canvas.height);
};

BezierWorld.prototype.reset = function() {

};

BezierWorld.prototype.getRandomColor = function() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};