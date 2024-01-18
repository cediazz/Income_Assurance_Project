import React from 'react';
import './mypagination.css';
import ReactPaginate from 'react-paginate';
import getCommercialOperations from '../RateControl/getCommercialOperations'

function MyPagination(props) {
    
   

    const handlePageChange = async (event) => {
        props.setLoading(true)
        console.log(event)
        const newActivePage = event.selected + 1;
        console.log(newActivePage)
        let data = await getCommercialOperations(props.date,props.province,newActivePage)
        console.log(data)
        props.setData(data)
        props.setLoading(false)
    };

   

    return (
        <>
            <ReactPaginate
                nextLabel={"siguiente"}
                previousLabel={"anterior"}
                pageCount={props.cantPag}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                onPageChange={handlePageChange}
                containerClassName={"pagination"}
                pageClassName={'page-item'}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                activeClassName={"active"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
            />
        </>
    )

}
export default MyPagination