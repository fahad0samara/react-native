import { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, Platform, Pressable } from "react-native";
import {
  TexfieldConfiguration,
  TextField,
} from "../components/ValidableTextField";
import LemonButton from "../components/LemonButton";
import Check from "../components/Check";
import { makeProfilePicture} from "../components/ProfileImage";
import { useUser } from "../Dependencies/UserContext";
import { useValidation } from "../Utils/Validators";
import { theme } from "../Utils/Theme";
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = ({navigation}) => {
  // MARK: - States
  const {getLoggedUser, updateUser, logout} = useUser();
  const [currentUser, setCurrentUser] = useState(null);
  const [initialUser, setInitialUser] = useState(null);
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validationState, setValidation] = useValidation();
  const [isFormValid, setFormValid] = useState(false);

  // MARK: - Configuration
  const firstNameConf = new TexfieldConfiguration(
    "First Name",
    "First Name",
    "string",
    handleFirstNameValidity,
    "First name should only contain letters",
    "default",
    true
  );

  const lastNameConf = new TexfieldConfiguration(
    "Last Name",
    "Last Name",
    "string",
    handleLastNameValidity,
    "Last name should only contain letters",
    "default",
    true
  );

  const emailConf = new TexfieldConfiguration(
    "E-mail",
    "e-mail",
    "email",
    handleEmailValidity,
    "Please enter a valid e-mail address",
    "email-address",
    true
  );

  const phoneConf = new TexfieldConfiguration(
    "Phone number",
    "Phone number",
    "phone",
    handlePhoneValidity,
    "Please enter a valid US phone number",
    "phone-pad",
    true
  );

  const confs = [firstNameConf, lastNameConf, emailConf, phoneConf];

  const boxes = [
    "Order statuses",
    "Password changes",
    "Special offers",
    "Newsletter",
  ];

  function handleEmailValidity(value, text) {
    setValidation("isEmailValid", value);
    if (currentUser) {
        currentUser.email = text;
      }
  }

  function handleFirstNameValidity(value, text) {
    setValidation("isFirstNameValid", value);
    if (currentUser) {
      currentUser.firstname = text;
    }
  }

  function handleLastNameValidity(value, text) {
    setValidation("isLastNameValid", value);
    if (currentUser) {
      currentUser.lastname = text;
    }
  }

  function handlePhoneValidity(value, text) {
    setValidation("isPhoneValid", value);
    if (currentUser) {
        currentUser.phone = text;
      }
  }

  const handleNotificationToggle = (title) => {
    setCurrentUser((prevUser) => {
      const newNotificationSettings = { ...prevUser.notificationSettings };
      newNotificationSettings[title] = !newNotificationSettings[title];
      return { ...prevUser, notificationSettings: newNotificationSettings };
    });
  };

  function populateTextFields(index) {
    if (currentUser) {
      switch (index) {
        case 0:
          return currentUser.firstname;
        case 1:
          return currentUser.lastname;
        case 2:
          return currentUser.email;
        case 3:
          return currentUser.phone;
        default:
          return "";
      }
    }
  }


useEffect(() => {
  let isMounted = true;

  const requestPermission = async () => {
    if (Platform.OS !== 'web') {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission Denied')
        };
    }
}

  const loadProfile = async () => {
    try {
      setIsLoading(true);
      const user = await getLoggedUser();

      if (isMounted) {
        setCurrentUser(user);
        setInitialUser(user);
        setImage(user.picture);
        makeProfilePicture(user, image);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error retrieving user from storage:", error);

      if (isMounted) {
        setIsLoading(false);
      }
    }
  };

  requestPermission();
  loadProfile();

  return () => {
    isMounted = false;
  };
}, []);


  function handleProfilePicture() {
    navigation.setOptions({
        headerRight: () => (
          makeProfilePicture(currentUser, image, 38)
        ),
      });
      return makeProfilePicture(currentUser, image);
    }

    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    
      if (!result.canceled) {
        const selectedImage = result.assets[0].uri;
    
        // Update the state directly
        setImage(selectedImage);
        setCurrentUser((prevUser) => ({
          ...prevUser,
          picture: selectedImage,
        }));
    
        // Update navigation options
        navigation.setOptions({
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate('Profile')}>
              {makeProfilePicture(currentUser, selectedImage, 38)}
            </Pressable>
          ),
        });
      }
    };

  const discardChanges = () => {
    setCurrentUser(initialUser);
    setImage(initialUser.picture);
    makeProfilePicture();
  };

  const signOut = () => {
    logout();
    navigation.navigate("Onboarding");
  }

  return (
    <ScrollView>
      <Text
        style={[
          styles.margin,
          { marginVertical: theme.spacing.m },
          styles.title,
        ]}
      >
        Personnal Information
      </Text>
      <Text style={[theme.textVariants.smallTitle, styles.margin]}>Avatar</Text>
      <View style={styles.avatarRow}>
        {handleProfilePicture()}
        <LemonButton type={"primary"} title={"Change"} onPress={() => {pickImage()}} />
        <LemonButton type={"tertiary"} title={"Remove"} onPress={() => { 
            setImage("");
            currentUser.picture = "";
            updateUser(currentUser);
            navigation.setOptions({
                headerRight: () => (
                  makeProfilePicture(currentUser,38)
                ),
              });
        }} />
      </View>
      <View style={styles.input}>
        {confs.map((config, index) => (
          <TextField
            key={index}
            configuration={config}
            onValidationSet={config.onValidationSet}
            value={populateTextFields(index)}
          />
        ))}
      </View>
      <Text
        style={[
          styles.margin,
          { marginVertical: theme.spacing.m },
          styles.title,
        ]}
      >
        Email notifications
      </Text>
      {currentUser && ( boxes.map((title, index) => (
        <Check key={index} title={title} isSelected ={currentUser.notificationSettings[title]} onToggle={() => handleNotificationToggle(title)}/>
      )))}
      <View style={styles.logoutContainer}>
        <LemonButton type={"secondary"} title={"Log out"} onPress={() => {signOut()}} />
      </View>
      <View style={styles.changesContainer}>
        <LemonButton
          type={"tertiary"}
          title={"Discard changes"}
          onPress={() => {discardChanges()}}
        />
        <LemonButton
          type={"primary"}
          title={"Save changes"}
          onPress={() => {updateUser(currentUser)}}
          disabled={
            validationState.isFirstNameValid &&
            validationState.isLastNameValid &&
            validationState.isEmailValid &&
            validationState.isPhoneValid
        }

        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    color: theme.colors.tertiary,
    fontSize: 16,
    fontWeight: "bold",
  },
  margin: {
    marginHorizontal: theme.spacing.m,
  },
  avatarRow: {
    margin: theme.spacing.m,
    flexDirection: "row",
    alignItems: "center",
  },
  logoutContainer: {
    justifyContent: "center",
    marginHorizontal: theme.spacing.m,
  },
  changesContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    margin: theme.spacing.l,
  },
  input: {
    marginHorizontal: theme.spacing.m,
  },
});

export default ProfileScreen;
