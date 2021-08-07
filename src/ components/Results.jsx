import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import LinearProgress from "@material-ui/core/LinearProgress";
import Alert from "@material-ui/lab/Alert";

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
  console.log(props);
  const classes = useStyles();

  const renderedSentence = Object.keys(props.location.state.data.DICT).map(
    (sentence) => {
      return (
        <Alert severity="success">
          <div class="card-body d-flex flex-row align-items-center">
            <h5 class="card-title text-white">{sentence}</h5>
            <h6 class="card-subtitle text-muted ml-auto">
              {props.location.state.data.DICT[sentence]}
            </h6>
          </div>
        </Alert>
      );
    }
  );
  return (
    <div className="result-container">
      <h1 className="text-white">鉴定结果</h1>
      <Divider />
      <div className="row">
        <div className={`col-md-6 sentences-box card pt-1 ${classes.root}`}>
          {renderedSentence}
        </div>
        <div className="col-5  ml-2">
          <div className="row score-box card">
            <div className="w-75 mx-auto my-auto">
              <p className="text-lead text-white h2">最终评分</p>
              <p className="text-lead text-white h3">{`${props.location.state.data.score}/10`}</p>
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
    </div>
  );
};

export default Results;
