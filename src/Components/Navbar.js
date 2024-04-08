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
import { Avatar, Button, TextField, Typography } from "@mui/material";

const Navbar = () => {
  const [inputValue, setInputValue] = useState("tech");
  const isSignedIn = useSelector(selectSignedIn);
  const userData = useSelector(selectUserData);

  const dispatch = useDispatch();

  const logOut = (response) => {
    dispatch(setSignedIn(false));
    dispatch(setUserData(null));
    googleLogout();
  };

  const handleClick = (e) => {
    console.log(e);
  };

  return (
    <header className='header'>
      <Typography variant='h5' component='h1'>
        Daily News
      </Typography>
      <nav className='navbar'>
        {isSignedIn ? (
          <div className='news__search'>
            <TextField
              variant='outlined'
              size='small'
              className='input__search'
              value={inputValue}
              onChange={(e) => setInputValue.apply(e.target.value)}
              placeholder=''
            />
            <Button
              size='medium'
              variant='outlined'
              className='btn__submit'
              onClick={handleClick}
            >
              Search
            </Button>
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
            <Typography variant='body2' component='p' className='signedIn'>
              {userData?.given_name}
            </Typography>
            <Button size='small' variant='outlined' onClick={logOut}>
              Log out
            </Button>
          </div>
        ) : (
          <Typography variant='body2' component='p' className='notSignedIn'>
            Log in for Daily News
          </Typography>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
