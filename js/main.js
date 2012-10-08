/*globals dynamo, Kinetic, amplify */

(function() {

  window.dynamo = {
    init: function() {
      var self = this;
      var ww = $(window).width();
      var wh = $(window).height();
      this.stage = new Kinetic.Stage({
        container: "viewport",
        width: ww,
        height: wh
      });

      this.layer = new Kinetic.Layer();
      
      this.stocks = [];
      
      var stocks = amplify.store("stocks");
      if (!stocks || !stocks.length) {
        this.addStock({
          x: 239,
          y: 75
        });

        this.addStock({
          x: 239,
          y: 200
        });
      } else {
        _.each(stocks, function(v, i) {
          self.addStock(v);
        });
      }
      
      // add the layer to the stage
      this.stage.add(this.layer);
      
      this.Stock.init();
    },
    
    addStock: function(config) {
      var stock = new dynamo.Stock(config);
      this.layer.add(stock.node());
      this.stocks.push(stock);
    },
    
    draw: function() {
      this.stage.draw();
    },
    
    save: function() {
      var stocks = [];
      _.each(this.stocks, function(v, i) {
        stocks.push(v.toJSON());
      });
    
      amplify.store("stocks", stocks);
    }
  };
  
  $(document).ready(function() {
    dynamo.init();
  });
  
})();