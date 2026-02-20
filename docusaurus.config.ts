import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import tabBlocks from "docusaurus-remark-plugin-tab-blocks";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'MCPBay Docs',
  tagline: 'Your context distributor of confidence.',
  favicon: 'img/favicon.ico',
  
  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.mcpbay.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  // organizationName: 'facebook', // Usually your GitHub org/user name.
  // projectName: 'mcpb-docs', // Usually your repo name.

  onBrokenLinks: 'throw',

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
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          routeBasePath: '/',
          beforeDefaultRemarkPlugins: [require('remark-extended-table'), tabBlocks],

        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'MCPBay Docs',
      logo: {
        alt: 'MCPBay Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Tutorial',
        },
        // { to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/mcpbay?tab=repositories',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/intro',
            },
          ],
        },
        // {
        //   title: 'Community',
        //   items: [
        //     {
        //       label: 'Stack Overflow',
        //       href: 'https://stackoverflow.com/questions/tagged/docusaurus',
        //     },
        //     {
        //       label: 'Discord',
        //       href: 'https://discordapp.com/invite/docusaurus',
        //     },
        //     {
        //       label: 'X',
        //       href: 'https://x.com/docusaurus',
        //     },
        //   ],
        // },
        {
          title: 'More',
          items: [
            // {
            //   label: 'Blog',
            //   to: '/blog',
            // },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} MCPBay`,
    },
    prism: {
      theme: prismThemes.github, // Keep the light theme
      darkTheme: { // Custom dark theme
        plain: {
          color: '#9F9FA9', // General text color
          backgroundColor: '#09090B', // Dark mode background
        },
        styles: [
          // Default style for most tokens
          {
            types: ['comment', 'prolog', 'doctype', 'cdata', 'punctuation', 'operator', 'entity', 'url', 'symbol', 'regex', 'atrule', 'attr-name', 'tag', 'selector', 'boolean', 'constant', 'builtin', 'char', 'string', 'number', 'variable', 'property', 'keyword', 'function'],
            style: {
              color: '#9F9FA9', // General text color
            },
          },
          // Applying #39A2FF to specific "selected" elements.
          {
            types: ['keyword', 'function', 'string', 'tag', 'selector', 'atrule', 'property', 'builtin', 'entity', 'constant', 'symbol'],
            style: {
              color: '#39A2FF', // "Selected" text color
            },
          },
        ],
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
