/*globals dynamo, Kinetic */

(function() {

  dynamo.Stock = function(config) {
    var self = this;
    this.name = config.name || "Stock";
    this.value = (config.value === undefined ? 100 : config.value);
    this.flows = [];
    this.id = config.id || dynamo.Stock.nextId();
        
    this.group = new Kinetic.Group({
      x: config.x,
      y: config.y
    });
    
/*
    if (config.z !== undefined) {
      this.group.setZIndex(config.z);
    }
*/
      
    this.rect = new Kinetic.Rect({
      x: 0,
      y: 0,
      width: config.width || 100,
      height: config.height || 50,
      fill: "white",
      stroke: "black",
      strokeWidth: 2,
      cornerRadius: 8
    });
    
    this.nameLabel = new Kinetic.Text({
      x: 4,
      y: 4,
      text: this.name,
      fontSize: 15,
      fontFamily: "Calibri",
      textFill: "black"
    });
    
    this.valueLabel = new Kinetic.Text({
      x: 4,
      y: 24,
      text: this.value,
      fontSize: 15,
      fontFamily: "Calibri",
      textFill: "black"
    });
    
    this.group.add(this.rect);

    this.group.add(this.nameLabel);
    
    this.group.add(this.valueLabel);
        
    function isResize(where) {
      var p = self.group.getPosition();
      var s = self.rect.getSize();
      return (where.x > p.x + (s.width - 20) && where.y > p.y + (s.height - 20));
    }
    
    this.group.on("mousemove", function(event) {
      if (dynamo.mode != "move") {
        return;
      }
      
      $("#viewport").css({
        cursor: (isResize(dynamo.getWhere(event)) ? "se-resize" : "move")
      });
    });
    
    this.group.on("mouseout", function(event) {
      $("#viewport").css({
        cursor: "default"
      });
    });
    
    this.group.on("mousedown", function(event) {
      if (dynamo.mode != "move") {
        return;
      }
      
      var where = dynamo.getWhere(event);
      var drag = {
        where: where,
        end: function() {
          dynamo.save();
        }
      };
      
      if (isResize(where)) {
        drag.move = function(where, diff) {
          var size = self.rect.getSize();
          size.width += diff.x;
          size.height += diff.y;
          size.width = Math.max(size.width, 100);
          size.height = Math.max(size.height, 50);
          self.rect.setSize(size);
          dynamo.draw();
        };
      } else {
        drag.move = function(where, diff) {
          var pos = self.group.getPosition();
          pos.x += diff.x;
          pos.y += diff.y;
          self.group.setPosition(pos);
          
          _.each(self.flows, function(v, i) {
            var p = v.flow.getPoint(v.index);
            p.x += diff.x;
            p.y += diff.y;
            v.flow.setPoint(v.index, p);
          });
          
          dynamo.draw();
        };
      }

      self.group.moveToTop();
      dynamo.draw();
      dynamo.drag(drag);
    });
    
    this.group.on("dblclick", function(event) {
      var $settings = dynamo.Stock.$settings;

      var $name = $settings.find(".name-input")
        .val(self.name);

      var $value = $settings.find(".value-input")
        .val(self.value);
      
      function handleOK() {
        self.name = $name.val();
        self.nameLabel.setText(self.name);
        self.value = parseFloat($value.val());
        self.valueLabel.setText(self.value);
        $settings.dialog("close");
        dynamo.draw();
        dynamo.save();
      }      
      
      $settings.dialog("option", {
        position: [self.group.getX(), self.group.getY() + self.rect.getHeight() + 5],
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
      
      $name.focus().select();
    });
  };
  
  dynamo.Stock.prototype = {
    destroy: function() {
    },
    
    node: function() {
      return this.group;
    },
    
    toJSON: function() {
      return {
        x: this.group.getX(),
        y: this.group.getY(),
        z: this.group.getZIndex(),
        width: this.rect.getWidth(),
        height: this.rect.getHeight(),
        name: this.name,
        value: this.value,
        id: this.id
      };
    },
    
    addFlow: function(index, flow) {
      this.flows.push({
        index: index,
        flow: flow
      });
    }
  };
  
  dynamo.Stock.init = function() {
    this.$settings = $("#stock-dialog")
      .dialog({ autoOpen: false });
      
    this.lastId = amplify.store("stockLastId") || 0;
  };
  
  dynamo.Stock.nextId = function() {
    this.lastId++;
    amplify.store("stockLastId", this.lastId);
    return this.lastId;
  };
  
})();