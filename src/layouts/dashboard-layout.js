import { jd } from "../jd.config";

export function DashboardLayout({ outlet }) {
    return jd.div({ className: "drawer lg:drawer-open" }, [
        jd.input({
            id: "my-drawer-4",
            type: "checkbox",
            className: "drawer-toggle",
            checked: localStorage.getItem('openSidebar') === 'true',
            onchange: (e) => localStorage.setItem('openSidebar', e.target.checked)
        }),
        jd.div({ className: "drawer-content" }, [
            jd.nav({ className: "navbar w-full bg-base-300" }, [
                jd.label(
                    {
                        htmlFor: "my-drawer-4",
                        ariaLabel: "open sidebar",
                        className: "btn btn-square btn-ghost",
                    },
                    [
                        jd.lucide('Sidebar', { className: 'size-4' })
                    ]
                ),
                jd.div({ className: "px-4" }, [" Navbar Title"]),
                jd.div({ className: 'flex gap-2 items-center ml-auto' }, [
                    jd.lucide('Sun', { className: 'size-4' }),
                    jd.input({
                        type: 'checkbox',
                        value: 'dark',
                        className: 'toggle theme-controller toggle-sm',
                        checked: localStorage.getItem('theme') === 'dark',
                        onchange: e => localStorage.setItem('theme', e.target.checked ? 'dark' : 'light')
                    }),
                    jd.lucide('Moon', { className: 'size-4' })
                ])
            ]),
            jd.div({ className: "p-4" }, [outlet]),
        ]),
        jd.div({ className: "drawer-side is-drawer-close:overflow-visible" }, [
            jd.label({
                htmlFor: "my-drawer-4",
                ariaLabel: "close sidebar",
                className: "drawer-overlay",
            }),
            jd.div(
                {
                    className:
                        "flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64",
                },
                [
                    jd.ul({ className: "menu w-full grow" }, [
                        jd.li({ className: 'menu-title flex-row gap-2 items-center text-primary px-2 mb-4' }, [
                            jd.lucide('GraduationCap'),
                            jd.p({ className: 'is-drawer-close:hidden' }, ['ScuolaFacile'])
                        ]),
                        MenuItem({ text: 'Dashboard', icon: 'LayoutDashboard', href: '/dashboard' }),
                        MenuItem({ text: 'Studenti', icon: 'UsersRound', href: '/studenti' }),
                        MenuItem({ text: 'Presenze', icon: 'NotebookTabs', href: '/presenze' }),
                    ]),
                ]
            ),
        ]),
    ]);
}


function MenuItem({ text, icon, href }) {
    return jd.li({}, [
        jd.routerLink(
            ({ isExact }) => ({
                className:
                    `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isExact ? 'bg-primary/10 text-primary' : ''}`,
                dataTip: text,
                href
            }),
            [
                jd.lucide(icon, { className: 'size-4 my-1.5 inline-block' }),
                jd.span({ className: "is-drawer-close:hidden" }, [text]),
            ]
        ),
    ]);
}