import React, { useState,useEffect } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, TouchableOpacity, Dimensions } from 'react-native'
import { Header, Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import {AddAddress} from './components/AddAddress';
// Add Actions - replace 'Your' with whatever your reducer is called :)
import AuthActions from '../Redux/AuthRedux'
import AddAddressRedux from '../Redux/AddAddressRedux'
import AddressRedux from '../Redux/AddressRedux'
import ProviceRedux from '../Redux/ProviceRedux'
import CitiesRedux from '../Redux/CitiesRedux'
import DistrictRedux from '../Redux/DistrictRedux'
import SubDistrictRedux from '../Redux/SubDistrictRedux'

// Styles
import styles from './Styles/DaftarAlamatScreenStyle'
import { View } from 'react-native-animatable';

function DaftarAlamatScreen (props){
  const [addAdress,setaddAdress] = useState(false)
  const [address_label,setaddress_label] = useState('')
  const [address_line1,setaddress_line1] = useState('')
  const [address_line2,setaddress_line2] = useState('')
  const [province_id,setprovince_id] = useState('')
  const [city_id,setcity_id] = useState('')
  const [district_id,setdistrict_id] = useState('')
  const [subdistrict_id,setsubdistrict_id] = useState('')
  const [zip_code,setzip_code] = useState('')
  const [notes,setnotes] = useState('')
  const [phone_no,setphone_no] = useState('')
  const [createAddress,setcreateAddress]= useState({})
  const { navigation,province,cities,district,subdistrict,auth,proviceRequest,citiesRequest,districtRequest,subDistrictRequest,addressRequest,listAddress }=props
  const {width, heigth}= Dimensions.get('screen')
  useEffect(()=>{
    proviceRequest(auth.data.access_token)
    addressRequest(auth.data.access_token) 
  },[])
  useEffect(()=> {
    citiesRequest({
      auth: auth.data.access_token, 
      body:province_id
    })
  },[province_id])
  useEffect(()=> {
    districtRequest({
      auth: auth.data.access_token, 
      body:city_id
    })
  },[city_id])
  useEffect(()=> {
    subDistrictRequest({
      auth: auth.data.access_token, 
      body:district_id
    })
  },[district_id])

  useEffect(()=>{
    setcreateAddress({
        address_label:address_label,
        address_line1:address_line1,
        address_line2:address_line2,
        province_id:province_id,
        city_id:city_id,
        district_id:district_id,
        subdistrict_id:subdistrict_id,
        zip_code:zip_code,
        notes:notes,
        phone_no:phone_no
    })
},[address_label,address_line1,address_line2,province_id,city_id,district_id,subdistrict_id,zip_code,notes,phone_no])
    return (
      <ScrollView style={styles.container}>
          <Header
            placement='left'
            leftComponent={<TouchableOpacity onPress={()=>navigation.pop()}><Icon name="chevron-left" color="white" size={40}></Icon></TouchableOpacity>}
            centerComponent={{ text: 'Daftar Alamat', style: { color: '#fff', fontSize:20 } }}
            containerStyle={{alignItems:'center', justifyContent:'center'}}
          />
          <TouchableOpacity style={{width:'100%',justifyContent:'center',alignItems:'center'}}
            onPress={()=> setaddAdress(!addAdress)}
          >
            <Text style={{ width:'80%', color:'white', borderRadius:12,backgroundColor:'blue', marginTop:12, padding:12,textAlign:'center'}}>+ Tambahkan Alamat Baru</Text>
          </TouchableOpacity>
          {listAddress && listAddress.data?
          listAddress.data.map(data =>(
            <View style={{width:width*0.9, margin:width*0.05, minHeight:100, borderWidth:1.5,borderColor:'#D3D3D3', shadowColor:'grey'}}>
              <View style={{width:'100%', flexDirection:'column', padding:12}}>
                <Text>Alamat Rumah  {data.address_label}</Text>
                <Text>{data.phone_no}</Text>
                <Text>{data.address_line_1+' '+data.address_line_2 +','+ data.subdistrict_name+','+data.district_name+','+data.city_name+','+data.province_name}</Text>
              </View>
            </View>
          ))
          :null
        }
        
          {/* popup add address */}
          <AddAddress 
            addAdress={addAdress} 
            setaddAdress={()=>setaddAdress(!AddAddress)}
            address_label={address_label} 
            setaddress_label={(note)=> setaddress_label(note)}
            address_line1={address_line1} 
            setaddress_line1={(note)=> setaddress_line1(note)}
            address_line2={address_line2}
            setaddress_line2={(note)=> setaddress_line2(note)}  
            province_id={province_id}
            setprovince_id={(note)=> setprovince_id(note)} 
            city_id={city_id}
            setcity_id={(note)=> setcity_id(note)} 
            district_id={district_id}
            setdistrict_id={(note)=> setdistrict_id(note)} 
            subdistrict_id={subdistrict_id}
            setsubdistrict_id={(note)=> setsubdistrict_id(note)} 
            phone_no={phone_no}
            setphone_no={(note)=> setphone_no(note)} 
            zip_code={zip_code}
            setzip_code={(note)=> setzip_code(note)} 
            notes={notes}
            setnotes={(note)=> setnotes(note)} 
            province={province}
            cities={cities}
            district={district}
            subdistrict={subdistrict}  
            submit={()=> 
            {
              // alert(JSON.stringify(createAddress))
              addAddressRequest({
                auth:auth.data.access_token, 
                body:createAddress
              })
              setcreateAddress({})
              setTimeout(() => { 
                addressRequest(auth.data.access_token) 
              }, 500); 
              setaddAdress(!AddAddress)
            }} />
      </ScrollView>
    )
}

const mapStateToProps = (state) => {
  return {

    auth:state.auth.payload,
    province: state.province.payload,
    cities: state.cities.payload,
    district: state.district.payload,
    subdistrict: state.subdistrict.payload,
    listAddress: state.listAddress.payload,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    Object.assign(
      AuthActions,
      AddAddressRedux,
      ProviceRedux,
      CitiesRedux,
      DistrictRedux,
      SubDistrictRedux,
      AddressRedux
      ) , dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DaftarAlamatScreen)
