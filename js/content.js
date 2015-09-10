function Content(canvas) {
    this.universe = new Universe(canvas)
    this.universe.worlds.push(new BezierWorld(canvas))
};

Content.prototype.update = function() {
    this.universe.update();
    
    // erasing the universe was making the game entirely blank on firefox 
    // on ubuntu :(
    this.universe.erase();
    this.universe.draw();
};