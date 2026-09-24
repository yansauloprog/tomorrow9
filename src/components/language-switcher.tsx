import { useLanguage, type Language } from "@/lib/language";

const languages: { code: Language; flag: string; name: string }[] = [
  { code: "en", flag: "🇬🇧", name: "English" },
  { code: "pt", flag: "🇵🇹", name: "Português (Portugal)" },
  { code: "es", flag: "🇪🇸", name: "Español" },
];

export function LanguageSwitcher({ mobile = false }: { mobile?: boolean }) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className={mobile ? "language-switcher language-switcher-mobile" : "language-switcher"} role="group" aria-label={t("Language")}>
      {languages.map(({ code, flag, name }) => (
        <button
          key={code}
          type="button"
          className={language === code ? "language-option is-selected" : "language-option"}
          aria-label={name}
          aria-pressed={language === code}
          lang={code === "pt" ? "pt-PT" : code}
          onClick={() => setLanguage(code)}
        >
          <span className="language-flag" aria-hidden="true">{flag}</span>
          <span>{code.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
}
