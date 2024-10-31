import { Fragment } from "react";
import Layout from "components/layout";
import GlobalStyles from "assets/styles/GlobalStyles";
import Header from "sections/Header/v2";
import PageHeader from "sections/TeamDetails/PageHeader";
import PrivacyPolicy from "sections/Privacy-Policy";

export default function PrivacyPolicyPage() {
  return (
    <Fragment>
      <Layout>
        <GlobalStyles />
        <Header />
        <PageHeader currentPage="User Privacy Policy" />
        <PrivacyPolicy />
      </Layout>
    </Fragment>
  );
}
