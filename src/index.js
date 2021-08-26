import React from 'react';
import ReactDOM from 'react-dom';
import {
  Provider, createClient, subscriptionExchange, defaultExchanges,
} from 'urql';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import App from './App';
import * as serviceWorker from './serviceWorker';

const subscriptionClient = new SubscriptionClient('ws://react.eogresources.com/graphql', { reconnect: true });

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
  exchanges: [...defaultExchanges, subscriptionExchange({
    forwardSubscription: operation => subscriptionClient.request(operation),
  })],
});

ReactDOM.render(
  <Provider value={client}>
    <App />
  </Provider>, document.getElementById('root'),
);

serviceWorker.unregister();
