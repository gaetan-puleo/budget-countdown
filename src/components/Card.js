import { View, Text, TouchableNativeFeedback } from "react-native";
import tw from 'twrnc'
import dayjs from 'dayjs'

export default function Card(props) {
  const { text, style, time, status, id, items, setItems } = props;
  return <View style={{...style,...tw`bg-stone-800 p-4 rounded-lg`}}>
    <Text style={tw`text-white text-lg font-bold`}>{text} </Text>
    <Text style={tw`text-gray-300 text-sm font-bold`}>{dayjs().to(dayjs(time))}</Text>

    {dayjs().isAfter(dayjs(time)) && status === 'waiting' && <View style={tw`flex-row mt-2`}>
      <TouchableNativeFeedback
        onPress={() => setItems(items.map(x => {
          if(x.id === id){
            return {...x, status: 'accepted'}
          }
          return x
        }))}
      >
        <View style={tw`bg-green-400 flex-1 p-2 rounded mr-1`}><Text style={tw`font-bold`}>Purchase</Text></View>
      </TouchableNativeFeedback>

      <TouchableNativeFeedback
        onPress={() => setItems(items.map(x => {
          if(x.id === id){
            return {...x, status: 'rejected'}
          }
          return x
        }))}
      >
        <View style={tw`bg-red-400 flex-1 p-2 rounded ml-1`}><Text style={tw`font-bold`}>Reject</Text></View>
      </TouchableNativeFeedback>
    </View>}

    <View style={tw`flex-row mt-1`}>
      {status === 'rejected' && <View style={tw`bg-red-400 rounded-lg px-1`}>
        <Text style={tw`text-red-900`}>Rejected</Text>
      </View>}

      {status === 'accepted' && <View style={tw`bg-emerald-400 rounded-lg px-1`}>
        <Text style={tw`text-emerald-900`}>accepted</Text>
      </View>}
    </View>

  </View>
}
