import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {View, Text, Image, FlatList, StyleSheet, Alert} from 'react-native';
import CardView from 'react-native-cardview';
import {
    MenuProvider,
    Menu,
    MenuTrigger,
    MenuOptions,
    MenuOption,
} from 'react-native-popup-menu';
import HeaderComponent from '../components/HeaderComponent';

import DataService from '../services/dataService';

const data = new Array(100)
    .fill(0)
    .map((a, i) => ({key: '' + i, value: 'item' + i}));

const EmployeeList = ({navigation}) => {
    const [dataSource, setDataSource] = useState(DataService.employeeList());
    const [isLoading, setIsLoading] = useState(true);

    const openProfile = () => {
        navigation.navigate('Profile');
    };

    const _keyExtractor = (item, index) => item.id;
    const _renderItem = ({item}) => (
        <View style={styles.cardView}>
            <TouchableOpacity style={styles.card} onPress={openProfile}>
                <View>
                    <CardView
                        style={styles.cardData}
                        cardElevation={2}
                        cardMaxElevation={2}
                        cornerRadius={5}>
                        <View style={styles.navBar}>
                            <View style={styles.rightContainer}>
                                <Menu
                                    onSelect={value => {
                                        if (value === 'A') {
                                            navigation.navigate(
                                                'EditEmployee',
                                                {
                                                    employee: item,
                                                },
                                            );
                                        } else {
                                            Alert.alert(
                                                'SmartHRMS',
                                                'Deleted successfully',
                                            );
                                        }
                                    }}>
                                    <MenuTrigger>
                                        <View
                                            style={{
                                                width: 30,
                                                height: 30,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                            <Image
                                                style={styles.moreIcon}
                                                source={require('../assets/black_more.png')}
                                            />
                                        </View>
                                    </MenuTrigger>
                                    <MenuOptions
                                        optionsContainerStyle={{width: 100}}>
                                        <MenuOption
                                            optionWrapper={{
                                                padding: 10,
                                                fontSize: 16,
                                            }}
                                            value="A"
                                            text="Edit"
                                        />
                                        <MenuOption value="B" text="Delete" />
                                    </MenuOptions>
                                </Menu>
                            </View>
                        </View>
                        <View style={styles.firstLetterView}>
                            <Text style={styles.firstLetter}>
                                {item.fullname.charAt(0)}
                            </Text>
                        </View>
                        <Text style={styles.cardQuantity}>{item.fullname}</Text>
                        <Text style={styles.cardTitle}>{item.designation}</Text>
                    </CardView>
                </View>
            </TouchableOpacity>
        </View>
    );

    return (
        <MenuProvider style={styles.container}>
            <View style={styles.container}>
                <HeaderComponent
                    back="true"
                    title="Employee List"
                    add="true"
                    next="AddEmployee"
                    navigation={navigation}
                />
                <FlatList
                    data={dataSource}
                    initialNumToRender={1}
                    maxToRenderPerBatch={1}
                    removeClippedSubviews={false}
                    numColumns={2}
                    keyExtractor={_keyExtractor}
                    renderItem={_renderItem}
                />
            </View>
        </MenuProvider>
    );
};

export default EmployeeList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e7e7e7',
    },
    cardView: {
        position: 'relative',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flex: 1,
        margin: 10,
    },
    card: {
        width: '100%',
    },
    cardData: {
        backgroundColor: 'white',
        width: '100%',
        height: 135,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 12,
        color: '#777',
    },
    cardQuantity: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '800',
        color: '#333',
    },
    firstLetter: {
        color: '#fff',
        fontSize: 25,
    },
    firstLetterView: {
        backgroundColor: '#aaa',
        height: 50,
        width: 50,
        borderRadius: 50,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    moreIcon: {
        width: 14,
        height: 14,
    },
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    leftContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: 10,
    },
    rightIcon: {
        height: 10,
        width: 10,
        resizeMode: 'contain',
        backgroundColor: 'white',
    },
});
