import { useState } from "react";
import Container from "../components/Container";
import IncomeSpendChart from "../components/home/IncomeSpendChart";
import TargetProgress from "../components/home/TargetProgress";
import { formatCurrency } from "../utils/format-currency";
import ResultInfo from "../components/home/ResultInfo";
import { twMerge } from "tailwind-merge";

export type ResultType = {
    rest: number;
    spendPercentage: number;
    timeNeeded: number;
    neededPercentage: number;
    income: number;
    spend: number;
    target: number;
};

const RESULT = {
    rest: 0,
    spendPercentage: 0,
    timeNeeded: 0,
    neededPercentage: 0,
    income: 0,
    spend: 0,
    target: 0,
};

export default function Home() {
    const [result, setResult] = useState<ResultType>(RESULT);
    const [isShowResult, setIsShowResult] = useState(false);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const income = Number(formData.get("income"));
        const spend = Number(formData.get("spend"));
        const target = Number(formData.get("target"));
        const rest = income - spend;
        const spendPercentage = (spend / income) * 100;
        const timeNeeded = Math.ceil(target / rest);
        const neededPercentage = (rest / target) * 100;
        setResult({
            rest,
            spendPercentage,
            timeNeeded,
            neededPercentage,
            income,
            spend,
            target,
        });
        setIsShowResult(true);
    }

    return (
        <section className="py-12 min-h-[calc(100vh-64px-58px)]">
            <Container>
                {isShowResult ? (
                    <div className="bg-white rounded-lg p-4 sm:p-8 border border-neutral-200 max-w-lg mx-auto">
                        <p className="text-center text-xl font-medium mb-8 leading-tight">Hasil Untuk Pengelolaan Uang Anda</p>
                        <div className="mb-8">
                            <p className="text-sm text-neutral-500 font-medium text-center mb-1">Sisa uang bulanan Anda:</p>
                            <p className={twMerge("text-center text-2xl font-bold text-blue-500", result.rest <= 0 && "text-red-500")}>
                                {formatCurrency(result.rest)}
                            </p>
                        </div>
                        <IncomeSpendChart spend={result.spendPercentage} className="mb-12" />
                        <TargetProgress timeNeeded={result.timeNeeded} neededPercentage={result.neededPercentage} />
                        <ResultInfo result={result} />
                        <div className="text-center mt-8">
                            <button type="button" onClick={() => setIsShowResult(false)} className="btn btn-primary">
                                Hitung Lagi
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-2 leading-tight">Kalkulator Pengelolaan Keuangan</h1>
                        <p className="text-neutral-500 text-center mb-8">Hitung pengelolaan uangmu cepat, simple, dan gratis!</p>
                        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
                            <div>
                                <label htmlFor="income" className="form-label">
                                    Pendapatan Bulanan (Rupiah)
                                </label>
                                <input
                                    type="number"
                                    id="income"
                                    name="income"
                                    className="form-control w-full"
                                    defaultValue={result.income ? result.income : ""}
                                    required
                                    autoFocus
                                />
                            </div>
                            <div>
                                <label htmlFor="spend" className="form-label">
                                    Pengeluaran Bulanan (Rupiah)
                                </label>
                                <input
                                    type="number"
                                    id="spend"
                                    name="spend"
                                    className="form-control w-full"
                                    defaultValue={result.spend ? result.spend : ""}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="target" className="form-label">
                                    Target Keuangan (Rupiah)
                                </label>
                                <input
                                    type="number"
                                    id="target"
                                    name="target"
                                    className="form-control w-full"
                                    defaultValue={result.target ? result.target : ""}
                                    required
                                />
                            </div>
                            <div className="sm:flex sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
                                <button type="submit" className="btn btn-primary w-full">
                                    Cek Hasil
                                </button>
                                <button type="reset" onClick={() => setResult(RESULT)} className="btn btn-light w-full sm:w-auto">
                                    Reset
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </Container>
        </section>
    );
}
