import React, { Component, useState } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, TouchableOpacity, Alert, ActivityIndicator, Dimensions } from 'react-native'
import {Picker} from '@react-native-community/picker';
import { View } from 'react-native-animatable'

import { connect } from 'react-redux'
import { sliderWidth, itemWidth } from './Styles/SliderEntery.styles';
import SliderEntry from './components/SliderEntry';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Images } from '../Themes'
import { SearchBar,Header,Icon,Image,Card,ListItem,Button,Overlay, Divider } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import { bindActionCreators } from 'redux'
import { BarChart, StackedBarChart } from 'react-native-chart-kit';
import reactotron from 'reactotron-react-native';
import { TextInput } from 'react-native-gesture-handler';
import Video from 'react-native-video';
// Add Actions - replace 'Your' with whatever your reducer is called :)
import AuthActions from '../Redux/AuthRedux'
import LoginActions from '../Redux/LoginRedux'
import ProfileActions from '../Redux/ProfileRedux'
import ProductActions from '../Redux/ProductRedux'
import CartRedux from '../Redux/CartRedux'
import ListCartRedux from '../Redux/ListCartRedux'
import UpdateCartRedux from '../Redux/UpdateCartRedux'
import DeleteCartRedux from '../Redux/DeleteCartRedux'
import ClearCartRedux from '../Redux/ClearCartRedux'
import CreateOrderRedux from '../Redux/CreateOrderRedux'
import AddressRedux from '../Redux/AddressRedux'
import PaymentRedux from '../Redux/PaymentRedux'
import LogisticRedux from '../Redux/LogisticRedux'
import GetOrderRedux from '../Redux/GetOrderRedux';
import CheckoutOrderRedux from '../Redux/CheckoutOrderRedux';
import AddAddressRedux from '../Redux/AddAddressRedux';
import ProviceRedux from '../Redux/ProviceRedux';
import CitiesRedux from '../Redux/CitiesRedux';
import DistrictRedux from '../Redux/DistrictRedux';
import SubDistrictRedux from '../Redux/SubDistrictRedux';
import HistoryOrderRedux from '../Redux/HistoryOrderRedux';
// Styles
import styles from './Styles/DashboardScreenStyle'
import { getHistoryOrder } from '../Sagas/CreateOrderSagas';

class DashboardScreen extends Component {
  state={
    selectedMenu:'DASHBOARD',
    search:'',
    visible:false,
    slider1ActiveSlide:0,
    expandsDashboard:false,
    statusAddProduct:false,
    avatarSource: null,
    videoSource: null,
    addAdress:false,
    order:[],
    Pengiriman:'',
    payment:'',
    Alamat:'',
    orderId:'',
    createAddress:{
      address_label: "",
      address_line1: "",
      address_line2: "",
      province_id: "",
      city_id: "",
      district_id: "",
      subdistrict_id: "",
      zip_code: "",
      notes: "",
      phone_no: ""
    },
    suggestion:[ 
      {
        title: 'Beautiful and dramatic Antelope Canyon',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'https://i.imgur.com/UYiroysl.jpg'
      },
      {
          title: 'Earlier this morning, NYC',
          subtitle: 'Lorem ipsum dolor sit amet',
          illustration: 'https://i.imgur.com/UPrs1EWl.jpg'
      },
      {
          title: 'White Pocket Sunset',
          subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
          illustration: 'https://i.imgur.com/MABUbpDl.jpg'
      },
      {
          title: 'Acrocorinth, Greece',
          subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
          illustration: 'https://i.imgur.com/KZsmUi2l.jpg'
      },
      {
          title: 'The lone tree, majestic landscape of New Zealand',
          subtitle: 'Lorem ipsum dolor sit amet',
          illustration: 'https://i.imgur.com/2nCt3Sbl.jpg'
      },
      {
          title: 'Middle Earth, Germany',
          subtitle: 'Lorem ipsum dolor sit amet',
          illustration: 'https://i.imgur.com/lceHsT6l.jpg'
      }
    ]
  }

 async componentDidMount(){
    const {profileRequest,productRequest,auth,proviceRequest }= this.props
   await productRequest(auth.data.access_token)
    proviceRequest(auth.data.access_token)
   await profileRequest(auth.data.access_token)
    // profileRequest(auth.data.access_token)
 
  }
  componentDidUpdate(prevProps, prevState, snapshot){
    const { 
      listCartRequest,productRequest,profileRequest,auth,navigation,paymentRequest,addressRequest,logisticRequest,product,getOrderRequest,
      cities,district,subdistrict,subDistrictRequest,districtRequest,citiesRequest,historyOrderRequest
    }= this.props
    // reactotron.log(product)
    if(product&&product.status===400||product&&product.status==='400'){
      this.props.authSuccess(null)
      this.props.loginSuccess(null)
      navigation.replace('LoginScreen')
    }
    if(!cities && this.state.createAddress.province_id){
      citiesRequest({
          auth:this.props.auth.data.access_token, 
          body:this.state.createAddress.province_id
        })
    }else{
      if(this.state.createAddress.province_id !== prevState.createAddress.province_id){
        citiesRequest({
          auth:this.props.auth.data.access_token, 
          body:this.state.createAddress.province_id
        })
      }
    }
    if(!district && this.state.createAddress.city_id){
      districtRequest({
        auth:this.props.auth.data.access_token, 
        body:this.state.createAddress.city_id
      })
    }else{
      if(this.state.createAddress.city_id !== prevState.createAddress.city_id){
        districtRequest({
          auth:this.props.auth.data.access_token, 
          body:this.state.createAddress.city_id
        })
      }
    }
    if(!subdistrict && this.state.createAddress.district_id){
      subDistrictRequest({
        auth:this.props.auth.data.access_token, 
        body:this.state.createAddress.district_id
      })
    }else{
      if(this.state.createAddress.district_id !== prevState.createAddress.district_id){
        subDistrictRequest({
          auth:this.props.auth.data.access_token, 
          body:this.state.createAddress.district_id
        })
      }
    }
    
    if(auth){
      if(prevState.selectedMenu !== this.state.selectedMenu){
        if(this.state.selectedMenu === 'SETTINGS') {
              // alert(JSON.stringify(auth.payload.data.authorization_code))
              // reactotron.log('auth',auth)
              profileRequest(auth.data.access_token)
      }
       if(this.state.selectedMenu === 'PRODUCT') {
              // alert(JSON.stringify(auth.payload.data.authorization_code))
              // reactotron.log('auth',auth)
              productRequest(auth.data.access_token)  
       } 
        if(this.state.selectedMenu === 'CART') {
              // alert(JSON.stringify(auth.payload.data.authorization_code))
              // reactotron.log('auth',auth)
              listCartRequest(auth.data.access_token)  
       } 
       if(this.state.selectedMenu === 'ORDER') {
        // alert(JSON.stringify(auth.payload.data.authorization_code))
        // reactotron.log('auth',auth)
        logisticRequest(auth.data.access_token)  
        setTimeout(() => {
          addressRequest(auth.data.access_token) 
        }, 250);
         
      } 
      if(this.state.selectedMenu === 'PAYMENT') {
        // alert(JSON.stringify(auth.payload.data.authorization_code))
        // reactotron.log('auth',auth)
        paymentRequest(auth.data.access_token)  
        setTimeout(() => {
          getOrderRequest(auth.data.access_token)
        }, 250);
        
      } 
      if(this.state.selectedMenu === 'HISTORY') {
        // alert(JSON.stringify(auth.payload.data.authorization_code))
        // reactotron.log('auth',auth)
        historyOrderRequest(auth.data.access_token) 
      } 
    }
    if(prevState.selectedMenu !== this.state.selectedMenu){
      
      }
    }else{
      this.props.authSuccess(null)
      this.props.loginSuccess(null)
      navigation.replace('LoginScreen')
    }
  }


  toggleOverlay = () => {
    this.setState({visible:!this.state.visible});
  };
  _renderItemWithParallax ({item, index}, parallaxProps) {
    return (
        <SliderEntry
          data={item}
          even={(index + 1) % 2 === 0}
          parallax={true}
          parallaxProps={parallaxProps}
        />
    );
}

  //  MenuBar=(selected)=>{
  //   return(
  //     <View style={{position:'absolute',bottom:0,width:'100%', height:80, backgroundColor:'#add8e6',flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
  //       <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}} onPress={()=>this.setState({selectedMenu:'HOME'})}>
  //         <View style={{width:60,height:60, alignItems:'center',justifyContent:'center',backgroundColor:selected==='HOME'?'white':'#add8e6',borderRadius:32}}>
  //            <Image source={Images.launch} style={{width:32,height:32}}/>
  //         </View>
  //         <Text style={{color:selected==='HOME'?'white':'black',marginBottom:4,marginTop:-4}}>Home</Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}} onPress={()=>this.setState({selectedMenu:'PRODUCT'})}>
  //         <View style={{width:60,height:60, alignItems:'center',justifyContent:'center',backgroundColor:selected==='PRODUCT'?'white':'#add8e6',borderRadius:32}}>
  //            <Image source={Images.launch} style={{width:32,height:32}}/>
  //         </View>
  //         <Text style={{color:selected==='PRODUCT'?'white':'black',marginBottom:4,marginTop:-4}}>Product</Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity style={{justifyContent:'center',alignItems:'center',marginBottom:20}} onPress={()=>this.setState({selectedMenu:'EXPLORE'})}>
  //         <View style={{backgroundColor:selected==='EXPLORE'?'white':'#add8e6',borderRadius:60, width:100,height:100,alignItems:'center',justifyContent:'center',marginHorizontal:-16,flexDirection:'column'}}>
  //           <Image source={Images.launch} style={{width:48,height:48}}/>
  //         </View>
  //         <Text style={{color:selected==='explore'?'white':'black'}}>Explore</Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}} onPress={()=>this.setState({selectedMenu:'INVESTMENT'})}>
  //         <View style={{width:60,height:60, alignItems:'center',justifyContent:'center',backgroundColor:selected==='INVESTMENT'?'white':'#add8e6',borderRadius:32}}>
  //            <Image source={Images.launch} style={{width:32,height:32}}/>
  //         </View>
  //         <Text style={{color:selected==='INVESTMENT'?'white':'black',marginBottom:4,marginTop:-4}}>Invesment</Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}} onPress={()=>this.setState({selectedMenu:'PROFILE'})}>
  //         <View style={{width:60,height:60, alignItems:'center',justifyContent:'center',backgroundColor:selected==='PROFILE'?'white':'#add8e6',borderRadius:32}}>
  //            <Image source={Images.launch} style={{width:32,height:32}}/>
  //         </View>
  //         <Text style={{color:selected==='PROFILE'?'white':'black',marginBottom:4,marginTop:-4}}>Profile</Text>
  //       </TouchableOpacity>
  //     </View>
  //   )
  // }
  Dashboard =(visible)=>{

    const {payloadProfile, navigation} = this.props
    if(!payloadProfile) {
        return(
          <View style={{width:'100%', height:'100%', justifyContent:'center', alignItems:'center'}}>
              <ActivityIndicator  color={'blue'}/>
          </View>
        )
    }
    const data = {
      labels: [1,2,3,4,5,6,7,8,9],
      legend: [],
      data: [
        [60],
        [30],
        [30],
        [30],
        [30],
        [30],
        [30],
        [30],
        [30]
      ],
      barColors: ["green"]
    };
    const chartConfig = {
      backgroundGradientFrom: "#1E2923",
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: "#08130D",
      backgroundGradientToOpacity: 0.5,
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.5,
      useShadowColorFromDataset: false // optional
    };

    const {user_id,username,email,display_name,roles,status,created_at,update_at} = payloadProfile.data
    return(
      <ScrollView>
        <View style={{flex:1, }}>
          <View style={{backgroundColor:'#2D4070',width:"100%",alignItems:'center'}}>
            {/* intro */}
            <View style={{width:"100%", height:Dimensions.get('screen').height*0.15, backgroundColor:'#50E348', borderBottomLeftRadius:12,borderBottomRightRadius:12,padding:12}}>
              <View style={{flexDirection:'row'}}><Text  style={{fontSize:20}}>Hi, </Text><Text style={{fontWeight:'bold',fontSize:20}}>{display_name}</Text></View>
              <Text style={{fontSize:20}}>your free trial will expire in 6 days</Text>
              <View style={{width:'100%', flexDirection:'row',justifyContent:'flex-end',paddingTop:Dimensions.get('screen').height*0.03}}>
                <Text style={{color:'#4C4F4C',marginRight:4}}>Select Package</Text> 
                <Icon name="chevron-right" size={24} color="#4C4F4C" style={{width:24,height:24,backgroundColor:'white',justifyContent:'center',paddingRight:5, borderRadius:20,borderWidth:1,borderColor:'#4C4F4C'}}/>
              </View>
            </View>
            <Text style={{fontSize:20, lineHeight:25,fontWeight:'700', color:'white', paddingVertical:32}}>Manage your stock and order easier</Text>
            {/* menu atas */}
            <View style={{width:'100%',height:150,flexDirection:'row',alignItems:'center',alignItems:'center',justifyContent:'center'}}>
              <View style={{alignItems:'center',width:'30%'}}>
                <Image source={Images.icon_add} style={{width:60,height:60}}/>
                <Text style={{color:'#fff',marginTop:8}}>Add Product</Text>
              </View>
              <View style={{alignItems:'center',width:'30%'}}>
                <Image source={Images.icon_shipping} style={{width:60,height:60}}/>
                <Text style={{color:'#fff',marginTop:8,textAlign:'center'}} numberOfLines={2}>Arrage{'\n'} Your Shipping</Text>
              </View>
              <View style={{alignItems:'center',width:'30%'}}>
               <Image source={Images.icon_order} style={{width:60,height:60}}/>
               <Text style={{color:'#fff',marginTop:8,textAlign:'center'}} numberOfLines={2}>Your{'\n'} First Order</Text>
              </View>
            </View>
            {/* menu bawah */}
            <View style={{width:'100%',height:150, flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
              <View style={{alignItems:'center',width:'30%'}}>
                <Image source={Images.icon_courier} style={{width:60,height:60}}/>
                <Text style={{color:'#fff',marginTop:8,textAlign:'center'}} numberOfLines={2}>Choose Courier</Text>
              </View>
              <View style={{alignItems:'center',width:'30%'}}>
                <Image source={Images.icon_addons} style={{width:60,height:60}}/>
                <Text style={{color:'#fff',marginTop:8,textAlign:'center'}} numberOfLines={2}>Addons{'\n'} Functionality</Text>
              </View>
              <View style={{alignItems:'center',width:'30%'}}>
                <Image source={Images.icon_more} style={{width:60,height:60}}/>
               <Text style={{color:'#fff',marginTop:8,textAlign:'center'}} numberOfLines={2}>More</Text>
              </View>
            </View>
            {/* menu info */}
            <View style={{width:'100%',backgroundColor:'#DDE3E9',justifyContent:'space-around',borderTopLeftRadius:50,borderTopRightRadius:50,marginTop:150,paddingBottom:150}}>
              <View style={{flexDirection:'row',width:'100%',justifyContent:'space-around',paddingHorizontal:'2%',marginTop:-75}}>
                <View style={{width:'45%',height:175, backgroundColor:'#fff',borderRadius:8,borderColor:'#50E348',borderWidth:2,justifyContent:'center',alignItems:'center'}}>
                    <View style={{flexDirection:'row',width:'100%',alignItems:'center',justifyContent:'center'}}>
                      <Image source={Images.menu_info_order} style={{width:60,height:60,marginLeft:40}}/>
                      <View style={{width:'60%',flexDirection:'column',alignItems:'center',marginLeft:-8}}>
                        <Text style={{fontWeight:'bold', fontSize:30}}>5</Text>
                        <Text style={{fontWeight:'700',fontSize:10}}>Today’s Order</Text>
                      </View>
                    </View>
                    <TouchableOpacity style={{width:'80%',height:30,backgroundColor:'#50E348',borderRadius:20,alignItems:'center',justifyContent:'center',marginTop:20}}>
                      <Text style={{fontWeight:'700'}}>See Details</Text>
                    </TouchableOpacity>
                </View>
                <View style={{width:'45%',height:175, backgroundColor:'#fff',borderRadius:8,borderColor:'#50E348',borderWidth:2,justifyContent:'center',alignItems:'center'}}>
                    <View style={{flexDirection:'row',width:'100%',alignItems:'center',justifyContent:'center'}}>
                      <Image source={Images.menu_info_process} style={{width:60,height:60,marginLeft:40}}/>
                      <View style={{width:'60%',flexDirection:'column',alignItems:'center',marginLeft:-8}}>
                        <Text style={{fontWeight:'bold', fontSize:30}}>5</Text>
                        <Text style={{fontWeight:'700',fontSize:10}}>On Process</Text>
                      </View>
                    </View>
                    <TouchableOpacity style={{width:'80%',height:30,backgroundColor:'#50E348',borderRadius:20,alignItems:'center',justifyContent:'center',marginTop:20}}>
                      <Text style={{fontWeight:'700'}}>See Details</Text>
                    </TouchableOpacity>
                </View>
              </View>
              <View style={{flexDirection:'row',width:'100%',justifyContent:'space-around',paddingHorizontal:'2%',paddingTop:48}}>
                <View style={{width:'45%',height:175, backgroundColor:'#fff',borderRadius:8,borderColor:'#50E348',borderWidth:2,justifyContent:'center',alignItems:'center'}}>
                      <View style={{flexDirection:'row',width:'100%',alignItems:'center',justifyContent:'center'}}>
                        <Image source={Images.menu_info_sold} style={{width:60,height:60,marginLeft:40}}/>
                        <View style={{width:'60%',flexDirection:'column',alignItems:'center',marginLeft:-8}}>
                          <Text style={{fontWeight:'bold', fontSize:30}}>5</Text>
                          <Text style={{fontWeight:'700',fontSize:10}}>Sold</Text>
                        </View>
                      </View>
                      <TouchableOpacity style={{width:'80%',height:30,backgroundColor:'#50E348',borderRadius:20,alignItems:'center',justifyContent:'center',marginTop:20}}>
                        <Text style={{fontWeight:'700'}}>See Details</Text>
                      </TouchableOpacity>
                  </View>
                  <View style={{width:'45%',height:175, backgroundColor:'#fff',borderRadius:8,borderColor:'#50E348',borderWidth:2,justifyContent:'center',alignItems:'center'}}>
                      <View style={{flexDirection:'row',width:'100%',alignItems:'center',justifyContent:'center'}}>
                        <Image source={Images.menu_info_order} style={{width:60,height:60,marginLeft:40}}/>
                        <View style={{width:'60%',flexDirection:'column',alignItems:'center',marginLeft:-8}}>
                          <Text style={{fontWeight:'bold', fontSize:30}}>5</Text>
                          <Text style={{fontWeight:'700',fontSize:10}}>Gross Profit</Text>
                        </View>
                      </View>
                      <TouchableOpacity style={{width:'80%',height:30,backgroundColor:'#50E348',borderRadius:20,alignItems:'center',justifyContent:'center',marginTop:20}}>
                        <Text style={{fontWeight:'700'}}>See Details</Text>
                      </TouchableOpacity>
                  </View>
                </View>
                {/* text Monthly Item Sales */}
                <View style={{padding:24,width:'100%', height:200,backgroundColor:'#50E348',marginTop:100,borderTopRightRadius:150}}>
                  <Text style={{color:'#2D4070', fontSize:28, fontStyle:'italic',fontWeight:'bold'}}>Monthly Item Sales</Text>
                </View>
                {/* menu sales chart */}
                <View style={{width:'100%',paddingBottom:this.state.expandsDashboard?120:80,backgroundColor:'#455A90',marginTop:-130,borderTopRightRadius:150,alignItems:'center',borderBottomLeftRadius:50,borderBottomRightRadius:50}}>
                  <View style={{width:'100%',flexDirection:'row', padding:20}}>
                    <View style={{width:'60%',flexDirection:'column',alignItems:'flex-end'}}>      
                      <Text style={{color:'#fff',fontSize:24, fontWeight:'bold',fontStyle:'italic'}}>Sales Chart</Text>
                      <Text style={{color:'#fff',fontSize:18, fontWeight:'bold',fontStyle:'italic'}}>July 2020</Text>
                    </View>
                    <TouchableOpacity onPress={()=>Alert.alert('on development')} style={{width:'20%',alignItems:'flex-end',justifyContent:'center'}}><Icon name="menu" color="black" size={24} style={{backgroundColor:'#50E348'}}></Icon></TouchableOpacity>
                  </View>
                  <StackedBarChart
                    // style={graphStyle}
                    data={data}
                    width={Dimensions.get('screen').width*0.95}
                    yAxisLabel="Rp."
                    height={220}
                    chartConfig={chartConfig}
                  />
                  {this.state.expandsDashboard?
                  // menu expands dashboard
                   <View style={{width:'100%',height:200,justifyContent:'center',flexDirection:'row',marginTop:50}}>
                    <View style={{width:'50%',marginTop:48}}>
                     <Image source={Images.expands_dashboard} style={{width:120,height:200}}/></View>
                    <View style={{width:'50%',flexDirection:'row'}}>
                      <View style={{width:'100%'}}>
                        <Text style={{fontSize:28,fontWeight:'700',lineHeight:32,fontStyle:'italic',color:'white'}}>Statistics</Text>
                        <View style={{width:'100%',backgroundColor:'#E1E7ED',height:200,marginTop:24,borderTopLeftRadius:20,borderBottomLeftRadius:20}}>
                          <View style={{backgroundColor:'#E3CA43',width:'100%',height:40,borderTopLeftRadius:20,alignItems:'center',justifyContent:'center'}}>
                            <Text style={{color:'#455A90', fontWeight:'bold', fontSize:20}}>July 2, 2020</Text>
                          </View>
                          <View style={{width:'100%',height:'70%',borderTopLeftRadius:20,alignItems:'center',justifyContent:'space-around'}}>
                            <Text style={{color:'#CD8906', fontWeight:'bold',fontSize:16}}>Sold Item</Text>
                            <Text style={{marginTop:'-10%', fontWeight:'bold', color:'#4E944C'}}>40</Text>
                            <Text style={{color:'#CD8906', fontWeight:'bold',fontSize:16}}>Gross Profit</Text>
                            <Text style={{marginTop:'-10%', fontWeight:'bold', color:'#4E944C'}}>Rp 500.000.000</Text>
                          </View>
                    
                        </View>
                      </View>
                     <Image source={Images.expands_dashboard} style={{width:100,height:100}}/></View>
                   </View>:
                   null  
                }
                </View>
                <TouchableOpacity onPress={()=>this.setState({expandsDashboard:!this.state.expandsDashboard})} style={{width:'100%',alignItems:'center',justifyContent:'center'}}><Icon name="arrow-drop-down" color="black" size={32} style={{backgroundColor:'#C4C4C4'}}></Icon></TouchableOpacity>
               
                <Divider style={{ backgroundColor: 'white',width:'100%',marginTop:20,height:8 }} />
                {/* Aricle Suggestions */}
                <View style={{width:'100%',height:80,flexDirection:'row'}}>
                    <View style={{width:'70%',justifyContent:'center',alignItems:'center', backgroundColor:'#50E348',height:'100%', borderTopRightRadius:20,borderBottomRightRadius:20, borderBottomColor:'rgba(0, 0, 0, 0.25)', borderBottomWidth:2}}>
                      <Text style={{fontSize:32,fontWeight:'bold',fontStyle:'italic',lineHeight:32}}>Article Suggestions</Text>
                    </View>
                    <View style={{width:'30%',justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                        <Text style={{fontWeight:'700',lineHeight:13}}>See All</Text>
                        <TouchableOpacity onPress={()=>Alert.alert('on development')} style={{alignItems:'center',justifyContent:'center'}}><Icon name="chevron-right" color="black" size={24} style={{backgroundColor:'#50E348',borderRadius:40,marginLeft:12,marginRight:8}}></Icon></TouchableOpacity>
                    </View>
                </View>
                {/* slider */}
                <View style={styles.exampleContainer}>
                <Carousel
                  ref={c => this._slider1Ref = c}
                  data={this.state.suggestion}
                  renderItem={this._renderItemWithParallax}
                  sliderWidth={sliderWidth}
                  itemWidth={itemWidth}
                  hasParallaxImages={true}
                  inactiveSlideScale={0.94}
                  inactiveSlideOpacity={0.7}
                  inactiveSlideShift={20}
                  containerCustomStyle={{
                    marginTop: 15,
                    overflow: 'visible' // for custom animations
                }}
                  contentContainerCustomStyle={{paddingVertical: 10}}
                  loop={true}
                  // loopClonesPerSide={1}
                  autoplay={true}
                  autoplayDelay={500}
                  autoplayInterval={3000}
                  onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
                />
                <Pagination
                  dotsLength={this.state.suggestion.length}
                  activeDotIndex={this.state.slider1ActiveSlide}
                  containerStyle={{ paddingVertical: 8}}
                  dotColor={'rgba(255, 255, 255, 0.92)'}
                  dotStyle={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    marginHorizontal: 8
                }}
                  inactiveDotColor={'#000'}
                  inactiveDotOpacity={0.4}
                  inactiveDotScale={0.6}
                  // carouselRef={this._slider1Ref}
                  // tappableDots={!!this._slider1Ref}
                />
            </View>
            </View>

          </View>
        </View>
      </ScrollView>
      
    )
  }
  // fungsi untuk product
  filterList(list) {
    return list.filter(
      (listItem) =>
        listItem.name
          .toLowerCase()
          .includes(this.state.search.toLowerCase()) ||
        listItem.sku_id.toLowerCase().includes(this.state.search.toLowerCase()),
    );
  }
// ui product
  Product =(search,visible,statusAddProduct)=>{
    const {product,navigation}=this.props
    const {width,height}=Dimensions.get('screen')
    const list = [
      {artist: 'The Weeknd', song: 'Blinding Lights'},
      {artist: 'Drake', song: 'Toosie Slide'},
      {artist: 'Roddy Ricch', song: 'The Box'},
      {artist: 'Dua Lipa', song: 'Dont Start Now'},
    ];
    const qty=[]
    // if(statusAddProduct){
    //   const options = {
    //     title: 'Select Avatar',
    //     customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    //     storageOptions: {
    //       skipBackup: true,
    //       path: 'images',
    //     },
    //   };
    //   return (
    //   <ScrollView>
    //     <View style={{width:width,height:height,alignItems:'center'}}>
    //     <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
    //       <View
    //          style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
    //           {this.state.avatarSource === null ? (
    //             <Text>Select a Photo</Text>
    //           ) : (
    //             <Image style={styles.avatar} source={this.state.avatarSource} />
    //           )}
    //         </View>
    //       </TouchableOpacity>

    //       <TouchableOpacity onPress={this.selectVideoTapped.bind(this)}>
            
    //         <View style={[styles.avatar, styles.avatarContainer]}>
    //           <Text>Select a Video</Text>
    //         </View>
    //       </TouchableOpacity>
          
    //        {this.state.videoSource && (
    //         <Video source={this.state.videoSource}   // Can be a URL or a local file.
    //         ref={(ref) => {
    //           this.player = ref
    //         }}                                      // Store reference
    //         onBuffer={this.onBuffer}                // Callback when remote video is buffering
    //         onError={this.videoError}               // Callback when video cannot be loaded
    //         style={styles.backgroundVideo}
    //         controls={true}
    //         fullscreen={true}
    //         style={styles.uploadImage} />
    //       )}
    //       {this.state.videoSource && (
    //         <Text style={{margin: 8, textAlign: 'center'}}>
    //           {this.state.videoSource}
    //         </Text>
    //       )}
    //       <Divider style={{width:'95%', height:2, backgroundColor:'#CBE3D4'}}/>
    //       <TouchableOpacity onPress={()=>this.setState({statusAddProduct: !statusAddProduct})} style={{borderRadius:4,width:width*0.8, height:height*0.05,backgroundColor:'#2D4070',justifyContent:'center',alignItems:'center'}}>
    //         <Text style={{color:'white'}}>Save</Text>
    //       </TouchableOpacity>
    //     </View>
    //   </ScrollView>
    //   )
    // }
    return(
      <View style={{alignItems: 'center',height: Dimensions.get('screen').height*0.85 }}>
        <View style={{width:'100%', backgroundColor:'#5BE553',height:'10%',minHeight:80, justifyContent:'center',alignItems:'center'}}>
          <TextInput
            value={search}
            onChangeText={(search) => this.setState({search})}
            placeholder="Find product or SKU"
            style={{   fontSize: 16,
              margin: 10,
              width: '90%',
              height: 50,borderRadius:8, backgroundColor:'white'}}
          />
        </View>
        {/* <View style={{width:'100%', backgroundColor:'#2D4070',height:'10%',minHeight:80, justifyContent:'space-around',alignItems:'center',flexDirection:'row'}}>
         <TouchableOpacity style={{flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100%'}} onPress={()=>this.setState({statusAddProduct: !statusAddProduct})}>
          <Image source={Images.add} style={{width:30,height:30}}/>
          <Text style={{color:'white', fontSize:14}}>Add</Text>
         </TouchableOpacity>
         <Divider style={{height:'60%',width:1,backgroundColor:'white'}}/>
         <TouchableOpacity style={{flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100%'}} onPress={()=>Alert.alert('on development',' this feature still on development')}>
          <Image source={Images.filter} style={{width:30,height:30}}/>
          <Text style={{color:'white', fontSize:14}}>Filter</Text>
         </TouchableOpacity>
         <Divider style={{height:'60%',width:1,backgroundColor:'white'}}/>
         <TouchableOpacity style={{flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100%'}} onPress={()=>Alert.alert('on development',' this feature still on development')}>
          <Text style={{color:'white', fontSize:24, fontWeight:'bold'}}>. . .</Text>
          <Text style={{color:'white', fontSize:14}}>More</Text>
         </TouchableOpacity>
        </View> */}
        <ScrollView>
        <View style={{padding:8}}>
          <Text style={{color:'#2D4070'}}>{product && product.data?product.data.length:0} Product</Text>
        </View>
        <View style={{width:width, height:'100%', justifyContent:'center', alignItems:'center'}}>
        { product && product.data && product.data.length>0 ?
        this.filterList(product.data).map((listItem, index) => (
           <View style={{alignItems: 'center',paddingVertical: 24, marginBottom:12, width: width*0.85, paddingLeft:24,flexDirection:'column',justifyContent:'center'}}>
             <TouchableOpacity onPress={()=>  navigation.navigate('DetailProductScreen', { itemId:listItem.id})}> 
            <View style={{flexDirection:'row',width:'100%'}}>
                <Image source={{uri:listItem.url}} style={{width:80,height:100}}/>
                <View style={{flexDirection:'column',width:'100%', paddingLeft:12}}>
                  <Text style={{color:'#2D4070', fontWeight:'bold', fontSize:16,paddingBottom:8}}>{listItem.name}</Text>
                  <Text style={{color:'#2D4070',paddingVertical:6}}>Rp {listItem.price}</Text>
                  <View style={{flexDirection:'row',width:'70%',justifyContent:'space-between'}}>
                    <Text style={{color:'#2D4070'}}>Stock: {listItem.stock}</Text>
                    <Text style={{color: 'white',fontSize: 12,backgroundColor:'#6A8E78',paddingVertical:2,paddingHorizontal:12,borderRadius:8}}>Variant</Text>
                    <Text style={{color: 'black',fontSize: 12,backgroundColor:'#E3CA43',paddingVertical:2,paddingHorizontal:12,borderRadius:8}}>OwnStock</Text>
                  </View>
                </View>
            </View>
             </TouchableOpacity>
            
            <View style={{flexDirection:'row',width:'100%',justifyContent:'flex-end'}}>
              <TextInput
              value={qty[index]}
              placeholder={'input qty'}
              placeholderTextColor={'#fff'}
              style={{color: 'white',fontSize: 16,backgroundColor:'#2D4070',paddingTop:6,borderRadius:8,marginRight:12,width:'30%',textAlign:'center'}}
              onChangeText={jumlah => qty[index]=jumlah}
              />
              <Text onPress={()=>{
              this.props.cartRequest({
                auth:this.props.auth.data.access_token, 
                body:{
                "product_id": listItem.id,
                "notes": "yang rapih ya",
                "quantity": qty[index]
                }
              })
            
            }
              
              } style={{color: 'white',fontSize: 16,backgroundColor:'#2D4070',paddingTop:10,borderRadius:8,width:'30%',textAlign:'center'}}>Add to Cart</Text>
            </View>
         </View>
        )):null}
        </View>
        </ScrollView>
      </View>
    )
  }
  Order =(visible)=>{
    const {Pengiriman,Alamat,addAdress}= this.state
    const {listLogistic,listAddress}= this.props
    const catatan = []
  // reactotron.log(listLogistic)
  // reactotron.log(listAddress)
    return(
      <View style={{  padding:12}}>
          
          <Text>Pilih Alamat Pengiriman</Text>
          <Picker
            selectedValue={Pengiriman}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) =>this.setState({Pengiriman:itemValue})}
            prompt="Pilih Alamat"
          >
            {
              listAddress && listAddress.data && listAddress.data.length>0?
              listAddress.data.map((data,index)=>{
                return <Picker.Item label={data.address_label} value={data.id} />
              })
              :null
            }
          </Picker>
          <Text style={{width:'60%', borderRadius:12,backgroundColor:'#2D4070',justifyContent:'center',alignItems:'center', marginTop:12, padding:12, color:"white"}}
          onPress={()=> this.setState({addAdress:!addAdress})}
          >Tambah Alamat Pengiriman</Text>
          <Text>Pilih Ekspedisi Pengiriman</Text>
          <Picker
            selectedValue={Alamat}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) =>this.setState({Alamat:itemValue})}
            prompt="Pilih jenis Pengiriman"
          >
              {
              listLogistic && listLogistic.data && listLogistic.data.length>0?
              listLogistic.data.map((data,index)=>{
                return <Picker.Item label={data.logistic_name} value={data.id} />
              })
              :null
            } 
          </Picker>
          <Text>Catatan</Text>
          <TextInput
              value={catatan[1]}
              multiline = {true}
              placeholder={'Catatan Pengiriman'}
              placeholderTextColor={'#2D4070'}
              style={{color: '#2D4070',fontSize: 16,borderColor:'#2D4070',borderWidth:1,paddingTop:6,borderRadius:8,marginRight:12,width:'100%',height:150,textAlign:'auto'}}
              onChangeText={note => catatan[1]=note}
              numberOfLines={4}
              />
          <TouchableOpacity style={{width:'100%', borderRadius:12,backgroundColor:'#2D4070', height:50,justifyContent:'center',alignItems:'center', marginTop:12}}
            onPress={()=>
            this.props.createOrderRequest({
              auth:this.props.auth.data.access_token, 
              body:{
              "address_id": Pengiriman,
              "logistic_id": Alamat,
              "notes": catatan[1]
              }
            })
            }
          >
            <Text style={{color:'white'}}>Submit Order</Text>
          </TouchableOpacity>
      </View>
    )
  }

  Payment =(visible)=>{
    const {payment, orderId} = this.state
    const {getorder,listPayment,checkoutorder} = this.props
    return(
      <View style={{ padding:12}}>
        <Text>Pilih Order</Text>
        <Picker
                selectedValue={orderId}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) =>this.setState({
                  orderId: itemValue
                })}
                prompt="Pilih Kota/Kabupaten"
              >
                  {
                  getorder && getorder.data && getorder.data.length>0?
                  getorder.data.map((data,index)=>{
                    return <Picker.Item label={data.order_id} value={data} />
                  })
                  :null
                } 
              </Picker>
        {
          orderId?
          <View style={{width:'100%', justifyContent:'center', alignItems:'center'}}>
            <Text>Order Id : {orderId.order_id}</Text>
            <Text>Pemilik order : {orderId.name}</Text>
            <Text>Waktu Order : {orderId.order_date}</Text>
            <Text>Catatan : {orderId.notes}</Text>
            <Text>Status Pembayaran : {orderId.status}</Text>
        </View>
          :null
        }
     
          <Text>Pilih Payment : </Text>
          <Picker
            selectedValue={payment}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) =>this.setState({payment:itemValue})}
            prompt="Pilih Alamat"
          >
            {
              listPayment && listPayment.message && listPayment.message.length>0?
              listPayment.message.map((data,index)=>{
                return <Picker.Item label={data.bank} value={data.id} />
              })
              :null
            }
          </Picker>
          <TouchableOpacity style={{width:'100%', borderRadius:12,backgroundColor:'#2D4070', height:50,justifyContent:'center',alignItems:'center', marginTop:12}}
            onPress={()=>
            this.props.checkoutOrderRequest({
              auth:this.props.auth.data.access_token, 
              body:{
                "order_no": getorder && getorder.data && getorder.data.length>0?orderId.order_id:null,
                "payment_id": payment
              }
            })
            }
          >
            <Text style={{color:'white'}}>Checkout Order</Text>
          </TouchableOpacity>
          {checkoutorder?
          <Text>{checkoutorder.notes}</Text>
          :null}
      </View>
    )
  }
  Cart =(visible)=>{
    const {cart} = this.props
   
    const qty=[]

    if(cart && cart.data && cart.data.items &&cart.data.items.length){
      cart.data.items.map((data,index)=>{
        qty[index]=data.qty
      })
    }
    if(!cart){
      return(
        <View style={{width:'100%', height:'100%', justifyContent: 'center',alignItems:'center'}}>
          <ActivityIndicator size={'large'} color='blue' style={{width: 50,height:50}}/>
        </View>
      )
    }
    // reactotron.log(cart)
    return(
      <ScrollView style={{height: Dimensions.get('screen').height*0.85}}>
      <View style={{alignItems: 'center', }}>
        <View style={{width:'100%', justifyContent:'flex-end', alignItems:'center',flexDirection:'row'}}>
        <Text onPress={()=>{
              this.props.clearCartRequest(this.props.auth.data.access_token)
              setTimeout(() => {
                this.props.listCartRequest(this.props.auth.data.access_token) 
                }, 1000); 
            }
              } style={{color: 'white',fontSize: 16,backgroundColor:'#2D4070',paddingVertical:10,borderRadius:8,width:'30%',textAlign:'center'}}>Clear Cart</Text>
        </View>
        { cart && cart.data && cart.data.items &&cart.data.items.length>0 ?
          cart.data.items.map((listItem, index) => (
           <View style={{alignItems: 'center',padding: 24, width: '90%',flexDirection:'column'}}>
             <View style={{flexDirection:'row',width:'100%'}}>
               <Image source={{uri:listItem.product_image}} style={{width:80,height:100}}/>
               <View style={{flexDirection:'column',width:'100%', paddingLeft:12}}>
                 <Text style={{color:'#2D4070', fontWeight:'bold', fontSize:16,paddingBottom:8}}>{listItem.name}</Text>
                 <Text style={{color:'#2D4070',paddingVertical:6}}>Rp {listItem.price}</Text>
                 <View style={{flexDirection:'row',width:'70%',justifyContent:'space-between'}}>
                  <Text style={{color:'#2D4070'}}>Qty: {listItem.qty}</Text>
                  <Text style={{color: 'white',fontSize: 12,backgroundColor:'#6A8E78',paddingVertical:2,paddingHorizontal:12,borderRadius:8}}>Total: {listItem.price}</Text>
                  {/* <Text style={{color: 'black',fontSize: 12,backgroundColor:'#E3CA43',paddingVertical:2,paddingHorizontal:12,borderRadius:8}}>OwnStock</Text> */}
                 </View>
              </View>
            </View>
            <View style={{flexDirection:'row',width:'100%',justifyContent:'flex-end'}}>
              {/* <Text onPress={()=>Alert.alert('on development',' this feature still on development')} style={{color: 'white',fontSize: 16,backgroundColor:'#2D4070',paddingVertical:6,borderRadius:8,width:'30%',textAlign:'center'}}>Archive</Text>
              <Text onPress={()=>Alert.alert('on development',' this feature still on development')} style={{color: 'white',fontSize: 16,backgroundColor:'#2D4070',paddingVertical:6,borderRadius:8,width:'30%',textAlign:'center'}}>Edit</Text> */}
              <Text onPress={()=>{
                this.props.deleteCartRequest({
                  auth:this.props.auth.data.access_token, 
                  body:{
                    "product_id" : listItem.product_id
                  }
                })
                setTimeout(() => {
                this.props.listCartRequest(this.props.auth.data.access_token) 
                }, 1000);
              }
              } 
                style={{color: 'white',fontSize: 16,backgroundColor:'red',paddingTop:10,borderRadius:8,width:'30%',textAlign:'center',marginRight:12}}>Delete</Text>
              <TextInput
              value={qty[index]}
              placeholder={'input qty'}
              placeholderTextColor={'#fff'}
              style={{color: 'white',fontSize: 16,backgroundColor:'#2D4070',paddingTop:6,borderRadius:8,marginRight:12,width:'30%',textAlign:'center'}}
              onChangeText={jumlah => qty[index]=jumlah}
              />
               <Text onPress={()=>{
              this.props.updateCartRequest({
                auth:this.props.auth.data.access_token, 
                body:{
                "product_id": listItem.product_id,
                "notes": "yang rapih ya",
                "quantity": qty[index]
                }
              })
              setTimeout(() => {
                this.props.listCartRequest(this.props.auth.data.access_token) 
                }, 1000);
            }
              } style={{color: 'white',fontSize: 16,backgroundColor:'#2D4070',paddingTop:10,borderRadius:8,width:'30%',textAlign:'center'}}>Update</Text>
            </View>
         </View>
        )):null}
      </View>
      </ScrollView>
    )
  }
  History =(visible)=>{
    const {historyOrder}=this.props
    if(!historyOrder){
      return(
        <View style={{width:'100%', height:'100%', justifyContent: 'center',alignItems:'center'}}>
          <ActivityIndicator size={'large'} color='blue' style={{width: 50,height:50}}/>
        </View>
      )
    }
    return(
      <ScrollView style={{height: Dimensions.get('screen').height*0.85}}>
      <View style={{alignItems: 'center', }}>
        { historyOrder && historyOrder.data && historyOrder.data.length>0 ?
         historyOrder.data.map((listItem, index) => (
           <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:50, fontWeight:'600', textAlign:'center',alignSelf:'center'}}>{index+1}</Text>
            <View style={{alignItems: 'center',padding: 24, width: '90%',flexDirection:'column'}}>
             <View style={{flexDirection:'row',width:'100%'}}>
               <View style={{flexDirection:'column',width:'100%', paddingLeft:12}}>
                 <Text style={{color:'#2D4070', fontWeight:'bold', fontSize:16,paddingBottom:8}}> Invoice :{listItem.invoice_no?listItem.invoice_no:'Belum Ada Invoice'}</Text>
                 <Text style={{color:'#2D4070',paddingVertical:6}}>Jenis Pembayaran:  {listItem.jenis_pembayaran}</Text>
                 <Text style={{color:'#2D4070',paddingVertical:6}}>Status Pembayaran:  {listItem.status_pembayaran}</Text>
                 <Text style={{color:'#2D4070',paddingVertical:6}}>Status Pengiriman:  {listItem.status_pengiriman}</Text>
                 <Text style={{color:'#2D4070',paddingVertical:6}}>Tanggal Pemesanan:  {listItem.tanggal_pemesanan}</Text>
                 <Text style={{color:'#2D4070',paddingVertical:6}}>Note:  {listItem.notes}</Text>
              </View>
            </View>
         </View>
          </View>
          
        )):null}
      </View>
      </ScrollView>
    )
  }
  Addons =(visible)=>{
    return(
      <View style={{ }}>
        <Text>Addons</Text>
      </View>
    )
  }
  Mutasi =(visible)=>{
    return(
      <View style={{ }}>
        <Text>Mutasi</Text>
      </View>
    )
  }
  Settings =(visible)=>{
    const {payloadProfile, navigation} = this.props
    if(payloadProfile && payloadProfile.data) {
      const {user_id,username,email,display_name,roles,status,created_at,update_at} = payloadProfile.data
      return(
        <ScrollView>
        <View style={{flex:1,margin:12,paddingVertical:12, }}>
            <TouchableOpacity style={{width:'100%', flexDirection:'row'}} onPress={()=> navigation.navigate('ProfileScreen')}>
              <Image style={{width:60,height:60}} source={Images.clearLogo} PlaceholderContent={<ActivityIndicator />}/>
              <View style={{justifyContent:'center'}}>
                <Text style={{fontWeight:'bold',paddingLeft:8}}>{display_name}</Text>
                <View style={{flexDirection:'row'}}>
                  <Image style={{width:20,height:20}} source={Images.clearLogo} PlaceholderContent={<ActivityIndicator />} />
                  <Text style={{color:'grey'}}>{roles}</Text>
                  <Icon name="chevron-right"  style={{width:20,height:20}}/>
                </View>
              </View>
            </TouchableOpacity>
            {/* menu profile */}
            <View style={{flexDirection:'row',marginTop:12, width:'100%',alignSelf:'baseline',paddingVertical:20,borderColor:'grey', borderWidth:0.5, borderRadius:4, justifyContent:'space-around',alignItems:'center'}}>
              <View style={{width:'30%',alignItems:'center',justifyContent:'center', flexDirection:'column'}}>
                <Image style={{width:40,height:40}} source={Images.clearLogo} PlaceholderContent={<ActivityIndicator />} />
                  <Text style={{color:'grey'}}>TokoMember</Text>
                  <Text style={{fontWeight:'bold'}}>0 Member</Text>
              </View>
              <View style={{width:'30%',alignItems:'center',justifyContent:'center', flexDirection:'column'}}>
                <Image style={{width:40,height:40}} source={Images.clearLogo} PlaceholderContent={<ActivityIndicator />} />
                  <Text style={{color:'grey'}}>TopQuest</Text>
                  <Text style={{fontWeight:'bold'}}>3 Tantangan</Text>
              </View>
              <View style={{width:'30%',alignItems:'center',justifyContent:'center', flexDirection:'column'}}>
                <Image style={{width:40,height:40}} source={Images.clearLogo} PlaceholderContent={<ActivityIndicator />} />
                  <Text style={{color:'grey'}}>Kupon Saya</Text>
                  <Text style={{fontWeight:'bold'}}>11 Kupon</Text>
              </View>
            </View>
            {/* menu dana */}
            <View style={{flexDirection:'column',marginTop:12, width:'100%',alignSelf:'baseline',paddingBottom:12,borderColor:'grey', borderWidth:0.5, borderRadius:4}}>
              <Text style={{fontWeight:'bold',fontSize:16,padding:12}}> Dana di Atur Toko</Text>
              <View style={{flexDirection:'row',marginTop:12, width:'100%', justifyContent:'space-around',alignItems:'center'}}>
                
                <View style={{width:'50%',alignItems:'center',justifyContent:'center', flexDirection:'column'}}>
                  <Image style={{width:40,height:40}} source={Images.clearLogo} PlaceholderContent={<ActivityIndicator />} />
                    <Text style={{color:'grey'}}>Aktivasi</Text>
                    <Text style={{fontWeight:'bold'}}>OVO</Text>
                </View>
                <View style={{width:'50%',alignItems:'center',justifyContent:'center', flexDirection:'column'}}>
                  <Image style={{width:40,height:40}} source={Images.clearLogo} PlaceholderContent={<ActivityIndicator />} />
                    <Text style={{fontWeight:'bold'}}>Rp.0</Text>
                    <Text style={{color:'grey'}}>Saldo</Text>
                </View>
              </View>  
            </View>
            {/* menu Transaksi */}
            <View style={{flexDirection:'column',padding:12, width:'100%',alignSelf:'baseline', borderBottomWidth:0.5, paddingBottom:20}}>
              <Text style={{fontWeight:'700',fontSize:20,paddingVertical:12}}>Transaksi</Text>
              <View style={{flexDirection:'row',width:'100%',alignItems:'center',justifyContent:'space-between'}}>
                <View style={{flexDirection:'column'}}>
                  <Text style={{fontWeight:'normal',fontSize:18}}>Menunggu Pembayaran</Text> 
                  <Text style={{fontWeight:'300',fontSize:18,color:'grey'}}>Semua transaksi yang belum dibayar</Text> 
                </View>
                <Icon name="chevron-right"  style={{width:20,height:20}}/>
              </View>  
            </View>   
             {/* daftar transaksi */}
            <View style={{flexDirection:'column',marginTop:4, width:'100%',alignSelf:'baseline', borderBottomWidth:0.5, paddingBottom:20}}>
              <Text style={{fontSize:16,padding:12}}> Daftar Transaksi</Text>
              <View style={{flexDirection:'row',marginTop:12, width:'100%', justifyContent:'space-around',alignItems:'center'}}>  
                <View style={{width:'25%',alignItems:'center',justifyContent:'center', flexDirection:'column'}}>
                  <Image style={{width:40,height:40}} source={Images.clearLogo} PlaceholderContent={<ActivityIndicator />} />
                    <Text>Belanja</Text>
                </View>
                <View style={{width:'25%',alignItems:'center',justifyContent:'center', flexDirection:'column'}}>
                  <Image style={{width:40,height:40}} source={Images.clearLogo} PlaceholderContent={<ActivityIndicator />} />
                    <Text>Top-up &{'\n'} Tagihan</Text>
                </View>
                <View style={{width:'25%',alignItems:'center',justifyContent:'center', flexDirection:'column'}}>
                  <Image style={{width:40,height:40}} source={Images.clearLogo} PlaceholderContent={<ActivityIndicator />} />
                    <Text>Pesawat</Text>
                </View>
                <View style={{width:'25%',alignItems:'center',justifyContent:'center', flexDirection:'column'}}>
                  <Image style={{width:40,height:40}} source={Images.clearLogo} PlaceholderContent={<ActivityIndicator />} />
                    <Text style={{justifyContent:'center'}}>Lihat{'\n'}Semua</Text>
                </View>
              </View>  
            </View> 
            <View style={{flexDirection:'row',width:'100%',alignItems:'center',justifyContent:'space-between', borderBottomWidth:0.5,padding:12, paddingBottom:20}}>
                <View style={{flexDirection:'column'}}>
                  <Text style={{fontWeight:'normal',fontSize:18}}>Ulasan</Text> 
                  <Text style={{fontWeight:'300',fontSize:18,color:'grey'}}>Berikan Penilaian dan ulasan Product</Text> 
                </View>
                <Icon name="chevron-right"  style={{width:20,height:20}}/>
            </View> 
            <View style={{flexDirection:'row',width:'100%',alignItems:'center',justifyContent:'space-between', borderBottomWidth:0.5,padding:12, paddingBottom:20}}>
                <View style={{flexDirection:'column'}}>
                  <Text style={{fontWeight:'normal',fontSize:18}}>Komplain Sebagai Pembeli</Text> 
                  <Text style={{fontWeight:'300',fontSize:18,color:'grey'}}>lihat status komplain</Text> 
                </View>
                <Icon name="chevron-right"  style={{width:20,height:20}}/>
            </View> 
            {/* favorit saya */}
            <View style={{flexDirection:'column',padding:12, width:'100%',alignSelf:'baseline', paddingBottom:20}}>
              <Text style={{fontWeight:'700',fontSize:20,paddingVertical:12}}>Favorit Saya</Text>
            </View>   
            {/* isi menu favorit */}
            <View style={{flexDirection:'row',width:'100%',alignItems:'center',justifyContent:'space-between', borderBottomWidth:0.5,padding:12, paddingBottom:20}}>
                <View style={{flexDirection:'column'}}>
                  <Text style={{fontWeight:'normal',fontSize:18}}>Topik Favorit</Text> 
                  <Text style={{fontWeight:'300',fontSize:18,color:'grey'}}>Atur topik favorit saya</Text> 
                </View>
                <Icon name="chevron-right"  style={{width:20,height:20}}/>
            </View> 
            <View style={{flexDirection:'row',width:'100%',alignItems:'center',justifyContent:'space-between', borderBottomWidth:0.5,padding:12, paddingBottom:20}}>
                <View style={{flexDirection:'column'}}>
                  <Text style={{fontWeight:'normal',fontSize:18}}>Terakhir Dilihat</Text> 
                  <Text style={{fontWeight:'300',fontSize:18,color:'grey'}}>Cek Produk terakhir yang dilihat</Text> 
                </View>
                <Icon name="chevron-right"  style={{width:20,height:20}}/>
            </View> 
            <View style={{flexDirection:'row',width:'100%',alignItems:'center',justifyContent:'space-between', borderBottomWidth:0.5,padding:12, paddingBottom:20}}>
                <View style={{flexDirection:'column'}}>
                  <Text style={{fontWeight:'normal',fontSize:18}}>Wishlist</Text> 
                  <Text style={{fontWeight:'300',fontSize:18,color:'grey'}}>lihat Produk yang sudah Anda wishlist</Text> 
                </View>
                <Icon name="chevron-right"  style={{width:20,height:20}}/>
            </View> 
            <View style={{flexDirection:'row',width:'100%',alignItems:'center',justifyContent:'space-between', borderBottomWidth:0.5,padding:12, paddingBottom:20}}>
                <View style={{flexDirection:'column'}}>
                  <Text style={{fontWeight:'normal',fontSize:18}}>Toko Favorit</Text> 
                  <Text style={{fontWeight:'300',fontSize:18,color:'grey'}}>Lihat Toko yang sudah Anda favoritkan</Text> 
                </View>
                <Icon name="chevron-right"  style={{width:20,height:20}}/>
            </View> 
            <View style={{flexDirection:'row',width:'100%',alignItems:'center',justifyContent:'space-between', borderBottomWidth:0.5,padding:12, paddingBottom:20}}>
                <View style={{flexDirection:'column'}}>
                  <Text style={{fontWeight:'normal',fontSize:18}}>Langganan</Text> 
                  <Text style={{fontWeight:'300',fontSize:18,color:'grey'}}>Atur & bayar tagihan dalam satu tempat</Text> 
                </View>
                <Icon name="chevron-right"  style={{width:20,height:20}}/>
            </View> 
            {/* Atur toko care */}
            <View style={{flexDirection:'column',padding:12, width:'100%',alignSelf:'baseline', borderBottomWidth:0.5, paddingBottom:20}}>
              <Text style={{fontWeight:'700',fontSize:20,paddingVertical:12}}>AturToko Care</Text>
              <View style={{flexDirection:'row',width:'100%',alignItems:'center',justifyContent:'space-between'}}>
                <View style={{flexDirection:'column'}}>
                  <Text style={{fontWeight:'normal',fontSize:18}}>Pusat bantuan</Text> 
                  <Text style={{fontWeight:'300',fontSize:18,color:'grey'}}>Lihat solusi terbaik dari AturToko Care</Text> 
                </View>
                <Icon name="chevron-right"  style={{width:20,height:20}}/>
              </View>  
            </View>  
  
            <View style={styles.body}>
              <View style={styles.bodyContent}>
                
                {/* <Text style={styles.description}>Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,</Text>
                <TouchableOpacity style={styles.buttonContainer} onPress={()=> Alert.alert('Whoopss','On Development')}>
                  <Text>Edit Profile</Text>  
                </TouchableOpacity>               */}
                <TouchableOpacity style={styles.buttonContainer} onPress={()=> {
                  this.props.authSuccess(null)
                  this.props.loginSuccess(null)
                  this.props.navigation.replace('LoginScreen')
                  }}>
                  <Text>Logout</Text> 
                </TouchableOpacity>
              </View>
          </View>
        </View>
        </ScrollView>
      )
    }else{
      return (
        <View style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height,justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator size="large" color="#00ff00"/>
        </View>
      )
    }
    
  }

  updateSearch = (search) => {
    this.setState({ search });
  };
  render () {
    const {addAddressRequest, province,cities,district,subdistrict,payloadProfile} = this.props
    const { selectedMenu,search,visible,statusAddProduct,addAdress,createAddress } = this.state
    return (
      <View style={[{flex:1,height:'100%',backgroundColor:'#F5F5F5'}]}>
        {
        //   selectedMenu ==='EXPLORE' ?
        //   <SearchBar
        //   placeholder="coba cari disini ....."
        //   onChangeText={this.updateSearch}
        //   value={search}
        //   leftIcon={Images.logo}
        //   lightTheme
        //   round
        //   placeholderTextColor={'#add8e6'}
        //   containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 5}}
        //   showLoading={true}
        //   style={{backgroundColor:"white"}}
        //   inputStyle={{backgroundColor: '#add8e6'}}
        //   inputContainerStyle={{backgroundColor: '#add8e6'}}
        // />:
        //   selectedMenu==='PROFILE'?
        //   <Header
        //   placement="left"
        //   centerComponent={{ text: selectedMenu, style: { color: '#fff' } }}
        //   backgroundColor={'#add8e6'}
        // />
        //   :
          <Header
          leftComponent={<TouchableOpacity onPress={()=>this.toggleOverlay()}><Icon name="menu" color="#2D4070" ></Icon></TouchableOpacity>}
          centerComponent={<Image source={Images.logo} style={{width:Dimensions.get('screen').width*0.3,height:Dimensions.get('screen').height*0.05}}/>}
          rightComponent={
            <View style={{flexDirection:'row',justifyContent:'space-around', width:100}}>
              <TouchableOpacity
                onPress={() =>Alert.alert('in development')}
                style={{alignItems:'center'}}
              >
                <Image source={Images.icon_notif} style={{width:28,height:28}}/>
              </TouchableOpacity>
              <TouchableOpacity
              onPress={() =>Alert.alert('in development')}
              style={{alignItems:'center'}}
            >
             <Image source={Images.icon_gift} style={{width:28,height:28}}/>
            </TouchableOpacity>
          </View>
          }
          backgroundColor={'#fff'}
          containerStyle={{marginTop:0, }}
        /> 
        }
      
        <KeyboardAvoidingView>
         {
           selectedMenu ==='DASHBOARD'?
            this.Dashboard(visible):null
         }
         {
             selectedMenu === 'PRODUCT' ?
             
             this.Product(search,visible,statusAddProduct):null
         }
         {
          selectedMenu === 'ORDER' ?
          this.Order(visible):null
         }
         {
          selectedMenu==='PAYMENT' ?
          this.Payment(visible):null
         }
         {

          selectedMenu==='CART' ?
          this.Cart(visible):null
         }
         {
          selectedMenu==='HISTORY' ?
          this.History(visible):null
         }
         {

          selectedMenu==='ADDONS'?
          this.Addons(visible):null
         }
         {
          selectedMenu==='MUTASI' ?
          this.Mutasi(visible):null
         }
         {
          selectedMenu === 'SETTINGS'?
          this.Settings(visible):
          null
         }
        </KeyboardAvoidingView>
        {/* {this.MenuBar(selectedMenu)} */}
        <Overlay 
          isVisible={visible} 
          onBackdropPress={()=>this.toggleOverlay()} 
          overlayStyle={{width:'50%',height:'100%',marginLeft:'-50%'}}
          animated={true}
          animationType={'fade'}
          >
            <View style={{width:'100%',height:'12%',flexDirection:'row',alignItems:'center',justifyContent:'space-around',padding:10,paddingVertical:20}}>
              <Image source={Images.user_icon} style={{width:40,height:40, borderRadius:20}} />
              <Text style={{color:'#2C7D28',fontSize:20,lineHeight:25, fontWeight:'700',width:'50%'}} numberOfLines={3}>{payloadProfile&&payloadProfile.data?payloadProfile.data.display_name:''}</Text>
            </View>
            <TouchableOpacity style={styles.sideBar} 
              onPress={()=>
                {
                  this.setState({selectedMenu: 'DASHBOARD'}) 
                  this.toggleOverlay()
                }
              }>
              <Image source={Images.user_icon} style={styles.iconMenuSideBar} />
              <Text style={styles.textMenuSidebar} >Dashboard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sideBar} 
              onPress={()=>
                {
                  this.setState({selectedMenu: 'PRODUCT'}) 
                  this.toggleOverlay()
                }}>
              <Image source={Images.user_icon} style={styles.iconMenuSideBar} />
              <Text style={styles.textMenuSidebar} >Product</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sideBar} 
              onPress={()=>
                {
                  this.setState({selectedMenu: 'ORDER'}) 
                  this.toggleOverlay()
                }}>
              <Image source={Images.user_icon} style={styles.iconMenuSideBar} />
              <Text style={styles.textMenuSidebar} >Order</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sideBar} 
              onPress={()=>
                {
                  this.setState({selectedMenu: 'PAYMENT'}) 
                  this.toggleOverlay()
                }}>
              <Image source={Images.user_icon} style={styles.iconMenuSideBar} />
              <Text style={styles.textMenuSidebar} >Payment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sideBar} 
              onPress={()=>
                { 
                  this.setState({selectedMenu: 'CART'}) 
                  this.toggleOverlay()
                 
                }}>
              <Image source={Images.user_icon} style={styles.iconMenuSideBar} />
              <Text style={styles.textMenuSidebar} >Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sideBar} 
              onPress={()=>
                {
                  this.setState({selectedMenu: 'HISTORY'}) 
                  this.toggleOverlay()
                }}>
              <Image source={Images.user_icon} style={styles.iconMenuSideBar} />
              <Text style={styles.textMenuSidebar} >History</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sideBar} 
              onPress={()=>
                {
                  this.setState({selectedMenu: 'ADDONS'}) 
                  this.toggleOverlay()
                }
              }>
              <Image source={Images.user_icon} style={styles.iconMenuSideBar} />
              <Text style={styles.textMenuSidebar} >Addons</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sideBar} 
              onPress={()=>
                {
                  this.setState({selectedMenu: 'MUTASI'}) 
                  this.toggleOverlay()
                }
              }>
              <Image source={Images.user_icon} style={styles.iconMenuSideBar} />
              <Text style={styles.textMenuSidebar} >Mutasi</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sideBar} 
              onPress={()=>
                {
                  this.setState({selectedMenu: 'SETTINGS'}) 
                  this.toggleOverlay()
                }
              }>
              <Image source={Images.user_icon} style={styles.iconMenuSideBar} />
              <Text style={styles.textMenuSidebar} >Settings</Text>
            </TouchableOpacity>
            
        </Overlay>
        {/* add address */}

        <Overlay isVisible={addAdress} onBackdropPress={()=> this.setState({addAdress: !addAdress})} overlayStyle={{padding:20, width:'90%',borderRadius:12}}>
            <ScrollView>
            <Text>Nama Alamat</Text>
            <TextInput
            value={createAddress.address_label}
            multiline = {true}
            placeholder={'Nama Tempat'}
            placeholderTextColor={'#2D4070'}
            style={{color: '#2D4070',fontSize: 16,borderColor:'#2D4070',borderWidth:1,paddingTop:6,borderRadius:8,marginRight:12,width:'100%',height:50,textAlign:'auto'}}
            onChangeText={note => this.setState({
              createAddress: {
                ...createAddress,
                address_label:note
              }
            })}
            numberOfLines={1}
            ></TextInput>
            <Text>Alamat</Text>
            <TextInput
            value={createAddress.address_line1}
            multiline = {true}
            placeholder={'Alamat'}
            placeholderTextColor={'#2D4070'}
            style={{color: '#2D4070',fontSize: 16,borderColor:'#2D4070',borderWidth:1,paddingTop:6,borderRadius:8,marginRight:12,width:'100%',height:50,textAlign:'auto'}}
            onChangeText={note => this.setState({
              createAddress: {
                ...createAddress,
                address_line1:note
              }
            })}
            numberOfLines={2}
            ></TextInput>
            <Text>Detail Alamat</Text>
            <TextInput
            value={createAddress.address_line2}
            multiline = {true}
            placeholder={'Detail Alamat'}
            placeholderTextColor={'#2D4070'}
            style={{color: '#2D4070',fontSize: 16,borderColor:'#2D4070',borderWidth:1,paddingTop:6,borderRadius:8,marginRight:12,width:'100%',height:50,textAlign:'auto'}}
            onChangeText={note => this.setState({
              createAddress: {
                ...createAddress,
                address_line2:note
              }
            })}
            numberOfLines={2}
            ></TextInput>
            <Text>Provinsi</Text>
              <Picker
                selectedValue={createAddress.province_id}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) =>this.setState({
                  createAddress: {
                    ...createAddress,
                    province_id:itemValue
                  }
                })}
                prompt="Pilih Provinsi"
              >
                  {
                  province && province.data && province.data.length>0?
                  province.data.map((data,index)=>{
                    return <Picker.Item label={data.nama} value={data.id} />
                  })
                  :null
                } 
              </Picker>
            <Text>Kota/Kabupaten</Text>
            <Picker
                selectedValue={createAddress.city_id}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) =>this.setState({
                  createAddress: {
                    ...createAddress,
                    city_id:itemValue
                  }
                })}
                prompt="Pilih Kota/Kabupaten"
              >
                  {
                  cities && cities.data && cities.data.length>0?
                  cities.data.map((data,index)=>{
                    return <Picker.Item label={data.nama} value={data.id} />
                  })
                  :null
                } 
              </Picker>
            <Text>Kecamatan</Text>
            <Picker
                selectedValue={createAddress.district_id}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) =>this.setState({
                  createAddress: {
                    ...createAddress,
                    district_id:itemValue
                  }
                })}
                prompt="Pilih Kota/Kabupaten"
              >
                  {
                  district && district.data && district.data.length>0?
                  district.data.map((data,index)=>{
                    return <Picker.Item label={data.nama} value={data.id} />
                  })
                  :null
                } 
              </Picker>
            <Text>Desa</Text>
            <Picker
                selectedValue={createAddress.subdistrict_id}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) =>this.setState({
                  createAddress: {
                    ...createAddress,
                    subdistrict_id:itemValue
                  }
                })}
                prompt="Pilih Desa"
              >
                  {
                  subdistrict && subdistrict.data && subdistrict.data.length>0?
                  subdistrict.data.map((data,index)=>{
                    return <Picker.Item label={data.nama} value={data.id} />
                  })
                  :null
                } 
              </Picker>
            <Text>Kode Pos</Text>
              <TextInput
              value={createAddress.zip_code}
              multiline = {true}
              keyboardType={'number-pad'}
              placeholder={'Kode Pos'}
              placeholderTextColor={'#2D4070'}
              style={{color: '#2D4070',fontSize: 16,borderColor:'#2D4070',borderWidth:1,paddingTop:6,borderRadius:8,marginRight:12,width:'100%',height:50,textAlign:'auto'}}
              onChangeText={note => this.setState({
                createAddress: {
                  ...createAddress,
                  zip_code:note
                }
              })}
              numberOfLines={1}
              ></TextInput>
            <Text>Catatan</Text>
              <TextInput
                value={createAddress.notes}
                multiline = {true}
                placeholder={'Catatan'}
                placeholderTextColor={'#2D4070'}
                style={{color: '#2D4070',fontSize: 16,borderColor:'#2D4070',borderWidth:1,paddingTop:6,borderRadius:8,marginRight:12,width:'100%',height:50,textAlign:'auto'}}
                onChangeText={note => this.setState({
                  createAddress: {
                    ...createAddress,
                    notes:note
                  }
                })}
                numberOfLines={3}
                ></TextInput>
            <Text>Nomor HP</Text>
            <TextInput
                value={createAddress.phone_no}
                multiline = {true}
                keyboardType={'number-pad'}
                placeholder={'Phone Number'}
                placeholderTextColor={'#2D4070'}
                style={{color: '#2D4070',fontSize: 16,borderColor:'#2D4070',borderWidth:1,paddingTop:6,borderRadius:8,marginRight:12,width:'100%',height:50,textAlign:'auto'}}
                onChangeText={note => this.setState({
                  createAddress: {
                    ...createAddress,
                    phone_no:note
                  }
                })}
                numberOfLines={3}
                ></TextInput>
            
            <TouchableOpacity 
            
            style={{width:'60%', borderRadius:12,backgroundColor:'#2D4070',justifyContent:'center',alignItems:'center', marginTop:12, padding:12}}
            onPress={async()=> {
              // alert(JSON.stringify(createAddress))
           await  addAddressRequest({
              auth:this.props.auth.data.access_token, 
              body:createAddress
            })

          await addressRequest(this.props.auth.data.access_token)  
            this.setState({createAddress:{
              address_label: "",
              address_line1: "",
              address_line2: "",
              province_id: "",
              city_id: "",
              district_id: "",
              subdistrict_id: "",
              zip_code: "",
              notes: "",
              phone_no: ""
            }})
            this.setState({addAdress: !addAdress})
              }
            }
            >
            <Text style={{color:"white"}}>Submit Address</Text>
            </TouchableOpacity>
            </ScrollView>
          </Overlay>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataProfile:state.profile.data,
    fetchingProfile:state.profile.fetching,
    payloadProfile:state.profile.payload,
    errorProfile:state.profile.error,
    auth:state.auth.payload,
    product:state.product.payload,
    cart: state.cart.payload,
    listAddress: state.listAddress.payload,
    listPayment:state.listPayment.payload,
    listLogistic: state.listLogistic.payload,
    getorder: state.getorder.payload,
    checkoutorder: state.checkoutorder.payload,
    province: state.province.payload,
    cities: state.cities.payload,
    district: state.district.payload,
    subdistrict: state.subdistrict.payload,
    historyOrder: state.historyOrder.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    Object.assign(
      AuthActions,
      ProfileActions,
      ProductActions,
      LoginActions,
      CartRedux,
      ListCartRedux,
      UpdateCartRedux,
      DeleteCartRedux,
      ClearCartRedux,
      CreateOrderRedux,
      PaymentRedux,
      AddressRedux,
      LogisticRedux,
      GetOrderRedux,
      CheckoutOrderRedux,
      AddAddressRedux,
      ProviceRedux,
      CitiesRedux,
      DistrictRedux,
      SubDistrictRedux,
      HistoryOrderRedux
      ) , dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen)
