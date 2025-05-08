import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, IconButton } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const CalendarView = ({ selectedDate, onSelectDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const events = [
    { id: 1, title: 'Google Online Technical Test', date: '2021-11-06' },
    { id: 2, title: 'Adobe PPT', date: '2021-11-09' },
    { id: 3, title: 'Lunch Break', date: '2021-11-15' },
    { id: 4, title: 'Breakfast', date: '2021-11-06' },
  ];

  const renderDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<Grid item key={`empty-${i}`}><Box sx={{ height: '100%' }} /></Grid>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const hasEvents = events.some((event) => event.date === dateStr);
      const isSelected = dateStr === selectedDate;

      days.push(
        <Grid item key={day}>
          <Paper
            onClick={() => onSelectDate(dateStr)}
            sx={{
              textAlign: 'center',
              padding: '8px',
              cursor: 'pointer',
              backgroundColor: isSelected ? '#000' : '#fff',
              color: isSelected ? '#fff' : hasEvents ? '#1976d2' : '#000',
              borderRadius: '50%',
              fontWeight: isSelected ? 'bold' : 'normal',
              position: 'relative',
              aspectRatio: '1/1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {day}
            {hasEvents && !isSelected && (
              <Box
                sx={{
                  position: 'absolute',
                  bottom: '2px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '4px',
                  height: '4px',
                  backgroundColor: '#1976d2',
                  borderRadius: '50%',
                }}
              />
            )}
          </Paper>
        </Grid>
      );
    }

    return days;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  return (
    <Box sx={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: 1, p: 2 }}>
      {/* Month Navigation */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <IconButton onClick={handlePrevMonth} size="small">
          <KeyboardArrowLeft />
        </IconButton>
        <Typography variant="h6">
          {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </Typography>
        <IconButton onClick={handleNextMonth} size="small">
          <KeyboardArrowRight />
        </IconButton>
      </Box>

      {/* Day Headers */}
      <Grid container spacing={1}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <Grid item xs={1.71} key={day}>
            <Typography align="center" variant="subtitle2" color="textSecondary">
              {day}
            </Typography>
          </Grid>
        ))}
      </Grid>

      {/* Days Grid */}
      <Grid container spacing={1} sx={{ mt: 1 }}>
        {renderDays()}
      </Grid>
    </Box>
  );
};

export default CalendarView;