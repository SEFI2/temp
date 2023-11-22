// External
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";

// Local
import videoSchema from "./graphql/schemas/video.mjs";
import videoResolver from "./graphql/resolvers/video.mjs";
import cors from "cors";

// Environment variables
dotenv.config();
const {
  NODE_ENV,
  MONGO_DB_URI,
  PORT,
  HOST
} = process.env;

console.log({ NODE_ENV, MONGO_DB_URI, PORT, HOST });

// Express
const app = express();
mongoose.set("useCreateIndex", true);

app.get('/', (req, res) => {
  res.status(200).send('Success'); // Sends a success status code (200) with a message
});

// Set Secure Headers with Helmet
app.use(helmet());
app.use(helmet.permittedCrossDomainPolicies());
// app.use(cors());

// Serve React Application
if (NODE_ENV !== "development") {
  app.use(express.static("dist"));
}

// Init ApolloServer
const server = new ApolloServer({
  typeDefs: [videoSchema],
  resolvers: [videoResolver],
  fetchOptions: {
    mode: 'no-cors',
  },
  playground: {
    settings: {
      "request.credentials": "include",
      "schema.polling.enable": false,
    },
  },
  cors: cors(),
  context: ({ req, res }) => ({ req, res }),
});

console.log("CORS ENABLED");

// Init cors
server.applyMiddleware({
  app
});

// Connect to MongoDB and start the server
mongoose.connect(MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once("open", () => {
  app.listen(PORT, HOST, () => {
    console.log(`🚀 Server ready at http://${HOST}:${PORT}${server.graphqlPath}`)});
});
mongoose.connection.on("error", (error) => console.error(error));
