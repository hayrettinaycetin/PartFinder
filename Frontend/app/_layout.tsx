import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { ThemeProvider } from "@react-navigation/native";
import { useState, createContext, useContext } from "react";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";

// Create context
const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

//Export hook to use in other files
export function useTheme() {
  return useContext(ThemeContext);
}

// Root layout
export default function RootLayout() {
  const systemScheme = useColorScheme();
  const [theme, setTheme] = useState(systemScheme ?? "light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const navigationTheme = theme === "light" ? DefaultTheme : DarkTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider value={navigationTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{ presentation: "modal", title: "Info" }}
          />
        </Stack>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
