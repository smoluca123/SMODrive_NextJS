'use client';

import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

export function FloatingChatButton() {
  const handleChatClick = () => {
    // Here you would typically open a chat modal or redirect to chat
    console.log('Chat button clicked');
  };

  return (
    <Button
      size='lg'
      className='fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-all duration-300 z-50'
      onClick={handleChatClick}
    >
      <MessageCircle className='h-6 w-6' />
      <span className='sr-only'>Live Chat</span>
    </Button>
  );
}
