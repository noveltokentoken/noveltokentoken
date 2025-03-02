import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'novel_text';

export function useNovelText() {
  const [text, setText] = useState<string>('');

  useEffect(() => {
    // Load initial value from storage
    const loadStoredText = async () => {
      try {
        const storedText = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedText !== null) {
          setText(storedText);
        }
      } catch (error) {
        console.error('Error loading novel text:', error);
      }
    };
    
    loadStoredText();
  }, []);

  const updateText = async (newText: string) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, newText);
      setText(newText);
    } catch (error) {
      console.error('Error saving novel text:', error);
    }
  };

  return [text, updateText] as const;
}