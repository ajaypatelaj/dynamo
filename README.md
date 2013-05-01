# Dynamo

This project is in early development.

http://dynamo-dev.appspot.com/

# Using

* https://developers.google.com/appengine/downloads#Google_App_Engine_SDK_for_Python
* http://necolas.github.com/normalize.css/
* http://www.kineticjs.com/
* http://jquery.com/
* http://documentcloud.github.com/underscore/
* http://lesscss.org/
* http://amplifyjs.com/
* http://jqueryui.com/

# To Do

## Soonish

* Fix flow assignment bug:
*		Don't allow creation of new stocks on top of existing stocks.
*		When stocks do overlap, and a flow could match more than one, arbitrarily pick one.
* Nesting
* Arrows on flows
* Equation on flows
* Description on stocks
* Defer draws and saves?
* Report stage mousemove bug to kinetic

## More

* If you create a flow that's too short, or that has only the starting point, or that has both ends in the same stock, kill it.
* If you kill a stock that has one or more flows attached to it, kill the now-orphaned flow
* Stocks should remember their z index when saved.
* dynamo.drag's end function should get a proper mouse location rather than reusing lastWhere. We should then use that to make sure the flow end point is set properly.
* Rather than an absolute location, flows should know where they fall in relation to the stock. Either that, or they should always snap to the center of the stock.
* Perhaps we actually don't want stocks to resize?
* Zoom/pan for the world.
* When you resize a stock, if you drag past its minimum size and then drag out again, the mouse is no longer registered with the resize region.
* Some kind of cursor for stock creation and flow creation modes?
* If you are dragging a stock, the cursor should stay in drag mode even if the mouse goes over the resize region, and vice versa.
* The return key should close the dialog boxes.
* Description field for stocks.
* Equation for flows. Try out: http://silentmatt.com/javascript-expression-evaluator/
