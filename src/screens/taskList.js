import React, {Component} from 'react';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import CardView from 'react-native-cardview';
import HeaderComponent from '../components/HeaderComponent';
import DataService from '../services/dataService';
import {FlatList} from 'react-native-gesture-handler';

class TaskList extends Component {
    constructor() {
        super();
        this.state = {
            selectedIndex: 0,
            dataSource: [],
            compeltedTask: [],
            openTasks: [],
            tasks: [],
            tab: null,
        };
        this.state.tasks = DataService.taskList();
        this.state.dataSource = this.state.tasks.tasks;
        this.state.dataSource.forEach((value, key) => {
            if (value.task_detail.task_progress === 100) {
                this.state.compeltedTask.push(value);
            } else {
                this.state.openTasks.push(value);
            }
        });
        this.handleSingleIndexSelect(0);
    }

    handleSingleIndexSelect = index => {
        this.setState(prevState => ({...prevState, selectedIndex: index}));
        if (index === 0) {
            this.state.dataSource = this.state.openTasks;
            this.state.tab = (
                <FlatList
                    data={this.state.openTasks}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
            );
        } else if (index === 1) {
            this.state.tab = (
                <FlatList
                    data={this.state.compeltedTask}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                />
            );
        } else if (index === 2) {
            this.state.dataSource = this.state.tasks.tasks;
            this.state.tab = (
                <FlatList
                    data={this.state.dataSource}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                />
            );
        }
    };
    renderIcon(item) {
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
    }
    _keyExtractor = (item, index) => item.id;
    _renderItem = ({item}) => (
        <TouchableOpacity
            onPress={() => this.props.navigation.navigate('TaskView')}>
            <View style={styles.cardView}>
                <CardView
                    style={styles.cardData}
                    cardElevation={2}
                    cardMaxElevation={2}
                    cornerRadius={0}>
                    <View style={styles.taskRow}>
                        <View style={styles.leftContainer}>
                            {this.renderIcon(item)}
                            <Text style={styles.taskName}>
                                {item.task_detail.task_name}
                            </Text>
                        </View>
                    </View>
                </CardView>
            </View>
        </TouchableOpacity>
    );

    render() {
        const {selectedIndex} = this.state;
        return (
            <View style={styles.container}>
                <HeaderComponent
                    back="true"
                    title="Task List"
                    add="true"
                    next="AddTask"
                    goBack="Dashboard"
                    navigation={this.props.navigation}
                />
                <View style={styles.tabView}>
                    <SegmentedControlTab
                        values={['Pending', 'Completed', 'All']}
                        selectedIndex={selectedIndex}
                        tabsContainerDisableStyle={true}
                        tabStyle={styles.tabStyle}
                        activeTabStyle={styles.activeTabStyle}
                        // tabsContainerStyle={styles.tabContainer}
                        onTabPress={this.handleSingleIndexSelect}
                    />
                    {selectedIndex === 0 && this.state.tab}
                    {selectedIndex === 1 && this.state.tab}
                    {selectedIndex === 2 && this.state.tab}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e7e7e7',
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

export default TaskList;
