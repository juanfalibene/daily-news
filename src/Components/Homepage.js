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
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='5.51em'
            height='5em'
            viewBox='0 0 99 65.991'
          >
            <path
              fill='#EBECED'
              d='M97.99 28.692a8.952 8.952 0 0 0-3.641-3.746l.016-.01L46.687 0L.004 23.998l.149.084l47.351 24.836c4.395 2.305 6.104 7.766 3.82 12.197a8.967 8.967 0 0 1-3.117 3.426l-.062.081l-.041.03l47.781-24.979c3.08-2.666 4.06-7.197 2.105-10.981'
            />
            <path
              fill='#BDC3C7'
              d='M47.504 48.918L0 24.001v20.39l39.235 20.58a8.88 8.88 0 0 0 4.127 1.021a8.954 8.954 0 0 0 7.962-4.875c2.283-4.433.574-9.894-3.82-12.199'
            />
            <path
              fill='#7E8B8C'
              d='m18.37 22.306l4.574 2.305l-7.688-.736l-2.387 1.202l8.27 4.164l2.402-1.21l-4.539-2.287l7.637.729l2.408-1.213l-8.27-4.164zm13.058-.133l-1.631-.82l3.977-2.002l-1.688-.851l-3.977 2.002l-1.312-.661l4.285-2.158l-1.766-.89l-6.848 3.448l8.27 4.164l6.973-3.512l-1.873-.942zm7.694-10.319l3.748 2.771l-5.906-1.683l-2.418 1.218l3.352 2.976l-5.503-1.892l-2.427 1.222l10.107 3.238l2.506-1.262l-3.762-3.35l6.656 1.892l2.506-1.263l-6.445-5.082zm16.91-1.419c-.154-.373-.496-.692-1.027-.959c-.45-.229-.969-.377-1.553-.45c-.586-.073-1.242-.05-1.974.069c-.73.119-1.772.398-3.13.84c-.545.181-.934.273-1.162.279c-.229.01-.409-.02-.541-.086c-.182-.091-.259-.205-.234-.345c.025-.14.187-.284.482-.435a2.722 2.722 0 0 1 1.104-.299c.373-.019.778.051 1.215.205l2.269-1.283c-.963-.379-1.917-.527-2.862-.445c-.949.081-1.951.388-3.008.92c-.862.434-1.433.829-1.71 1.188c-.277.357-.352.694-.22 1.008c.132.314.409.58.835.793c.646.326 1.419.474 2.316.44c.896-.03 2.029-.265 3.401-.702c.834-.269 1.431-.408 1.787-.416c.356-.011.646.039.856.146c.228.113.324.264.299.449c-.024.185-.223.369-.586.554a3.116 3.116 0 0 1-1.631.315c-.369-.023-.774-.121-1.225-.293l-2.277 1.301c.904.385 1.899.576 2.981.576c1.082 0 2.328-.354 3.733-1.062c.802-.403 1.349-.796 1.644-1.178c.302-.378.372-.757.218-1.13'
            />
            <path
              fill='#BDC2C6'
              d='M64.223 15.245L27.79 33.593l2.666 1.343l36.435-18.349zM34.01 36.725l7.998 4.026l10.662-5.369l-7.998-4.027zm17.772-6.266L73.107 19.72l-2.666-1.343l-21.325 10.74zm23.991-9.397l-21.326 10.74l2.666 1.344l21.326-10.74z'
            />
            <path
              fill='#7E8B8C'
              d='M42.028 55.029L0 32.597v2.292l41.123 21.946a.956.956 0 0 0 .451.114c.354 0 .697-.2.873-.549a1.034 1.034 0 0 0-.419-1.371'
            />
          </svg>
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
            Read daily top headlines on tech, entertainment, world, sports...
          </Typography>
          <GoogleOAuthProvider
            clientId='866285505105-icla8fkqpc2ck9cj250cf4jclrhi3k6t.apps.googleusercontent.com'
            isSignedIn={true}
            cookiePolicy={"single_host_origin"}
          >
            <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
          </GoogleOAuthProvider>
        </Box>
      ) : (
        ""
      )}
    </main>
  );
};

export default Homepage;
