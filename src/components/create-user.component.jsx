import { useState } from 'react';
import { Form, Button, Row, Col} from 'react-bootstrap'

function CreateUser() {
    const [username, setUsername] = useState("")

    const submitHandler = async (e) => {
        e.preventDefault();
        
    }

    return (
        <div>
            <h3>Create New User</h3>
            <form>
                <div className='form-group'>
                    <label>Name</label>
                    <input 
                    type ="name"
                    placeholder="Enter name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}>
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