import axios from "axios";

export default axios.create({
  //has timeout issue
  // baseURL: "https://unihackbackend.herokuapp.com/",
  baseURL: "http://45.77.237.63/",
});
