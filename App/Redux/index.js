import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'
import ReduxPersist from '../Config/ReduxPersist'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  nav: require('./NavigationRedux').reducer,
  github: require('./GithubRedux').reducer,
  search: require('./SearchRedux').reducer,
  login: require('./LoginRedux').reducer,
  auth: require('./AuthRedux').reducer,
  register: require('./RegisterRedux').reducer,
  profile: require('./ProfileRedux').reducer,
  product: require('./ProductRedux').reducer,
  addcart: require('./CartRedux').reducer,
  cart: require('./ListCartRedux').reducer,
  deleteCart: require('./DeleteCartRedux').reducer,
  updateCart: require('./UpdateCartRedux').reducer,
  clearCart: require('./ClearCartRedux').reducer,
  listAddress:require('./AddressRedux').reducer,
  listPayment: require('./PaymentRedux').reducer,
  listLogistic:require('./LogisticRedux').reducer,
  getorder:require('./GetOrderRedux').reducer,
  checkoutorder: require('./CheckoutOrderRedux').reducer,
  province: require('./ProviceRedux').reducer,
  cities: require('./CitiesRedux').reducer,
  district: require('./DistrictRedux').reducer,
  subdistrict: require('./SubDistrictRedux').reducer,
  detailProduct: require('./DetailProductRedux').reducer,
  historyOrder: require('./HistoryOrderRedux').reducer
})

export default () => {
  let finalReducers = reducers
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig
    finalReducers = persistReducer(persistConfig, reducers)
  }

  let { store, sagasManager, sagaMiddleware } = configureStore(finalReducers, rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware(newYieldedSagas)
      })
    })
  }

  return store
}
