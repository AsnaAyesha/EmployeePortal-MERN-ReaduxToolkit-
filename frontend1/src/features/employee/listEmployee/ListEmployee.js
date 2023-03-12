import { useEffect } from "react";
import { Table, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import './listEmployee.css'
import { addEmployee, deleteEmployee } from "../EmployeeSlice";

const ListEmployee = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const employees = useSelector((state) => state.counter.employees)

    useEffect(() => {
        console.log(employees.length)
        // if(employees.length === 0) {
        axios.get('http://localhost:7000/api/employee').then((response) => {
            console.log(response.data)
            // if(employees.length !== 0) 
            dispatch(addEmployee(response.data))
        }).catch((error) => {
            alert(error)
        })
    }, [])

    const handleEdit = (_id) => {

        navigate(`/listemployee/${_id}`)
    }
   
    const handleDelete = async (_id) => {
        console.log('deleted employee')

        await axios.delete(`http://localhost:7000/api/employee/${_id}`).then((response) => {
            alert("Deleted Successfully", response)
            dispatch(deleteEmployee(_id))
            navigate('/listemployee')
        })
       
    }

    return (
        <Container >

            {console.log('employee list')}
            <div >
                <h3 className="EmployeeListTitle">Employee List</h3>
                <Link to="/addemployee" className="AddEmployeeLink"><Button>Add Employee</Button></Link>
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th>Employee Id</th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees ? employees.map((employee,index) => {
                            { console.log('table list', employee) }
                            return (
                                <tr key={index}>
                                    <td>{employee._id}</td>
                                    <td>{employee.name}</td>
                                    <td>{employee.username}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.phone}</td>
                                    <td>

                                        <Button onClick={() => handleEdit(employee._id)}>Edit</Button>

                                        <Button onClick={() => handleDelete(employee._id)}>Delete</Button>
                                    </td>
                                </tr>
                            )
                        }) : null}

                    </tbody>
                </Table>
            </div>
        </Container>
    )
}

export default ListEmployee
