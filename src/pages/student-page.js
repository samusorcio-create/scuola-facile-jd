import { createSignal, effect } from "@just-dom/signals";
import { jd } from "../jd.config";
import { StudentForm } from "../components/student-form";

export function StudentPage({ params }) {

    const [loading, setLoading] = createSignal(true)
    const [student, setStudent] = createSignal()

    fetch(`${"http://localhost:3000/studenti"}/studenti/${params.id}`)
        .then(async res => {
            if (!res.ok) {
                throw new Error("");
            }
            const student = await res.json();
            setStudent(student);
        })
        .catch()
        .finally(() => {
            setLoading(false);
        })

    return jd.div({
        className: 'flex flex-col gap-4 h-screen justify-center items-center'
    }, [
        jd.div({ className: 'card bg-base-200 shadow-sm w-96 text-center' }, [
            jd.div({
                className: 'card-body',
                ref: (el) => {
                    effect(el, () => {
                        if (loading()) {
                            el.replaceChildren(
                                jd.lucide('Loader2', { className: 'animate-spin mx-auto' })
                            )
                        } else if (student()) {
                            el.replaceChildren(
                                StudentCard({ student: student(), setStudent })
                            )
                        } else {
                            el.replaceChildren(
                                jd.p({}, ['Errore del server'])
                            )
                        }
                    })
                }
            })
        ])
    ])
}

function StudentCard({ student , setStudent }) {
    return jd.fragment([
        jd.div({ className: 'avatar mx-auto' }, [
            jd.div({
                className: 'ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2'
            }, [jd.img({ src: student.img })])
        ]),
        jd.p({ className: 'font-bold' }, [`${student.nome} ${student.cognome}`]),
        jd.p({ className: 'opacity-70' }, [student.email]),
        jd.progress({
            className: 'progress w-56 mx-auto',
            max: "100",
            value: student.percentuale_assenze,
        }),
        StudentForm({ 
            student,
            onSubmit: async (e) => {
                const formData = new FormData(e.target);
                const data = Object.fromEntries(formData);
                data.img = `https://api.dicebear.com/9.x/initials/svg?seed=${data.nome}-${data.cognome}`;
                console.log(data);

                await fetch(`${"http://localhost:3000/studenti"}/studenti/${student.id}`, {
                    method: 'PATCH',
                    body: JSON.stringify(data),
                    headers: {'Content-Type': 'application/json'},
                }).then(async res => {
                    const data = await res.json();
                    console.log(data);
                    setStudent(data);
                })
            }
        }),
    ])
}