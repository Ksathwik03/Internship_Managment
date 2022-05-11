var express = require('express');
var router = express.Router();
const cors = require('cors');
const { isLoggedIn } = require('../middleWare/auth');
const { ApplyForIntern, appliedInterns, approveIntern, detailedApplication, facultyInterships, postInternship, getAllAvaliableInternships, getDetailedIntershipDetails } = require('../controllers/application');
router.use(cors({ origin: "http://localhost:3000", credentials: true }))

router.post('/apply/:internshipId', isLoggedIn, ApplyForIntern)
router.get('/appliedInterns/:applicationId', isLoggedIn, appliedInterns)
router.get('/appliedInternships', isLoggedIn, appliedInterns)
router.get('/approve/:applicationId', isLoggedIn, approveIntern)
router.get('/application/:applicationId', isLoggedIn, detailedApplication)
router.get('/facultyInterships', isLoggedIn, facultyInterships)
router.post('/internship', postInternship)
router.get('/internship', getAllAvaliableInternships)
router.get('/internship/:internshipId' , isLoggedIn , getDetailedIntershipDetails)

module.exports = router;
