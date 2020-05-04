/*
 * FeaturePage
 *
 * List all the features
 */
import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Table } from 'react-bootstrap';

import { compose } from 'redux';
import { connect } from 'react-redux';

import injectRedux from 'utils/injectReducer';

import reducer from '../FeaturePage/reducer';

const key = 'stockPrice';
const withRedux = injectRedux({ key, reducer });

export function MyListPage(props) {
  // const [symbol, setSymbol] = useState('');
  const { myList } = props;

  return (
    <div>
      <Helmet>
        <title>My List Page</title>
        <meta name="description" content="Recently search stocks" />
      </Helmet>
      <div className="row">
        <div className="col-md-12">
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Symbol</th>
                <th>Max High</th>
                <th>Max Volume</th>
              </tr>
            </thead>
            <tbody>
              {myList.map((row, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{row.symbol}</td>
                  <td> {row.maxHigh}</td>
                  <td> {row.maxVolume}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export function mapStateToProps({ prices }) {
  return {
    ...prices,
  };
}

export function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRedux,
  memo,
)(MyListPage);
