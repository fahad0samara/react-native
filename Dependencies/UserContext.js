import { createContext, useContext, useState, useEffect } from 'react';
import { getUser, saveUser } from '../Services/StorageService'; 

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (userData) => {
    setUser(userData);
    await saveUser(userData); 
  };

  const logout = async () => {
    setUser(null);
    await saveUser(null); 
  };

  const getLoggedUser = async () => {
    try {
      const storedUser = await getUser(); 
      return storedUser;
    } catch (error) {
      console.error('Error retrieving user from storage:', error);
      return null;
    }
  };

  const updateUser = async (updatedUser) => {
    saveUser(updatedUser);
    await saveUser(updatedUser);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await getUser();
      if (storedUser) {
        saveUser(storedUser);
      }
    };

    fetchUser();
  }, []);

  const contextValue = {
    user,
    login,
    logout,
    getLoggedUser,
    updateUser,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
