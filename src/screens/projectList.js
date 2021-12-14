import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    Alert,
    TouchableOpacity,
} from 'react-native';
import CardView from 'react-native-cardview';
import {useIsFocused} from '@react-navigation/native';
import HeaderComponent from '../components/HeaderComponent';
import DataService from '../services/dataService';
import {SwipeListView} from 'react-native-swipe-list-view';
import ProgressBarAnimated from 'react-native-progress-bar-animated';

import {db} from '../../firebaseConnect';
import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    getDoc,
} from 'firebase/firestore/lite';
import Loading from '../components/loading';

const ProjectList = ({navigation}) => {
    // const [dataSource, setDataSource] = useState(DataService.projectList());
    const [dataSource, setDataSource] = useState([]);
    const [isChange, setIsChange] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [progressCustomStyles, setProgressCustomStyles] = useState({
        backgroundColor: '#44bbec',
        borderRadius: 0,
        borderColor: '#fff',
    });
    dataSource.forEach((value, key) => {
        dataSource[key].opentasks = 0;
        dataSource[key].completedtasks = 0;
        dataSource[key].tasks.forEach((val, k) => {
            if (val.task_detail.task_progress === 100) {
                dataSource[key].completedtasks++;
            } else {
                dataSource[key].opentasks++;
            }
        });
    });
    useEffect(() => {
        GetData();
        const willFocusSubscription = navigation.addListener('focus', () => {
            GetData();
        });
        return willFocusSubscription;
    }, [isChange]);

    const GetData = async () => {
        const projectCol = collection(db, 'projectList');
        const projectSnapshot = await getDocs(projectCol);
        const projectList = projectSnapshot.docs.map(doc => doc.data());
        setDataSource(projectList);
    };

    const onDeleteProject = data => {
        Alert.alert('Alert', 'Are you sure?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
            },
            {text: 'Delete', onPress: () => deleteProject(data)},
        ]);
    };

    const deleteProject = async data => {
        showLoading();
        var ref = doc(db, 'projectList', data.item.id);
        const docSnap = await getDoc(ref);
        if (!docSnap.exists()) {
            hideLoading();
            Alert.alert('Message', 'not exits');
        }

        await deleteDoc(ref)
            .then(() => {
                hideLoading();
                setIsChange(!isChange);
                Alert.alert('Message', 'Deleted successfully');
            })
            .catch(error => {
                hideLoading();
                console.log(error);
            });
    };

    const showLoading = () => {
        setIsLoading(true);
    };
    const hideLoading = () => {
        setIsLoading(false);
    };

    // console.log('data', dataSource);
    const barWidth = Dimensions.get('screen').width - 30;

    const _keyExtractor = (item, index) => item.id;
    const _renderItem = ({item}) => (
        <View style={styles.cardView}>
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('projectTask', {project: item})
                }
                activeOpacity={0.95}
                style={styles.card}>
                <View style={styles.card}>
                    <CardView
                        style={styles.cardData}
                        cardElevation={2}
                        cardMaxElevation={2}
                        useNativeDriver={false}>
                        <View style={styles.navBar}>
                            <View style={styles.leftContainer}>
                                <Text
                                    style={[
                                        {textAlign: 'left'},
                                        styles.swipeCardLeftText,
                                    ]}>
                                    {item.project_title}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.navBar}>
                            <Text
                                style={[
                                    {textAlign: 'left'},
                                    styles.invoiceCompany,
                                ]}>
                                {item.opentasks} in progress tasks,
                                {item.completedtasks} tasks completed
                            </Text>
                        </View>
                        <View style={styles.progressBar}>
                            <ProgressBarAnimated
                                width={barWidth}
                                maxValue={100}
                                value={item.progress}
                                height={6}
                                useNativeDriver={false}
                            />
                        </View>
                        <View style={styles.navBar}>
                            <View style={styles.leftContainer}>
                                <Text
                                    style={[
                                        {textAlign: 'left'},
                                        styles.calendarText,
                                    ]}>
                                    <Image
                                        style={styles.projectIcon}
                                        source={require('../assets/calendar.png')}></Image>
                                    &nbsp;&nbsp;{item.due_date}
                                </Text>
                            </View>
                            <View style={styles.rightContainer}>
                                <Text
                                    style={[
                                        {textAlign: 'right'},
                                        styles.calendarText,
                                    ]}></Text>
                            </View>
                        </View>
                    </CardView>
                </View>
            </TouchableOpacity>
            {isLoading && <Loading />}
        </View>
    );

    return (
        <View style={styles.container}>
            <HeaderComponent
                back="true"
                title="Project List"
                add="true"
                goBack="Dashboard"
                next="CreateProject"
                navigation={navigation}
                data=""
            />
            <SwipeListView
                useFlatList
                data={dataSource}
                keyExtractor={_keyExtractor}
                renderItem={_renderItem}
                maxToRenderPerBatch={1}
                useNativeDriver={false}
                renderHiddenItem={(data, rowMap) => (
                    <View style={styles.rowBack}>
                        <TouchableOpacity
                            activeOpacity={0.3}
                            style={[
                                styles.backRightBtn,
                                styles.backRightBtnLeft,
                            ]}
                            onPress={() =>
                                navigation.navigate('EditProject', {
                                    project: data,
                                })
                            }>
                            <Text style={styles.backTextWhite}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            actionOpacity={0.3}
                            style={[
                                styles.backRightBtn,
                                styles.backRightBtnRight,
                            ]}
                            onPress={() => onDeleteProject(data)}>
                            <Text style={styles.backTextWhite}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
                rightOpenValue={-150}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
            />
        </View>
    );
};
export default ProjectList;

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
        marginTop: 5,
        marginBottom: 5,
    },
    card: {
        width: '100%',
        opacity: 1,
    },
    cardData: {
        backgroundColor: 'white',
        width: '100%',
        height: 'auto',
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
    },
    cardTitle: {
        fontSize: 12,
        lineHeight: 20,
        color: '#777',
    },
    cardQuantity: {
        fontSize: 14,
        fontWeight: '800',
        color: '#333',
    },
    swipeCardLeftText: {
        color: '#333',
        fontSize: 15,
        fontWeight: '600',
        lineHeight: 30,
    },
    calendarText: {
        color: '#909090',
        fontSize: 12,
        lineHeight: 30,
    },
    invoiceCompany: {
        color: '#333',
        fontSize: 15,
    },
    swipeCardRightText: {
        color: '#333',
        fontSize: 14,
        fontWeight: 'bold',
        lineHeight: 30,
    },
    payment: {
        borderRadius: 4,
        fontWeight: 'bold',
        color: '#fff',
        height: 18,
        width: 65,
        fontSize: 11,
        paddingTop: 1,
        marginTop: 5,
        textAlign: 'center',
    },

    paymentPartial: {
        backgroundColor: '#ff9500',
    },
    paymentSent: {
        backgroundColor: '#007aff',
    },
    paymentFailed: {
        backgroundColor: '#ff3b30',
    },
    paymentSuccess: {
        backgroundColor: '#4cd964',
    },
    companyName: {
        color: '#666',
        fontSize: 12,
        fontWeight: 'bold',
    },
    standalone: {
        marginTop: 30,
        marginBottom: 30,
    },
    standaloneRowFront: {
        alignItems: 'center',
        backgroundColor: '#e7e7e7',
        justifyContent: 'center',
        height: 50,
    },
    standaloneRowBack: {
        alignItems: 'center',
        backgroundColor: '#8BC645',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#e7e7e7',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#e7e7e7',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        marginTop: 5,
        marginBottom: 5,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: '#4cd964',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: '#ff5858',
        right: 0,
    },
    controls: {
        alignItems: 'center',
        marginBottom: 30,
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    switch: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        paddingVertical: 10,
    },
    trash: {
        height: 25,
        width: 25,
    },
    projectIcon: {
        width: 10,
        height: 10,
    },
    navBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    progressBar: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: '#e2e2e2',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
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
    },
    rightIcon: {
        height: 10,
        width: 10,
        resizeMode: 'contain',
        backgroundColor: 'white',
    },
});
