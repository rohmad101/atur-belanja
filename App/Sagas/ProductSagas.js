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
import ProductActions from '../Redux/ProductRedux'
import CartRedux from '../Redux/CartRedux'
import ListCartRedux from '../Redux/ListCartRedux'
import UpdateCartRedux from '../Redux/UpdateCartRedux'
import DeleteCartRedux from '../Redux/DeleteCartRedux'
import ClearCartRedux from '../Redux/ClearCartRedux'
import reactotron from 'reactotron-react-native'
import { NavigationActions, StackActions } from 'react-navigation'
import { Alert } from 'react-native'
// import { ProductSelectors } from '../Redux/ProductRedux'

export function * getProduct (api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(ProductSelectors.getData)
  // make the call to the api
  const response = yield call(api.getproduct, data)
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(ProductActions.productSuccess(response.data))
  } else {
    if(response.status === 400||response.status === '400'){
      // alert(response.status)
      yield put(ProductActions.productSuccess(response))
    }else { 
      yield put(ProductActions.productFailure(response))
    }
  }
}

export function * getCart (api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(ProductSelectors.getData)
  // make the call to the api
  const response = yield call(api.getcart, data)

  // reactotron.log('data',data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(ListCartRedux.listCartSuccess(response.data))
  } else {
    yield put(ListCartRedux.listCartFailure())
  }
}

export function * getAddCart (api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(ProductSelectors.getData)
  // make the call to the api
  const response = yield call(api.getaddcart, data)

  // reactotron.log('data',data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(CartRedux.cartSuccess(response.data))
    Alert.alert("Add Cart Berhasil","silahkan check barang anda di menu Report")
  } else {
    yield put(CartRedux.cartFailure())
    Alert.alert("Yah , Gagal ... :(","menambahkan item kedalam keranjang gagal , mohon periksa kembali koneksi anda atau dapat hubungi tim developer kami")
  }
}

export function * getUpdateCart (api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(ProductSelectors.getData)
  // make the call to the api
  const response = yield call(api.getupdatecart, data)

  // reactotron.log('data',data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(UpdateCartRedux.updateCartSuccess(response.data))
    Alert.alert("Update Barang Berhasil","Pastikan kembali barang yang anda simpan")
  } else {
    yield put(UpdateCartRedux.updateCartFailure())
  }
}
export function * getDeleteCart (api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(ProductSelectors.getData)
  // make the call to the api
  const response = yield call(api.getdeletecart, data)

  // reactotron.log('data',data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(DeleteCartRedux.deleteCartSuccess(response.data))
    Alert.alert("Hapus Barang Berhasil","silahkan check kembali di menu Report")
  } else {
    yield put(DeleteCartRedux.deleteCartFailure())
  }
}

export function * getClearCart (api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(ProductSelectors.getData)
  // make the call to the api
  const response = yield call(api.clearCart, data)

  // reactotron.log('data',data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    
    Alert.alert("Cart Berhasil di bersihkan","Semua barang yang anda simpan di cart sudah hilang")
    yield put(ClearCartRedux.clearCartSuccess(response.data))
  } else {
    yield put(ClearCartRedux.clearCartFailure())
  }
}