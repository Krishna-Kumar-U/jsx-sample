import { Box, Button, Checkbox, CircularProgress, FormControlLabel, Grid } from '@mui/material';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import MultiSelectWithCheckboxes from './multiSelect';
import DateRangeDropdown from './Filters/DateRangeDropDown';
import { ConstructionTypes } from './Filters/Constants/Construction';
import { Filters } from './Filters/Signals/Filter';


const Dashboard = ({ user }) => {
    const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm();


    const onSubmit = (data) => {
        console.log(Filters.value);
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%', m: 4 }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={2}>
                    <Controller
                        name="constructionType"
                        control={control}
                        defaultValue={ConstructionTypes}
                        render={({ field }) => (
                            <MultiSelectWithCheckboxes {...register('constructionType')} label="Construction Type" filters={Filters} items={ConstructionTypes} {...field}>
                                <Box display="flex" justifyContent="flex-end">
                                    <MultiSelectWithCheckboxes.SelectAll />
                                    <MultiSelectWithCheckboxes.ClearAll />
                                </Box>
                                <Grid container>
                                    {ConstructionTypes.map(item => (
                                        <Grid item xs={6} key={item.name}>
                                            <MultiSelectWithCheckboxes.SelectItem item={item} >
                                                {item.label}
                                            </MultiSelectWithCheckboxes.SelectItem>
                                        </Grid>
                                    ))}
                                </Grid>
                            </MultiSelectWithCheckboxes>
                        )}
                    />

                </Grid>
                <Grid item xs={2}>
                    <Controller
                    name="permitDate"
                    control={control}
                    render={({ field }) => (
                        <DateRangeDropdown {...register('permitDate')} label="Permit Date" {...field} />
                    )}
                    />
                </Grid>
                <Grid item xs={2}>
                    ds
                </Grid>
                <Grid item xs={2}>
                <Controller
                    name="endDate"
                    control={control}
                    render={({ field }) => (
                        <DateRangeDropdown {...register('endDate')} label="End Date" {...field} />
                    )}
                    />
                    
                </Grid>
                <Grid item xs={2}>
                    <FormControlLabel {...register('builderOnly')} control={<Checkbox />} label="w/Builder Only"
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
                        {isSubmitting ? <CircularProgress size={24} /> : 'Search'}
                    </Button>
                </Grid>
            </Grid>

        </Box >
    );
}

export default Dashboard;
