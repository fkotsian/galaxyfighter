(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var MovingObject = Asteroids.MovingObject = function(pos, vel, radius, color) {
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.color = color;
  }

  MovingObject.prototype.move = function() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  }

  MovingObject.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();
  }

  MovingObject.prototype.isCollidedWith = function(otherObject) {
    var totalRadii = this.radius + otherObject.radius
    var temp = (this.pos[0] - otherObject.pos[0])
    var xDist = temp * temp
    var temp = (this.pos[1] - otherObject.pos[1])
    var yDist = temp * temp
    var totalDist = Math.sqrt(xDist + yDist)

    if (totalRadii > totalDist) {
      return true;
    }
    return false;
  }

  MovingObject.prototype.checkOutOfBounds = function(xBound, yBound) {
    if ( this.isOutOfBounds(xBound, yBound) ) {
      this.correctOutOfBounds(xBound, yBound);
    }
  }

  MovingObject.prototype.isOutOfBounds = function(xBound, yBound) {
    return (this.pos[0] > xBound) || (this.pos[0] < 0) || (this.pos[1] > yBound) || (this.pos[1] < 0)
  }

  MovingObject.prototype.correctOutOfBounds = function(xBound, yBound) {
    if (this.pos[0] > xBound ) {
      this.pos[0] -= xBound;
    } else if (this.pos[0] < 0) {
      this.pos[0] += xBound;
    }
    if (this.pos[1] > yBound) {
      this.pos[1] -= yBound
    } else if (this.pos[1] < 0) {
      this.pos[1] += yBound;
    }
  }


})(this);