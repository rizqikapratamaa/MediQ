import React, { useState, useEffect } from 'react';
import Demo1 from '../Assets/Stunting/Info1.png'
import Demo2 from '../Assets/demo2.jpg'
import Demo3 from '../Assets/demo3.jpg'
import Demo4 from '../Assets/demo4.jpg'
import Arrow from '../Assets/BackArrow.svg'

const Pagination = () =>{
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handlePageChange = (page, event) =>{
    event.preventDefault();
    setCurrentPage(page);
    if (isTransitioning) {
      return;
    }

    event.preventDefault();

    // Set the transition state to true
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentPage(page);

      setIsTransitioning(false);
    }, 1000); 
  }
  
  useEffect(() => {
    const changePage = () => {
      const nextPage = (currentPage + 1) % 4;
      handlePageChange(nextPage, { preventDefault: () => {} });
    };

    const timeChange = setTimeout(changePage, 4000);

    return () => clearTimeout(timeChange);

  }, [currentPage, isTransitioning]);
  
  return(
    <div className='w-max h-max overflow-hidden max-w-screen-lg relative'>
        {/* Image Showing */}
        <div className='w-full sticky top-1/2'>
          <button className='absolute left-3 transform ' onClick={(e) => {handlePageChange((currentPage - 1 + 4) % 4,e)}} disabled={isTransitioning}>
            <img src={Arrow} alt="" className=''/>
          </button>
          <button className='absolute right-5 transform' onClick={(e) => {handlePageChange((currentPage + 1) % 4,e)}} disabled={isTransitioning}>
            <img src={Arrow} alt="" className='rotate-180'/>
          </button>
        </div>
        <div className='flex w-full transition-all duration-1000 ease-in-out' style={{ marginLeft: `-${currentPage * 100}%` }}>
          <img src={Demo1} alt="" className='w-full  '/>
          <img src={Demo2} alt="" className='w-full '/>
          <img src={Demo3} alt="" className='w-full '/>
          <img src={Demo4} alt="" className='w-full '/>
        </div>

        {/* Navigation */}
        <div className="absolute left-1/2 bottom-2 -translate-x-1/2">
        {[0, 1, 2, 3].map((index) => (
          <a
            key={index}
            href={`#slide-${index + 1}`}
            onClick={() => handlePageChange(index)}
            className={`inline-block h-3 w-3 bg-[#dedede] text-[0px] rounded-2xl shadow-md shadow-black m-1 hover:bg-[#666] transition-all duration-500 ${
              currentPage === index ? "bg-[#666]" : ""
            }`}
          >
            {index + 1}
          </a>
        ))}
      </div>
    </div>
  );
}
export default Pagination;
