A simple example combining:

   - Node.js
   - Express
   - Jade
   - Backbone
   - jQuery
   - D3


To run it:

   - Run:
      - node ./app.js


It shows 

   - How to pass DOM elements between D3 and jQuery:
      - From jQuery -> D3
      - From D3 -> jQuery

   - It shows how to use D3 and jQuery for the rendering of a backbone 's View (instead of a standard template library).

   - It shows that the events managed by D3 could be binded to a backbone 's View:
      - It also shows that instead of managing the event with D3, could be managed by jQuery
      - The event is first managed by the D3 handler (or jQuery handler), and next by the View's handler:
         - The D3/jQuery event handler for the 'mouseover' event is printing in console '1' and the View's handler is printing '2'


Important files:

   - ./app.js -> The file with the source code for the express 's application
   - ./public/javascripts/app.js -> The file with the source code for the client-side application (here's 
                                    happening all the backbone/D3/jQuery stuff)
