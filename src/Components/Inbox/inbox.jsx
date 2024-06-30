import React, { useState, useEffect } from 'react';
import './inbox.css';

function Inbox({ user }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [users, setUsers] = useState([]);
    const [receiverId, setReceiverId] = useState('');
    const [replyingTo, setReplyingTo] = useState(null);  // State to hold the original message being replied to

    useEffect(() => {
        if (user && user._id) {
            fetchMessages();
            fetchUsers();
        } else {
            console.log("No user data available.");
        }
    }, [user]);

    const fetchMessages = async () => {
        try {
            const response = await fetch(`http://localhost:5010/api/message/${user._id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5010/api/users');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleSendMessage = async (event) => {
        event.preventDefault();
    
        if (!receiverId) {
            console.error('Receiver not selected');
            return;
        }

        if (!user || !user._id) {
            console.error('User is not defined or user ID is missing');
            return;
        }
    
        try {
            const API_URL = 'http://localhost:5010';
            const response = await fetch(`${API_URL}/api/message/send`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sender: user._id, receiver: receiverId, content: newMessage }),
            });
            if (!response.ok) {
                throw new Error(`Error sending message: ${response.status}`);
            }
            setNewMessage('');
            setReceiverId('');
            setReplyingTo(null);
            await fetchMessages();
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleSetReply = (message) => {
        setReceiverId(message.sender._id);
        setReplyingTo(message);
        setNewMessage(`Replying to ${message.sender.username}: \n"${message.content}"\n\n`);
    };

    return (
        <div className="inbox">
            <h2>Inbox</h2>
            <div className="messages-container">
                {messages.map((message) => (
                    <div key={message._id} className="message-card">
                        <p><strong>{message.sender.username}:</strong> {message.content}</p>
                        <p className="timestamp">{new Date(message.timestamp).toLocaleString()}</p>
                        <button className="reply-button" onClick={() => handleSetReply(message)}>Reply</button>
                    </div>
                ))}
            </div>
            <form className="message-form" onSubmit={handleSendMessage}>
                {replyingTo && (
                    <div className="replying-to">
                        <strong>Replying to {replyingTo.sender.username}:</strong>
                        <p>{replyingTo.content}</p>
                    </div>
                )}
                <select 
                    value={receiverId}
                    onChange={(e) => setReceiverId(e.target.value)}
                    required
                >
                    <option value="">Select a user</option>
                    {users.map((user) => (
                        <option key={user._id} value={user._id}>{user.username}</option>
                    ))}
                </select>
                <textarea
                    className="message-input"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message"
                    required
                />
                <button type="submit" className="send-button">Send</button>
            </form>
        </div>
    );
}

export default Inbox;
