import { Box, Typography } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Dashboard extends React.Component {
    render() {
        const { user } = this.props;
        return (
            <Box sx={{ width: '100%' }}>
                <Typography variant="h1" gutterBottom>
                    Dashboard
                </Typography>
                <Typography variant="h3" gutterBottom>
                    {user && `Welcome, ${user.username}!`}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                    blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
                    neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
                    quasi quidem quibusdam.
                </Typography>
                <Link to="/logout">Logout</Link>
            </Box>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
};

export default connect(mapStateToProps)(Dashboard);