import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import CircularProgress from "@material-ui/core/CircularProgress";
import bgi from "../img/6e23.png";

const Home = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [loaderText, setLoaderText] = useState(null);

  return (
    <>
      {showLoader ? (
        <>
          <CircularProgress />
          <p className="my-2 text-white">{loaderText}</p>
        </>
      ) : (
        <>
          <p className="display-4 text-white">Anti-PUA</p>
          <p className="text-muted">上传聊天记录截屏，自动识别zha</p>
          <ImageUpload
            setShowLoader={setShowLoader}
            setLoaderText={setLoaderText}
          />
        </>
      )}
    </>
  );
};

export default Home;
