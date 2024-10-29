import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

import {colors} from '@/constants';
import CustomButton from '@/components/common/CustomButton';
import {SignupSchema, zSignupSchema} from '@/types/schema/signup.schema';
import useAuth from '@/hooks/queries/useAuth';
import {LoginSchema, zLoginSchema} from '@/types/schema';

interface LoginScreenProps {}

function LoginScreen({}: LoginScreenProps) {
  const {loginMutation} = useAuth();
  const passwordRef = useRef<TextInput>(null);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<zLoginSchema>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = ({email, password}: zLoginSchema) => {
    console.log(email, password);
    loginMutation.mutate({email, password});
  };

  return (
    <SafeAreaView>
      <Controller
        name="email"
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <View>
            <TextInput
              autoFocus
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
