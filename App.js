/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
import 'dayjs/locale/en' // load on demand
import { StatusBar} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from './src/screens/Home'
import tw from 'twrnc'


// strict thresholds
const thresholds = [
  { l: 's', r: 1 },
  { l: 'm', r: 1 },
  { l: 'mm', r: 59, d: 'minute' },
  { l: 'h', r: 1 },
  { l: 'hh', r: 23, d: 'hour' },
  { l: 'd', r: 1 },
  { l: 'dd', r: 29, d: 'day' },
  { l: 'M', r: 1 },
  { l: 'MM', r: 11, d: 'month' },
  { l: 'y' },
  { l: 'yy', d: 'year' }
]
const rounding = Math.floor; 
const config = {
  rounding,
  thresholds
}


dayjs.extend(updateLocale)
dayjs.extend(relativeTime, config)



export default function App() {
  return (
    <SafeAreaView style={tw`flex-1`}>
      <React.Suspense>
        <Home />
      </React.Suspense>
      <StatusBar style="light" backgroundColor="#1c1917"/>
    </SafeAreaView>
  );
}

