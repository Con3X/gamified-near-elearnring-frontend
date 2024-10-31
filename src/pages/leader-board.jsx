import { Fragment } from "react";
import GlobalStyles from "assets/styles/GlobalStyles";
import Layout from "components/layout";
import Header from "sections/Header/v2";
import PageHeader from "components/PageHeader/PageHeader";

export default function LeaderBoardPage() {
  return (
    <Fragment>
      <Layout>
        <GlobalStyles />
        <Header />
        <PageHeader currentPage="Leader Board" pageTitle={"Leader Board"} />
        <div
          class="d-flex justify-content-center align-items-center"
          style={{ height: "350px" }}
        >
          <h1>Comming Soon...</h1>
        </div>
      </Layout>
    </Fragment>
  );
}
