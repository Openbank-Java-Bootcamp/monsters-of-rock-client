import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { BandList } from "./components/BandList";

function App() {
  return (
    <div className="App">
      <Navbar />
      <BandList />
    </div>
  );
}

export default App;
