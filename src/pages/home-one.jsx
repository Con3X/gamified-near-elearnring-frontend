import { Fragment } from "react";
import GlobalStyles from "assets/styles/GlobalStyles";
import Layout from "components/layout";
import Banner from "sections/Banner/v1";
import Header from "sections/Header/v3";
import Footer from "sections/Footer/v1";

export default function HomeOne() {
  return (
    <Fragment>
      <Layout>
        <GlobalStyles />
        <Header />
        <Banner />
        <Footer />
      </Layout>
    </Fragment>
  );
}
