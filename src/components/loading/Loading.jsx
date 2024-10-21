import LoadingtStyleWrapper from "./Loading.style";

export default function Loading() {
  return (
    <LoadingtStyleWrapper>
      <div className="loading-overlay">
        <div className="loading-spinner" />
      </div>
    </LoadingtStyleWrapper>
  );
}
