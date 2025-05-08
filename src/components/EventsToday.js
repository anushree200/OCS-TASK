import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';

const EventsToday = ({ selectedDate }) => {
  const events = [
    { id: 1, title: 'Google PPT', date: '2021-11-06', duration: '1hr/5s', color: '#ffeb3b' },
    { id: 2, title: 'Adobe PPT', date: '2021-11-06', duration: '1hr/5s', color: '#4caf50' },
    { id: 3, title: 'Google Round 2: Online Test', date: '2021-11-06', duration: '1hr/5s', color: '#ab47bc' },
  ];

  const todayEvents = events.filter((event) => event.date === selectedDate);

  return (
    <Box sx={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: 1, p: 2 }}>
      {/* Header */}
      <Typography variant="h6" gutterBottom>
        Events Today
      </Typography>

      {/* Events List */}
      <List>
        {todayEvents.length > 0 ? (
          todayEvents.map((event) => (
            <ListItem key={event.id} disablePadding>
              <ListItemIcon>
                <Box
                  sx={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: event.color,
                    mr: 1,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={event.title}
                secondary={event.duration}
                primaryTypographyProps={{ variant: 'body2' }}
                secondaryTypographyProps={{ variant: 'caption', color: 'textSecondary' }}
              />
            </ListItem>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            No events
          </Typography>
        )}
      </List>
    </Box>
  );
};

export default EventsToday;