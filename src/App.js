import React, { useEffect } from "react";
import Login from "./components/Login";
import AddJob from "./components/AddJob";
import Signup from "./components/Signup";
import CreateBusinessProfile from "./components/CreateBusinessProfile";
import CreateUserProfile from "./components/CreateUserProfile/CreateUserProfile";
import SearchForJob from "./components/SearchForJob";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import {
  selectScreenMode,
  setAllFreelancers,
  setAllJobListings,
} from "./features/hospitality/hospitalitySlice";
import JobDetails from "./components/JobDetails";
import Navigation from "./components/Navigation/Navigation";
import SearchForFreelancer from "./components/SearchForFreelancer";
import FreelancerDetails from "./components/FreelancerDetails";
import Onboarding from "./components/Onboarding";
import Home from "./components/Home";
import Footer from "./components/Footer";
import UserProfile from "./components/UserProfile/UserProfile";
import EmployerJobListing from "./components/EmployerJobListing";
import TestingNav from "./components/TestingNav";
import BusinessProfile from "./components/BusinessProfile/BusinessProfile";
import Online from "./components/Online";
import axios from "axios";
import { apiURL } from "./config";

export default function App() {
  const screenMode = useSelector(selectScreenMode);
  const debugModeOn = false;
  const dispatch = useDispatch();

  useEffect(() => {
    const getInitialData = async () => {
      const { data } = await axios.get(`${apiURL}/getFreelancers`);
      dispatch(setAllFreelancers(data));
    };
    getInitialData();
  }, [dispatch]);

  useEffect(() => {
    const getJobListingsData = async () => {
      const { data } = await axios.get(`${apiURL}/getJobListings`);
      dispatch(setAllJobListings(data));
    };
    getJobListingsData();
  }, [dispatch]);

  return (
    <div>
      <Online />

      {debugModeOn && (
        <button onClick={() => localStorage.clear()}>
          Clear Local Storage
        </button>
      )}

      <Navigation />
      {debugModeOn && <TestingNav />}

      <main>
        {screenMode === 1 && <Signup />}
        {screenMode === 2 && <Login />}
        {screenMode === 3 && <Onboarding />}
        {screenMode === 4 && <CreateUserProfile />}
        {screenMode === 5 && <CreateBusinessProfile />}
        {screenMode === 6 && <AddJob />}
        {screenMode === 7 && <SearchForFreelancer />}
        {screenMode === 8 && <SearchForJob />}
        {screenMode === 9 && <JobDetails />}
        {screenMode === 10 && <FreelancerDetails />}
        {screenMode === 11 && <Home />}
        {screenMode === 12 && <UserProfile />}
        {screenMode === 13 && <EmployerJobListing />}
        {screenMode === 14 && <BusinessProfile />}
      </main>
      <Footer />
    </div>
  );
}
