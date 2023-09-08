import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchSpaceXData } from '../../../redux/capsule';
import DataSpaceX from './DataSpaceX.component';


const SearchForm = () => {
    const capsulesPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const capsules = useSelector((state: any) => state.capsule.capsules);
  const capsule = useSelector((state: any) => state.capsule.capsule);
  const loading = useSelector((state: any) => state.capsule.loading);
  const [searchCriteria, setSearchCriteria] = useState({
    status: "",
    type: "",
    original_launch: "",
  });

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchCriteria({ ...searchCriteria, [name]: value });
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Dispatch the fetchSpaceXData action with the search criteria
    dispatch(fetchSpaceXData(capsulesPerPage, currentPage, searchCriteria));
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };  
  
  const dispatch: any = useDispatch();
  useEffect(() => {
    // Dispatch the fetchSpaceXData thunk when the component mounts
    dispatch(fetchSpaceXData(capsulesPerPage, currentPage, searchCriteria))
    .then((response:any)=>{
        console.log('Response data', response);
    })
    .catch((error:any)=>{
        console.error("error", error);
    })
  }, [dispatch, currentPage, searchCriteria]); // Include currentPage in the dependency array

  useEffect(() => {
    console.log("capsule data", capsules);
  }, [capsules]);

    return (
        <section className='w-full'>
        <h2 className='text-center'>Data grid</h2>
        <div className="flex flex-col md:flex-row md:items-center md:justify-center w-full">
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-96">
          <div className="flex space-x-2 w-full">
            <div className="relative flex-1">
              <select
                name="status"
                value={searchCriteria.status}
                onChange={handleSearchInputChange}
                className="border rounded-l py-2 px-4 appearance-none focus:outline-none focus:ring focus:border-blue-500 w-full"
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
                name="original_launch"
                value={searchCriteria.original_launch}
                onChange={handleSearchInputChange}
                className="border py-2 px-4 appearance-none focus:outline-none focus:ring focus:border-blue-500 w-full"
              >
                <option value="">Original Launch</option>
                <option value="2010-12-08T15:43:00.000Z">2010-12-08T15:43:00.000Z</option>
                <option value="2010-12-08T15:43:00.000Z">2010-12-08T15:43:00.000Z</option>
              </select>
            </div>
            <div className="relative flex-1">
              <select
                name="type"
                value={searchCriteria.type}
                onChange={handleSearchInputChange}
                className="border py-2 px-4 appearance-none focus:outline-none focus:ring focus:border-blue-500 w-full"
              >
                <option value="">Type</option>
                <option value="Dragon 1.0">Dragon 1.0</option>
                <option value="Dragon 1.1">Dragon 1.1</option>
              </select>
            </div>
            <div className="">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
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
        />
    </section>
    )
}

export default SearchForm;