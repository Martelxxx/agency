// routes/message.js
import express from 'express';
import Message from '../../models/message.js';

const router = express.Router();

// Send a message
router.post('/send', async (req, res) => {
    const { sender, receiver, content, timestamp, read } = req.body;
    try {
        const message = new Message({ sender, receiver, content, timestamp, read });
        await message.save();
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ message: 'Error sending message', error });
    }
});

// Get messages for a user
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const messages = await Message.find({ receiver: userId }).populate('sender', 'username');
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving messages', error });
    }
});

// Assuming this is in your routes/message.js
router.post('/markRead', async (req, res) => {
    const { messageId } = req.body;
    try {
        const message = await Message.findByIdAndUpdate(messageId, { read: true }, { new: true });
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update message read status', error });
    }
});

router.delete('/delete/:messageId', async (req, res) => {
    const { messageId } = req.params;
    try {
        const deletedMessage = await Message.findByIdAndDelete(messageId);
        if (!deletedMessage) {
            return res.status(404).json({ message: 'Message not found' });
        }
        res.status(200).json({ message: 'Message deleted successfully', deletedMessageId: messageId });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete message', error });
    }
});


export default router;
