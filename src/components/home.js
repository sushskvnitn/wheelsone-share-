import React, { useState, useEffect } from "react";
import Card from "./card";
import ReactPaginate from "react-paginate"  ;
const Per_page = 8;
const Home = () => {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [data5, setData5] = useState([]);
  const [data6, setData6] = useState([]);
  const  [currentPage, setCurrentPage] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [sortedasc, setSorted] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [sorteddesc, setSorteddesc] = useState(false);
  const getData = () => {
    fetch("data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
          setData(myJson);
          setData1(myJson);
          setData2(myJson);
          setData3(myJson);
          setData4(myJson);
          setData5(myJson);
          setData6(myJson);
      });
  };
  useEffect(() => {
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handlepageclick({ selected: selectedPage }) {
    console.log(selectedPage);
    setCurrentPage(selectedPage);
  }
  const offset = currentPage * Per_page;

  const currentPageData = data.slice(offset, offset + Per_page).map((curElem) => {
    return (
      <Card
        count={curElem.rating.count}
              rate={curElem.rating.rate}
              key={curElem.id}
              imgsrc={curElem.image}
              title={curElem.title}
              size = {curElem.size}
              category={curElem.category}
              price={curElem.price}
              description={curElem.description}
      />
    );
  });
  const pageCount = Math.ceil(data.length / Per_page);

  const sortAscending = () => {
    let sortedData = data.sort((a, b) => a["price"] - b["price"]);
    setSorted(true);
    setSorteddesc(false);
    setData(sortedData);
}
const sortDescending = () => {
    let sortedData = data.sort((a, b) => b["price"] - a["price"]);
    setData(sortedData);
    setSorteddesc(true);
    setSorted(false);
}
//function to reset data 
const reset = () => {
    getData();
    setSorted(false);
    setSorteddesc(false);
}
const filterzeroToFifty = () => {
    let sortedData = data3.filter((curElem) => {
        return curElem.price >= 0 && curElem.price <= 50;
    });
    setData(sortedData);
}
const filterFiftytohundred = () => {
    let sortedData = data2.filter((curElem) => {
        return curElem.price > 50 && curElem.price <= 100;
    });
    setData(sortedData);
}
const filterabovehundred = () => {
   
    let sortedData = data1.filter((curElem) => {
        return curElem.price >=100 ;
    });
    setData(sortedData);
}

const Msize = () => {
    let sortedData = data4.filter((curElem) => {
        return curElem.size === "M";
    });
    setData(sortedData);
}
const Lsize = () => {
    let sortedData = data5.filter((curElem) => {
        return curElem.size === "L";
    });
    setData(sortedData);
}
const XLsize = () => {
    let sortedData = data6.filter((curElem) => {
        return curElem.size === "XL";
    });
    setData(sortedData);
}

  return (
    <>
      <div
        style={{ listStyleType: "none" }}
        className="d-flex justify-content-end"
        >
        <li className="nav-item dropdown">
          <div
            className="nav-link dropdown-toggle text-black m-2 "
            style={{ width: "15%" }}
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            sort
          </div>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li>
              <div className=" btn dropdown-item form-text" onClick={sortAscending}>low to high</div>
            </li>
            <li>
              <div className="btn dropdown-item form-text" onClick={sortDescending}>
                High to low
              </div>
            </li>
          </ul>
        </li>

        <li className="nav-item dropdown">
        <div
            className="nav-link dropdown-toggle text-black m-2 "
            style={{ width: "15%" }}
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            filter
          </div>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
             <div className="text-primary px-3"><b>By price</b></div>
            <li><div className="dropdown-item fw-lighter " onClick={reset} >All</div></li>
            <li><div className="dropdown-item fw-lighter " onClick={ ()=>{
              filterzeroToFifty();
              }} >0 - 50 $</div></li>
            <li><div className="dropdown-item fw-lighter" onClick={
              ()=>{
                filterFiftytohundred();
              }
            }>51 - 100 $</div></li>
            <li><div className="dropdown-item fw-lighter" onClick ={
              ()=>{
                filterabovehundred();
              }
            }>above 100 $</div></li>
            <div className="text-primary px-3"><b>By Size</b></div>
            <li><div className="dropdown-item fw-lighter " onClick={Msize} >M</div></li>
            <li><div className="dropdown-item fw-lighter " onClick={Lsize} >L</div></li>
            <li><div className="dropdown-item fw-lighter " onClick={XLsize} >XL</div></li>
          </ul>
        </li>

      </div>
      <div className="d-flex justify-content-center flex-wrap cardbg">
       {
        currentPageData
       }
      
      </div> 
      <div className="d-flex justify-content-center rounded">
      <ReactPaginate
        previousLabel="<-prev"
        nextLabel="next->"
        pageCount={pageCount}
        onPageChange={handlepageclick}
        containerClassName={"paginationBttns shadow p-3 mb-5 rounded w-25"}
        previousLinkClassName={"previousBttn "}
        nextLinkClassName={"nextBttn "}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
        renderOnZeroPageCount={null}
      />
        
      </div>
      
    </>
  );
};

export default Home;
