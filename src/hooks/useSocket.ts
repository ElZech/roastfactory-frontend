"use client";

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:4000';

// GLOBAL SINGLETON - created once and NEVER destroyed
let globalSocket: Socket | null = null;
let isInitializing = false;

function getOrCreateSocket(): Socket {
  if (globalSocket?.connected) {
    return globalSocket;
  }

  if (isInitializing) {
    // Wait for initialization
    return globalSocket!;
  }

  if (!globalSocket) {
    isInitializing = true;
    console.log('🔌 Creating GLOBAL socket connection to:', SOCKET_URL);

    globalSocket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 10,
      timeout: 10000,
    });

    globalSocket.on('connect', () => {
      console.log('✅ GLOBAL Socket connected!', globalSocket?.id);
      isInitializing = false;
    });

    globalSocket.on('disconnect', (reason) => {
      console.log('❌ GLOBAL Socket disconnected:', reason);
      if (reason === 'io server disconnect') {
        // Server disconnected us, reconnect
        globalSocket?.connect();
      }
    });

    globalSocket.on('connect_error', (error) => {
      console.error('🔴 Socket error:', error.message);
      isInitializing = false;
    });
  }

  return globalSocket;
}

export function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const sock = getOrCreateSocket();
    setSocket(sock);
    
    console.log('🔗 Component using socket:', sock.id || 'connecting...');

    // NEVER cleanup the global socket!
    return () => {
      console.log('⚠️ Component unmounting, socket stays alive');
    };
  }, []);

  return socket;
}