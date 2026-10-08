function FilterDropdown({
  label,
  value,
  options,
  onChange,
}) {
  return (
    <div className="filter-container">
      <label htmlFor={label}>
        {label}
      </label>

      <select
        id={label}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterDropdown;