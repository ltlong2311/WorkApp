import 'react-native-gesture-handler';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Dashboard from '../screens/dashboard';
import {DrawerContent} from '../components/DrawerContent';

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

export default DrawerNavigator;
