"use client";

import type React from "react";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Search, MoreVertical } from "lucide-react";

// Mock data for contacts and messages
const contacts = [
  {
    id: 1,
    name: "Alice Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Hey, how are you doing?",
    timestamp: "2:30 PM",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Bob Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Can we meet tomorrow?",
    timestamp: "1:15 PM",
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: "Carol Davis",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thanks for your help!",
    timestamp: "12:45 PM",
    unread: 1,
    online: true,
  },
  {
    id: 4,
    name: "David Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "See you later",
    timestamp: "11:30 AM",
    unread: 0,
    online: false,
  },
  {
    id: 5,
    name: "Emma Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Great job on the project!",
    timestamp: "Yesterday",
    unread: 0,
    online: true,
  },
];

const mockMessages = {
  1: [
    {
      id: 1,
      text: "Hey there! How are you doing?",
      type: "text",
      sender: "other",
      timestamp: "2:25 PM",
    },
    {
      id: 2,
      text: "I'm doing great, thanks for asking!",
      type: "text",
      sender: "me",
      timestamp: "2:26 PM",
    },
    {
      id: 3,
      text: "That's wonderful to hear!",
      type: "text",
      sender: "other",
      timestamp: "2:27 PM",
    },
    {
      id: 4,
      text: "Check out this photo I took today!",
      type: "text",
      sender: "other",
      timestamp: "2:28 PM",
    },
    {
      id: 5,
      imageUrl: "/placeholder.svg?height=200&width=300",
      type: "image",
      sender: "other",
      timestamp: "2:29 PM",
    },
    {
      id: 6,
      text: "Wow, that's beautiful!",
      type: "text",
      sender: "me",
      timestamp: "2:30 PM",
    },
  ],
  2: [
    {
      id: 1,
      text: "Hi Bob! What's up?",
      type: "text",
      sender: "me",
      timestamp: "1:10 PM",
    },
    {
      id: 2,
      text: "Hey! I was wondering if we could meet tomorrow?",
      type: "text",
      sender: "other",
      timestamp: "1:15 PM",
    },
    {
      id: 3,
      imageUrl: "/placeholder.svg?height=150&width=200",
      type: "image",
      sender: "other",
      timestamp: "1:16 PM",
    },
    {
      id: 4,
      text: "Here's the location",
      type: "text",
      sender: "other",
      timestamp: "1:16 PM",
    },
  ],
  3: [
    {
      id: 1,
      text: "You're welcome! Happy to help anytime.",
      type: "text",
      sender: "me",
      timestamp: "12:40 PM",
    },
    {
      id: 2,
      imageUrl: "/placeholder.svg?height=180&width=250",
      type: "image",
      sender: "other",
      timestamp: "12:44 PM",
    },
    {
      id: 3,
      text: "Thanks for your help!",
      type: "text",
      sender: "other",
      timestamp: "12:45 PM",
    },
  ],
};

export default function ChatPage() {
  const [selectedContact, setSelectedContact] = useState<number | null>(1);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const selectedContactData = contacts.find((c) => c.id === selectedContact);
  const messages = selectedContact
    ? mockMessages[selectedContact as keyof typeof mockMessages] || []
    : [];

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && selectedContact) {
      // In a real app, you would send this to your backend
      console.log("Sending message:", message, "to contact:", selectedContact);
      setMessage("");
    }
  };

  return (
    <div className="flex h-screen bg-background px-10">
      {/* Left Sidebar - Contacts */}
      <div className="w-80 border-r border-border flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <h1 className="text-xl font-semibold mb-3">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Contacts List */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setSelectedContact(contact.id)}
                className={`flex items-center p-3 rounded-lg cursor-pointer hover:bg-accent transition-colors ${
                  selectedContact === contact.id ? "bg-accent" : ""
                }`}
              >
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={contact.avatar || "/placeholder.svg"}
                      alt={contact.name}
                    />
                    <AvatarFallback>
                      {contact.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {contact.online && (
                    <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background"></div>
                  )}
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium truncate">{contact.name}</h3>
                    <span className="text-xs text-muted-foreground">
                      {contact.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {contact.lastMessage}
                  </p>
                </div>
                {contact.unread > 0 && (
                  <div className="ml-2 bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    {contact.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedContactData ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center">
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={selectedContactData.avatar || "/placeholder.svg"}
                      alt={selectedContactData.name}
                    />
                    <AvatarFallback>
                      {selectedContactData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {selectedContactData.online && (
                    <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background"></div>
                  )}
                </div>
                <div className="ml-3">
                  <h2 className="font-semibold">{selectedContactData.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {selectedContactData.online
                      ? "Online"
                      : "Last seen recently"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender === "me" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        msg.sender === "me"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {msg.type === "text" ? (
                        <p className="text-sm">{msg.text}</p>
                      ) : msg.type === "image" ? (
                        <div className="space-y-2">
                          <img
                            src={msg.imageUrl || "/placeholder.svg"}
                            alt="Shared image"
                            className="rounded-md max-w-full h-auto cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => {
                              // In a real app, you might open a modal or full-screen view
                              window.open(msg.imageUrl, "_blank");
                            }}
                          />
                        </div>
                      ) : null}
                      <p
                        className={`text-xs mt-1 ${
                          msg.sender === "me"
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground"
                        }`}
                      >
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input - Text only for now, image sending to be added later */}
            <div className="p-4 border-t border-border">
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1"
                />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">
                Welcome to Messages
              </h2>
              <p className="text-muted-foreground">
                Select a conversation to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
