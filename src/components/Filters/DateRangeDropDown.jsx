import React, { forwardRef, useRef, useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, Popover, Box } from '@mui/material';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './dateRangePicker.css';
import { DATE_OPTIONS, formatDate, calculateDate } from './Constants/date';
import { Filters } from './Signals/Filter';


const DateRangeDropdown = forwardRef(({ filterName, label }, ref) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const anchorEl = useRef(null);
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);

    const handleOpen = (event) => {
        setIsPopoverOpen(true);
    };

    const handleClose = () => {
        setIsPopoverOpen(false);
    };

    const handleMenuItemClick = (event) => {
        let value = event.target.value;
        if(value === 0) value = 'Custom Date';// this is a hack to fix the issue second time click of custom date option
        setSelectedOption(value)
        if (value === 'Custom Date') {
            handleOpen(event);
            return;
        }
        

    };

    const handleDateRangeChange = (ranges) => {
        setState([ranges.selection]);
        handleClose();
    };

    const renderMenuItems = () => {
        return DATE_OPTIONS.map((option) => (
            <MenuItem
                key={option.value}
                value={option.value}
            >
                {option.label}
            </MenuItem>
        ));
    };

    const formatSelectedDate = (selected) => {
        let formattedDate = null;
        if (selected === 'Custom Date') {
            const startDate = formatDate(state[0].startDate);
            const endDate = formatDate(state[0].endDate);
            formattedDate = endDate ? `${startDate} - ${endDate}` : startDate;
        }
        if (typeof selected === 'string' && selected.includes('months')) {
            formattedDate = calculateDate(selected);
        }
        Filters[filterName].value = formattedDate;
        return formattedDate;
    };

    return (
        <Box>
            <FormControl fullWidth>
                <InputLabel>{label}</InputLabel>
                <Select label={label}  value={selectedOption} onChange={handleMenuItemClick} renderValue={formatSelectedDate} ref={anchorEl}>
                    {renderMenuItems()}
                    <MenuItem value="Custom Date" onClick={handleMenuItemClick}>
                        Custom Date
                    </MenuItem>
                </Select>
            </FormControl>

            <Popover open={isPopoverOpen} anchorEl={anchorEl.current} onClose={handleClose}>
                <Box>
                    <DateRangePicker
                        showSelectionPreview={false}
                        moveRangeOnFirstSelection={false}
                        months={2}
                        ranges={state}
                        direction="horizontal"
                        color="#0f0"
                        showMonthAndYearPickers={false}
                        showDateDisplay={false}
                        staticRanges={[]}
                        onChange={handleDateRangeChange}
                    />
                </Box>
            </Popover>
        </Box>

    );
});

export default DateRangeDropdown;