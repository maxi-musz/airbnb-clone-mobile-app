import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '@/constants/images'
import icons from '@/constants/icons'

const SignIn = () => {

  const handleLogin = () => {}

  return (
    <SafeAreaView className='bg-white h-full'>
      <ScrollView contentContainerClassName='h-full'>

        <Image source={images.onboarding} className='w-full h-4/6' resizeMode='contain'/>

        <View className='px-10'>
          <Text className='text-base text-center uppercase font-rubik text-black-200'>
            Airbnb: Glad to have you onboarding
          </Text>
          <Text className='text-center text-3xl font-rubik-bold text-black-300 mt-2'>Let's Get You Closer To {"\n"} 
            <Text className='text-primary-300'>Your Ideal Home</Text>
          </Text>

          <Text
          className='
          text-center
          mt-12
          font-rubik
          text-black-200
          '
            >
              Login to Airbnb with Google
            </Text>

            <TouchableOpacity
            className='
            bg-white
            shadow-md
            shadow-zinc-300
            rounded-full
            w-full
            py-4
            mt-5
            '
            onPress={handleLogin}
            >
              <View className='flex flex-row items-center justify-center'>
                <Image
                source={icons.google}
                className='w-5 h-5'
                resizeMode='contain'
                />
                <Text className='text-lg font-rubik-medium text-black-300 ml-2'>
                  Continue with Google
                </Text>
              </View>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn

