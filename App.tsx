import { NavigationContainer } from "@react-navigation/native";
import UsersNavigation from "./src/Navigation/Users";

const App = () => {
  return <NavigationContainer>
    <UsersNavigation />
  </NavigationContainer>;
};

export default App;
