import { useSearchParams } from "react-router-dom";
import EditDepartmentForm from "../../UI/Forms/EditDepartmentForm/EditDepartmentForm";

const EditDepartmentPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <div>
            <h1>{searchParams.get('id') ? 'Edit' : 'Create'} department</h1>
            <EditDepartmentForm/>
        </div>
    )
}

export default EditDepartmentPage;