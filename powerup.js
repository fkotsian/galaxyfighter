(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  Function.prototype.inherits = function(superClass) {
    function Surrogate() {};
    Surrogate.prototype = superClass.prototype;
    this.prototype = new Surrogate();
  }

  var Powerup = Asteroids.Powerup = function(pos, vel) {
    Asteroids.MovingObject.call(this, pos, vel, Powerup.RADIUS, Powerup.randomColor());
  };

  Powerup.inherits(Asteroids.MovingObject);

  Powerup.COLORS = ['red'];//, 'blue', 'purple'];
  Powerup.RADIUS = 10;

  Powerup.randomPowerup = function(pos, vel) {
    // var randX = Math.random() * dimX;
    // var randY = Math.random() * dimY;
    // var pos = [ randX, randY ];
    // var vel = [ 0, Math.random(0, 20) ];

    return new Powerup(pos, vel);
  }

  Powerup.randomColor = function() {
    rand = Math.floor(Math.random() * Powerup.COLORS.length);
    return Powerup.COLORS[rand];
  }

  // Powerup.draw(ctx) {
  //   //implement square shape + logo for powerups
  // }

})(this);
