import { useContext, useEffect, useRef, useState } from "react";
import "../../components/posts/posts.scss";
import { Post } from "../post/post";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

const Posts = ({ posts }) => {
  const [page, setPage] = useState(1);
  const loader = useRef(null);
  const [displayPosts, setDisplayPosts] = useState([]);
  const [postCounter, setPostCounter] = useState(0);

  const PostDispenser = () => {
    //return 5 posts continuously
    if (postCounter >= posts.length) return;
    setDisplayPosts((prevPosts) => {
      const newPosts = [...prevPosts];
      for (let i = postCounter; i < postCounter + 5; i++) {
        if (posts[i]) {
          newPosts.push(posts[i]);
        }
      }
      return newPosts;
    });
    setPostCounter((prev) => prev + 5);
  };

  useEffect(() => {
    var options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setDisplayPosts([]);
    setPostCounter(0);
    setPage(1);
  }, [posts]);

  useEffect(() => {
    PostDispenser();
  }, [page]);

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="posts">
      {displayPosts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
      <div ref={loader} />
    </div>
  );
};

export default Posts;
