import axios from 'axios';
const LocalisationService = () => {

    const getLocalisationFromActivity=async(localisation)=>{
        try {
            const response=await axios({
                method: 'get',
                url: 'http://localhost:5000/api/localisation/liste',
                headers: { }, 
              });
            
              return response.data;
        } catch (error) {
            console.log(error);
        }
    }
    return {getLocalisationFromActivity}
};

export default LocalisationService;