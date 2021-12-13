import React, {useState} from 'react';
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    Animated,
    Image,
    ImageBackground,
    ScrollView,
    TouchableOpacity,
    Button,
} from 'react-native';

import HeaderComponent from '../components/HeaderComponent';
import DataService from '../services/dataService';
import LinearGradient from 'react-native-linear-gradient';
import CardView from 'react-native-cardview';
import COLORS from '../consts/color';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import InfoCard from '../components/InfoCard';

const ProfilePage = ({navigation, route}) => {
    const employeeProfile = route.params.employee;

    return (
        <View style={styles.container}>
            <View style={{flex: 4}}>
                <LinearGradient
                    colors={['#44bbec', '#0163fc']}
                    style={styles.linearGradient}>
                    <View style={styles.header}>
                        <MaterialIcons
                            name="arrow-back"
                            size={25}
                            color={COLORS.white}
                            onPress={navigation.goBack}
                        />
                        <View onPress={navigation.goBack}>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('EditEmployee', {
                                        employee: employeeProfile,
                                    })
                                }>
                                <Image
                                    style={styles.editIcon}
                                    source={require('../assets/edit.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.dashBoardCard}>
                        <ImageBackground
                            style={styles.userImg}
                            source={require('../assets/user.png')}
                        />
                        <Text style={styles.userName}>
                            {employeeProfile.fullname}
                        </Text>
                        <Text style={styles.designation}>
                            {employeeProfile.designation}
                        </Text>
                    </View>
                </LinearGradient>
            </View>
            <View style={{flex: 6, marginTop: -10}}>
                <InfoCard navigation={navigation} item={employeeProfile} />
            </View>
        </View>
    );
};

export default ProfilePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e7e7e7',
    },
    cardView: {
        backgroundColor: 'white',
        position: 'relative',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flex: 1,
        marginTop: 5,
        marginBottom: 5,
    },
    card: {
        width: '100%',
    },
    header: {
        paddingHorizontal: 20,
        top: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    userImg: {
        borderRadius: 50,
        width: 100,
        height: 100,
    },
    userName: {
        fontSize: 18,
        color: '#fff',
        paddingTop: 15,
        fontWeight: '700',
    },
    designation: {
        fontSize: 14,
        color: '#fff',
        marginBottom: 20,
    },
    addressRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginRight: 10,
        marginLeft: 10,
    },
    dashBoardCard: {
        width: '100%',
        paddingTop: 80,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90%',
    },
    linearGradient: {
        width: '100%',
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 20,
    },
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
    },
    institutionName: {
        fontSize: 14,
        fontWeight: '700',
        color: '#616161',
    },
    tabCard: {
        margin: 10,
        marginLeft: 20,
        marginRight: 20,
    },
    course: {
        fontSize: 14,
        color: '#9e9e9e',
    },
    duration: {
        fontSize: 14,
        color: '#9e9e9e',
    },
    editIcon: {
        width: 25,
        height: 25,
    },
});
