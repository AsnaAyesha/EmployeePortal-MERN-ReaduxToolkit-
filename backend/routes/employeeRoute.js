const express = require('express');
const employeeController = require('../controllers/employeeController')
const router = express.Router()

router.get('/',employeeController.getEmployee);
router.post('/addemployee',employeeController.addEmployee);
router.patch('/:id',employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee)

module.exports = router;

