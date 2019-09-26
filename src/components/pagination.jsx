import React from "react";

const Pagination = props => {
  const { pageSize, totalItems, currentPage, onPaginate } = props;
  const noOfPages = totalItems / pageSize;
  const pagesArray = [];
  for (let i = 0; i < noOfPages; i++) {
    pagesArray.push(i + 1);
  }

  if (pagesArray.length === 1) return null;
  return (
    <ul className="pagination">
      {pagesArray.map(page => (
        <li
          key={page}
          className={currentPage === page ? "page-item active" : "page-item"}
        >
          <a className="page-link" onClick={() => onPaginate(page)}>
            {page}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
