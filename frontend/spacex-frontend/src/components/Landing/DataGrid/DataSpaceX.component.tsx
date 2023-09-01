import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../../components/component.styles.scss";
import { fetchSpaceXData } from "../../../redux/capsule";
import { CAPSULES } from "./data";

const DataSpaceX = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const capsulesPerPage = 5; 
  const [currentPage, setCurrentPage] = useState(1);
  const capsules = useSelector((state: any) => state.capsule.capsules);
  const loading = useSelector((state: any) => state.capsule.loading);
  const dispatch:any = useDispatch();

  useEffect(() => {
    // Dispatch the fetchSpaceXData thunk when the component mounts
    dispatch(fetchSpaceXData());
  }, [dispatch]);

  useEffect(() => {
    console.log('capsule data', capsules);
  }, [capsules]);

  // Calculate the indices for the current page
  const startIndex = (currentPage - 1) * capsulesPerPage;
  const endIndex = startIndex + capsulesPerPage;

  // const capsules: any[] = CAPSULES[0].slice(startIndex, endIndex);
  // console.log("capsules", capsules);

  // Calculate the total number of pages
  const totalPages = Math.ceil(CAPSULES[0].length / capsulesPerPage);

   // Function to generate an array of page numbers
   const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };


  const handleOpenModal = () =>{
    setOpenModal(true);
  }

  return (
    <section className="spacex-container">
         {openModal ? (
        <>
          <div className="deletemodaloverlay"></div>
          <div id="customModal" className="deleteModal">
            <h6 className="">Are you sure you want to delete signatory?</h6>
            <div className="deleteModal__buttonwrapper tw-flex tw-justify-center tw-gap-2">
              <button
                className="deleteModal__buttonwrapper--cancelbutton"
                id="cancelDelete"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </button>
              <button
                className="deleteModal__buttonwrapper--okbutton"
                id="confirmDelete"
              >
             Yes
              </button>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      <div className="spacexdata-wrapper">

      {loading ? ( // Conditionally render the loading spinner
        <div className="spacexdata-wrapper__loadingspinnger">
          {/* You can replace this with your loading spinner component */}
         <p> Loading... </p>
        </div>
      ) : (
        // Render your data when it's not loading
        Array.isArray(capsules) && capsules.map((capsule: any, index: number) => (
          <div key={index} className="spacexdata-wrapper__card"
          onClick={handleOpenModal}>
            <div className="spacexdata-content">
                <div className="spacexdata-content__status">
                    <div className={ capsule.status === 'active' ? 'active-status' 
                : capsule.status === 'unknown' ? 'unkown-satatus' : 'retired-status'}>
                    <h6>{capsule.status}</h6>
                    </div>
                </div>
                <div className="spacexdata-content__body">
                <h3>{capsule.type}</h3>
              <p>{capsule.details}</p>
                </div>
              <div className="spacexdata-content__date">
                <p>2018-04-10</p>
              </div>
            </div>
          </div>
        ))
      )}
        
      </div>
      {/* Pagination Controls */}
    <div className="pagination flex justify-center gap-2 mt-2">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {getPageNumbers().map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            className={currentPage === pageNumber ? 'active' : ''}
          >
            {pageNumber}
          </button>
        ))}
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={endIndex >= CAPSULES[0].length}
      >
        Next
      </button>
    </div>
    </section>
  );
};

export default DataSpaceX;
