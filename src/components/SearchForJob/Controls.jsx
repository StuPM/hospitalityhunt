import React, { useState } from "react";
import { useSelector } from "react-redux";

import { selectJobListings } from "../../features/hospitality/hospitalitySlice";
// import Results from "./Results";

const Controls = () => {
  const JobListings = useSelector(selectJobListings);

  const [userInput, setUserInput] = useState("");
  const [userSelect, setUserSelect] = useState("Type");

  if (!JobListings) {
    return <p>Loading...</p>;
  }

  let filtered = JobListings;
  if (userSelect === "Type") {
    filtered = JobListings.filter((JobListing) => {
      return JobListing.Type.toLowerCase().includes(userInput.toLowerCase());
    });
  } else if (userSelect === "Title") {
    filtered = JobListings.filter((JobListing) => {
      return JobListing.Title.toLowerCase().includes(userInput.toLowerCase());
    });
  } else {
    filtered = JobListings.filter((JobListing) => {
      return JobListing.Postcode.toLowerCase().includes(
        userInput.toLowerCase()
      );
    });
  }

  return (
    <>
      <h1>Search for a job</h1>
      <div className="controlBar">
        <label>
          Search by:
          <select
            onChange={(e) => {
              setUserSelect(e.target.value);
            }}
          >
            <option value="Type">Type</option>
            <option value="Title">Title</option>
            <option value="Postcode">Postcode</option>
          </select>
        </label>
      </div>
      <div className="inputBar">
        <input
          onInput={(e) => {
            setUserInput(e.target.value);
          }}
          type="text"
          placeholder="Search for a job"
        ></input>
      </div>
      <div>
        {filtered.map(
          (job) => {
            const quickViewJob = Object.entries(job);

            return quickViewJob.map((item) => {
              if (
                item[0] === "Email" ||
                item[0] === "Phone" ||
                item[0] === "id" ||
                item[0] === "Description"
              )
                return;
              return (
                <div key={item[0]}>
                  <p>
                    {item[0]}: {item[1]}
                  </p>
                </div>
              );
            });
          }

          // <Results
          //   key={item.ID}
          //   business_name={item.business_name}
          //   location={item.location}
          //   business_type={item.business_type}
          //   position={item.position}
          // />
        )}
      </div>
    </>
  );
};

export default Controls;
