import styled from "styled-components";

const CourseContentWrapper = styled.nav`
.course-content{
    display: flex;
  }

.section-1 {
    width: calc(100vw - 300px);
  }

.section-2 {
   width: 300px;
  }

  
  .content-left {
    height: clac(100vh - 90px);
    padding: 50px 50px 0 50px;
  }

  @media only screen and (max-width: 700px) {
    .course-content{
      flex-direction: column;
    }
      .section-1 {
    width: 100vw;
  }

  .section-2 {
   width: 100vw;
    }

  .qustion-content{
    display: flex;
    flex-direction: column;
    align-items: center;
    }
  .content-left {
    padding: 20px 20px 0 20px;
    }
  }


  .content-right {
  position: relative;
    min-height: 100vh;
    background-color: #212139;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 15%;
    background: radial-gradient(circle, #4a4176 10%, #1e1f35 80%);
  }

  .title {
    display: flex;
    justify-content: center;
    padding: 20px 0;
  }

  .title .title-content {
    height: 50px;
    color: var(--green-color) !important;
    padding: 7px 20px;
    border: 1px solid #68697e;
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 50px;
  }
    
  .lesson-number {
    font-size: 12px;
    font-weight: 600;
    display: flex;
    flex-direction: column;
  }

  .title-right {
    display: flex;
  }

  .title-right img {
    margin-right: 7px;
    border-radius: 3px;
  }

  .progreess {
    margin-bottom: 25px;
  }

  .progreess h6 {
    display: flex;
    justify-content: center;
  }

  .progreess .num {
    color: var(--green-color);
  }

  .answer-option {
    display: inline-block;
    margin: 10px;
    width: 100%;

  .answer-button {
    display: block;
    background-color: #1e1f35;
    color: white;
    padding: 10px 20px;
    text-align: center;
    font-size: 18px;
    text-transform: uppercase;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 5px 5px 0px #0a0618;
    transition: all 0.3s ease-in-out;
    position: relative;
    margin: 0px !important;
  }

  input[type="checkbox"] {
    display: none;
  }

  input[type="checkbox"]:checked + .answer-button {
    background-color: #1e1f35;
    box-shadow: 5px 5px 0px #c7ff00;
  }

    @media only screen and (max-width: 999px) {
    
  }

`;

export default CourseContentWrapper;
