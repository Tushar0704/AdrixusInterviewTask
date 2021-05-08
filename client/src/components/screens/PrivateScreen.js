import axios from 'axios';
import Pagination from './Pagination';
import UserDetails from './UserDetails';
import React, {useState, useEffect } from 'react';  
import { Form, FormControl, Nav, Navbar } from 'react-bootstrap';

const PrivateScreen = ({ history }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState('');

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

    const logoutHandler = () => {
        localStorage.clear();
        localStorage.removeItem("authToken");
        history.push('/login');
    }


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
                    <Navbar bg="light" variant="light" expand="lg" className="mb-5">
                        {/*<Navbar.Brand href="/"> INTERNSHIP-TASK </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="/" > HOME </Nav.Link>
                                <Nav.Link href="/" onClick={logoutHandler} style={{color: "red"}}> LOGOUT </Nav.Link>
                            </Nav>
                            <Form inline>
                                <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={event => {setSearchTerm(event.target.value)}}/>
                            </Form>
                        </Navbar.Collapse>*/}
                        <div className="d-inline-flex justify-content-start">
                            <div>
                                <Navbar.Brand href="/"> INTERNSHIP-TASK </Navbar.Brand>
                            </div>
                            <div className="d-inline-flex justify-content-between">
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <div className="d-inline-flex pl-4">
                                        <Nav className="mr-auto">
                                            <Nav.Link href="/" > HOME </Nav.Link>
                                        </Nav>
                                        <Form inline>
                                            <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={event => {setSearchTerm(event.target.value)}} style={{width:"60vw"}}/>
                                        </Form>
                                    </div>
                                </Navbar.Collapse>
                            </div>
                            <div>
                                    <Nav className="mr-auto">
                                    <Nav.Link href="/" onClick={logoutHandler} style={{color: "red", paddingLeft: "60%"}}> LOGOUT </Nav.Link>
                                </Nav>
                            </div>
                        </div>

                    </Navbar>
                    <UserDetails users={currentUsers} searchTerm={searchTerm} />
                    <Pagination usersPerPage={usersPerPage} totalUsers={users.length} paginate={paginate} currentPage={currentPage}/>
                </div>
            </>
        )
    )
}

export default PrivateScreen;