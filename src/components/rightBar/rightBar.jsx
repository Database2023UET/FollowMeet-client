import "./rightBar.scss";

const RightBar = () => {
  return (
    <div className="RightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://i.ytimg.com/vi/UowDFX1NTB8/maxresdefault.jpg"
                alt="Avatar"
              />
              <span>Megatron</span>
            </div>
            <div className="buttons">
              <button>Follow</button>
              <button>Dismiss</button>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://i.ytimg.com/vi/UowDFX1NTB8/maxresdefault.jpg"
                alt="Avatar"
              />
              <span>Megatroll</span>
            </div>
            <div className="buttons">
              <button>Follow</button>
              <button>Dismiss</button>
            </div>
          </div>
        </div>
        <div className="item">
          <span>Friends</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://i.ytimg.com/vi/UowDFX1NTB8/maxresdefault.jpg"
                alt="Avatar"
              />
              <span>Megatron</span>
              <div className="online" />
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://i.ytimg.com/vi/UowDFX1NTB8/maxresdefault.jpg"
                alt="Avatar"
              />
              <span>Megatroll</span>
            </div>
            <span className="status">8 min ago</span>
          </div>
        </div>

        <div className="item">
          <span>Latest Activities</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://i.ytimg.com/vi/UowDFX1NTB8/maxresdefault.jpg"
                alt="Avatar"
              />
              <p>
                <span>Megatron</span> liked your post
              </p>
            </div>
            <span className="status">3 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://i.ytimg.com/vi/UowDFX1NTB8/maxresdefault.jpg"
                alt="Avatar"
              />
              <p>
                <span>Megatron</span> commented on your post
              </p>
            </div>
            <span className="status">1 min ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
