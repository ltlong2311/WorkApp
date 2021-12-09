import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Image,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    Alert,
} from 'react-native';
// import {signInWithEmailAndPassword} from '@firebase/auth';
import {authentication} from '../../firebaseConnect';
import {createUserWithEmailAndPassword} from '@firebase/auth';

import Loading from '../components/loading';

export default class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: false,
        };
    }

    //Show Loader function
    showLoading() {
        this.setState({loading: true});
    }
    //Hide Loader function
    hideLoading() {
        this.setState({loading: false});
    }
    backLogin = () => {
        this.props.navigation.navigate('Login');
    };
    //navigate to screens
    navigateScreen = viewId => {
        const {navigate} = this.props.navigation;
        navigate(viewId);
    };

    handleSignUp = () => {
        this.showLoading();
        createUserWithEmailAndPassword(
            authentication,
            this.state.email,
            this.state.password,
        )
            .then(res => {
                console.log(res);
                this.hideLoading();
                Alert.alert('Message', 'Register successfully');
                this.props.navigation.navigate('Dashboard');
            })
            .catch(error => {
                console.log(error);
                this.hideLoading();
            });
    };

    render() {
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView>
                    <ScrollView>
                        <View style={styles.logocontainer}>
                            <Image
                                style={styles.logo}
                                source={require('../assets/logo-app.png')}
                            />
                        </View>
                        <View style={styles.loginTitle}>
                            <Text style={styles.loginTitleText}>Register</Text>
                        </View>
                        <View style={styles.loginContainer}>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.inputs}
                                    placeholderTextColor="#a19797"
                                    placeholder="Email"
                                    keyboardType="email-address"
                                    underlineColorAndroid="transparent"
                                    autoCapitalize="none"
                                    onChangeText={email =>
                                        this.setState({email})
                                    }
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.inputs}
                                    placeholderTextColor="#a19797"
                                    placeholder="Password"
                                    secureTextEntry={true}
                                    underlineColorAndroid="transparent"
                                    onChangeText={password =>
                                        this.setState({password})
                                    }
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.inputs}
                                    placeholderTextColor="#a19797"
                                    placeholder="Repeat Password"
                                    secureTextEntry={true}
                                    underlineColorAndroid="transparent"
                                    onChangeText={password =>
                                        this.setState({password})
                                    }
                                />
                            </View>
                            <TouchableHighlight
                                style={[
                                    styles.buttonContainer,
                                    styles.loginButton,
                                ]}
                                onPress={() => this.handleSignUp()}>
                                <Text style={styles.loginText}>Register</Text>
                            </TouchableHighlight>
                            <Text
                                style={[
                                    styles.buttonContainer,
                                    styles.forgetPassword,
                                ]}
                                onPress={() => this.backLogin()}>
                                Already have an account? Login
                            </Text>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                {this.state.loading && <Loading />}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'ios' ? 50 : 0,
        flex: 1,
        width: '100%',
        backgroundColor: '#ffffff',
        color: '#918E8E',
    },
    logocontainer: {
        marginTop: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginTitle: {
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
        marginTop: '5%',
        alignItems: 'center',
        marginBottom: '15%',
        marginLeft: '2%',
        marginRight: '2%',
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
        height: 35,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        width: '90%',
        borderRadius: 2,
    },
    forgetPassword: {
        textAlign: 'center',
        color: '#000000',
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
    },
});
