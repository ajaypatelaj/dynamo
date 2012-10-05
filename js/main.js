/*globals dynamo, Kinetic */

(function() {

  window.dynamo = {
    init: function() {
      var ww = $(window).width();
      var wh = $(window).height();
      var stage = new Kinetic.Stage({
        container: "viewport",
        width: ww,
        height: wh
      });

      var layer = new Kinetic.Layer();

      var rect = new Kinetic.Rect({
        x: 239,
        y: 75,
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
        var p = rect.getPosition();
        var s = rect.getSize();
        return (where.x > p.x + (s.width - 20) && where.y > p.y + (s.height - 20));
      }
      
      rect.on("mousemove", function(event) {
        $("#viewport").css({
          cursor: (isResize(getWhere(event)) ? "se-resize" : "move")
        });
      });
      
      rect.on("mouseout", function(event) {
        $("#viewport").css({
          cursor: "default"
        });
      });
      
      rect.on("mousedown", function(event) {
        var lastWhere = getWhere(event);
        if (isResize(lastWhere)) {
          $(window).mousemove(function(event) {
            var where = getWhere(event);
            var size = rect.getSize();
            size.width += where.x - lastWhere.x;
            size.height += where.y - lastWhere.y;
            size.width = Math.max(size.width, 100);
            size.height = Math.max(size.height, 50);
            rect.setSize(size);
            lastWhere = where;
            stage.draw();
          });
          
          $(window).mouseup(function(event) {
            $(window).unbind("mousemove");
            $(window).unbind("mouseup");
          });
        } else {
          $(window).mousemove(function(event) {
            var where = getWhere(event);
            var pos = rect.getPosition();
            pos.x += where.x - lastWhere.x;
            pos.y += where.y - lastWhere.y;
            rect.setPosition(pos);
            lastWhere = where;
            stage.draw();
          });
          
          $(window).mouseup(function(event) {
            $(window).unbind("mousemove");
            $(window).unbind("mouseup");
          });
        }
      });
      
      // add the shape to the layer
      layer.add(rect);

      // add the layer to the stage
      stage.add(layer);
    }
  };
  
  $(document).ready(function() {
    dynamo.init();
  });
  
})();