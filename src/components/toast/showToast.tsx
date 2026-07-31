import toast from 'react-hot-toast';
import { CheckCircle2, XCircle } from 'lucide-react';

function showToast(type: 'success' | 'error', title: string, description: string) {
    toast.custom(
        () => (
            <div className="flex items-start gap-2.5 bg-white text-zinc-900 rounded-lg shadow-lg border border-zinc-200 px-3.5 py-3 max-w-[380px]">
                {type === 'success' ? (
                    <CheckCircle2 size={20} className="text-emerald-500 shrink-0 mt-0.5" />
                ) : (
                    <XCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
                )}
                <div className="flex flex-col">
                    <span className="text-[13px] font-bold leading-tight">{title}</span>
                    <span className="text-[11.5px] text-zinc-500 leading-snug mt-0.5">{description}</span>
                </div>
            </div>
        ),
        { duration: 4000 }
    );
}
export default showToast