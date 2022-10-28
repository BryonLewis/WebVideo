## Run Server Locally and serve files from ./data directory

Initial setup:
```
cd server
```

```sh
npm install
```

To build:
```sh
npm run dev
```

This will start the server on port:9000.  To fully use this you need to start the client as well by going into the client folder running `yarn`
followed by `yarn serve`.  The client will then be started at localhost:8080.  Refreshing the page will update the list of the zip files that are placed in the `./data` folder for this repo.
