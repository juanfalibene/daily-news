import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSignedIn,
  setSignedIn,
  setUserData,
} from "../features/userSlice";
//import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Homepage = () => {
  const dispatch = useDispatch();

  //const [isLoading, setIsLoading] = useState(false);

  const responseMessage = (response) => {
    console.log(response);
    console.log("USUARIO LOGUEADO");
    dispatch(setSignedIn(true));
    const credential = response.credential;
    const decoded = jwtDecode(credential);
    console.log(decoded);
    dispatch(setUserData(decoded));
  };

  const errorMessage = (error) => {
    console.log(error);
  };
  const isSignedIn = useSelector(selectSignedIn);

  return (
    <div className='home__page' style={{ display: isSignedIn ? "none" : "" }}>
      {!isSignedIn ? (
        <div className='login__message'>
          <GoogleOAuthProvider
            clientId='866285505105-icla8fkqpc2ck9cj250cf4jclrhi3k6t.apps.googleusercontent.com'
            isSignedIn={true}
            cookiePolicy={"single_host_origin"}
          >
            <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
          </GoogleOAuthProvider>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Homepage;
