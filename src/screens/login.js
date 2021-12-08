import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Image,
    TouchableOpacity,
    StatusBar,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Loading from '../components/loading';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const LoginPage = ({navigation}) => {
    const [dataLogin, setDataLogin] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const updateSecureTextEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const showLoading = () => {
        setLoading(true);
    };

    const hideLoading = () => {
        setLoading(false);
    };

    const login = () => {
        setTimeout(() => {
            hideLoading;
            navigation.navigate('Home');
        }, 200);
        showLoading;
    };
    const register = () => {
        navigation.navigate('RegisterPage');
    };


    return (
        <View style={styles.container}>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="dark-content"
            />
            <SafeAreaView>
                <View style={styles.logocontainer}>
                    <Image
                        style={styles.logo}
                        source={require('../assets/smarthrlogo.png')}
                    />
                </View>
                <View style={styles.loginTitle}>
                    <Text style={styles.loginTitleText}>Login</Text>
                </View>
                <View style={styles.loginContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputs}
                            placeholderTextColor="#a19797"
                            placeholder="Email"
                            secureTextEntry={true}
                            keyboardType="email-address"
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                            onChangeText={email =>
                                setDataLogin({...dataLogin, email: email})
                            }
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputs}
                            placeholderTextColor="#a19797"
                            placeholder="Password"
                            secureTextEntry={secureTextEntry ? true : false}
                            underlineColorAndroid="transparent"
                            onChangeText={password =>
                                setDataLogin({...dataLogin, password: password})
                            }
                        />
                        <TouchableOpacity onPress={updateSecureTextEntry}>
                            {secureTextEntry ? (
                                <MaterialCommunityIcons
                                    name="eye-off"
                                    color="grey"
                                    size={20}
                                />
                            ) : (
                                <MaterialCommunityIcons
                                    name="eye"
                                    color="grey"
                                    size={20}
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                    <Text
                        style={[styles.buttonContainer, styles.forgetPassword]}
                        onPress={() => navigation.navigate('ForgotPassword')}>
                        Forgot Password?
                    </Text>
                    <TouchableHighlight
                        style={[styles.buttonContainer, styles.loginButton]}
                        onPress={login}>
                        <Text style={styles.loginText}>Login</Text>
                    </TouchableHighlight>

                    <Text
                        style={[styles.buttonContainer, styles.register]}
                        onPress={register}>
                        Don't have an account? Register
                    </Text>
                </View>
            </SafeAreaView>
            {loading && <Loading />}
        </View>
    );
};

export default LoginPage;

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'ios' ? 50 : 0,
        flex: 1,
        width: '100%',
        backgroundColor: '#ffffff',
        color: '#918E8E',
    },
    logocontainer: {
        marginTop: '20%',
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
        textAlign: 'right',
        color: '#000000',
    },
    register: {
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
