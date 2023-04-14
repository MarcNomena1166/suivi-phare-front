import Table from 'react-bootstrap/Table';
import AvancementService from '../service/AvancementService';
import { useState } from 'react';
const Avancement = () => {

    const [file,setFile]=useState();
    const {AddAvancementCSV}=AvancementService();

    const handleChangeFile=(e)=>{
        setFile(e.target.files);
    }

    
    const handleSubmit=async (e)=>{
        e.preventDefault();
       
        await AddAvancementCSV(file);
    }
  
    return (
        <div>
                <div className="alert alert-secondary" role="alert"style={{textAlign:'center'}} >
                  <span> Add activity advancement</span> 
                  <br/><br/>
                  <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="inputGroupFile01">CSV file</label>
                    <input type="file" className="form-control" onChange={(e)=>handleChangeFile(e)} id="inputGroupFile01"/>
                </div>
                <button type="button" className="btn btn-danger" onClick={(e)=>handleSubmit(e)}>Valider</button>
                </div>
                <Table  bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Id</th>
                        <th>Activite</th>
                        <th>Avancement</th>
                        <th>Appréciation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        </tr>
                        <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        </tr>
                        <tr>
                        <td>3</td>
                        <td colSpan={2}>Larry the Bird</td>
                        <td>@twitter</td>
                        </tr>
                    </tbody>
                </Table>
        </div>
    );
};

export default Avancement;