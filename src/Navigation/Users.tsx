import { createNativeStackNavigator } from "@react-navigation/native-stack";
import List from "../Components/Users/List";
import Details from "../Components/Users/Details";
import { UsersStack } from "../types/navigation";

const Stack = createNativeStackNavigator<UsersStack>();

const UsersNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="List" component={List} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
};

export default UsersNavigation;
