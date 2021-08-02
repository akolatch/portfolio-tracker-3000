# Portfolio Tracker 3000 API

### To get started run:

###### In `/server`

- copy `.env_sample` as `.env` and fill it out
  - api key need from [alphavantage.co](https://www.alphavantage.co/support/#api-key)
- Run `yarn`

Scripts:

- `yarn build`: Builds the api for production to the `build` folder.
- `yarn start`: Runs the api from the production build.
- `yarn dev`: Runs the api in the development watch mode.
- `yarn test`: Launches the test runner in the interactive watch mode.

###### In `/client`

- if running in dev mode `package.json` set the proxy PORT to the port the server is set to
- if running from build in `client/src/constants/api.ts` set the API url to the url the the server is running on
- Run `yarn`

Scripts:

- `yarn build`: Builds the app for production to the `build` folder.
- `yarn start`: Runs the app from the production build.
  - Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- `yarn dev`: Runs the app in the development watch mode.
- `yarn test`: Launches the test runner in the interactive watch mode.
- `yarn eject`: eject from the create react app

### API paths:

###### GET: `'/portfolio'`

Return:

- Status: `200 OK`
- Data: Array of all portfolios

```javascript
[
  {
    id: 1,
    name: "Aharon's Portfolio",
  },
  {
    id: 2,
    name: "Norms's Portfolio",
  },
];
```

Errors:

| Status | Type           | Message |
| ------ | -------------- | ------- |
| 500    | Internal Error | N/A     |

###### POST: `'/portfolio'`

| Parameter | Type   | In   | Description                     | Required |
| --------- | ------ | ---- | ------------------------------- | -------- |
| Name      | String | body | Name of portfolio to be created | True     |

Return:

- Status: `201 CREATED`

Errors:

| Status | Type           | Message                        |
| ------ | -------------- | ------------------------------ |
| 400    | Bad Request    | `"Portfolio name is required"` |
| 500    | Internal Error | N/A                            |

###### GET: `'/portfolio/:id'`

| Parameter | Type   | In   | Description                                              | Required |
| --------- | ------ | ---- | -------------------------------------------------------- | -------- |
| id        | Number | path | The `id` of the portfolio who's stocks are being fetched | True     |

Return:

- Status: `200 OK`
- Data: Array of all stock tickers in a given portfolio

```javascript
[
  {
    id: 1,
    symbol: 'IBM',
    currentPrice: '140.9600',
    numShares: 30,
    pricePaid: '100.00',
    purchaseDate: '2021-07-31',
  },
  {
    id: 2,
    symbol: 'HAS',
    currentPrice: '99.4400',
    numShares: 15,
    pricePaid: '75.00',
    purchaseDate: '2021-07-31',
  },
];
```

Errors:

| Status | Type           | Message                     |
| ------ | -------------- | --------------------------- |
| 404    | Not Found      | `"Portfolio appears empty"` |
| 500    | Internal Error | N/A                         |

###### POST: `'/portfolio/:id'`

| Parameter    | Type   | In   | Description                                            | Required |
| ------------ | ------ | ---- | ------------------------------------------------------ | -------- |
| id           | Number | path | The `id` of the portfolio where the stock is being add | True     |
| symbol       | String | Body | Symbol of the Stock being added                        | True     |
| numShares    | Number | Body | number of shares owned                                 | True     |
| pricePaid    | Number | Body | price paid for single share                            | True     |
| purchaseDate | String | Body | date of purchase formatted `yyyy-mm-dd`                | True     |

Return:

- Status: `201 CREATED` or `202 ACCEPTED`

Errors:

| Status | Type           | Message                                                                |
| ------ | -------------- | ---------------------------------------------------------------------- |
| 400    | Bad Request    | `"One or more attribute of your ticker data was missing or incorrect"` |
| 404    | Not Found      | `"Portfolio not found"`                                                |
| 404    | Not Found      | `"Could not find the ticker you were looking for"`                     |
| 500    | Internal Error | N/A                                                                    |

###### DELETE: `'/portfolio/:id'`

| Parameter | Type   | In   | Description                             | Required |
| --------- | ------ | ---- | --------------------------------------- | -------- |
| id        | Number | path | The `id` of the portfolio to be deleted | True     |

Return:

- Status: `202 ACCEPTED`

Errors:

| Status | Type           | Message |
| ------ | -------------- | ------- |
| 500    | Internal Error | N/A     |

###### PUT: `/ticker/:id`

| Parameter    | Type   | In   | Description                                | Required |
| ------------ | ------ | ---- | ------------------------------------------ | -------- |
| id           | Number | path | The `id` of the stock ticker to be updated | True     |
| numShares    | Number | Body | number of shares owned                     | False    |
| pricePaid    | Number | Body | price paid for single share                | False    |
| purchaseDate | String | Body | date of purchase formatted `yyyy-mm-dd`    | False    |

`*must include at least on update field in body`

Return:

- Status: `204 NO CONTENT`

Errors:

| Status | Type           | Message                             |
| ------ | -------------- | ----------------------------------- |
| 400    | Bad Request    | `"Must include at least on update"` |
| 404    | Not Found      | `"Ticker not found"`                |
| 500    | Internal Error | N/A                                 |

###### DELETE: `'/ticker/:id'`

| Parameter | Type   | In   | Description                                | Required |
| --------- | ------ | ---- | ------------------------------------------ | -------- |
| id        | Number | path | The `id` of the stock ticker to be deleted | True     |

Return:

- Status: `202 ACCEPTED`

Errors:

| Status | Type           | Message |
| ------ | -------------- | ------- |
| 500    | Internal Error | N/A     |
