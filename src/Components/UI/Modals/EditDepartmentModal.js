import { Modal } from "react-bootstrap";
import EditDepartmentForm from "../Forms/EditDepartmentForm";

const EditDepartmentModal = ({ departmentId, showModal, handleClose, fetchData }) => {
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
                    <Modal.Title>{departmentId ? 'Edit' : 'Create'} department</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditDepartmentForm departmentId={departmentId} handleClose={handleClose} fetchData={ fetchData }/>
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

export default EditDepartmentModal;