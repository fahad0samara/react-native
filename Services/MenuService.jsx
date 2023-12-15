import axios from "axios";

export class MenuService {
  constructor() {}

  async getMenu() {
    try {
      const response = await axios.get(
        "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json"
      );
      console.log(response);
      if (response.status !== 200) {
        throw new Error(
          "Failed to fetch menu data. Status: " + response.status
        );
      }

      const menu = response.data.menu;
      if (!Array.isArray(menu) || menu.length === 0) {
        throw new Error(
          "Invalid menu data. The input must be a non-empty array."
        );
      }
      return menu;
    } catch (error) {
      console.error(error);
    }
  }
}
