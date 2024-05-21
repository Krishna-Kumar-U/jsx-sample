import { Autocomplete, Box, Button, Checkbox, CircularProgress, FormControlLabel, Grid, MenuItem, TextField, Typography } from '@mui/material';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import MultiSelectWithCheckboxes from './Filters/multiSelect';
import DateRangeDropdown from './Filters/DateRangeDropDown';
import { ConstructionTypes } from './Filters/Constants/Construction';
import { BUILDER_ONLY_FILTER, BUILD_VALUE_FILTER, CONSTRUCTION_TYPE_FILTER, END_DATE_FILTER, Filters, PERMIT_DATE_FILTER } from './Filters/Signals/Filter';
import PriceRangeSelect from './Filters/PriceRangeSelect';
import { BUILD_VALUE_OPTIONS } from './Filters/Constants/BuildValue';
import PriceRangeSelector from './Filters/PriceRangeSelector';


const Dashboard = () => {
    const { register, handleSubmit, control, formState: { isSubmitting } } = useForm();
    const onSubmit = () => {
        const jsonObject = JSON.stringify(Filters);
        console.log(jsonObject);
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
                            <MultiSelectWithCheckboxes filterName={CONSTRUCTION_TYPE_FILTER} {...register('constructionType')} label="Construction Type" filters={Filters} items={ConstructionTypes} {...field}>
                                <Box display="flex" justifyContent="flex-end">
                                    <MultiSelectWithCheckboxes.SelectAll />
                                    <MultiSelectWithCheckboxes.ClearAll />
                                </Box>
                                <Grid sx={{ width: '350px' }} container>
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
                            <DateRangeDropdown filterName={PERMIT_DATE_FILTER} filters={Filters} {...register('permitDate')} label="Permit Date" {...field} />
                        )}
                    />
                </Grid>
                <Grid item xs={2}>
                    <PriceRangeSelect options={BUILD_VALUE_OPTIONS} filterName={BUILD_VALUE_FILTER} filters={Filters}>
                    <MenuItem>
                         <PriceRangeSelector filterName={BUILD_VALUE_FILTER} filters={Filters} options={BUILD_VALUE_OPTIONS} />
                    </MenuItem>
                   
                    </PriceRangeSelect>
                </Grid>
                <Grid item xs={2}>
                    <Controller
                        name="endDate"
                        control={control}
                        render={({ field }) => (
                            <DateRangeDropdown filters={Filters} filterName={END_DATE_FILTER} {...register('endDate')} label="End Date" {...field} />
                        )}
                    />

                </Grid>
                <Grid item xs={2}>
                    <FormControlLabel {...register('builderOnly')} control={<Checkbox />} onChange={(event) => { Filters[BUILDER_ONLY_FILTER].value = event.target.checked }}
                        label="w/Builder Only" sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
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
