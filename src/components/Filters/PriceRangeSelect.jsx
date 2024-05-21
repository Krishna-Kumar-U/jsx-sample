import React, { useState } from 'react';
import { TextField, Popover, Box, InputAdornment, SvgIcon, FormControl } from '@mui/material';
import { useSignals } from '@preact/signals-react/runtime';

const PriceRangeSelect = ({ children, filterName, filters }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const minValue = useSignals(filters[filterName].min.value);
    const maxValue = useSignals(filters[filterName].max.value);
     
    console.log(minValue.value, maxValue.value)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const setRenderValue = () => {
        if (filters[filterName].min.value && filters[filterName].max.value) {
            return `${filters[filterName].min.value.label} - ${filters[filterName].max.value.label}`;
        }
        if (filters[filterName].min.value) {
            return `${filters[filterName].min.value.label}+`;
        }
        if (filters[filterName].max.value) {
            return `0-${filters[filterName].max.value.label}`;
        }
        return 'Select';
    }
    return (
        <FormControl>
            <TextField
                onClick={handleClick}
                label="Select"
                variant="outlined"
                value={ setRenderValue()}
                InputProps={{
                    readOnly: true,
                    endAdornment: (
                        <InputAdornment position="end">
                            <SvgIcon>
                                <path d="M7 10l5 5 5-5z" />
                            </SvgIcon>
                        </InputAdornment>
                    ),
                }}
            />
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Box p={2}>
                    
                        {children}
                </Box>
            </Popover>
        </FormControl>
    );
};

export default PriceRangeSelect;