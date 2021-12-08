import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Image,
    Switch,
    ScrollView,
    Platform,
} from 'react-native';
// import {Form, Item, Input, Label} from 'native-base';
import Loading from '../components/loading';
import HeaderComponent from '../components/HeaderComponent';

export default class EditEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            toggle: false,
            dataSource: [],
        };
        const {navigation} = this.props;
        this.state.dataSource = navigation.getParam('employee', 'emp data');
    }

    //Show Loader function
    showLoading() {
        this.setState({loading: true});
    }
    //Hide Loader function
    hideLoading() {
        this.setState({loading: false});
    }
    //Login function using firebase
    login() {
        setTimeout(() => {
            this.hideLoading();
            this.props.navigation.navigate('drawerNavigation');
        }, 1000);
        this.showLoading();
    }
    toggleSwitch1 = value => {
        this.setState({toggle: value});
    };
    //navigate to screens
    navigateScreen = viewId => {
        const {navigate} = this.props.navigation;
        navigate(viewId);
    };
    isLead = () => {
        if (this.state.toggle) {
            return (
                <></>
                // <Item floatingLabel>
                //     <Label style={styles.loginLabel}>Team Lead Name</Label>
                //     <Input />
                // </Item>
            );
        } else {
            return null;
        }
    };

    editEmp = () => {
        this.props.navigation.pop();
    };

    render() {
        return (
            <View style={styles.container}>
                <HeaderComponent
                    back="true"
                    title="Add Employee"
                    noIcon="true"
                    navigation={this.props.navigation}
                />
                <ScrollView>
                    {/* <Form style={{paddingRight: 15}}>
                        <Item floatingLabel>
                            <Label style={styles.loginLabel}>Fullname</Label>
                            <Input value={this.state.dataSource.fullname} />
                        </Item>
                        <Item floatingLabel>
                            <Label style={styles.loginLabel}>Username</Label>
                            <Input value={this.state.dataSource.username} />
                        </Item>
                        <Item floatingLabel>
                            <Label style={styles.loginLabel}>Phone</Label>
                            <Input value={this.state.dataSource.phone} />
                        </Item>
                        <Item floatingLabel>
                            <Label style={styles.loginLabel}>Email</Label>
                            <Input value={this.state.dataSource.email} />
                        </Item>
                        <Item floatingLabel>
                            <Label style={styles.loginLabel}>Department</Label>
                            <Input value={this.state.dataSource.department} />
                        </Item>
                        <Item floatingLabel>
                            <Label style={styles.loginLabel}>Designation</Label>
                            <Input value={this.state.dataSource.designation} />
                        </Item>
                    </Form> */}
                    <TouchableHighlight
                        style={[styles.buttonContainer, styles.loginButton]}
                        onPress={() => this.editEmp()}>
                        <Text style={styles.loginText}>Edit Employee</Text>
                    </TouchableHighlight>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        flex: 1,
        width: '100%',
        backgroundColor: '#ffffff',
        color: '#918E8E',
    },
    toggleContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        width: '100%',
        color: '#918E8E',
    },
    logocontainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginLabel: {
        fontSize: 14,
        color: '#000000',
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginTitle: {
        marginTop: '10%',
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginTitleText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '700',
    },
    loginContainer: {
        marginTop: '15%',
        alignItems: 'center',
        marginBottom: '15%',
        marginLeft: '2%',
        marginRight: '2%',
    },
    textInput: {
        marginTop: 10,
    },
    inputContainer: {
        borderColor: '#e7e7e7',
        backgroundColor: '#FFFFFF',
        borderRadius: 3,
        borderWidth: 1,
        color: '#998e8e',
        width: '90%',
        height: 40,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputs: {
        height: 40,
        marginLeft: 10,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
        borderRadius: 2,
    },
    forgetPassword: {
        textAlign: 'right',
        color: '#918E8E',
    },
    loginButton: {
        backgroundColor: '#44bbec',
        borderRadius: 5,
    },
    orText: {
        marginTop: '5%',
        marginBottom: '5%',
        alignItems: 'center',
    },
    orTextText: {
        color: '#918E8E',
    },
    registerButton: {
        backgroundColor: '#0065f3',
        borderRadius: 3,
    },
    loginText: {
        color: 'white',
        height: 38,
        fontSize: 18,
        justifyContent: 'center',
        marginTop: 13,
        textAlign: 'center',
        width: '100%',
        borderRadius: 2,
    },
});
