import axios from "../axios/axios"

class AppointmentDataService {
    getAll = async () => {
        return await axios.get('appointments');
    }

    getById = async id => {
        return await axios.get(`appointments/${id}/`);
    }

    createOne = async appointment => {
        const body = {
            date: appointment.date,
            start: appointment.start,
            end: appointment.end,
            employee: appointment.employee.id,
            customer: appointment.customer.id,
        }

        return await axios.post('appointments/', body);
    }

    updateOne = async appointment => {
        const body = {
            date: appointment.date,
            start: appointment.start,
            end: appointment.end,
            employee: appointment.employee.id,
            customer: appointment.customer.id,
        }

        return await axios.put(`appointments/${appointment.id}/`, body);
    }

    deleteById = async id => {
        return await axios.delete(`appointments/${id}/`);
    }
}

const appointmentDataService = new AppointmentDataService();

export default appointmentDataService;