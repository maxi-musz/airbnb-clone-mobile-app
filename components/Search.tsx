import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams, usePathname } from 'expo-router'
import icons from '@/constants/icons';
import { useDebouncedCallback } from 'use-debounce';

const Search = () => {

    const path = usePathname();
    const params = useLocalSearchParams<{ query?:string }>();
    const [search, setSearch] = React.useState<string>(params.query || '');

    const debouncedSearch = useDebouncedCallback((text: string) => router.setParams({ ...params, query: text }), 500);

    const handleSearch = (text: string) => {
        setSearch(text);
    }

    return (
        <View>
            <View className='flex flex-row items-center bg-gray-100 px-4 py-3 rounded-full mt-5'>
                <Image source={icons.search} className='size-6'/>
                <TextInput
                    value={search}
                    onChangeText={handleSearch}
                    placeholder='Search for your next home'
                    className='text-lg font-rubik text-black-300 flex-1 ml-2'
                />
            <TouchableOpacity>
                <Image source={icons.filter} className='size-6 mt-3'/>
            </TouchableOpacity>
            </View>
        </View>
    )
}

export default Search