import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MultiSelectWithCheckboxes from './multiSelect';

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
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <MultiSelectWithCheckboxes label="Select Box 1" items={['Item 1', 'Item 2', 'Item 3', 'Item 4']}>
                            <MultiSelectWithCheckboxes.SelectAll />
                            <MultiSelectWithCheckboxes.ClearAll />
                            {['Item 1', 'Item 2', 'Item 3', 'Item 4'].map(item => (
                                <MultiSelectWithCheckboxes.SelectItem key={item} item={item} />
                            ))}
                        </MultiSelectWithCheckboxes>
                    </Grid>
                    <Grid item xs={6}>
                        <MultiSelectWithCheckboxes label="Select Box 2" items={['Item 1', 'Item 2', 'Item 3', 'Item 4']}>
                            <MultiSelectWithCheckboxes.SelectAll />
                            <MultiSelectWithCheckboxes.ClearAll />
                            {['Item 1', 'Item 2', 'Item 3', 'Item 4'].map(item => (
                                <MultiSelectWithCheckboxes.SelectItem key={item} item={item} />
                            ))}
                        </MultiSelectWithCheckboxes>
                    </Grid>
                </Grid>

            </Box >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
};

export default connect(mapStateToProps)(Dashboard);