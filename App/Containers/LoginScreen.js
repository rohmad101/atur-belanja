import { symbol } from 'prop-types'
import React, { Component } from 'react'
import { Text, KeyboardAvoidingView, Dimensions, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import { View } from 'react-native-animatable'
import { SearchBar,Header,Divider,Image,Input } from 'react-native-elements';
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { Images } from '../Themes'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import LoginActions from '../Redux/LoginRedux'

// Styles
import styles from './Styles/LoginScreenStyle'
import { bindActionCreators } from 'redux'

class LoginScreen extends Component {
  state = {
    email: '',
    password:''
  };

  Submit=()=>{
    // const {Login}=this.props
    let data={
      "username": this.state.email,
      "password": this.state.password
    }
    this.props.loginRequest(data)
    // Login(data)
  }
  
  render () {
    const width = Dimensions.get('screen').width
    const heigth  =Dimensions.get('screen').height
    if(this.props.status) {
      this.props.navigation.replace('DashboardScreen')
    }
    if(this.props.fetching){
      return(
        <View style={{flex:1}}>
          <ActivityIndicator/>
        </View>
      )
    }
    return (
      <ScrollView>
      <View style={{flex:1}}> 
      <KeyboardAvoidingView  style={{flex:1, alignItems:'center',width:'100%',padding:8}}>
         <Header
          centerComponent={<Image source={Images.logo} style={{width:Dimensions.get('screen').width*0.3,height:Dimensions.get('screen').height*0.05}}/>}
          rightComponent={
            <TouchableOpacity
              onPress={() =>this.props.navigation.navigate('SingupScreen')}
              style={{alignItems:'center'}}
            >
                <Text style={{color:'#395573',fontSize:18,fontWeight:'bold'}}>SING UP</Text>
            </TouchableOpacity>
          }
          backgroundColor={'#fff'}
          containerStyle={{marginTop:-8}}
        /> 
        <View style={{width:'100%', alignItems:'center'}}>
          <Image source={Images.background_login} style={styles.logo} />
        <Text style={{fontSize:26,color:'#395573',fontWeight:'bold', lineHeight:24,paddingBottom:24,marginTop:-30}}>Sell more, easier</Text>
        <Input
          placeholder='Email/Username'
          leftIcon={
            <Image source={Images.user_icon} style={{width:24,height:24,marginLeft:16,marginRight:20}}/>
          }
          errorStyle={{ color: 'red' }}
          errorMessage={null}
          value={this.state.email} 
          onChangeText={(email=>this.setState({email}))}
          containerStyle={{width:'60%', borderWidth:2,borderColor:'#50E348',borderRadius:8,height:50}}
        />
        <Input 
          placeholder="Password" 
          secureTextEntry={true} 
          leftIcon={
          <Image source={Images.password_icon} style={{width:48,height:48,marginRight:12}}/>
        }
          containerStyle={{width:'60%', borderWidth:2,borderColor:'#50E348',borderRadius:8,marginTop:24,height:50}}
          value={this.state.password} 
          onChangeText={(password=>this.setState({password}))}
        />
        <TouchableOpacity onPress={()=> Alert.alert('Whooopss !!',' On Development')}>
          <Text>Forgot Password ?</Text>
        </TouchableOpacity>
        </View>
        <View style={{justifyContent:'space-around',alignItems:'center',flexDirection:'row',width:'100%'}}>
          <TouchableOpacity
            style={{width:width*0.24,alignItems:'center',padding:10, backgroundColor:'#2D4070', borderRadius:8,marginTop:12}}
            onPress={() =>this.Submit()}
          >
            <Text style={{color:'white'}}>SIGN IN</Text>
          </TouchableOpacity>
        </View>
        <Divider style={{ backgroundColor: 'grey',width:'100%',marginTop:20 }} />
        <Text style={{marginTop:-12,paddingHorizontal:24, backgroundColor:'white'}}>or</Text>
        <View style={{width:'100%',justifyContent:'space-around',flexDirection:'row',marginTop:48}}>
          <View style={{justifyContent:'space-around',flexDirection:'row',alignItems:'center',borderWidth:2,borderColor:'#50E348',paddingRight:20,borderRadius:8}}>
            <Image source={Images.icon_google} style={{width:48,height:48,marginRight:12}}/>
            <Text style={{fontSize:24,color:'grey'}}>Google</Text>
          </View>
          <View style={{justifyContent:'space-around',flexDirection:'row',alignItems:'center',borderWidth:2,borderColor:'#50E348',paddingRight:20,borderRadius:8}}>
            <Image source={Images.icon_facebook} style={{width:48,height:48,marginRight:12}}/>
            <Text style={{fontSize:24,color:'grey'}}>Facebook</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
      </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  const {auth} = state
  const {payload,fetching} = auth
  // console.tron.log(state)
  return {
    status: payload?true:false,
    fetching:fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(LoginActions, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
