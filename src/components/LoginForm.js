import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import  axios  from 'axios';

function LoginForm() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.isAuthenticated);

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }
        if (!values.password) {
          errors.password = 'Password is required';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        axios.post('https://reqres.in/api/login', values)
          .then(res => {
            dispatch({ type: 'SET_USER', user: res.data });
            setSubmitting(false);
          })
          .catch(err => {
            // handle error
            setSubmitting(false);
          });
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="email" name="email" placeholder="Email" />
          <ErrorMessage name="email" component="div" />
          <Field type="password" name="password" placeholder="Password" />
          <ErrorMessage name="password" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Login
          </button>
          {isAuthenticated ? <Navigate to="/welcome" /> : null}
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;