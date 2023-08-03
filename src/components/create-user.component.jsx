import { useState } from 'react';
import axios from 'axios'

function CreateUser() {
    const [name, setName] = useState("")

    const submitHandler = async (e) => {
        e.preventDefault();
        
        const user = {
            username: name
        }
        try {
            await axios.post('http://localhost:5000/users/add', user)
        } catch(err) {
            console.err(err)
        }
        setName("")
    }

    return (
        <div>
            <h3>Create New User</h3>
            <form onSubmit={submitHandler}>
                <div className='form-group'>
                    <label>Name</label>
                    <input 
                    type ="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}>
                    </ input>
                </div>
                <div className='form-group'>
                    <input type="submit" value="Create User" className='btn btn-primary'/>
                </div>
            </form>
        </div>
    )
}

export default CreateUser;