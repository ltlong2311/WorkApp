import React, {Component} from 'react';
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

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                {key: '1', title: 'Overview'},
                {key: '2', title: 'Education'},
                {key: '3', title: 'Experience'},
            ],
            dataSource: {},
            education: [],
            experience: [],
            client: false,
        };
        const {navigation} = this.props;
        this.state.client = navigation.getParam('client');
        if (this.state.client) {
            this.state.client = true;
        } else {
            this.state.client = false;
        }
        this.state.dataSource = DataService.employeeProfile();
        this.state.education = JSON.parse(
            this.state.dataSource.education_details,
        );
        this.state.experience = JSON.parse(
            this.state.dataSource.experience_information,
        );
    }

    _handleIndexChange = index => this.setState({index});

    _renderTabBar = props => {
        const inputRange = props.navigationState.routes.map((x, i) => i);
        return (
            <View style={styles.tabBar}>
                {props.navigationState.routes.map((route, i) => {
                    const color = props.position.interpolate({
                        inputRange,
                        outputRange: inputRange.map(inputIndex =>
                            inputIndex === i ? '#44bbec' : '#929292',
                        ),
                    });
                    return (
                        <TouchableOpacity
                            style={styles.tabItem}
                            onPress={() => this.setState({index: i})}>
                            <Animated.Text style={{color}}>
                                {route.title}
                            </Animated.Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    _keyExtractor = (item, index) => item.id;
    _renderEduItem = ({item}) => (
        <View style={styles.cardView}>
            <View style={styles.card}>
                <CardView
                    style={styles.cardData}
                    cardElevation={0}
                    cardMaxElevation={0}>
                    <View style={styles.tabCard}>
                        <Text style={styles.institutionName}>
                            {item.institution}
                        </Text>
                        <Text style={styles.course}>
                            {item.degree} {item.subject}
                        </Text>
                        <Text style={styles.duration}>
                            {item.start_year} {item.complete_year}
                        </Text>
                    </View>
                </CardView>
            </View>
        </View>
    );
    _renderExpItem = ({item}) => (
        <View style={styles.cardView}>
            <View style={styles.card}>
                <CardView
                    style={styles.cardData}
                    cardElevation={0}
                    cardMaxElevation={0}>
                    <View style={styles.tabCard}>
                        <Text style={styles.institutionName}>
                            {item.jop_position} at {item.company}
                        </Text>
                        <Text style={styles.course}>
                            {item.period_from}-present(2years)
                        </Text>
                        {/* <Text style={styles.duration}>
                            {item.start_year} {item.complete_year}
                        </Text> */}
                    </View>
                </CardView>
            </View>
        </View>
    );

    _renderScene = ({route}) => {
        switch (route.key) {
            case '1':
                return (
                    <View style={styles.scene}>
                        <ScrollView
                            contentContainerStyle={styles.contentContainer}>
                            <CardView
                                style={styles.cardData}
                                cardElevation={0}
                                cardMaxElevation={0}
                                cornerRadius={0}>
                                <View style={styles.taskRow}>
                                    <View style={styles.leftContainer}>
                                        <Text
                                            style={[
                                                {textAlign: 'left'},
                                                styles.swipeCardLeftText,
                                            ]}>
                                            Employee ID
                                        </Text>
                                    </View>
                                    <View style={styles.rightContainer}>
                                        <Text
                                            style={[
                                                {textAlign: 'right'},
                                                styles.swipeCardRightText,
                                            ]}>
                                            {this.state.dataSource.user_id}
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
                                            Phone
                                        </Text>
                                    </View>
                                    <View style={styles.rightContainer}>
                                        <Text
                                            style={[
                                                {textAlign: 'right'},
                                                styles.swipeCardRightText,
                                            ]}>
                                            {this.state.dataSource.phone}
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
                                            Email
                                        </Text>
                                    </View>
                                    <View style={styles.rightContainer}>
                                        <Text
                                            style={[
                                                {textAlign: 'right'},
                                                styles.swipeCardRightText,
                                            ]}>
                                            {this.state.dataSource.email}
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
                                            Birthday
                                        </Text>
                                    </View>
                                    <View style={styles.rightContainer}>
                                        <Text
                                            style={[
                                                {textAlign: 'right'},
                                                styles.swipeCardRightText,
                                            ]}>
                                            {this.state.dataSource.dob}
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
                                            Gender
                                        </Text>
                                    </View>
                                    <View style={styles.rightContainer}>
                                        <Text
                                            style={[
                                                {textAlign: 'right'},
                                                styles.swipeCardRightText,
                                            ]}>
                                            {this.state.dataSource.dob}
                                        </Text>
                                    </View>
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
                                            {
                                                textAlign: 'left',
                                                fontWeight: '600',
                                            },
                                            styles.swipeCardLeftText,
                                        ]}>
                                        Address
                                    </Text>
                                </View>
                                <View style={styles.leftContainer}>
                                    <Text
                                        style={[
                                            {textAlign: 'left'},
                                            styles.swipeCardLeftText,
                                        ]}>
                                        {this.state.dataSource.address},
                                        {this.state.dataSource.city},
                                        {this.state.dataSource.country}{' '}
                                    </Text>
                                </View>
                            </CardView>
                        </ScrollView>
                    </View>
                );
            case '2':
                return (
                    <View style={{marginTop: 15}}>
                        <FlatList
                            data={this.state.education}
                            windowSize={2}
                            initialNumToRender={1}
                            maxToRenderPerBatch={1}
                            removeClippedSubviews={false}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderEduItem}
                        />
                    </View>
                );
            case '3':
                return (
                    <View style={{marginTop: 15}}>
                        <FlatList
                            data={this.state.experience}
                            windowSize={2}
                            initialNumToRender={1}
                            maxToRenderPerBatch={1}
                            removeClippedSubviews={false}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderExpItem}
                        />
                    </View>
                );
            default:
                return null;
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <HeaderComponent
                    back="true"
                    edit="true"
                    next="EditProfile"
                    navigation={this.props.navigation}
                />
                <View style={{flex: 4}}>
                    <LinearGradient
                        colors={['#44bbec', '#0163fc']}
                        style={styles.linearGradient}>
                        <View style={styles.dashBoardCard}>
                            <Image
                                style={styles.userImg}
                                source={require('../images/user.jpg')}
                            />
                            <Text style={styles.userName}>
                                {this.state.dataSource.fullname}
                            </Text>
                            {this.state.client == false ? (
                                <Text style={styles.designation}>
                                    {this.state.dataSource.designation}
                                </Text>
                            ) : null}
                        </View>
                    </LinearGradient>
                </View>
                <View style={{flex: 6}}>
                    <TabView
                        navigationState={this.state}
                        renderScene={this._renderScene}
                        renderTabBar={this._renderTabBar}
                        onIndexChange={this._handleIndexChange}
                    />
                </View>
            </View>
        );
    }
}

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
        marginBottom: 20,
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
