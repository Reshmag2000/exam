const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User');

router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('User not found');

//   if (user.otp !== otp) {
//     return res.status(400).send('Invalid OTP');
//   }


  const otp = crypto.randomBytes(4).toString('hex');
  user.otp = otp;
  await user.save();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'reshma2000@gmail.com',
      pass: 'fedc emcd frgh cdem',
    },
  });

  const mailOptions = {
    from: 'rg484386@gmail.com',
    to: email,
    subject: 'OTP for registration',
    text: `Your OTP is ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Error in sending OTP.try again...');
    }
    res.send('OTP sent to email');
  });





  //route for verify otp
  router.post('/verify-otp', async (req, res) => {
    const { otp, email } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.otp !== otp) return res.status(400).send('Invalid OTP');
    res.send('Invalid OTP');
  });

  //redirect to another welcome page
  router.post('/otp', async (req, res) => {
    const { otp, email } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.otp !== otp) return res.status(400).send('Invalid OTP');
    res.redirect('/welcome');
  });
  
});

module.exports = router;