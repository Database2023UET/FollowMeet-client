import "./LeftBar.scss";
import Friends from "../../img/1.png";
import Groups from "../../img/2.png";
import Market from "../../img/3.png";
import Watch from "../../img/4.png";
import Memories from "../../img/5.png";
import Events from "../../img/6.png";
import Gaming from "../../img/7.png";
import Gallery from "../../img/8.png";
import Videos from "../../img/9.png";
import Messages from "../../img/10.png";
import Tutorials from "../../img/11.png";
import Courses from "../../img/12.png";
import Fund from "../../img/13.png";

const LeftBar = () => {
  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img
              src="https://images.unsplash.com/photo-1658233427329-9d72b824e144?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
              alt="Avatar"
            />
            <span>Optimus Prime</span>
          </div>
          <div className="item">
            <img src={Friends} alt="Friends" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={Groups} alt="Groups" />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src={Market} alt="Market" />
            <span>Marketplace</span>
          </div>
          <div className="item">
            <img src={Watch} alt="Watch" />
            <span>Watch</span>
          </div>
          <div className="item">
            <img src={Memories} alt="Memories" />
            <span>Memories</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span className="title">Explore</span>
          <div className="item">
            <img src={Events} alt="Events" />
            <span>Events</span>
          </div>
          <div className="item">
            <img src={Gaming} alt="Gaming" />
            <span>Gaming</span>
          </div>
          <div className="item">
            <img src={Gallery} alt="Gallery" />
            <span>Gallery</span>
          </div>
          <div className="item">
            <img src={Videos} alt="Videos" />
            <span>Videos</span>
          </div>
          <div className="item">
            <img src={Messages} alt="Messages" />
            <span>Messages</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span className="title">More</span>
          <div className="item">
            <img src={Fund} alt="Fund" />
            <span>Fundraiser</span>
          </div>
          <div className="item">
            <img src={Tutorials} alt="Tutorials" />
            <span>Tutorials</span>
          </div>
          <div className="item">
            <img src={Courses} alt="Courses" />
            <span>Courses</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
