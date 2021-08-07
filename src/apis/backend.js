import axios from "axios";

export default axios.create({
  //has timeout issue
  baseURL: "https://unihackbackend.herokuapp.com/",
});
