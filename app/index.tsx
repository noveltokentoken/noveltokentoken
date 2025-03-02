import { Button, View } from "react-native";
import Block from "../components/Block";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
      }}
    >
      <Block text="This is an example block with some text content. You can put any text here and add buttons below.">
        <Button title="Cancel" onPress={() => {}} />
        <Button title="OK" onPress={() => {}} />
      </Block>
    </View>
  );
}
