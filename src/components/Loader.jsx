function Loader({ message = "Loading..." }) {
  return (
    <div className="loading-container">
      <div
        className="loading-spinner"
        aria-label="Loading"
      ></div>

      <p>{message}</p>
    </div>
  );
}

export default Loader;