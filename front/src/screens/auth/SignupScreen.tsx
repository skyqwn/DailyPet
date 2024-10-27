import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';

import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

import {colors} from '@/constants';
import CustomButton from '@/components/common/CustomButton';
import {SignupSchema, zSignupSchema} from '@/types/schema/signup.schema';

interface SignupScreenProps {}

function SignupScreen({}: SignupScreenProps) {
  const passwordRef = useRef<TextInput>(null);
  const passwordConfirmRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<zSignupSchema>({
    resolver: zodResolver(SignupSchema),
  });

  const onSubmit = (data: zSignupSchema) => {
    console.log(data);
  };

  return (
    <SafeAreaView>
      <Controller
        name="name"
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <View>
            <TextInput
              autoFocus
              style={styles.input}
              placeholder="이름을 입력해주세요."
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => {
                emailRef.current?.focus();
              }}
            />
            {errors.name && (
              <Text style={styles.errorText}>{errors.name.message}</Text>
            )}
          </View>
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <View>
            <TextInput
              ref={emailRef}
              style={styles.input}
              placeholder="email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => {
                passwordRef.current?.focus();
              }}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            )}
          </View>
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <View>
            <TextInput
              ref={passwordRef}
              style={styles.input}
              placeholder="password"
              textContentType="oneTimeCode"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}
          </View>
        )}
      />
      <Controller
        name="passwordConfirm"
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <View>
            <TextInput
              ref={passwordConfirmRef}
              style={styles.input}
              placeholder="passwordConfirm"
              textContentType="oneTimeCode"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
              onSubmitEditing={() => {
                handleSubmit(onSubmit);
              }}
            />
            {errors.passwordConfirm && (
              <Text style={styles.errorText}>
                {errors.passwordConfirm.message}
              </Text>
            )}
          </View>
        )}
      />
      <CustomButton label="Signup" onPress={handleSubmit(onSubmit)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    color: colors.BLACK,
    padding: 0,
  },
  errorText: {
    color: colors.RED_500,
  },
});

export default SignupScreen;
