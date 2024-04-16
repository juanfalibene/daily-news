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
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Hidden,
} from "@mui/material";
import Logo from "./Logo";

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

  const handleChange = (e) => {
    setInputValue(e.target.value);
    dispatch(setInput(e.target.value));
  };

  return (
    <Container>
      <header className='header'>
        <Logo width={"2.51em"} height={"1.51em"}></Logo>
        <nav className='navbar'>
          {isSignedIn ? (
            <div className='news__search'>
              <Hidden mdDown>
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
              </Hidden>
              <Hidden mdUp>
                <FormControl fullWidth>
                  <InputLabel id='select-category'>Category</InputLabel>
                  <Select
                    labelId='select-category'
                    id='select-category'
                    value={inputValue}
                    label='Category'
                    onChange={handleChange}
                  >
                    {categories.map((category) => {
                      return (
                        <MenuItem value={category} fullWidth>
                          {category}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Hidden>
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
