import mongoose from 'mongoose';

let isConnected: boolean = false;

const clientOptions = {
  serverApi: {
    version: "1" as const,
    strict: true,
    deprecationErrors: true
  }
};

const connectToDatabase = () => {
  (async () => {
    if (isConnected) {
      return;
    }

    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.error('MONGODB_URI is not set');
      return;
    }

    try {
      await mongoose.connect(uri, clientOptions);
      isConnected = true;
      console.log('MongoDB connected');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  })();
};

export default connectToDatabase;
