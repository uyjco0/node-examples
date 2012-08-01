A simple example combining:

   - Node.js
   - Express
   - Jade


To run it:

   - Run:
      - node ./app.js


It shows

   - How to use the 'bodyParser' middleware to process a multi-part form (load a file from the client into the server): 
      - Isn't necessary anymore to use directly the 'formidable' module (and 'connect-form' is deprecated)
   - How to check data about the loaded file:
      - In './routes/upload.js' is shown how that is done 


Important files:

   - ./app.js -> The file with the source code for the express 's application
   - ./routes/index.js -> The file is showing how the routes are modularizated and integrated to be used in the application
   - ./routes/upload.js -> The file is in charge to process the uploaded file once it is ready in the server
   - ./public/javascripts/app.js -> The file with the client-side application in jQuery

