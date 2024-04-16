import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { googleLogout } from "@react-oauth/google";
import {
  selectSignedIn,
  selectUserData,
  setUserData,
  setInput,
  setSignedIn,
} from "../features/userSlice";
import {
  Avatar,
  Button,
  Container,
  Divider,
  Typography,
  ButtonGroup,
} from "@mui/material";

const Navbar = () => {
  const [inputValue, setInputValue] = useState("technology");
  const isSignedIn = useSelector(selectSignedIn);
  const userData = useSelector(selectUserData);

  const categories = [
    "general",
    "world",
    "nation",
    "business",
    "technology",
    "entertainment",
    "sports",
    "science",
    "health",
  ];

  const dispatch = useDispatch();

  const logOut = (response) => {
    dispatch(setSignedIn(false));
    dispatch(setUserData(null));
    googleLogout();
  };

  const handleClick = (cat) => {
    setInputValue(cat);
    dispatch(setInput(cat));
  };

  return (
    <Container>
      <header className='header'>
        <Typography variant='h5' component='h1' color='text.primary'>
          dN
        </Typography>
        <nav className='navbar'>
          {isSignedIn ? (
            <div className='news__search'>
              <ButtonGroup
                variant='outlined'
                aria-label='Category button group'
              >
                {categories.map((category) => {
                  return (
                    <Button
                      onClick={() => {
                        handleClick(category);
                      }}
                      variant={
                        category === inputValue ? "contained" : "outlined"
                      }
                      key={category}
                    >
                      {category}
                    </Button>
                  );
                })}
              </ButtonGroup>
            </div>
          ) : (
            ""
          )}

          {isSignedIn ? (
            <div className='navbar__user__data'>
              <Avatar
                className='user'
                src={userData?.picture}
                alt={userData?.name}
              />
              <Button size='small' variant='outlined' onClick={logOut}>
                Log out
              </Button>
            </div>
          ) : (
            <Typography
              variant='body2'
              color='text.primary'
              component='p'
              className='notSignedIn'
            >
              Log in for Daily News
            </Typography>
          )}
        </nav>
      </header>
      <Divider />
    </Container>
  );
};

export default Navbar;
