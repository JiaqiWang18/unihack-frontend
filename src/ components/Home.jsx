import React from "react";
import ImageUpload from "./ImageUpload";

const Home = () => {
  return (
    <>
      <p className="display-4 text-white">Anti-PUA</p>
      <p className="text-muted">上传聊天记录截屏，自动识别zha</p>
      <ImageUpload />
    </>
  );
};

export default Home;
