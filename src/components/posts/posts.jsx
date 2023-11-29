import "../../components/posts/posts.scss";
import { Post } from "../post/post";

const Posts = ({ posts }) => {
  //thay posts = [] bằng props posts
  const tmpPosts = [
    {
      id: 1,
      fullName: "John Doe",
      profilePicture:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      contentText: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      contentImg:
        "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      id: 2,
      fullName: "Jane Doe",
      profilePicture:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
      contentText:
        "Tenetur iste voluptates dolorem rem commodi voluptate pariatur, voluptatum, laboriosam consequatur enim nostrum cumque! Maiores a nam non adipisci minima modi tempore.",
      contentImg:
        "https://fastly.picsum.photos/id/703/1000/1000.jpg?hmac=cRmL65OyDF7lg_MSgYgUc2ZNYJ3avrVNgRHVmT3TG4M",
    },
  ];
  return (
    <div className="posts">
      {tmpPosts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};

export default Posts;
