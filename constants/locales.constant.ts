const SUPPORTED_LANGS = ['fr', 'en'] as const;

export async function getStaticPathsForLang() {
  return {
    paths: SUPPORTED_LANGS.map((lang) => ({ params: { lang } })),
    fallback: false,
  };
}
