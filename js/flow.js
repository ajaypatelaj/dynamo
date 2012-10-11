/*globals dynamo, Kinetic */

(function() {

  dynamo.Flow = function(config) {
    var self = this;
    this.equation = config.equation || "0";
    this.stocks = [null, null];
    
    this.line = new Kinetic.Line({
      stroke: "black",
      strokeWidth: 6,
      points: config.points || [{
        x: config.x,
        y: config.y
      }]
    });

    this.line.on("dblclick", function(event) {
      var $settings = dynamo.Flow.$settings;

      var $equation = $settings.find(".equation-input")
        .val(self.equation);
             
      function handleOK() {
        self.equation = $equation.val();
        $settings.dialog("close");
        dynamo.draw();
        dynamo.save();
      }      
      
      var points = self.line.getPoints();
      var x = Math.min(points[0].x, points[1].x);
      var y = Math.min(points[0].y, points[1].y);
      $settings.dialog("option", {
        position: [x, y],
        width: 350,
        minWidth: 200,
        buttons: {
          Cancel: function() {
            $settings.dialog("close");
          },
          "Delete": function() {
            $settings.dialog("close");
            dynamo.remove(self);
          },            
          OK: handleOK
        }
      });
      
      $settings.dialog("open");
      
      $equation.focus().select();
    });
  };
  
  dynamo.Flow.prototype = {
    destroy: function() {
    },
    
    node: function() {
      return this.line;
    },
    
    getPoint: function(index) {
      var points = this.line.getPoints();
      return points[index];
    },
    
    setPoint: function(index, where) {
      var points = this.line.getPoints();
      points[index] = where;
      this.line.setPoints(points);
      dynamo.draw();
    },
    
    setStock: function(index, stock) {
      this.stocks[index] = stock;
    },
    
    toJSON: function() {
      return {
        points: this.line.getPoints(),
        equation: this.equation, 
        stocks: _.map(this.stocks, function(v, i) {
          return (v ? v.id : null);
        })
      };
    }
  };
  
  dynamo.Flow.init = function() {
    this.$settings = $("#flow-dialog")
      .dialog({ autoOpen: false });
  };
  
})();