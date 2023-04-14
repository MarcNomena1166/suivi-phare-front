import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';

const Navigation = () => {

    const navigate=useNavigate();

    const handleDeconnexion=()=>{
     
        navigate('/');
    }
    return (
        <div className=" col-3" >
            <div className="sidebar">
                <div className="logo_content">
                    <div className="logo" >

                    
                        <div className="logo_name" style={{marginLeft:"15px"}}>
                          MEAH
                        </div>
                       
                    </div>
                  
                </div>
                <ul className="nav_list">
                <Link to="Dashboard" style={{textDecoration:"none"}}>
                    <li>
                   
                    <span id="span">
                     
                        <span className="links_name">DashBoard</span>
                         
                        </span>

                    </li>
                    </Link>          
                    <Link to="/TemplateAdmin/Map" style={{textDecoration:"none"}}>
                    <li>
                    <span id="span">
                     
                        <span className="links_name">Map</span>
                    </span>

                    </li>
                    </Link>   
                     
                    <Link to="/TemplateAdmin/Travaux" style={{textDecoration:"none"}}>
                    <li>
                       <span id="span">
                      
                        <span className="links_name">Gestion de travaux</span>
                        </span>

                    </li>
                    </Link>   
                    <Link to="Avancement" style={{textDecoration:"none"}}> 
                    <li>
                    <span id="span">
                      
                        <span className="links_name">Gestion avancement</span>
                        </span>

                    </li>
                    </Link>   

                    <Link to="Code" style={{textDecoration:"none"}}> 
                    <li>
                    <span id="span">
                    
                        <span className="links_name">Utilisateur</span>
                        </span>

                    </li>
                    </Link>   
                </ul>
                <div className="profil_content">
                    <div className="profil">
                        <div className="profil_details">
                        <img alt='superman' src="https://img.icons8.com/color/48/000000/superman.png"/>
                            <div className="name_job">
                                <div className="name"> Mr Admin</div>
                                <div className="job"> Administrateur </div>
                            </div>
                        </div>
                       
                        <a href="#"><img id='log_out' alt='logout' onClick={handleDeconnexion} src="https://img.icons8.com/ios-filled/50/000000/logout-rounded-down.png"/></a>
                       
                    </div>
                </div>
            </div>
       
        </div>
        
    );
};

export default Navigation;