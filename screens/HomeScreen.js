import { View, Text, SafeAreaView, TextInput, Image,ScrollView } from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
//import { useNavigation } from "@react-navigation/native";
import {
    UserIcon,
    ChevronDownIcon,
    SearchIcon,
    AdjustmentsIcon
} from "react-native-heroicons/outline";
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from '../sanity';



const HomeScreen = () => {
  const [ featuredCategories, setFeaturedCategories] = useState([])
  {/* const navigation = useNavigation();
 
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  */}

  useEffect(() => {
    sanityClient.fetch(`
      *[_type == "featured"] {
        ...,
        restaurants[]->{
          ...,
          dishes[]->
        }
      }`).then((data) => {
        setFeaturedCategories(data);
      });
  }, []);

  return (
    <SafeAreaView className="bg-white pt-5">
      {/* Header */}
    <View className="flex-row pb-3 pt-3 items-center mx-4 space-x-2 px-1">
      <Image 
          source = {{
            uri: "https://links.papareact.com/wru"
          }}
          className = 'h-7 w-7 bg-gray-300 p-4 rounded-full'
      />
      <View className="flex-1">
        <Text className="font-bold text-gray-400 text-xs"> Deliver Now !</Text>
        <Text className="font-bold text-xl"> 
            Current Location
            <ChevronDownIcon size={20} color="#00CCBB" />
        </Text>
      </View>

      <UserIcon size={33} color="#00CCBB" />
    </View>
    {/* Search */}
    <View className="flex-row items-center space-x-2 pb-2 mx-4 px-1">
      <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3 rounded-lg">
        <SearchIcon color="gray" size={20} />
        <TextInput 
            placeholder="Restaurants and cuisines"
            keyboardType="default"
         />
      </View>

      <AdjustmentsIcon  color="#00CCBB"/>
    </View>

     
     <ScrollView 
       className="bg-gray-100"
       contentContainerStyle={{
         paddingBottom: 100,
       }}
      >
        {/* Categories */} 
        <Categories />

     {/* Featured rows */}

    {featuredCategories?.map((category) => (
        <FeaturedRow
          key={category._id}
          id = {category._id}
          title={category.name}
          description = {category.short_descritption}
      />
    ))}
     </ScrollView>
    </SafeAreaView>
  )
}


export default HomeScreen;
