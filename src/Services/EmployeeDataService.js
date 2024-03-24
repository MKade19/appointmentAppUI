import axios from "../axios/axios"

class EmployeeDataService {
    getAll = async () => {
        return await axios.get('employees');
    }

    getById = async id => {
        return await axios.get(`employees/${id}/`);
    }

    createOne = async employee => {
        console.log(employee);
        const body = {
            fullname: employee.fullname,
            email: employee.email,
            phone: employee.phone,
            address: employee.address,
            department: employee.department.id
        }

        return await axios.post('employees/', body);
    }

    updateOne = async employee => {
        console.log(employee);
        const body = {
            fullname: employee.fullname,
            email: employee.email,
            phone: employee.phone,
            address: employee.address,
            department: employee.department.id
        }

        return await axios.put(`employees/${employee.id}/`, body);
    }

    deleteById = async id => {
        return await axios.delete(`employees/${id}/`);
    }
}

const employeeDataService = new EmployeeDataService();

export default employeeDataService;