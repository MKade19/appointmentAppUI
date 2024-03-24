class Employee {
    id = -1;
    fullname = '';
    email = '';
    phone = '';
    address = '';
    department = -1;
    
    constructor(id, fullname, email, phone, address, department) {
        this.id = id;
        this.fullname = fullname;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.department = department;
    }
}

export default Employee;