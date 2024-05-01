module.exports = {
    title: 'tuanzi-blog-docs',
    description: 'Just a docs!',
    head: [
        ["meta", { name: "theme-color", content: "#3c8772" }]
    ],
    themeConfig: {
        nav: [
            { text: '博客', link: 'http://localhost:5173/' },
            { text: '介绍', link: '/index' },
            { text: '开发日志', link: '/other/update' },
        ],
        sidebar: [
            {
                text: '介绍',
                items: [
                    { text: '食用指南', link: '/guide/howToDo' },
                    { text: '内容介绍', link: '/guide/aboutComponent' },
                ]
            },
            {
                text: '其他',
                items: [
                    { text: '开发日志', link: '/other/update' },
                    { text: '关于作者', link: '/other/about' },
                    { text: '友情链接', link: '/other/url' },
                ]
            },
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
        ]
    }
}