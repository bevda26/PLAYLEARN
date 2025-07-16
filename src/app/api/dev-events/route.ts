// src/app/api/dev-events/route.ts
import { NextRequest, NextResponse } from 'next/server';

// This is a simple in-memory event bus for development purposes.
// In a production scenario, a more robust message queue (like Redis Pub/Sub) would be used.
let clients: ((message: string) => void)[] = [];

/**
 * GET handler establishes a new Server-Sent Events (SSE) connection.
 * It keeps the connection open and sends events pushed by the POST handler.
 */
export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      const onMessage = (message: string) => {
        controller.enqueue(`data: ${message}\n\n`);
      };
      clients.push(onMessage);

      // Clean up the client when the connection is closed
      controller.signal.addEventListener('abort', () => {
        clients = clients.filter((client) => client !== onMessage);
      });
    },
  });

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}

/**
 * POST handler receives an event from the watcher script and broadcasts it
 * to all connected SSE clients.
 */
export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ message: 'This endpoint is for development only.' }, { status: 403 });
  }

  const { event, data } = await req.json();
  const message = JSON.stringify({ event, data });

  // Broadcast the message to all connected clients
  clients.forEach((client) => client(message));

  return NextResponse.json({ success: true, message: `Event '${event}' broadcasted.` });
}
