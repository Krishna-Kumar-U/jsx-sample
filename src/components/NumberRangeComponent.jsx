import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from  '@mui/material';

function NumberRangeDropdown({ min, max }) {
    const [selectedOption, setSelectedOption] = useState(min);

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const options = Array.from({ length: max - min + 1 }, (_, i) => min + i);

    return (
        <FormControl fullWidth>
            <InputLabel>Number Range</InputLabel>
            <Select value={selectedOption} onChange={handleChange}>
                {options.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default NumberRangeDropdown;