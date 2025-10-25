"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import {
  MoreHorizontal,
  Heart,
  MessageCircle,
  Bookmark,
  UserPlus,
  UserCheck,
  Settings,
  Share,
  Bell,
  BellOff,
  Play,
  Users,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import useProfile from '@/hooks/useProfile';
import GroupTopicCard from '@/components/pages/home/GroupTopicCard';

// Mock data (keeping original structure)
const mockPosts = [
  { id: 1, image: "https://picsum.photos/300/300?random=1", likes: 45, comments: 12 },
  { id: 2, image: "https://picsum.photos/300/300?random=2", likes: 78, comments: 23 },
  { id: 3, image: "https://picsum.photos/300/300?random=3", likes: 156, comments: 34 },
  { id: 4, image: "https://picsum.photos/300/300?random=4", likes: 89, comments: 18 },
  { id: 5, image: "https://picsum.photos/300/300?random=5", likes: 234, comments: 45 },
  { id: 6, image: "https://picsum.photos/300/300?random=6", likes: 67, comments: 9 },
  { id: 7, image: "https://picsum.photos/300/300?random=7", likes: 123, comments: 28 },
  { id: 8, image: "https://picsum.photos/300/300?random=8", likes: 198, comments: 56 },
  { id: 9, image: "https://picsum.photos/300/300?random=9", likes: 76, comments: 14 },
];

// Extended mock data converted to unified post format
const mockVideos = [
  { id: 'v1', image: "https://picsum.photos/300/300?random=10", likes: 1200, comments: 45, type: 'video', title: "Amazing Video 1", duration: "2:30" },
  { id: 'v2', image: "https://picsum.photos/300/300?random=11", likes: 850, comments: 23, type: 'video', title: "Tutorial Video", duration: "5:45" },
  { id: 'v3', image: "https://picsum.photos/300/300?random=12", likes: 2100, comments: 67, type: 'video', title: "Vlog Episode 1", duration: "10:12" },
  { id: 'v4', image: "https://picsum.photos/300/300?random=13", likes: 567, comments: 18, type: 'video', title: "Quick Tips", duration: "1:45" },
];

const mockTopics = [
  { id: 't1', image: "https://picsum.photos/300/300?random=14", likes: 120, comments: 45, type: 'topic', title: "How to get started with React?", category: "Programming" },
  { id: 't2', image: "https://picsum.photos/300/300?random=15", likes: 156, comments: 78, type: 'topic', title: "Best practices for TypeScript", category: "Development" },
  { id: 't3', image: "https://picsum.photos/300/300?random=16", likes: 89, comments: 23, type: 'topic', title: "UI/UX Design tips for beginners", category: "Design" },
  { id: 't4', image: "https://picsum.photos/300/300?random=17", likes: 67, comments: 34, type: 'topic', title: "การใช้งาน Next.js 14", category: "Framework" },
];

// Combined content for posts tab (videos + topics + regular posts)
const allPosts = [...mockPosts, ...mockVideos, ...mockTopics];

// Liked content (mix of different types)
// const likedPosts = [
//   { id: 'l1', image: "https://picsum.photos/300/300?random=18", likes: 89, comments: 12, type: 'video', title: "Liked Video" },
//   { id: 'l2', image: "https://picsum.photos/300/300?random=19", likes: 156, comments: 34, type: 'topic', title: "Interesting Topic" },
//   { id: 'l3', image: "https://picsum.photos/300/300?random=20", likes: 234, comments: 56, type: 'post', title: "Regular Post" },
// ];

// Saved content (mix of different types)
const savedPosts = [
  { id: 's1', image: "https://picsum.photos/300/300?random=21", likes: 67, comments: 9, type: 'video', title: "Saved Video" },
  { id: 's2', image: "https://picsum.photos/300/300?random=22", likes: 123, comments: 28, type: 'topic', title: "Saved Topic" },
  { id: 's3', image: "https://picsum.photos/300/300?random=23", likes: 198, comments: 45, type: 'post', title: "Saved Post" },
];

export default function ProfilePage() {
  // Use Profile Hook
  const { profile, loading, error, isFollowing } = useProfile();

  // State Management (keeping original design)
  const [activeTab, setActiveTab] = useState('videos');
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);

  // Event Handlers
  const handleFollow = () => {
    // TODO: Implement actual follow/unfollow API call
  };

  const handleNotification = () => {
    setIsNotificationEnabled(!isNotificationEnabled);
    // TODO: Implement notification toggle API call
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>กำลังโหลดโปรไฟล์...</span>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Alert className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error || 'ไม่พบข้อมูลโปรไฟล์'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      {/* Theme Toggle Button - Fixed in the top right corner */}
      

      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <h1 className="text-xl font-semibold">{profile.username}</h1>
            {profile.isVerified && (
              <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                <span className="text-foreground text-xs">✓</span>
              </div>
            )}
          </div>
          <MoreHorizontal className="w-6 h-6" />
        </header>

        {/* Profile Info */}
        <div className="px-4 py-6">
          {/* Avatar and Stats */}
          <div className="flex items-center space-x-6 mb-4">
            <Avatar className="w-20 h-20 border border-border">
              <AvatarImage src={profile.avatar} alt={profile.displayName} />
              <AvatarFallback className="bg-secondary text-secondary-foreground">{profile.displayName.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex justify-around text-center">
                <div>
                  <div className="font-semibold text-lg">{profile.stats.topics + profile.stats.videos}</div>
                  <div className="text-sm text-muted-foreground">กิจกรรม</div>
                </div>
                <div>
                  <div className="font-semibold text-lg">{profile.stats.followers}M</div>
                  <div className="text-sm text-muted-foreground">ผู้ติดตาม</div>
                </div>
                <div>
                  <div className="font-semibold text-lg">{profile.stats.following}</div>
                  <div className="text-sm text-muted-foreground">กำลังติดตาม</div>
                </div>
              </div>
            </div>
          </div>

          {/* Display Name */}
          <div className="mb-2">
            <h2 className="font-semibold">{profile.displayName}</h2>
          </div>

          {/* Bio */}
          <div className="mb-4">
            <p className="text-sm">{profile.bio}</p>
            {profile.website && (
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                {profile.website}
              </a>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button
              variant={isFollowing() ? "outline" : "default"}
              className="flex-1"
              onClick={handleFollow}
            >
              {isFollowing() ? (
                <>
                  <UserCheck className="w-4 h-4 mr-2" />
                  กำลังติดตาม
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 mr-2" />
                  ติดตาม
                </>
              )}
            </Button>
            
            {isFollowing() && (
              <Button
                variant="outline"
                size="icon"
                onClick={handleNotification}
                className={isNotificationEnabled ? "bg-primary text-foreground" : ""}
              >
                {isNotificationEnabled ? (
                  <Bell className="w-4 h-4" />
                ) : (
                  <BellOff className="w-4 h-4" />
                )}
              </Button>
            )}
            
            <Button variant="outline" size="icon">
              <Share className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Tabs (Updated Labels) */}
        <div className="border-t border-border">
          <div className="flex">
            <button
              className={`flex-1 flex items-center justify-center py-3 ${
                activeTab === 'videos' ? 'border-b-2 border-foreground' : ''
              }`}
              onClick={() => setActiveTab('videos')}
            >
              <Play className="w-6 h-6" />
            </button>
            <button
              className={`flex-1 flex items-center justify-center py-3 ${
                activeTab === 'topics' ? 'border-b-2 border-foreground' : ''
              }`}
              onClick={() => setActiveTab('topics')}
            >
              <Users className="w-6 h-6" />
            </button>
            <button
              className={`flex-1 flex items-center justify-center py-3 ${
                activeTab === 'saved' ? 'border-b-2 border-foreground' : ''
              }`}
              onClick={() => setActiveTab('saved')}
            >
              <Bookmark className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content Display */}
        {activeTab === 'videos' && (
          <div className="grid grid-cols-3 gap-1">
            {allPosts.map(post => (
              <div key={post.id} className="aspect-square relative group cursor-pointer">
                <Image
                  width={100}
                  height={100}
                  src={post.image}
                  alt={('title' in post ? post.title : null) || `Post ${post.id}`}
                  className="w-full h-full object-cover"
                />

                {/* Type indicator in top-right corner */}
                <div className="absolute top-2 right-2">
                  {('type' in post && post.type === 'video') && (
                    <div className="bg-black/75 text-white text-xs px-2 py-1 rounded flex items-center">
                      <Play className="w-3 h-3 mr-1" />
                      {('duration' in post ? post.duration : '')}
                    </div>
                  )}
                  {('type' in post && post.type === 'topic') && (
                    <div className="bg-primary/75 text-white text-xs px-2 py-1 rounded flex items-center">
                      <Users className="w-3 h-3" />
                    </div>
                  )}
                </div>

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex items-center space-x-4 text-white">
                    <div className="flex items-center">
                      <Heart className="w-5 h-5 mr-1 fill-current" />
                      <span className="text-sm">{post.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="w-5 h-5 mr-1 fill-current" />
                      <span className="text-sm">{post.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'topics' && (
          <div className="px-4">
            <GroupTopicCard
              title=""
              showHeader={false}
              limit={10}
              className=""
            />
          </div>
        )}

        {activeTab === 'saved' && (
          <div className="grid grid-cols-3 gap-1">
            {savedPosts.map(post => (
              <div key={post.id} className="aspect-square relative group cursor-pointer">
                <Image
                  width={100}
                  height={100}
                  src={post.image}
                  alt={('title' in post ? post.title : null) || `Saved ${post.id}`}
                  className="w-full h-full object-cover"
                />

                {/* Type indicator */}
                <div className="absolute top-2 right-2">
                  {('type' in post && post.type === 'video') && (
                    <div className="bg-black/75 text-white text-xs px-2 py-1 rounded flex items-center">
                      <Play className="w-3 h-3" />
                    </div>
                  )}
                  {('type' in post && post.type === 'topic') && (
                    <div className="bg-primary/75 text-white text-xs px-2 py-1 rounded flex items-center">
                      <Users className="w-3 h-3" />
                    </div>
                  )}
                </div>

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex items-center space-x-4 text-white">
                    <div className="flex items-center">
                      <Bookmark className="w-5 h-5 mr-1 fill-current text-blue-500" />
                      <span className="text-sm">{post.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="w-5 h-5 mr-1 fill-current" />
                      <span className="text-sm">{post.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-light">{profile.username}</h1>
            {profile.isVerified && (
              <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                <span className="text-foreground text-sm">✓</span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* Profile Info */}
        <div className="flex items-start space-x-12 mb-12">
          {/* Avatar */}
          <Avatar className="w-36 h-36 border border-border">
            <AvatarImage src={profile.avatar} alt={profile.displayName} />
            <AvatarFallback className="text-2xl bg-secondary text-secondary-foreground">{profile.displayName.charAt(0)}</AvatarFallback>
          </Avatar>

          {/* Info */}
          <div className="flex-1">
            {/* Username and Actions */}
            <div className="flex items-center space-x-6 mb-6">
              <h2 className="text-2xl font-light">{profile.username}</h2>

              <div className="flex space-x-3">
                <Button
                  variant={isFollowing() ? "outline" : "default"}
                  onClick={handleFollow}
                >
                  {isFollowing() ? (
                    <>
                      <UserCheck className="w-4 h-4 mr-2" />
                      Following
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Follow
                    </>
                  )}
                </Button>

                {isFollowing() && (
                  <Button
                    variant="outline"
                    onClick={handleNotification}
                    className={isNotificationEnabled ? "bg-primary text-foreground" : ""}
                  >
                    {isNotificationEnabled ? (
                      <Bell className="w-4 h-4" />
                    ) : (
                      <BellOff className="w-4 h-4" />
                    )}
                  </Button>
                )}

                <Button variant="outline">
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Stats (Original Design) */}
            <div className="flex space-x-8 mb-6">
              <div>
                <span className="font-semibold mr-1">{profile.stats.topics + profile.stats.videos}</span>
                <span>posts</span>
              </div>
              <div>
                <span className="font-semibold mr-1">{profile.stats.followers}M</span>
                <span>followers</span>
              </div>
              <div>
                <span className="font-semibold mr-1">{profile.stats.following}</span>
                <span>following</span>
              </div>
            </div>

            {/* Bio */}
            <div>
              <h3 className="font-semibold mb-1">{profile.displayName}</h3>
              <p className="mb-1">{profile.bio}</p>
              {profile.website && (
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {profile.website}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Tabs (Updated Labels) */}
        <div className="border-t border-border">
          <div className="flex justify-center space-x-16">
            <button
              className={`flex items-center space-x-2 py-4 text-sm font-medium ${
                activeTab === 'videos' ? 'border-t-2 border-foreground -mt-px' : 'text-muted-foreground'
              }`}
              onClick={() => setActiveTab('videos')}
            >
              <Play className="w-4 h-4" />
              <span>VIDEOS</span>
            </button>
            <button
              className={`flex items-center space-x-2 py-4 text-sm font-medium ${
                activeTab === 'topics' ? 'border-t-2 border-foreground -mt-px' : 'text-muted-foreground'
              }`}
              onClick={() => setActiveTab('topics')}
            >
              <Users className="w-4 h-4" />
              <span>TOPICS</span>
            </button>
            <button
              className={`flex items-center space-x-2 py-4 text-sm font-medium ${
                activeTab === 'saved' ? 'border-t-2 border-foreground -mt-px' : 'text-muted-foreground'
              }`}
              onClick={() => setActiveTab('saved')}
            >
              <Bookmark className="w-4 h-4" />
              <span>SAVED</span>
            </button>
          </div>
        </div>

        {/* Content Display - Desktop */}
        <div className="mt-6">
          {activeTab === 'videos' && (
            <div className="grid grid-cols-3 gap-6">
              {allPosts.map(post => (
                <div key={post.id} className="aspect-square relative group cursor-pointer overflow-hidden rounded-md">
                  <Image
                    width={100}
                    height={100}
                    src={post.image}
                    alt={('title' in post ? post.title : null) || `Post ${post.id}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Type indicator in top-right corner */}
                  <div className="absolute top-3 right-3">
                    {('type' in post && post.type === 'video') && (
                      <div className="bg-black/75 text-white text-sm px-3 py-1 rounded flex items-center">
                        <Play className="w-4 h-4 mr-1" />
                        {('duration' in post ? post.duration : '')}
                      </div>
                    )}
                    {('type' in post && post.type === 'topic') && (
                      <div className="bg-primary/75 text-white text-sm px-3 py-1 rounded flex items-center">
                        <Users className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="flex items-center space-x-6 text-white">
                      <div className="flex items-center">
                        <Heart className="w-6 h-6 mr-2 fill-current" />
                        <span className="font-semibold">{post.likes}</span>
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="w-6 h-6 mr-2 fill-current" />
                        <span className="font-semibold">{post.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'topics' && (
            <GroupTopicCard
              title=""
              showHeader={false}
              limit={10}
              className=""
            />
          )}

          {activeTab === 'saved' && (
            <div className="grid grid-cols-3 gap-6">
              {savedPosts.map(post => (
                <div key={post.id} className="aspect-square relative group cursor-pointer overflow-hidden rounded-md">
                  <Image
                    width={100}
                    height={100}
                    src={post.image}
                    alt={('title' in post ? post.title : null) || `Saved ${post.id}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Type indicator */}
                  <div className="absolute top-3 right-3">
                    {('type' in post && post.type === 'video') && (
                      <div className="bg-black/75 text-white text-sm px-3 py-1 rounded flex items-center">
                        <Play className="w-4 h-4" />
                      </div>
                    )}
                    {('type' in post && post.type === 'topic') && (
                      <div className="bg-primary/75 text-white text-sm px-3 py-1 rounded flex items-center">
                        <Users className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="flex items-center space-x-6 text-white">
                      <div className="flex items-center">
                        <Bookmark className="w-6 h-6 mr-2 fill-current text-blue-500" />
                        <span className="font-semibold">{post.likes}</span>
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="w-6 h-6 mr-2 fill-current" />
                        <span className="font-semibold">{post.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}