import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

import {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {colors, mapNavigations} from '@/constants';
import InputField from '@/components/common/InputField';
import CustomButton from '@/components/common/CustomButton';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Hoshi} from 'react-native-textinput-effects';
import {AddPostSchema, zAddPostSchema} from '@/types/schema';
import AddPostHeaderRight from '@/components/post/AddPostHeaderRight';
import useMutateCreatePost from '@/hooks/queries/useMutateCreatePost';
import {MarkerColor} from '@/types';
import useGetAddress from '@/hooks/useGetAddress';
import MarkerSelector from '@/components/post/MarkerSelector';
import ScoreInput from '@/components/post/ScoreInput';
import DatePickerOption from '@/components/post/DatePickerOption';
import {getDateWithSeperator} from '@/utils';
import useModal from '@/hooks/useModal';

type AddPostScreenProps = StackScreenProps<
  MapStackParamList,
  typeof mapNavigations.ADD_POST
>;

function AddPostScreen({route, navigation}: AddPostScreenProps) {
  const {location} = route.params;
  const dateOption = useModal();

  const [markerColor, setMarkerColor] = useState<MarkerColor>('RED');
  const [score, setScore] = useState(5);
  const [date, setDate] = useState(new Date());
  const [isPicked, setIsPicked] = useState(false);

  const address = useGetAddress(location);
  const createPost = useMutateCreatePost();

  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm<zAddPostSchema>({
    defaultValues: {
      title: '',
      description: '',
    },
    resolver: zodResolver(AddPostSchema),
  });

  const handleConfirmDate = () => {
    setIsPicked(true);
    dateOption.hide();
  };

  const handleChangeDate = (pickedDate: Date) => {
    setDate(pickedDate);
  };

  const handleSelectMarker = (name: MarkerColor) => {
    setMarkerColor(name);
  };

  const handleChangeScore = (score: number) => {
    setScore(score);
  };

  const onSubmit = ({description, title}: zAddPostSchema) => {
    const body = {
      date,
      title,
      description,
      color: markerColor,
      score,
      imageUris: [],
      address,
    };
    createPost.mutate(
      {...location, ...body},
      {
        onSuccess: () => navigation.goBack(),
      },
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => AddPostHeaderRight(handleSubmit(onSubmit)),
    });
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <InputField
            value={address}
            disabled
            icon={
              <Octicons name="location" size={16} color={colors.GRAY_500} />
            }
          />
          <CustomButton
            variant="outlined"
            label={isPicked ? getDateWithSeperator(date, '. ') : '날짜 선택'}
            onPress={dateOption.show}
          />
          <Controller
            name="title"
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <View>
                <Hoshi
                  label={'제목'}
                  borderColor={'#aee2c9'}
                  inputPadding={16}
                  labelStyle={{color: '#008445', fontWeight: '700'}}
                  // style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  returnKeyType="next"
                  autoCapitalize={'none'}
                  blurOnSubmit={false}
                  // onSubmitEditing={() => {
                  //   passwordRef.current?.focus();
                  // }}
                />
                {errors.title && (
                  <Text style={styles.errorText}>{errors.title.message}</Text>
                )}
              </View>
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <View>
                <Hoshi
                  label={'내용'}
                  borderColor={'#aee2c9'}
                  inputPadding={16}
                  labelStyle={{color: '#008445', fontWeight: '700'}}
                  // style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  returnKeyType="next"
                  autoCapitalize={'none'}
                  blurOnSubmit={false}
                  multiline
                  // onSubmitEditing={() => {
                  //   passwordRef.current?.focus();
                  // }}
                />
                {errors.description && (
                  <Text style={styles.errorText}>
                    {errors.description.message}
                  </Text>
                )}
              </View>
            )}
          />
          <MarkerSelector
            markerColor={markerColor}
            score={score}
            onPressMarker={handleSelectMarker}
          />
          <DatePickerOption
            date={date}
            isVisible={dateOption.isVisible}
            onChangeDate={handleChangeDate}
            onConfirmDate={handleConfirmDate}
          />
        </View>
        <ScoreInput score={score} onChangeScore={handleChangeScore} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    marginBottom: 10,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 20,
  },
  errorText: {
    color: colors.RED_500,
    marginTop: 10,
  },
});

export default AddPostScreen;
