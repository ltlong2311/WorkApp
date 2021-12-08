import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';

//pages
import LoginPage from './src/screens/login';
import Dashboard from './src/screens/dashboard';
import ProjectList from './src/screens/projectList';
import RegisterPage from './src/screens/register';
import EmployeeList from './src/screens/employeeList';
import EditProject from './src/screens/editProject';


//navigation
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, LightTheme} from '@react-navigation/native';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import TaskView from './src/screens/taskView';
import TaskList from './src/screens/taskList';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer style={[styles.container]} theme={LightTheme}>
            <StatusBar
                translucent
                backgroundColor="transparent"
            />
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Login" component={LoginPage} />
                <Stack.Screen name="Home" component={DrawerNavigator} />
                <Stack.Screen name="Dashboard" component={Dashboard} />
                <Stack.Screen name="RegisterPage" component={RegisterPage} />
                <Stack.Screen name="EmployeeList" component={EmployeeList} />
                <Stack.Screen name="ProjectList" component={ProjectList} />
                <Stack.Screen name="TaskList" component={TaskList} />
                <Stack.Screen name="TaskView" component={TaskView} />
                <Stack.Screen name="EditProject" component={EditProject} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default App;
