import axios from "axios";

const ActivityService = () => {

    const setListActivity=async(file)=>{
        try{
      
    //    console.log(file);
        let formdataCSV=new FormData();
        formdataCSV.append('file',file[0]);
        
        const response=await  axios({
            method: 'post',
            url: 'http://localhost:5000/api/activity/setActivity',
            headers: {  'Content-Type': 'multipart/form-data'}, 
            data: formdataCSV
          });
          console.log(response)
        }catch(error){
            console.log(error)
        }
    } 
    
    const getListActivity=async(token)=>{
        try {
            const response=await axios({
                method: 'get',
                url: 'http://localhost:5000/api/activity/List/',
                headers: { }, 
              });
            
              return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    const verifyCSVIntegrity=async(file)=>{
        try {

            
            let formdataCSV=new FormData();
            formdataCSV.append('file',file[0]);
            
            const response=await axios({
                method: 'post',
                url: 'http://localhost:5000/api/activity/verifyDoublons/',
                headers: {  'Content-Type': 'multipart/form-data'}, 
                data: formdataCSV
              });
              console.log(response.data);
              return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    const calculeAppreciation=async(date_debut,dure,avancement)=>{
        try {
            console.log(date_debut,typeof date_debut,dure,avancement);
        } catch (error) {
            console.log(error);
        }
    }
    return{ setListActivity,getListActivity,verifyCSVIntegrity,calculeAppreciation}
};

export default ActivityService;
