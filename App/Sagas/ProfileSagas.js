import reactotron from 'reactotron-react-native'
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
import ProfileActions from '../Redux/ProfileRedux'
import AddAddressRedux from '../Redux/AddAddressRedux'
import ProviceRedux from '../Redux/ProviceRedux'
import CitiesRedux from '../Redux/CitiesRedux'
import DistrictRedux from '../Redux/DistrictRedux'
import SubDistrictRedux from '../Redux/SubDistrictRedux'
// import { ProfileSelectors } from '../Redux/ProfileRedux'

export function * getProfile (api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(ProfileSelectors.getData)
  // make the call to the api
  const response = yield call(api.getprofile, data)
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    
    yield put(ProfileActions.profileSuccess(response.data))
  } else {
    yield put(ProfileActions.profileFailure())
  }
}
export function * addAddress (api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(ProfileSelectors.getData)
  // make the call to the api
  const response = yield call(api.addaddress, data)
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    
    Alert.alert("Menambahkan Alamat Baru Berhasil",'silahkan check alamat baru di pilihan create order')
    yield put(AddAddressRedux.addAddressSuccess(response.data))
  } else {
    yield put(AddAddressRedux.addAddressFailure())
  }
}

export function * getProvince (api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(ProfileSelectors.getData)
  // make the call to the api
  const response = yield call(api.getprovince, data)
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    
    yield put(ProviceRedux.proviceSuccess(response.data))
  } else {
    yield put(ProviceRedux.proviceFailure())
  }
}
export function * getCities (api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(ProfileSelectors.getData)
  // make the call to the api
  const response = yield call(api.getcities, data)
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    
    yield put(CitiesRedux.citiesSuccess(response.data))
  } else {
    yield put(CitiesRedux.citiesFailure())
  }
}
export function * getDistrict (api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(ProfileSelectors.getData)
  // make the call to the api
  const response = yield call(api.getdistrict, data)
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    
    yield put(DistrictRedux.districtSuccess(response.data))
  } else {
    yield put(DistrictRedux.districtFailure())
  }
}

export function * getSubDistrict (api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(ProfileSelectors.getData)
  // make the call to the api
  const response = yield call(api.getsubdistrict, data)
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    
    yield put(SubDistrictRedux.subDistrictSuccess(response.data))
  } else {
    yield put(SubDistrictRedux.subDistrictFailure())
  }
}