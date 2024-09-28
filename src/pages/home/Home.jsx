import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  DataTable,
  LimitInput,
  Pagination,
  SearchBox,
  Spinner,
} from "../../components";
import { getUserData } from "../../api/api";
import "./home.styles.css";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const searchInputRef = useRef(null);
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const rowsPerPage = 3;

  // State for fetch limit and warnings
  const [fetchLimit, setFetchLimit] = useState(5);
  const [inputWarning, setInputWarning] = useState("");

  // Handle search query
  useEffect(() => {
    const filtered = userData?.filter(({ name, country }) => {
      const combinedFields = [name, country].join(" ").toLowerCase();
      return combinedFields.includes(searchQuery.toLowerCase());
    });
    setFilteredData(filtered);
    setPage(0); // Reset to first page when search is triggered
  }, [searchQuery, userData]);

  // Get paginated data
  const paginatedData = useMemo(() => {
    return filteredData?.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [filteredData, page]);

  // Pagination handlers
  const handleNextPage = () => {
    if ((page + 1) * rowsPerPage < filteredData?.length) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  // Handle input change for fetch limit
  const handleLimitChange = (e) => {
    const value = Number(e.target.value);
    if (value > 10) {
      setInputWarning("You can only fetch up to 10 items.");
    } else {
      setInputWarning("");
      setFetchLimit(value);
    }
  };

  // Fetch data
  const fetchUserData = async () => {
    setLoading(true);
    try {
      const res = await getUserData(fetchLimit); // Pass limit to the API
      setUserData(res?.data?.data);
      setFilteredData(res?.data?.data);
    } catch (error) {
      console.log("Error while fetching the user data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [fetchLimit]); // Re-fetch when fetchLimit changes

  return (
    <div className="container">
      <SearchBox
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchInputRef={searchInputRef}
      />
      <LimitInput
        fetchLimit={fetchLimit}
        handleLimitChange={handleLimitChange}
        inputWarning={inputWarning}
      />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <DataTable
            paginatedData={paginatedData}
            page={page}
            rowsPerPage={rowsPerPage}
          />
          <Pagination
            page={page}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
            filteredData={filteredData}
            rowsPerPage={rowsPerPage}
          />
        </>
      )}
    </div>
  );
};

export default Home;
