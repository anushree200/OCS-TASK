import React, { useState } from 'react';
import { Box, Typography, Paper, IconButton } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const DayView = ({ selectedDate: initialSelectedDate }) => {
  const [selectedDate, setSelectedDate] = useState(new Date(initialSelectedDate));

  const events = [
    {
      id: 1,
      title: 'Breakfast',
      start_time: '08:00:00',
      end_time: '09:00:00',
      duration: '1hr',
      color: '#e0e0e0',
    },
    {
      id: 2,
      title: 'Google Online Technical Test',
      start_time: '10:00:00',
      end_time: '11:00:00',
      duration: '1hr/5s',
      color: '#ffeb3b',
    },
    {
      id: 3,
      title: 'Adobe PPT',
      start_time: '12:00:00',
      end_time: '13:00:00',
      duration: '1hr/5s',
      color: '#4caf50',
    },
    {
      id: 4,
      title: 'Lunch Break',
      start_time: '14:00:00',
      end_time: '15:00:00',
      duration: '1hr',
      color: '#e0e0e0',
    },
  ];

  const calculatePosition = (startTime, endTime) => {
    const startHour = parseInt(startTime.split(':')[0], 10) + parseInt(startTime.split(':')[1], 10) / 60;
    const endHour = parseInt(endTime.split(':')[0], 10) + parseInt(endTime.split(':')[1], 10) / 60;
    const startPosition = (startHour - 6) * 60;
    const height = (endHour - startHour) * 60;
    return { top: startPosition, height };
  };

  const handlePrevDay = () => {
    const prevDay = new Date(selectedDate);
    prevDay.setDate(prevDay.getDate() - 1);
    setSelectedDate(prevDay);
  };

  const handleNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setSelectedDate(nextDay);
  };

  return (
    <Box sx={{ height: '100%', backgroundColor: '#fff', borderRadius: '8px', boxShadow: 1, p: 2 }}>
      {/* Date Header with Navigation Arrows */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <IconButton onClick={handlePrevDay} size="small">
          <KeyboardArrowLeft />
        </IconButton>
        <Typography variant="h6" gutterBottom>
          {selectedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}
        </Typography>
        <IconButton onClick={handleNextDay} size="small">
          <KeyboardArrowRight />
        </IconButton>
      </Box>

      {/* Timeline Container */}
      <Box sx={{ position: 'relative', height: '540px' /* 9 hours (6:00 to 15:00) * 60px */ }}>
        {/* Hour Labels */}
        {Array.from({ length: 10 }, (_, i) => i + 6).map((hour) => (
          <Box
            key={hour}
            sx={{
              position: 'absolute',
              top: (hour - 6) * 60,
              left: 0,
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              borderTop: '1px solid #e0e0e0',
            }}
          >
            <Typography variant="caption" sx={{ width: '50px', color: '#666' }}>
              {hour}:00
            </Typography>
          </Box>
        ))}

        {/* Event Blocks */}
        {events.map((event) => {
          const { top, height } = calculatePosition(event.start_time, event.end_time);
          return (
            <Paper
              key={event.id}
              sx={{
                position: 'absolute',
                top: `${top}px`,
                left: '50px',
                width: 'calc(100% - 50px)',
                height: `${height}px`,
                backgroundColor: event.color,
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 1,
                boxSizing: 'border-box',
              }}
            >
              {/* Event Details */}
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {event.title}
                </Typography>
                <Typography variant="caption">
                  {event.start_time.slice(0, 5)} - {event.end_time.slice(0, 5)}
                </Typography>
              </Box>

              {/* Duration and Drag Icon */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="caption" sx={{ mr: 1 }}>
                  {event.duration}
                </Typography>
                <IconButton size="small">
                  <DragIndicatorIcon fontSize="small" />
                </IconButton>
              </Box>
            </Paper>
          );
        })}
      </Box>
    </Box>
  );
};

export default DayView;