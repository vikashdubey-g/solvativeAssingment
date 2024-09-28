const SearchBox = ({ searchQuery, setSearchQuery, searchInputRef }) => {
  return (
    <div style={{ marginBottom: "10px", textAlign: "left" }}>
      <input
        ref={searchInputRef}
        type="text"
        placeholder="Search by place or country..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={(e) =>
          e.key === "Enter" && setSearchQuery(e.currentTarget.value)
        }
        style={{ padding: "5px", width: "300px" }}
      />
    </div>
  );
};

export default SearchBox;
