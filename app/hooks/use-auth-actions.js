"use client";
import { useAuth } from '../contexts/auth-context';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

export function useLikeAction() {
  const { requireAuth } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLike = useCallback(async (postId) => {
    try {
      setLoading(true);
      // Your API call for like
      const response = await fetch('/api/posts/like', {
        method: 'POST',
        body: JSON.stringify({ postId })
      });
      const data = await response.json();
      
      if (data.success) {
        toast.success('Post liked!');
      } else {
        toast.error(data.message || 'Failed to like post');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    like: requireAuth(handleLike, 'like this post'),
    loading
  };
}

export function useCommentAction() {
  const { requireAuth } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleComment = useCallback(async (postId, commentText) => {
    try {
      setLoading(true);
      // Your API call for comment
      const response = await fetch('/api/posts/comment', {
        method: 'POST',
        body: JSON.stringify({ postId, text: commentText })
      });
      const data = await response.json();
      
      if (data.success) {
        toast.success('Comment added!');
      } else {
        toast.error(data.message || 'Failed to add comment');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    addComment: requireAuth(handleComment, 'add a comment'),
    loading
  };
}

export function useRepostAction() {
  const { requireAuth } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleRepost = useCallback(async (postId, withQuote = null) => {
    try {
      setLoading(true);
      // Your API call for repost
      const response = await fetch('/api/posts/repost', {
        method: 'POST',
        body: JSON.stringify({ 
          postId, 
          quote: withQuote 
        })
      });
      const data = await response.json();
      
      if (data.success) {
        toast.success(withQuote ? 'Quoted!' : 'Reposted!');
      } else {
        toast.error(data.message || 'Failed to repost');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    repost: requireAuth(handleRepost, 'repost'),
    loading
  };
}

export function useSaveAction() {
  const { requireAuth } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSave = useCallback(async (postId) => {
    try {
      setLoading(true);
      // Your API call for save
      const response = await fetch('/api/posts/save', {
        method: 'POST',
        body: JSON.stringify({ postId })
      });
      const data = await response.json();
      
      if (data.success) {
        toast.success('Post saved!');
      } else {
        toast.error(data.message || 'Failed to save post');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    save: requireAuth(handleSave, 'save this post'),
    loading
  };
}