import React, { Component } from 'react'
import { TouchableOpacity, Text, Image, Alert } from 'react-native'
import { View } from 'react-native-animatable'
import { connect } from 'react-redux'
import reactotron from 'reactotron-react-native'
import { Images } from '../Themes'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/OnBoardingScreenStyle'

class OnBoardingScreen extends Component {
  state={
    index:1
  }
  Slide1(){
    return(
      <View style={{padding:12,paddingBottom:24,alignItems:'center',height:'80%',justifyContent:'space-between'}}>
         <View>
          <Text style={{fontWeight:'bold',fontSize:20,paddingTop:12}}>Selamat Datang Di Atur Belanja1</Text>
        </View>
        <View style={{alignItems:'center',padding:24}}>
          <Image source={Images.launch} style={styles.logo} />
          <Text style={{fontWeight:'bold',fontSize:14,paddingVertical:12,textAlign:'justify'}}>Selamat Datang Di Atur Belanja</Text>
          <Text style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
        </View>
      </View>
    )
  }
  Slide2(){
    return(
      <View style={{padding:12,paddingBottom:24,alignItems:'center',height:'80%',justifyContent:'space-between'}}>
         <View>
          <Text style={{fontWeight:'bold',fontSize:20,paddingTop:12}}>Selamat Datang Di Atur Belanja2</Text>
        </View>
        <View style={{alignItems:'center',padding:24}}>
          <Image source={Images.deviceInfo} style={styles.logo} />
          <Text style={{fontWeight:'bold',fontSize:14,paddingVertical:12,textAlign:'justify'}}>Selamat Datang Di Atur Belanja</Text>
          <Text style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
        </View>
      </View>
    )
  }
  Slide3(){
    return(
      <View style={{padding:12,paddingBottom:24,alignItems:'center',height:'80%',justifyContent:'space-between'}}>
         <View>
          <Text style={{fontWeight:'bold',fontSize:20,paddingTop:12}}>Selamat Datang Di Atur Belanja3</Text>
        </View>
        <View style={{alignItems:'center',padding:24}}>
          <Image source={Images.clearLogo} style={styles.logo} />
          <Text style={{fontWeight:'bold',fontSize:14,paddingVertical:12,textAlign:'justify'}}>Selamat Datang Di Atur Belanja</Text>
          <Text style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
        </View>
      </View>
    )
  }
  render () {
    const {index}= this.state
    if(this.props.status) {
      this.props.navigation.replace('DashboardScreen')
    }
    return (
      <View style={{flex:1,padding:12,paddingBottom:24,alignItems:'center',justifyContent:'space-between'}}>
        {index===1?this.Slide1():
        index===2?this.Slide2()
        :this.Slide3()
        }
         { index===3?
          <View style={{flexDirection:'row',justifyContent:'space-around',width:'100%'}}>
         
          <TouchableOpacity 
            style={{width:'40%',maxWidth:200,height:50,backgroundColor:'#1e90ff',alignItems:'center',justifyContent:'center',borderRadius:8}}
            onPress={() =>this.props.navigation.replace('LoginScreen')}>
            <Text style={{fontWeight:'bold',color:'white'}}>Login</Text>
          </TouchableOpacity>
        </View>
          :
          <View style={{flexDirection:'row',justifyContent:'space-around',width:'100%'}}>
         
          <TouchableOpacity 
            style={{width:'40%',maxWidth:200,height:50,backgroundColor:'#1e90ff',alignItems:'center',justifyContent:'center',borderRadius:8}}
            onPress={() =>this.props.navigation.replace('LoginScreen')}>
            <Text style={{fontWeight:'bold',color:'white'}}>Lewati</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{width:'40%',maxWidth:200,height:50,backgroundColor:'#e6c000',alignItems:'center',justifyContent:'center',borderRadius:8}}
            onPress={() => this.setState({index:this.state.index<3?this.state.index+1:this.props.navigation.replace('LoginScreen')})}>
            <Text style={{fontWeight:'bold',color:'white'}}>Next</Text>
          </TouchableOpacity>
        </View>
          }
        
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const {payload} = state.auth
  reactotron.log('payload',payload)
  return {
    status: payload?true:false
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OnBoardingScreen)
