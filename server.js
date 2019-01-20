const express = require('express');
const compression = require('compression');
const path = require('path');

const app = express();
app.use(compression());

app.use(express.static(path.resolve(__dirname, 'build')));

const PORT = process.env.PORT || 3001;
app.listen(PORT, function() {
    console.log('Server started on port', PORT);
});
