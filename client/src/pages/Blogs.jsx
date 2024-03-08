import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import Footer from "../components/Footer";

const Blogs = () => {
  axios.defaults.withCredentials = true;
  const [blogs, setBlogs] = useState([]);

  //get all blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get(
        "https://blog-app-deployed-api.vercel.app/blog/all-blog"
      );

      if (data?.success) {
        setBlogs(data?.Allblogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div>
      {blogs &&
        blogs.map((blog) => (
          <BlogCard
            key={blog?._id}
            id={blog?._id}
            isUser={localStorage.getItem("userId") === blog?.user?._id}
            title={blog?.title}
            description={blog?.description}
            image={blog?.image}
            name={blog?.user?.name}
            time={blog.createdAt}
          />
        ))}
      <Footer />
    </div>
  );
};

export default Blogs;
