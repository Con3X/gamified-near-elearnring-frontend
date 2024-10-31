import { Fragment } from "react";
import Layout from "components/layout";
import GlobalStyles from "assets/styles/GlobalStyles";
import Header from "sections/Header/v2";
import PageHeader from "sections/TeamDetails/PageHeader";
import LegalDisclaimer from "sections/Legal-Disclaimer";

export default function LegalDisclaimerPage() {
  return (
    <Fragment>
      <Layout>
        <GlobalStyles />
        <Header />
        <PageHeader currentPage="Legal Disclaimer"/>
        <LegalDisclaimer />
      </Layout>
    </Fragment>
  );
}
