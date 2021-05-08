import React, {useState, useEffect } from 'react';
import Navbar from './Navbar';
import NavbarScreen from './NavbarScreen';  
import UserDetails from './UserDetails';
import Pagination from './Pagination';
import axios from 'axios';

const PrivateScreen = ({ history }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);
    const [error, setError] = useState("");

    useEffect(() => {
        if(!localStorage.getItem("authToken")){
            history.push('/login');
        }

        const fetchPrivateData = async () => {
            const config = {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
            };

            try {
                setLoading(true);
                const {data} = await axios.get("/api/private", config);
                setUsers(data.data);
            } catch (error) {
                localStorage.removeItem("authToken");
                setError("You are not authorized please login");
            }
            setLoading(false);
        };

        fetchPrivateData();
    }, [history]);


    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber); 

    if(loading){
        return(
            <span>Loading</span>
        )
    }

    return(
        error ? (
            <span className="error-message">{error}</span>
        ) :( 
            <>
                <div className='container mt-5'>
                    <NavbarScreen/>
                    <UserDetails users={currentUsers} />
                    <Pagination usersPerPage={usersPerPage} totalUsers={users.length} paginate={paginate}/>
                </div>
            </>
        )
    )
}

export default PrivateScreen;