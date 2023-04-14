import axios from 'axios';
const AvancementService = () => {

    const AddAvancementCSV=async(file)=>{
        try{

                console.log(file);
                let formdataCSV=new FormData();
                formdataCSV.append('file',file[0]);
                
                const response=await axios({
                    method: 'post',
                    url: 'http://localhost:5000/api/avancement/setAvancement',
                    headers: {  'Content-Type': 'multipart/form-data'}, 
                    data: formdataCSV
                  });
                  return response;
                
                }catch(error){
                    console.log(error)
                }
    }
    return{AddAvancementCSV};
};

export default AvancementService;