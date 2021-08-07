import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import LinearProgress from "@material-ui/core/LinearProgress";
import Alert from "@material-ui/lab/Alert";
import Home from "./Home";

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
    NEGATIVE: "danger",
    POSITIVE: "success",
  };
  const renderedSentence = Object.keys(props.location.state.data.DICT).map(
    (sentence) => {
      return (
        <div className="card">
          <div class="card-body d-flex flex-row align-items-center">
            <div className="text-white">{`"${sentence}"`}</div>
            {/* <h5 class="card-title text-white">{sentence}</h5> */}
            {/* <h6 class="card-subtitle text-muted ml-auto">
              {props.location.state.data.DICT[sentence]}
            </h6> */}
            <button
              type="button"
              class={`btn btn-outline-${
                labelColor[props.location.state.data.DICT[sentence]]
              } ml-auto btn-label`}
            >
              {props.location.state.data.DICT[sentence]}
            </button>
          </div>
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
                <p className="text-lead text-white h2">渣度</p>
                <p className="text-lead text-white h3 my-3">{`${Math.round(
                  props.location.state.data.score
                )}/10`}</p>
                <BorderLinearProgress
                  variant="determinate"
                  value={props.location.state.data.score * 10}
                />
              </div>
            </div>
            <div className="row score-box card">
              <div className="w-75 mx-auto my-auto">
                <p className="text-lead text-white h3">
                  {props.location.state.data.report}
                </p>
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
