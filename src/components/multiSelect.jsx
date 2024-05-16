import React, { useState, useMemo, createContext, useContext, useCallback } from 'react';
import { Checkbox, FormControl, InputLabel, Select, MenuItem, Button, Grid } from '@mui/material';

const MultiSelectWithCheckboxesContext = createContext();

function MultiSelectWithCheckboxes({ children, items, label }) {
    const [selectedItems, setSelectedItems] = useState([]);

    const handleSelectChange = useCallback((event) => {
        console.log('handleSelectChange event.target.value:', event.target.value);
        setSelectedItems(event.target.value);
    }, []);

    const handleSelectAll = useCallback(() => {
        setSelectedItems(items);
    }, [items]);

    const handleClearAll = useCallback(() => {
        setSelectedItems([]);
    }, []);

    const value = useMemo(() => ({ selectedItems, handleSelectChange, handleSelectAll, handleClearAll }), [selectedItems, handleSelectChange, handleSelectAll, handleClearAll]);
    return (
        <MultiSelectWithCheckboxesContext.Provider value={value}>
            <FormControl fullWidth>
                <InputLabel>{label}</InputLabel>
                <Select
                    multiple
                    value={selectedItems}
                    onChange={handleSelectChange}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {children}
                </Select>
            </FormControl>
        </MultiSelectWithCheckboxesContext.Provider>
    );
}

const SelectItem = React.memo(function SelectItem({ item }) {
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
                {item}
            </MenuItem>
        </Grid>
    );
});

function SelectAll() {
    const { handleSelectAll } = useContext(MultiSelectWithCheckboxesContext);

    return (
        <Button onClick={handleSelectAll}>Select All</Button>
    );
}

function ClearAll() {
    const { handleClearAll } = useContext(MultiSelectWithCheckboxesContext);

    return (
        <Button onClick={handleClearAll}>Clear All</Button>
    );
}

MultiSelectWithCheckboxes.SelectItem = SelectItem;
MultiSelectWithCheckboxes.SelectAll = SelectAll;
MultiSelectWithCheckboxes.ClearAll = ClearAll;

export default MultiSelectWithCheckboxes;