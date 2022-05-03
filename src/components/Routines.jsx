import React, { useState, useEffect } from "react";
import { getRoutines } from "../api";

const Routines = () => {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    const fetchRoutines = async () => {
      const routinesFromApi = await getRoutines();
      setRoutines(routinesFromApi);
    };

    fetchRoutines();
  }, []);

  return (
    <div>
      <hr></hr>
      {routines.map((routine) => {
        return (
          <div key={routine.id}>
            <h2>Name: {routine.name} </h2>
            <h3>Goal: {routine.goal}</h3>
            <h3>Creator: {routine.creatorName}</h3>
            <hr></hr>
            {routine.activities.map((activity) => {
              return (
                <div key={activity.id}>
                  <h2><i>Activity Name: {activity.name}</i></h2>
                  <h3>Description: {activity.description}</h3>
                  <h3>Duration: {activity.duration}</h3>
                  <h3>Count: {activity.count}</h3>
                </div>
              );
            })}
            <hr></hr>
          </div>
        );
      })}
    </div>
  );
};

export default Routines;
