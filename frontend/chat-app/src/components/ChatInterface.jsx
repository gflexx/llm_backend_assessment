import React from 'react'

function ChatInterface() {
    const [messages, setMessages] = React.useState([
        { id: 1, text: "Hey! How's it going?", sender: "other", time: "10:30" },
        { id: 2, text: "Pretty good! Just working on some code. You?", sender: "me", time: "10:32" },
        { id: 3, text: "Same here! Building a chat app actually 😄", sender: "other", time: "10:33" }
    ]);
    const [input, setInput] = React.useState('');

    const sendMessage = () => {
        if (input.trim()) {
            const newMessage = {
                id: Date.now(),
                text: input,
                sender: "me",
                time: new Date().toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                })
            };
            setMessages([...messages, newMessage]);
            setInput('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };
    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="bg-white shadow-sm border-b px-6 py-4 mb-9">
                <h1 className="text-xl font-semibold text-center">Chat With Your LLM</h1>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.sender === 'me'
                                ? 'bg-blue-500 text-white'
                                : 'bg-white text-gray-800 shadow-sm'
                                }`}
                        >
                            <p className="text-sm">{message.text}</p>
                            <p className={`text-xs mt-1 ${message.sender === 'me' ? 'text-blue-100' : 'text-gray-500'
                                }`}>
                                {message.time}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div className="bg-white border-t px-4 py-4">
                <div className="flex space-x-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message..."
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                        onClick={sendMessage}
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChatInterface