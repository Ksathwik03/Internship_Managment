var express = require('express');
var router = express.Router();
const cors = require('cors');
const { isLoggedIn } = require('../middleWare/auth');
const { ApplyForIntern, appliedInterns, approveIntern, detailedApplication, facultyInterships } = require('../controllers/application');
router.use(cors({ origin: "http://localhost:3000", credentials: true }))

router.post('/apply/:internshipId', isLoggedIn, ApplyForIntern)
router.get('/appliedInterns/:applicationId', isLoggedIn, appliedInterns)
router.get('/appliedInternships', isLoggedIn, appliedInterns)
router.put('/approve/applicationId', isLoggedIn, approveIntern)
router.get('/application/:applicationId', isLoggedIn, detailedApplication)
router.get('/facultyInterships/:facultyID', isLoggedIn, facultyInterships)

module.exports = router;
