import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,
    Platform,
    Alert,
    FlatList,
    Image,
} from 'react-native';
// import {Form, Item, Input, Label} from 'native-base';
import Loading from '../components/loading';
import {TextInput} from 'react-native-paper';
import HeaderComponent from '../components/HeaderComponent';

import {db} from '../../firebaseConnect';
import {
    collection,
    deleteDoc,
    updateDoc,
    doc,
    getDoc,
    getDocs,
} from 'firebase/firestore/lite';
import {TouchableOpacity} from 'react-native-gesture-handler';
import COLORS from '../consts/color';
import {Center} from 'native-base';

const UpdateProgress = ({navigation, route}) => {
    const task = route.params.data;
    const [tasks, setTasks] = useState([]);
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getProjectData();
    }, []);

    const getProjectData = async () => {
        const ref = doc(db, 'projectList', task.p_id);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
            setTasks(docSnap.data().tasks);
        }
    };

    const alertMess = text =>
        Alert.alert('Message', text, [
            {text: 'OK', onPress: () => navigation.goBack(null)},
        ]);

    const showLoading = () => {
        setIsLoading(true);
    };
    const hideLoading = () => {
        setIsLoading(false);
    };

    const ref = doc(db, 'projectList', task.p_id);

    const updateProgress = progressTask => {
        var newTasks = tasks;
        var keyTask = 0;
        newTasks.forEach((val, key) => {
            if (val.task_detail.t_id === task.task_detail.t_id) {
                newTasks[key].task_detail.task_progress = progressTask;
                keyTask = key;
            }
        });
        assign(newTasks);
    };

    const assign = async newTasks => {
        showLoading();
        await updateDoc(ref, {
            // `tasks[${key}]`: newTasks,
            // "tasks[0].task_details": newTasks,
            tasks: newTasks,
        })
            .then(() => {
                alertMess('Update success');
                hideLoading();
            })
            .catch(error => {
                hideLoading();
                console.log(error);
            });
    };

    return (
        <View style={styles.container}>
            <HeaderComponent
                back="true"
                title="Update Progress"
                noIcon="true"
                navigation={navigation}
            />
            <View>
                <View style={{margin: 15}}>
                    <Text style={styles.label}>Update Progress (%): </Text>
                    <View style={styles.action}>
                        <TextInput
                            onChangeText={text => setProgress(text)}
                            style={styles.textInput}
                            keyboardType="numeric"
                            autoCapitalize="none"
                        />
                    </View>
                    <View>
                        <Button
                            title="Update"
                            onPress={() => updateProgress(progress)}
                        />
                    </View>
                </View>
            </View>
            {isLoading && <Loading />}
        </View>
    );
};

export default UpdateProgress;

const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        flex: 1,
        width: '100%',
        backgroundColor: COLORS.whiteG,
        color: '#918E8E',
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
        fontWeight: 'bold',
        marginBottom: 10,
    },
    textShadow: {
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
    },
    action: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#BFBBBB',
    },
    textInput: {
        flex: 1,
        height: 35,
        backgroundColor: '#e6fffe',
        paddingBottom: 0,
        color: '#05375a',
        fontSize: 16,
    },
});
