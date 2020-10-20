import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView, Image, Dimensions, ActivityIndicator,TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import DetailProductRedux from '../Redux/DetailProductRedux'
import AuthRedux from '../Redux/AuthRedux'
import CartRedux from '../Redux/CartRedux'

// Styles
import styles from './Styles/DetailProductScreenStyle'
import { Header,Icon } from 'react-native-elements'
import { ScrollView, TextInput } from 'react-native-gesture-handler'

class DetailProductScreen extends Component {
  componentDidMount(){
    const {detailProductRequest,auth,navigation} = this.props
    const { getParam } =  navigation;
    detailProductRequest({
      auth:auth.data.access_token, 
      body:{
        "id_product" : getParam('itemId')
      }
    })
  }
  render () {
    const {detail, fetching,navigation,auth,addcart} = this.props
    const { getParam } =  navigation
    const qty=[]
    const {height,width} = Dimensions.get('screen')
    if(fetching || !detail || addcart){
      return (
        <View style={{width:width,height:height, justifyContent:'center', alignItems:'center' }}>
          <ActivityIndicator animating={true} size={'large'} color={'blue'}  style={{width:100, height:100}}/>
        </View>
      )
    }
    return (
        <View style={{flex:1, width:width, height:height, flexDirection:'column',alignItems:'center',marginVertical:12}}> 
          <Header
            leftComponent={<TouchableOpacity onPress={()=>navigation.goBack()}><Icon name="chevron-left" color="#2D4070" size={40}></Icon></TouchableOpacity>}
            centerComponent={{ text: 'Detail Product', style: { color: '#fff', fontSize:20 } }}
            containerStyle={{alignItems:'center', justifyContent:'center', marginTop:-12}}
          />
          <ScrollView>
          <Image source={{uri:detail.url}}  style={{width:width, height:200}}/>
          <View style={{margin: 12}}>
            <View style={{flexDirection:'row'}}>
              <Text style={{color:'black', fontWeight:'bold'}}>Nama Product :</Text>
              <Text>{'\t'}{detail.name}</Text>
            </View>
            <View style={{flexDirection:'column'}}>
                <Text style={{color:'black', fontWeight:'bold'}}>Desription</Text>
                <Text numberOfLines={4} style={{textAlign:'justify'}}>{detail.description}</Text>
            </View>
            <View style={{flexDirection:'column'}}>
                <Text style={{color:'black', fontWeight:'bold'}}>Caption: </Text>
                <Text numberOfLines={4} style={{textAlign:'justify'}}>{detail.caption}{'\n'}</Text>
            </View>
            <Text style={{color:'black', fontWeight:'bold'}}>Harga: Rp.{detail.price}</Text>
            <Text style={{color:'black', fontWeight:'bold'}}>Stock: {detail.stock}</Text>
          
          </View>
          {/* <Text>{JSON.stringify(detail)}</Text> */}
         </ScrollView>
         <View>
            <View style={{flexDirection:'row',width:'100%',justifyContent:'space-around',alignSelf:'flex-end'}}>
                {/* <Text onPress={()=>Alert.alert('on development',' this feature still on development')} style={{color: 'white',fontSize: 16,backgroundColor:'#2D4070',paddingVertical:6,borderRadius:8,width:'30%',textAlign:'center'}}>Archive</Text>
                <Text onPress={()=>Alert.alert('on development',' this feature still on development')} style={{color: 'white',fontSize: 16,backgroundColor:'#2D4070',paddingVertical:6,borderRadius:8,width:'30%',textAlign:'center'}}>Edit</Text> */}
                <Text style={{width:'50%', textAlign:'center', alignSelf:'center'}} numberOfLines={4}>Input jumlah yang dipesan</Text>
                <TextInput
                value={qty[0]}
                placeholder={'0'}
                placeholderTextColor={'#2D4070'}
                style={{color: '#2D4070',fontSize: 16,borderColor:'#2D4070', borderWidth:1,paddingTop:6,borderRadius:8,marginRight:12,width:'15%',textAlign:'center'}}
                onChangeText={jumlah => qty[0]=jumlah}
                />
                <Text onPress={()=>{
                this.props.cartRequest({
                  auth:auth.data.access_token, 
                  body:{
                  "product_id": getParam('itemId'),
                  "notes": "yang rapih ya",
                  "quantity": qty[0]
                  }
                })
              
              }
                
                } style={{color: 'white',fontSize: 16,backgroundColor:'#2D4070',paddingTop:10,borderRadius:8,width:'30%',textAlign:'center'}}>Add to Cart</Text>
              </View>            
            </View>
        </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    detail: state.detailProduct.payload,
    fetching: state.detailProduct.fetching,
    auth: state.auth.payload,
    addcart: state.addcart.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    Object.assign(
      DetailProductRedux,
      AuthRedux,
      CartRedux
    ),dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailProductScreen)
