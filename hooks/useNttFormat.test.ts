import { extractSection } from './useNttFormat';

describe('extractSection', () => {
  it('should parse chapter titles', () => {
    const markdown = '# Chapter 1: The Beginning';
    const sections = extractSection(markdown);
    expect(sections).toEqual([
      { type: 'chapter-title', content: 'Chapter 1: The Beginning' }
    ]);
  });

  it('should parse blocks with their types', () => {
    const markdown = `::: chapter-summary
This is a summary
:::`;
    const sections = extractSection(markdown);
    expect(sections).toEqual([
      { type: 'chapter-summary', content: 'This is a summary' }
    ]);
  });

  it('should parse beat text', () => {
    const markdown = 'This is regular beat text\nwith multiple lines';
    const sections = extractSection(markdown);
    expect(sections).toEqual([
      { type: 'beat-text', content: 'This is regular beat text\nwith multiple lines' }
    ]);
  });

  it('should parse a complete example', () => {
    const markdown = `# Chapter 1: Test Chapter

::: chapter-summary
Chapter summary here
:::

::: beat-prompt
First beat prompt
:::

Regular beat text here.

::: beat-prompt
Second beat prompt
:::

Final beat text.`;

    const sections = extractSection(markdown);
    expect(sections).toEqual([
      { type: 'chapter-title', content: 'Chapter 1: Test Chapter' },
      { type: 'chapter-summary', content: 'Chapter summary here' },
      { type: 'beat-prompt', content: 'First beat prompt' },
      { type: 'beat-text', content: 'Regular beat text here.' },
      { type: 'beat-prompt', content: 'Second beat prompt' },
      { type: 'beat-text', content: 'Final beat text.' }
    ]);
  });
});