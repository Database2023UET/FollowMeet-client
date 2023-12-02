import { useContext, useEffect } from "react";
import "../../components/posts/posts.scss";
import { Post } from "../post/post";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

const Posts = ({ posts }) => {
  //thay posts = [] bằng props posts
  const tmpPosts = [
    {
      postId: 1,
      ownerId: 1,
      contentText: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      contentImg:
        "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      postId: 2,
      ownerId: 2,
      contentText:
        "Tenetur iste voluptates dolorem rem commodi voluptate pariatur, voluptatum, laboriosam consequatur enim nostrum cumque! Maiores a nam non adipisci minima modi tempore.",
      contentImg:
        "https://fastly.picsum.photos/id/703/1000/1000.jpg?hmac=cRmL65OyDF7lg_MSgYgUc2ZNYJ3avrVNgRHVmT3TG4M",
    },
  ];

  const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `${API_ENDPOINT}/api/post/getPosts?userId=${currentUser.id}`
        );
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="posts">
      {tmpPosts.map((post) => (
        <Post post={post} key={post.postId} />
      ))}
    </div>
  );
};

export default Posts;
