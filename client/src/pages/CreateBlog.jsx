import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer";

const CreateBlog = () => {
  axios.defaults.withCredentials = true;
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  const id = localStorage.getItem("userId");
  const navigate = useNavigate();

  // input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // handle form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://blog-app-deployed-api.vercel.app/blog/create-blog",
        {
          title: inputs.title,
          description: inputs.description,
          image: inputs.image,
          user: id,
        }
      );
      if (data?.success) {
        toast.success("Blog created successfully.");
        setTimeout(() => {
          navigate("/my-blogs");
        }, 1200);
      }
    } catch (error) {
      toast.error("Error in creating blog, please try again later.");
      console.log(error);
    }
  };
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <form onSubmit={handleSubmit}>
        <Box
          width={"50%"}
          height={"10%"}
          border={0}
          // borderRadius={10}
          padding={3}
          margin="auto"
          boxShadow={"10px 20px 20px #ccc"}
          display="flex"
          flexDirection={"column"}
          // gap="1px"
          marginTop="30px"
        >
          <Typography
            style={{ Color: "#172D13" }}
            variant="h4"
            textAlign={"center"}
            fontWeight="bold"
            padding={2}
            // color="gray"
          >
            Create A Blog
          </Typography>
          <InputLabel
            sx={{ mb: 0, mt: 3, fontSize: "20px", fontWeight: "bold" }}
          >
            Title
          </InputLabel>
          <TextField
            name="title"
            value={inputs.title}
            onChange={handleChange}
            margin="none"
            variant="outlined"
            required
          />
          <InputLabel
            sx={{ mb: 0, mt: 3, fontSize: "20px", fontWeight: "bold" }}
          >
            Description
          </InputLabel>
          <TextField
            name="description"
            value={inputs.description}
            onChange={handleChange}
            margin="none"
            variant="outlined"
            required
          />
          <InputLabel
            sx={{ mb: 0, mt: 3, fontSize: "20px", fontWeight: "bold" }}
          >
            Image URL
          </InputLabel>
          <TextField
            name="image"
            value={inputs.image}
            onChange={handleChange}
            margin="none"
            variant="outlined"
          />
          <Button
            type="submit"
            variant="contained"
            style={{
              backgroundColor: "#172D13",
              height: "50px",
              fontWeight: "bold",
              fontSize: "15px",
              marginTop: "30px",
            }}
          >
            SUBMIT
          </Button>
        </Box>
      </form>
      <Footer />
    </>
  );
};

export default CreateBlog;
