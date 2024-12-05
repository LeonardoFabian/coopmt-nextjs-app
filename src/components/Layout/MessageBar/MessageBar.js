import { Message } from "@/api";
import { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";
import classNames from "classnames";
import styles from "./MessageBar.module.scss";

const messageController = new Message();

export function MessageBar() {
  const [messages, setMessages] = useState([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [filteredMessages, setFilteredMessages] = useState([]);

  useEffect(() => {
    // get messages
    const fetchMessages = async () => {
      try {
        const messagesResponse = await messageController.fetchMessages();
        setMessages(messagesResponse.data);
      } catch (error) {
        console.error("Error fetching messages: ", error);
      }
    };

    fetchMessages();

    const interval = setInterval(() => {
      fetchMessages();
    }, 60000); // fetch every 60 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    //  filter messages by time and priority
    const interval = setInterval(() => {
      const now = new Date();
      const activeMessages = messages.filter((msg) => {
        const startTime = new Date(msg.attributes.startTime);
        const endTime = new Date(msg.attributes.endTime);
        return now >= startTime && now <= endTime;
      });

      const sortedMessages = activeMessages.sort((a, b) => {
        // order by priority
        return b.attributes.priority - a.attributes.priority;
      });

      setFilteredMessages(sortedMessages);
    }, 1000); // update every second

    return () => clearInterval(interval);
  }, [messages]);

  useEffect(() => {
    // change message every 5 seconds
    const messageInterval = setInterval(() => {
      if (filteredMessages.length > 0) {
        setCurrentMessageIndex(
          (prevIndex) => (prevIndex + 1) % filteredMessages.length
        );
      }
    }, 5000);

    return () => clearInterval(messageInterval);
  }, [filteredMessages]);

  if (filteredMessages.length === 0) {
    return null; // do not render message bar if no messages
  }

  const currentMessage = filteredMessages[currentMessageIndex];
  const messageType = currentMessage?.attributes?.type?.data;

  return (
    <div className={styles.messageBar}>
      <div className={styles.messageContainer}>
        {messageType && (
          <span
            className={classNames(
              styles.messageType,
              styles[messageType?.attributes?.name?.toLowerCase()]
            )}
          >
            {messageType.attributes.name}:
          </span>
        )}
        <span className={styles.messageText}>
          {currentMessage.attributes.content}
        </span>
      </div>
    </div>
  );
}
