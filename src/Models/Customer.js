class Customer {
    id = -1;
    fullname = ''; 
    email = '';
    phone = '';
    address = '';
    
    constructor(id, fullname, email, phone, address) {
        this.id = id;
        this.fullname = fullname;
        this.email = email;
        this.phone = phone;
        this.address = address;
    }
}

export default Customer;