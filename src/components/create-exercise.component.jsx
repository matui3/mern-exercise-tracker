import { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker'
import axios from 'axios'

function CreateExercise() {
    const refContainer = useRef("")

    const [properties, setProperties] = useState({
        name: "",
        description: "",
        duration: 0,
        date: new Date(),
        users: []
    })

    useEffect(() => {
        axios.get('http://localhost:5000/users').then(res => {
            if (res.data.length > 0) {
                setProperties({
                    users: res.data.map(user => user.name),
                    name: res.data[0].name
                })
            }
        }).catch((error) => console.log(error)); 
    })

    
    return(
        <div>
            <h3>Create New Exercise Log</h3>
            <form action="">
                <div className='form-group'>
                    <label>Username: </label>
                    <select ref={refContainer}
                    required
                    className='form-control'
                    value={properties.name}
                    onChange={(e) => setProperties({name: e.target.value})}>{
                        properties.users.map((user) => {
                            return <option key={user}
                            value={user}>{user}</option>
                        })
                    
                    }</select>
                </div>
                <div className='form-group'>
                    <label >Description: </label>
                    <input type="text"
                    required
                    className='form-control'
                    value={properties.description}
                    onChange={(e) => setProperties({description: e.target.value})} />
                </div>
                <div className='form-group'>
                    <label htmlFor="">Duration (in minutes): </label>
                    <input type="text"
                    className='form-control'
                    value={properties.duration}
                    onChange={(e) => setProperties({duration: e.target.value})} />
                </div>
                <div className='form-group'>
                    <label>Date: </label>
                    <DatePicker 
                    selected={properties.date}
                    onChange={(date) => setProperties({date: date})}/>
                </div>
                <div className='form-group'>
                    <input type="submit" value="Create Exercise Log" className='btn btn-primary' />
                </div>
            </form>
        </div>
    )
}

export default CreateExercise;