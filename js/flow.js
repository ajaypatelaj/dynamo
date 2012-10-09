/*globals dynamo, Kinetic */

(function() {

  dynamo.Flow = function(config) {
    var self = this;
    this.name = config.name || "Flow";
    this.value = (config.value === undefined ? 100 : config.value);
    
    this.line = new Kinetic.Line({
      stroke: "black",
      strokeWidth: 2,
      points: [{
        x: config.x,
        y: config.y
      }]
    });
  };
  
  dynamo.Flow.prototype = {
    destroy: function() {
    },
    
    node: function() {
      return this.line;
    },
    
    setEnd: function(where) {
      var points = this.line.getPoints();
      points[1] = where;
      this.line.setPoints(points);
      dynamo.draw();
    },
    
    toJSON: function() {
      return {
/*
        x: this.group.getX(),
        y: this.group.getY(),
        z: this.group.getZIndex(),
        width: this.rect.getWidth(),
        height: this.rect.getHeight(),
        name: this.name,
        value: this.value
*/
      };
    }
  };
  
  dynamo.Flow.init = function() {
/*
    this.$settings = $("#stock-dialog")
      .dialog({ autoOpen: false });
*/
  };
  
})();