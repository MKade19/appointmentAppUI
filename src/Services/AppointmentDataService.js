import axios from "../axios/axios"

class AppointmentDataService {
    getChunk = async (page, page_count) => {
        return await axios.get(`appointments/?page=${page}&page_count=${page_count}`);
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
        this.refreshWS();
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
        this.refreshWS();
        return await axios.put(`appointments/${appointment.id}/`, body);
    }

    deleteById = async id => {
        this.refreshWS();        
        return await axios.delete(`appointments/${id}/`);
    }

    refreshWS = async () => {
        let ws = new WebSocket('ws://127.0.0.1:8000/ws/test/');
        ws.onopen = function(e) {
            ws.send("updated");
        }
        ws.onclose = () => console.log('ws closed');
        if (ws.readyState === 1) { // <-- This is important
            ws.close();
        }
    }
}

const appointmentDataService = new AppointmentDataService();

export default appointmentDataService;