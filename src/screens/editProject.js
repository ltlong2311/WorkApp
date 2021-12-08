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
// import {
//     Form,
//     Item,
//     Input,
//     Label,
// } from 'native-base';
import Loading from '../components/loading';
import HeaderComponent from '../components/HeaderComponent';
import DataService from '../services/dataService';

export default class EditProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            toggle: false,
        };
        this.state.dataSource = DataService.projectList();
        this.state.dataSource = this.state.dataSource[0];
    }

    toggleSwitch1 = value => {
        this.setState({toggle: value});
    };

    isLead = () => {
        if (this.state.toggle) {
            return (
                <></>
                // <Item floatingLabel>
                //     <Label style={styles.loginLabel}>Fixed Price</Label>
                //     <Input
                //         value={this.state.dataSource.overviews.fixed_price}
                //     />
                // </Item>
            );
        } else {
            return (
                <></>
                // <Item floatingLabel>
                //     <Label style={styles.loginLabel}>Hourly Rate</Label>
                //     <Input
                //         value={this.state.dataSource.overviews.hourly_rate}
                //     />
                // </Item>
            );
        }
    };

    editProjects = () => {
        this.props.navigation.pop();
    };

    render() {
        return (
            <View style={styles.container}>
                <HeaderComponent
                    back="true"
                    title="Create Project"
                    noIcon="true"
                    navigation={this.props.navigation}
                />
                <ScrollView>
                    {/* <Form style={{paddingRight: 15}}>
                        <Item floatingLabel>
                            <Label style={styles.loginLabel}>
                                Project Code
                            </Label>
                            <Input
                                value={
                                    this.state.dataSource.overviews.project_code
                                }
                            />
                        </Item>
                        <Item floatingLabel>
                            <Label style={styles.loginLabel}>
                                Project Title
                            </Label>
                            <Input
                                value={
                                    this.state.dataSource.overviews
                                        .project_title
                                }
                            />
                        </Item>
                        <Item floatingLabel>
                            <Label style={styles.loginLabel}>Fixed Rate</Label>
                            <Input value={this.state.dataSource.overviews.fixed_price} />
                        </Item>
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
                            <Input
                                value={this.state.dataSource.estimated_hours}
                            />
                        </Item>
                        <Item floatingLabel>
                            <Label style={styles.loginLabel}>Description</Label>
                            <Input
                                value={
                                    this.state.dataSource.overviews.description
                                }
                            />
                        </Item>
                    </Form>
                    <TouchableHighlight
                        style={[styles.buttonContainer, styles.loginButton]}
                        onPress={() => this.editProjects()}>
                        <Text style={styles.loginText}>Edit Project</Text>
                    </TouchableHighlight> */}
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
