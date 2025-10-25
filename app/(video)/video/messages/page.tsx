"use client"

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  MessageCircle,
  //Users,
  Settings,
  MoreHorizontal,
  Check,
  CheckCheck,
  Camera,
  Mic,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from '@/components/ui/input';

// Mock data for messages
const mockConversations = [
  {
    id: 1,
    user: {
      id: "user1",
      username: "สมชาย",
      displayName: "สมชาย กิจดี",
      avatar: "https://i.pravatar.cc/300?img=1",
      isOnline: true
    },
    lastMessage: {
      content: "สวัสดีครับ วันนี้เป็นยังไงบ้าง",
      timestamp: "2 นาที",
      isRead: false,
      isSent: false
    },
    unreadCount: 2
  },
  {
    id: 2,
    user: {
      id: "user2", 
      username: "มาลี",
      displayName: "มาลี ใจดี",
      avatar: "https://i.pravatar.cc/300?img=2",
      isOnline: false
    },
    lastMessage: {
      content: "ขอบคุณสำหรับวิดีโอครับ",
      timestamp: "1 ชม.",
      isRead: true,
      isSent: true
    },
    unreadCount: 0
  },
  {
    id: 3,
    user: {
      id: "user3",
      username: "อนันต์",
      displayName: "อนันต์ รักสนุก", 
      avatar: "https://i.pravatar.cc/300?img=3",
      isOnline: true
    },
    lastMessage: {
      content: "เจอกันพรุ่งนี้นะครับ",
      timestamp: "3 ชม.",
      isRead: true,
      isSent: true
    },
    unreadCount: 0
  },
  {
    id: 4,
    user: {
      id: "user4",
      username: "สุดา",
      displayName: "สุดา สวยใส",
      avatar: "https://i.pravatar.cc/300?img=4",
      isOnline: false
    },
    lastMessage: {
      content: "วิดีโอใหม่ของคุณดีมากเลย!",
      timestamp: "1 วัน",
      isRead: true,
      isSent: false
    },
    unreadCount: 0
  }
];

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState('chats');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState<number | null>(null);

  const filteredConversations = mockConversations.filter(conv =>
    conv.user.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hover:bg-secondary">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-semibold text-foreground">ข้อความที่บุคคล</h1>
          </div>
          <Button variant="ghost" size="icon" className="hover:bg-secondary">
            <Plus className="w-5 h-5" />
          </Button>
        </header>

        {/* Search Bar */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="ค้นหา"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary border-none"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4 mb-4">
          <div className="flex space-x-6">
            <button
              className={`pb-2 text-sm font-medium transition-colors ${
                activeTab === 'chats'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setActiveTab('chats')}
            >
              แชท
            </button>
            <button
              className={`pb-2 text-sm font-medium transition-colors ${
                activeTab === 'groups'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setActiveTab('groups')}
            >
              กลุ่ม
            </button>
          </div>
        </div>

        {/* Messages List or Empty State */}
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96 px-8">
            <div className="w-24 h-24 mb-6 text-muted-foreground">
              <MessageCircle className="w-full h-full" strokeWidth={0.5} />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              ส่งข้อความถึงเพื่อนของคุณ
            </h3>
            <p className="text-sm text-muted-foreground text-center leading-relaxed">
              แชทส่วนตัวจะปรากฏขึ้นที่นี่เมื่อการแชท
            </p>
          </div>
        ) : (
          <div className="pb-20">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className="flex items-center space-x-3 px-4 py-3 hover:bg-secondary/50 transition-colors cursor-pointer"
                onClick={() => setSelectedChat(conversation.id)}
              >
                {/* Avatar with Online Status */}
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={conversation.user.avatar} alt={conversation.user.displayName} />
                    <AvatarFallback className="bg-secondary text-secondary-foreground">
                      {conversation.user.displayName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {conversation.user.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
                  )}
                </div>

                {/* Message Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-foreground truncate">
                      {conversation.user.displayName}
                    </h3>
                    <div className="flex items-center space-x-1">
                      {conversation.lastMessage.isSent && (
                        <div className="text-muted-foreground">
                          {conversation.lastMessage.isRead ? (
                            <CheckCheck className="w-4 h-4" />
                          ) : (
                            <Check className="w-4 h-4" />
                          )}
                        </div>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {conversation.lastMessage.timestamp}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className={`text-sm truncate ${
                      conversation.lastMessage.isRead || conversation.lastMessage.isSent
                        ? 'text-muted-foreground'
                        : 'text-foreground font-medium'
                    }`}>
                      {conversation.lastMessage.content}
                    </p>
                    {conversation.unreadCount > 0 && (
                      <div className="ml-2 bg-primary text-foreground text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center px-1.5">
                        {conversation.unreadCount}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block max-w-6xl mx-auto">
        <div className="flex h-screen">
          {/* Left Sidebar - Conversations List */}
          <div className="w-80 border-r border-border flex flex-col">
            {/* Header */}
            <header className="flex items-center justify-between p-4 border-b border-border">
              <h1 className="text-xl font-semibold text-foreground">Messages</h1>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="hover:bg-secondary">
                  <Settings className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-secondary">
                  <Plus className="w-5 h-5" />
                </Button>
              </div>
            </header>

            {/* Search */}
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-secondary border-none"
                />
              </div>
            </div>

            {/* Tabs */}
            <div className="px-4 mb-4">
              <div className="flex space-x-6">
                <button
                  className={`pb-2 text-sm font-medium transition-colors ${
                    activeTab === 'chats'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => setActiveTab('chats')}
                >
                  Chats
                </button>
                <button
                  className={`pb-2 text-sm font-medium transition-colors ${
                    activeTab === 'groups'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => setActiveTab('groups')}
                >
                  Groups
                </button>
              </div>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`flex items-center space-x-3 px-4 py-3 hover:bg-secondary/50 transition-colors cursor-pointer ${
                    selectedChat === conversation.id ? 'bg-secondary' : ''
                  }`}
                  onClick={() => setSelectedChat(conversation.id)}
                >
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={conversation.user.avatar} alt={conversation.user.displayName} />
                      <AvatarFallback className="bg-secondary text-secondary-foreground">
                        {conversation.user.displayName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {conversation.user.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-foreground truncate">
                        {conversation.user.displayName}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {conversation.lastMessage.timestamp}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className={`text-sm truncate ${
                        conversation.lastMessage.isRead || conversation.lastMessage.isSent
                          ? 'text-muted-foreground'
                          : 'text-foreground font-medium'
                      }`}>
                        {conversation.lastMessage.content}
                      </p>
                      {conversation.unreadCount > 0 && (
                        <div className="ml-2 bg-primary text-foreground text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center px-1.5">
                          {conversation.unreadCount}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <header className="flex items-center justify-between p-4 border-b border-border">
                  {(() => {
                    const conversation = mockConversations.find(c => c.id === selectedChat);
                    return conversation ? (
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={conversation.user.avatar} alt={conversation.user.displayName} />
                          <AvatarFallback>{conversation.user.displayName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium text-foreground">{conversation.user.displayName}</h3>
                          <p className="text-xs text-muted-foreground">
                            {conversation.user.isOnline ? 'Active now' : 'Last seen recently'}
                          </p>
                        </div>
                      </div>
                    ) : null;
                  })()}
                  <Button variant="ghost" size="icon" className="hover:bg-secondary">
                    <MoreHorizontal className="w-5 h-5" />
                  </Button>
                </header>

                {/* Chat Messages Area */}
                <div className="flex-1 p-4 flex items-center justify-center">
                  <div className="text-center">
                    <MessageCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground" strokeWidth={0.5} />
                    <p className="text-muted-foreground">Start a conversation</p>
                  </div>
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-border">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" className="hover:bg-secondary">
                      <Camera className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="hover:bg-secondary">
                      <Mic className="w-5 h-5" />
                    </Button>
                    <Input
                      placeholder="Type a message..."
                      className="flex-1"
                    />
                    <Button size="icon" className="bg-primary hover:bg-primary/90">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="w-24 h-24 mx-auto mb-6 text-muted-foreground" strokeWidth={0.5} />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Select a conversation</h3>
                  <p className="text-muted-foreground">Choose a chat to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}