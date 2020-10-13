import React, { Component } from 'react'
import { ScrollView, Text, View,TouchableOpacity, Dimensions } from 'react-native'
import { Header,Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import ProfileActions from '../Redux/ProfileRedux'
// Styles
import styles from './Styles/ProfileScreenStyle'

class ProfileScreen extends Component {
  render () {
    const { width, heigth} = Dimensions.get('screen')
    const {navigation,payloadProfile} = this.props
    const {user_id,username,email,display_name,roles,status,created_at,update_at} = payloadProfile.data
    return (
    <View style={{alignItems: 'center', width: width,flexDirection:'column'}}>
     <Header
            leftComponent={<TouchableOpacity onPress={()=>navigation.goBack()}><Icon name="chevron-left" color="#2D4070" size={40}></Icon></TouchableOpacity>}
            centerComponent={{ text: 'Detail Product', style: { color: '#fff', fontSize:20 } }}
            containerStyle={{alignItems:'center', justifyContent:'center'}}
          />
      <View style={{flexDirection:'row',width:'100%'}}>
        <View style={{flexDirection:'column',width:'100%', paddingLeft:12}}> 
          <Text style={{color:'#2D4070',paddingVertical:6}}>Username:  {username}</Text>
          <Text style={{color:'#2D4070',paddingVertical:6}}>Email:  {email}</Text>
          <Text style={{color:'#2D4070',paddingVertical:6}}>Display Name:  {display_name}</Text>
          <Text style={{color:'#2D4070',paddingVertical:6}}>Role:  {roles}</Text>
       </View>
     </View>
    </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    payloadProfile:state.profile.payload,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(ProfileActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
