import React, { useState, useEffect } from "react";
import { getActivities, createActivity } from "../api";

const Activities = ({ token }) => {
  const [activities, setActivities] = useState([]);
  const [formState, setFormState] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    const fetchActivities = async () => {
      const activitiesFromApi = await getActivities();
      setActivities(activitiesFromApi);
    };

    fetchActivities();
  }, []);

  return (
    <div>
      <h2>Activities</h2>
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          if (formState.name === "" || formState.description === "") {
            alert("Invalid input!");
            return;
          }

          if (
            activities.filter((item) => item.name === formState.name).length !==
            0
          ) {
            alert("Activity name already exists!");
            return;
          } else {
            const result = await createActivity(token, formState);
            setActivities([...activities, result]);
          }
        }}
      >
        <input
          type="text"
          placeholder="new activity name"
          value={formState.name ?? ""}
          onChange={(event) =>
            setFormState({ ...formState, name: event.target.value })
          }
          required
        ></input>
        <input
          type="text"
          placeholder="description"
          value={formState.description ?? ""}
          onChange={(event) =>
            setFormState({ ...formState, description: event.target.value })
          }
          required
        ></input>
        <button type="submit">Submit</button>
      
      </form>
      
      {activities.map((activity) => {
        return (
          <div key={activity.id}>
            <h2>{activity.id} </h2>
            <h3>{activity.name}</h3>
            <h3>{activity.description}</h3>
            <hr></hr>
          </div>
        );
      })}
    </div>
  );
};

export default Activities;
