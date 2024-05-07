"use client"
import {StompSessionProvider, useStompClient} from "react-stomp-hooks";
import {useState, useEffect} from "react";
import { NEXT_PUBLIC_WEBSOCKET_URL } from "@/utils/appWebsocket";
import { markNotificationAsRead } from "@/hooks/notification";

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

    async function markNotification(notificationId: number) {
        try{
            const result = await markNotificationAsRead(notificationId);
            if(result === 200) {
                console.log("Przeczytano powiadomienie");
            } else {
                console.error("Błąd odznaczania powiadomienia");
            }
        } catch (error) {
            console.error("Błąd odznaczania powiadomienia", error);
        }
    }

    return (
        <div>
            {messages.map((message, index) => (
                <div key={index}>
                    <p>Received message: {message.message}</p>
                    <p onClick={() => markNotification(message.id)}>zatwierdz</p>
                </div>
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
