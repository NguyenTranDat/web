import React from 'react';
import {Link} from "react-router-dom";

import google from "../img/google.png";
import facebook from "../img/facebook.png";
import github from "../img/github.png";
import './.style/Login.css';

function Login(prop) {
    return (
        <div className='login-form'>
            <form>
                <div className="form-outline mb-4">
                    <label className="form-label" for="form2Example1">Email address</label>
                    <input type="email" id="form2Example1" className="form-control" />
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label" for="form2Example2">Password</label>
                    <input type="password" id="form2Example2" className="form-control" />
                </div>

                <div className="row mb-4">
                    <div className="col d-flex justify-content-center">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="form2Example31"/>
                            <label className="form-check-label" for="form2Example31"> Remember me </label>
                        </div>
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col d-flex justify-content-center">
                        <a href="#!">Forgot password?</a>
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col d-flex justify-content-center">
                    <Link to="/"><button type="button" className="btn btn-primary btn-block mb-4">Sign in</button></Link>
                    </div>
                </div>

                <div className="text-center">
                    <p>Not a member? <a href="#!">Register</a></p>
                    <p>or sign up with:</p>
                    <img src={facebook} alt="facebook" className='mx-1'/>
                    <img src={google} alt="google" className='mx-1'/>
                    <img src={github} alt="github" className='mx-1'/>
                </div>
            </form>
        </div>
    )
}

export default Login;