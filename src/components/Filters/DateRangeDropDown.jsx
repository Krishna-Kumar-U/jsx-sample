import React, { forwardRef, useRef, useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, Popover } from '@mui/material';
import { DateRangePicker } from 'react-date-range';
import { sub, format } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './dateRangePicker.css';
import { DATE_OPTIONS, formatDate, calculateDate } from './Constants/date';
import {Filters} from './Signals/Filter';


const DateRangeDropdown = forwardRef(({ name, label }, ref) => {
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
        const value = event.target.value;
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

    return (
        <div>
            <FormControl fullWidth>
                <InputLabel>{label}</InputLabel>
                <Select
                    label={label}
                    value={selectedOption}
                    onChange={handleMenuItemClick}
                    renderValue={(selected) => {
                        let formattedDate = null;
                        if (selected === 'Custom Date') {
                            const startDate = formatDate(state[0].startDate);
                            const endDate = formatDate(state[0].endDate);
                            formattedDate = endDate ? `${startDate} - ${endDate}` : startDate;
                        }
                        if (typeof selected === 'string' && selected.includes('months')) {
                            formattedDate =  calculateDate(selected);
                        }
                        Filters.value[name] = formattedDate; 
                        return formattedDate;
                    }}
                    ref={anchorEl}
                >

{renderMenuItems()}
                    <MenuItem

                        value="Custom Date"
                        onClick={handleMenuItemClick}
                    >
                        Custom Date
                    </MenuItem>
                </Select>
            </FormControl>

            <Popover
                open={isPopoverOpen}
                anchorEl={anchorEl.current}
                onClose={handleClose}
            >
                <div>
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
                </div>
            </Popover>
        </div>

    );
});

export default DateRangeDropdown;