function BezierWorld(canvas){
    this.canvas = canvas;
    this.backgroundColor = "#fff";
    this.textColor = "#000";
    this.textFont = "12px Courier";
    this.fps = 0;
    this.currentMovingPoint = null;

    this.originPoints = [
        new BezierPoint({
            x: 0,
            y: 0,
            color: "#FFF",
            canvas: canvas
        }),
        new BezierPoint({
            x: 1,
            y: 1,
            color: "#FFF",
            canvas: canvas
        })
    ]

    this.referencePoints = [
        new BezierPoint( {
            x: 0.25, 
            y: 0.1,
            color: "#FF0088",
            canvas: canvas
        }),
        new BezierPoint({
            x: 0.75, 
            y: 0.9,
            color: "#00AABB",
            canvas: canvas
        })
    ]

    this.points = [
        this.originPoints[0],
        this.referencePoints[0],
        this.referencePoints[1],
        this.originPoints[1]
    ]

    this.reset();
};

BezierWorld.prototype.update = function(gameTime) {
    this.fps = gameTime.fps;

    if(!Input.IS_MOUSE_DOWN) {
        this.currentMovingPoint = null;
    }

    var mouseOverAny = false;

    for(var pointIdx in this.points) {
        var point = this.points[pointIdx];
        var diff = point.canvasPos().subtract(Input.MousePosition);

        if(diff.lengthSqr() <= (point.radius * point.radius)) {
            mouseOverAny = true;

            if(Input.IS_MOUSE_DOWN) {
                if(!this.currentMovingPoint) {
                    point.isMoving = true;
                    this.currentMovingPoint = point;
                }
            }
            else {
                point.isMoving = false;
            }
        }

        point.update(gameTime);
    }

    if(mouseOverAny) {
        Input.cursor.hand();
    }
    else {
        Input.cursor.normal();
    }
};

BezierWorld.prototype.draw = function(context) {
    context.fillStyle = this.backgroundColor;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    this.drawBackground(context);
    this.drawReference(context);
    this.drawBezierCurve(context);
    this.drawPoints(context);

    context.fillStyle   = this.textColor;
    context.font        = this.textFont;

    context.fillText("fps: " + this.fps, 10, 15);
};

BezierWorld.prototype.drawPoints = function(context) {
    for(var i in this.points) {
        this.points[i].draw(context);
    }
};

BezierWorld.prototype.drawBezierCurve = function(context) {
    var steps = 1000;
    var currentPoint = null;
    var pointRadius = 3;

    var lastPoint = null;

    for (var i=0; i <= steps; ++i) {
        /*var start = -1;
        var end = 2;
        var length = 3;

        var t = start + (i / steps) * length;*/
        var t = i / steps;

        var p0 = this.points[0].pos;
        var p1 = this.points[1].pos;
        var p2 = this.points[2].pos;
        var p3 = this.points[3].pos;

        currentPoint = Bezier.cubic(p0, p1, p2, p3, t, currentPoint);

        var pX = currentPoint.x * context.canvas.width;
        var pY = (1 - currentPoint.y) * context.canvas.height;

        context.beginPath();
        context.arc(pX, pY, pointRadius, 0, 2 * Math.PI, false);
        context.fillStyle = "rgba(0, 0, 0, 1)";
        context.fill();
        context.closePath();
    }
}

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

    var originA = this.originPoints[0].canvasPos();
    var originB = this.originPoints[1].canvasPos();

    context.beginPath();
    context.moveTo(originA.x, originA.y);
    context.strokeStyle = "rgba(127, 127, 127, 0.5)";
    context.lineWidth = 10;
    context.lineTo(originB.x, originB.y);
    context.stroke();
    context.closePath();

    for(var i=0; i < this.originPoints.length; ++i) {
        var origin      = this.originPoints[i];
        var reference   = this.referencePoints[i];

        context.beginPath();

        context.moveTo(origin.canvasX(), origin.canvasY());
        context.strokeStyle = "#7F7F7F";
        context.lineWidth = 4;
        context.lineTo(reference.canvasX(), reference.canvasY());
        context.stroke();

        context.closePath();
    }
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

BezierWorld.prototype.rect = function() {
    return {
        x = 10,
        y = 10,
        width = this.canvas.width - 10,
        height = this.canvas.height - 10
    };
}