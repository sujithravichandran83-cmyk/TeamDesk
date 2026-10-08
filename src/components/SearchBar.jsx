function SearchBar({
  value,
  onChange,
  inputRef,
}) {
  return (
    <div className="search-container">
      <label htmlFor="employee-search">
        Search Employees
      </label>

      <input
        ref={inputRef}
        id="employee-search"
        type="search"
        value={value}
        onChange={onChange}
        placeholder="Search by employee name..."
        aria-label="Search employees"
      />
    </div>
  );
}

export default SearchBar;