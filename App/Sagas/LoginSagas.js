import { Alert } from 'react-native'
/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the Infinite Red Slack channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import AuthActions from '../Redux/AuthRedux'
import { NavigationAction } from 'react-navigation';
// import { LoginSelectors } from '../Redux/LoginRedux'

export function * getLogin (api, action) {
 
  const { data } = action
  // get current data from Store
  // const currentData = yield select(LoginSelectors.getData)
  // make the call to the api
  const response = yield call(api.getlogin, data)
  const Auth = yield call(api.getAuth, response.data.data.authorization_code)
  // success?
  if (Auth.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(LoginActions.loginSuccess(Auth.data))
    yield put (AuthActions.authSuccess(Auth.data))
    // Alert.alert('Berhasil')
  } else {
    yield put(LoginActions.loginFailure())
    Alert.alert('Whooopss , Failed Login', 'your email or password incorrect')
  }
}
