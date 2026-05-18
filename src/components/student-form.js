import { createSignal, effect } from "@just-dom/signals";
import { jd } from "../jd.config";

export function StudentForm({ student, onSubmit } = {}) {

    const [loading, setLoading] = createSignal(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (onSubmit && typeof onSubmit === 'function') {
            setLoading(true);
            await onSubmit(e);
            setLoading(false);
        }
    }

    return jd.form({ className: 'space-y-4 mt-6', onsubmit: handleSubmit }, [
        // INPUT - NOME
        jd.div({}, [
            jd.label({ className: 'input validator w-full' }, [
                jd.lucide('User2', { className: 'size-4' }),
                jd.input({
                    name: 'nome',
                    type: 'text',
                    required: "true",
                    placeholder: 'Nome',
                    minLength: '3',
                    value: student?.nome || '',
                }),
            ]),
            jd.p({ className: 'validator-hint hidden'}, ["Il nome deve avere almeno 3 caratteri"]),
        ]),
        // INPUT - COGNOME
        jd.div({}, [
            jd.label({ className: 'input validator w-full' }, [
                jd.lucide('User2', { className: 'size-4' }),
                jd.input({
                    name: 'cognome',
                    type: 'text',
                    required: "true",
                    placeholder: 'Cognome',
                    minLength: '3',
                    value: student?.cognome || '',
                }),
            ]),
            jd.p({ className: 'validator-hint hidden' }, ["Il cognome deve avere almeno 3 caratteri"]),
        ]),
        // INPUT - CORSO
        jd.div({}, [
            jd.label({ className: 'input validator w-full' }, [
                jd.lucide('GraduationCap', { className: 'size-4' }),
                jd.input({
                    name: 'corso',
                    type: 'text',
                    required: "true",
                    placeholder: 'Corso',
                    value: student?.corso || '',
                }),
            ]),
            jd.p({ className: 'validator-hint hidden' }, ["Il corso è un campo obbligatorio"]),
        ]),
        // INPUT - EMAIL
        jd.div({}, [
            jd.label({ className: 'input validator w-full' }, [
                jd.lucide('AtSign', { className: 'size-4' }),
                jd.input({
                    name: 'email',
                    type: 'email',
                    required: "true",
                    placeholder: 'Email',
                    value: student?.email || '',
                }),
            ]),
            jd.p({ className: 'validator-hint hidden' }, ["Inserisci una email valida"]),
        ]),
        // INPUT - PASSWORD
        jd.div({}, [
            jd.label({ className: 'input validator w-full' }, [
                jd.lucide('Key', { className: 'size-4' }),
                jd.input({
                    name: 'password',
                    type: 'password',
                    required: "true",
                    placeholder: 'Password',
                    minLength: '8',
                    value: student?.password || '',
                }),
            ]),
            jd.p({ className: 'validator-hint hidden' }, ["La password deve contenere almeno 8 caratteri"]),
        ]),
        jd.button({
            className: 'btn btn-primary',
            ref: (el) => {
                effect(el, () => {
                    el.replaceChildren(
                        jd.lucide(
                            loading() ? 'Loader2' : 'Save',
                            { className: loading() ? 'size-4 animate-spin' : 'size-4' }
                        ),
                        'Salva'
                    )
                })
            }
        })
    ])
}