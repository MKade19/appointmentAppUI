import axios from "../axios/axios"

class CustomerDataService {
    getAll = async () => {
        return await axios.get('customers');
    }

    getById = async id => {
        return await axios.get(`customers/${id}/`);
    }

    createOne = async customer => {
        const body = {
            fullname: customer.fullname,
            email: customer.email,
            phone: customer.phone,
            address: customer.address
        }

        return await axios.post('customers/', body);
    }

    updateOne = async customer => {
        const body = {
            fullname: customer.fullname,
            email: customer.email,
            phone: customer.phone,
            address: customer.address
        }

        return await axios.put(`customers/${customer.id}/`, body);
    }

    deleteById = async id => {
        return await axios.delete(`customers/${id}/`);
    }
}

const customerDataService = new CustomerDataService();

export default customerDataService;