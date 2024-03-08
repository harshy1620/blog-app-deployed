import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { red } from "@mui/material/colors";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
} from "@mui/material";
import Footer from "../components/Footer";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});

  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/blog/get-blog/${id}`
      );
      if (data?.success) {
        setBlog(data?.blog);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogDetail();
    // eslint-disable-next-line
  }, [id]);

  return (
    <>
      <Container style={{ marginTop: 20 }}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={8}>
            <Card>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" sx={{ bgcolor: red[500] }}>
                    {blog?.user?.name
                      ? blog?.user?.name.charAt(0).toUpperCase()
                      : ""}
                  </Avatar>
                }
                title={<Typography variant="h4">{blog.title}</Typography>}
              />
              <CardMedia
                component="img"
                height="400"
                image={blog.image}
                alt="Blog Image"
                style={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="body1" color="text.secondary">
                  <strong>Description:</strong> {blog.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Writer:</strong> {blog?.user?.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default BlogDetail;
