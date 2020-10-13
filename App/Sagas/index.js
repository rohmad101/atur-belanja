import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { RegisterTypes } from '../Redux/RegisterRedux'
import { ProfileTypes } from '../Redux/ProfileRedux';
import { ProductTypes } from '../Redux/ProductRedux';
import { CartTypes } from '../Redux/CartRedux';
import { ListCartTypes } from '../Redux/ListCartRedux';
import { UpdateCartTypes } from '../Redux/UpdateCartRedux';
import { DeleteCartTypes } from '../Redux/DeleteCartRedux';
import { ClearCartTypes } from '../Redux/ClearCartRedux';
import { CreateOrderTypes } from '../Redux/CreateOrderRedux';
import { AddressTypes } from '../Redux/AddressRedux';
import { PaymentTypes } from '../Redux/PaymentRedux';
import { LogisticTypes } from '../Redux/LogisticRedux';
import { GetOrderTypes } from '../Redux/GetOrderRedux';
import { CheckoutOrderTypes } from '../Redux/CheckoutOrderRedux';
import { AddAddressTypes } from '../Redux/AddAddressRedux';
import { ProviceTypes } from '../Redux/ProviceRedux';
import { CitiesTypes } from '../Redux/CitiesRedux';
import { DistrictTypes } from '../Redux/DistrictRedux';
import { SubDistrictTypes } from '../Redux/SubDistrictRedux';
import { DetailProductTypes } from '../Redux/DetailProductRedux';
import { HistoryOrderTypes } from '../Redux/HistoryOrderRedux';

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import { getLogin } from './LoginSagas'
import { getRegister } from './RegisterSagas';
import { getProfile, addAddress, getCities,getDistrict,getProvince,getSubDistrict } from './ProfileSagas';
import { getProduct, getCart,getAddCart,getUpdateCart,getDeleteCart,getClearCart } from './ProductSagas';
import { getCreateOrder, getAddress,getPayment,getLogistic,getOrder, checkoutOrder, getHistoryOrder } from './CreateOrderSagas';
import { getDetailProduct } from './DetailProductSagas';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    // takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, getLogin, api),
    takeLatest(RegisterTypes.REGISTER_REQUEST,getRegister,api),
    takeLatest(ProfileTypes.PROFILE_REQUEST,getProfile,api),
    takeLatest(ProductTypes.PRODUCT_REQUEST,getProduct,api),
    takeLatest(CartTypes.CART_REQUEST, getAddCart,api),
    takeLatest(ListCartTypes.LIST_CART_REQUEST, getCart,api),
    takeLatest(UpdateCartTypes.UPDATE_CART_REQUEST, getUpdateCart,api),
    takeLatest(DeleteCartTypes.DELETE_CART_REQUEST, getDeleteCart,api),
    takeLatest(ClearCartTypes.CLEAR_CART_REQUEST, getClearCart,api),
    takeLatest(CreateOrderTypes.CREATE_ORDER_REQUEST, getCreateOrder,api),
    takeLatest(AddressTypes.ADDRESS_REQUEST, getAddress,api),
    takeLatest(PaymentTypes.PAYMENT_REQUEST, getPayment,api),
    takeLatest(LogisticTypes.LOGISTIC_REQUEST, getLogistic,api),
    takeLatest(GetOrderTypes.GET_ORDER_REQUEST, getOrder,api),
    takeLatest(CheckoutOrderTypes.CHECKOUT_ORDER_REQUEST, checkoutOrder,api),
    takeLatest(AddAddressTypes.ADD_ADDRESS_REQUEST, addAddress,api),
    takeLatest(ProviceTypes.PROVICE_REQUEST, getProvince,api),
    takeLatest(CitiesTypes.CITIES_REQUEST, getCities,api),
    takeLatest(DistrictTypes.DISTRICT_REQUEST, getDistrict,api),
    takeLatest(SubDistrictTypes.SUB_DISTRICT_REQUEST, getSubDistrict,api),
    takeLatest(DetailProductTypes.DETAIL_PRODUCT_REQUEST, getDetailProduct, api),
    takeLatest(HistoryOrderTypes.HISTORY_ORDER_REQUEST, getHistoryOrder, api)
  ]) 
}
