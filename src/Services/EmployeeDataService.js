import axios from "../axios/axios"

class EmployeeDataService {
    getAll = async () => {
        return await axios.get('users');
    }

    getById = async id => {
        return await axios.get(`users/${id}/`);
    }

    createOne = async employee => {
        const body = {
            fullname: employee.fullname,
            email: employee.email,
            phone: employee.phone,
            address: employee.address,
            department: employee.department.id,
            password: employee.password
        }

        return await axios.post('users/', body);
    }

    updateOne = async employee => {
        const body = {
            fullname: employee.fullname,
            email: employee.email,
            phone: employee.phone,
            address: employee.address,
            department: employee.department.id,
        }

        if (employee.password !== '') {
            body.password = employee.password
        }

        return await axios.put(`users/${employee.id}/`, body);
    }

    deleteById = async id => {
        return await axios.delete(`users/${id}/`);
    }
}

const employeeDataService = new EmployeeDataService();

export default employeeDataService;