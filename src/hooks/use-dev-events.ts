// src/hooks/use-dev-events.ts
'use client';

import { useEffect } from 'react';

// A simple in-memory event emitter for the client-side
type Listener = (data: any) => void;
const eventListeners = new Map<string, Listener[]>();

const Emitter = {
  on(event: string, listener: Listener) {
    if (!eventListeners.has(event)) {
      eventListeners.set(event, []);
    }
    eventListeners.get(event)!.push(listener);
  },
  off(event: string, listener: Listener) {
    if (eventListeners.has(event)) {
      const listeners = eventListeners.get(event)!.filter((l) => l !== listener);
      eventListeners.set(event, listeners);
    }
  },
  emit(event: string, data: any) {
    if (eventListeners.has(event)) {
      eventListeners.get(event)!.forEach((listener) => listener(data));
    }
  },
};

// A single EventSource instance for the entire app
let eventSource: EventSource | null = null;

function initializeEventSource() {
  if (process.env.NODE_ENV !== 'development' || typeof window === 'undefined' || eventSource) {
    return;
  }

  console.log('Initializing developer event source...');
  eventSource = new EventSource('/api/dev-events');

  eventSource.onmessage = (event) => {
    try {
      const { event: eventName, data } = JSON.parse(event.data);
      Emitter.emit(eventName, data);
    } catch (e) {
      console.error('Failed to parse dev event:', e);
    }
  };

  eventSource.onerror = (err) => {
    console.error('Dev event source error:', err);
    eventSource?.close();
    eventSource = null;
    // Optional: try to reconnect after a delay
    setTimeout(initializeEventSource, 5000);
  };
}

/**
 * A hook for subscribing to server-sent events from the development server.
 * This will only run in the development environment.
 *
 * @param event The name of the event to listen for.
 * @param callback The function to call when the event is received.
 */
export function useDevEvents(event: string, callback: (data: any) => void) {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    initializeEventSource();

    const handler = (data: any) => {
      callback(data);
    };

    Emitter.on(event, handler);

    return () => {
      Emitter.off(event, handler);
    };
  }, [event, callback]);
}
