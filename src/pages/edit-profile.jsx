import { Fragment } from "react";
import Layout from "components/layout";
import GlobalStyles from "assets/styles/GlobalStyles";
import Header from "sections/Header/v2";
import PageHeader from "components/PageHeader/PageHeader";
import EditProfileDetails from "sections/Profile/EditProfile/EditProfileDetails.jsx";

export default function EditProfilePage() {
  return (
    <Fragment>
      <Layout>
        <GlobalStyles />
        <Header />
        <PageHeader currentPage="Profile" pageTitle="Profile Details" />
        <EditProfileDetails />
      </Layout>
    </Fragment>
  );
}
