class Employee {
    id = -1;
    fullname = '';
    email = '';
    phone = '';
    address = '';
    department = -1;
    password = '';
    
    constructor(id, fullname, email, phone, address, department, password) {
        this.id = id;
        this.fullname = fullname;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.department = department;
        this.password = password
    }
}

export default Employee;