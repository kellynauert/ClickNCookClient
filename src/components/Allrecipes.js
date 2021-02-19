import React from "react";
import { Table, Button } from "reactstrap";

const AllRecipes = (props) => {
  const workoutMapper = () => {
    return props.workouts.map((workout, index) => {
      return (
        <tr key={index}>
          <th scope="row">{workout.id}</th>
          <td>{workout.result}</td>
          <td>{workout.description}</td>
          <td>{workout.definition}</td>
          {/* <td>{workout.owner_id}</td> */}
          <td>
            <Button
              color="warning"
              onClick={() => {
                props.editUpdateWorkout(workout);
                props.updateOn();
              }}
            >
              Update
            </Button>

          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <h3>Workout History</h3>
      <hr />
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Result</th>
            <th>Description</th>
            <th>Definition</th>
            {/* <th>Owner_id</th> */}
          </tr>
        </thead>
        <tbody>{workoutMapper()}</tbody>
      </Table>
    </>
  );
};

export default AllRecipes;
