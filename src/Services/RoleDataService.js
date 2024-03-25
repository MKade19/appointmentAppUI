import axios from "../axios/axios"

class RoleDataService {
    getAll = async () => {
        return await axios.get('roles');
    }

    getById = async id => {
        return await axios.get(`roles/${id}/`);
    }

    createOne = async role => {
        const body = {
            name: role.name,
            description: role.description,
            permission_department: role.permission_department,
            permission_employee: role.permission_employee,
            permission_appointment: role.permission_appointment,
            permission_customer: role.permission_customer
        }

        return await axios.post('roles/', body);
    }

    updateOne = async role => {
        const body = {
            name: role.name,
            description: role.description,
            permission_department: role.permission_department,
            permission_employee: role.permission_employee,
            permission_appointment: role.permission_appointment,
            permission_customer: role.permission_customer
        }

        return await axios.put(`roles/${role.id}/`, body);
    }

    deleteById = async id => {
        return await axios.delete(`roles/${id}/`);
    }
}

const roleDataService = new RoleDataService();

export default roleDataService;