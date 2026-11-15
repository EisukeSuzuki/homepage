export type PageLayout = 'home' | 'profile' | 'mission' | 'achievements' | 'companies' | 'hobby';
export type BlockKind = 'photo' | 'story' | 'stat' | 'brand';
export type BlockSize = 'normal' | 'wide' | 'tall';

export interface ContentBlock {
  kind: BlockKind;
  size: BlockSize;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  metric: string;
}

export interface PageContent {
  id: string;
  layout: PageLayout;
  label: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  sectionHeading: string;
  sectionIntro: string;
  closingHeading: string;
  blocks: ContentBlock[];
}

export interface SocialLink {
  label: string;
  url: string;
}

export interface SiteContent {
  pages: PageContent[];
  socialLinks: SocialLink[];
}

function photo(image: string, alt: string, size: BlockSize = 'normal'): ContentBlock {
  return { kind: 'photo', size, eyebrow: '', title: '', description: '', image, alt, metric: '' };
}

function story(eyebrow: string, title: string, description: string, size: BlockSize = 'normal'): ContentBlock {
  return { kind: 'story', size, eyebrow, title, description, image: '', alt: '', metric: '' };
}

function stat(metric: string, eyebrow: string, title: string, description: string): ContentBlock {
  return { kind: 'stat', size: 'normal', eyebrow, title, description, image: '', alt: '', metric };
}

function brand(title: string, description: string, size: BlockSize = 'normal'): ContentBlock {
  return { kind: 'brand', size, eyebrow: 'PARTNER BRAND', title, description, image: '', alt: '', metric: '' };
}

export const DEFAULT_SITE_CONTENT: SiteContent = {
  pages: [
    {
      id: 'main',
      layout: 'home',
      label: 'Main Menu',
      eyebrow: "HELLO, I'M",
      title: 'MERON',
      subtitle: '未来をデザインし、人と組織の可能性をひらく。',
      description:
        '企業の成長とイノベーションを支える、リーダーシップと創造性。これまでの歩みや大切にしている想いをご紹介します。',
      image: '/images/main-menu.png',
      sectionHeading: 'Discover more.',
      sectionIntro: '興味のあるページから、これまでの歩みをご覧ください。',
      closingHeading: '',
      blocks: [
        brand('STRYKE', 'PERFORMANCE'),
        brand('VORTEX', 'TRAINING'),
        brand('MERON', 'LEADERSHIP'),
        brand('STRYKE', 'INNOVATION'),
        brand('VORTEX', 'MOVEMENT'),
      ],
    },
    {
      id: 'profile',
      layout: 'profile',
      label: 'Profile',
      eyebrow: 'PROFILE / 01',
      title: 'ENLIGHTENED THE PATHWAYS',
      subtitle: '経験をつなぎ、次の可能性へ。',
      description: '人と組織の成長を支える、これまでの歩み。',
      image: '/images/profile-portrait.png',
      sectionHeading: 'EDUCATION',
      sectionIntro:
        '現場で培った知見と学びを組み合わせ、チームと組織が前に進むための道筋を描きます。',
      closingHeading: 'EMPOWERING CHANGE, ENVISIONING TOMORROW',
      blocks: [
        story('MASTER OF BUSINESS ADMINISTRATION', 'HARVARD UNIVERSITY', '経営とリーダーシップを学ぶ\n2008 — 2010'),
        story('BACHELOR OF SCIENCE', 'PURDUE UNIVERSITY', 'コンピューターサイエンスと経済学\n2004 — 2008'),
        story('DIGITAL ARTS', 'ACADEMY OF DIGITAL ARTS', 'グラフィックテクノロジー\n2002 — 2004'),
      ],
    },
    {
      id: 'mission-vision',
      layout: 'mission',
      label: 'Mission / Vision',
      eyebrow: 'OUR PURPOSE',
      title: 'Mission & Vision',
      subtitle: '変化を起こし、明日を描く。',
      description: '一人ひとりの可能性を引き出し、持続可能な価値を生み出す。',
      image: '',
      sectionHeading: 'EMPOWERING CHANGE, ENVISIONING TOMORROW',
      sectionIntro: '人と組織、そして未来のために。私たちが大切にしていること。',
      closingHeading: '',
      blocks: [
        {
          ...story(
            '01 / WHY WE EXIST',
            'MISSION',
            '私たちの使命は、言葉だけではなく、日々の行動の中にあります。誠実さと挑戦を大切にし、人と組織が持つ可能性を引き出すことで、未来につながる変化を生み出します。',
          ),
          image: '/images/mission-meeting.png',
          alt: '窓の向こうに街を望むオフィスで未来を考える',
        },
        {
          ...story(
            '02 / WHERE WE ARE GOING',
            'VISION',
            '個人、企業、社会がともに成長できる未来へ。好奇心と協働を大切にし、世代を超えて価値が受け継がれる、新しい可能性を切り拓きます。',
          ),
          image: '/images/vision-ocean.png',
          alt: '水平線の向こうに広がる未来',
        },
      ],
    },
    {
      id: 'achievements',
      layout: 'achievements',
      label: 'Achievements',
      eyebrow: 'A JOURNEY OF IMPACT',
      title: 'Achievements',
      subtitle: '挑戦の積み重ねを、確かな価値へ。',
      description: 'プロジェクト、評価、仲間との取り組み。ともに生み出した成果をご紹介します。',
      image: '',
      sectionHeading: 'MILESTONES & MOMENTS',
      sectionIntro: 'さまざまな場所で出会った人たちと、ひとつずつ形にしてきた取り組み。',
      closingHeading: '',
      blocks: [
        photo('/images/achievement-conference.png', 'カンファレンスでの講演と交流', 'wide'),
        stat('01', 'RECOGNITION', 'AWARDS', '優れたパフォーマンスと革新への取り組みが評価されました。'),
        photo('/images/achievement-boardroom.png', '協働プロジェクトについて意見を交わすチーム'),
        photo('/images/achievement-speaker.png', 'イベントで聴衆に語りかける登壇者', 'tall'),
        photo('/images/achievement-stage.png', '多くの仲間が集まるステージでの発表', 'tall'),
        stat('13+', 'TOGETHER WE GROW', 'ACTIVE COMMUNITY', 'アイデアを分かち合い、新しい挑戦を生み出すコミュニティ。'),
        photo('/images/achievement-workshop.png', 'ワークショップでアイデアを共有する仲間'),
      ],
    },
    {
      id: 'contract-company',
      layout: 'companies',
      label: 'Contract Company',
      eyebrow: 'WORKING TOGETHER',
      title: 'Contract Company',
      subtitle: '信頼からはじまる、パートナーシップ。',
      description: 'ブランドの想いと、人の挑戦。パートナーと一緒に生み出す体験。',
      image: '',
      sectionHeading: 'BRANDS BUILT TO MOVE',
      sectionIntro: '人とスポーツの未来をつくる、コラボレーションの記録。',
      closingHeading: '',
      blocks: [
        { ...photo('/images/company-athlete.png', 'パフォーマンスウェアを着用したアスリート', 'wide'), title: 'MADE TO MOVE' },
        brand('STRYKE', 'BUILT FOR THOSE WHO PUSH BEYOND'),
        photo('/images/company-product.png', 'スポーツの現場を支えるウォーターボトル'),
        { ...photo('/images/company-watch.png', 'アクティビティを記録するスマートウォッチ'), size: 'tall' },
        brand('STRYKE', 'PERFORMANCE / PRECISION'),
        { ...photo('/images/company-apparel.png', 'トレーニング用アパレルのプロダクトフォト', 'tall'), title: 'ENGINEERED FOR PERFORMANCE' },
      ],
    },
    {
      id: 'hobby',
      layout: 'hobby',
      label: 'Hobby',
      eyebrow: 'BEYOND WORK',
      title: 'Hobby',
      subtitle: '好きなことが、毎日に彩りをつくる。',
      description: '心と身体を整え、新しい自分と出会う時間。',
      image: '',
      sectionHeading: 'TRAIN HARD. STAY FOCUSED.',
      sectionIntro: '一歩ずつ、昨日の自分を超えていく。',
      closingHeading: '',
      blocks: [
        {
          ...story('FIND YOUR STRENGTH', 'VORTEX GYM', '鍛えることを通じて、集中力と自分を信じる力を育てる。', 'tall'),
          image: '/images/hobby-wellness.png',
          alt: 'トレーニングで自分の強さと向き合う',
        },
        brand('VORTEX GYM', 'ENTER THE CORE OF STRENGTH AND TRANSFORMATION', 'wide'),
        photo('/images/hobby-gym.png', 'トレーニングへの意欲が高まるジム空間'),
        photo('/images/hobby-training.png', '身体を鍛え、トレーニングに向き合う'),
        stat('01', 'THE DAILY PRACTICE', 'CONSISTENCY', '積み重ねた習慣が、少しずつ新しい自分をつくる。'),
        story('A MOMENT TO RESET', 'RECOVERY', '身体を動かし、整える。次の挑戦に向けて心もリセットする。', 'wide'),
        photo('/images/hobby-strength.png', '自分の限界に挑むアスリート', 'tall'),
      ],
    },
  ],
  socialLinks: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/' },
    { label: 'Instagram', url: 'https://www.instagram.com/' },
    { label: 'X', url: 'https://x.com/' },
  ],
};
