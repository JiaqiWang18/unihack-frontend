import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ImageUploader from "react-images-upload";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import backend from "../apis/backend";

const FormDialog = ({
  handleClose,
  open,
  handleUpload,
  handleSubmit,
  screenshot,
}) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="md"
      >
        <DialogContent>
          <DialogContentText>
            隐私提示： 我们不会存储任何用户照片
          </DialogContentText>
          <ImageUploader
            withIcon={true}
            buttonText="选择截屏"
            onChange={handleUpload}
            imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg"]}
            maxFileSize={5242880}
            singleImage
            withPreview
            withLabel={false}
            fileContainerStyle={{ boxShadow: "none" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            取消
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            disabled={screenshot.length === 0}
          >
            开始检测！
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const ImageUpload = ({ setShowLoader }) => {
  const [open, setOpen] = useState(false);
  const [screenshot, setScreenshot] = useState([]);

  let history = useHistory();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setScreenshot([]);
  };

  const handleUpload = (picture) => {
    setScreenshot(picture);
  };

  const handleSubmit = async () => {
    let data = new FormData();
    const file = screenshot[0];
    setOpen(false);
    data.append("file", file, file.name);
    setShowLoader(true);
    const textOutPut = await backend
      .post("/api/getText", data, {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        },
      })
      .catch((e) => {});
    setShowLoader(false);
    setShowLoader(true);
    const res = await backend
      .post("/api/predict", textOutPut.data)
      .catch((e) => {});
    setShowLoader(false);
    console.log(res);
    history.push({
      pathname: "/result",
      state: {
        data: res.data,
      },
    });
  };

  return (
    <>
      <button className="upload-btn" onClick={handleClickOpen}>
        <i className="fas fa-image fa-2x"></i>
      </button>
      <FormDialog
        open={open}
        handleClose={handleClose}
        handleUpload={handleUpload}
        handleSubmit={handleSubmit}
        screenshot={screenshot}
      />
    </>
  );
};

export default ImageUpload;
