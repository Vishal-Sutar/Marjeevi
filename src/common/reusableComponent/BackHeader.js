import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  useColorScheme,
  Image,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Images from '../../assets/Images/Images';

const BackHeader = (props) => {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation();
  const { disabled } = props;

  return (
    <SafeAreaView>
      <View
        style={{
          height: 40,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        {/* BACK TEXT */}
        <TouchableOpacity
          onPress={() => {
            if (!disabled) {
              navigation.goBack();
            }
          }}
          disabled={disabled}
          style={{ paddingHorizontal: 10, flexDirection: "row", alignItems: "center" }}
        >
          {/* <Text
            style={{
              fontSize: 18,
              color: disabled ? "#999" : "#000",
              fontWeight: "500",
            }}
          >
            ← Back
          </Text> */}
          <Image
          source={Images.Back}
          />

        </TouchableOpacity>

        {/* TITLE */}
        <View>
          <Text
            style={{
              color: "#000",
              fontWeight: "700",
              fontSize: 20,
              marginLeft: 10,
            }}
          >
            {props.Text}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BackHeader;

const styles = StyleSheet.create({});
