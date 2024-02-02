'use client'
import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../api/github';
import MarkdownRenderer from './MarkdownRenderer';
import { Button } from 'antd';
import AddIssueModal from './AddIssueModal';
import EditIssueModal from './EditIssueModal';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostListProps {
  user: string;
}

const PostList: React.FC<PostListProps> = ({user}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [openEditModalId, setOpenEditModalId] = useState<number>();
  // const [page, setPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [cursor, setCursor] = useState("");
  
  const handleScroll = async () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollY + windowHeight >= documentHeight && hasNextPage) {
      const fetchedPosts = await fetchPosts({cursor: cursor});
      if(fetchedPosts) {
        console.log("fetch one")
        setPosts((prevPosts) => [...prevPosts, ...fetchedPosts.issues]);
        setHasNextPage(fetchedPosts.pageInfo.hasNextPage);
        setCursor(fetchedPosts.pageInfo.endCursor);
      }
    } 

  }

  useEffect(() => {
    const loadPosts = async () => {
      const fetchedPosts = await fetchPosts({cursor: cursor});
      if(fetchedPosts) { 
        setPosts(fetchedPosts.issues);
        setHasNextPage(fetchedPosts.pageInfo.hasNextPage);
        setCursor(fetchedPosts.pageInfo.endCursor);
      }
    };
    loadPosts();
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasNextPage]);

  const author = process.env.NEXT_PUBLIC_AUTHOR;

  return (
    <div>
      <h1>Blog Posts</h1>
      
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <MarkdownRenderer content={post.body} />
          <Button onClick={() => setOpenEditModalId(post.id)}/>
          {author === user ? <EditIssueModal />: null}
        </div>
      ))}
      {author === user ? <AddIssueModal />: null}
    </div>
    
  );
};

export default PostList;
