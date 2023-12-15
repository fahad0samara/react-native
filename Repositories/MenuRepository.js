import { MenuService } from "../Services/MenuService";
import { saveMenu, getStoredMenu } from "../Services/StorageService";
import {
  filterByCategory as dbFilterByCategory,
  filterByNameAndCategory as dbFilterByName,
  createTable,
  saveMenuItems,
} from "../Services/DatabaseService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const table = createTable();

export class MenuRepository {
  constructor() {
    this.service = new MenuService();
    this.categories = [];
    this.selectedCategories = [];
  }

  async getMenu() {
    try {
      const savedMenu = await getStoredMenu();
      if (savedMenu) {
        saveMenuItems(savedMenu);
        console.log("Received menu data from storage:", savedMenu);
        this.categories = this.extractCategories(savedMenu);
        this.filteredDishes = savedMenu;
      } else {
        const menu = await this.service.getMenu();
        saveMenu(menu);
        saveMenuItems(menu);
        console.log("Received menu data from service:", menu);
        this.categories = this.extractCategories(menu);
        this.filteredDishes = menu;
      }
    } catch (error) {
      console.log("Repository error:", error.message);
    }
  }

  extractCategories(menu) {
    const categoriesSet = new Set();

    menu.forEach((item) => {
      if (item.category) {
        categoriesSet.add(item.category);
      }
    });

    const uniqueCategories = Array.from(categoriesSet);

    return uniqueCategories;
  }

  async loadCategories() {
    try {
      const storedCategories = await AsyncStorage.getItem("selectedCategories");
      if (storedCategories !== null) {
        this.selectedCategories = JSON.parse(storedCategories);
        return this.selectedCategories;
      }
    } catch (error) {
      console.error("Error loading categories from AsyncStorage:", error);
    }
  }

  async saveCategories() {
    try {
      await AsyncStorage.setItem(
        "selectedCategories",
        JSON.stringify(this.selectedCategories)
      );
    } catch (error) {
      console.error("Error saving categories to AsyncStorage:", error);
    }
  }

  async filterMenuItems() {
    const menu = await getStoredMenu();

    if (this.selectedCategories.length > 0) {
      const filteredItems = [];
      try {
        const filteredItems = await dbFilterByCategory(this.selectedCategories);
        this.filteredDishes = filteredItems;
      } catch (error) {
        console.error("Error filtering menu items:", error);
      }
    } else {
      this.filteredDishes = [...menu];
    }
  }

  async searchForItem(query, selectedCategories) {
    const menu = await getStoredMenu();

    try {
      let filteredItems;
      if (selectedCategories && selectedCategories.length > 0) {
        filteredItems = await dbFilterByName(query, selectedCategories);
      } else {
        // If no categories are selected, perform the filtering based on the name only
        filteredItems = await dbFilterByName(query);
      }

      this.filteredDishes = filteredItems;
    } catch (error) {
      console.error("Error searching:", query, error);
      // Handle the error appropriately (e.g., display an error message)
    }
  }

  handleSelectedCategories = async (categories) => {
    this.selectedCategories = categories;

    await this.filterMenuItems();
    await this.saveCategories();
  };
}
