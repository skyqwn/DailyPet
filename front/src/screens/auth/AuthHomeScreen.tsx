import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {StackScreenProps} from '@react-navigation/stack';
import LottieView from 'lottie-react-native';

import {AuthStackParamList} from '@/navigations/stack/AuthStackNavigator';
import CustomButton from '@/components/common/CustomButton';
import {onboarding} from '@/constants/onBoarding';
import {authNavigations, colors} from '@/constants';

type AuthHomeScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.AUTH_HOME
>;

function AuthHomeScreen({navigation}: AuthHomeScreenProps) {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => navigation.navigate(authNavigations.SIGNUP)}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}
        onIndexChanged={index => setActiveIndex(index)}>
        {onboarding.map(item => (
          <View style={styles.slideContainer} key={item.id}>
            <LottieView
              source={item.image}
              style={{width: '80%', height: '40%'}}
              autoPlay
              loop
            />
            <View style={styles.titleContainer}>
              <Text style={styles.slideTitle}>{item.title}</Text>
            </View>
            <Text style={styles.slideDescription}>{item.description}</Text>
          </View>
        ))}
      </Swiper>

      <View style={{margin: 20}}>
        <CustomButton
          label={isLastSlide ? '시작하기' : '다음'}
          onPress={() =>
            isLastSlide
              ? navigation.navigate(authNavigations.SIGNUP)
              : swiperRef.current?.scrollBy(1)
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  skipButton: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
  },
  skipText: {
    fontWeight: '700',
    color: colors.BLACK,
  },
  activeDot: {
    width: 32,
    height: 4,
    marginHorizontal: 4,
    backgroundColor: colors.GREEN_500,
    borderRadius: 100,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 100,
  },
  dot: {
    width: 32,
    height: 4,
    marginHorizontal: 4,
    backgroundColor: colors.GRAY_200,
  },
  slideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  slideImage: {
    width: '100%',
    height: 300,
  },
  slideTitle: {
    color: colors.BLACK,
    fontSize: 30,
    fontWeight: 'bold',
    marginHorizontal: 40,
  },
  slideDescription: {
    marginTop: 10,
    color: colors.GRAY_500,
    textAlign: 'center',
    marginHorizontal: 40,
  },
});

export default AuthHomeScreen;
