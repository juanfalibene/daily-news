import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSignedIn,
  setSignedIn,
  setUserData,
} from "../features/userSlice";
import { jwtDecode } from "jwt-decode";
import { Typography, Box } from "@mui/material";
import Logo from "./Logo";

const Homepage = () => {
  const dispatch = useDispatch();

  //const [isLoading, setIsLoading] = useState(false);

  const responseMessage = (response) => {
    dispatch(setSignedIn(true));
    const credential = response.credential;
    const decoded = jwtDecode(credential);
    dispatch(setUserData(decoded));
  };

  const errorMessage = (error) => {
    console.log(error);
  };
  const isSignedIn = useSelector(selectSignedIn);

  return (
    <main className='home__page' style={{ display: isSignedIn ? "none" : "" }}>
      {!isSignedIn ? (
        <Box
          component='section'
          sx={{
            p: 2,
            border: "1px dashed grey",
            borderRadius: 8,
            height: "300",
            width: "300",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Logo width={"5.51em"} height={"5em"}></Logo>
          <Typography
            variant='h4'
            component='h1'
            color='text.primary'
            fontSize={16}
            fontWeight={500}
          >
            Daily News!
          </Typography>
          <Typography
            variant='p'
            component='p'
            color='text.primary'
            fontSize={12}
            p={2}
          >
            Explore daily top headlines spanning across
            <br />
            technology, entertainment,and more...
          </Typography>
          <GoogleOAuthProvider
            clientId='866285505105-icla8fkqpc2ck9cj250cf4jclrhi3k6t.apps.googleusercontent.com'
            isSignedIn={true}
            cookiePolicy={"single_host_origin"}
          >
            <GoogleLogin
              onSuccess={responseMessage}
              onError={errorMessage}
              theme='filled_black'
            />
          </GoogleOAuthProvider>
        </Box>
      ) : (
        ""
      )}
    </main>
  );
};

export default Homepage;
