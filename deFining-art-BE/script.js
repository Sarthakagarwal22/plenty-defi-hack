import { MongoClient } from 'mongodb';
import {getTwoDigitInteger, daysInMonth} from './utils/date-utils.js';
import {randomIntFromInterval} from './utils/number-utils.js';

export function connectToDb() {
  const uri = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@definingart.0lck4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(async (err) => {
      if(err){
          console.log('Connection to Database failed, Error - ', err);
          return;
      }
      console.log("Connected to Database");
      const calendarDb = client.db("calendar");
      
      const dateCategoryArray = [];
      const tweetsCategoryArray = ['Business', 'Entertainment', 'Health', 'Crypto', 'Sports', 'Technology', 'Astronomy'];
      for(let i = 1; i <= 12; i++){
        for(let j = 1; j <= 31; j++){

          if(j > daysInMonth(i)){
            break;
          }

          let randomCategoryIndex = randomIntFromInterval(0,6);
          dateCategoryArray.push({
            date: `${getTwoDigitInteger(i)}-${getTwoDigitInteger(j)}`,
            category: tweetsCategoryArray[randomCategoryIndex]
          });
        }
      }

      dateCategoryArray.shift();
      await calendarDb.collection("events").insertMany(dateCategoryArray)
      client.close();
  });

}