import { Fragment } from "react";
import GlobalStyles from "assets/styles/GlobalStyles";
import Layout from "components/layout";
import Header from "sections/Header/v2";
import PageHeader from "sections/TeamDetails/PageHeader";
import EditQA from "sections/QA/EditQA";
import { useParams } from "react-router-dom";

export default function EditQaPage() {
  const { courseId, lessonId, qaId } = useParams();
  return (
    <Fragment>
      <Layout>
        <GlobalStyles />
        <Header />
        <PageHeader
          currentPage="Add Course Info"
          pageTitle={`${qaId === undefined ? "Add" : "Edit"} Q/A`}
        />
        <EditQA courseId={courseId} lessonId={lessonId} qaId={qaId} />
      </Layout>
    </Fragment>
  );
}
