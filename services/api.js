import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch all events
export const fetchEvents = async () => {
  const response = await api.get('/events');
  return response.data;
};

// Fetch events by date
export const fetchEventsByDate = async (date) => {
  const response = await api.get(`/events/date/${date}`);
  return response.data;
};

// Create a new event
export const createEvent = async (eventData) => {
  const response = await api.post('/events', eventData);
  return response.data;
};

export default api; 