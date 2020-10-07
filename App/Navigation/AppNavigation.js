import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import DashboardScreen from '../Containers/DashboardScreen'
import OnBoardingScreen from '../Containers/OnBoardingScreen'
import SingupScreen from '../Containers/SingupScreen'
import LoginScreen from '../Containers/LoginScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  DashboardScreen: { screen: DashboardScreen },
  OnBoardingScreen: { screen: OnBoardingScreen },
  SingupScreen: { screen: SingupScreen },
  LoginScreen: { screen: LoginScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'OnBoardingScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
