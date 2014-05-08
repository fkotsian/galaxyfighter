(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  Function.prototype.inherits = function(superClass) {
    function Surrogate() {};
    Surrogate.prototype = superClass.prototype;
    this.prototype = new Surrogate();
  }

  var Asteroid = Asteroids.Asteroid = function (pos, vel) {
    Asteroids.MovingObject.call(this, pos, vel, Asteroid.RADIUS, Asteroid.COLOR);
  };

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.COLOR = 'red';
  Asteroid.RADIUS = 25;


  Asteroid.randomAsteroid = function(dimX, dimY) {
    var randX = Math.random() * dimX;
    var randY = Math.random() * dimY;
    var pos = [ randX, randY ];
    var vel = [ randomVec(), randomVec() ];

    function randomVec() {
      return Math.random(0, 10);
    }

    return new Asteroid(pos, vel);
  }

})(this);