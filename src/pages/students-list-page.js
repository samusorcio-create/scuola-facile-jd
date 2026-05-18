import { createRef } from "just-dom";
import { jd } from "../jd.config";
import { createSignal, effect } from "@just-dom/signals";
import { DeleteDialog } from "../components/delete-dialog";

export function StudentsListPage() {
    const tbody = createRef()
    const allCheckboxRef = createRef();

    // const studentsList = []
    const [studentsList, setStudentsList] = createSignal([])

    fetch(`${"http://localhost:5000/studenti"}/studenti`)
        .then(async res => {
            const students = await res.json();
            console.log(students);
            // tbody.current.innerHTML = '';
            // tbody.current.append(...students.map(student => StudentRow({ student })));
            setStudentsList(students.map(st => ({ ...st, checked: false })))
        })
        .catch(err => {
            console.log(err);
        });

    const StudentRow = ({ student }) => {
        const trRef = createRef();
        return jd.tr({ ref: trRef }, [
            jd.th({}, [
                jd.label({}, [
                    jd.input({
                        type: "checkbox",
                        className: "checkbox",
                        // onchange: e => {
                        //     const rowCheckboxes = document.querySelectorAll('tbody .checkbox');
                        //     const allChecked = Array.from(rowCheckboxes).every(checkbox => checkbox.checked);
                        //     allCheckboxRef.current.checked = allChecked;
                        // }
                        checked: student.checked,
                        onchange: e => {
                            setStudentsList(studentsList().map(
                                st => st.id === student.id ? { ...student, checked: e.target.checked } : st
                            ))
                        }
                    })
                ]),
            ]),
            jd.td({}, [
                jd.div({ className: "flex items-center gap-3" }, [
                    jd.div({ className: "avatar" }, [
                        jd.div({ className: "mask mask-squircle h-12 w-12" }, [
                            jd.img({
                                src: student.img,
                                alt: "Avatar Tailwind CSS Component",
                            }),
                        ]),
                    ]),
                    jd.div({}, [
                        jd.div({ className: "font-bold" }, [`${student.nome} ${student.cognome}`]),
                        jd.div({ className: "text-sm opacity-50" }, [student.email]),
                    ]),
                ]),
            ]),
            jd.td({}, [student.corso]),
            jd.td({}, [
                jd.progress({ className: "progress w-56", value: `${student.percentuale_assenze}`, max: "100" }),
            ]),
            jd.th({}, [
                jd.routerLink({ className: "btn btn-ghost btn-xs", href: `/studenti/${student.id}` }, ["Dettagli"]),
                DeleteDialog({
                    title: 'Elimina studente',
                    description: `Sicuro di voler eliminare lo studente ${student.nome}`,
                    trigger: jd.button(
                        {
                            className: 'btn btn-xs btn-error btn-soft btn-square ml-2',
                            // onclick: () => {
                            //     setStudentsList(studentsList().filter(st => st.id !== student.id))
                            // }
                        },
                        [jd.lucide('Trash2', { className: 'size-4' })]
                    ),
                    onDelete: async () => {
                        // import.meta.env.VITE_API_URL
                        return fetch(`${"http://localhost:5000/studenti"}/studenti/${student.id}`, { method: 'DELETE' })
                            .then(() => {
                                setTimeout(() => {
                                    setStudentsList(studentsList().filter(st => st.id !== student.id))
                                }, 1000);
                            })
                    }
                })
            ]),
        ]);
    }

    return jd.div({ className: "overflow-x-auto" }, [
        jd.table({ className: "table" }, [
            jd.thead({}, [
                jd.tr({}, [
                    jd.th({}, [
                        jd.label({}, [
                            jd.input({
                                // ref: allCheckboxRef,
                                ref: (el) => {
                                    effect(el, () => {
                                        el.checked = studentsList().every(st => st.checked);
                                    })
                                },
                                type: "checkbox",
                                className: "checkbox",
                                // onchange: e => {
                                //     const rowCheckboxes = document.querySelectorAll('tbody .checkbox');
                                //     rowCheckboxes.forEach(checkbox => {
                                //         checkbox.checked = e.target.checked;
                                //     })
                                // }
                                onchange: e => {
                                    setStudentsList(studentsList().map(st => ({ ...st, checked: e.target.checked })))
                                }
                            })
                        ]),
                    ]),
                    jd.th({}, [" Nome"]),
                    jd.th({}, [" Corso"]),
                    jd.th({}, [" Assenze"]),
                    jd.th({}, [
                        jd.routerLink({ href: '/studenti/aggiungi', className: 'btn btn-primary'}, [
                            jd.lucide('Plus', { className: 'size-4 '}),
                            'Aggiungi'
                        ])
                    ]),
                ]),
            ]),
            jd.tbody({
                // ref: tbody
                ref: (el) => {
                    effect(el, () => {
                        el.innerHTML = '';
                        el.append(...studentsList().map(student => StudentRow({ student })))
                    })
                }
            }, [
                jd.tr({}, [
                    jd.td({}, [
                        jd.lucide('Loader2', { className: 'animate-spin' })
                    ])
                ])
            ]),
            jd.tfoot({}, [
                jd.tr({}, [
                    jd.th({}),
                    jd.th({}, [" Nome"]),
                    jd.th({}, [" Corso"]),
                    jd.th({}, [" Assenze"]),
                    jd.th({}),
                ]),
            ]),
        ]),
    ]);

}