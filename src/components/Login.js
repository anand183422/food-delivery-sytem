import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await axios.post('http://localhost:3000/login', {
          username: values.username,
          password: values.password,
        });
        console.log(response)
        //const { logUser } = useContext(UserContext);
        if (response.data) {
          alert('Login successful');
          console.log('User:', response.config.data.username);
           //setlogUser()
          // Store login status in localStorage
          localStorage.setItem('isLoggedIn', true);
          
          // Handle successful login, e.g., redirect
          navigate('/');
        }
      } catch (error) {
        console.error('Login error:', error);
        setErrors({ submit: error.response?.data.message || 'Login failed' });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <Box mt={8}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="username"
            name="username"
            label="Username"
            margin="normal"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            margin="normal"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          {formik.errors.submit && (
            <Typography color="error">{formik.errors.submit}</Typography>
          )}
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            disabled={formik.isSubmitting}
          >
            Login
          </Button>
        </form>
        <Link to="/signup" className="links">Signup</Link>
      </Box>
    </Container>
  );
};

export default Login;
