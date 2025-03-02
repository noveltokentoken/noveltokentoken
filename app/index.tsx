import { Button, View } from "react-native";
import Block from "@/components/Block";
import { useNovelText } from "@/hooks/useNovelText";
import { useNttFormat } from "@/hooks/useNttFormat";

export default function Index() {
  const [novelText, setNovelText] = useNovelText();
  const { sections } = useNttFormat({
    markdown: novelText,
    setMarkdown: setNovelText,
  });
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "stretch",
        padding: 16,
      }}
    >
      {sections.map((section, index) => (
        <Block key={index} text={section.content}>
          <Button title="Cancel" onPress={() => {}} />
          <Button title="OK" onPress={() => {}} />
        </Block>
      ))}
    </View>
  );
}
