const Pagination = ({ itemsPerPage, totalProduk, paginate }) => {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalProduk/itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <>
        <nav aria-label="Page navigation example" className="d-flex justify-content-center mt-5">
            <ul className="pagination">
                {pageNumbers.map((number, index) => {
                    return (
                        <li key={index} className="page-item">
                            <button onClick={() => paginate(number)} className="page-link" href="">
                                {number}
                            </button>
                        </li>
                    )
                })}
            </ul>
        </nav> 
        </>
    )
}
export default Pagination;