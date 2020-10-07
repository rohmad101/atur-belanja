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
import CreateOrderActions from '../Redux/CreateOrderRedux'
import  PaymentRedux  from '../Redux/PaymentRedux'
import  AddressRedux  from '../Redux/AddressRedux'
import  LogisticRedux  from '../Redux/LogisticRedux'

export function * getCreateOrder (api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(CreateOrderSelectors.getData)
  // make the call to the api
  const response = yield call(api.createOrder, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(CreateOrderActions.createOrderSuccess(response.data))
  } else {
    yield put(CreateOrderActions.createOrderFailure())
  }
}

export function * getAddress(api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(CreateOrderSelectors.getData)
  // make the call to the api
  const response = yield call(api.getaddressuser, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(AddressRedux.addressSuccess(response.data))
  } else {
    yield put(AddressRedux.addressFailure())
  }
}
export function * getPayment (api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(CreateOrderSelectors.getData)
  // make the call to the api
  const response = yield call(api.getpayment, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(PaymentRedux.paymentSuccess(response.data))
  } else {
    yield put(PaymentRedux.paymentFailure())
  }
}
export function * getLogistic(api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(CreateOrderSelectors.getData)
  // make the call to the api
  const response = yield call(api.getlistlogistic, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(LogisticRedux.logisticSuccess(response.data))
  } else {
    yield put(LogisticRedux.logisticFailure())
  }
}