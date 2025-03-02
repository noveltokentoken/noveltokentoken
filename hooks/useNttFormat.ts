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
  const sections = extractSection(markdown);
  return {
    sections,
  };
};

/*
Example of the markdown file format:

```
# Chapter 1: Chapter Title

::: chapter-summary
In this chapter, our protagonist meets a mysterious stranger in a bustling marketplace. Hints of an underlying conflict are introduced.
:::

::: beat-prompt
This beat introduces the stranger and sets up the intrigue.
:::

Beat text 1: The protagonist catches a fleeting glimpse of someone unusual in the crowd. The atmosphere is charged with anticipation.

::: beat-prompt
The situation escalates when a cryptic remark is exchanged.
:::

A brief exchange of words sparks a subtle conflict, leaving both characters with a sense of foreboding.

# Chapter 2

```
*/

export function extractSection(markdown: string): NttSection[] {
  const sections: NttSection[] = [];
  const lines = markdown.split('\n');
  
  let currentSection: string[] = [];
  let inBlock = false;
  let currentBlockType: NttSectionType | null = null;

  const addSection = (type: NttSectionType, content: string) => {
    if (content.trim()) {
      sections.push({ type, content: content.trim() });
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Handle chapter titles
    if (line.startsWith('#')) {
      if (currentSection.length > 0) {
        if (inBlock && currentBlockType) {
          addSection(currentBlockType, currentSection.join('\n'));
        } else {
          addSection('beat-text', currentSection.join('\n'));
        }
        currentSection = [];
      }
      addSection('chapter-title', line.replace(/^#+\s*/, ''));
      continue;
    }

    // Handle block sections (:::)
    if (line.startsWith(':::')) {
      if (currentSection.length > 0) {
        if (inBlock && currentBlockType) {
          addSection(currentBlockType, currentSection.join('\n'));
        } else {
          addSection('beat-text', currentSection.join('\n'));
        }
        currentSection = [];
      }

      if (!inBlock) {
        // Start of a block
        inBlock = true;
        const blockType = line.replace(':::', '').trim() as NttSectionType;
        currentBlockType = blockType;
      } else {
        // End of a block
        inBlock = false;
        currentBlockType = null;
      }
      continue;
    }

    // Collect lines for the current section
    if (line.trim() || currentSection.length > 0) {
      currentSection.push(line);
    }
  }

  // Handle the last section
  if (currentSection.length > 0) {
    if (inBlock && currentBlockType) {
      addSection(currentBlockType, currentSection.join('\n'));
    } else {
      addSection('beat-text', currentSection.join('\n'));
    }
  }

  return sections;
}

