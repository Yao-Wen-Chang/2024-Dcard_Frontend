'use client'
import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../api/github';
import MarkdownRenderer from './MarkdownRenderer';
import { Button } from 'antd';
import AddIssueModal from './AddIssueModal';
import EditIssueModal from './EditIssueModal';
import RemoveArticleBtn from './RemoveArticleBtn';
import { useRouter } from 'next/router';


interface Post {
  id: string;
  title: string;
  body: string;
}

interface PostListProps {
  user: string;
}

const PostList: React.FC<PostListProps> = ({user}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [openEditModalId, setOpenEditModalId] = useState<string>();
  // const [page, setPage] = useState(0);
  const [needUpdate, setNeedUpdate] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [cursor, setCursor] = useState("");
  // const router = useRouter();

  
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

  const handleUpdateOperation = () => {

  }

  const handleOnRemoveUpdate = async({postId}: {postId: string}) => {
    // setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    // router.reload();    
    // setPosts((prevPosts) =>
    //   prevPosts.map((post) => (post.id === updatedPostId ? updatedPost : post))
    // );
    // console.log("update");
  }

  useEffect(() => {
    const loadPosts = async () => {
      setCursor("");
      setHasNextPage(false);
      const fetchedPosts = await fetchPosts({cursor: cursor});
      if(fetchedPosts) { 
        setPosts(fetchedPosts.issues);
        setHasNextPage(fetchedPosts.pageInfo.hasNextPage);
        setCursor(fetchedPosts.pageInfo.endCursor);
      }
    };
    loadPosts();
    setNeedUpdate(false);
  }, [needUpdate]);

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
          {/* <Button onClick={() => setOpenEditModalId(post.id)}/> */}
          { author === user ? 
            <> 
              <EditIssueModal id={post.id} title={post.title} body={post.body} onEditSubmit={() => {setNeedUpdate(true)}} /> 
              <RemoveArticleBtn issueId={post.id} onRemove={() => {setNeedUpdate(true)}} /> 
            </> : null }

        </div>
      ))}
      { author === user ? <AddIssueModal onAdd={() => {setNeedUpdate(true)}} /> : null }
    </div>
    
  );
};

export default PostList;
