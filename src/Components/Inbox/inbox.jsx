import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './inbox.css';

function Inbox({ user }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [users, setUsers] = useState([]);
    const [receiverId, setReceiverId] = useState('');
    const [replyingTo, setReplyingTo] = useState(null);  
    const [newMessagesCount, setNewMessagesCount] = useState(0);

    const navigate = useNavigate();

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

            // Count new messages
            const unreadCount = data.filter(message => !message.read).length;
            setNewMessagesCount(unreadCount);

            // Optionally mark messages as read when fetched
            data.forEach(message => {
                if (!message.read) {
                    markMessageAsRead(message._id);
                }
            });
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

    const markMessageAsRead = async (messageId) => {
        try {
            await fetch(`http://localhost:5010/api/message/markRead`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messageId }),
            });
        } catch (error) {
            console.error('Error marking message as read:', error);
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
            await fetchMessages(); // Refetch messages to update the list and new messages count
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleSetReply = (message) => {
        setReceiverId(message.sender._id);
        setReplyingTo(message);
        setNewMessage(`Replying to ${message.sender.username}: \n"${message.content}"\n\n`);
    };

    const handleDeleteMessage = async (messageId) => {
        try {
            const response = await fetch(`http://localhost:5010/api/message/delete/${messageId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`Error deleting message: ${response.status}`);
            }
            const { deletedMessageId } = await response.json();
            setMessages(messages.filter(message => message._id !== deletedMessageId));
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    const handleReturnToProfile = () => {
        // Navigate based on user role
        if (user.userType === 'admin') {
            navigate('/adminProfile'); // Path to admin profile
        } else if (userType === 'developer') {
            navigate('/devProfile'); // Path to developer profile
        } else {
            console.error('Unknown user role');
            console.log('User:', user.userType);
        }
    };

    return (
        <div className="inbox">
            <h2 className={newMessagesCount > 0 ? 'flash-red' : ''}>
                Inbox {newMessagesCount > 0 ? `(${newMessagesCount} New)` : ""}
            </h2>
            <button onClick={handleReturnToProfile} className="return-profile-button">
            Return to Profile
        </button>
            <div className="messages-container">
                {messages.map((message) => (
                    <div key={message._id} className={`message-card ${!message.read ? 'unread' : ''}`}>
                        <p><strong>{message.sender.username}:</strong> {message.content}</p>
                        <p className="timestamp">{new Date(message.timestamp).toLocaleString()}</p>
                        <button className="reply-button" onClick={() => handleSetReply(message)}>Reply</button>
                        <button onClick={() => handleDeleteMessage(message._id)} className="delete-button">Delete</button>
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
