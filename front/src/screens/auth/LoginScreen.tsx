import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

import {colors} from '@/constants';
import CustomButton from '@/components/common/CustomButton';
import useAuth from '@/hooks/queries/useAuth';
import {LoginSchema, zLoginSchema} from '@/types/schema';
import {Hoshi} from 'react-native-textinput-effects';

interface LoginScreenProps {}

function LoginScreen({}: LoginScreenProps) {
  const {loginMutation} = useAuth();
  const passwordRef = useRef<Hoshi>(null);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<zLoginSchema>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = ({email, password}: zLoginSchema) => {
    loginMutation.mutate({email, password});
  };

  return (
    <SafeAreaView>
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
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              returnKeyType="next"
              autoCapitalize={'none'}
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

      <CustomButton label="로그인" onPress={handleSubmit(onSubmit)} />
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

export default LoginScreen;
