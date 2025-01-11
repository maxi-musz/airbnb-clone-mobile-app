import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Google from 'expo-auth-session/providers/google'


import images from '@/constants/images'
import icons from '@/constants/icons'
import { login } from '@/lib/appwrite'
import { useGlobalContext } from '@/lib/global-provider'
import { Redirect } from 'expo-router'

const SignIn = () => {

  const {refetch, loading, isLogged} = useGlobalContext()

  if(!loading && isLogged) return <Redirect href="/"/>

  const handleLogin = async () => {
    try {
      const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: process.env.EXPO_GOOGLE_CLIENT_ID,
        iosClientId: process.env.IOS_GOOGLE_CLIENT_ID,
        androidClientId: process.env.ANDROID_GOOGLE_CLIENT_ID,
        webClientId: process.env.WEB_GOOGLE_CLIENT_ID,
      });
  
      // Trigger the login flow
      const result = await promptAsync();
  
      if (result.type === "success") {
        // Retrieve the ID token from the response
        const idToken = result.authentication?.idToken;
  
        if (!idToken) {
          Alert.alert("Error", "No ID token received from Google");
          return;
        }
  
        // Send the ID token to your backend API
        const backendResponse = await fetch("http://your-backend-url/api/auth/google", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idToken }),
        });
  
        const backendResult = await backendResponse.json();
  
        if (backendResult.success) {
          Alert.alert("Success", "Logged in successfully!");
          console.log("Backend response:", backendResult);
          // Optionally, save the token or user data in a secure storage
        } else {
          Alert.alert("Error", backendResult.message || "Login failed");
        }
      } else {
        Alert.alert("Error", "Google login canceled");
      }
    } catch (error: any) {
      console.error("Error during Google login:", error.message || error);
      Alert.alert("Error", "An unexpected error occurred during login");
    }
  };


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

          {/* <Text
          className='
          text-center
          mt-12
          font-rubik
          text-black-200
          '
            >
              Login to Airbnb with Google
            </Text> */}

            <TouchableOpacity
            className='
            bg-white
            shadow-md
            shadow-zinc-300
            rounded-full
            w-full
            py-4
            mt-12
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

            
            {/* input boxes for login and singup*/}
            <View></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn

