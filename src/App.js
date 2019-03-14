import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Router, Route } from 'react-router-dom';
import { history } from './helpers';
import Collection from './containers/Collection';
import AddCollection from './containers/AddCollection';
import './index.css';

function checkStorage(){
  const storage = localStorage.getItem('collectionList');
  if(storage === null) {
    localStorage.setItem('collectionList', JSON.stringify([]));
  }
}
class AppProcess extends React.Component {
  constructor(props) {
    super(props);
    checkStorage();
  }

  render() {
    return (
      <React.Fragment>
        <Helmet titleTemplate="%s - Nasa Collection" defaultTitle="Nasa Collection">
          <meta name="description" content="A React.js application" />
        </Helmet>
        <div className="content-wrapper">
          <Router history={history}>
            <div>
              <Route exact path="/" component={Collection} />
              <Route path="/addCollection" component={AddCollection} />
            </div>
          </Router>
        </div>
      </React.Fragment>
    );
  }
}

const connectedApp = connect()(AppProcess);
export { connectedApp as AppProcess }; 