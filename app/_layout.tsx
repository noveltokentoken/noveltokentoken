import { Stack } from "expo-router";
import { Button, View } from "react-native";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerRight: () => (
            <View style={{ paddingRight: 16 }}>
              <Button title="Raw Text" onPress={() => {}} />
            </View>
          ),
        }}
      />
    </Stack>
  );
}
