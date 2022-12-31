import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Navigate  } from 'react-router-dom';
import { connect } from 'react-redux';
import  axios  from 'axios';

class RegisterForm extends React.Component {
    render() {
        const { isAuthenticated, dispatch } = this.props;

        return (
            <Formik
                initialValues={{ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.firstName) {
                        errors.firstName = 'First name is required';
                    }
                    if (!values.lastName) {
                        errors.lastName = 'Last name is required';
                    }
                    if (!values.email) {
                        errors.email = 'Email is required';
                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                        errors.email = 'Invalid email address';
                    }
                    if (!values.password) {
                        errors.password = 'Password is required';
                    }
                    if (!values.confirmPassword) {
                        errors.confirmPassword = 'Confirm password is required';
                    } else if (values.password !== values.confirmPassword) {
                        errors.confirmPassword = 'Passwords do not match';
                    }
                    return errors;
                }}

                
                onSubmit={(values, { setSubmitting }) => {
                    axios.post('https://reqres.in/api/users', values)
                        .then(res => {
                            dispatch({ type: 'SET_USER', user: res.data });
                            setSubmitting(false);
                        })
                        .catch(err => {
                            // handle error
                            console.log(err)
                            
                            setSubmitting(false);
                        });
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="firstName" placeholder="First name" />
                        <ErrorMessage name="firstName" component="div" />
                        <Field type="text" name="lastName" placeholder="Last name" />
                        <ErrorMessage name="lastName" component="div" />
                        <Field type="email" name="email" placeholder="Email" />
                        <ErrorMessage name="email" component="div" />
                        <Field type="password" name="password" placeholder="Password" />
                        <ErrorMessage name="password" component="div" />
                        <Field type="password" name="confirmPassword" placeholder="Confirm password" />
                        <ErrorMessage name="confirmPassword" component="div" />
                        <button type="submit" disabled={isSubmitting}>
                            Register
                        </button>
                        {isAuthenticated ? <Navigate  to="/welcome" /> : null}
                    </Form>
                )}
            </Formik>
        );
    }
}

export default RegisterForm;