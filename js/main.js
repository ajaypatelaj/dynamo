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
        fill: "green",
        stroke: "black",
        strokeWidth: 4
      });

      // add the shape to the layer
      layer.add(rect);

      // add the layer to the stage
      stage.add(layer);
    }
  };
  
  $(document).ready(_.bind(dynamo.init, dynamo));
  
})();