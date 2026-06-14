import dns from 'node:dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);


import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";


const client = new MongoClient(process.env.MONGO_DB_URI);
console.log(process.env.MONGO_DB_URI, process.env.AUTH_DB_NAME)
const db = client.db(process.env.AUTH_DB_NAME);


export const auth = betterAuth({

  emailAndPassword: {
    enabled: true,
  },

  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),

  user: {
    additionalFields: {
      role: {
        default: "seeker"
      }
    }
  }
});


