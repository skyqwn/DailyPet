import useAuth from '@/hooks/queries/useAuth';
import AuthStackNavigator from '../stack/AuthStackNavigator';
import MainTabNavigator from '../tab/MainTabNavigator';

function RootNavigator() {
  const {isLogin} = useAuth();
  return <>{isLogin ? <MainTabNavigator /> : <AuthStackNavigator />}</>;
}

export default RootNavigator;
