(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  Function.prototype.inherits = function(superClass) {
    function Surrogate() {};
    Surrogate.prototype = superClass.prototype;
    this.prototype = new Surrogate();
  }

  var Ship = Asteroids.Ship = function () {
    var pos = [ Asteroids.Game.DIM_X / 2, Asteroids.Game.DIM_Y / 2 ];
    var vel = [.5,.5];
    Asteroids.MovingObject.call(this, pos, vel, Ship.RADIUS, Ship.COLOR);
  }
  Ship.inherits(Asteroids.MovingObject);

  Ship.RADIUS = 10;
  Ship.COLOR = 'black';




})(this);