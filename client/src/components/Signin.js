import React from 'react'
import { GoogleLogin } from 'react-google-login'

const responseGoogle = response => {
  console.log(response)
}

function SigninGoogle() {
  return (
    <GoogleLogin
      clientId="1053321495897-q71eb83fh2c6t37dql08valh2k3imemo.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  )
}

export default SigninGoogle
