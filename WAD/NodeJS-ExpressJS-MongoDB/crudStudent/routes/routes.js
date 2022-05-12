const StudentController = require('../controllers/studentController.js')
const express = require('express');
const router = express.Router();

router.get('/', StudentController.getAllDocs);

router.get('/populateDb', StudentController.populateDb);
router.get('/formatDb', StudentController.formatDb);

router.get('/more-than-20', StudentController.moreThan20);
router.get('/more-than-25', StudentController.moreThan25);
router.get('/less-than-40', StudentController.lessThan40);
router.get('/delete/:id', StudentController.delete);

module.exports = router;