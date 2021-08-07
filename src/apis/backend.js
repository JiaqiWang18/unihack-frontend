import axios from "axios";

export default axios.create({
  baseURL: "http://ec2-54-183-223-162.us-west-1.compute.amazonaws.com/",
  //baseURL: "http://45.77.237.63/",
});
