import React, { useState } from 'react';
import { Container, Typography, TextField, IconButton, CssBaseline, createTheme, ThemeProvider, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import DayView from './components/DayView';
import CalendarView from './components/CalendarView';
import EventsToday from './components/EventsToday';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  const [selectedDate, setSelectedDate] = useState('2025-05-05');

  const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    p: 2,
    mb: 2,
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 3, mb: 3, backgroundColor: 'background.default', minHeight: '100vh' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h5" component="h1">
            Calendar
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search Calendar"
              sx={{ mr: 1, width: '200px' }}
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />,
              }}
            />
            <IconButton>
              <SettingsIcon />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ display: 'flex' }}>
          {/* Left Section: DayView */}
          <Box sx={{ width: '700px', overflowY: 'auto', pr: 1 }}>
            <Box sx={cardStyle}>
              <DayView selectedDate={selectedDate} />
            </Box>
          </Box>

          {/* Right Section: CalendarView and EventsToday */}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flex: '0 0 auto' }}>
              <Box sx={cardStyle}>
                <CalendarView selectedDate={selectedDate} onSelectDate={setSelectedDate} />
              </Box>
            </Box>
            <Box sx={{ flex: '1 1 auto', overflowY: 'auto' }}>
              <Box sx={cardStyle}>
                <EventsToday selectedDate={selectedDate} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;