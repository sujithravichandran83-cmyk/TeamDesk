function Toast({ message, type = "success", onClose }) {
  if (!message) {
    return null;
  }

  return (
    <div
      role="alert"
      style={{
        padding: "10px 15px",
        marginBottom: "15px",
        border: "1px solid green",
        borderRadius: "5px",
        backgroundColor: "#e8f5e9",
        color: "green",
      }}
    >
      <span>
        {type === "success" ? "Success: " : ""}
        {message}
      </span>

      <button
        type="button"
        onClick={onClose}
        style={{
          marginLeft: "15px",
          cursor: "pointer",
        }}
      >
        OK
      </button>
    </div>
  );
}

export default Toast;