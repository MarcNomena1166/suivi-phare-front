import React, { useEffect, useState,useRef } from 'react';
import { useSelector } from 'react-redux';
import ActivityService from '../service/ActivityService';
import Message from '../component/Message';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from 'react-bootstrap/InputGroup';
import { exportToExcel } from 'react-json-to-excel';
import ReactToPrint from 'react-to-print';
const Travaux = () => {

    const [file,setFile]=useState();
    const user = useSelector((state) => state.user);
    const [activityList,setActivityList]=useState([]);
    const [filteredActivity,setFilteredActivity]=useState([]);
    const {setListActivity,getListActivity,verifyCSVIntegrity,calculeAppreciation}=ActivityService();
    const headerTable=['Id','activite','region','district','commune','fokotany','localite','nombre de beneficiare','visibilité','date debut',
    ' date fin','dure','couts','partenaires','indicateur de resultat','reception technique','reception provisoire',
    'reception definitive','inauguration','observation','niveau categorie','niveau sous categorie','avancement','appréciation'];
    const categorie=['bas','moyen','urgent','phare'];

    //filtre
    const [filtreText,setFiltreText]=useState('');
    const [filtreType,setFiltreType]=useState("nom_region");

    //modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [message,setMessage]=useState('message vide');

    const bodyToPrint=useRef()

    const handleSubmit=async (e)=>{
        e.preventDefault();
        console.log(file);
        await setListActivity(file);
    }
  
    const verifyCSV=async(e)=>{
      e.preventDefault();
      console.log(file);
      const response=  await verifyCSVIntegrity(file);
      setMessage(response);
      handleShow();
    }
    const handleChangeFile=(e)=>{
        setFile(e.target.files);
    }
   

  useEffect(() => {
    const getListActivityHooks=async()=>{
            const result=await getListActivity();
            setActivityList(result.data);
    }
    getListActivityHooks();
    
  },[]);


    return (
        <div>
            <h3>{user.email}</h3>
            <br/>
                <div className="alert alert-secondary" role="alert"style={{textAlign:'center'}} >
                  <span> Ajouter des travaux</span> 
                  <br/><br/>
                  <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="inputGroupFile01">CSV file</label>
                    <input type="file" className="form-control" onChange={(e)=>handleChangeFile(e)} id="inputGroupFile01"/>
                </div>
                <button type="button" className="btn btn-danger" onClick={(e)=>verifyCSV(e)}>Verifier</button> &nbsp; &nbsp;
                <button type="button" className="btn btn-secondary" onClick={(e)=>handleSubmit(e)}>Ajouter</button>
                </div>

                <hr></hr> 
                <h6>Filtre</h6>
            <div style={{fontSize:'10px',overflow:"scroll",height:"500px"}} >

            <div className="container">
                <div className="row align-items-start">
                  <div className="col">
       

                  <InputGroup className="mb-3">                       
                      <Form.Control aria-label="Text input with dropdown button" type="text" onChange={(e)=>{setFilteredActivity(activityList.filter(activity=>activity[filtreType].toLowerCase().includes(e.target.value.toLowerCase())));setFiltreText(e.target.value)}} placeholder="..." />

                      <DropdownButton
                        variant="outline-secondary"
                        title={filtreType}
                        id="input-group-dropdown-2"
                        align="end"
                        onSelect={(e)=>{setFiltreType(e)}}
                      >
                        <Dropdown.Item href="#" eventKey="nom_region">Region</Dropdown.Item>
                        <Dropdown.Item href="#" eventKey="nom_district">District</Dropdown.Item>
                        <Dropdown.Item href="#" eventKey="nom_commune">Commune</Dropdown.Item>
                        <Dropdown.Item href="#" eventKey="nom_fokotany">Fokotany</Dropdown.Item>
                        <Dropdown.Item href="#" eventKey="localite">Localite</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#" eventKey="activite">Activite</Dropdown.Item>
                      </DropdownButton>
                  </InputGroup>
        
                  </div>
                  <div className="col">
                   
                  </div>
                  <div className="col">
                 <a href="#"><img src="https://img.icons8.com/fluency/48/null/microsoft-excel-2019.png"  onClick={() => exportToExcel( filteredActivity.length===0?activityList:filteredActivity, 'travaux')} />  </a> 
                 &nbsp;
                 
                 <ReactToPrint
                trigger={()=>{
                    return <a href="#"><img src="https://img.icons8.com/office/40/null/pdf-2.png"/></a> 
                }}
                content={()=>bodyToPrint.current
                }
                documentTitle={'Liste des travaux PDF '}
                pageStyle="print"

                />
                 
                  </div>
                </div>
            </div>
      <br></br>
          Total:   {JSON.stringify(activityList.length)} Filtered:  {JSON.stringify(filteredActivity.length)}
            {activityList!=null && activityList.length>0 &&
            <Table bordered  size="sm" ref={bodyToPrint}>
            <thead style={{position:"sticky",top:"0px",backgroundColor:"grey"}}>
              <tr>
               
                {headerTable.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody >              
            {filtreText.length===0? activityList.map((activity,index)=>
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
        
<Message data={{etat:show,changeShow:handleClose.bind(this),status:message}}/>
        </div>
    );
};

export default Travaux;