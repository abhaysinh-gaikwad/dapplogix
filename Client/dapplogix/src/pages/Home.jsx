
import axios from "axios";
import LogoutButton from "../components/auth/Logout";
import { useEffect, useState } from "react";



function Home() {

  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState({});
  
async function FetchData() {
  try{
    const data =  await axios.get("https://dapplogix.onrender.com/blogs")
    console.log(data.data);
    setBlogs(data.data.blogs);
  }catch(error){
    console.log(error);
  }
}

useEffect(() => {
  FetchData();
}, []);
  return (
    <div>
      <LogoutButton />
      {blogs?.map((blog) => (
        <div key={blog._id}>
          <h1>{blog.title}</h1>
          <p>{blog.content}</p>
          <p>{blog.username}</p>
          <img src={blog.image} alt="" />
        </div>
      ))}
    </div>
  );
}

export default Home;
