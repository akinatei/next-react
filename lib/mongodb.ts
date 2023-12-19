//@ts-nocheck

import { MongoClient } from "mongodb";
import * as mqtt from 'mqtt'

if (!process.env.MONGODB_URI) {
    throw new Error('Invalid enviroment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const optons = {}

let client
let clientPromise: Promise<MongoClient>

if (!process.env.MONGODB_URI) {
    throw new Error('Please add your Mongo URI to .env.local')
}

if (process.env.NODE_ENV === 'development') {

    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, optons)
        global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
} else {
    client = new MongoClient(uri, optons)
    clientPromise = client.connect()
}

export default clientPromise