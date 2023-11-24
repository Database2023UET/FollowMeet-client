import Posts from "../../components/posts/posts";
import AddPost from "../../components/addPost/addPost";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <AddPost />
      <Posts posts={null} />
    </div>
  );
};

export default Home;
