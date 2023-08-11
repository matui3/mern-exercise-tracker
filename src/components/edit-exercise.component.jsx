import { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

function EditExercises() {

    const refContainer = useRef("")

    const [properties, setProperties] = useState({
        name: "",
        description: "",
        duration: 0,
        date: new Date(),
        users: []
    })

    useEffect(() => {
        axios.get('http://localhost:5000/exercises' + properties.match.params.id).then((res) => {
            setProperties({
                name: res.data.name,
                description: res.data.description,
                duration: res.data.duration,
                date: new Date(res.data.date)
            })
        }).catch((err) => {
            console.log(err)
        })

        axios.get('http://localhost:5000/users/').then((res) => {
            if (res.data.length > 0) {
                setProperties({
                    users: res.data.map(user => user.name),
                })
            }
        }).catch((err) => {
            console.log(err)
        })
    })

    function onSubmit(e) {
        e.preventDefault();

        const exercise = {
            name: properties.name,
            description: properties.description,
            duration: properties.duration,
            date: properties.date
        }

        axios.post('http://localhost:5000/exercises/update' + properties.match.params.id, exercise).then((res) => console.log(res.data));

        window.location = '/'
    }

    return (
        <div>
            <h3>Edit Exercise Log</h3>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label>Username: </label>
                    <select ref={refContainer}
                    required
                    className='form-control'
                    value={properties.name}
                    onChange={(e) => setProperties({name: e.target.value})}>{
                        properties.users.map((user) => {
                            return <option
                            key={user}
                            value={user}>{user}
                            </option>;
                        })
                    }</select>
                </div>
                <div className='form-group'>
                    <label>Description: </label>
                    <input type="text"
                    required
                    className='form-control'
                    value={properties.description}
                    onChange={(e) => setProperties({description: e.target.value})} />
                </div>
                <div className='form-group'>
                    <label>Duration (in minutes): </label>
                    <input type="text"
                    className='form-control'
                    value={properties.duration}
                    onChange={(e) => setProperties({duration: e.target.value})} />
                </div>
                <div className='form-group'>
                    <label>Date: </label>
                    <div>
                        <DatePicker
                        selected={properties.date}
                        onChange={(date) => setProperties({date: date})} />
                    </div>
                </div>
                <div className='form-group'>
                    <input type="submit"
                    value="Edit Exercise Log"
                    className='btn btn-primary' />
                </div>
            </form>
        </div>
    )
}

export default EditExercises;