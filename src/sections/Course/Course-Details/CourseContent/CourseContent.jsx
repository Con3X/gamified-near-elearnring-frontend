import CourseContentStyleWrapper from "./CourseContent.style";

export default function CourseContent({ content }) {
  return (
    <CourseContentStyleWrapper>
      <div className="container main">
        <div
          className={content !== "" ? "content" : ""}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </CourseContentStyleWrapper>
  );
}
