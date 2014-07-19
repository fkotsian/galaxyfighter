(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  Function.prototype.inherits = function(superClass) {
    function Surrogate() {};
    Surrogate.prototype = superClass.prototype;
    this.prototype = new Surrogate();
  }
  
  var Star = Asteroids.Star = function(pos, vel) {
    Asteroids.MovingObject.call(this, pos, vel, Star.RADIUS, Star.COLOR);
  };
  
  Star.inherits(Asteroid.MovingObject);
  
  Star.COLOR = "#FFFFFF";
  Star.RADIUS = 1;
  
  Star.randomStar = function(dimX, dimY) {
    var randX = Math.random() * dimX;
    var randY = Math.random() * dimY;
    var pos = [ randX, randY ];
    var vel = [ 0, Math.random(0, 20) ];

    return new Star(pos, vel);
  }
  
})(this);