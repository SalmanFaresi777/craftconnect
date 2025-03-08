const mongoose = require('mongoose');

//const mongoURI = "mongodb+srv://gofood:gofood123@cluster0.iwxmg.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0";
//"mongodb://gofood:gofood123@cluster0-shard-00-00.iwxmg.mongodb.net:27017,cluster0-shard-00-01.iwxmg.mongodb.net:27017,cluster0-shard-00-02.iwxmg.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-v196qp-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"
const mongoURI ="mongodb://gofood:gofood123@cluster0-shard-00-00.iwxmg.mongodb.net:27017,cluster0-shard-00-01.iwxmg.mongodb.net:27017,cluster0-shard-00-02.iwxmg.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-v196qp-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB successfully!");

        // Fetch data from collections using promises
        const fetchData = async () => {
            try {
                const foodItemsCollection = mongoose.connection.db.collection("food_items");
                const foodCategoryCollection = mongoose.connection.db.collection("foodCategory");

                const [foodItems, foodCategories] = await Promise.all([
                    foodItemsCollection.find({}).toArray(),
                    foodCategoryCollection.find({}).toArray()
                ]);

                global.food_items = foodItems;
                global.foodCategory = foodCategories;

                console.log("Data loaded successfully!");
            } catch (error) {
                console.error("Error fetching data:", error);
                throw error; // Re-throw to be caught by the outer try-catch
            }
        };

        // Initial data fetch
        await fetchData();

    } catch (error) {
        console.error("Database connection/initialization error:", error);
        process.exit(1);
    }
};

module.exports = connectToMongo;
