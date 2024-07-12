import { ApolloServer, gql } from 'apollo-server';
import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
import { getUsers, getUser, createUser, updateUser, deleteUser } from './controllers/UserController.js';
import { createPost, deletePost, updatePost } from './controllers/PostController.js';

configDotenv();


const typeDefs = gql`
  type User {
    id: ID!
    name: String
    email: String
    posts: [Post]
  }

  type Post {
    id: ID!
    title: String
    content: String
  }

  type Query {
    getUsers: [User],
    getUser(id: ID!): User
  }

  type Mutation {
    createUser(name: String, email: String): User
    deleteUser(id: ID!): User
    updateUser(id: ID!, name: String, email: String): User
    createPost(title: String, content: String, userId: ID!): Post
    deletePost(id: ID!): Post
    updatePost(id: ID!, title: String, content: String): Post
  }
`;

const resolvers = {
    Query: {
        getUsers,
        getUser
    },
    Mutation: {
        createUser,
        updateUser,
        deleteUser,
        createPost,
        updatePost,
        deletePost
    }
};

const server = new ApolloServer({ typeDefs, resolvers });
mongoose.connect(process.env.DB_URI || "").then(() => {
    console.log("Connected to db successfully!")
    server.listen().then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`);
    });
});


