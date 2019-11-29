const express = require("express");

const router = express.Router();

const { registerStudents } = require("../controllers/auth");

// router.post('/register/tollCollector', registerTollCollector);
// router.post('/code/delete', deleteCode);
// router.post('/code/request', requestCode);
// router.post('/code/resend', resendCode);
// router.post('/code/verify', verifyCode);
// router.post('/login/revHead', loginRevenueHead);
router.post("/register/student", registerStudents);

module.exports = router;
