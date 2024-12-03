import 'dotenv/config';
import mongoose, { mongo } from 'mongoose';
import express from 'express';
import cors from 'cors';

//db connection
import connectToDatabase from './middleware/db.js';

//Endpoint routers
import authRoutes from './routes/auth.js';
import crudRoutes from './routes/crud.js';
import searchRoutes from './routes/search.js';
import maintenanceRoutes from './routes/maintenance.js';

async function main() {
  console.log(process.env.URI);
  console.log(process.env.PORT);
  const port = process.env.PORT;
  const app = express();
  app.use(cors());
  app.use(express.json());

  // Connect the server to the database
  connectToDatabase();

  // ----------------|| API Calls ||----------------
  //AUTH ROUTES
  app.use('/api/auth', authRoutes);

  //SEARCH ROUTES
  app.use('/api/search', searchRoutes);

  //CRUD ROUTES
  app.use('/api/crud', crudRoutes);

  //HEALTHCHECK ROUTE
  app.use('/api', maintenanceRoutes);

  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on Port: ${port}`);
  });
}

main();
