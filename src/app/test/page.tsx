"use client"
import {StompSessionProvider, useStompClient} from "react-stomp-hooks";
import {useState, useEffect} from "react";

const Notifications = () => {
    const [messages, setMessages] = useState([]);
    const stompClient = useStompClient();

    useEffect(() => {
        if (stompClient) {
            const subscription = stompClient.subscribe('/user/queue/reply', (message) => {
                const parsedMessage = message.body;
                setMessages(prevMessages => [...prevMessages, parsedMessage]);
                console.log(parsedMessage)
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
                <div key={index}>Received message: {message}</div>
            ))}
        </div>
    );
};

export default function NotificationComponent() {
    return (
        <StompSessionProvider url={'http://localhost:8080/ws-endpoint'}>
            <Notifications/>
        </StompSessionProvider>
    );
}
