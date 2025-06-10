import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Clock, User, ImageOff } from 'lucide-react';
import { LocalStorageAuth } from '../lib/localStorage';
import { useAuth } from '../contexts/AuthContext';
import ChatModal from '../components/ChatModal';

interface Conversation {
  id: string;
  listing_id: string;
  participant1_id: string;
  participant2_id: string;
  last_message: string;
  last_message_at: string;
  created_at: string;
}

interface ConversationWithDetails extends Conversation {
  listing: any;
  otherUser: any;
  unreadCount: number;
}

const MessagesPage: React.FC = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<ConversationWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedConversation, setSelectedConversation] = useState<ConversationWithDetails | null>(null);

  useEffect(() => {
    if (user) {
      loadConversations();
    }
  }, [user]);

  const loadConversations = () => {
    if (!user) return;

    try {
      const userConversations = LocalStorageAuth.getConversationsByUser(user.id);
      const conversationsWithDetails = userConversations.map(conv => {
        const listing = LocalStorageAuth.getListingById(conv.listing_id);
        const otherUserId = conv.participant1_id === user.id ? conv.participant2_id : conv.participant1_id;
        const otherUser = LocalStorageAuth.getUserById(otherUserId);
        
        // Get unread message count
        const messages = LocalStorageAuth.getMessagesByConversation(user.id, otherUserId, conv.listing_id);
        const unreadCount = messages.filter(msg => msg.sender_id === otherUserId && !msg.read).length;

        return {
          ...conv,
          listing,
          otherUser,
          unreadCount
        };
      });

      setConversations(conversationsWithDetails);
    } catch (error) {
      console.error('Error loading conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 168) { // 7 days
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const handleConversationClick = (conversation: ConversationWithDetails) => {
    setSelectedConversation(conversation);
  };

  const handleCloseChat = () => {
    setSelectedConversation(null);
    loadConversations(); // Refresh to update unread counts
  };

  if (!user) {
    return (
      <div className="pt-20 pb-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Messages</h1>
          <p className="text-gray-600">Please sign in to view your messages.</p>
          <Link to="/auth" className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="pt-20 flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Messages</h1>

        {conversations.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 text-lg mb-4">No conversations yet</p>
            <p className="text-gray-400">Start chatting with item owners to see your conversations here.</p>
            <Link 
              to="/listings" 
              className="inline-block mt-4 text-blue-600 hover:text-blue-800"
            >
              Browse Items
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {conversations.map(conversation => {
              const hasImage = conversation.listing?.images && conversation.listing.images.length > 0 && conversation.listing.images[0];
              
              return (
                <div
                  key={conversation.id}
                  onClick={() => handleConversationClick(conversation)}
                  className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    {/* Item Image */}
                    <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      {hasImage ? (
                        <img
                          src={conversation.listing.images[0]}
                          alt={conversation.listing?.title || 'Item'}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center">
                          <ImageOff className="h-6 w-6 text-gray-400 mb-1" />
                          <p className="text-gray-500 text-xs text-center px-1">
                            No Image
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Conversation Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-semibold text-gray-800 truncate">
                          {conversation.listing?.title || 'Unknown Item'}
                        </h3>
                        <div className="flex items-center space-x-2 flex-shrink-0">
                          {conversation.unreadCount > 0 && (
                            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                              {conversation.unreadCount}
                            </span>
                          )}
                          <span className="text-sm text-gray-500">
                            {formatTime(conversation.last_message_at)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {conversation.otherUser?.email || 'Unknown User'}
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 truncate">
                        {conversation.last_message}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Chat Modal */}
        {selectedConversation && (
          <ChatModal
            listing={{
              id: selectedConversation.listing_id,
              title: selectedConversation.listing?.title || 'Unknown Item',
              owner_id: selectedConversation.otherUser?.id || ''
            }}
            isOpen={!!selectedConversation}
            onClose={handleCloseChat}
          />
        )}
      </div>
    </div>
  );
};

export default MessagesPage;