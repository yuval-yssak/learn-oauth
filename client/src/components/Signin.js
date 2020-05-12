import React, { useState, useEffect } from 'react'
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux'

import { sendAccessToken } from '../redux/actions.js'

function SigninGoogle() {
  const [token, setToken] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    token && dispatch(sendAccessToken(token))
  }, [token])

  function responseGoogle(response) {
    console.log(response)
    setToken(response.accessToken)
  }

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
