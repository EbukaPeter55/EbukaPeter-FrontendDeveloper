import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpaceXData, getCurrentPage } from "../../../redux/capsule";
import DataSpaceX from "./DataSpaceX.component";
import "../../../components/component.styles.scss";

const SearchForm = () => {
  const capsulesPerPage = 10;
  const currentPage = useSelector((state: any) => state.capsule.currentPage);
  const capsules = useSelector((state: any) => state.capsule.capsules);
  const [searchCriteria, setSearchCriteria] = useState({
    status: "",
    type: "",
    serial: "",
  });
  let serialList = capsules.docs?.map((capsule: any) => capsule.serial);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchCriteria({ ...searchCriteria, [name]: value });
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchSpaceXData(capsulesPerPage, currentPage, searchCriteria));
  };

  const handlePageChange = (newPage: number) => {
    dispatch(getCurrentPage(newPage));
  };

  const dispatch: any = useDispatch();
  useEffect(() => {
    dispatch(fetchSpaceXData(capsulesPerPage, currentPage, searchCriteria))
      .then((response: any) => {})
      .catch((error: any) => {});
  }, [dispatch, currentPage, searchCriteria]);

  useEffect(() => {}, [capsules, currentPage]);

  return (
    <section className="w-full">
      <h2 className="text-center font-bold text-3xl">Search Capsules</h2>
      <div className="flex mx-auto md:flex-row md:items-center md:justify-center max-w-[60rem] mt-4">
        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <div className="flex space-x-2 flex-wrap justify-center ">
            <div className="flex-1">
              <select
                name="status"
                value={searchCriteria.status}
                onChange={handleSearchInputChange}
                className="border rounded-l py-2 px-4 appearance-none focus:outline-none focus:ring focus:border-blue-500 w-full"
                data-testid="status-input"
              >
                <option value="">Status</option>
                <option value="active">Active</option>
                <option value="retired">Retired</option>
                <option value="unknown">Unknown</option>
                <option value="destroyed">Destroyed</option>
              </select>
            </div>
            <div className="relative flex-1">
              <select
                name="serial"
                value={searchCriteria.serial}
                onChange={handleSearchInputChange}
                className="border py-2 px-4 appearance-none focus:outline-none focus:ring focus:border-blue-500 w-full"
                data-testid="serial-input"
              >
                <option value="">Serial</option>
                {serialList?.map((serial: any, index: number) => (
                  <option key={index} value={serial}>
                    {serial}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative flex-1">
              <select
                name="type"
                value={searchCriteria.type}
                onChange={handleSearchInputChange}
                className="border py-2 px-4 appearance-none focus:outline-none focus:ring focus:border-blue-500 w-full"
                data-testid="type-input"
              >
                <option value="">Type</option>
                <option value="Dragon 1.0">Dragon 1.0</option>
                <option value="Dragon 1.1">Dragon 1.1</option>
              </select>
            </div>
            <div className="">
              <button
                type="submit"
                data-testid="submit-button"
                className="bg-[#020528] hover:bg-[#005288] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>

      <DataSpaceX
        capsules={capsules}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        setSearchCriteria={setSearchCriteria}
        searchCriteria={searchCriteria}
      />
    </section>
  );
};

export default SearchForm;
