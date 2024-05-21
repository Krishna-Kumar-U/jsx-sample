import React, { useState, useRef, useEffect } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './dateRangePicker.css';

function CustomDateRangePicker() {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);
  const [style, setStyle] = useState({});
  const dateRangePickerRef = useRef();



  useEffect(() => {
    const dateRangePickerElement = dateRangePickerRef.current;
    if (dateRangePickerElement) {
      const rect = dateRangePickerElement.getBoundingClientRect();
      const newStyle = {};
      if (rect.right > window.innerWidth) {
        newStyle.right = '0px';
      }
      if (rect.bottom > window.innerHeight) {
        newStyle.bottom = '0px';
      }
      setStyle(newStyle);
    }
  }, []);

  return (

        <div style={style} ref={dateRangePickerRef}>
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
          />
        </div>
  );
}

export default CustomDateRangePicker;