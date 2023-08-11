import { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker'
import axios from 'axios'
import "react-datepicker/dist/react-datepicker.css";

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
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:5000/users/')
                if (response.data.length > 0) {
                    setProperties({
                        users: response.data.map(user => user.username),
                        name: response.data[0].username
                    })
                }
            } catch (error) {
                console.error(error)
            }
            
        }
        
        fetchData();
    }, [])

    async function onSubmit(e) {
        e.preventDefault();

        const exercise = {
            username: properties.name,
            description: properties.description,
            duration: properties.duration,
            date: properties.date
        }

        try {
            await axios.post('http://localhost:5000/exercises/add', exercise)
            window.location = '/'
        } catch(error) {
            console.error("Error creating exercise:", error)
        }

        
    }



    return (
        <div>
            <h3>Create New Exercise Log</h3>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label>Username: </label>
                    <select ref={refContainer}
                        required
                        className='form-control'
                        value={properties.name}
                        onChange={(e) => setProperties({ ...properties,
                            name: e.target.value })}>{
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
                        onChange={(e) => setProperties({ ...properties,
                        description: e.target.value })} />
                </div>
                <div className='form-group'>
                    <label htmlFor="">Duration (in minutes): </label>
                    <input type="text"
                        className='form-control'
                        value={properties.duration}
                        onChange={(e) => setProperties({ ...properties,
                        duration: e.target.value })} />
                </div>
                <div className='form-group'>
                    <label>Date: </label>
                    <DatePicker
                        selected={properties.date}
                        onChange={(newDate) => setProperties({ ...properties, date: newDate })} />
                </div>
                <div className='form-group'>
                    <input type="submit" value="Create Exercise Log" className='btn btn-primary' />
                </div>
            </form>
        </div>
    )
}

export default CreateExercise;