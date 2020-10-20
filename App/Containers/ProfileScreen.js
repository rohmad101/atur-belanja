import React, { Component } from 'react'
import { ScrollView, Text, View,TouchableOpacity, Dimensions, Alert } from 'react-native'
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
    const { navigation } = this.props
    return (
    <View style={{alignItems: 'center', width: width,flexDirection:'column'}}>
     <Header
            leftComponent={<TouchableOpacity onPress={()=>navigation.goBack()}><Icon name="chevron-left" color="white" size={40}></Icon></TouchableOpacity>}
            centerComponent={{ text: 'Atur Akun', style: { color: '#fff', fontSize:20 } }}
            containerStyle={{alignItems:'center', justifyContent:'center',backgroundColor:'#50E348'}}
          />
      <View style={{flexDirection:'column',width:'100%'}}>
      <TouchableOpacity onPress={()=>Alert.alert('Still on Development')}>
        <View style={{flexDirection:'row',width:'100%', padding:20,alignItems:'center',justifyContent:'space-between'}}> 
          <Text style={{fontSize:16}}>Data Diri</Text>
          <Icon name="chevron-right" color="grey" size={20}></Icon>
        </View>
       </TouchableOpacity>
       <TouchableOpacity onPress={()=>navigation.navigate('DaftarAlamatScreen')}>
        <View style={{flexDirection:'row',width:'100%', padding:20,alignItems:'center',justifyContent:'space-between'}}> 
          <Text style={{fontSize:16}}>Daftar Alamat</Text>
          <Icon name="chevron-right" color="grey" size={20}></Icon>
        </View>
       </TouchableOpacity>
       <TouchableOpacity onPress={()=>Alert.alert('Still on Development')}>
        <View style={{flexDirection:'row',width:'100%', padding:20,alignItems:'center',justifyContent:'space-between'}}> 
          <Text style={{fontSize:16}}>Akun Bank</Text>
          <Icon name="chevron-right" color="grey" size={20}></Icon>
        </View>
       </TouchableOpacity>
       <TouchableOpacity onPress={()=>Alert.alert('Still on Development')}>
        <View style={{flexDirection:'row',width:'100%', padding:20,alignItems:'center',justifyContent:'space-between'}}> 
          <Text style={{fontSize:16}}>AturToko Corner</Text>
          <Icon name="chevron-right" color="grey" size={20}></Icon>
        </View>
       </TouchableOpacity>
       <Text style={{fontSize:20, fontWeight:'bold', padding:20}}>Keamanan</Text>
       <TouchableOpacity onPress={()=>Alert.alert('Still on Development')}>
        <View style={{flexDirection:'row',width:'100%', padding:20,alignItems:'center',justifyContent:'space-between'}}> 
          <Text style={{fontSize:16}}>Ubah Kata Sandi</Text>
          <Icon name="chevron-right" color="grey" size={20}></Icon>
        </View>
       </TouchableOpacity>
       <TouchableOpacity onPress={()=>Alert.alert('Still on Development')}>
        <View style={{flexDirection:'row',width:'100%', padding:20,alignItems:'center',justifyContent:'space-between'}}> 
          <Text style={{fontSize:16}}>Pin AturToko</Text>
          <Icon name="chevron-right" color="grey" size={20}></Icon>
        </View>
       </TouchableOpacity>
       <TouchableOpacity onPress={()=>Alert.alert('Still on Development')}>
        <View style={{flexDirection:'row',width:'100%', padding:20,alignItems:'center',justifyContent:'space-between'}}> 
          <Text style={{fontSize:16}}>Authenticator</Text>
          <Icon name="chevron-right" color="grey" size={20}></Icon>
        </View>
       </TouchableOpacity>
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
