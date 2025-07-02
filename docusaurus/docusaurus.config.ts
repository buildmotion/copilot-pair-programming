import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Beyond Autocomplete: Mastering AI Pair Programming',
  tagline: 'Comprehensive Resource Portal for GitHub Copilot Mastery',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://buildmotion.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/copilot-pair-programming/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'buildmotion', // Usually your GitHub org/user name.
  projectName: 'copilot-pair-programming', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/buildmotion/copilot-pair-programming/tree/main/docusaurus/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/buildmotion/copilot-pair-programming/tree/main/docusaurus/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'AI Pair Programming Guide',
      logo: {
        alt: 'GitHub Copilot Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'conferenceTalkSidebar',
          position: 'left',
          label: '🎯 Conference Talk',
        },
        {
          type: 'docSidebar',
          sidebarId: 'researchSidebar',
          position: 'left',
          label: '🔬 Research',
        },
        {
          type: 'docSidebar',
          sidebarId: 'guidesSidebar',
          position: 'left',
          label: '🛠️ Guides',
        },
        {
          type: 'docSidebar',
          sidebarId: 'instructionsSidebar',
          position: 'left',
          label: '📋 Instructions',
        },
        {to: '/blog', label: '💬 Sessions', position: 'left'},
        {
          href: 'https://github.com/buildmotion/copilot-pair-programming',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/intro',
            },
            {
              label: 'Implementation Guides',
              to: '/docs/implementation-guides/git-workflow-setup',
            },
            {
              label: 'AI Instructions Framework',
              to: '/docs/ai-instructions/framework-overview',
            },
          ],
        },
        {
          title: 'Essential YouTube Channels',
          items: [
            {
              label: '📺 VS Code YouTube',
              href: 'https://www.youtube.com/@code',
            },
            {
              label: '📺 GitHub YouTube',
              href: 'https://www.youtube.com/@GitHub',
            },
          ],
        },
        {
          title: 'Community & Support',
          items: [
            {
              label: 'GitHub Repository',
              href: 'https://github.com/buildmotion/copilot-pair-programming',
            },
            {
              label: 'Stack Overflow - Copilot',
              href: 'https://stackoverflow.com/questions/tagged/github-copilot',
            },
            {
              label: 'LinkedIn: Matt Vaughn',
              href: 'https://linkedin.com/in/buildmotion',
            },
          ],
        },
        {
          title: 'More Resources',
          items: [
            {
              label: 'Development Sessions',
              to: '/blog',
            },
            {
              label: 'Learning Resources',
              to: '/docs/resources/learning-resources',
            },
            {
              label: 'Conference Talk',
              to: '/docs/conference-talk/getting-started',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Beyond Autocomplete: AI Pair Programming Resources. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
