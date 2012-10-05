/*globals dynamo, Kinetic */

(function() {

  dynamo.Stock = function(config) {
    var self = this;
    this.rect = new Kinetic.Rect({
      x: config.x,
      y: config.y,
      width: 100,
      height: 50,
      fill: "white",
      stroke: "black",
      strokeWidth: 2,
      cornerRadius: 8
    });
    
    function getWhere(event) {
      return {
        x: event.clientX,
        y: event.clientY
      };
    }
    
    function isResize(where) {
      var p = self.rect.getPosition();
      var s = self.rect.getSize();
      return (where.x > p.x + (s.width - 20) && where.y > p.y + (s.height - 20));
    }
    
    this.rect.on("mousemove", function(event) {
      $("#viewport").css({
        cursor: (isResize(getWhere(event)) ? "se-resize" : "move")
      });
    });
    
    this.rect.on("mouseout", function(event) {
      $("#viewport").css({
        cursor: "default"
      });
    });
    
    this.rect.on("mousedown", function(event) {
      var lastWhere = getWhere(event);
      self.rect.moveToTop();
      dynamo.draw();
      if (isResize(lastWhere)) {
        $(window).mousemove(function(event) {
          var where = getWhere(event);
          var size = self.rect.getSize();
          size.width += where.x - lastWhere.x;
          size.height += where.y - lastWhere.y;
          size.width = Math.max(size.width, 100);
          size.height = Math.max(size.height, 50);
          self.rect.setSize(size);
          lastWhere = where;
          dynamo.draw();
        });
        
        $(window).mouseup(function(event) {
          $(window).unbind("mousemove");
          $(window).unbind("mouseup");
        });
      } else {
        $(window).mousemove(function(event) {
          var where = getWhere(event);
          var pos = self.rect.getPosition();
          pos.x += where.x - lastWhere.x;
          pos.y += where.y - lastWhere.y;
          self.rect.setPosition(pos);
          lastWhere = where;
          dynamo.draw();
        });
        
        $(window).mouseup(function(event) {
          $(window).unbind("mousemove");
          $(window).unbind("mouseup");
        });
      }
    });
  };
  
  dynamo.Stock.prototype = {
    node: function() {
      return this.rect;
    }
  };
  
})();