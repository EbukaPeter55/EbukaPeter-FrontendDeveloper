import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../../components/component.styles.scss";
import {
  fetchSpaceXData,
  fetchSpaceXDataDetails,
  getCurrentPage,
} from "../../../redux/capsule";
import { MockData } from "../../../redux/types/capsules";

interface CapsuleProps {
  capsules: MockData;
  currentPage: number;
  onPageChange: (newPage: number) => void;
  setSearchCriteria: (criterial: any) => void;
  searchCriteria: {
    status: string;
    type: string;
    serial: string;
  };
}

const DataSpaceX: FC<CapsuleProps> = ({
  capsules,
  currentPage,
  onPageChange,
  setSearchCriteria,
  searchCriteria,
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const capsulesPerPage = 10;
  const capsule = useSelector((state: any) => state.capsule.capsule);
  const loading = useSelector((state: any) => state.capsule.loading);
  const dispatch: any = useDispatch();
  let capsuleId = "";
  const handleOpenModal = (capsule_id: string) => {
    capsuleId = capsule_id;
    dispatch(fetchSpaceXDataDetails(capsule_id));
    setOpenModal(true);
  };

  useEffect(() => {}, [capsule]);

  useEffect(() => {}, [capsules]);

  const startIndex = (currentPage - 1) * capsulesPerPage;
  const endIndex = Math.min(
    startIndex + capsulesPerPage,
    capsules?.docs?.length
  );
  const totalPages = capsules?.totalPages;

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const handlePageChange = (pageNumber: number) => {
    onPageChange(pageNumber);
    // Fetch data for the selected page
    dispatch(getCurrentPage(pageNumber));
    dispatch(fetchSpaceXData(capsulesPerPage, pageNumber, searchCriteria));
    setSearchCriteria({
      status: "",
      type: "",
      serial: "",
    });
  };

  return (
    <section className="spacex-container w-full">
      {openModal ? (
        <>
          <div className="deletemodaloverlay"></div>
          <div id="customModal" className="deleteModal">
            <div className="modal-body">
              <h2>{capsule?.serial}</h2>
              <div className="modal-body__wrapper">
                <div className="modal-heading flex flex-row align-center gap-4">
                  <h6>Land landings:</h6>
                  <p>{capsule?.land_landings}</p>
                </div>
                <div className="modal-heading  flex flex-row align-center gap-4">
                  <h6>Reuse count:</h6>
                  <p>{capsule?.reuse_count}</p>
                </div>
                <div className="modal-heading  flex flex-row align-center gap-4">
                  <h6>Water landings:</h6>
                  <p>{capsule?.water_landings}</p>
                </div>
                <div className="modal-update">
                  <h6>Last update</h6>
                  <p>{capsule?.last_update}</p>
                </div>
              </div>
            </div>
            <div className="deleteModal__buttonwrapper tw-flex tw-justify-center tw-gap-2">
              <button
                className="deleteModal__buttonwrapper--cancelbutton"
                id="cancelDelete"
                onClick={() => setOpenModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      <div className="spacexdata-wrapper">
        {loading ? (
          <div className="spacexdata-wrapper__loadingspinnger flex justify-content-center w-full">
            <p>Loading...</p>
          </div>
        ) : !capsules?.docs || capsules?.docs.length < 1 ? (
          <h6 className="text-center">No data found</h6>
        ) : (
          Array.isArray(capsules?.docs) &&
          capsules?.docs.map((capsule: any, index: number) => (
            <div
              key={index}
              className="spacexdata-wrapper__card"
              onClick={() => handleOpenModal(capsule?.id)}
            >
              <div className="spacexdata-content">
                <div className="spacexdata-content__status">
                  <div
                    className={
                      capsule.status === "active"
                        ? "active-status"
                        : capsule.status === "unknown"
                        ? "unknown-status"
                        : "retired-status"
                    }
                  >
                    <h6>{capsule.status}</h6>
                  </div>
                </div>
                <div className="spacexdata-content__cardheader">
                  <h3>{capsule?.type}</h3>
                </div>
                <div className="spacexdata-content__bodytext">
                  <p>{capsule?.last_update}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="pagination flex justify-center gap-2 mt-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {getPageNumbers().map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={currentPage === pageNumber ? "active" : ""}
          >
            {pageNumber}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default DataSpaceX;
