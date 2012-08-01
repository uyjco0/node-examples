//The variable 'app' holds the client-side application.
window.app = {}

//Auxiliar function to draw the SVG elements with the help of 'd3.js'.
window.app.RenderView = function (node, width, height) {

	// Here I'm creating the SVG element (a kind of "canvas") in which all the SVG drawing
        // will be made:
           // The variable 'viz' has the DOM element created by 'd3.js' in order to hold the SVG "canvas":
              // This DOM element is created as a child of the DOM element referenced by the 'node' variable.
        var viz = d3.select(node)
                    .append("svg:svg")
                      .attr("width", width)
                      .attr("height", height);

	//The variable 'ci' has the DOM element created by 'd3.js':
          // In this DOM element is set the 'SVG' tag with a circle shape.
        var ci = viz.append("svg:circle")
        	      .style("stroke", "gray")
                      .style("fill", "white")
                      .attr("class", "test")
                      .attr("r", 40)
                      .attr("cx", 50)
                      .attr("cy", 50);
		      // (++ ** ++)
                      //.on("mouseover", function(){console.log(1); d3.select(this).style("fill", "aliceblue");})
                      //.on("mouseout", function(){d3.select(this).style("fill", "white");});
		      // (++ ** ++)

        var te = viz.append("svg:text")
	              .attr("text-anchor", "middle")
		      .attr("dy", ".3em")
		      .attr("x", 50)
		      .attr("y", 50)
		      .text("TEST");
	
	//Here I'm passing to jQuery the DOM element created by 'd3.js':
          //I'm binding over this DOM element a handler for the 'mouseover' event:
            // Its possible (and works) do the same through 'd3.js', as is shown above in (++ ** ++):
              // But for compatibility with 'backbone.js' (its dependency on jQuery), its more safer 
              // that the events are being managed by jQuery.
	$(ci[0]).mouseover(function(){
                
			console.log(1);

			d3.select(this).style("fill", "aliceblue");
		})
		.mouseout(function(){
                
                        d3.select(this).style("fill", "white");
                })
		.mousedown( function () {
	
			d3.select(this).transition()
        			.duration(1000)
        			.attr("r", 10);
		});

}

// Here is created the 'Topic' document (data structure), which holds the application 's data.
window.app.Topic = Backbone.Model.extend({});


// Here is created the view associated with the 'Topic' model.
window.app.TopicView = Backbone.View.extend({

	initialize: function() {

        	_.bindAll(this, 'render', 'handleMouseOver');

        },

	// The view binding to the user 's GUI interaction.
        events: {
		  // Its binding the 'mouseover' event over an element with the class 'test', with the view's 'handleMouseOver' method:
                    // Its possible to use the same jQuery syntax, so its possible for example:
                       //" 'mouseover #test': 'handleMouseOver' "-> The binding is now with the event over an elment with ID equal to 'test'. 
        	  'mouseover .test': 'handleMouseOver'
        },

	// The function to draw in the HTML document the part of the user's GUI associated with the view.
        render: function(w,h) {

		//The variable 'node' holds the DOM node (obtained through jQuery) to be passed to d3.js
        	var node = this.el.get(0);

                window.app.RenderView(node, w, h);
        },

        handleMouseOver: function(){
        	console.log(2);
        }

});

// Here I'm creating an instance of Topic in order to store the application data.
window.app.topicModel = new window.app.Topic();

// The the HTML document's DOM tree is ready, I'm invoking all the code that need access to the HTML document 's DOM elements:
   // For that I'm using the jQuery shorcut to
$(document).ready(function() {

	// Here I'm creating an instance of TopicView:
          // The instance is receiving as a paramenters:
	    // (1): The model (the application data) to which the view is being associated.
            // (2): An HTML document's DOM element:
	            // Which is associated to the HTML <div> with 'id' equal to '#viz':
			// (a) This DOM element is set to the view 's 'el' property.
	               //  (b) The user 's GUI will be drawn inside of this DOM element (by the 'render' method). 
	window.app.topicView = new window.app.TopicView({model: window.app.topicModel, el: $("#viz")});

	// Here I'm drawing the view (that means that is generating the user 's GUI in the HTML document.
        window.app.topicView.render(400, 400);

});

