import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';
import { Box, Grid, Button, TextField, Alert } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
});

class LoginForm extends React.Component {
    render() {
        return (
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={this.props.onSubmit}
            >
                {({ errors, touched, isSubmitting }) => (
                    <Form>
                        <Box sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Field name="email">
                                        {({ field, form }) => (
                                            <TextField
                                                required
                                                fullWidth
                                                id="email"
                                                label="Email Address"
                                                autoComplete="email"
                                                {...field}
                                                value={field.value || ''}
                                                error={touched.email && !!errors.email}
                                                helperText={touched.email && errors.email}
                                            />
                                        )}
                                    </Field>
                                </Grid>
                                <Grid item xs={12}>
                                    <Field name="password">
                                        {({ field, form }) => (
                                            <TextField
                                                required
                                                fullWidth
                                                name="password"
                                                label="Password"
                                                type="password"
                                                id="password"
                                                autoComplete="new-password"
                                                {...field}
                                                value={field.value || ''}
                                                error={touched.password && !!errors.password}
                                                helperText={touched.password && errors.password}
                                            />
                                        )}
                                    </Field>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        disabled={isSubmitting}
                                    >
                                        Sign In
                                    </Button>
                                </Grid>
                                {this.props.serverErrors.message && (
                                    <Grid item xs={12}>
                                        <Alert variant="filled" severity="error">
                                            Error: {this.props.serverErrors.message}
                                        </Alert>
                                    </Grid>
                                )}
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Link to="/register">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Form>
                )}
            </Formik>
        );
    }
}

export default LoginForm;