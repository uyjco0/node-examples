//The variable 'app' holds the client-side application.
window.app = {}


//The function in charge of drawing the interactive graph'.
window.app.RenderGraph = function (node, width, height) {

	var   nodes
	    , links
	    , canvas
	    , canvasBorder
	    , force
	    , charge = -500
	    , gravity = 0.17
	    , linkDist = 70
	    , nodeRadius = 30
	      // The function used to build the color
              // scale used to paint the nodes.
            , fill = d3.scale.category20(); 

	/*
			+++++++++++ Setting the data for the graph 's NODES  +++++++++++
	
	 Each DOM element associated to a graph's node has ( in the '__data__' field) the following attributes:

		index  - The zero-based index of the node within the data nodes array (specified below).
		x      - The x-coordinate of the current node position.
		y      - The y-coordinate of the current node position.
		px     - The x-coordinate of the previous node position.
		py     - The y-coordinate of the previous node position.
		fixed  - A boolean indicating whether node position is locked.
		weight - The node weight; the number of associated links.

	These attributes do not need to be set (as a data) before passing the nodes to the layout:
		(1) If they are not set, suitable defaults will be initialized by the layout when the 'start' function is called. 
		(2) If they are set, be aware with the your custom data attributes (if there are custom data attributes):
                       The name of the custom data attributes should not conflict with the name of previous attributes.

		        ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	*/

	// The data node array:
          // Here 'name' and 'type' are custom data attributes.
	nodes = [
			  // Here the 'node1' is being drawn at the position <x=30, y=50>, and 'fixed' equal to 'true'
			  // avoids the node being moved from there by the layout forces that are stabilizing the 
			  // node 's positions. That doesn't mean that later is not possible to drag this node (if 
			  // dragging is enabled).
			  {"name": "node1", "type": 1, "x":width/2, "y": height/2, "fixed": "true"}

			, {"name": "node2", "type": 1}
			, {"name": "node3", "type": 2}
			, {"name": "node4", "type": 3}
		];



	/*

		       +++++++++++ Setting the data for the graph 's LINKS  +++++++++++

	 Each DOM element associated to a graph's link has ( in the '__data__' field) the following attributes:

		source - The source node (the 'index' of the source node).
		target - The target node (the 'index' of the target node).

		       ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	*/

    	// The data link array:
	  // Here 'importance' is a custom data attribute. 
	links = [
                	  {"source": 0, "target": 1, "importance": 1}
                	, {"source": 0, "target": 2, "importance": 2}
                	, {"source": 0, "target": 3, "importance": 3}
                	, {"source": 3, "target": 2, "importance": 4}
            ];


	// Here I'm creating the SVG element (a kind of "canvas") in which all the SVG drawing
        // will be made:
           // The variable 'canvas' has the DOM element created by 'd3.js' in order to hold the SVG "canvas":
              // This DOM element is created as a child of the DOM element referenced by the 'node' variable.
        canvas = d3.select(node)
                    .append("svg:svg")
                      .attr("width", width)
                      .attr("height", height);

	//Here I'm drawing a green rectangle around the SVG "canvas" area.
	canvasBorder = canvas.append("svg:rect")
    			.attr("width", width)
    			.attr("height", height)
                	.attr("style", "fill: none; stroke:green; stroke-width:5;");


	// Here I'm creating the layout function in charge to draw the graph.
	force = d3.layout.force()

			// It binds the data array to the 'force' function.
			.nodes(nodes)
			.links(links)

			.size([width, height])

			// Here I'm using a big 'charge' to avoid at maximum node overlapping.
			.charge(charge)

			// Here I'm compensating the increasing of 'charge' with a bit more of 'gravity' (the default is '0.1'),
			// cause if not in the case of adding more nodes, when there are so much, they are going out from the 
			// SVG "canvas" cause the 'charge' force.
			.gravity(gravity)

			.linkDistance(linkDist);


	// Here I'm calculating the new coordinates for the graph's graphical elements once the 'force' layout has
        // the new coordinates after a simulation's step (its sending the 'tick' event when the simulation's step ends).
	force.on("tick", function() {

		canvas.selectAll("line.link")
			.attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) { return d.target.x; })
			.attr("y2", function(d) { return d.target.y; });

		canvas.selectAll("circle.nodecircle")
			.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; });

		canvas.selectAll("text.nodetext")
                        .attr("x", function(d) { return d.x; })
                        .attr("y", function(d) { return d.y; });
	});

	// Here I'm adding a handler associated to a mouse's click over the SVG "canvas":
          // The mouse's click means to add a new node into the graph.
	canvas.on("mousedown", function() {
  		  
                    // It get the coordinates of the mouse 's click.
		var point = d3.svg.mouse(this),
		
	            // It creates a new data object representing a new graph's node.
      		    node = {x: point[0], y: point[1], name: 'new', type:4},

	            // Add the new data object to the 'nodes' array.		
      		    n = nodes.push(node);

		// Actualizes the graph's graphical version according to the new 'nodes' array.
  		restart();
	});


	// It creates the first graph 's graphical version.
	restart();


	// The function is in charge of creating the graph's graphical elements (SVG lines, circles and texts) using the data
	// in the arrays 'nodes' and 'links'.
	function restart() {
  
		canvas.selectAll("line.link").data(links).enter()

			// Here are being created the graphical representation of the graph 's links: a SVG line:
			   // Its important to insert the SVG line before the SVG circle, cause in the opposite, as 
                           // they are overlaping, the drawing of the SVG line is seen inside of the drawing of the SVG circle. 
                        .insert("svg:line", "circle.node")

                                .attr("class", "link")
                                .style("stroke-width", function(d) { return d.importance; })
                                .style("stroke", "green")
                                .attr("x1", function(d) { return d.source.x; })
                                .attr("y1", function(d) { return d.source.y; })
                                .attr("x2", function(d) { return d.target.x; })
                                .attr("y2", function(d) { return d.target.y; });

		// A 'g' tag is used to group toghether a set of graphical elements (SVG elements):
          		// Here I'm grouping the 'circle' representing the node, and the 'text' with the node 's label:
			  // Cause they belong to the same group, they are sharing the data (attached to 'g').
		canvas.selectAll("g.node").data(nodes).enter()
			.append("svg:g")
        			.attr("class", "node")

				// Enable to drag any graph's node.
        			.call(force.drag);

		// Here are being created the graphical representation of a node: a SVG circle.
                canvas.selectAll("g.node")
			.append("svg:circle")
                                .attr("class", "nodecircle")
                                .attr("cx", function(d) { return d.x; })
                                .attr("cy", function(d) { return d.y; })
                                .attr("r", nodeRadius)

                                // It fills the nodes with a color scalated according the
                                // node attribute 'type':
                                        // Thus, nodes with the same 'type' are equally painted,
                                        // and nodes with numerical close 'type' have similar
                                        // colors.
                                .style("fill", function(d) { return fill(d.type); })
				.on("mouseover", function(d) { showInfo(d);});
	
		// Here are being created the text labels associated to the graph 's nodes.	
		canvas.selectAll("g.node")
			.append("svg:text")
        			.attr("class", "nodetext")
				.attr("text-anchor", "middle")
				.attr("x", function(d) { return d.x; })
				.attr("y", function(d) { return d.y; })
        			.attr("dy", ".35em")
        			.text(function(d) { return d.name });


  		force.start();
	};


	// Helper function in charge to show information about a graph's node when the mouse is over the node.
	function showInfo (d) {

  		var   info = $("#info-template").find("#info")
     	 	    , snippet = info.find(".snippet")
      		    , list = snippet.find("ul")
                    , item;

  		info.hide();

  		info.find("h2.info-title").empty().text(d.name);

  		list.empty();

  		item = $('<li><p></p></li>');

  		item.find("p").text(d.x);

  		list.append(item);

  		item = $('<li><p></p></li>');

  		item.find("p").text(d.y);

  		list.append(item);

  		info.show();
	}


}




// The the HTML document's DOM tree is ready, I'm invoking all the code that need access to the HTML document 's DOM elements:
   // For that I'm using the jQuery shorcut.
$(document).ready(function() {

	var node = $("#canvas").get(0);

        window.app.RenderGraph(node, 400, 400);

});

