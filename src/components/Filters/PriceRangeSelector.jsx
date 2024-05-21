import React from 'react';
import { Autocomplete, TextField, Grid, Box } from '@mui/material';

const PriceRangeSelector = ({ options, filterName, filters}) => {

    return (
        <Box sx={{ width: '350px' }}>
            <Box spacing={2}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Autocomplete
                            options={options}
                            getOptionLabel={(option) => option.label}
                            onChange={(event, value) => filters[filterName].min.value= value}
                            renderInput={(params) => (
                                <TextField {...params} label="Min" variant="outlined" />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Autocomplete
                            options={options}
                            getOptionLabel={(option) => option.label}
                            onChange={(event, value) => filters[filterName].max.value = value}
                            renderInput={(params) => (
                                <TextField {...params} label="Max" variant="outlined" />
                            )}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default PriceRangeSelector;