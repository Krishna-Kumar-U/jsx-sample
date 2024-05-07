import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import LoginForm from './LoginForm';
import handleFormSubmit from '../actions/HandleLoginFormSubmit';
import { connect } from 'react-redux';
import { loginUser } from '../store/action';


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            serverErrors: {},
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(values, { setSubmitting }) {
        handleFormSubmit(values, this.props.loginUser)
            .then((response) => {
                setSubmitting(false);
                this.props.navigate('/');
            })
            .catch((error) => {
                setSubmitting(false);
                this.setState({ serverErrors: error.errors });
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
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <LoginForm onSubmit={(values, actions) => this.handleFormSubmit(values, actions)} serverErrors={this.state.serverErrors}  />
                </Box>
            </Container>
        );
    }
}

const mapDispatchToProps = {
    loginUser
};

export default connect(null, mapDispatchToProps)(Login);