# Multi-Language Implementation Guide

## Status

✅ Infrastructure setup complete
✅ Translation files created (English, Czech, Ukrainian, Russian)
✅ Next.js i18n configuration complete
⏳ Component updates in progress

## What's Been Done

### 1. Installed Dependencies
- `next-intl` - Official Next.js internationalization library

### 2. Created Translation Files
All located in `/messages/`:
- `en.json` - English (source)
- `cs.json` - Czech
- `uk.json` - Ukrainian
- `ru.json` - Russian

### 3. Configuration Files
- `i18n.js` - i18n configuration
- `middleware.js` - Locale detection and routing
- `next.config.js` - Updated with next-intl plugin

### 4. App Structure
Converted to locale-aware structure:
```
app/
  [locale]/
    layout.js  ← Locale-aware layout with NextIntlClientProvider
    page.js    ← Home page
    globals.css
```

## How to Use Translations in Components

### In Server Components

```javascript
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('hero');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('subtitle')}</p>
    </div>
  );
}
```

### In Client Components

```javascript
'use client'

import { useTranslations } from 'next-intl';

export default function MyClientComponent() {
  const t = useTranslations('contactModal');

  return (
    <button>{t('submitButton')}</button>
  );
}
```

## Components That Need Translation

### Priority 1 - User-Facing Text
1. **Hero.jsx** - Use `t('hero.*')`
2. **ContactModal.jsx** - Use `t('contactModal.*')`
3. **Pricing.jsx** - Use `t('pricing.*')`
4. **FAQ.jsx** - Use `t('faq.*')`

### Priority 2 - Content Sections
5. **Features.jsx** - Use `t('features.*')`
6. **HowItWorks.jsx** - Use `t('howItWorks.*')`
7. **Curriculum.jsx** - Use `t('curriculum.*')`
8. **Testimonials.jsx** - Use `t('testimonials.*')`
9. **InstructorBio.jsx** - Use `t('instructor.*')`

### Priority 3 - Navigation & Footer
10. **Header/Navigation** - Use `t('nav.*')`
11. **Footer** - Use `t('footer.*')`
12. **CTA sections** - Use `t('cta.*')`

## Language Switcher Component

Create a language switcher to let users change languages:

```javascript
'use client'

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Select } from 'antd';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'cs', name: 'Čeština', flag: '🇨🇿' },
  { code: 'uk', name: 'Українська', flag: '🇺🇦' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale) => {
    // Remove current locale from path and add new one
    const segments = pathname.split('/').filter(Boolean);
    if (['en', 'cs', 'uk', 'ru'].includes(segments[0])) {
      segments.shift();
    }
    const newPath = newLocale === 'en'
      ? `/${segments.join('/')}`
      : `/${newLocale}/${segments.join('/')}`;

    router.push(newPath);
  };

  return (
    <Select
      value={locale}
      onChange={handleChange}
      style={{ width: 150 }}
      options={languages.map(lang => ({
        value: lang.code,
        label: `${lang.flag} ${lang.name}`
      }))}
    />
  );
}
```

## URL Structure

- English (default): `https://yoursite.com/` or `https://yoursite.com/en/`
- Czech: `https://yoursite.com/cs/`
- Ukrainian: `https://yoursite.com/uk/`
- Russian: `https://yoursite.com/ru/`

## Translation Keys Reference

All translation keys are organized in namespaces:

- `common.*` - App name, shared terms
- `nav.*` - Navigation links
- `hero.*` - Hero section
- `features.*` - Features section
- `howItWorks.*` - How it works + guarantees
- `curriculum.*` - Course curriculum
- `pricing.*` - Pricing plans
- `instructor.*` - Instructor bio
- `testimonials.*` - Student testimonials
- `faq.*` - Frequently asked questions
- `cta.*` - Call-to-action sections
- `footer.*` - Footer content
- `contactModal.*` - Contact form modal

## Testing

1. **Development:**
   ```bash
   npm run dev
   ```
   Access different languages:
   - http://localhost:3000 (English)
   - http://localhost:3000/cs (Czech)
   - http://localhost:3000/uk (Ukrainian)
   - http://localhost:3000/ru (Russian)

2. **Build for Production:**
   ```bash
   npm run build
   ```
   This will generate static pages for all 4 languages.

## Next Steps

1. Add LanguageSwitcher component to the header/nav
2. Update each component to use `useTranslations`
3. Test all translations in each language
4. Update metadata/SEO for each language
5. Add hreflang tags for SEO

## Example: Converting a Component

### Before:
```javascript
export default function Hero() {
  return (
    <div>
      <h1>Learn to Deal — Blackjack, Roulette & Poker</h1>
      <p>Practical, mentor-led coaching...</p>
      <button>Join Waitlist</button>
    </div>
  )
}
```

### After:
```javascript
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('subtitle')}</p>
      <button>{t('cta')}</button>
    </div>
  )
}
```

## Troubleshooting

**Issue:** Missing translation key
**Solution:** Check the JSON file for the key. Keys are case-sensitive.

**Issue:** Language not switching
**Solution:** Clear `.next` folder and rebuild: `rm -rf .next && npm run dev`

**Issue:** 404 on locale URLs
**Solution:** Make sure `middleware.js` is in the root directory and `generateStaticParams` is in layout.

## Resources

- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- Translation files: `/messages/*.json`
- i18n config: `/i18n.js`
- Middleware: `/middleware.js`
