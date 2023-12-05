import { createContext, useEffect, useState } from "react";
import cloudinary from "../cloudinary/cloudinary";

export const CloudinaryContext = createContext();

export const CloudinaryContextProvider = ({ children }) => {
  const [loaded, setLoaded] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(false);
  const [previewImage, setPreviewImage] = useState(false);

  // 1. third party script load
  useEffect(() => {
    // check to see if this script is already loaded and that we are in an
    // environment that recognizes the window object
    const cldScript = document.getElementById("cloudinaryUploadWidgetScript");
    // if window is defined and script is not loaded and not in window add script
    if (typeof window !== "undefined" && !loaded && !cldScript) {
      const script = document.createElement("script");
      script.setAttribute("async", "");
      script.setAttribute("id", "cloudinaryUploadWidgetScript");
      script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
      script.addEventListener("load", () => setLoaded(true));
      document.body.appendChild(script);
    }
  }, [loaded]);

  // 2. process results
  // the Upload Widget will send back status that could be used in a progress bar
  // we'll wait for success and the render the image to the page
  const processResults = (error, result) => {
    if (error) {
      console.log("error", error);
    }
    if (result && result.event === "success") {
      setUploadedImage(result.info.secure_url);
      setPreviewImage(uploadedImage);
    }
  };

  // 3. open the widget
  // minmal upload widget configuration to allow for local and url uploads
  // a rendered button onclick event calls this function to open the widget
  const uploadWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: `${cloudinary.cloud_name}`,
        uploadPreset: `${cloudinary.upload_preset}`,
        apiKey: `${cloudinary.api_key}`,
        sources: ["local", "url"],
        showUploadMoreButton: false,
        multiple: false,
      },
      processResults
    );
  };

  return (
    <CloudinaryContext.Provider
      value={{
        uploadWidget,
        uploadedImage,
      }}
    >
      {children}
    </CloudinaryContext.Provider>
  );
};
