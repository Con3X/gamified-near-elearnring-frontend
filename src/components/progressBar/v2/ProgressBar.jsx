import ProgressBarStyle from "./ProgressBar.style";

const ProgressBar = ({ progress, hight }) => {
  return (
    <ProgressBarStyle className="progressbar_wrapper">
      <div className="progress_bar">
        <span
          className="progress_bar_overlay"
          style={{ width: progress ? progress : "50%", height: hight }}
        ></span>
      </div>
    </ProgressBarStyle>
  );
};

export default ProgressBar;
