A simple example combining:

   - Node.js
   - Express
   - Jade


To run it:

   - Run:
      - node ./app.js


It shows

   - How to make JSONP calls through Express:
      - One call is to the Express server itself
      - The other call is to Twitter


Important files:

   - ./app.js -> The file with the source code for the express 's application
   - ./routes/index.js -> The file is showing how the routes are modularizated and integrated to be used in the application
   - ./routes/jsonp.js -> The file is showing how to answer a JSONP call
   - ./public/javascripts/app.js -> The file with the client-side application in jQuery

