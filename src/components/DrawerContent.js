import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, StatusBar, ImageBackground} from 'react-native';
import {Avatar, Drawer, TouchableRipple, Switch} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import LinearGradient from 'react-native-linear-gradient';
import COLORS from '../consts/color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export const DrawerContent = props => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {}, []);

    const logOut = () => {
        props.navigation.push('Login');
    };

    return (
        <View style={isDarkTheme ? styles.drawerDark : styles.drawer}>
            <View style={styles.drawerContent}>
                <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={['#244ed4', '#22a7f0']}
                    style={styles.userInfoSection}>
                    <View style={{paddingLeft: 15, paddingTop: 45}}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: 10,
                            }}>
                            <Avatar.Image
                                style={{
                                    borderColor: COLORS.greyLynch,
                                    borderWidth: 1,
                                    overflow: 'hidden',
                                }}
                                source={{
                                    uri: 'https://i.imgur.com/6quHTz8.png',
                                }}
                                size={50}
                            />
                            <View
                                style={{
                                    flexDirection: 'column',
                                    marginLeft: 15,
                                }}>
                                <Text style={styles.tittle}>
                                    {userInfo.hoTen}
                                </Text>
                                <Text style={styles.caption}>
                                    {userInfo.email}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.introText}>
                        Welcome to KMA company!
                    </Text>
                </LinearGradient>
                <Drawer.Section style={styles.drawerSection}>
                    <DrawerItem
                        icon={({color, size}) => (
                            <MaterialCommunityIcons
                                name="view-dashboard"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Dashboard"
                        onPress={() => {
                            props.navigation.navigate('Dashboard');
                        }}
                    />
                    <DrawerItem
                        icon={({color, size}) => (
                            <MaterialCommunityIcons
                                name="card-bulleted"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Tasks"
                        onPress={() => {
                            props.navigation.navigate('TaskList');
                        }}
                    />
                    <DrawerItem
                        icon={({color, size}) => (
                            <MaterialCommunityIcons
                                name="account-group"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Employees"
                        onPress={() => {
                            props.navigation.navigate('EmployeeList');
                        }}
                    />
                    <DrawerItem
                        icon={({color, size}) => (
                            <MaterialCommunityIcons
                                name="briefcase"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Project"
                        onPress={() => {
                            props.navigation.navigate('ProjectList');
                        }}
                    />
                    <DrawerItem
                        icon={({color, size}) => (
                            <MaterialCommunityIcons
                                name="bookmark-multiple"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Note"
                        onPress={() => {
                            props.navigation.navigate('User', {
                                screen: 'SaveList',
                            });
                        }}
                    />
                </Drawer.Section>
                <Drawer.Section title="Other">
                    <DrawerItem
                        icon={({color, size}) => (
                            <MaterialCommunityIcons
                            name="account"
                            color={color}
                            size={size}
                          />
                        )}
                        label="Account"
                        onPress={() => {
                            props.navigation.navigate('User', {
                                screen: 'UserProfile',
                            });
                        }}
                    />
                    <DrawerItem
                        icon={({color, size}) => (
                            <MaterialCommunityIcons
                                name="account-check"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Support"
                        onPress={() => {}}
                    />
                </Drawer.Section>
            </View>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({color, size}) => (
                        <MaterialCommunityIcons
                            name="exit-to-app"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Thoát"
                    onPress={logOut}
                />
            </Drawer.Section>
            <StatusBar
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    drawer: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    drawerDark: {
        flex: 1,
        backgroundColor: COLORS.darkTile,
    },
    userInfoSection: {
        height: 150,
    },
    tittle: {
        color: COLORS.whiteT,
        fontSize: 16,
        marginTop: -3,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    introText: {
        color: COLORS.whiteT,
        fontSize: 16,
        paddingLeft: 15,
        paddingVertical: 10,
        fontWeight: 'bold',
    },
    caption: {
        color: COLORS.whiteT,
        fontSize: 14,
        lineHeight: 14,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, .3)',
        paddingLeft: 15,
        paddingTop: 50,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
        fontSize: 14,
        lineHeight: 14,
    },
    drawerSection: {
        marginTop: 0,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});
