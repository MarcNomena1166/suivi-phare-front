
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Map from './page/Map';
import Travaux from './page/Travaux';
import TemplateAdmin from './component/TemplateAdmin';
import Login from './page/Login';
import Avancement from './page/Avancement';
import Dashboard from './page/Dashboard';
import { Provider } from 'react-redux';
import { store } from './redux';

function App() {
  return (
  <Provider store={store}>
    <BrowserRouter>
   
                    <Routes>
                        <Route path="/" element={<Login/>}/>
                        <Route path="/TemplateAdmin" element={<TemplateAdmin/>}>
                          <Route path="/TemplateAdmin/Map" element={<Map/>}/>
                          <Route path="/TemplateAdmin/Travaux" element={<Travaux/>}/>
                          <Route path="/TemplateAdmin/Avancement" element={<Avancement/>}/>
                          <Route path="/TemplateAdmin/Dashboard" element={<Dashboard/>}/>
                        </Route> 
                    </Routes>

                  
          

    </BrowserRouter>
    </Provider>
  );
}

export default App;
