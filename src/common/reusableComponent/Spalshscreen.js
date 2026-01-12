import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Images from '../../assets/Images/Images';

const Splashscreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* IMAGE IS ALWAYS RENDERED */}
      <Image
        source={Images.firstScreen}
        style={styles.splashImage}
        resizeMode="contain"
      />

      {/* LOADING TEXT */}
      {loading && (
        <Text style={styles.text}>Loading...</Text>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', 
  },
  splashImage: {
    width: '100%',
    height: '90%',
  },
  text: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    fontSize: 22,
    color: 'black',
  },
});


export default Splashscreen;
