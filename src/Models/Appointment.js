class Appointment {
    id = -1;
    date = new Date();
    start = new Date();
    end = new Date();
    employee = {};
    customer = {};
    
    constructor(id, date, start, end, employee, customer) {
        this.id = id;
        this.date = date;
        this.start = start;
        this.end = end;
        this.employee = employee;
        this.customer = customer;
    }
}

export default Appointment;