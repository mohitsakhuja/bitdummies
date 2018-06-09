import React from 'react'

import { Link } from 'react-router-dom'

const SignupScreen = ({ isLoggedIn }) => (
  <div className="d-flex justify-content-center align-items-center m-5">
    <div className="card">
      <div className="card-header">
        <h5 className="card-title">Sign up or log in to BitDummies</h5>
      </div>
      <div className="card-body">
        <button className="btn btn-lg btn-primary col-md-12 m-2">
          Continue with Facebook
        </button>
        <a
          className="btn btn-lg btn-danger col-md-12 m-2"
          href="http://localhost:3001/auth/google"
        >
          Continue with Google
        </a>
      </div>
      <div className="card-footer text-muted small">
        By logging in, you agree to BitDummies' Privacy Policy and Terms of
        Service.
      </div>
    </div>
  </div>
)

export default SignupScreen
