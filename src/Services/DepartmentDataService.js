import axios from "../axios/axios"

class DepartmentDataService {
    getAll = async () => {
        return await axios.get('departments');
    }

    getById = async id => {
        return await axios.get(`departments/${id}/`);
    }

    createOne = async department => {
        const body = {
            name: department.name,
            address: department.address
        }

        return await axios.post('departments/', body);
    }

    updateOne = async department => {
        const body = {
            name: department.name,
            address: department.address
        }

        return await axios.put(`departments/${department.id}/`, body);
    }

    deleteById = async id => {
        return await axios.delete(`departments/${id}/`);
    }
}

const departmentDataService = new DepartmentDataService();

export default departmentDataService;