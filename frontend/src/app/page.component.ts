import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ContentStore } from './content.store';
import { ContentBlock, PageContent, SocialLink } from './page-content';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-page',
  styleUrl: './page.component.css',
  templateUrl: './page.component.html',
})
export class PageComponent {
  private readonly route = inject(ActivatedRoute);
  readonly store = inject(ContentStore);
  readonly pageId = signal('main');
  readonly page = computed(() => this.store.pageById(this.pageId()));
  readonly pageIndex = computed(() =>
    String(this.store.content().pages.findIndex((page) => page.id === this.pageId()) + 1).padStart(2, '0'),
  );
  readonly isMain = computed(() => this.pageId() === 'main');
  readonly editing = signal(false);
  readonly error = signal('');
  readonly currentYear = new Date().getFullYear();

  draft: PageContent = { ...this.store.pageById('main'), blocks: [] };
  draftBlocks: ContentBlock[] = [];
  draftSocialLinks: SocialLink[] = [];

  constructor() {
    this.route.data.subscribe((data) => this.pageId.set(data['pageId'] ?? 'main'));
  }

  startEditing(): void {
    const page = this.page();
    this.draft = { ...page, blocks: page.blocks.map((block) => ({ ...block })) };
    this.draftBlocks = page.blocks.map((block) => ({ ...block }));
    this.draftSocialLinks = this.store.content().socialLinks.map((link) => ({ ...link }));
    this.error.set('');
    this.editing.set(true);
  }

  save(): void {
    if (!this.draft.title.trim() || !this.draft.label.trim()) {
      this.error.set('タイトルとメニュー名を入力してください。');
      return;
    }

    const hasInvalidSocialLink = this.draftSocialLinks.some((link) => {
      if (!link.url.trim()) {
        return false;
      }
      try {
        return !['http:', 'https:'].includes(new URL(link.url).protocol);
      } catch {
        return true;
      }
    });

    if (hasInvalidSocialLink) {
      this.error.set('SNSのURLは http:// または https:// から始まる形式で入力してください。');
      return;
    }

    const updatedPage: PageContent = {
      ...this.draft,
      blocks: this.draftBlocks.map((block) => ({ ...block })),
    };

    try {
      this.store.savePage(updatedPage, this.draftSocialLinks);
      this.editing.set(false);
      this.error.set('');
    } catch (error) {
      console.error('ページ情報を保存できませんでした。', error);
      this.error.set('保存できませんでした。画像サイズを小さくするか、ブラウザーの空き容量をご確認ください。');
    }
  }

  restoreDefaults(): void {
    if (!confirm('編集した内容をすべて初期状態に戻しますか？')) {
      return;
    }

    try {
      this.store.restoreDefaults();
      this.editing.set(false);
      this.error.set('');
    } catch (error) {
      console.error('初期状態に戻せませんでした。', error);
      this.error.set('初期状態に戻せませんでした。ブラウザーの保存領域をご確認ください。');
    }
  }

  addBlock(): void {
    this.draftBlocks.push({
      kind: 'story',
      size: 'normal',
      eyebrow: '',
      title: '新しいコンテンツ',
      description: '',
      image: '',
      alt: '',
      metric: '',
    });
  }

  removeBlock(index: number): void {
    this.draftBlocks.splice(index, 1);
  }

  onImageSelected(event: Event, blockIndex?: number): void {
    const input = event.currentTarget as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }
    input.value = '';
    if (!file.type.startsWith('image/')) {
      this.error.set('画像ファイルを選択してください。');
      return;
    }
    if (file.size > 1_500_000) {
      this.error.set('画像は1.5MB以下のファイルを選択してください。');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        if (blockIndex === undefined) {
          this.draft.image = reader.result;
        } else {
          const block = this.draftBlocks[blockIndex];
          if (block) {
            block.image = reader.result;
          }
        }
        this.error.set('');
      }
    };
    reader.onerror = () => {
      this.error.set('画像を読み込めませんでした。別の画像をお試しください。');
    };
    reader.readAsDataURL(file);
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
