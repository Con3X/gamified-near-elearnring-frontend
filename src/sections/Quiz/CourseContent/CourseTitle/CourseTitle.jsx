import treeIcon from "assets/images/icons/tree.png";


export default function CourseTitle({courseLogo, lessonNumber, points}) {
  return (
    <div>
      <div className="title">
                <div className="title-content">
                  <div>
                    <img src={treeIcon} alt="" width={30} height={30} /> {points}
                  </div>
                  <div className="title-right">
                    <img src={courseLogo} alt="" width={35} height={30} />
                    <div className="lesson-number">
                      <div>Lesson</div>
                      <div>#{lessonNumber}</div>
                    </div>
                  </div>
                </div>
              </div>
    </div>
  )
}
