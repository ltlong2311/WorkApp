import React, {useState, useEffect} from 'react';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import CardView from 'react-native-cardview';
import HeaderComponent from '../components/HeaderComponent';
import DataService from '../services/dataService';
import {FlatList} from 'react-native-gesture-handler';
import COLORS from '../consts/color';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {db} from '../../firebaseConnect';
import {collection, getDocs} from 'firebase/firestore/lite';

const getDataStore = async key => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
       console.log(e);
    }
};

const UserTaskList = ({navigation, route}) => {
    const isLead = route.params.isLead;
    const [tabIndex, setTabIndex] = useState({
        selectedIndex: 0,
    });
    const userInfo = getDataStore("userInfo");
    const [allTasks, setAllTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [openTasks, setOpenTasks] = useState([]);

    useEffect(() => {
        getData();
        const willFocusSubscription = navigation.addListener('focus', () => {
            getData();
        });
        return willFocusSubscription;
    }, []);

    const getData = async () => {
        const projectCol = collection(db, 'projectList');
        const projectSnapshot = await getDocs(projectCol);
        const projectList = projectSnapshot.docs.map(doc => doc.data());
        const taskList = [];
        const completedList = [];
        const allList = [];
        const openList = [];
        const userID = userInfo._W.id;
        projectList.forEach((value, key) => {
            if (value.tasks && value.tasks.length > 0) {
                Array.prototype.push.apply(taskList, value.tasks);
                value.tasks.forEach((val, k) => {
                    if (val.assigned_to.id === userID){
                        if (val.task_detail.task_progress === 100) {
                            completedList.push(val);
                        } else {
                            openList.push(val);
                        }
                        allList.push(val);
                    }
                });
            }
        });
        setAllTasks(allList);
        setCompletedTasks(completedList);
        setOpenTasks(openList);
    };

    const handleSingleIndexSelect = index => {
        setTabIndex({...tabIndex, selectedIndex: index});
    };

    const renderIcon = item => {
        if (item.task_detail.task_progress === 100) {
            return (
                <View style={[{textAlign: 'left'}, styles.taskCompleteStatus]}>
                    <Image
                        style={styles.taskCompleteIcon}
                        source={require('../assets/White_tick.png')}></Image>
                </View>
            );
        } else {
            return (
                <View style={[{textAlign: 'left'}, styles.taskStatus]}>
                    <Image
                        style={styles.taskCompleteIcon}
                        source={require('../assets/tick.png')}></Image>
                </View>
            );
        }
    };
    const _keyExtractor = (item, index) => item.id;
    const _renderItem = ({item}) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('UserTaskView', {task: item})}>
            <View style={styles.cardView}>
                <CardView
                    style={styles.cardData}
                    cardElevation={2}
                    cardMaxElevation={2}
                    cornerRadius={0}>
                    <View style={styles.taskRow}>
                        <View style={styles.leftContainer}>
                            {renderIcon(item)}
                            <Text style={styles.taskName}>
                                {item.task_detail.task_name}
                            </Text>
                        </View>
                    </View>
                </CardView>
            </View>
        </TouchableOpacity>
    );

    // const {selectedIndex} = this.state;
    return (
        <View style={styles.container}>
            <HeaderComponent
                back="true"
                title="Task List"
                goBack="UserDashboard"
                navigation={navigation}
            />
            <View style={styles.tabView}>
                <SegmentedControlTab
                    values={['Pending', 'Completed', 'All']}
                    selectedIndex={tabIndex.selectedIndex}
                    tabsContainerDisableStyle={true}
                    tabStyle={styles.tabStyle}
                    activeTabStyle={styles.activeTabStyle}
                    // tabsContainerStyle={styles.tabContainer}
                    onTabPress={handleSingleIndexSelect}
                />
                {tabIndex.selectedIndex === 0 ? (
                    <FlatList
                        data={openTasks}
                        keyExtractor={() =>
                            Math.random().toString(36).substr(2, 9)
                        }
                        renderItem={_renderItem}
                    />
                ) : tabIndex.selectedIndex === 1 ? (
                    <FlatList
                        data={completedTasks}
                        renderItem={_renderItem}
                        keyExtractor={() =>
                            Math.random().toString(36).substr(2, 9)
                        }
                    />
                ) : tabIndex.selectedIndex === 2 ? (
                    <FlatList
                        data={allTasks}
                        renderItem={_renderItem}
                        keyExtractor={() =>
                            Math.random().toString(36).substr(2, 9)
                        }
                    />
                ) : (
                    <></>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.whiteG,
    },
    tabViewText: {
        color: '#444444',
        fontWeight: 'bold',
        marginTop: 50,
        fontSize: 18,
    },
    taskRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    taskName: {
        fontSize: 14,
        marginLeft: 20,
    },
    taskStatus: {
        backgroundColor: '#fff',
        borderColor: '#cccccc',
        height: 18,
        borderRadius: 50,
        borderWidth: 1,
        width: 18,
        padding: 3,
    },
    Status: {
        backgroundColor: '#fff',
        height: 18,
        width: 18,
        padding: 4,
    },
    taskCompleteStatus: {
        backgroundColor: '#35ba66',
        borderColor: '#2fa65c',
        height: 18,
        borderRadius: 50,
        borderWidth: 1,
        width: 18,
        padding: 3,
    },
    taskCompleteIcon: {
        height: 10,
        width: 10,
    },
    titleText: {
        color: '#444444',
        padding: 20,
        fontSize: 14,
        fontWeight: '500',
    },

    cardData: {
        backgroundColor: 'white',
    },
    leftContainer: {
        flex: 1,
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    headerText: {
        padding: 8,
        fontSize: 14,
        color: '#444444',
    },
    tabContent: {
        color: '#444444',
        fontSize: 18,
        margin: 24,
    },
    tabContainer: {
        margin: 0,
    },
    Seperator: {
        marginHorizontal: -10,
        alignSelf: 'stretch',
        borderTopWidth: 1,
        borderTopColor: '#888888',
        marginTop: 24,
    },
    tabStyle: {
        borderColor: '#44bbec',
        color: '#44bbec',
        marginBottom: 20,
    },
    tabView: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    activeTabStyle: {
        backgroundColor: '#44bbec',
    },
});

export default UserTaskList;
