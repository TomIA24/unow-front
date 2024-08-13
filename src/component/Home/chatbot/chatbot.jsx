import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import ChatbotIcon from './chat-bot.png'; // Import your SVG
import UserAvatar from './user-avatar.png'; // Path to user avatar image
import BotAvatar from './bot-avatar.png'; // Path to bot avatar image
import paper from './paper.png';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { user: 'Bot', text: "Hello there! I am Knowy, your virtual assistant." },
    { user: 'Bot', text: "How may I assist you?" }
  ]);
  const [input, setInput] = useState('');
  const [conversationId, setConversationId] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false); // New state

  const API_KEY = '55ShM0TPpI19H14ZGDeeULP3hdm3ZGrs38rXXfDKbce8c511'; // Replace with your actual API key
  const BASE_URL = 'https://getcody.ai/api/v1';
  const BOT_NAME = 'developer';
  const BOT_ID = 'kQBeXrKDobyK';

  const openConversation = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/conversations`,
        {
          name: BOT_NAME,
          bot_id: BOT_ID
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setConversationId(response.data.data.id);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    openConversation();
  }, []);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const newMessage = { user: 'User', text: input };
    setMessages([...messages, newMessage]);

    try {
      const response = await axios.post(
        `${BASE_URL}/messages`,
        {
          content: input,
          conversation_id: conversationId
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setInput('');
      setIsButtonClicked(true); // Update the state to indicate the button was clicked
      const botMessage = { user: 'Bot', text: response.data.data.content };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = { user: 'Bot', text: 'There was an error sending your message. Please try again.' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div>
      {/* Floating icon to open the chat */}
      <button className={styles.chatIcon} onClick={toggleChat}>
        <img src={ChatbotIcon} alt="Chatbot Icon" />
      </button>

      {/* Chat window */}
      {isChatOpen && (
        <div className={styles.chatbotContainer}>
          <div className={styles.chatHeader}>
            <img src={ChatbotIcon} alt="Chatbot Icon" />
            <div className={styles.title}>
              <span className={styles.knowy}>knowy</span><br /> 
              <span className={styles.byUnow}>by u!now</span>
            </div>
          </div>
          <div className={styles.chatMessages}>
            {messages.map((message, index) => (
              <div key={index} className={`${styles.message} ${message.user === 'User' ? styles.message1 : styles.message2}`}>
                {message.user === 'User' ? (
                  <>
                    <div className={styles.userText}>
                      {message.text}
                    </div>
                    <img className={styles.userAvatar} src={UserAvatar} alt="User Avatar" />
                  </>
                ) : (
                  <>
                    <img className={styles.botAvatar} src={BotAvatar} alt="Bot Avatar" />
                    <div className={styles.botText}>
                      {message.text}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
          <div className={styles.chatInput}>
  <input
    type="text"
    placeholder="Type your message here..."
    value={input}
    onChange={(e) => setInput(e.target.value)}
    onKeyPress={(e) => {
      if (e.key === 'Enter') sendMessage();
    }}
  />
  <button
    onClick={sendMessage}
    className={input ? styles.activeButton : ''}
  >
    <img src={paper} alt="button icon" className={styles.buttonImage} />
  </button>
</div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
