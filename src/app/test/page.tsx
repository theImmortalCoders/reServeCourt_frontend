"use client"
import {StompSessionProvider, useStompClient} from "react-stomp-hooks";
import {useState, useEffect} from "react";
import { NEXT_PUBLIC_WEBSOCKET_URL } from "@/utils/appWebsocket";

export interface Message {
    id: number;
    message: string;
    receiverId: number;
    read: boolean;
}

const Notifications = () => {
    
    const [messages, setMessages] = useState<Message[]>([]);
    const stompClient = useStompClient();

    useEffect(() => {
        if (stompClient) {
            const subscription = stompClient.subscribe('/user/queue/reply', (message) => {
                const parsedMessage = JSON.parse(message.body);
                setMessages(prevMessages => [...prevMessages, ...parsedMessage]);
            });

            stompClient.publish({destination: '/app/broadcast', body: "0"});

            return () => {
                subscription.unsubscribe();
            }
        }
    }, [stompClient]);

    return (
        <div>
            {messages.map((message, index) => (
                <div key={index}>Received message: {message.message}</div>
            ))}
        </div>
    );
};

export default function NotificationComponent() {
    return (
        <StompSessionProvider url={`${NEXT_PUBLIC_WEBSOCKET_URL}`}>
            <Notifications/>
        </StompSessionProvider>
    );
}
