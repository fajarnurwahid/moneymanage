import { type ResultType } from "../../pages/Home";
import { formatCurrency } from "../../utils/format-currency";

type ResultInfoProps = {
    result: ResultType;
};

export default function ResultInfo({ result }: ResultInfoProps) {
    return (
        <div className="mt-8 divide-y divide-neutral-200 border border-neutral-200 rounded-lg overflow-x-auto">
            <div className="flex items-center justify-between">
                <p className="py-2 px-4 font-medium text-neutral-500 text-sm w-full">Pendapatan</p>
                <p className="py-2 px-4 text-sm w-full text-right">{formatCurrency(result.income)}</p>
            </div>
            <div className="flex items-center justify-between">
                <p className="py-2 px-4 font-medium text-neutral-500 text-sm w-full">Pengeluaran</p>
                <p className="py-2 px-4 text-sm w-full text-right">{formatCurrency(result.spend)}</p>
            </div>
            <div className="flex items-center justify-between">
                <p className="py-2 px-4 font-medium text-neutral-500 text-sm w-full">Target</p>
                <p className="py-2 px-4 text-sm w-full text-right">{formatCurrency(result.target)}</p>
            </div>
        </div>
    );
}
