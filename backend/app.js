import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import registerRouter from './routes/index.js'
import yaml from 'js-yaml'; // Import YAML parser (js-yaml)
import fs from 'fs'; // Import the file system module

// Load the config file
const config = yaml.load(fs.readFileSync('config/config.yaml', 'utf8'));

const app = express();

const initialize = (app) => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded());
    mongoose.connect(config.mongodbURL);
    registerRouter(app);
}

export default initialize;
