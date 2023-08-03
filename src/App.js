import React from 'react'
import { ReactDOM } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/navbar.component"
import ExercisesList from "./components/exercisises-list.component";
import EditExercise from "./components/edit.exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Route path="/" exact component={ExercisesList} />
      <Route path="/edit/:id" exact component={EditExercise} />
      <Route path="/create" exact component={CreateExercise} />Z
      <Route path="/user" exact component={CreateUser} />
    </Router>
  );
}

export default App;
