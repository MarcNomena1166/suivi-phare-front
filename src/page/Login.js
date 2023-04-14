import {React,useRef} from 'react';
import '../css/loginCss.css'
import AuthService from '../service/AuthService';
import { Link,useNavigate } from 'react-router-dom';
const Login = () => {

    const email=useRef();
    const mdp=useRef();
    const {login}=AuthService();
    const navigate=useNavigate();

    const handleSubmitLogin=async(e)=>{
        e.preventDefault();
        console.log(email.current.value+","+mdp.current.value);
        try{

            const response=await login(email.current.value,mdp.current.value);
            if(response.status=="success"){
                navigate('/TemplateAdmin/Travaux');
            }
        }catch(error){
            console.log(error)
            alert(error);
        }
       
    }
    return (
        <div>
            <section className="vh-100">
                    <div className="container-fluid h-custom">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            className="img-fluid" alt="Sample image"/>
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form>
                           
                            <div className="form-outline mb-4">
                                <input type="email" id="form3Example3" className="form-control form-control-lg"
                                placeholder="Enter a valid email address" ref={email}/>
                                <label className="form-label" htmlFor="form3Example3">Email address</label>
                            </div>

                           
                            <div className="form-outline mb-3">
                                <input type="password" id="form3Example4" className="form-control form-control-lg"
                                placeholder="Enter password" ref={mdp}/>
                                <label className="form-label" htmlFor="form3Example4" >Password</label>
                            </div>

                            <div className="d-flex justify-content-between align-items-center">
                            
                                <div className="form-check mb-0">
                                <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                <label className="form-check-label" htmlFor="form2Example3">
                                    Remember me
                                </label>
                                </div>
                            
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="button" className="btn btn-primary btn-lg"
                                style={{paddingLeft: "2.5rem",paddingRight: "2.5rem"}} onClick={(e)=>{handleSubmitLogin(e)}}>Login</button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="#!"
                                    className="link-danger">Register</a></p>
                            </div>

                            </form>
                        </div>
                        </div>
                    </div>
                    <div
                        className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
                       
                        <div className="text-white mb-3 mb-md-0">
                            Copyright © 2023. All rights reserved.
                        </div>
                      

                      
                        <div>
                        <a href="#!" className="text-white me-4">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#!" className="text-white me-4">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#!" className="text-white me-4">
                            <i className="fab fa-google"></i>
                        </a>
                        <a href="#!" className="text-white">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                        </div>
                       
                    </div>
                    </section>
        </div>
    );
};

export default Login;