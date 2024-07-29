import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  forgotPasswordApi,
  loginUserApi,
  resetPasswordApi,
} from '../../api/api';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [resetPassword, setResetPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isSentOtp, setIsSentOtp] = useState(false);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const validate = () => {
    let isValid = true;

    if (email.trim() === '' || !email.includes('@')) {
      setEmailError('Email is required');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (password.trim() === '') {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    const data = { email, password };

    loginUserApi(data)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          localStorage.setItem('token', res.data.token);

          const convertedData = JSON.stringify(res.data.user);
          localStorage.setItem('user', convertedData);
          if (res.data.user.isAdmin) {
            window.location.href = '/admin/dashboard';
          } else {
            window.location.href = '/dashboard';
          }
        }
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.message);
        } else {
          toast.error('Something went wrong');
        }
      });
  };

  return (
    <div
      className='d-flex align-items-center justify-content-center min-vh-100'
      style={{ backgroundImage: 'url(your-background-image-url)', backgroundSize: 'cover' }}>
      <div className='bg-white p-4 rounded shadow-lg w-100' style={{ maxWidth: '500px' }}>
        <header className='fs-3 text-center mb-4'>Login</header>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>Email</label>
            <input
              type='text'
              className='form-control'
              id='email'
              required
              name='email'
              onChange={handleEmail}
              autoComplete='off'
            />
            {emailError && <div className='text-danger mt-2'>{emailError}</div>}
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>Password</label>
            <input
              type='password'
              className='form-control'
              id='password'
              onChange={handlePassword}
              required
            />
            {passwordError && <div className='text-danger mt-2'>{passwordError}</div>}
          </div>
          <button
            type='submit'
            className='btn btn-primary w-100'>
            Sign In
          </button>
        </form>
        <div className='text-center text-sm mt-3'>
          <Link
            to='/signUp'
            className='text-decoration-none text-secondary'>
            Don't Have an Account?
          </Link>
        </div>
        <div className='text-center text-sm mt-2'>
          <button
            type='button'
            className='btn btn-link text-secondary'
            data-bs-toggle='modal'
            data-bs-target='#exampleModal'>
            Forgot Password?
          </button>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <div
        className='modal fade'
        id='exampleModal'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>Reset Password</h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'></button>
            </div>
            <div className='modal-body'>
              <form>
                <div className='mb-3'>
                  <label htmlFor='phone' className='form-label'>Phone No.</label>
                  <div className='input-group'>
                    <input
                      type='tel'
                      className='form-control'
                      id='phone'
                      disabled={isSentOtp}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <button
                      type='button'
                      className='btn btn-primary'
                      disabled={isSentOtp}
                      onClick={() => {/* Handle OTP request */}}>
                      Get OTP
                    </button>
                  </div>
                </div>
                {isSentOtp && (
                  <>
                    <div className='mb-3'>
                      <label htmlFor='otp' className='form-label'>OTP</label>
                      <input
                        type='number'
                        className='form-control'
                        id='otp'
                        onChange={(e) => setOtp(e.target.value)}
                      />
                    </div>
                    <div className='mb-3'>
                      <label htmlFor='newPassword' className='form-label'>New Password</label>
                      <input
                        type='password'
                        className='form-control'
                        id='newPassword'
                        onChange={(e) => setResetPassword(e.target.value)}
                      />
                    </div>
                    <div className='mb-3'>
                      <label htmlFor='confirmPassword' className='form-label'>Confirm Password</label>
                      <input
                        type='password'
                        className='form-control'
                        id='confirmPassword'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <button
                      type='button'
                      className='btn btn-primary w-100'
                      onClick={() => {/* Handle password reset */}}>
                      Reset Password
                    </button>
                  </>
                )}
              </form>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
