import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerUserApi } from '../../api/api';

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleFullName = (e) => setFullName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePhoneNumber = (e) => setPhoneNumber(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);

  const validate = () => {
    let isValid = true;

    if (fullName.trim() === '') {
      setFullNameError('Full name is required');
      isValid = false;
    } else {
      setFullNameError('');
    }

    if (email.trim() === '' || !email.includes('@')) {
      setEmailError('Valid email is required');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (phoneNumber.trim() === '') {
      setPhoneNumberError('Phone number is required');
      isValid = false;
    } else {
      setPhoneNumberError('');
    }

    if (password.trim() === '') {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (confirmPassword.trim() === '') {
      setConfirmPasswordError('Confirm password is required');
      isValid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('Password and confirm password do not match');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const data = {
      fullName,
      email,
      phoneNumber,
      password,
    };

    registerUserApi(data).then((res) => {
      if (res.data.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        window.location.href='/signIn';
      }
    });
  };

  return (
    <div className='container-fluid min-vh-100 d-flex align-items-center pt-5 mt-5'>
      <div className='row justify-content-center w-100'>
        <div className='col-md-8 col-lg-6'>
          <div className='card shadow-lg border-0 rounded-lg'>
            <div className='card-header text-center bg-primary text-white'>
              <h2 className='mb-0'>Register</h2>
            </div>
            <div className='card-body p-4'>
              <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                  <label htmlFor='fullName' className='form-label'>
                    Full Name
                  </label>
                  <div className='input-group'>
                    <span className='input-group-text'>
                      <i className='bi bi-person'></i>
                    </span>
                    <input
                      type='text'
                      className={`form-control ${fullNameError ? 'is-invalid' : ''}`}
                      id='fullName'
                      required
                      name='fullName'
                      onChange={handleFullName}
                      autoComplete='off'
                    />
                    {fullNameError && (
                      <div className='invalid-feedback'>{fullNameError}</div>
                    )}
                  </div>
                </div>
                <div className='mb-3'>
                  <label htmlFor='email' className='form-label'>
                    Email
                  </label>
                  <div className='input-group'>
                    <span className='input-group-text'>
                      <i className='bi bi-envelope'></i>
                    </span>
                    <input
                      type='email'
                      className={`form-control ${emailError ? 'is-invalid' : ''}`}
                      id='email'
                      required
                      name='email'
                      onChange={handleEmail}
                      autoComplete='off'
                    />
                    {emailError && (
                      <div className='invalid-feedback'>{emailError}</div>
                    )}
                  </div>
                </div>
                <div className='mb-3'>
                  <label htmlFor='phoneNumber' className='form-label'>
                    Phone Number
                  </label>
                  <div className='input-group'>
                    <span className='input-group-text'>
                      <i className='bi bi-telephone'></i>
                    </span>
                    <input
                      type='tel'
                      className={`form-control ${phoneNumberError ? 'is-invalid' : ''}`}
                      id='phoneNumber'
                      required
                      name='phoneNumber'
                      onChange={handlePhoneNumber}
                      autoComplete='off'
                    />
                    {phoneNumberError && (
                      <div className='invalid-feedback'>{phoneNumberError}</div>
                    )}
                  </div>
                </div>
                <div className='mb-3'>
                  <label htmlFor='password' className='form-label'>
                    Password
                  </label>
                  <div className='input-group'>
                    <span className='input-group-text'>
                      <i className='bi bi-lock'></i>
                    </span>
                    <input
                      type={passwordVisible ? 'text' : 'password'}
                      className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                      id='password'
                      required
                      onChange={handlePassword}
                    />
                    <button
                      type='button'
                      className='btn btn-outline-secondary'
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                      <i className={`bi ${passwordVisible ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                    </button>
                    {passwordError && (
                      <div className='invalid-feedback'>{passwordError}</div>
                    )}
                  </div>
                </div>
                <div className='mb-3'>
                  <label htmlFor='confirmPassword' className='form-label'>
                    Confirm Password
                  </label>
                  <div className='input-group'>
                    <span className='input-group-text'>
                      <i className='bi bi-lock'></i>
                    </span>
                    <input
                      type={confirmPasswordVisible ? 'text' : 'password'}
                      className={`form-control ${confirmPasswordError ? 'is-invalid' : ''}`}
                      id='confirmPassword'
                      required
                      onChange={handleConfirmPassword}
                    />
                    <button
                      type='button'
                      className='btn btn-outline-secondary'
                      onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                    >
                      <i className={`bi ${confirmPasswordVisible ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                    </button>
                    {confirmPasswordError && (
                      <div className='invalid-feedback'>{confirmPasswordError}</div>
                    )}
                  </div>
                </div>
                <div className='d-grid'>
                  <button
                    type='submit'
                    className='btn btn-primary'
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
            <div className='card-footer text-center'>
              <Link to='/signIn' className='btn btn-link'>
                Already Have an Account?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
