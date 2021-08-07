import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import CircularProgress from "@material-ui/core/CircularProgress";

const Home = () => {
  const [showLoader, setShowLoader] = useState(false);
  return (
    <>
      {showLoader ? (
        <>
          <CircularProgress />
          <p className="my-2 text-white"> 正在努力鉴定中。。。</p>
        </>
      ) : (
        <>
          <p className="display-4 text-white">Anti-PUA</p>
          <p className="text-muted">上传聊天记录截屏，自动识别zha</p>
          <ImageUpload setShowLoader={setShowLoader} />
        </>
      )}
    </>
  );
};

export default Home;
