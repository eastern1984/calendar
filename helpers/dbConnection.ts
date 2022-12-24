
// /lib/dbConnect.js
import mongoose from 'mongoose'

/** 
Source : 
https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/utils/dbConnect.js 
**/


const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn
    }
    console.log(111111, MONGODB_URI, cached.promise);
    if (!cached.promise) {

        console.log(2222222, MONGODB_URI);
        cached.promise = mongoose.connect(MONGODB_URI || "", opts).then(mongoose => {
            console.log(3333333, MONGODB_URI);
            return mongoose
        }).catch((err: any) => {
            console.log(7777, err);
        })
    }
    cached.conn = await cached.promise
    console.log(4444, cached.conn);
    return cached.conn
}

export default dbConnect