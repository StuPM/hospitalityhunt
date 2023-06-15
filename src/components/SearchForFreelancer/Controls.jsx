import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { selectFreelancers } from "../../features/hospitality/hospitalitySlice";
import gsap from "gsap";
import { calcLonLatDiff, getLongLat } from "../../location/index";
import Result from "../SearchForFreelancer/Result";

const Controls = () => {
  const freelancers = useSelector(selectFreelancers);
  const [freelancersWithDistance, setFreelancersWithDistance] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [userSelect, setUserSelect] = useState("position");
  const [contractButtonSelect, setContractButtonSelect] = useState("all");
  const inputBox = useRef();

  useLayoutEffect(() => {
    gsap.fromTo(
      ".eachResult",
      { y: -1000 },
      { duration: 2, ease: "bounce.out", y: 0 }
    );
  }, []);

  useEffect(() => {
    if (freelancers) inputBox.current.focus();
  }, [freelancers]);

  useEffect(() => {
    if (userSelect !== "postCode") return;

    const postCode = async () => {
      let filtered = JSON.parse(JSON.stringify(freelancers)); //because the store can not be mutated
      //location in long and lat of the current search term
      const { lat, lon } = await getLongLat(userInput);

      //calc the difference between the above and the ones for each result
      filtered.forEach((freelancer) => {
        freelancer.distance = calcLonLatDiff(
          lat,
          lon,
          freelancer.location.lat,
          freelancer.location.lon
        );
      });

      setFreelancersWithDistance(filtered);
    };
    postCode();
  }, [freelancers, userInput, userSelect]);

  if (!freelancers) {
    return <p>Loading...</p>;
  }

  let filtered = [...freelancers];
  if (userSelect === "postCode") {
    //filter the results to only show them if the distance is within the amount
    filtered = freelancersWithDistance.filter((freelancer) => {
      return freelancer.distance && freelancer.distance < 100000;
    });
  } else if (userSelect === "position") {
    filtered = filtered.filter((freelancer) => {
      return freelancer.position.some((item) =>
        item.toLowerCase().includes(userInput.toLowerCase())
      ); // some() loop over the array for each item to check any of them which is contain userInput in lower case
    });
  } else if (userSelect === "skills") {
    filtered = filtered.filter((freelancer) => {
      return freelancer.skills.toLowerCase().includes(userInput.toLowerCase());
    });
  }

  if (contractButtonSelect === "Full-time") {
    filtered = filtered.filter((freelancer) => {
      return freelancer.contract.includes(contractButtonSelect);
    });
  } else if (contractButtonSelect === "Part-time") {
    filtered = filtered.filter((freelancer) => {
      return freelancer.contract.includes(contractButtonSelect);
    });
  } else {
    filtered = filtered.filter((freelancer) => {
      return freelancer;
    });
  }

  return (
    <>
      <h1 className="searchFreelancerTitle">Search for a freelancer</h1>
      <div className="contractBar">
        <button
          className="btn btn-success allButton"
          type="radio"
          id="all"
          name="contract"
          value="all"
          onClick={(e) => setContractButtonSelect(e.target.value)}
        >
          All
        </button>
        <button
          className="btn btn-success fullTimeButton"
          type="radio"
          id="fullTime"
          name="contract"
          value="Full-time"
          onClick={(e) => setContractButtonSelect(e.target.value)}
        >
          Full-time
        </button>
        <button
          className="btn btn-success partTimeButton"
          type="radio"
          id="partTime"
          name="contract"
          value="Part-time"
          onClick={(e) => setContractButtonSelect(e.target.value)}
        >
          Part-time
        </button>
      </div>

      <div className="searchByBar">
        <label>
          Search by:
          <select
            onChange={(e) => {
              setUserSelect(e.target.value);
            }}
          >
            <option value="position">Position</option>
            <option value="skills">Skill</option>
            <option value="postCode">Postcode</option>
          </select>
        </label>
      </div>

      <div className="inputBar">
        <input
          ref={inputBox}
          onInput={(e) => {
            setUserInput(e.target.value);
          }}
          type="text"
          placeholder="Enter something ..."
        ></input>
      </div>

      <Result filtered={filtered} />
    </>
  );
};

export default Controls;
