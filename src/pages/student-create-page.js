import {navigate} from "@just-dom//router";
import {StudentForm} from "../components/student-form";
import {jd} from "../jd.config";

export function studentCreatePage()  {
    return jd.div({ className: 'flex flex-col gap-4 h-screen justify-center items-center' }, [
        jd.div({ className: 'card bg-base-200 shadow-sm w-96 text-center' }, [
            jd.div({ className: 'card-body' },[
                StudentForm({onSubmit:async (e) => {
                    const fromData = new FormData(e.target);
                    const data = Object.fromEntries(fromData);
                    data.percentuale_essenze = 0;
                    data.img = `https://api.dicebear.com/9.x/initials/svg?seed=${data.nome}-${data.cognome}`;

                    await fetch(`${import.meta.env.Vite_api_url}/studenti`,{
                        method: "POST",
                        body: JSON.stringify(data),
                        headers: {"Content-Type": "application/json"},
                    }).then(async res => {
                        const data = await res.json();
                        navigate(`/studenti/${data.id}`,{replace:true});
                    }) 
                }})
                // jd.button({
                //     className: 'btn btn-primary',
                //     ref: (el) => {
                //         effect(el, () => {
                //             el.replaceChildren(
                //                 jd.lucide(
                //                     loading() ? 'Loader2' : 'Save',
                //                     { className: loading() ? 'size-4 animate-spin' : 'size-4' }
                //                 ),
                //                 'Salva'
                //             )
                //         })
                //     }
                // }, ['Salva'])
            ])
        ])
    ])
}