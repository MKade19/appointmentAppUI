import axios from "../axios/axios"

class EmployeeDataService {
    getAll = async () => {
        return await axios.get('employees');
    }

    getById = async id => {
        return await axios.get(`employees/${id}/`);
    }

    createOne = async employee => {
        const body = {
            fullname: employee.fullname,
            email: employee.email,
            phone: employee.phone,
            address: employee.address,
            department: employee.department
        }

        return await axios.post('employees/', body);
    }

    updateOne = async employee => {
        const body = {
            fullname: employee.fullname,
            email: employee.email,
            phone: employee.phone,
            address: employee.address,
            department: employee.department
        }

        return await axios.put(`employees/${employee.id}/`, body);
    }

    deleteById = async id => {
        return await axios.delete(`employees/${id}/`);
    }
}

export default new EmployeeDataService();