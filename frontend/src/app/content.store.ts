import { Injectable, signal } from '@angular/core';
import { DEFAULT_SITE_CONTENT, ContentBlock, PageContent, SiteContent, SocialLink } from './page-content';

const STORAGE_KEY = 'meron-portfolio-content';

function isSiteContent(value: unknown): value is SiteContent {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const content = value as Partial<SiteContent>;
  return (
    Array.isArray(content.pages) &&
    content.pages.every(
      (page) =>
        typeof page === 'object' &&
        page !== null &&
        ['id', 'layout', 'label', 'eyebrow', 'title', 'subtitle', 'description', 'image', 'sectionHeading', 'sectionIntro', 'closingHeading'].every(
          (field) => typeof page[field as keyof PageContent] === 'string',
        ) &&
        Array.isArray(page.blocks) &&
        page.blocks.every(
          (block: ContentBlock) =>
            typeof block === 'object' &&
            block !== null &&
            ['kind', 'size', 'eyebrow', 'title', 'description', 'image', 'alt', 'metric'].every(
              (field) => typeof block[field as keyof ContentBlock] === 'string',
            ),
        ),
    ) &&
    Array.isArray(content.socialLinks) &&
    content.socialLinks.every(
      (link: SocialLink) =>
        typeof link === 'object' &&
        link !== null &&
        typeof link.label === 'string' &&
        typeof link.url === 'string',
    )
  );
}

@Injectable({ providedIn: 'root' })
export class ContentStore {
  readonly content = signal(this.load());

  pageById(id: string): PageContent {
    return this.content().pages.find((page) => page.id === id) ?? this.content().pages[0];
  }

  savePage(page: PageContent, socialLinks: SocialLink[]): void {
    const updated: SiteContent = {
      pages: this.content().pages.map((item) => (item.id === page.id ? page : item)),
      socialLinks,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    this.content.set(updated);
  }

  restoreDefaults(): void {
    localStorage.removeItem(STORAGE_KEY);
    this.content.set(DEFAULT_SITE_CONTENT);
  }

  private load(): SiteContent {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        const parsed: unknown = JSON.parse(saved);
        if (isSiteContent(parsed)) {
          return parsed;
        }
        const migrated = this.migrateLegacyContent(parsed);
        if (migrated) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
          return migrated;
        }
        console.error('保存されたページ情報の形式が正しくありません。既定の内容を表示します。');
      }
    } catch (error) {
      console.error('保存されたページ情報を読み込めませんでした。', error);
    }

    return DEFAULT_SITE_CONTENT;
  }

  private migrateLegacyContent(value: unknown): SiteContent | undefined {
    if (typeof value !== 'object' || value === null) {
      return undefined;
    }

    const legacy = value as Partial<SiteContent>;
    if (!Array.isArray(legacy.pages) || !Array.isArray(legacy.socialLinks)) {
      return undefined;
    }

    const pages = DEFAULT_SITE_CONTENT.pages.map((defaults) => {
      const previous = legacy.pages?.find((page) => page.id === defaults.id);
      if (!previous || typeof previous !== 'object') {
        return defaults;
      }

      return {
        ...defaults,
        ...Object.fromEntries(
          ['label', 'eyebrow', 'title', 'subtitle', 'description', 'image']
            .filter((field) => typeof previous[field as keyof PageContent] === 'string')
            .map((field) => [field, previous[field as keyof PageContent]]),
        ),
      };
    });

    const socialLinks = legacy.socialLinks.filter(
      (link): link is SocialLink =>
        typeof link === 'object' &&
        link !== null &&
        typeof link.label === 'string' &&
        typeof link.url === 'string',
    );

    return { pages, socialLinks };
  }
}
