import "./table.styles.css";

const DataTable = ({ paginatedData, page, rowsPerPage }) => {
  return (
    <table
      border="1"
      cellPadding="10"
      style={{ borderCollapse: "collapse", width: "100%" }}
    >
      <thead>
        <tr>
          <th>#</th>
          <th>Place Name</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
        {paginatedData?.length > 0 ? (
          paginatedData.map((row, index) => (
            <tr key={row.id}>
              <td>{page * rowsPerPage + index + 1}</td>
              <td>{row.name}</td>
              <td className="country_column">
                {row.country}{" "}
                <img
                  src={`https://flagsapi.com/${row.countryCode}/flat/64.png`}
                  alt={row.country}
                  style={{ marginLeft: "8px" }}
                />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3} style={{ textAlign: "center" }}>
              No results found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default DataTable;
