import { createRef } from "just-dom";
import { jd } from "../jd.config";
import { createSignal, effect } from "@just-dom/signals";

export function DeleteDialog({ title, description, trigger, onDelete }) {

    const dialogRef = createRef();

    trigger.addEventListener('click', () => dialogRef.current.showModal());

    const [loading, setLoading] = createSignal(false);
    async function handleDelete() {
        setLoading(true);
        await onDelete();
        dialogRef.current.close();
        setLoading(false);
    }

    return jd.fragment([
        trigger,
        jd.dialog({ ref: dialogRef, className: "modal" }, [
            jd.div({ className: "modal-box" }, [
                jd.h3({ className: "text-lg font-bold" }, [title]),
                jd.p({ className: "py-4" }, [description]),
                jd.div({ className: "flex gap-2 justify-end" }, [
                    jd.button({
                        className: "btn",
                        onclick: () => dialogRef.current.close(),
                        ref: (el) => {
                            effect(el, () => {
                                el.disabled = loading();
                            })
                        }
                    }, [" Annulla"]),
                    jd.button({
                        className: "btn btn-error",
                        onclick: handleDelete,
                        ref: (el) => {
                            effect(el, () => {
                                el.disabled = loading();
                                el.replaceChildren(
                                    loading() ? jd.lucide('Loader2', { className: 'size-4 animate-spin' }) : jd.lucide('Trash2', { className: 'size-4' }),
                                    'Elimina'
                                )
                            })
                        }
                    }, []),
                ]),
            ]),
            jd.form({ method: "dialog", className: "modal-backdrop" }, [
                jd.button({
                    ref: (el) => {
                        effect(el, () => {
                            el.disabled = loading();
                            el.className = loading() ? 'cursor-default' : ''
                        })
                    }
                }, [" close"]),
            ]),
        ])
    ])
}