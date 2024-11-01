import { colors } from '@/constants';
import React, { forwardRef, useRef, useState } from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

interface CustomInputProps {

}

const CustomInput = forwardRef<AnimationText((props,ref) => {
    const {
        inactiveColor = colors.GRAY_500,
        activeColor = colors.GRAY_500,
        backgroundColor = colors.WHITE,
        errorColor = colors.RED_500,
        style,
        value: providedValue = '',
        onChangeText,
        ...inputProps
    } = props;
    const [value,setValue] = useState(providedValue);

    const inputRef = useRef<TextInput>(null);
    const placeholderAnimated = useSharedValue(providedValue ?1:0);
    const placeholderSize = useSharedValue(0);
    const colorAnimated = useSharedValue(0);

    const animatedContainerStyle = useAnimatedStyle(()=>({
        borderColor: placeholderSize.value > 0 ?
    }))
  return (
    <Animated.View style={[styles.container]}>
        <TouchableWithoutFeedback>
            <View>
                <TextInput
                    {...inputProps}
                    ref={inputRef}
                    value={value}
                    placeholder=''
                />
            </View>
        </TouchableWithoutFeedback>
    </Animated.View>
  )
})


export default CustomInput;
CustomInput.displayName = 'CustomInput';

const styles = StyleSheet.create({
    container:{
        alignSelf:'stretch',
        flexDirection:'row'
    }
});
