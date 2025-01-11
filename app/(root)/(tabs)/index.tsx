import Search from "@/components/Search";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { Link } from "expo-router";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className="px-5">
        <View className="flex flex-row justify-between items-center mt-10">
          <View className="flex flex-row items-center">
            <Image source={images.avatar} className="size-12 rounded-full"/>
            <View className="ml-3 flex flex-col items-start justify-center">
              <Text className="text-xs text-black-100 font-rubik">
                Good Morning
              </Text>
              <Text className="text-base text-black-300 font-rubik-medium">
                Maximus
              </Text>
            </View>
          </View>
          <Image source={icons.bell} className="size-6"/>
        </View>

        {/* Search component */}
        <Search/>

        {/* Featured */}
        <View className="">
          <View className="flex flex-row justify-between px-5 mt-5">
            <Text className="text-xl font-rubik-bold text-black-300">Featured</Text>
            <Text className="font-rubik-bold text-base text-primary-300">See All</Text>
          </View>
        </View>
      </View>

      

      
    </SafeAreaView>
  );
}
 