const Pagination = ({
  page,
  handleNextPage,
  handlePreviousPage,
  filteredData,
  rowsPerPage,
}) => {
  return (
    filteredData?.length > 0 && (
      <div style={{ marginTop: "10px" }}>
        <button onClick={handlePreviousPage} disabled={page === 0}>
          Previous
        </button>
        <span style={{ margin: "0 10px" }}>Page {page + 1}</span>
        <button
          onClick={handleNextPage}
          disabled={(page + 1) * rowsPerPage >= filteredData?.length}
        >
          Next
        </button>
      </div>
    )
  );
};

export default Pagination;
