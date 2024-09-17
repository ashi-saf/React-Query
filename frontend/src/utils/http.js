import { QueryClient } from '@tanstack/react-query';
export const queryClient = new QueryClient();

export async function fetchEvents({ signal, searchTerm, max }) {
  let url = 'https://events-backend-8ju1.onrender.com';

  if (searchTerm && max) {
    url += '?search=' + searchTerm + '&max=' + max;
  } else if (searchTerm) {
    url += '?search=' + searchTerm;
  } else if (max) {
    url += '?max=' + max;
  }

  const response = await fetch(url, { signal: signal });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the events');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { events } = await response.json();

  return events;
}

export async function createNewData(eventData) {
  const response = await fetch('http://localhost:3000/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  });
  if (!response.ok) {
    const error = new Error('An error occurred while creating new event');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const { event } = await response.json();

  return event;
}

export async function fetchSelectableImages({ signal }) {
  const response = await fetch('http://localhost:3000/events/images', {
    signal: signal,
  });
  if (!response.ok) {
    const error = new Error('An error occurred while fetching the images');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const { images } = await response.json();

  return images;
}

export async function fetchEvent({ signal, id }) {
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    signal: signal,
  });
  if (!response.ok) {
    const error = new Error('An error occurred while fetching an event');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const { event } = await response.json();

  return event;
}
export async function deleteEvent({ id }) {
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = new Error('An error occurred while deleting the event');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
}

export async function updateData({ id, event }) {
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ event }),
  });
  if (!response.ok) {
    const error = new Error('An error occurred while updating the event');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
}
