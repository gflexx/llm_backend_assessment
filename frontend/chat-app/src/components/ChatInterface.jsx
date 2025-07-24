import React from 'react'
import { useState } from 'react'

function ChatInterface() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = async () => {
        if (input.trim() && !isLoading) {
            const userMessage = {
                id: Date.now(),
                message: input,
                is_user: true,
                timestamp: new Date().toISOString()
            };

            // Add user message
            setMessages(prev => [...prev, userMessage]);
            const currentInput = input;
            setInput('');
            setIsLoading(true);

            try {
                const response = await fetch('http://127.0.0.1:8000/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ question: currentInput })
                });

                if (response.ok) {
                    const llmResponse = await response.json();
                    setMessages(prev => [...prev, llmResponse]);

                } else {

                    // Handle error
                    const errorMessage = {
                        id: Date.now() + 1,
                        message: "Sorry, I couldn't process your message. Please try again.",
                        is_user: false,
                        timestamp: new Date().toISOString()
                    };
                    setMessages(prev => [...prev, errorMessage]);
                }

            } catch (error) {

                console.error('Error sending message:', error);
                const errorMessage = {
                    id: Date.now() + 1,
                    message: "Network error. Please check your connection and try again.",
                    is_user: false,
                    timestamp: new Date().toISOString()
                };
                setMessages(prev => [...prev, errorMessage]);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !isLoading) {
            sendMessage();
        }
    };

    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="bg-white shadow-sm border-b px-6 py-4">
                <h1 className="text-xl font-semibold text-gray-800">Chat with your AI Assistant</h1>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                    <div className="text-center text-gray-500 mt-8">
                        <p>Start a conversation with the AI, Ask me something!</p>
                    </div>
                )}

                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.is_user ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.is_user
                                ? 'bg-blue-500 text-white'
                                : 'bg-white text-gray-800 shadow-sm'
                                }`}
                        >
                            <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                            <p className={`text-xs mt-1 ${message.is_user ? 'text-blue-100' : 'text-gray-500'
                                }`}>
                                {formatTime(message.timestamp)}
                            </p>
                        </div>
                    </div>
                ))}

                {/* Loading indicator */}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-white text-gray-800 shadow-sm max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
                            <div className="flex items-center space-x-2">
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                                <span className="text-sm text-gray-500">AI is thinking...</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-white border-t px-4 py-4">
                <div className="flex space-x-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask me anything..."
                        disabled={isLoading}
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                    <button
                        onClick={sendMessage}
                        disabled={isLoading || !input.trim()}
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Sending...' : 'Send'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChatInterface