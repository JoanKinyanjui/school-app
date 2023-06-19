import React, { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { makeStyles } from '@mui/styles';
import dayjs from 'dayjs';

const useStyles = makeStyles({
  dateTimePicker: {
    width: '300px', // Customize the width as desired
  },
});

function CalendarComponent({selectedDateTime,setSelectedDateTime}) {
  const classes = useStyles();
 


  const handleDateTimeChange = (date) => {
    setSelectedDateTime(date);
    console.log(selectedDateTime);
  }

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label="Choose date time"
          value={selectedDateTime}
          onChange={handleDateTimeChange}
        //   minDate={currentDate}
          className={classes.dateTimePicker}
        />
      </LocalizationProvider>
    </div>
  );
}

export default CalendarComponent;
