'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Heart, MessageSquare } from 'lucide-react';

interface Comment {
  user: string;
  avatar: string;
  comment: string;
  time: string;
  likes: number;
}

interface CommentsSectionProps {
  comments: Comment[];
}

export function CommentsSection({ comments }: CommentsSectionProps) {
  const [likedComments, setLikedComments] = useState<Set<number>>(new Set());
  const [commentLikes, setCommentLikes] = useState<number[]>(comments.map((c) => c.likes));

  const handleLike = (index: number) => {
    setLikedComments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
        setCommentLikes((prev) => {
          const newLikes = [...prev];
          newLikes[index] = Math.max(0, newLikes[index] - 1);
          return newLikes;
        });
      } else {
        newSet.add(index);
        setCommentLikes((prev) => {
          const newLikes = [...prev];
          newLikes[index] = newLikes[index] + 1;
          return newLikes;
        });
      }
      return newSet;
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comments</CardTitle>
        <CardDescription>Share your thoughts about this file</CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* Sample Comments */}
        {comments.map((comment, index) => (
          <div key={index} className='space-y-3'>
            <div className='flex items-start space-x-3'>
              <Avatar className='h-8 w-8'>
                <AvatarImage src={comment.avatar || '/placeholder.svg'} alt={comment.user} />
                <AvatarFallback>
                  {comment.user
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className='flex-1 space-y-2'>
                <div className='flex items-center space-x-2'>
                  <p className='font-semibold text-sm'>{comment.user}</p>
                  <p className='text-xs text-muted-foreground'>{comment.time}</p>
                </div>
                <p className='text-sm'>{comment.comment}</p>
                <div className='flex items-center space-x-4'>
                  <Button
                    variant='ghost'
                    size='sm'
                    className={`h-auto p-0 text-xs ${
                      likedComments.has(index) ? 'text-red-500' : ''
                    }`}
                    onClick={() => handleLike(index)}
                  >
                    <Heart
                      className={`mr-1 h-3 w-3 ${likedComments.has(index) ? 'fill-current' : ''}`}
                    />
                    {commentLikes[index]}
                  </Button>
                  <Button variant='ghost' size='sm' className='h-auto p-0 text-xs'>
                    Reply
                  </Button>
                </div>
              </div>
            </div>
            {index < comments.length - 1 && <Separator />}
          </div>
        ))}

        <div className='pt-4'>
          <Button variant='outline' className='w-full rounded-2xl bg-transparent'>
            <MessageSquare className='mr-2 h-4 w-4' />
            Add Comment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
