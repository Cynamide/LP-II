const mongoose = require('mongoose');

const connectDb = async (URL) => {
    try{
        const options = {
            dbName: "student"
        };
        await mongoose.connect(URL, options);
        // const db = mongoose.connection;
        // db.once("open", function () {
        //     console.log("Database connected successfully.");
        // });
    }
    catch(error){
        console.log(error);
    }
};

module.exports = connectDb; 