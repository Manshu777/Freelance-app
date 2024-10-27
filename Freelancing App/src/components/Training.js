import {
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const {width, height} = Dimensions.get('window');


const Training = (Trainning,index) => {
  // console.log(Trainning.Trainning.backgroundColor)
  const item = Trainning.Trainning;

  return (
    <View style={{flex: 0, alignItems: 'center', justifyContent: 'center'}}>
      <View
        style={{
          flex: 0,
          justifyContent: 'flex-end',
          flexDirection: 'row',
          backgroundColor: item.backgroundColor,
          borderRadius: 10,
          width: width * 0.9,
          gap: 15,
          position: 'relative',
          paddingRight: 15,
          paddingTop: 25,
          paddingBottom: 15,
          marginTop: 45,
          marginLeft:0,
          marginBottom: index === item.length - 1 ? 20 : 0,
          
        }}>
        <View
          style={{
            flex: 0,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            left: 15,
            top: -35,
          }}>
          <View
            style={{
              flex: 0,
              alignItems: 'center',
              justifyContent: 'center',
              height: 65,
              width: 65,
              borderRadius: 50,
              backgroundColor: 'white',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: -5,
              },
              shadowOpacity: 0.5,
              shadowRadius: 10,
              elevation: 5,
            }}>
            <Image source={item.icon} style={{height: 40, width: 40}} />
          </View>
          <View
            style={{
              height: 50,
              width: 10,
              backgroundColor: item.rodColor,
            }}></View>
          <View
            style={{
              height: 32.5,
              width: 32.5,
              borderRadius: 50,
              borderColor: 'black',
              borderWidth: 2,
              borderStyle: 'dotted',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: -5,
            }}>
            <View
              style={{
                height: 25.5,
                width: 25.5,
                borderRadius: 50,
                backgroundColor: item.circleColor, // Dynamic circle color
              }}></View>
          </View>
        </View>
        <View style={{width: '75%'}}>
          <Text style={{color: 'black', fontSize: 18, fontWeight: '700'}}>
            {item.heading}
          </Text>
          <Text style={{color: 'black', fontSize: 18, fontWeight: '400'}}>
            {item.paragraph}
          </Text>
          <View
            style={{
              alignItems: 'flex-end',
              marginTop: 10,
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity
              style={{
                padding: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: 'black', fontSize: 18, fontWeight: '600'}}>
                View More
              </Text>
              <Image
                source={require('../assets/images/Right.png')}
                style={{height: 20, width: 20, marginLeft: 2.5}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>

  );
};

export default Training;
