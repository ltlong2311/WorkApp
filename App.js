import React from 'react';
import {
    StatusBar,
    StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import {DrawerNavigator, UserDrawerNavigator} from './src/navigation/DrawerNavigator';
import TaskView from './src/screens/taskView';
import TaskList from './src/screens/taskList';
import CreateProject from './src/screens/createProject';
import ProfilePage from './src/screens/profile';
import AddEmployee from './src/screens/addEmployee';
import EditEmployee from './src/screens/editEmployee';
import AddTask from './src/screens/addTask';
import ProjectTask from './src/screens/projectTask';
import LoginAdminPage from './src/screens/loginAdmin';
import UserDashboard from './src/screens/userDashboard';
import TaskAssign from './src/screens/taskAssgin';
import UserTaskList from './src/screens/userTaskList';
const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer style={[styles.container]} theme={LightTheme}>
            <StatusBar translucent backgroundColor="transparent" />
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Login" component={LoginPage} />
                <Stack.Screen name="LoginAdmin" component={LoginAdminPage} />
                <Stack.Screen name="Home" component={DrawerNavigator} />
                <Stack.Screen name="UserHome" component={UserDrawerNavigator} />
                <Stack.Screen name="RegisterPage" component={RegisterPage} />
                <Stack.Screen name="EmployeeList" component={EmployeeList} />
                <Stack.Screen name="AddEmployee" component={AddEmployee} />
                <Stack.Screen name="EditEmployee" component={EditEmployee} />
                <Stack.Screen name="ProjectList" component={ProjectList} />
                <Stack.Screen name="TaskList" component={TaskList} />
                <Stack.Screen name="UserTaskList" component={UserTaskList} />
                <Stack.Screen name="TaskView" component={TaskView} />
                <Stack.Screen name="TaskAssign" component={TaskAssign} />
                <Stack.Screen name="EditProject" component={EditProject} />
                <Stack.Screen name="CreateProject" component={CreateProject} />
                <Stack.Screen name="projectTask" component={ProjectTask} />
                <Stack.Screen name="Profile" component={ProfilePage} />
                <Stack.Screen name="AddTask" component={AddTask} />
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
