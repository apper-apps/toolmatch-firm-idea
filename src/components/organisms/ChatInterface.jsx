import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatMessage from '@/components/molecules/ChatMessage';
import OptionButton from '@/components/molecules/OptionButton';
import TypingIndicator from '@/components/molecules/TypingIndicator';
import Button from '@/components/atoms/Button';
import { useDecisionFlow } from '@/hooks/useDecisionFlow';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';

const ChatInterface = ({ className = '' }) => {
  const {
    currentStep,
    currentQuestion,
    userSelections,
    loading,
    error,
    actions
  } = useDecisionFlow();

  const [messages, setMessages] = useState([]);
  const [showTyping, setShowTyping] = useState(false);

  useEffect(() => {
    if (currentStep === 'welcome') {
      setMessages([
        {
          id: 1,
          text: "👋 Welcome to ToolMatch Pro! I'm here to help you choose the perfect SaaS builder platform.",
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [currentStep]);

  useEffect(() => {
    if (currentQuestion && currentStep !== 'welcome') {
      const delay = currentStep === 'priority' ? 1000 : 500;
      
      setShowTyping(true);
      setTimeout(() => {
        setShowTyping(false);
        setMessages(prev => [...prev, {
          id: Date.now(),
          text: currentQuestion.title,
          subtitle: currentQuestion.subtitle,
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }, delay);
    }
  }, [currentQuestion, currentStep]);

  const handleOptionSelect = (option) => {
    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now(),
      text: `${option.emoji} ${option.text}`,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);

    // Handle selection based on current step
    switch (currentStep) {
      case 'priority':
        actions.selectPriority(option.value);
        break;
      case 'category':
        actions.selectCategory(option.value);
        break;
      case 'preference':
        actions.selectPreference(option.value);
        break;
    }
  };

  const handleStartFlow = () => {
    actions.startFlow();
    setMessages(prev => [...prev, {
      id: Date.now(),
      text: "Let's get started! 🚀",
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  if (error) {
    return (
      <div className={`bg-surface-800 border border-surface-700 rounded-xl ${className}`}>
        <Error 
          message={error}
          onRetry={actions.retry}
          type="network"
        />
      </div>
    );
  }

  return (
    <div className={`bg-surface-800 border border-surface-700 rounded-xl overflow-hidden ${className}`}>
      {/* Header */}
      <div className="border-b border-surface-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse-soft"></div>
            <h3 className="font-semibold text-gray-200">Decision Assistant</h3>
          </div>
          {currentStep !== 'welcome' && (
            <Button
              variant="ghost"
              size="sm"
              icon="RotateCcw"
              onClick={actions.resetFlow}
            >
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {currentStep === 'welcome' && messages.length === 1 ? (
          <Empty
            title="Ready to Find Your Perfect SaaS Builder?"
            message="I'll guide you through a few questions to recommend the best platform for your needs."
            actionText="Start Conversation"
            onAction={handleStartFlow}
            icon="MessageCircle"
          />
        ) : (
          <>
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <ChatMessage
                    message={message.text}
                    isUser={message.isUser}
                    timestamp={message.timestamp}
                  />
                  {message.subtitle && !message.isUser && (
                    <p className="text-sm text-gray-400 ml-11 mt-1">{message.subtitle}</p>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {showTyping && <TypingIndicator />}

            {loading && <Loading type="chat" />}
          </>
        )}
      </div>

      {/* Options */}
      {currentQuestion && !loading && (
        <div className="border-t border-surface-700 p-4">
          <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
            {currentQuestion.options.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <OptionButton
                  option={option}
                  onClick={handleOptionSelect}
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;