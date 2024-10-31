import "./CustomPopup.css";

export default function CustomPopup({ children, open, closed }) {
  return open ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => closed(false)}>
          x
        </button>
        {children}
      </div>
    </div>
  ) : (
    <></>
  );
}
