import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation ";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import IsAnon from "./components/IsAnon";
import HomePage from "./Pages/HomePage";
import FestivalDetailsPage from "./Pages/FestivalDetailsPage";

function App() {
  return (
    <div className="App">
      <Navigation />

      <Routes>
        <Route path="/" element={<HomePage />} />
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
          element={<FestivalDetailsPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
