import { createAppContainer } from 'react-navigation'
import DaftarAlamatScreen from '../Containers/DaftarAlamatScreen'
import ProfileScreen from '../Containers/ProfileScreen'
import { createStackNavigator } from 'react-navigation-stack';
import DetailProductScreen from '../Containers/DetailProductScreen'
import DashboardScreen from '../Containers/DashboardScreen'
import OnBoardingScreen from '../Containers/OnBoardingScreen'
import SingupScreen from '../Containers/SingupScreen'
import LoginScreen from '../Containers/LoginScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  DaftarAlamatScreen: { screen: DaftarAlamatScreen },
  ProfileScreen: { screen: ProfileScreen },
  DetailProductScreen: { screen: DetailProductScreen },
  DashboardScreen: { screen: DashboardScreen },
  OnBoardingScreen: { screen: OnBoardingScreen },
  SingupScreen: { screen: SingupScreen },
  LoginScreen: { screen: LoginScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'ProfileScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
