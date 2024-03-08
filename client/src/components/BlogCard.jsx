import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BlogCard({
  title,
  description,
  image,
  name,
  time,
  id,
  isUser,
}) {
  axios.defaults.withCredentials = true;
  // Changing the date and time format
  const createdAt = new Date(time);
  const formattedDate = `${createdAt.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })} - ${createdAt.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })}`;

  // Truncate the description to the first 100 words
  const truncatedDescription = description.split(" ").slice(0, 20).join(" ");
  const isTruncated = description.split(" ").length > 100;

  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/update-details/${id}`);
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `blog-app-deployed-api.vercel.app/blog/delete-blog/${id}`
      );
      if (data?.success) {
        toast.success("Blog deleted successfully.");
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      }
    } catch (error) {
      toast.error("Error in deleting, please try again later.");
      console.error(error);
    }
  };

  return (
    <Card
      sx={{
        backgroundColor: "#efefef",
        width: "40%",
        margin: "auto",
        mt: 2,
        mb: 5,
        padding: 2,
        boxShadow: "5px 5px 10px #ccc",
        ":hover:": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
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
      {isUser && (
        <Box display="flex">
          <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
            <ModeEditIcon color="info" />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      )}

      <Link href={`blog-details/${id}`} color="primary">
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "#D76F30" }} aria-label="recipe">
              {name ? name.charAt(0).toUpperCase() : ""}
            </Avatar>
          }
          title={
            <Typography variant="h6" color="black">
              {title}
            </Typography>
          }
          subheader={
            <>
              <Typography variant="body2" color="text.secondary">
                {formattedDate}
              </Typography>
            </>
          }
        />
        <CardMedia
          component="img"
          height="194"
          image={
            image
              ? image
              : "https://cdnwpedutorenews.gramedia.net/wp-content/uploads/2021/12/19143804/platform-blogging-810x456.jpg"
          }
          alt="Blog Image"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {isTruncated ? `${truncatedDescription}...` : description}
            {isTruncated && (
              <Link href={`blog-details/${id}`} color="primary">
                Read More
              </Link>
            )}
          </Typography>
          <Typography variant="body2" color="black" style={{ marginTop: 10 }}>
            Writer: {name}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
}
