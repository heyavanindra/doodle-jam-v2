'use client';

import { useEffect, useRef, useState } from 'react';
import { env } from '@/lib/env';
import { SocketClient } from './socket';

export function useSocket() {
  const socketRef = useRef<SocketClient | null>(null);

  const [status, setStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');

  useEffect(() => {
    const socket = new SocketClient();

    socketRef.current = socket;

    socket.connect(env.NEXT_PUBLIC_WS_URL);

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  return {
    status,
    send: (message: unknown) => {
      socketRef.current?.send(message);
    },
  };
}
