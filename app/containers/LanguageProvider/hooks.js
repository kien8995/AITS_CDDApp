import { useStore } from 'store';

export const useLanguageProvider = () => {
  const { state } = useStore();
  const { locale } = state.language;

  return { locale };
};
