import React from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    Text,
    Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../consts/color';

const HeaderComponent = ({navigation, title}) => {
    return (
        <SafeAreaView>
            <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#44bbec', '#38c3fc']}
                style={styles.header}>
                <MaterialIcons
                    name="arrow-back-ios"
                    size={23}
                    color={COLORS.white}
                    onPress={navigation.goBack}
                />
                <Text
                    style={{
                        color: COLORS.white,
                        fontWeight: 'bold',
                        fontSize: 20,
                    }}>
                    {title}
                </Text>
                <MaterialCommunityIcons
                    name="plus"
                    size={28}
                    color={COLORS.white}
                />
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
});
