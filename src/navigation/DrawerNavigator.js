import 'react-native-gesture-handler';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Dashboard from '../screens/dashboard';
import {DrawerContent} from '../components/DrawerContent';
import UserDashboard from '../screens/userDashboard';
import { UserDrawerContent } from '../components/UserDrawerContent';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            screenOptions={{headerShown: false}}
            drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="Dashboard" component={Dashboard} />
        </Drawer.Navigator>
    );
};

const UserDrawerNavigator = ({route}) => {
    const userInfo = route.params.userInfo;
    return (
        <Drawer.Navigator
            screenOptions={{headerShown: false}}
            drawerContent={props => <UserDrawerContent {...props} userInfo={userInfo} />}>
            <Drawer.Screen name="UserDashboard" component={UserDashboard} />
        </Drawer.Navigator>
    );
};

export {DrawerNavigator, UserDrawerNavigator};
