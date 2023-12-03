import { useContext, useEffect } from "react";
import "../../components/posts/posts.scss";
import { Post } from "../post/post";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

const Posts = ({ posts }) => {
  return (
    <div className="posts">
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};

export default Posts;
