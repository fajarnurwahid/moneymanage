import { twMerge } from "tailwind-merge";

type TargetProgressProps = React.HTMLAttributes<HTMLDivElement> & {
    timeNeeded: number;
    neededPercentage: number;
};

export default function TargetProgress({ className, timeNeeded, neededPercentage }: TargetProgressProps) {
    return (
        <>
            <div className={twMerge("h-5 bg-neutral-100 rounded-full mb-2", className)}>
                <div
                    className="bg-blue-500 h-full relative rounded-full"
                    style={{
                        width: `${Math.max(Math.min(neededPercentage, 100), 0)}%`,
                    }}
                >
                    <span
                        className={twMerge(
                            "absolute right-0 -top-7 translate-x-1/2 text-xs h-5 px-1 rounded-md bg-blue-500 text-white font-semibold flex items-center justify-center text-center before:absolute before:border-4 before:border-transparent before:border-t-blue-500 before:top-full",
                            neededPercentage <= 0 && "bg-red-500 before:border-t-red-500"
                        )}
                    >
                        {neededPercentage.toFixed(1)}%
                    </span>
                </div>
            </div>
            <p className="text-sm text-neutral-500 text-center">
                Anda akan mencapai target dalam <span className="font-semibold">{timeNeeded} bulan</span>.
            </p>
        </>
    );
}
