const LimitInput = ({ fetchLimit, handleLimitChange, inputWarning }) => {
  return (
    <div style={{ textAlign: "right", marginBottom: "10px" }}>
      <label htmlFor="limitInput" style={{ marginRight: "10px" }}>
        Fetch Items:
      </label>
      <input
        id="limitInput"
        type="number"
        value={fetchLimit}
        onChange={handleLimitChange}
        style={{ width: "50px", padding: "5px" }}
      />
      {inputWarning && (
        <p style={{ color: "red", marginTop: "5px" }}>{inputWarning}</p>
      )}
    </div>
  );
};

export default LimitInput;
