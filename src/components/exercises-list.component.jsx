import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'

function ExerciseList() {
    const Exercise = props => {
        <tr>
            <td>{props.exercise.name}</td>
            <td>{props.exercise.description}</td>
            <td>{props.exericse.duration}</td>
            <td>{props.exercise.date.substring(0,10)}</td>
            <td>
                <Link to={"/edit/" + props.exercise._id}>edit</Link> | <a href='#' onClick={() => {props.deleteExercise(props.exercise._id)}}>delete</a>
            </td>
        </tr>
    }
    const [exerciseList, setExerciseList] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/exercises/').then(res => {
            setExerciseList(res.data)
        }).catch((err) => {console.log(err)})
    })

    function deleteExericse(id) {
        axios.delete('http://localhost:5000/exercises/'+id).then(res => console.log(res.data));

        setExerciseList(exerciseList.filter(el => el._id !== id))
    }

    function list() {
        return exerciseList.map(currentExercise => {
            return <Exercise exercise={currentExercise} deleteExercise={deleteExericse} key={currentExercise._id}/>
        })
    }

    return (
        <div>
            <h3>Logged Exercises</h3>
            <table className='table'>
                <thead className='thead-light'>
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actons</th>
                    </tr>
                </thead>
                <tbody>
                    {list}
                </tbody>
            </table>
        </div>
    )
}

export default ExerciseList;