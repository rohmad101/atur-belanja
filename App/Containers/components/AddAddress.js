import { Picker } from '@react-native-community/picker';
import React from 'react';
import { Text, TouchableOpacity,ScrollView, TextInput } from 'react-native';
import { Overlay } from "react-native-elements"

export const AddAddress =({
    addAdress,submit,address_label,address_line1,address_line2, province_id,city_id,district_id,subdistrict_id,phone_no,zip_code,notes,
    province,cities,district,subdistrict,
    setaddAdress,setaddress_label,setprovince_id,setcity_id,setdistrict_id,setsubdistrict_id,setaddress_line1,setaddress_line2,setzip_code,setnotes,setphone_no
})=>{
    // createAddress:{
    //     address_label: "",
    //     address_line1: "",
    //     address_line2: "",
    //     province_id: "",
    //     city_id: "",
    //     district_id: "",
    //     subdistrict_id: "",
    //     zip_code: "",
    //     notes: "",
    //     phone_no: ""
    //   }
    
    return(
        <Overlay isVisible={addAdress} onBackdropPress={()=>setaddAdress()} overlayStyle={{padding:20, width:'90%',borderRadius:12}}>
            <ScrollView>
            <Text>Nama Alamat</Text>
            <TextInput
            value={ address_label}
            multiline = {true}
            placeholder={'Nama Tempat'}
            placeholderTextColor={'#2D4070'}
            style={{color: '#2D4070',fontSize: 16,borderColor:'#2D4070',borderWidth:1,paddingTop:6,borderRadius:8,marginRight:12,width:'100%',height:50,textAlign:'auto'}}
            onChangeText={note => setaddress_label(note)}
            numberOfLines={1}
            ></TextInput>
            <Text>Alamat</Text>
            <TextInput
            value={ address_line1}
            multiline = {true}
            placeholder={'Alamat'}
            placeholderTextColor={'#2D4070'}
            style={{color: '#2D4070',fontSize: 16,borderColor:'#2D4070',borderWidth:1,paddingTop:6,borderRadius:8,marginRight:12,width:'100%',height:50,textAlign:'auto'}}
            onChangeText={note => setaddress_line1(note)}
            numberOfLines={2}
            ></TextInput>
            <Text>Detail Alamat</Text>
            <TextInput
            value={ address_line2}
            multiline = {true}
            placeholder={'Detail Alamat'}
            placeholderTextColor={'#2D4070'}
            style={{color: '#2D4070',fontSize: 16,borderColor:'#2D4070',borderWidth:1,paddingTop:6,borderRadius:8,marginRight:12,width:'100%',height:50,textAlign:'auto'}}
            onChangeText={note => setaddress_line2(note)}
            numberOfLines={2}
            ></TextInput>
            <Text>Provinsi</Text>
              <Picker
                selectedValue={ province_id}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) => setprovince_id(itemValue)}
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
                selectedValue={ city_id}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) =>setcity_id(itemValue)}
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
                selectedValue={ district_id}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) =>setdistrict_id(itemValue)}
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
                selectedValue={ subdistrict_id}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) =>setsubdistrict_id(itemValue)}
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
              value={ zip_code}
              multiline = {true}
              keyboardType={'number-pad'}
              placeholder={'Kode Pos'}
              placeholderTextColor={'#2D4070'}
              style={{color: '#2D4070',fontSize: 16,borderColor:'#2D4070',borderWidth:1,paddingTop:6,borderRadius:8,marginRight:12,width:'100%',height:50,textAlign:'auto'}}
              onChangeText={note => setzip_code(note)}
              numberOfLines={1}
              ></TextInput>
            <Text>Catatan</Text>
              <TextInput
                value={ notes}
                multiline = {true}
                placeholder={'Catatan'}
                placeholderTextColor={'#2D4070'}
                style={{color: '#2D4070',fontSize: 16,borderColor:'#2D4070',borderWidth:1,paddingTop:6,borderRadius:8,marginRight:12,width:'100%',height:50,textAlign:'auto'}}
                onChangeText={note => setnotes(note)}
                numberOfLines={3}
                ></TextInput>
            <Text>Nomor HP</Text>
            <TextInput
                value={ phone_no}
                multiline = {true}
                keyboardType={'number-pad'}
                placeholder={'Phone Number'}
                placeholderTextColor={'#2D4070'}
                style={{color: '#2D4070',fontSize: 16,borderColor:'#2D4070',borderWidth:1,paddingTop:6,borderRadius:8,marginRight:12,width:'100%',height:50,textAlign:'auto'}}
                onChangeText={note => setphone_no(note)}
                numberOfLines={3}
                ></TextInput>
            
            <TouchableOpacity 
            
            style={{width:'60%', borderRadius:12,backgroundColor:'#2D4070',justifyContent:'center',alignItems:'center', marginTop:12, padding:12}}
            onPress={()=> {
                submit()
            // addAddressRequest({
            //   auth:this.props.auth.data.access_token, 
            //   body:createAddress
            // })
            // setTimeout(() => { 
            //   this.props.addressRequest(this.props.auth.data.access_token) 
            // }, 500); 
            // this.setState({createAddress:{
            //   address_label: "",
            //   address_line1: "",
            //   address_line2: "",
            //   province_id: "",
            //   city_id: "",
            //   district_id: "",
            //   subdistrict_id: "",
            //   zip_code: "",
            //   notes: "",
            //   phone_no: ""
            // }})
            // this.setState({addAdress: !addAdress})
              }
            }
            >
            <Text style={{color:"white"}}>Submit Address</Text>
            </TouchableOpacity>
            </ScrollView>
          </Overlay>
    )
}