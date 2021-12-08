import React, {useState} from 'react';
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    Animated,
    Dimensions,
    Image,
    TouchableOpacity,
} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import HeaderComponent from '../components/HeaderComponent';
import DataService from '../services/dataService';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';
import CardView from 'react-native-cardview';
import ProgressBarAnimated from 'react-native-progress-bar-animated';

const TaskView = ({navigation}) => {
    const [dataSource, setDataSource] = useState(
        DataService.taskList().tasks[1],
    );
    const [isLoading, setIsLoading] = useState(true);
    const [progressCustomStyles, setProgressCustomStyles] = useState({
        backgroundColor: '#44bbec',
        borderRadius: 0,
        borderColor: '#fff',
    });
    const barWidth = Dimensions.get('screen').width;

    return (
        <View style={styles.container}>
            <HeaderComponent
                back="true"
                noIcon="true"
                title={dataSource.task_detail.task_name}
                navigation={navigation}
            />
            <View style={styles.scene}>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <CardView
                        style={styles.cardData}
                        cardElevation={0}
                        cardMaxElevation={0}
                        cornerRadius={0}>
                        <View style={styles.leftContainer}>
                            <Text
                                style={[
                                    {textAlign: 'left', fontWeight: '600'},
                                    styles.swipeCardLeftText,
                                ]}>
                                Task Details
                            </Text>
                        </View>
                        <View style={styles.taskRow}>
                            <View style={styles.leftContainer}>
                                <Text
                                    style={[
                                        {textAlign: 'left'},
                                        styles.swipeCardLeftText,
                                    ]}>
                                    Total Time
                                </Text>
                            </View>
                            <View style={styles.rightContainer}>
                                <Text
                                    style={[
                                        {textAlign: 'right'},
                                        styles.swipeCardRightText,
                                    ]}>
                                    {dataSource.task_detail.end_time}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.taskRow}>
                            <View style={styles.leftContainer}>
                                <Text
                                    style={[
                                        {textAlign: 'left'},
                                        styles.swipeCardLeftText,
                                    ]}>
                                    Estimate
                                </Text>
                            </View>
                            <View style={styles.rightContainer}>
                                <Text
                                    style={[
                                        {textAlign: 'right'},
                                        styles.swipeCardRightText,
                                    ]}>
                                    {dataSource.task_detail.estimated_hours}{' '}
                                    hours
                                </Text>
                            </View>
                        </View>
                        <View style={styles.taskRow}>
                            <View style={styles.leftContainer}>
                                <Text
                                    style={[
                                        {textAlign: 'left'},
                                        styles.swipeCardLeftText,
                                    ]}>
                                    Start Date
                                </Text>
                            </View>
                            <View style={styles.rightContainer}>
                                <Text
                                    style={[
                                        {textAlign: 'right'},
                                        styles.swipeCardRightText,
                                    ]}>
                                    {dataSource.task_detail.start_date}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.taskRow}>
                            <View style={styles.leftContainer}>
                                <Text
                                    style={[
                                        {textAlign: 'left'},
                                        styles.swipeCardLeftText,
                                    ]}>
                                    End Date
                                </Text>
                            </View>
                            <View style={styles.rightContainer}>
                                <Text
                                    style={[
                                        {textAlign: 'right'},
                                        styles.swipeCardRightText,
                                    ]}>
                                    {dataSource.task_detail.due_date}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.taskRow}>
                            <View style={styles.leftContainer}>
                                <Text
                                    style={[
                                        {textAlign: 'left'},
                                        styles.swipeCardLeftText,
                                    ]}>
                                    Created By
                                </Text>
                            </View>
                            <View style={styles.rightContainer}>
                                <Text
                                    style={[
                                        {textAlign: 'right'},
                                        styles.swipeCardRightText,
                                    ]}>
                                    {dataSource.task_detail.fullname}
                                </Text>
                            </View>
                        </View>
                    </CardView>
                    <CardView
                        style={[styles.cardData, {marginTop: 20}]}
                        cardElevation={0}
                        cardMaxElevation={0}
                        cornerRadius={0}>
                        <View style={styles.leftContainer}>
                            <Text
                                style={[
                                    {textAlign: 'left', fontWeight: '600'},
                                    styles.swipeCardLeftText,
                                ]}>
                                Task Description
                            </Text>
                        </View>
                        <View style={styles.leftContainer}>
                            <Text
                                style={[
                                    {textAlign: 'left'},
                                    styles.swipeCardLeftText,
                                ]}>
                                {dataSource.task_detail.description}
                            </Text>
                        </View>
                    </CardView>
                    <CardView
                        style={[
                            styles.cardData,
                            {marginTop: 20, marginBottom: 20},
                        ]}
                        cardElevation={0}
                        cardMaxElevation={0}
                        cornerRadius={0}>
                        <View style={styles.leftContainer}>
                            <Text
                                style={[
                                    {textAlign: 'left', fontWeight: '600'},
                                    styles.swipeCardLeftText,
                                ]}>
                                Task Progress
                            </Text>
                        </View>
                        <View style={styles.leftContainer}>
                            <Text
                                style={[
                                    {textAlign: 'left', fontWeight: '600'},
                                    styles.projectTitle,
                                ]}>
                                Progress: {dataSource.task_detail.task_progress}
                                %
                            </Text>
                        </View>

                        <View style={styles.progressBar}>
                            <ProgressBarAnimated
                                ba
                                {...progressCustomStyles}
                                width={barWidth}
                                maxValue={100}
                                value={dataSource.task_detail.task_progress}
                                height={6}
                            />
                        </View>
                    </CardView>
                </ScrollView>
            </View>
        </View>
    );
};

export default TaskView;

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
    },
    cardData: {
        backgroundColor: 'white',
        width: '100%',
        height: 'auto',
        justifyContent: 'center',
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
        alignItems: 'center',
    },
    scene: {
        flex: 1,
        marginTop: 20,
    },
    userImg: {
        borderRadius: 50,
        width: 100,
        height: 100,
    },
    userName: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '700',
    },
    designation: {
        fontSize: 12,
        color: '#fff',
    },
    progressBar: {
        flex: 1,
        width: '95%',
        flexDirection: 'row',
        margin: 10,
        backgroundColor: '#e2e2e2',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    taskRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderBottomColor: '#e7e7e7',
        borderBottomWidth: 1,
        marginRight: 10,
        marginLeft: 10,
    },
    addressRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginRight: 10,
        marginLeft: 10,
    },
    dashBoardCard: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    linearGradient: {
        width: '100%',
        paddingLeft: 0,
        paddingRight: 0,
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
    cardData: {
        backgroundColor: 'white',
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
    },
    leftContainer: {
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    addressContainer: {
        flex: 1,
        marginLeft: 18,
        marginRight: 18,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    rightContainer: {
        flex: 1,
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    swipeCardLeftText: {
        color: '#2D2D2D',
        fontSize: 14,
    },
    swipeCardRightText: {
        color: '#8e8e93',
        fontSize: 14,
        // lineHeight: 30,
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
});
