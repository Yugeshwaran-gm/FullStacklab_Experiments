# Simple NodeJS Static Server (No Express)

This project demonstrates a basic NodeJS server that serves static HTML and CSS files without using Express.

## How to Run

1. Make sure you have [Node.js](https://nodejs.org/) installed.
2. Open a terminal and navigate to the `ex1` directory.
3. Run the server:
   ```
   node server.js
   ```
4. Open your browser and go to [http://127.0.0.1:3000](http://127.0.0.1:3000)

## Project Structure

```
ex1/
├── public/
│   ├── index.html
│   ├── style.css
│   └── 404.html
├── server.js
└── README.md
```

- `server.js`: The NodeJS server code.
- `public/`: Folder containing static files (HTML, CSS, etc). 