import React, { useState } from 'react';
import uuid from 'react-native-uuid';
import { Text, SafeAreaView, View, FlatList, Modal, TextInput, TouchableNativeFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import tw from 'twrnc';
import Card from '../components/Card'
import dayjs from 'dayjs'
import useItems from '../hooks/useItems'

export default function Home () {
  const { items, setItems } = useItems();
  const [showModal, openModal] = useState(false)
  const [name, setName] = useState("")
  const [d, setD] = useState(30)

  const renderItem = ({item}) => {
    return (
      <Card 
        id={item.id}
        text={item.name} 
        time={item.time}
        items={items}
        status={item.status}
        keyExtractor={(item) => item.id}
        style={tw`mb-2`}
        setItems={setItems}
      />
    )
  }
  return (
    <SafeAreaView style={tw`flex-1 bg-stone-900 p-2`}>
      <FlatList
        style={tw`mb-18`}
        data={items}
        renderItem={renderItem}
      />
    {showModal && <Modal 
      transparent={true}
      onRequestClose={() => {
        openModal(false);
      }}>
           
        <View style={tw`bg-stone-900/85 flex-1 justify-center`}>
          <View style={tw`bg-stone-800 m-2 p-4 rounded-lg`}>
            <View style={tw`mb-2`}>
              <Text style={tw`text-white`}>Product name</Text>
            </View>
            <TextInput 
              style={tw`text-white bg-stone-900 h-12 rounded px-2 mb-1`}
              placeholder={'Enter a name'}
              placeholderTextColor={'#aaaaaa'}
              onChangeText={setName}
              value={name}
            />

            <TouchableNativeFeedback 
              onPress={() => {
                if(!name) return 
                openModal(false);
                setItems([...items, {
                  name: name,
                  id: uuid.v4(),
                  time: dayjs().add(30, 'day'),
                  status: 'waiting'
                }])
                setName('')
              }}
              >
              <View
                style={tw`${name ? 'bg-emerald-400' : 'bg-gray-500/20'} px-2 mt-2 rounded h-10 justify-center items-center `}
              >
                <Text style={tw`font-bold ${name ? 'text-white' : 'text-neutral-600'}`}>Add a new product</Text>
              </View>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback 
              onPress={() => {
                openModal(false);
                setName('')
              }}
              >
              <View
                style={tw`border-[1px] border-white px-2 mt-2 rounded h-10 justify-center items-center `}
              >
                <Text style={tw`font-bold text-neutral-200`}>Close</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </Modal> }
      <TouchableNativeFeedback 
        style={tw`bottom-2 absolute left-2 right-2`} 
        onPress={() => openModal(true)}
      >
        <View style={tw`bg-stone-800 h-16 rounded-lg flex-row items-center px-4`}>
          <Icon style={tw`pr-4`} name="add" size={24} color="white" />
          <Text style={{...tw`text-white`, textAlignVertical: 'center'}}>Add an item</Text>
        </View>
      </TouchableNativeFeedback>
    </SafeAreaView>
  )
}
