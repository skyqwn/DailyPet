import AuthStackNavigator from '../stack/AuthStackNavigator';
import MainTabNavigator from '../tab/MainTabNavigator';

function RootNavigator() {
  const isLoggedIn = false;
  return <>{isLoggedIn ? <MainTabNavigator /> : <AuthStackNavigator />}</>;
}

export default RootNavigator;
