import React, { useState } from 'react';
import { useFormAction, useNavigate } from 'react-router-dom';
import formik, { useFormik } from 'formik';
import * as Yup from 'yup';
import './Register.css';

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },

    validationSchema: Yup.object({
      fullName: Yup.string()
        .required('Obavezno')
        .max(50, 'Maksimalan broj slova je 50'),
      email: Yup.string().email('Nije unet validan email').required('Obavezno'),
      password: Yup.string()
        .required('Obavezno')
        .min(6, 'Minimalan broj slova je 6')
        .max(20, 'Maksimalan broj slova je 20'),
      confirmPassword: Yup.string()
        .required('Obavezno')
        .oneOf([Yup.ref('password'), null], 'Lozinke se ne podudaraju'),
    }),

    onSubmit: (values) => {
      setIsLoading(true);
      fetch('https://js-course-server.onrender.com/user/signup', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            alert(data.message);
            setIsLoading(false);
          } else {
            alert('Uspesno ste se registrovali');
            navigate('/');
          }
        });
    },
  });

  if (isLoading) {
    return (
      <div className="loading-window">
        <img
          className="loading-gif"
          src={require('../../photos/grey_style.gif')}
          alt="GIF"
        />
      </div>
    );
  }

  return (
    <div className="App">
      <div className="header">
        <button onClick={() => navigate('/')} className="to-home">
          Go Back
        </button>
      </div>

      <div className="form">
        <div className="register-title">
          <h1 className="register-h1">Register</h1>
        </div>

        <div className="full-name">
          <label className="full-name-label">Full Name</label> <br />
          <input
            id="fullName"
            name="fullName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            value={formik.values.fullName}
            placeholder="Enter your full name"
          />
          {formik.errors.fullName && formik.touched.fullName ? (
            <p className="error">{formik.errors.fullName}</p>
          ) : null}
        </div>

        <div className="email">
          <label className="email-label">Email</label> <br />
          <input
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="email"
            value={formik.values.email}
            placeholder="Enter your email"
          />
          {formik.errors.email && formik.touched.email ? (
            <p className="error">{formik.errors.email}</p>
          ) : null}
        </div>

        <div className="password">
          <label className="password-label">Password</label> <br />
          <input
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            value={formik.values.password}
            placeholder="Enter your passowrd"
          />
          {formik.errors.password && formik.touched.password ? (
            <p className="error">{formik.errors.password}</p>
          ) : null}
        </div>

        <div className="confirmPassword">
          <label className="confirm-password-label">Confirm Password</label>{' '}
          <br />
          <input
            id="confirmPassword"
            name="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            value={formik.values.confirmPassword}
            placeholder="Confirm your password"
          />
          {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
            <p className="error">{formik.errors.confirmPassword}</p>
          ) : null}
        </div>

        <div className="register-button">
          <button className="register-btn" onClick={formik.handleSubmit}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
