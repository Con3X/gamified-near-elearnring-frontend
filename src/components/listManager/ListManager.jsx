import React, { useEffect, useState } from "react";
import Rearrange from "components/rearrange/Rearrange.jsx";
import QATypeListStyleWrapper from "./ListManager.style.js";
import Button from "components/button";
import { moveUp, moveDown } from "./index.js";
import { updateOrderLesson } from "apiService";
import Swal from "sweetalert2";

const ListManager = ({
  initialData,
  onChange,
  mainField,
  href,
  idField,
  arrangeFild,
}) => {
  const [data, setData] = useState(initialData);
  const extractTextFromHTML = (htmlString) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  useEffect(() => {
    const sortedData = [...initialData].sort((a, b) => a[arrangeFild] - b[arrangeFild]);
    setData(sortedData);
  }, [initialData, arrangeFild]);

  /**
   * send data lesson to backend and create
   */

  const handleSubmit = async (data) => {
    //e.preventDefault();
    const orders = data.map((item) => ({
      id: item.id,
      order: item.order,
    }));

    const courseId = initialData[0]?.course.id;
    try {
      const create = await updateOrderLesson({ orders }, courseId);
      if (create) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Item order updated successfully.",
        });
      }
    } catch (error) {
      console.error("Error in creating Lesson:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an error update Item order .",
      });
    }
  };

  return (
    <QATypeListStyleWrapper>
      <div className="ranking_list">
        {data?.map((da, i) => (
          <ul key={i} className="ranking_list_item">
            <li data-title="Arrange"> {da[arrangeFild]} </li>
            <li data-title={mainField}>
              <div className="des"
                dangerouslySetInnerHTML={{
                  __html: extractTextFromHTML(da[mainField]),
                }}
              />
            </li>
            <li data-title="Rearrange">
              <Rearrange
                onClickUp={() =>
                  moveUp(i, data, setData, onChange, handleSubmit)
                }
                onClickDown={() =>
                  moveDown(i, data, setData, onChange, handleSubmit)
                }
              />
            </li>
            <li data-title="">
              <Button variant="mint" sm href={`${href}/${da[idField]}`}>
                Edit
              </Button>
            </li>
          </ul>
        ))}
      </div>
    </QATypeListStyleWrapper>
  );
};

export default ListManager;
