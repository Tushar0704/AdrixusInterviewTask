import React from 'react';

const UserDetails = ({ users }) => {
    
    return( 
        <ul className="list-group mb-4">
            {
                users.map(user => (
                    <li key={user.userid} className="list-group-item">
                        <span><b>Full Name: </b>{user.firstname} {user.lastname}</span>
                        <br></br>
                        <span><b>Age: </b>{user.age}</span>
                        <br></br>
                        <span><b>Email: </b>{user.email}</span>
                    </li>
                ))
            }
        </ul>
    )
}

export default UserDetails;