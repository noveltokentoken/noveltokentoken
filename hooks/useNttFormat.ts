type UseNttFormatProps = {
  markdown: string;
  setMarkdown: (markdown: string) => void;
};

type NttSectionType =
  | "chapter-title"
  | "beat-prompt"
  | "beat-text"
  | "chapter-summary"
  | "beat-prompt-template"
  | "chapter-summary-prompt-template";

type NttSection = {
  type: NttSectionType;
  content: string;
};

type UseNttFormatResult = {
  sections: NttSection[];
};

export const useNttFormat = (props: UseNttFormatProps): UseNttFormatResult => {
  const { markdown } = props;
  return {
    sections: [],
  };
};
