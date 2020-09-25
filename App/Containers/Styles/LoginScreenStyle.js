import { Dimensions, StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  textInput: {height: 40,width:'80%', borderColor: 'gray', borderWidth: 1,borderRadius:4,padding:12,marginBottom:20},
  logo: {width:Dimensions.get('screen').width,height:Dimensions.get('screen').height*0.4}
})
