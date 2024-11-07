import { createStackNavigator } from '@react-navigation/stack';
import App from '../screens/LoginScreen';
import CadastroScreen from '../screens/CadastroScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Cadastro" component={CadastroScreen} />
    </Stack.Navigator>
  );
}