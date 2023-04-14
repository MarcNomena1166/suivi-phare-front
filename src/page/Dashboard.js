import DoughnutChart from "../component/DoughnutChart";
import ActivityService from '../service/ActivityService';
import { useState,useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
const Dashboard = () => {

    const [filtreType,setFiltreType]=useState("");
    const {getListActivity}=ActivityService();
    const [activityList,setActivityList]=useState([]);
    const [filteredActivity,setFilteredActivity]=useState([]);
    const headerTable=['Id','activite','region','district','commune','fokotany','localite','nombre de beneficiare','visibilité','date debut',
    ' date fin','dure','couts','partenaires','indicateur de resultat','reception technique','reception provisoire',
    'reception definitive','inauguration','observation','niveau categorie','niveau sous categorie','avancement','appréciation'];
    const categorie=['bas','moyen','urgent','phare'];


    const [callback,setCallback]=useState(true);
    const [doughnutData,setDoughnutData]=useState(null);


    const dynamicColors = ()=> {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
     };

     const filteringActivity=async(e)=>{

      setFilteredActivity(activityList.filter(activity=>(activity.appreciation.includes(e.toLowerCase()))))
    }

     useEffect(() => {
        const getListActivityHooks=async()=>{
                const result=await getListActivity();
                setActivityList(result.data);
                
                const elaela=await result.data.filter(activity=>activity.appreciation==="lent").length
                const satis=await result.data.filter(activity=>activity.appreciation==="satisfaisant").length
                const inau=await  result.data.filter(activity=>activity.appreciation==="inaugurable").length
                const data={
                    labels:['lent','satisfaisant','inaugurable'],
                    datasets:[{
                        label:"nombre d'activite",
                        data: [ elaela,satis ,inau],
                        backgroundColor:[dynamicColors(),dynamicColors(),dynamicColors()]
                    }]
                }
                setDoughnutData(data);
            }
    getListActivityHooks();
   setCallback(false)

       },[]);
    return (
        <div >     
            <div style={{width:"400px"}}>
            {doughnutData!=null && doughnutData!=undefined  && <DoughnutChart data={doughnutData}/>}
            </div>  
            <br/>
            <hr></hr>
            <br/>
            <div style={{fontSize:'10px',overflow:"scroll",height:"500px"}} >

            <div className="container">
                <div className="row align-items-start">
                  <div className="col">
                  <Dropdown onSelect={(e)=>{
                    console.log(e)
                    filteringActivity(e)
                    setFiltreType(e)
                    }}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      Appreciation : {filtreType}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#" eventKey=""> Tous</Dropdown.Item>
                      <Dropdown.Item href="#" eventKey="Lent">Projet lent</Dropdown.Item>
                      <Dropdown.Item href="#" eventKey="Satisfaisant">Projet satisfaisant</Dropdown.Item>
                      <Dropdown.Item href="#" eventKey="Inaugurable">Projet inaugurable</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  </div>
                  <div className="col">
                   
                  </div>
                  <div className="col">
                  </div>
                </div>
            </div>
      <br></br>
          Total:   {JSON.stringify(activityList.length)} Filtered:  {JSON.stringify(filteredActivity.length)}
            {activityList!=null && activityList.length>0 &&
            <Table bordered  size="sm" >
            <thead style={{position:"sticky",top:"0px",backgroundColor:"grey"}}>
              <tr>
               
                {headerTable.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody >              
            {filtreType.length===0? activityList.map((activity,index)=>
                {
                    return ( 
                    <tr key={index}>
                        <td>{activity.id}</td>   
                        <td>{activity.activite}</td>   
                        <td>{activity.nom_region}</td> 
                        <td>{activity.nom_district}</td>   
                        <td>{activity.nom_commune}</td>     
                        <td>{activity.nom_fokotany}</td>   
                        <td>{activity.localite}</td>   
                        <td>{activity.nb_beneficiare}</td>   
                        <td>{activity.visibite}</td>   
                        <td>{activity.date_debut}</td>   
                        <td>{activity.date_fin}</td>   
                        <td>{activity.dure}</td>   
                        <td>{activity.couts}</td>   
                        <td>{activity.partenaires} </td>   
                        <td>{activity.indicateur_resultats}</td>   
                        <td>{activity.reception_technique}</td>   
                        <td>{activity.reception_provisoire}</td>   
                        <td>{activity.reception_definitive}</td>   
                        <td>{activity.inauguration}</td>   
                        <td>{activity.observation}</td>   
                        <td>{categorie[activity.niveau_categorie]}</td>   
                        <td>{activity.niveau_sous_categorie}</td>   
                        <td>{activity.avancement} </td>   
                        <td>{activity.appreciation} </td>     
                      
                    </tr>
                 )
                }):filteredActivity.map((activity,index)=>
                {
                    return ( 
                    <tr key={index}>
                        <td>{activity.id}</td>   
                        <td>{activity.activite}</td>   
                        <td>{activity.nom_region}</td> 
                        <td>{activity.nom_district}</td>   
                        <td>{activity.nom_commune}</td>     
                        <td>{activity.nom_fokotany}</td>   
                        <td>{activity.localite}</td>   
                        <td>{activity.nb_beneficiare}</td>   
                        <td>{activity.visibite}</td>   
                        <td>{activity.date_debut}</td>   
                        <td>{activity.date_fin}</td>   
                        <td>{activity.dure}</td>   
                        <td>{activity.couts}</td>   
                        <td>{activity.partenaires} </td>   
                        <td>{activity.indicateur_resultats}</td>   
                        <td>{activity.reception_technique}</td>   
                        <td>{activity.reception_provisoire}</td>   
                        <td>{activity.reception_definitive}</td>   
                        <td>{activity.inauguration}</td>   
                        <td>{activity.observation}</td>   
                        <td>{activity.niveau_categorie}</td>   
                        <td>{activity.niveau_sous_categorie}</td> 
                        <td>{activity.avancement} %</td>     
                        <td>{activity.appreciation}  </td>     
                      
                    </tr>
                 )
                })}
            </tbody>
          </Table>}
          </div>
        </div>

    );
};

export default Dashboard;