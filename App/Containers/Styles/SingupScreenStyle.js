import { Dimensions, StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  textInput: {height: 40,width:'95%', borderColor: 'gray', borderWidth: 1,borderRadius:8,padding:12,marginBottom:20},
  logo: {width:Dimensions.get('screen').width,height:Dimensions.get('screen').height*0.3}
})
