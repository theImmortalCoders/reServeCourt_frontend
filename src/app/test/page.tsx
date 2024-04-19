"use client"
import {StompSessionProvider, useStompClient, useSubscription} from "react-stomp-hooks";
import {useState, useEffect} from "react";

const ChildComponent = () => {
    const [messages, setMessages] = useState<NotificationSingleResponse[]>([]);
    const stompClient = useStompClient();

    interface NotificationSingleResponse {
        id: number;
        message: string;
        receiverId: number;
        read: boolean;
    }

    useEffect(() => {
        if (stompClient) {
            const subscription = stompClient.subscribe('/topic/reply', (message) => {
                const parsedMessages: NotificationSingleResponse[] = JSON.parse(message.body);
                setMessages(parsedMessages)
            });
            stompClient.publish({destination: '/app/broadcast', body: "0"});
            return () => subscription.unsubscribe();
        }
    }, [stompClient]);

    return (
        <div>
            {messages.map((message, index) => (
                <div key={index}>The broadcast message from websocket broker is {message.message}</div>
            ))}
        </div>
    );
};

export default function Page() {
    return (
        <StompSessionProvider
            url={'http://localhost:8080/ws-endpoint'}>
            <ChildComponent/>
        </StompSessionProvider>
    );
}
