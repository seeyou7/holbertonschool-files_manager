import express from 'express';
import routes from './routes/index.js';

const app = express();
const port = process.env.PORT || 5000;

// Load routes
app.use('/', routes);

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
