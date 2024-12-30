import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

type IncomeSpendChartProps = React.HTMLAttributes<HTMLDivElement> & {
    spend: number;
};

export default function IncomeSpendChart({ className, spend }: IncomeSpendChartProps) {
    const canvasRef = useRef(null);
    const chartRef = useRef<any>(null);

    useEffect(() => {
        if (canvasRef.current) {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
            chartRef.current = new Chart(canvasRef.current, {
                type: "pie",
                data: {
                    labels: ["Pendapatan", "Pengeluaran"],
                    datasets: [
                        {
                            data: [100 - spend, spend],
                            backgroundColor: ["rgb(54, 162, 235)", "rgb(255, 99, 132)"],
                            hoverOffset: 4,
                        },
                    ],
                },
                options: {
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function (ctx) {
                                    return `${ctx.formattedValue}%`;
                                },
                            },
                        },
                    },
                },
            });
        }
    }, [canvasRef.current]);

    return (
        <div className={twMerge("h-64", className)}>
            <canvas ref={canvasRef} className="mx-auto"></canvas>
        </div>
    );
}
