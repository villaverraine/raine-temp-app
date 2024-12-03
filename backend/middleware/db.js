import mongoose, { mongo } from 'mongoose';

const connectToDatabase = async () => {
    const uri = process.env.URI;
    const clientOptions = {
        serverApi: { version: "1", strict: true, deprecationErrors: true },
    };

    // Connect the server to the database
    try {
        await mongoose.connect(uri, { dbName: "AWSTicketApp" }, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("Pinged your deployment. Successfully connected to MongoDB!");
    } catch (error) {
        await mongoose.disconnect();
        console.error('Failed to connect to DB:', error);
    }
};

export default connectToDatabase;