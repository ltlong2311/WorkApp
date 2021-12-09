import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Button,
    Input,
    Platform,
    Alert,
} from 'react-native';
// import {Input} from 'native-base';
import Loading from '../components/loading';
import HeaderComponent from '../components/HeaderComponent';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {db} from '../../firebaseConnect';
import {doc, setDoc} from 'firebase/firestore/lite';

const CreateProject = ({navigation}) => {
    const [dataLogin, setDataLogin] = useState({
        email: '',
        password: '',
    });
    const [toggle, setToggle] = useState(false);

    const random = Math.random().toString(36).substr(2, 11);

    const handleCreateProject = async () => {
        await setDoc(doc(db, 'projectList', random), {
            project_title: 'abc',
            assign_lead: '1',
            start_date: '2021-12-06',
            due_date: '2021-12-31',
            progress: 0,
            project_created: '',
            estimate_hours: 350,
            task: [],
        });
    };

    const onCreateProject = () => {
        handleCreateProject();
        Alert.alert('Message', 'Deleted successfully');
        navigation.push('ProjectList');
        // navigation.pop();
    };

    const toggleSwitch1 = value => {
        setToggle(value);
    };
    const isLead = () => {
        if (toggle) {
            return (
                <></>
                // <Item floatingLabel>
                //     <Label style={styles.loginLabel}>Fixed Price</Label>
                //     <Input />
                // </Item>
            );
        } else {
            return (
                <></>
                // <Item floatingLabel>
                //     <Label style={styles.loginLabel}>Hourly Rate</Label>
                //     <Input />
                // </Item>
            );
        }
    };

    const addProjects = () => {
        navigation.pop();
    };

    return (
        <View style={styles.container}>
            <HeaderComponent
                back="true"
                title="Create Project"
                noIcon="true"
                navigation={navigation}
            />
            <ScrollView>
                <View style={{paddingRight: 15}}></View>
                <Button title="create" onPress={onCreateProject} />
                {/* <Form style={{paddingRight: 15}}>
                        <Item floatingLabel>
                            <Label style={styles.loginLabel}>
                                Project Title
                            </Label>
                            <Input />
                        </Item>
                        <Item floatingLabel>
                            <Label style={styles.loginLabel}>Assign Lead</Label>
                            <Input />
                        </Item>
                        <Item floatingLabel>
                            <Label style={styles.loginLabel}>Assign To</Label>
                            <Input />
                        </Item>
                        <Item floatingLabel>
                            <Label style={styles.loginLabel}>Fixed Rate</Label>
                            <Input />
                        </Item>
                        <Text
                            style={[
                                styles.loginLabel,
                                {
                                    textAlign: 'left',
                                    marginTop: 15,
                                    marginLeft: 15,
                                },
                            ]}>
                            Start Date
                        </Text>
                        <View style={styles.container}>
                            <DatePicker
                                locale={'en'}
                                modalTransparent={false}
                                animationType={'fade'}
                                androidMode={'default'}
                                placeHolderText="Select date"
                                textStyle={{color: '#000000'}}
                                placeHolderTextStyle={{
                                    color: '#000000',
                                    fontSize: 14,
                                }}
                                disabled={false}
                            />
                        </View>
                        <Text
                            style={[
                                styles.loginLabel,
                                {textAlign: 'left', margin: 15},
                            ]}>
                            Fixed Price
                        </Text>
                        <View style={styles.container}>
                            <Switch
                                onValueChange={this.toggleSwitch1}
                                value={this.state.toggle}
                            />
                        </View>
                        {this.isLead()}
                        <Item floatingLabel>
                            <Label style={styles.loginLabel}>
                                Estimated Hours
                            </Label>
                            <Input />
                        </Item>
                        <Item floatingLabel>
                            <Label style={styles.loginLabel}>Description</Label>
                            <Input />
                        </Item>
                    </Form>
                    <TouchableHighlight
                        style={[styles.buttonContainer, styles.loginButton]}
                        onPress={() => this.addProjects()}>
                        <Text style={styles.loginText}>Create Project</Text>
                    </TouchableHighlight> */}
            </ScrollView>
        </View>
    );
};

export default CreateProject;

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
