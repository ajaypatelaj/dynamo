/*globals dynamo, Kinetic */

(function() {

  dynamo.Stock = function(config) {
    var self = this;
    this.name = "Stock";
    this.value = 100;
    
    this.group = new Kinetic.Group({
      x: config.x,
      y: config.y
    });
      
    this.rect = new Kinetic.Rect({
      x: 0,
      y: 0,
      width: 100,
      height: 50,
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
    
    function getWhere(event) {
      return {
        x: event.clientX,
        y: event.clientY
      };
    }
    
    function isResize(where) {
      var p = self.group.getPosition();
      var s = self.rect.getSize();
      return (where.x > p.x + (s.width - 20) && where.y > p.y + (s.height - 20));
    }
    
    this.group.on("mousemove", function(event) {
      $("#viewport").css({
        cursor: (isResize(getWhere(event)) ? "se-resize" : "move")
      });
    });
    
    this.group.on("mouseout", function(event) {
      $("#viewport").css({
        cursor: "default"
      });
    });
    
    this.group.on("mousedown", function(event) {
      var lastWhere = getWhere(event);
      self.group.moveToTop();
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
          var pos = self.group.getPosition();
          pos.x += where.x - lastWhere.x;
          pos.y += where.y - lastWhere.y;
          self.group.setPosition(pos);
          lastWhere = where;
          dynamo.draw();
        });
        
        $(window).mouseup(function(event) {
          $(window).unbind("mousemove");
          $(window).unbind("mouseup");
        });
      }
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
      }      
      
      $settings.dialog("option", {
        position: [self.group.getX(), self.group.getY() + self.rect.getHeight() + 5],
        buttons: {
          Cancel: function() {
            $settings.dialog("close");
          },
          OK: handleOK
        }
      });
      
      $settings.dialog("open");
      
      $name.focus().select();
    });
  };
  
  dynamo.Stock.prototype = {
    node: function() {
      return this.group;
    }
  };
  
  dynamo.Stock.init = function() {
    this.$settings = $("#stock-dialog")
      .dialog({ autoOpen: false });
  };
  
})();