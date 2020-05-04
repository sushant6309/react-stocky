/*
 * FeaturePage
 *
 * List all the features
 */
import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Form, Button } from 'react-bootstrap';
import {
  Chart,
  ArgumentAxis,
  LineSeries,
  Title,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { compose } from 'redux';
import { connect } from 'react-redux';

import injectSaga from 'utils/injectSaga';
import injectRedux from 'utils/injectReducer';
import { DAEMON } from 'utils/constants';
import reducer from './reducer';
import saga from './saga';
import { fetchDailyPrice } from './actions';

const key = 'stockPrice';
const withSaga = injectSaga({ key, saga, mode: DAEMON });
const withRedux = injectRedux({ key, reducer });

const confidence = [
  {
    year: '1993-01-01',
    tvNews: 19,
    church: 29,
    military: 32,
  },
  {
    year: '2020-05-01',
    tvNews: 13,
    church: 32,
    military: 33,
  },
];

const format = () => tick => tick;

export function FeaturePage(props) {
  const [symbol, setSymbol] = useState('');
  const { dailyPrice, getDailyStockPrice } = props;

  const symbolChange = event => {
    setSymbol(event.target.value);
  };

  const fetchPrice = () => {
    getDailyStockPrice({ symbol });
  };

  useEffect(() => {
    console.log(confidence);
    console.log(dailyPrice);
    debugger;
  }, [dailyPrice]);

  return (
    <div>
      <Helmet>
        <title>Stock Page</title>
        <meta
          name="description"
          content="Stock price monitering page of Stocky application"
        />
      </Helmet>
      <div className="row">
        <div className="col-md-6">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Stock Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter stock name"
              value={symbol}
              onChange={symbolChange}
            />
            <Form.Text className="text-muted">
              Please enter stock abbrevation to fetch real time price data.
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="button" onClick={fetchPrice}>
            Find Price
          </Button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          {dailyPrice.length > 0 && (
            <Chart data={dailyPrice}>
              <ArgumentAxis tickFormat={format} />
              <ValueAxis max={300} />
              <LineSeries
                name="Daily High Price"
                valueField="high"
                argumentField="date"
              />
              <Title text={`DAILY STOCK PRICE OF ${symbol.toUpperCase()}`} />
              <Animation />
            </Chart>
          )}
        </div>
        <div className="col-md-6">
          {dailyPrice.length > 0 && (
            <Chart data={dailyPrice}>
              <ArgumentAxis tickFormat={format} />
              <ValueAxis />
              <LineSeries
                name="Daily Volume"
                valueField="volume"
                argumentField="date"
              />
              <Title text={`DAILY STOCK VOLUME OF ${symbol.toUpperCase()}`} />
              <Animation />
            </Chart>
          )}
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
  return {
    getDailyStockPrice: payload => dispatch(fetchDailyPrice(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withSaga,
  withRedux,
  memo,
)(FeaturePage);
