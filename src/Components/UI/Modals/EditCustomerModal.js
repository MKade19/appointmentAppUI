import { Modal } from "react-bootstrap";
import EditCustomerForm from "../Forms/EditCustomerForm";

const EditCustomerModal = ({ customerId, showModal, handleClose, fetchData }) => {
    return (
        <div>
            <Modal
                show={showModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header>
                    <Modal.Title>{customerId ? 'Edit' : 'Create'} customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditCustomerForm customerId={customerId} handleClose={handleClose} fetchData={ fetchData }/>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-danger" onClick={handleClose}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default EditCustomerModal;