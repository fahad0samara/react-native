import React from "react";
import { StyleSheet, Image, View, Text } from "react-native";

export const ProfileImage = (props) => {
  return (
    <Image
      style={{
        width: props.size,
        height: props.size,
        borderRadius: props.radius,
        resizeMode: "cover",
      }}
      source={{uri: props.image}}
    />
  );
};

export const ProfileImagePlaceHolder = (props) => {

  function combineFirstLetters(word1, word2) {
    const firstLetter1 = word1.charAt(0);

    const firstLetter2 = word2.charAt(0);
    return `${firstLetter1}${firstLetter2}`;
  }

  return (
    <View
      style={[
        {
          width: props.size,
          height: props.size,
          borderRadius: props.radius,
        },
        styles.container,
      ]}
    >
      <Text style={styles.placeholder}>
        {props.lastname !== null
          ? combineFirstLetters(props.firstname, props.lastname)
          : `${props.firstname.charAt(0)}`}
      </Text>
    </View>
  );
};

export const makeProfilePicture = (currentUser = null, selectedImage = null, size = 60) => {
  if (currentUser && selectedImage) {
    return <ProfileImage image={selectedImage} size={size} radius={size / 2} />;
  } else if (currentUser && currentUser.picture === "") {
    return (
      <ProfileImagePlaceHolder
        size={size} 
        radius={size / 2}
        firstname={currentUser.firstname}
        lastname={currentUser.lastname}
      />
    );
  } else {
    console.log("No user loaded");
    return null; // Return null or handle the case where no user is loaded
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholder: {
    fontWeight: "bold",
    color: "white",
  },
});
