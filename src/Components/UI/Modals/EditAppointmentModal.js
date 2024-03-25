import { Modal } from "react-bootstrap";
import EditAppointmentForm from "../Forms/EditAppointmentForm";

const EditAppointmentModal = ({ appointmentId, showModal, handleClose, fetchData }) => {
    return (
        <div>
            <Modal show={showModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered>
                <Modal.Header>
                    <Modal.Title>{appointmentId ? 'Edit' : 'Create'} appointment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditAppointmentForm appointmentId={appointmentId} handleClose={handleClose} fetchData={ fetchData }/>
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

export default EditAppointmentModal;