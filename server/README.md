# Backend Server Setup

This is the backend API server which connects to the MongoDB.

To install node.js, run:
```
npm install
```

To run the server for development, navigate to this folder then type:
```
npm run dev
```

Note: Run this server in a seperate command prompt with the Vue server, then make requests to this server for the data.

# Populate Database

To populate the database, run:
```
npm run populate-database
```
This will fill the database with the data found in [```./scripts/populate.js```](./scripts/populate.js)