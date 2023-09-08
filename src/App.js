import AllRoutes from "./route/AllRoutes";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
        <ToastContainer/>
      <header className="App-header">
        <AllRoutes />
      </header>
    </div>
  );
}

export default App;
