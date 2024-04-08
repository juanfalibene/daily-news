import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInput, setBlogData } from "../features/userSlice";

const News = () => {
  const searchInput = useSelector(selectUserInput);
  const apikey = "b020e78d6c337c965e8282b57ee419a2";
  const url = `https://gnews.io/api/v4/search?q=${searchInput}&lang=es&max=10&apikey=${apikey}`;
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        dispatch(setBlogData(response.data));
        setBlogs(response.data);
        setLoading(false);
        console.log(blogs);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchInput]);

  return (
    <div className='news__page'>
      {loading ? <p>loading...</p> : ""}
      <div className='news'>
        {blogs?.articles?.map((blog) => (
          <a
            key={blog.publishedAt}
            className='news_article'
            target='_blank'
            href={blog.url}
            rel='noreferrer'
          >
            <img src={blog.image} alt={blog.title} key={blog.image} />
            <h3>{blog.title}</h3>
            <h4>
              <span>{blog.source.name}</span>
              <span>{blog.publishedAt}</span>
            </h4>
            <p>{blog.description}</p>
          </a>
        ))}

        {blogs?.totalArticles === 0 && <p>No News found</p>}
      </div>
    </div>
  );
};

export default News;
