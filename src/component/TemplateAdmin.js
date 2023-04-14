import React, { useEffect, useState ,useRef} from 'react';
import Navigation from './Navigation';
import { Link,Outlet,useLocation,useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const TemplateAdmin = () => {


const location=useLocation();
const navigate = useNavigate();


useEffect(()=>{
  const login=localStorage.getItem("bibliothecaire");
 // if(login==null)navigate('/');
},[])


const path=location.pathname.split("/");
path.shift();



    return (


       
           
            <div className="Result" >
                  
          
            <div className="ms-3" >
          
                <div className="row">
                {/* <h1 align="center">Archive de document</h1> */}
               
                   <Navigation/>

                 
                    <div className=" col-9">
                   
                    <ol className="breadcrumb" >
                  {path.map((indexPath,index)=>{
                    return( <li className="breadcrumb-item" key={index}><a href="#"></a>{indexPath}</li>)

                  })}
                       
                    </ol>
                  
                    <hr></hr> 
                    <Outlet/>
                                <br></br>      
                    <footer className="bg-light text-center text-lg-start">
                    
                      <div className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
                      © 2022 Copyright:
                        <a className="text-dark" href="http://www.univ-antananarivo.mg/"> MEAH </a>
                      </div>
                   
                    </footer>
                    </div>

                </div>
                
                </div>
             </div>

   
      
      
    );
};

export default TemplateAdmin;