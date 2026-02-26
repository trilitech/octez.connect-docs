// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const path = require("path");
import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Octez Connect Docs",
  tagline: "Connecting dApps with wallets.",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://octez-connect.tezos.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",
  themes: ["@docusaurus/theme-live-codeblock"],

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "trilitech", // Usually your GitHub org/user name.
  projectName: "octez.connect-docs", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  plugins: [
    "docusaurus-node-polyfills",
    function webpackFallbacks() {
      return {
        name: "webpack-fallbacks",
        configureWebpack() {
          return {
            resolve: {
              fallback: {
                fs: false,
              },
            },
          };
        },
      };
    },
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          {
            to: "/supported-wallets",
            from: ["/supported-wallets.html", "/beacon/wallets"], // string | string[]
          },
        ],
      },
    ],
  ],

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/trilitech/octez.connect-docs/edit/main/src/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        logo: {
          alt: "octez.connect Logo",
          src: "img/logo.svg",
          srcDark: "img/logo-white.svg",
        },
        items: [
          {
            type: "doc",
            position: "left",
            docId: "getting-started/simple-example",
            label: "dApps",
          },
          {
            type: "doc",
            position: "left",
            docId: "wallet/getting-started/web/getting-started",
            label: "Wallets",
          },
          { to: "playground/", label: "Playground", position: "right" },
          {
            href: "https://debug.octez.connect.tezos.com",
            label: "Debug Wallet",
            position: "right",
          },
          {
            href: "https://github.com/trilitech/octez.connect",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Getting Started",
                to: "/",
              },
              {
                label: "Typedoc Reference",
                href: "https://octez-connect.tezos.com",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Telegram",
                href: "https://t.me/tezos",
              },
              {
                label: "Discord",
                href: "https://discord.gg/tezos",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/tezos",
              },
              {
                label: "Blog",
                href: "https://medium.com/tezos",
              },
            ],
          },
          {
            title: "Octez Connect Components",
            items: [
              {
                label: "Octez Connect SDK",
                href: "https://github.com/trilitech/octez.connect",
              },
              {
                label: "Octez Connect Android SDK",
                href: "https://github.com/trilitech/octez.connect-android-sdk",
              },
              {
                label: "Octez Connect iOS SDK",
                href: "https://github.com/trilitech/octez.connect-ios-sdk",
              },
              {
                label: "Octez Connect Node",
                href: "https://github.com/trilitech/beacon-node",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Trilitech - Open Source MIT License`,
      },
      prism: {
        additionalLanguages: ["kotlin", "groovy", "swift", "ruby"],
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

module.exports = config;
