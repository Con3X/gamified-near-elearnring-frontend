import { Fragment } from "react";
import Layout from "components/layout";
import GlobalStyles from "assets/styles/GlobalStyles";
import Header from "sections/Header/v2";
import PageHeader from "components/PageHeader/PageHeader";
import PlayersList from "sections/Players/PlayersList/PlayersList";

export default function PlayersPage() {
  return (
    <Fragment>
      <Layout>
        <GlobalStyles />
        <Header />
        <PageHeader currentPage="Players" pageTitle="Neargami Players" />
        <PlayersList />
      </Layout>
    </Fragment>
  );
}
