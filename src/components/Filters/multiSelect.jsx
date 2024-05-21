import React, { useState, useMemo, createContext, useContext, useCallback } from 'react';
import { Checkbox, FormControl, InputLabel, Select, MenuItem, Button, Grid } from '@mui/material';

const MultiSelectWithCheckboxesContext = createContext();

const MultiSelectWithCheckboxes = React.forwardRef(({ filterName, children, items, label, filters }, ref) => {

    const [selectedItems, setSelectedItems] = useState(items);
    const handleSelectChange = useCallback((event) => {
        setSelectedItems(event.target.value);
        filters[filterName].value = event.target.value;
    }, []);

    const handleSelectAll = useCallback(() => {
        setSelectedItems(items);
        filters[filterName].value = items;
    }, [items]);

    const handleClearAll = useCallback(() => {
        setSelectedItems([]);
        filters[filterName].value = [];
    }, []);

    const value = useMemo(() => ({ selectedItems, handleSelectChange, handleSelectAll, handleClearAll }), [selectedItems, handleSelectChange, handleSelectAll, handleClearAll]);
    return (
        <MultiSelectWithCheckboxesContext.Provider value={value}>
            <FormControl fullWidth>
                <InputLabel>{label}</InputLabel>
                <Select
                    multiple
                    label={label}
                    value={selectedItems}
                    onChange={handleSelectChange}
                    renderValue={(selected) => selected.length === items.length ? 'All' : selected.map(item => item.name).join(', ')}
                >
                    {children}
                </Select>
            </FormControl>
        </MultiSelectWithCheckboxesContext.Provider>
    );
});

const SelectItem = React.memo(function SelectItem({ item, children }) {
    const { selectedItems, handleSelectChange } = useContext(MultiSelectWithCheckboxesContext);

    const handleMouseUp = () => {
        const newValue = selectedItems.includes(item)
            ? selectedItems.filter(i => i !== item)
            : [...selectedItems, item];

        handleSelectChange({ target: { value: newValue } });
    };

    return (
        <Grid item xs={4} key={item}>
            <MenuItem value={item} onMouseUp={handleMouseUp}>
                <Checkbox checked={selectedItems.includes(item)} />
                {children}
            </MenuItem>
        </Grid>
    );
});

function SelectAll() {
    const { handleSelectAll } = useContext(MultiSelectWithCheckboxesContext);

    const handleClick = (event) => {
        event.stopPropagation();
        handleSelectAll();
    };

    return (
        <Button onClick={handleClick}>Select All</Button>
    );
}

function ClearAll() {
    const { handleClearAll } = useContext(MultiSelectWithCheckboxesContext);

    const handleClick = (event) => {
        event.stopPropagation();
        handleClearAll();
    };

    return (
        <Button onClick={handleClick}>Clear All</Button>
    );
}

MultiSelectWithCheckboxes.SelectItem = SelectItem;
MultiSelectWithCheckboxes.SelectAll = SelectAll;
MultiSelectWithCheckboxes.ClearAll = ClearAll;

export default MultiSelectWithCheckboxes;