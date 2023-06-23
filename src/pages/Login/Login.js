import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema: Yup.object({
      email: Yup.string().required('Obavezno').email('Nije unet validan email'),
      password: Yup.string()
        .required('Obavezno')
        .min(6, 'Minimalan broj slova je 6')
        .max(20, 'Maksimalan broj slova je 20'),
    }),

    onSubmit: (values) => {
      setIsLoading(true);

      fetch('https://js-course-server.onrender.com/user/login', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.token) {
            localStorage.setItem('auth_token', data.token);
            setIsLoading(false);
            navigate('/');
          } else {
            isLoading(false);
          }

          if (data.message) {
            alert(data.message);
          }
        })
        .catch((err) => console.log(err));
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
        <button
          onClick={() => {
            navigate('/');
          }}
        >
          Go Back
        </button>
      </div>

      <div className="form">
        <div className="login-title">
          <h1 className="login-h1">Log In</h1>
        </div>

        <div className="email">
          <label className="email-label">Email</label> <br />
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="Enter your email"
          />
          {formik.errors.email && formik.touched.email ? (
            <p className="error">{formik.errors.email}</p>
          ) : null}
        </div>

        <div className="password">
          <label className="password-label">Password </label> <br />
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            placeholder="Enter your password"
          />
          {formik.errors.password && formik.touched.password ? (
            <p className="error">{formik.errors.password}</p>
          ) : null}
        </div>

        <div className="login-button">
          <button
            type="submit"
            onClick={formik.handleSubmit}
            className="login-btn"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
