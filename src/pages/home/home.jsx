import Posts from "../../components/posts/posts";
import AddPost from "../../components/addPost/addPost";
import "./home.scss";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

const Home = () => {
  const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

  const { currentUser } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `${API_ENDPOINT}/api/post/getPosts?userId=${currentUser.id}`
        );
        setPosts(res.data);
        console.log(posts);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="home">
      <AddPost />
      <Posts posts={posts} />
    </div>
  );
};

export default Home;
