import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


export const loadDB = async() => {
    await mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@definingart.0lck4.mongodb.net/calendar?retryWrites=true&w=majority`, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    });
    await mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@definingart.0lck4.mongodb.net/twitter?retryWrites=true&w=majority`, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    });
    await mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@definingart.0lck4.mongodb.net/util?retryWrites=true&w=majority`, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    });
    await mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@definingart.0lck4.mongodb.net/images?retryWrites=true&w=majority`, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    });
}

// export const eventsDB = mongoose.createConnection(`mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@definingart.0lck4.mongodb.net/calendar?retryWrites=true&w=majority`, {
//     useNewUrlParser: true, 
//     useUnifiedTopology: true
// });