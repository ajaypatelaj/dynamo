/*globals dynamo, Kinetic */

(function() {

  window.dynamo = {
    init: function() {
      var ww = $(window).width();
      var wh = $(window).height();
      this.stage = new Kinetic.Stage({
        container: "viewport",
        width: ww,
        height: wh
      });

      var layer = new Kinetic.Layer();
      
      var stock = new dynamo.Stock({
        x: 239,
        y: 75
      });

      var stock2 = new dynamo.Stock({
        x: 239,
        y: 200
      });
      
      // add the shape to the layer
      layer.add(stock.node());
      layer.add(stock2.node());

      // add the layer to the stage
      this.stage.add(layer);
      
      this.Stock.init();
    },
    
    draw: function() {
      this.stage.draw();
    }
  };
  
  $(document).ready(function() {
    dynamo.init();
  });
  
})();