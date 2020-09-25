import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView, TouchableOpacity, Linking, Alert, Dimensions } from 'react-native'
import { SearchBar,Header,CheckBox,Image,Input, Icon } from 'react-native-elements';
import { Images } from '../Themes'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import RegisterActions from '../Redux/RegisterRedux'

// Styles
import styles from './Styles/SingupScreenStyle'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { bindActionCreators } from 'redux'

class SingupScreen extends Component {
  state={
    username:'',
    email:'',
    password:'',
    repassword:'',
    display_name:'',
    validationEmail:false,
    validationPassword:false,
    submitted:false,
    checked:false
  }
  componentWillMount(){
    this.setState({
      username:'',
      email:'',
      password:'',
      repassword:'',
      display_name:'',
      validationEmail:false,
      validationPassword:false,
      submitted:false
    })
  }
  componentDidUpdate(){
    if(this.props.status&&this.state.submitted){
      Alert.alert(
        "Berhasil",
        this.props.message,
        [
          { text: "Lanjut Login", onPress: () =>this.props.navigation.popToTop() }
        ],
        { cancelable: false }
      );
    }
  }
  Register=()=>{
    const { username,display_name,email,password,validationEmail,validationPassword} = this.state
    if(validationEmail===true && validationPassword===true) {
      const payload ={
        "username": username,
        "password": password,
        "email":email,
        "display_name": display_name
      }
      this.props.registerRequest(payload)
      this.setState({submitted:true})
    }else{
      Alert.alert('Failed','please, correct input')
    }
    
  }
  validatePassword = (text,index) => {
    const {password,repassword} = this.state
    if(index===1){
      this.setState({password:text})
    }else{
      this.setState({repassword:text})
    }

    if(password===text || repassword===text) {
      this.setState({validationPassword:true})
      console.log("Password is  Correct");
    }else{
      this.setState({validationPassword:false})
      console.log("Password is Not Correct");
    }
  }

  validateEmail = (text) => {
    this.setState({ email: text })
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");
      return false;
    }
    else {
      this.setState({ email: text, validationEmail:true })
      console.log("Email is Correct");
    }
  }

  render () {
    const {validationEmail,validationPassword,username,email,password,display_name} = this.state
    return (
      <ScrollView>
        <KeyboardAvoidingView>
          <View style={[styles.container,{alignItems:'center',padding:8}]}>
            <Header
              centerComponent={<Image source={Images.logo} style={{width:Dimensions.get('screen').width*0.3,height:Dimensions.get('screen').height*0.05}}/>}
              leftComponent={
                <TouchableOpacity
                  onPress={() =>this.props.navigation.goBack()}
                  style={{alignItems:'center',marginLeft:-4}}
                >
                    <Icon name="arrow-back" size={28}/>
                </TouchableOpacity>
              }
              backgroundColor={'#fff'}
              containerStyle={{marginTop:-12}}
            /> 
            <View style={{width:'100%', justifyContent:'center',alignItems:'center',paddingHorizontal:12}} >  
            <Image source={Images.background_singup} style={styles.logo} />
            </View>
            <View style={{padding:24,width:'100%'}}>
              <Text style={{fontFamily:'Calibri',color:'#2D4070', fontWeight:"700",fontSize:16,lineHeight:19,marginBottom:this.state.username.length>0?0:-24,marginLeft:12}}>Username</Text>
              <Input
                  value={this.state.username} 
                  onChangeText={(username=>this.setState({username}))}
                  containerStyle={{width:'100%', borderWidth:2,borderColor:'#50E348',borderRadius:8,height:50,marginBottom:20,borderBottomWidth:5,borderBottomColor:'rgba(0, 0, 0, 0.25)'}}
                />
                <Text style={{fontFamily:'Calibri',color:'#2D4070', fontWeight:"700",fontSize:16,lineHeight:19,marginBottom:this.state.email.length>0?0:-24,marginLeft:12}}>Email</Text>
                <Input
                  orStyle={{ color: 'red' }}
                  errorMessage={null}
                  value={this.state.email} 
                  onChangeText={(email=>this.validateEmail(email))}
                  containerStyle={{width:'100%', borderWidth:2,borderColor:'#50E348',borderRadius:8,height:50,marginBottom:20,borderBottomWidth:5,borderBottomColor:'rgba(0, 0, 0, 0.25)'}}
                />
                {this.state.email?
                validationEmail?null:
                <Text style={{marginTop:0,marginBottom:20,color:'red'}}>Email is Not Correct'</Text>:null}
                <Text style={{fontFamily:'Calibri',color:'#2D4070', fontWeight:"700",fontSize:16,lineHeight:19,marginBottom:this.state.display_name.length>0?0:-24,marginLeft:12}}>Display Name</Text>
                <Input
                  value={this.state.display_name} 
                  onChangeText={(display_name=>this.setState({display_name}))}
                  containerStyle={{width:'100%', borderWidth:2,borderColor:'#50E348',borderRadius:8,height:50,marginBottom:20,borderBottomWidth:5,borderBottomColor:'rgba(0, 0, 0, 0.25)'}}
                />
             
                <View style={{width:'100%',flexDirection:'row'}}>
                  <View style={{width:'50%',flexDirection:'column'}}>
                    <Text style={{fontFamily:'Calibri',color:'#2D4070', fontWeight:"700",fontSize:16,lineHeight:19,marginBottom:this.state.password.length>0?0:-24,marginLeft:12}}>Password</Text>
                    <Input 
                        secureTextEntry={true}
                        containerStyle={{width:'95%', borderWidth:2,borderColor:'#50E348',borderRadius:8,height:50}}
                        value={this.state.password} 
                        onChangeText={(password=>this.validatePassword(password,1))}
                      />
                    {/* <TextInput 
                      style={[styles.textInput]} 
                      value={this.state.password} 
                      secureTextEntry={true}
                      onChangeText={(password=>this.validatePassword(password,1))}></TextInput> */}
                  </View>
                  <View style={{width:'50%',flexDirection:'column'}}>
                    <Text style={{fontFamily:'Calibri',color:'#2D4070', fontWeight:"700",fontSize:16,lineHeight:19,marginBottom:this.state.repassword.length>0?0:-24,marginLeft:12}}>Re-Password</Text>
                    <Input 
                        secureTextEntry={true}
                        containerStyle={{width:'95%', borderWidth:2,borderColor:'#50E348',borderRadius:8,height:50}}
                        value={this.state.repassword} 
                        onChangeText={(repassword=>this.validatePassword(repassword,2))}
                      />
                  </View>
                </View>
                <View style={{width:'100%',flexDirection:'row'}}>
                  
                </View>
                  {
                  this.state.repassword?
                  validationPassword?null:
                  <Text style={{marginTop:0,marginBottom:20,color:'red'}}>Re-Check Password'</Text>:null
                  }
            </View>
              <View style={{width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:-24}}>
              <CheckBox
                  checkedIcon='dot-circle-o'
                  uncheckedIcon='circle-o'
                  checked={this.state.checked}
                  containerStyle={{marginRight:-12}}
                  onPress={()=> this.setState({checked: !this.state.checked})}
                />
              <Text style={{backgroundColor:'white',marginTop:12}}>{'\t'}By creating an account, you agree to the{'\n'} Coinbase Term of Service and Privacy Policy</Text>
              </View>
              <TouchableOpacity onPress={()=> this.state.checked?this.Register():Alert.alert('Failed','Click Term and Condition')} style={{width:'100%',alignItems:'center',marginTop:12}}>
                <View style={{width:'80%',alignItems:'center',justifyContent:'center',backgroundColor:'#2D4070',height:48,borderRadius:8}}>
                  <Text style={{color:'white',fontSize:18,fontWeight:'700'}}>START YOUR FREE TRIAL</Text>
                </View>
              </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.props.navigation.goBack()} style={{marginTop:16}}>
                  <Text>Already have an account?</Text>
                </TouchableOpacity>
              <View style={{width:'100%',justifyContent:'space-around',flexDirection:'row',marginTop:16}}>
              <View style={{justifyContent:'space-around',flexDirection:'row',alignItems:'center',borderWidth:2,borderColor:'#50E348',paddingRight:20,borderRadius:8}}>
                <Image source={Images.icon_google} style={{width:48,height:48,marginRight:12}}/>
                <Text style={{fontSize:24,color:'grey'}}>Google</Text>
              </View>
              <View style={{justifyContent:'space-around',flexDirection:'row',alignItems:'center',borderWidth:2,borderColor:'#50E348',paddingRight:20,borderRadius:8}}>
                <Image source={Images.icon_facebook} style={{width:48,height:48,marginRight:12}}/>
                <Text style={{fontSize:24,color:'grey'}}>Facebook</Text>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  const {register} = state
  const {payload} = register
  return {
    status: payload?payload.success:false,
    message: payload?payload.message:''
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(RegisterActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SingupScreen)
