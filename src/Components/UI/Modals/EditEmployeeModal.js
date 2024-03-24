import { Modal } from "react-bootstrap";
import EditEmployeeForm from "../Forms/EditEmployeeForm";

const EditEmployeeModal = ({ employeeId, showModal, handleClose, fetchData }) => {
    return (
        <div>
            <Modal show={showModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered>
                <Modal.Header>
                    <Modal.Title>{employeeId ? 'Edit' : 'Create'} department</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditEmployeeForm employeeId={employeeId} handleClose={handleClose} fetchData={ fetchData }/>
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

export default EditEmployeeModal;