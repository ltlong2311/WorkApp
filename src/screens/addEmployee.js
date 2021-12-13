import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import {TextInput} from 'react-native-paper';

import HeaderComponent from '../components/HeaderComponent';
import Loading from '../components/loading';
import {db} from '../../firebaseConnect';
import {doc, setDoc} from 'firebase/firestore/lite';
import data from '../services/dataService';

const AddEmployee = ({navigation}) => {
    const [employee, setEmployee] = useState({
        username: '',
        email: '',
        fullname: '',
        password: '',
        phone: '',
        address: '',
        department: '',
        designation: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const randomId = Math.random().toString(36).substr(2, 11);

    const randomEmployeeId = () => {
        return Math.random().toString(36).substr(2, 9).toUpperCase();
    };

    const alertMess = text =>
        Alert.alert('Message', text, [
            // {text: 'OK', onPress: navigation.pop()},
            {text: 'OK', onPress: navigation.goBack(null)},
        ]);

    const handleCreateEmployee = async () => {
        showLoading();
        if (
            employee.username !== '' &&
            employee.fullname !== '' &&
            employee.email !== '' &&
            employee.password !== ''
        ) {
            await setDoc(doc(db, 'employeeList', randomId), {
                employee_id: randomEmployeeId(),
                username: employee.username,
                email: employee.email,
                fullname: employee.fullname,
                password: employee.password,
                phone: employee.phone,
                address: employee.address,
                department: employee.department,
                designation: employee.designation,
                id: randomId,
            })
                .then(() => {
                    alertMess('Created successfully');
                    hideLoading();
                })
                .catch(error => {
                    console.log(error);
                    hideLoading();
                });
        } else {
            hideLoading();
            Alert.alert('Alert', 'Some input fields cannot be empty!');
        }
    };

    const showLoading = () => {
        setIsLoading(true);
    };
    const hideLoading = () => {
        setIsLoading(false);
    };
    return (
        <View style={styles.container}>
            <HeaderComponent
                back="true"
                title="Add Employee"
                noIcon="true"
                navigation={navigation}
            />
            <ScrollView>
                <View style={{margin: 15}}>
                    <View style={styles.action}>
                        <TextInput
                            onChangeText={text =>
                                setEmployee({...employee, fullname: text})
                            }
                            mode="outlined"
                            label="Full name"
                            style={styles.textInput}
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={styles.action}>
                        <TextInput
                            onChangeText={text =>
                                setEmployee({...employee, username: text})
                            }
                            mode="outlined"
                            label="Username"
                            style={styles.textInput}
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={styles.action}>
                        <TextInput
                            onChangeText={text =>
                                setEmployee({...employee, password: text})
                            }
                            mode="outlined"
                            label="Password"
                            secureTextEntry={true}
                            style={styles.textInput}
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={styles.action}>
                        <TextInput
                            onChangeText={text =>
                                setEmployee({...employee, phone: text})
                            }
                            mode="outlined"
                            label="Phone"
                            keyboardType="numeric"
                            style={styles.textInput}
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={styles.action}>
                        <TextInput
                            onChangeText={text =>
                                setEmployee({...employee, email: text})
                            }
                            mode="outlined"
                            label="Email"
                            style={styles.textInput}
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={styles.action}>
                        <TextInput
                            onChangeText={text =>
                                setEmployee({...employee, address: text})
                            }
                            mode="outlined"
                            label="Address"
                            style={styles.textInput}
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={styles.action}>
                        <TextInput
                            onChangeText={text =>
                                setEmployee({...employee, department: text})
                            }
                            mode="outlined"
                            label="Department"
                            style={styles.textInput}
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={styles.action}>
                        <TextInput
                            onChangeText={text =>
                                setEmployee({...employee, designation: text})
                            }
                            mode="outlined"
                            label="Designation"
                            style={styles.textInput}
                            autoCapitalize="none"
                        />
                    </View>
                </View>

                <View style={{paddingHorizontal: 15}}>
                    <Button title="create" onPress={handleCreateEmployee} />
                </View>
            </ScrollView>
            {isLoading && <Loading />}
        </View>
    );
};

export default AddEmployee;

const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        flex: 1,
        width: '100%',
        backgroundColor: '#ffffff',
        color: '#918E8E',
    },
    action: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 15,
    },
    textInput: {
        flex: 1,
        height: 40,
        backgroundColor: '#e6fffe',
        paddingBottom: 0,
        outlineColor: '#05375a',
        fontSize: 16,
        borderBottom: 'none',
    },
    label: {
        fontSize: 14,
        fontHeight: 400,
    },
});
