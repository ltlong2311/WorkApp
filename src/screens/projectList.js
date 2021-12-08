import React, {useState} from 'react';
import {TouchableOpacity, TouchableHighlight} from 'react-native';
import {View, Text, Image, StyleSheet, Dimensions, Alert} from 'react-native';
import CardView from 'react-native-cardview';
import HeaderComponent from '../components/HeaderComponent';
import DataService from '../services/dataService';
import {SwipeListView} from 'react-native-swipe-list-view';
import ProgressBarAnimated from 'react-native-progress-bar-animated';

const ProjectList = ({navigation}) => {
    const [dataSource, setDataSource] = useState(DataService.projectList());
    const [progressCustomStyles, setProgressCustomStyles] = useState({
        backgroundColor: '#44bbec',
        borderRadius: 0,
        borderColor: '#fff',
    });
    const [isLoading, setIsLoading] = useState(true);
    dataSource.forEach((value, key) => {
        dataSource[key].opentasks = value.tasks_open.length;
        dataSource[key].completedtasks = value.tasks_completed.length;
    });

    const barWidth = Dimensions.get('screen').width - 30;

    const openProjectView = project => {
        navigation.navigate('ProjectView', {
            project: project,
        });
    };
    const editProject = data => {
        navigation.navigate('EditProject', {});
    };
    const deleteProject = () => {
        Alert.alert('SmartHRMS', 'Deleted successfully');
    };

    const _keyExtractor = (item, index) => item.id;
    const _renderItem = ({item}) => (
        <View style={styles.cardView}>
            <TouchableHighlight
                style={styles.card}
                onPress={() => openProjectView(item)}>
                <View style={styles.card}>
                    <CardView
                        style={styles.cardData}
                        cardElevation={2}
                        cardMaxElevation={2}>
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
                                {item.opentasks} open tasks,
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
                                    ]}>
                                    <Image
                                        style={styles.projectIcon}
                                        source={require('../assets/attach.png')}></Image>
                                    &nbsp;{item.tasks_files_count}
                                    &nbsp;&nbsp;
                                    <Image
                                        style={styles.projectIcon}
                                        source={require('../assets/bubble.png')}></Image>
                                    &nbsp;{item.comment_count}
                                </Text>
                            </View>
                        </View>
                    </CardView>
                </View>
            </TouchableHighlight>
        </View>
    );

    return (
        <View style={styles.container}>
            <HeaderComponent
                back="true"
                title="Project List"
                add="true"
                next="CreateProject"
                navigation={navigation}
            />
            <SwipeListView
                useFlatList
                data={dataSource}
                keyExtractor={_keyExtractor}
                renderItem={_renderItem}
                maxToRenderPerBatch={1}
                renderHiddenItem={(data, rowMap) => (
                    <View style={styles.rowBack}>
                        <TouchableOpacity
                            style={[
                                styles.backRightBtn,
                                styles.backRightBtnLeft,
                            ]}
                            onPress={editProject}>
                            <Text style={styles.backTextWhite}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.backRightBtn,
                                styles.backRightBtnRight,
                            ]}
                            onPress={deleteProject}>
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
