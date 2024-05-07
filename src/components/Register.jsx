import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import RegisterForm from './RegisterForm';
import handleFormSubmit from '../actions/HandleRegisterFormSubmit';

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            serverErrors: {},
        };
    }

    handleFormSubmit(values, { setSubmitting }) {
        handleFormSubmit(values)
            .then((response) => {
                setSubmitting(false);
                this.props.navigate('/login');
            })
            .catch((error) => {
                setSubmitting(false);
                this.setState({ serverErrors: error });
            });
    }

    render() {
        return (
            <Container maxWidth="xs" >
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        maxWidth: 'xs',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>

                    <RegisterForm onSubmit={(values, actions) => this.handleFormSubmit(values, actions)}  serverErrors={this.state.serverErrors} />
                </Box>
            </Container>
        );
    }
}

export default Register;