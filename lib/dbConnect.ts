import mongoose from 'mongoose';

// const MONGODB_URI = process.env.MONGODB_URI;
let MONGODB_URI = '';
if (
  process.env.MDB_USERNAME &&
  process.env.MONGODB_URL &&
  process.env.MDB_PASSWORD &&
  process.env.MDB_DBNAME
) {
  MONGODB_URI = process.env.MONGODB_URL.replace(
    '{MDB_USERNAME}',
    process.env.MDB_USERNAME,
  )
    .replace('{MDB_PASSWORD}', process.env.MDB_PASSWORD)
    .replace('{MDB_DBNAME}', process.env.MDB_DBNAME);
}

console.log(MONGODB_URI);

if (!MONGODB_URI || MONGODB_URI === '') {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local',
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
