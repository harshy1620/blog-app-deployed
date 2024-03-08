import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import Footer from "../components/Footer";
const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [name, setName] = useState("");

  //get user blogs
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/blog/user-blog/${id}`
      );
      if (data?.success) {
        setBlogs(data?.userBlog.blogs);
        setName(data?.userBlog?.name);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);

  return (
    <div>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
            id={blog._id}
            isUser={true}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            name={name}
            time={blog.createdAt}
          />
        ))
      ) : (
        <h1 style={{ "textAlign":"center", "marginTop":"100px", "font-Weight":"bolder"}}>You Havent Created a blog</h1>
      )}
      <Footer />
    </div>
  );
};

export default UserBlogs;
