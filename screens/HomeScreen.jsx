import React, { useState, useEffect } from "react";
import { useUser } from "../Dependencies/UserContext";
import { MenuRepository } from "../Repositories/MenuRepository";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  FlatList,
  TextInput,
} from "react-native";
import Hero from "../components/Hero";
import { makeProfilePicture } from "../components/ProfileImage";
import DishCell from "../components/DishCell";
import { theme } from "../Utils/Theme";
import search from "../assets/search.png";

const HomeScreen = ({ navigation }) => {
  const { getLoggedUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [menu, setMenu] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [text, onChangeText] = useState("");
  const repository = new MenuRepository();

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        // Load user profile
        const user = await getLoggedUser();

        if (user) {
          navigation.setOptions({
            headerRight: () => (
              <Pressable onPress={() => navigation.navigate("Profile")}>
                {makeProfilePicture(user, user.picture, 38)}
              </Pressable>
            ),
          });
        }

        const loadedMenu = await repository.getMenu();
        // Load menu and categories
        setCategories(repository.categories);
        setMenu(repository.filteredDishes);

      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const renderItem = ({ item }) => <DishCell item={item} />;

  const handleFiltersSelection = async (category) => {
    let updatedCategories = [...selectedCategories];

    const categoryIndex = updatedCategories.indexOf(category);

    if (categoryIndex === -1) {
      // Category not found, add it
      updatedCategories.push(category);
    } else {
      // Category found, remove it
      updatedCategories.splice(categoryIndex, 1);
    }

    setSelectedCategories(updatedCategories);
    await repository.handleSelectedCategories(updatedCategories, text);
    setMenu(repository.filteredDishes);
  };

  const Separator = () => <View style={styles.separator} />;
  let debounceTimeout;

  const onQueryChange = async (value) => {
    onChangeText(value);
    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(async () => {
      try {
        // Perform your database search here using the debounced value
        console.log("Performing search for:", value);
        await repository.searchForItem(value, selectedCategories);
        setMenu(repository.filteredDishes);
      } catch (error) {
        console.error("Error performing search:", error);
      }
    }, 500);
  };

  return (
    <View style={styles.container}>
      <Hero style={styles.hero} />
      <View style={styles.search}>
        <View style={styles.inputContainer}>
          <Image source={search} style={styles.image} />
          <TextInput
            style={styles.textInput}
            value={text}
            onChangeText={onQueryChange}
          />
        </View>
      </View>
      <View style={styles.carousel}>
        <Text style={[styles.subtitle, theme.textVariants.cta]}>
          ORDER FOR DELIVERY !
        </Text>
        <ScrollView horizontal={true}>
          {categories.map((category, index) => (
            <Pressable
              key={index}
              style={[
                styles.filter,
                selectedCategories.includes(category) && styles.selectedFilter,
              ]}
              onPress={() => handleFiltersSelection(category)}
            >
              <Text
                style={[
                  styles.category,
                  selectedCategories.includes(category) &&
                    styles.selectedCategories,
                ]}
              >
                {category}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      <FlatList
        keyExtractor={(item) => item.name}
        style={styles.list}
        data={menu}
        renderItem={renderItem}
        ItemSeparatorComponent={Separator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hero: {
    flex: 0.3,
    padding: theme.spacing.m,
    backgroundColor: theme.colors.primary,
  },
  search: {
    flex: 0.2,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: theme.colors.lightBackground,
    borderRadius: 22,
    alignItems: "center",
    margin: theme.spacing.m,
    height: 44,
  },
  image: {
    flex: 0.15,
    marginLeft: theme.spacing.s,
    height: 24,
    width: 24,
    resizeMode: "contain",
    tintColor: theme.colors.primary,
  },
  textInput: {
    flex: 0.85,
    height: 44,
    color: theme.colors.primary,
    marginRight: theme.spacing.s,
  },
  icon: {
    tintColor: theme.colors.primary,
  },
  carousel: {
    flex: 0.25,
    justifyContent: "center",
  },
  subtitle: {
    margin: theme.spacing.m,
  },
  filter: {
    borderRadius: theme.radius.m,
    paddingVertical: theme.spacing.s,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: theme.spacing.m,
    backgroundColor: theme.colors.lightBackground,
  },
  selectedFilter: {
    backgroundColor: theme.colors.primary,
  },
  category: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  selectedCategories: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.lightBackground,
  },
  list: {
    flex: 0.25,
  },
  separator: {
    backgroundColor: theme.colors.lightBackground,
    height: 1,
    marginHorizontal: theme.spacing.m,
  },
});

export default HomeScreen;
