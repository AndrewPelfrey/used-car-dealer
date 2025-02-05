import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Build an absolute path to the client/dist folder
const clientBuildPath = path.resolve(__dirname, '../../client/dist');

// Serve static files from the React app
app.use(express.static(clientBuildPath));

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});