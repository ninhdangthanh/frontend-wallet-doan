// context/WebSocketContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type WebSocketContextType = {
    sendMessage: (message: string) => void;
    messages: string[];
};

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [messages, setMessages] = useState<string[]>([]);
    const [ws, setWs] = useState<WebSocket | null>(null);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:3001'); // Replace with your WebSocket server URL
        setWs(socket);

        socket.onmessage = (event) => {
        setMessages((prev) => [...prev, event.data]);
        };

        return () => {
        socket.close();
        };
    }, []);

    const sendMessage = useCallback(
        (message: string) => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(message);
        }
        },
        [ws]
    );

    return (
        <WebSocketContext.Provider value={{ sendMessage, messages }}>
        {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = (): WebSocketContextType => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    return context;
};
