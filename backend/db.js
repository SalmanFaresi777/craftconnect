const mongoose = require('mongoose');

//const mongoURI = "mongodb+srv://gofood:gofood123@cluster0.iwxmg.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0";
//"mongodb://gofood:gofood123@cluster0-shard-00-00.iwxmg.mongodb.net:27017,cluster0-shard-00-01.iwxmg.mongodb.net:27017,cluster0-shard-00-02.iwxmg.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-v196qp-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"
const mongoURI ="mongodb://gofood:gofood123@cluster0-shard-00-00.iwxmg.mongodb.net:27017,cluster0-shard-00-01.iwxmg.mongodb.net:27017,cluster0-shard-00-02.iwxmg.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-v196qp-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI); // No need for deprecated options
        console.log("Connected to MongoDB successfully!");

        // Fetch data from food_items collection
        const fetched_data = await mongoose.connection.db.collection("food_items");
        fetched_data.find({}).toArray(function(err, data){
            if (err) console.log(err);
            else console.log();
        });

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectToMongo;
