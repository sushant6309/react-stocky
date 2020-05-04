/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import MyListPage from 'containers/MyListPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import './index.css';

import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <div>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Header />
      <div className="container main-cont">
        <Switch>
          <Route exact path="/" component={FeaturePage} />
          <Route path="/my-list" component={MyListPage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </div>
      <Footer />
      <GlobalStyle />
    </div>
  );
}
