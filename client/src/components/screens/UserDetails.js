import React from 'react';

const UserDetails = ({ users, searchTerm }) => {
    
    return( 
        <ul className="list-group mb-4">
            {
                users.filter((user) => {
                    if(searchTerm === ""){
                        return user
                    } else if ( (user.firstname.toLowerCase().includes(searchTerm.toLowerCase())) || (user.lastname.toLowerCase().includes(searchTerm.toLowerCase())) || (user.age.toString().toLowerCase().includes(searchTerm.toLowerCase())) ){
                        return user
                    }
                }).map(user => (
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