import React , { useState } from 'react'
import axios from 'axios';


const Email = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [otpForm, setOtpForm] = useState(false);
    const [otp, setOtp] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post('/api/send-otp', form);
          setOtpForm(true);
        } catch (error) {
          console.error(error);
        }
      };
    
      const handleOTPSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post('/api/verify-otp', { otp, email: form.email });
          if (res.data.success) {
          } else {
            alert('Invalid OTP');
          }
        } catch (error) {
          console.error(error);
        }
      };
    
    
  return (
    <div>
        {!otpForm && (
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input type="email" name="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </label>
          <button type="submit">Submit</button>
        </form>
      )}
      {otpForm && (
        <form onSubmit={handleOTPSubmit}>
          <label>
            OTP:
            <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required />
          </label>
          <button type="submit">Verify OTP</button>
        </form>
      )}
    </div>
  )
}

export default Email