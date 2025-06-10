// ChatModal component provides a modal chat interface for users to communicate about a listing.
import React, { useState, useEffect, useRef } from 'react';
import { X, Send, MessageCircle } from 'lucide-react';
import { LocalStorageAuth } from '../lib/localStorage';
import { useAuth } from '../contexts/AuthContext';

// Message interface represents a single chat message.
interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  listing_id: string;
  content: string;
  created_at: string;
  read: boolean;
}

// User interface represents a user in the system.
interface User {
  id: string;
  email: string;
  createdAt: string;
}

// Listing interface represents a rental listing.
interface Listing {
  id: string;
  title: string;
  owner_id: string;
}

// Props for ChatModal: listing info, modal open state, and close handler.
interface ChatModalProps {
  listing: Listing;
  isOpen: boolean;
  onClose: () => void;
}

// Main ChatModal component
const ChatModal: React.FC<ChatModalProps> = ({ listing, isOpen, onClose }) => {
  const { user } = useAuth(); // Get current user from AuthContext
  const [messages, setMessages] = useState<Message[]>([]); // State for chat messages
  const [newMessage, setNewMessage] = useState(''); // State for new message input
  const [loading, setLoading] = useState(false); // Loading state for sending messages
  const [otherUser, setOtherUser] = useState<User | null>(null); // State for the other user in chat
  const messagesEndRef = useRef<HTMLDivElement>(null); // Ref for scrolling to bottom

  // Load messages and other user info when modal opens or listing/user changes
  useEffect(() => {
    if (isOpen && user) {
      loadMessages();
      loadOtherUser();
    }
  }, [isOpen, user, listing.id]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Loads messages for the current conversation from local storage
  const loadMessages = () => {
    if (!user) return;
    
    const conversationMessages = LocalStorageAuth.getMessagesByConversation(
      user.id,
      listing.owner_id,
      listing.id
    );
    setMessages(conversationMessages);
    
    // Mark messages as read
    LocalStorageAuth.markMessagesAsRead(user.id, listing.owner_id, listing.id);
  };

  // Loads the other user (listing owner) info
  const loadOtherUser = () => {
    const owner = LocalStorageAuth.getUserById(listing.owner_id);
    setOtherUser(owner);
  };

  // Scrolls the chat to the latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handles sending a new message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newMessage.trim()) return;

    setLoading(true);
    try {
      LocalStorageAuth.createMessage({
        sender_id: user.id,
        receiver_id: listing.owner_id,
        listing_id: listing.id,
        content: newMessage.trim()
      });

      setNewMessage('');
      loadMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  // Formats a date string to a short time (e.g., 14:30)
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Formats a date string to Today, Yesterday, or a date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  // If modal is not open, render nothing
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full h-96 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center space-x-3">
            <MessageCircle className="h-5 w-5 text-blue-600" />
            <div>
              <h2 className="font-semibold">{listing.title}</h2>
              <p className="text-sm text-gray-600">
                Chat with {otherUser?.email || 'Owner'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <MessageCircle className="h-12 w-12 mx-auto mb-2 text-gray-300" />
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            // Render each message, grouping by date and aligning by sender
            messages.map((message, index) => {
              const isCurrentUser = message.sender_id === user?.id;
              const showDate = index === 0 || 
                formatDate(message.created_at) !== formatDate(messages[index - 1].created_at);

              return (
                <div key={message.id}>
                  {showDate && (
                    <div className="text-center text-xs text-gray-500 my-2">
                      {formatDate(message.created_at)}
                    </div>
                  )}
                  <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-xs px-3 py-2 rounded-lg ${
                        isCurrentUser
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        isCurrentUser ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {formatTime(message.created_at)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !newMessage.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatModal;