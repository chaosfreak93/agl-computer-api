import express from 'express';
import bodyParser from 'body-parser';
import { graphqlHTTP } from 'express-graphql';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';

import graphQlSchema from './graphql/schema/index.js';
import graphQlResolvers from './graphql/resolvers/index.js';

const app = express();

app.use(bodyParser.json());
app.use(cors("*"));

app.post("/graphql", graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: false
}));

app.get("/graphql", graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: (process.env.ENABLE_UI === "true")
}));

mongoose
    .connect(process.env.MONGODB)
    .then(() => {
        console.log("Connection to database successfull");
        console.log("----------------------------------");
        app.listen(4000, () => {
            console.log("GraphQL server running at http://127.0.0.1:4000/graphql.");
        });
    })
    .catch(err => console.log(`Error connecting to database: ${err}`));
    