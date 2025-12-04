import { Stack } from "expo-router";
import { ThemeProvider, DefaultTheme } from "@react-navigation/native";

export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Info" }}
        />
      </Stack>
    </ThemeProvider>
  );
}
