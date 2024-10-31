import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

import {authNavigations, colors} from '@/constants';
import CustomButton from '@/components/common/CustomButton';
import {SignupSchema, zSignupSchema} from '@/types/schema';
import useAuth from '@/hooks/queries/useAuth';
import {useNavigation} from '@react-navigation/native';
import {Hoshi} from 'react-native-textinput-effects';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '@/navigations/stack/AuthStackNavigator';

type Navigation = StackNavigationProp<AuthStackParamList>;

function SignupScreen() {
  const {signupMutation, loginMutation} = useAuth();
  const navigation = useNavigation<Navigation>();

  const passwordRef = useRef<Hoshi>(null);
  const passwordConfirmRef = useRef<Hoshi>(null);
  const emailRef = useRef<Hoshi>(null);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<zSignupSchema>({
    resolver: zodResolver(SignupSchema),
  });

  const onSubmit = ({
    email,
    nickname,
    password,
    passwordConfirm,
  }: zSignupSchema) => {
    signupMutation.mutate(
      {nickname, email, password, passwordConfirm},
      {
        onSuccess: () => {
          loginMutation.mutate({email, password});
        },
      },
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Controller
        name="nickname"
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <View>
            <Hoshi
              label={'닉네임'}
              borderColor={'#aee2c9'}
              inputPadding={16}
              labelStyle={{color: '#008445', fontWeight: '700'}}
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              returnKeyType="next"
              blurOnSubmit={false}
              autoCapitalize="none"
              onSubmitEditing={() => {
                emailRef.current?.focus();
              }}
            />
            {errors.nickname && (
              <Text style={styles.errorText}>{errors.nickname.message}</Text>
            )}
          </View>
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <View>
            <Hoshi
              label={'이메일'}
              borderColor={'#aee2c9'}
              inputPadding={16}
              labelStyle={{color: '#008445', fontWeight: '700'}}
              ref={emailRef}
              style={styles.input}
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
            <Hoshi
              label={'비밀번호'}
              borderColor={'#aee2c9'}
              inputPadding={16}
              labelStyle={{color: '#008445', fontWeight: '700'}}
              ref={passwordRef}
              style={styles.input}
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
            <Hoshi
              label={'비밀번호 확인'}
              borderColor={'#aee2c9'}
              inputPadding={16}
              labelStyle={{color: '#008445', fontWeight: '700'}}
              ref={passwordConfirmRef}
              style={styles.input}
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
      <CustomButton
        label="로그인하기"
        onPress={() => {
          navigation.navigate(authNavigations.LOGIN);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
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
