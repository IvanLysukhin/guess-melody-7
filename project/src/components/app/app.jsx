import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {AppRoute, MAX_MISTAKE_COUNT} from '../../const';
import WelcomeScreen from '../welcome-screen/welcome-screen';
import AuthScreen from '../auth-screen/auth-screen';
import GameOverScreen from '../game-over-screen/game-over-screen';
import WinScreen from '../win-screen/win-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import GameScreen from '../game-screen/game-screen';
import LoadingScreen from '../loading-screen/loading-screen';
import {isCheckedAuth} from '../../game';

function App(props) {
  const {authorizationStatus, isDataLoaded} = props;

  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <WelcomeScreen
            errorsCount={MAX_MISTAKE_COUNT}
          />
        </Route>
        <Route exact path={AppRoute.LOGIN}>
          <AuthScreen />
        </Route>
        <Route exact path={AppRoute.RESULT}>
          <WinScreen />
        </Route>
        <Route exact path={AppRoute.LOSE}>
          <GameOverScreen />
        </Route>
        <Route exact path={AppRoute.GAME}>
          <GameScreen
            errorsCount={MAX_MISTAKE_COUNT}
          />
        </Route>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

App.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  isDataLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus,
  isDataLoaded: state.isDataLoaded,
});

export {App};
export default connect(mapStateToProps, null)(App);
