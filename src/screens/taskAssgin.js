import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,
    Platform,
    Alert,
} from 'react-native';
// import {Form, Item, Input, Label} from 'native-base';
import Loading from '../components/loading';
import {TextInput} from 'react-native-paper';
import HeaderComponent from '../components/HeaderComponent';

import {db} from '../../firebaseConnect';
import {doc, setDoc, updateDoc} from 'firebase/firestore/lite';

const TaskAssign = ({navigation, route}) => {
    const employeeProfile = route.params.employee;
    const [isLoading, setIsLoading] = useState(false);
    const [employee, setEmployee] = useState({
        username: employeeProfile.username,
        email: employeeProfile.email,
        fullname: employeeProfile.fullname,
        phone: employeeProfile.phone,
        address: employeeProfile.address,
        department: employeeProfile.department,
        designation: employeeProfile.designation,
    });

    const ref = doc(db, 'employeeList',employeeProfile.id);

    const alertMess = text =>
        Alert.alert('Message', text, [
            {text: 'OK', onPress: navigation.goBack(null)},
        ]);

    const handleCreateEmployee = async () => {
        showLoading();
        if (
            employee.username !== '' &&
            employee.fullname !== '' &&
            employee.email !== ''
        ) {
            await updateDoc(ref, employee)
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
                title="Edit Employee"
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
                            defaultValue={employee.fullname}
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
                            defaultValue={employee.username}
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
                            defaultValue={employee.phone}
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
                            defaultValue={employee.email}
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
                            defaultValue={employee.address}
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
                            defaultValue={employee.department}
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
                            defaultValue={employee.designation}
                        />
                    </View>
                </View>
                <View style={{paddingHorizontal: 15}}>
                    <Button title="Edit" onPress={handleCreateEmployee} />
                </View>
            </ScrollView>
            {isLoading && <Loading />}
        </View>
    );
};

export default TaskAssign;

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
