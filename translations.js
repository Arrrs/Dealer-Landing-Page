// All translations combined into a single file for easy client-side access
import en from './messages/en.json'
import cs from './messages/cs.json'
import uk from './messages/uk.json'
import ru from './messages/ru.json'

export const messages = {
  en,
  cs,
  uk,
  ru
}

export const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'cs', name: 'Čeština', flag: '🇨🇿' },
  { code: 'uk', name: 'Українська', flag: '🇺🇦' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
]
