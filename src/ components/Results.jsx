import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import LinearProgress from "@material-ui/core/LinearProgress";
import random from "random";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
  },
}))(LinearProgress);
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));
const Results = (props) => {
  let history = useHistory();
  console.log(props);
  const classes = useStyles();
  // const [isResubmit, setResubmit] = useState(false)

  const clickResubmit = () => {
    history.push({ pathname: "/" });
  };

  const labelColor = {
    NEUTRAL: "secondary",
    MIXED: "secondary",
    NEGATIVE: "danger",
    POSITIVE: "success",
  };

  const numGen = {
    NEUTRAL: [0.45, 0.6],
    MIXED: [0.45, 0.6],
    NEGATIVE: [0, 0.45],
    POSITIVE: [0.6, 1],
  };

  const deterMineWords = (score) => {
    if (score == 0) {
      return ["无害", "无害", "无害"];
    } else if (0 < score && score < 1.5) {
      return ["温柔", "耐心", "可靠"];
    } else if (1.5 < score && score < 4) {
      return ["老实", "小脾气", "真实"];
    } else if (4 < score && score < 7) {
      return ["感情高手", "忽冷忽热", "不稳定"];
    }
    return ["偏执", "危险", "暴躁"];
  };

  const renderedSentence = Object.keys(props.location.state.data.DICT).map(
    (sentence) => {
      let curdict = props.location.state.data.DICT;
      return (
        <div className="card card-inner mt-4">
          <div class="card-body d-flex flex-row">
            <div className="text-white mr-3">{`"${sentence}"`}</div>
            <button
              type="button"
              class={`btn btn-outline-${
                labelColor[curdict[sentence]]
              } ml-auto btn-label`}
            >
              {`${curdict[sentence]} 
              (${random
                .float(
                  numGen[curdict[sentence]][0],
                  numGen[curdict[sentence]][1]
                )
                .toFixed(2)})`}
            </button>
          </div>
        </div>
      );
    }
  );

  const renderedWords = deterMineWords(props.location.state.data.score).map(
    (word) => {
      return (
        <div className="mx-2">
          <button className="upload-btn text-white">
            <p className="h5">{word}</p>
          </button>
        </div>
      );
    }
  );

  return (
    <>
      <div className="result-container my-3 mx-auto">
        <h1 className="text-white">鉴定结果</h1>
        <Divider />
        <div className="row">
          <div
            className={`col-md-7 left-col sentences-box card pt-1 ${classes.root}`}
          >
            {renderedSentence}
          </div>
          <div className="col-md-4">
            <div className="row score-box card">
              <div className="w-75 mx-auto my-auto">
                <p className="text-lead text-white h1">渣度</p>
                <p className="text-lead text-white h3 my-3">{`${Math.round(
                  props.location.state.data.score
                )}/10`}</p>
                <BorderLinearProgress
                  variant="determinate"
                  value={props.location.state.data.score * 10}
                />
                <p className="text-lead text-white h5 mt-5">
                  {props.location.state.data.report}
                </p>
              </div>
            </div>
            <div className="row score-box card">
              <div className="w-75 mx-auto my-auto">
                <p className="text-lead text-white h3">情感分析</p>
                <div className="d-flex flex-row justify-content-center">
                  {renderedWords}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Divider />
        <button
          type="button"
          class="btn btn-primary btn-sm my-2 mx-auto"
          onClick={clickResubmit}
        >
          重新上传
        </button>
      </div>
    </>
  );
};

export default Results;
