import { useSearchParams } from "react-router-dom";

const PaginationBar = ({ pagesCount, entriesCount }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const currentPage = () => parseInt(searchParams.get('page'));

    const changePage = (page, event) => {
        if (page < 1 || page > Math.ceil(entriesCount / pagesCount)) {
            return;
        }

        setSearchParams(params => {
            params.set("page", page);
            return params;
        });
    }

    const addItems = () => {
        let items = [];

        for (let i = currentPage() - 1; i <= currentPage() + 1; i++) {
            let element;

            if (i > Math.ceil(entriesCount / pagesCount)) {
                break;
            }

            if (i === 0 || i === currentPage() + pagesCount) {
                continue;
            } 
            
            element = <li key={ i } className="page-item">
                        <button onClick={ e => { changePage(i, e) } } className="page-link" href="#">{ i }</button>
                    </li>;

            items.push(element);
        }

        return items;
    }

    return (
        <div className="d-flex justify-content-center">
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item"><button onClick={ e => { changePage(currentPage()-1, e) } } className="page-link" href="#">Previous</button></li>
                    { addItems() }
                    <li className="page-item"><button onClick={ e => { changePage(currentPage()+1, e) } } className="page-link" href="#">Next</button></li>
                </ul>
            </nav>
        </div>
        
    );  
}

export default PaginationBar;