import React from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet,
    Dimensions,
    Button,
    SafeAreaView,
    TouchableOpacity,
    Text,
    Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../consts/color';
import {DrawerActions} from '@react-navigation/native';

const HeaderComponent = ({
    navigation,
    title,
    back,
    add,
    edit,
    next,
    data,
    assign,
    transparentBG,
}) => {
    return (
        <SafeAreaView>
            <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={
                    transparentBG
                        ? [COLORS.transparent, COLORS.transparent]
                        : ['#44bbec', '#38c3fc']
                }
                style={styles.header}>
                {back ? (
                    <MaterialIcons
                        name="arrow-back-ios"
                        size={23}
                        color={COLORS.white}
                        onPress={
                            navigation.goBack
                        }
                    />
                ) : (
                    <MaterialIcons
                        onPress={() =>
                            navigation.dispatch(DrawerActions.openDrawer())
                        }
                        name="menu"
                        size={28}
                        color={COLORS.white}
                    />
                )}

                <Text
                    style={{
                        color: COLORS.white,
                        fontWeight: 'bold',
                        fontSize: 20,
                    }}>
                    {title}
                </Text>

                {edit ? (
                    <Button
                        transparent
                        onPress={() => navigation.navigate(next, {data: data})}>
                        <View>
                            <Image
                                style={styles.editIcon}
                                source={require('../assets/edit.png')}
                            />
                        </View>
                    </Button>
                ) : add ? (
                    <TouchableOpacity
                        onPress={() => navigation.push(next, {data: data})}>
                        <MaterialCommunityIcons
                            name="plus"
                            size={28}
                            color={COLORS.white}
                        />
                    </TouchableOpacity>
                ) : assign ? (
                    <TouchableOpacity
                        onPress={() => navigation.push(next, {data: data})}>
                        <MaterialCommunityIcons
                            name="account-arrow-left"
                            size={28}
                            color={COLORS.white}
                        />
                    </TouchableOpacity>
                ) : (
                    <View></View>
                )}
            </LinearGradient>
        </SafeAreaView>
    );
};

export default HeaderComponent;

const styles = StyleSheet.create({
    header: {
        paddingTop: 50,
        paddingVertical: 20,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    editIcon: {
        width: 25,
        height: 25,
    },
});
