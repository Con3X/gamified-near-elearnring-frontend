import { Fragment } from "react";
import Layout from "components/layout";
import GlobalStyles from "assets/styles/GlobalStyles";
import Header from "sections/Header/v2";
import PageHeader from "components/PageHeader/PageHeader";
import ProfileDetails from "sections/Profile/ProfileDetails.jsx";
import { useParams } from "react-router-dom";

export default function ProfilePage() {
  const { playerId } = useParams();
  const pageHeadrName = playerId === undefined ? "Profile" : "Player";

  return (
    <Fragment>
      <Layout>
        <GlobalStyles />
        <Header />
        <PageHeader
          currentPage={pageHeadrName}
          pageTitle={`${pageHeadrName} Details`}
        />
        <ProfileDetails playerId={playerId} />
      </Layout>
    </Fragment>
  );
}
