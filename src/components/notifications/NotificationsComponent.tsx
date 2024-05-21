"use client";
import { StompSessionProvider, useStompClient } from "react-stomp-hooks";
import { useState, useEffect } from "react";
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
  const [removedNotifications, setRemovedNotifications] = useState<number[]>(
    []
  );

  useEffect(() => {
    if (stompClient) {
      const subscription = stompClient.subscribe(
        "/user/queue/reply",
        (message) => {
          const parsedMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [
            ...prevMessages,
            ...(Array.isArray(parsedMessage) ? parsedMessage : [parsedMessage]),
          ]);

          localStorage.setItem(
            "messages",
            JSON.stringify([
              ...messages,
              ...(Array.isArray(parsedMessage)
                ? parsedMessage
                : [parsedMessage]),
            ])
          );
        }
      );

      stompClient.publish({ destination: "/app/broadcast", body: "0" });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [stompClient]);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "messages" && e.newValue) {
        setMessages(JSON.parse(e.newValue));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  async function markNotification(notificationId: number) {
    try {
      const result = await markNotificationAsRead(notificationId);
      if (result === 200) {
        console.log("Przeczytano powiadomienie");
        setRemovedNotifications((prev) => [...prev, notificationId]);
        setTimeout(() => {
          const newMessages = messages.filter(
            (message) => message.id !== notificationId
          );
          setMessages(newMessages);
          localStorage.setItem("messages", JSON.stringify(newMessages));
          setRemovedNotifications((prev) =>
            prev.filter((id) => id !== notificationId)
          );
        }, 300);
      } else {
        console.error("Błąd odznaczania powiadomienia");
      }
    } catch (error) {
      console.error("Błąd odznaczania powiadomienia", error);
    }
  }

  return messages.length > 0 ? (
    <div className="fixed bottom-0 right-0 m-6 space-y-2 min-w-48 max-w-80 text-wrap text-sm xs:text-base">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex flex-col justify-center items-center p-4 bg-white rounded shadow-md shadow-lightGrey transition-all duration-300 ${
            removedNotifications.includes(message.id)
              ? "opacity-0 transform scale-0.9"
              : ""
          }`}
        >
          <p className="mb-2 text-center">{message.message}</p>
          <div
            onClick={() => markNotification(message.id)}
            className="bg-mainOrange cursor-pointer text-center border-[1px] border-mainOrange text-mainWhite rounded-full h-8 max-w-24 sm:max-w-32 md:max-w-48 w-full flex items-center justify-center"
          >
            <p>OK</p>
          </div>
        </div>
      ))}
    </div>
  ) : null;
};

export default function NotificationComponent() {
  return (
    <StompSessionProvider url={`${NEXT_PUBLIC_WEBSOCKET_URL}`}>
      <Notifications />
    </StompSessionProvider>
  );
}
