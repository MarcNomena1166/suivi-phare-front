import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { MapContainer, TileLayer, Popup,Marker } from 'react-leaflet'
import '../css/map.css';
import ActivityService from '../service/ActivityService';
import LocalisationService from '../service/LocalisationService';

const Map = () => {
  //function imported
  const {getLocalisationFromActivity}=LocalisationService();
  const {getListActivity}=ActivityService();

  //data
  const [activityList,setActivityList]=useState([]);
  const [filteredActivity,setFilteredActivity]=useState([]);
  const [localisation,setLocalisation]=useState({});

  //filtre
  const [filtreAppreciation,setfiltreAppreciation]=useState('');


  const filteringAppreciation=async(e)=>{
    if(e!==""){
      const activityFiltered= await filteredActivity.length===0?activityList:filteredActivity;//facteur important amle filtre(ra vide ny filteredActivity vao)
      setFilteredActivity(await activityFiltered.filter(activity=>(activity.appreciation.includes(e.toLowerCase()))));
    }else {
      setFilteredActivity([]);
      await setfiltreAppreciation('')
    }
    
  }
  useEffect(() => {
    const getListActivityHooks=async()=>{
            const result=await getListActivity();
            setActivityList(result.data);
    }

    const getListLocalisation=async()=>{
          const result=await getLocalisationFromActivity();
          setLocalisation(result.data);
    }
    getListActivityHooks();
    getListLocalisation();
  },[filteredActivity]);
    return (
        <div>
          <div className="container" style={{marginLeft:'-30px'}}>
            <div className="row" >
              <div className="col-9" >
              <MapContainer center={[-18.90849741661552, 47.50987455751331]} zoom={6} scrollWheelZoom={true}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
      
              {(filteredActivity.length===0 && activityList.length>0)?  activityList.map((activity)=>
                ( 
                   <Marker key={activity.id} position={[activity.fkt_long,activity.fkt_lat]}>
                      <Popup>
                      {activity.activite} <br />  {activity.localite} <br />{activity.appreciation}: {activity.avancement}%
                      </Popup>
                  </Marker>
                       )
                   
                ):filteredActivity.map((activity)=>
                ( 
                   <Marker key={activity.id} position={[activity.fkt_long,activity.fkt_lat]}>
                      <Popup>
                      {activity.activite} <br />  {activity.localite} <br />{activity.appreciation}: {activity.avancement}%
                      </Popup>
                  </Marker>
                       )
                   
                )}
                 
              </MapContainer>
              </div>
              
              <div className="col-3">
              <h5 style={{alignItems:'center'}}>Filtre :{JSON.stringify(filteredActivity.length)} </h5>
              
              {/* {JSON.stringify(activityList[0])} */}
              <br/>
                <Dropdown onSelect={(e)=>{  
                    setfiltreAppreciation(e)              
                    filteringAppreciation(e)
                   
                    }}>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Par Appreciation :{filtreAppreciation}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                  <Dropdown.Item eventKey="">Tous</Dropdown.Item>
                    <Dropdown.Item eventKey="inaugurable">Inaugurable</Dropdown.Item>
                    <Dropdown.Item eventKey="satisfaisant">Satisfaisant </Dropdown.Item>
                    <Dropdown.Item eventKey="lent" >Lent</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <br/>

                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Par Region
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {/* {localisation.listeRegion[0].nom_region} */}
                  {localisation.listeRegion && Array.isArray(localisation.listeRegion)  && localisation.listeRegion.map((region,index)=>
                      (
                        <Dropdown.Item key={index} href="#/action-1">{region.nom_region}</Dropdown.Item>
                       ))}
                  </Dropdown.Menu>
                </Dropdown>
                <br/>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Par District
                  </Dropdown.Toggle>
                      
                  <Dropdown.Menu>
                    {/* {localisation.listeRegion[0].nom_region} */}
                  {localisation.listeDistrict && Array.isArray(localisation.listeDistrict)  && localisation.listeDistrict.map((district,index)=>
                      (
                        <Dropdown.Item key={index} href="#/action-1">{district.nom_district}</Dropdown.Item>
                       ))}
                  </Dropdown.Menu>
                </Dropdown>

                <br/>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Par Commune
                  </Dropdown.Toggle>
                      
                  <Dropdown.Menu>
                    {/* {localisation.listeRegion[0].nom_region} */}
                  {localisation.listeCommune && Array.isArray(localisation.listeCommune)  && localisation.listeCommune.map((commune,index)=>
                      (
                        <Dropdown.Item key={index} href="#/action-1">{commune.nom_commune}</Dropdown.Item>
                       ))}
                  </Dropdown.Menu>
                </Dropdown>
               {JSON.stringify(localisation)}
              </div>
            </div>
          </div>
 
        </div>
    );
};

export default Map;