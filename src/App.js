import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation ";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import IsAnon from "./components/IsAnon";
import HomePage from "./Pages/HomePage";
import FestivalDetailsPage from "./Pages/FestivalDetailsPage";
import AddFestivalPage from "./Pages/AddFestivalPage";
import BandsPage from "./Pages/BandsPage";
import EditFestivalPage from "./Pages/EditFestivalPage";
import AddBandPage from "./Pages/AddBandPage";
import EditBandPage from "./Pages/EditBandPage";
import { BandsDetailsPage } from "./Pages/BandsDetailsPage";
import IsPrivate from "./components/IsPrivate";

function App() {

  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/add-festival"
          element={
            <IsPrivate>
              <AddFestivalPage />
            </IsPrivate>
          }
        />
        <Route
          path="/bands/add"
          element={
            <IsPrivate>
              <AddBandPage />
            </IsPrivate>
          }
        />
        <Route
          path="/festivals/edit/:festivalId"
          element={
            <IsPrivate>
              <EditFestivalPage />
            </IsPrivate>
          }
        />
        <Route
          path="/bands/edit/:bandId"
          element={
            <IsPrivate>
              <EditBandPage />
            </IsPrivate>
          }
        />
        <Route path="/bands" element={<BandsPage />} />
        <Route path="/bands/:bandId" element={<BandsDetailsPage />} />
        <Route
          path="/festivals/:festivalId"
          element={<FestivalDetailsPage />}
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
          element={<FestivalDetailsPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
