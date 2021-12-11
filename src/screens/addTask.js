import React, {useState} from 'react';
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

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Loading from '../components/loading';
import HeaderComponent from '../components/Header';

import {db} from '../../firebaseConnect';
import {doc, setDoc} from 'firebase/firestore/lite';

const AddTask = ({navigation}) => {
    const [data, setData] = useState({
        task_title: '',
        start_date: '',
        estimate_hours: '',
    });
    const [isLoading, setIsLoading] = useState(true);

    const randomId = () => {
        return Math.random().toString(36).substr(2, 11);
    };

    const handleCreateTask = async () => {
        showLoading();
        await setDoc(doc(db, 'employeeList', randomId()), {
            assign_lead: '1',
            progress: 0,
        });
        hideLoading();
    };

    const showLoading = () => {
        setIsLoading(true);
    };
    //Hide Loader function
    const hideLoading = () => {
        setIsLoading(false);
    };

    return (
        <View style={styles.container}>
            <HeaderComponent
                back="true"
                title="Create Task"
                noIcon="true"
                navigation={this.props.navigation}
            />
            <ScrollView>
                <View style={{margin: 15}}>
                    <Text style={styles.label}>Task Title: </Text>
                    <View style={styles.action}>
                        <TextInput
                            onChangeText={text =>
                                setData({...data, project_title: text})
                            }
                            style={styles.textInput}
                            autoCapitalize="none"
                        />
                    </View>
                    <Text style={styles.label}>Start Date: </Text>
                    <View style={styles.action}>
                        <TextInput
                            onChangeText={text =>
                                setData({...data, project_title: text})
                            }
                            style={styles.textInput}
                            autoCapitalize="none"
                        />
                    </View>
                    <Text style={styles.label}>Estimated Hours: </Text>
                    <View style={styles.action}>
                        <TextInput
                            onChangeText={text =>
                                setData({...data, project_title: text})
                            }
                            style={styles.textInput}
                            autoCapitalize="none"
                        />
                    </View>
                    <Text style={styles.label}>Description: </Text>
                    <View style={styles.action}>
                        <TextInput
                            onChangeText={text =>
                                setData({...data, project_title: text})
                            }
                            style={styles.textInput}
                            autoCapitalize="none"
                        />
                    </View>
                </View>
                <TouchableHighlight
                    style={[styles.buttonContainer, styles.loginButton]}
                    onPress={() => this.addTask()}>
                    <Text style={styles.loginText}>Create Task</Text>
                </TouchableHighlight>
            </ScrollView>
            {isLoading && <Loading />}
        </View>
    );
};

export default AddTask;

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
        height: 55,
        backgroundColor: '#e6fffe',
        paddingBottom: 0,
        color: '#05375a',
        fontSize: 16,
        borderBottom: 'none',
    },
    label: {
        fontSize: 14,
        fontHeight: 400,
    },
});
