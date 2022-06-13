import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation ";
import { BandList } from "./components/BandList";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import HomePage from "./Pages/HomePage";
import FestivalDetailsPage from "./Pages/FestivalDetailsPage";

function App() {
  return (
    <div className="App">
      <Navigation />
      {/* <BandList /> */}
      
      <Routes>
      <Route
          path="/"
          element={
          <HomePage />}       
        />
        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
         <Route
          path="/festivals/:festivalId"
          element={
            <IsAnon>
              <FestivalDetailsPage />
            </IsAnon>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
