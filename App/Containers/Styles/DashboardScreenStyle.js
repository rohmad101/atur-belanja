import { PixelRatio, StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  header:{
    backgroundColor: "#00BFFF",
    height:200,
    alignItems:'center',
    justifyContent:'center'
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 1,
    borderColor: "white"
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:40,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
  sideBar:{
    width:'115%',
    height:'10%',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
    paddingVertical:10,
    marginLeft:-18,
    backgroundColor:'#516085',
    borderWidth:2,
    borderColor:'#5D6D96'
  },
  iconMenuSideBar:{
    width:40,
    height:40, 
    borderRadius:20,
    marginLeft:18
  },
  textMenuSidebar:{color:'white',fontSize:16,lineHeight:25, fontWeight:'600',width:'50%'},
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150,
  },
})
