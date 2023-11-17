const PopoutAlert = (info) => {
  return (
    <div className="popoutAlert">
      {/* <div className="background" /> */}
      <div className="alert">
        <h1>{info.name}</h1>
        <p>{info.message}</p>
        {info.showButton && (
          <div className="buttons">
            <button className="confirm">Confirm</button>
            <button className="cancel">Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopoutAlert;
