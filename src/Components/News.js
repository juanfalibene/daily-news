import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInput, setBlogData } from "../features/userSlice";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";

const News = () => {
  const searchInput = useSelector(selectUserInput);
  const apikey = "b020e78d6c337c965e8282b57ee419a2";
  const url = `https://gnews.io/api/v4/top-headlines?category=${searchInput}&lang=en&max=9&apikey=${apikey}`;
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState();

  const [loading, setLoading] = useState(true);

  const published = (fullDate) => {
    const publishedDate = new Date(fullDate);
    const today = new Date();
    const difference = today - publishedDate;
    const daysBefore = Math.floor(difference / (1000 * 60 * 60 * 24));

    if (daysBefore > 0) {
      return `${daysBefore} days ago`;
    } else {
      const hoursBefore = Math.floor(difference / (1000 * 60 * 60));
      if (hoursBefore > 0) {
        return `${hoursBefore} ${hoursBefore > 1 ? "hours" : "hour"} ago`;
      } else {
        const minutesBefore = Math.floor(difference / (1000 * 60));
        if (minutesBefore > 0) {
          return `${minutesBefore} ${
            minutesBefore > 1 ? "minutes" : "minute"
          } ago`;
        } else {
          return "Just Now";
        }
      }
    }
  };

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        dispatch(setBlogData(response.data));
        setBlogs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchInput]);

  return (
    <Container>
      {loading ? <CircularProgress /> : ""}
      <Grid container spacing={2} mb={4} mt={1}>
        {blogs?.articles?.map((blog, index) => (
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                maxWidth: 600,
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.08)",
              }}
              variant='outlined'
              key={index}
            >
              <CardMedia
                sx={{
                  width: "100%",
                  height: 0,
                  paddingBottom: "56.25%",
                  backgroundColor: "rgba(0, 0, 0, 0.08)",
                }}
                image={blog.image}
                alt={blog.title}
                key={blog.image}
                title={blog.title}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant='h3'
                  component='div'
                  fontSize={18}
                  fontWeight={400}
                  color='text.primary'
                >
                  {blog.title}
                </Typography>
                <Typography variant='body2' color='text.secondary' mb={2}>
                  {blog.source.name} {published(blog.publishedAt)}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {blog.description}
                </Typography>
                <CardActions>
                  <Button
                    href={blog.url}
                    target='_blank'
                    rel='noreferrer'
                    color={"primary"}
                    fullWidth
                    sx={{ mt: 3, textTransform: "initial" }}
                    variant='outlined'
                    textTransform='upppercase'
                  >
                    CONTINUE READ
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {blogs?.totalArticles === 0 && (
          <Typography color='text.primary' variant='body1'>
            No News found
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default News;
