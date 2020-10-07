// a library to wrap and simplify api calls
import apisauce from 'apisauce'
const URL='https://hercules.aturtoko.id/mytoko/public/'
const Dummy='https://api.github.com/'
// our "constructor"
const create = (baseURL = URL) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      // 'Cache-Control': 'no-cache',
      'content-type': 'application/json'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const getRoot = () => api.get('')
  const getRate = () => api.get('rate_limit')
  const getUser = (username) => api.get('search/users', {q: username})
  const getlogin = (payload) => api.post('/mt/login',payload)
  const getregister = (payload) => api.post('/mt/register',payload)
  const getprofile =(payload)=> api.get('/mt/userdetail',{}, { headers: { Authorization: payload } })
  const getAuth =(payload)=> api.post('/mt/validation',{ "authorization_code": payload })
  const getproduct =(payload)=> api.post('/mt/list',{}, { headers: { Authorization: payload }})
  const getaddcart = (payload)=> api.post('/mt/addtocart',payload.body,{ headers: { Authorization: payload.auth } })
  const getcart = (payload)=>api.get('/mt/getcart',{}, { headers: { Authorization: payload } })
  const getupdatecart = (payload)=> api.post('/mt/updatecart',payload.body,{ headers: { Authorization: payload.auth } })
  const getdeletecart = (payload)=> api.post('/mt/deletefromcart',payload.body,{ headers: { Authorization: payload.auth } })
  const clearCart  =(payload)=>api.post('/mt/clearcart',{}, { headers: { Authorization: payload }})
  const createOrder = (payload)=> api.post('/mt/createorder',payload.body,{ headers: { Authorization: payload.auth } })
  const getpayment =(payload)=> api.get('/mt/getpayment',{}, { headers: { Authorization: payload } } )
  const getaddressuser =(payload)=> api.get('/mt/getaddressuser',{}, { headers: { Authorization: payload } } )
  const getlistlogistic =(payload)=> api.get('/mt/getlistlogistics')
  const getorder =(payload)=> api.post('/mt/getorder',{}, { headers: { Authorization: payload } } )
  const checkoutorder =(payload)=> api.post('/mt/checkoutorder',payload.body,{ headers: { Authorization: payload.auth } })
  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    getRoot,
    getRate,
    getUser,
    getlogin,
    getregister,
    getprofile,
    getAuth,
    getproduct,
    getaddcart,
    getcart,
    getupdatecart,
    getdeletecart,
    clearCart,
    createOrder,
    getpayment,
    getaddressuser,
    getlistlogistic,
    getorder,
    checkoutorder
  }
}

// let's return back our create method as the default.
export default {
  create
}
