import React, {useEffect, useState} from 'react';
import {
    View,
    StyleSheet,
    Image,
    Alert,
    Text,
    TouchableOpacity,
    ScrollView,
    Platform,
    StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CardView from 'react-native-cardview';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {DrawerActions} from '@react-navigation/native';

import {db} from '../../firebaseConnect';
import {collection, getDocs} from 'firebase/firestore/lite';
import COLORS from '../consts/color';
// import HeaderNav from '../components/HeaderNav';

const UserDashboard = ({navigation, route}) => {
    // const project = route.params.userInfo;
    // console.log(project);
    const [empTotal, setEmpTotal] = useState();
    const [projectTotal, setProjectTotal] = useState();
    const [taskTotal, setTaskTotal] = useState();
    const account = () => {
        console.log('account');
    };
    const TaskList = () => {
        navigation.navigate('UserTaskList', {isLead: false});
    };
    const projectList = () => {
        navigation.navigate('ProjectList', {isLead: false});
    };

    return (
        <View style={styles.container}>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="light-content"
            />
            <ScrollView style={styles.container}>
                <View style={{height: 320, zIndex: 0}}>
                    <LinearGradient
                        colors={['#44bbec', '#619eff', '#206fe8']}
                        style={styles.linearGradient}>
                        <View style={styles.header}>
                            <MaterialIcons
                                onPress={() =>
                                    navigation.dispatch(
                                        DrawerActions.openDrawer(),
                                    )
                                }
                                name="menu"
                                size={28}
                                color={COLORS.white}
                            />
                            <MaterialIcons
                                name="more-vert"
                                size={28}
                                color={COLORS.white}
                            />
                        </View>
                        <View style={styles.dashBoardCard}>
                            <Image
                                style={styles.logo}
                                source={require('../assets/logo-app.png')}
                            />
                        </View>
                    </LinearGradient>
                </View>
                <View style={styles.cardView}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.card}
                        onPress={TaskList}>
                        <CardView
                            style={styles.cardData}
                            cardElevation={2}
                            cardMaxElevation={2}
                            cornerRadius={5}>
                            <FontAwesome
                                name="tasks"
                                size={35}
                                color="#008fc9"
                            />
                            <Text style={styles.cardTitle}>Task</Text>
                        </CardView>
                    </TouchableOpacity>
                </View>
                <View style={styles.cardView}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.card}
                        onPress={projectList}>
                        <CardView
                            style={styles.cardData}
                            cardElevation={2}
                            cardMaxElevation={2}
                            cornerRadius={5}>
                            <FontAwesome
                                name="sitemap"
                                size={35}
                                fontWeight="600"
                                color="#008fc9"
                            />
                            <Text style={styles.cardTitle}>Project</Text>
                        </CardView>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.card}
                        onPress={account}>
                        <CardView
                            style={styles.cardData}
                            cardElevation={2}
                            cardMaxElevation={2}
                            cornerRadius={5}>
                            <FontAwesome
                                name="user"
                                size={35}
                                color="#008fc9"
                            />
                            <Text style={styles.cardTitle}>Account</Text>
                        </CardView>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default UserDashboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e7e7e7',
        zIndex: 0,
    },
    dashBoardCard: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80%',
    },
    linearGradient: {
        width: '100%',
        paddingLeft: 0,
        paddingRight: 0,
    },
    header: {
        paddingTop: 40,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    logo: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardView: {
        flex: 1,
        position: 'relative',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        top: -25,
        flex: 6,
    },
    moreIcon: {
        width: 30,
        height: 30,
    },
    card: {
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    cardData: {
        backgroundColor: 'white',
        width: '100%',
        margin: 10,
        height: 135,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 14,
        color: '#7c7c7c',
        fontWeight: '600',
    },
    cardQuantity: {
        fontSize: 14,
        lineHeight: 30,
        fontWeight: '800',
        color: '#000',
    },
});
