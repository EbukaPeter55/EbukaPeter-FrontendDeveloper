import React from 'react';

const SearchForm = () => {

    return (
        <section className='w-full'>
        <h2 className='text-center'>Data grid</h2>
        <div className="flex flex-col md:flex-row md:items-center md:justify-center w-full">
            <form action="" className="relative w-full md:w-96">
                <div className="flex space-x-2 w-full">
                    <div className="relative flex-1">
                        <select
                            name=""
                            id=""
                            className="border rounded-l py-2 px-4 appearance-none focus:outline-none focus:ring focus:border-blue-500 w-full"
                        >
                            <option value="">Status</option>
                            <option value="">Active</option>
                            <option value="">Inactive</option>
                        </select>
                    </div>
                    <div className="relative flex-1">
                        <select
                            name=""
                            id=""
                            className="border py-2 px-4 appearance-none focus:outline-none focus:ring focus:border-blue-500 w-full"
                        >
                            <option value="">Original Launch</option>
                            <option value="">2023</option>
                            <option value="">2022</option>
                        </select>
                    </div>
                    <div className="relative flex-1">
                        <select
                            name=""
                            id=""
                            className="border py-2 px-4 appearance-none focus:outline-none focus:ring focus:border-blue-500 w-full"
                        >
                            <option value="">Type</option>
                            <option value="">A</option>
                            <option value="">B</option>
                        </select>
                    </div>
                    <div className="">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800 "
                    >
                        Search
                    </button>
                </div>
                </div>
                
            </form>
        </div>
    </section>
    )
}

export default SearchForm;