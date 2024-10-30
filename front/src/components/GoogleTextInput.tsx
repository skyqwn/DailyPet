import React from 'react';
import {StyleSheet, View} from 'react-native';
import Config from 'react-native-config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

import {colors} from '@/constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface GoogleTextInputProps {}

function GoogleTextInput({}: GoogleTextInputProps) {
  const googlePlaceApiKey = Config.GOOGLE_API_KEY;
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, {marginTop: insets.top + 10}]}>
      <GooglePlacesAutocomplete
        fetchDetails={true}
        placeholder="Search..."
        debounce={200}
        styles={{
          textInputContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            marginHorizontal: 20,
            position: 'relative',
            shadowColor: '#d4d4d4',
          },
          textInput: {
            backgroundColor: colors.WHITE,
            fontSize: 16,
            fontWeight: '600',
            width: '100%',
            borderRadius: 200,
          },
          listView: {
            backgroundColor: colors.WHITE,
            position: 'relative',
            top: 0,
            width: '100%',
            borderRadius: 10,
            shadowColor: '#d4d4d4',
            zIndex: 99,
          },
        }}
        onPress={(data, detail = null) => {
          console.log('data: ', data);
          console.log('detail: ', detail?.geometry.location);
        }}
        query={{
          key: googlePlaceApiKey,
          language: 'ko',
        }}
        // renderLeftButton={() => (
        //   <View style={styles.searchIcon}>
        //     <Ionicons name="search" color={colors.GRAY_500} size={18} />
        //   </View>
        // )}
        // textInputProps={{
        //   placeholderTextColor: colors.GRAY_500,
        //   placeholder: 'Where do you want to go?',
        // }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
    zIndex: 10,
  },
  searchIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GoogleTextInput;
