import Posts from "../../components/posts/posts";
import InputPost from "../../components/share/inputPost";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <InputPost />
      <Posts posts={null} />
    </div>
  );
};

export default Home;
