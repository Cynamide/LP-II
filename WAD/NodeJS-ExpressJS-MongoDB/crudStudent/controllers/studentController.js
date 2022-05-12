const studentModel = require('../models/student.js');

class StudentController{
    static dataPresent = false;

    static populateDb = async (req, res) => {
        try {
            if(!this.dataPresent){
                const insertedData = await studentModel.insertMany(
                    [
                        {
                            name: "Neil Deshpande",
                            roll: 33121,
                            wad: 99,
                            dsbda: 98,
                            cns: 97,
                            cc: 96,
                            ai: 95

                        },
                        {
                            name: "Dhanashree Lavekar",
                            roll: 33334,
                            wad: 98,
                            dsbda: 97,
                            cns: 96,
                            cc: 95,
                            ai: 94

                        },
                        {
                            name: "Arjit Agarwal",
                            roll: 33102,
                            wad: 97,
                            dsbda: 96,
                            cns: 95,
                            cc: 94,
                            ai: 93

                        },
                        {
                            name: "Shivendra Bhonsle",
                            roll: 33109,
                            wad: 96,
                            dsbda: 95,
                            cns: 94,
                            cc: 93,
                            ai: 92

                        },
                        {
                            name: "Manasi Hatekar",
                            roll: 33129,
                            wad: 99,
                            dsbda: 98,
                            cns: 97,
                            cc: 96,
                            ai: 95

                        },
                        {
                            name: "Janhavi Kolte",
                            roll: 33141,
                            wad: 96,
                            dsbda: 95,
                            cns: 94,
                            cc: 93,
                            ai: 92

                        },
                        {
                            name: "Pranav Bhagwat",
                            roll: 33161,
                            wad: 79,
                            dsbda: 78,
                            cns: 77,
                            cc: 76,
                            ai: 75

                        },
                        {
                            name: "Zeel Patel",
                            roll: 32321,
                            wad: 89,
                            dsbda: 88,
                            cns: 87,
                            cc: 86,
                            ai: 85

                        },
                        {
                            name: "Rathish Kumar",
                            roll: 32322,
                            wad: 69,
                            dsbda: 68,
                            cns: 67,
                            cc: 66,
                            ai: 65

                        },
                        {
                            name: "Yash Kale",
                            roll: 33233,
                            wad: 99,
                            dsbda: 98,
                            cns: 97,
                            cc: 96,
                            ai: 95

                        },
                    ]
                );
                console.log(insertedData);
                this.dataPresent = true;
                res.redirect('/students');
            }
            else{
                console.log("Data is already present in the DB");
                res.redirect('/students');
            }
        }
        catch(error){
            console.log(error);
        }
    };

    static getAllDocs = async (req, res) => {
        try {
            const students = await studentModel.find({});
            console.log(students);
            res.render('index', {data: students});
        }
        catch(error){
            console.log(error);
        }
    };

    static delete = async (req, res) => {
        try {
            const student = await studentModel.findByIdAndDelete(req.params.id);
            console.log(student);
            res.redirect('/students');
        }
        catch(error){
            console.log(error);
        }
    };

    static moreThan20 = async (req, res) => {
        try {
            const students = await studentModel.find({ dsbda: { $gt: 90 } });
            console.log(students);
            res.render('index', {data: students});
        }
        catch(error){
            console.log(error);
        }
    };

    static moreThan25 = async (req, res) => {
        try {
            const students = await studentModel.find({
                $and: [
                    {
                        wad: {$gt: 25}
                    },
                    {
                        dsbda: {$gt: 25}
                    },
                    {
                        cns: {$gt: 25}
                    },
                    {
                        cc: {$gt: 25}
                    },
                    {
                        ai: {$gt: 25}
                    },
                ]
            });
            console.log(students);
            res.render('index', {data: students});
        }
        catch(error){
            console.log(error);
        }
    };

    static lessThan40 = async (req, res) => {
        try {
            const students = await studentModel.find({
                $and: [
                    {
                        wad: {$lt: 40}
                    },
                    {
                        dsbda: {$lt: 40}
                    },
                ]
            });
            console.log(students);
            res.render('index', {data: students});
        }
        catch(error){
            console.log(error);
        }
    };

    static formatDb = async (req, res) => {
        try {
            const students = await studentModel.deleteMany({});
            console.log(students);
            this.dataPresent = false;
            res.redirect('/students');
        }
        catch(error){
            console.log(error);
        }
    };
};

module.exports = StudentController;