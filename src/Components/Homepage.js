import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";

const Homepage = () => {
  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };
  return (
    <GoogleOAuthProvider clientId='866285505105-icla8fkqpc2ck9cj250cf4jclrhi3k6t.apps.googleusercontent.com'>
      <div className='home__page'>
        <div className='login__message'>
          <h2>📰 Daily News for You</h2>
          <p>
            We provide Daily News for your morning and evening. Just sign up and
            start reading some quality news.
          </p>
          <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Homepage;
