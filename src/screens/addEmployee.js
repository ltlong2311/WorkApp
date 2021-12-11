import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import {TextInput} from 'react-native-paper';

import HeaderComponent from '../components/HeaderComponent';
import Loading from '../components/loading';
import {db} from '../../firebaseConnect';
import {doc, setDoc} from 'firebase/firestore/lite';

const AddEmployee = ({navigation}) => {
    const [data, setData] = useState({
        project_title: '',
        start_date: '',
        due_date: '',
        estimate_hours: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const randomId = () => {
        return Math.random().toString(36).substr(2, 11);
    };

    const handleCreateEmployee = async () => {
        showLoading();
        await setDoc(doc(db, 'employeeList', randomId()), {
            assign_lead: '1',
            progress: 0,
        });
        hideLoading();
    };

    //Show Loader function
    const showLoading = () => {
        setIsLoading(true);
    };
    //Hide Loader function
    const hideLoading = () => {
        setIsLoading(false);
    };
    const addEmp = () => {
        navigation.pop();
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
                                setData({...data, project_title: text})
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
                                setData({...data, project_title: text})
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
                                setData({...data, project_title: text})
                            }
                            mode="outlined"
                            label="Password"
                            style={styles.textInput}
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={styles.action}>
                        <TextInput
                            onChangeText={text =>
                                setData({...data, project_title: text})
                            }
                            mode="outlined"
                            label="Phone"
                            style={styles.textInput}
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={styles.action}>
                        <TextInput
                            onChangeText={text =>
                                setData({...data, project_title: text})
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
                                setData({...data, project_title: text})
                            }
                            mode="outlined"
                            label="Password"
                            style={styles.textInput}
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={styles.action}>
                        <TextInput
                            onChangeText={text =>
                                setData({...data, project_title: text})
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
                                setData({...data, project_title: text})
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
