import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChart = ({ categoryTotals }) => {
  const colors = [
    "#34D399",
    "#60A5FA",
    "#FBBF24",
    "#F87171",
    "#A78BFA",
    "#F472B6",
    "#FCD34D",
    "#6EE7B7",
    "#3B82F6",
    "#EF4444",
  ];

  const labels = Object.keys(categoryTotals);
  const values = Object.values(categoryTotals);

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: labels.map((_, idx) => colors[idx % colors.length]),
        borderWidth: 2,
        borderColor: "#fff",
        hoverOffset: 15,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
      tooltip: {
        callbacks: {
          label: (context) => {
            const total = values.reduce((a, b) => a + b, 0);
            const percent = ((context.raw / total) * 100).toFixed(1);
            return `${context.label}: ₹${context.raw} (${percent}%)`;
          },
        },
      },
      datalabels: {
        color: "#fff",
        formatter: (value, ctx) => {
          const total = ctx.chart.data.datasets[0].data.reduce(
            (a, b) => a + b,
            0,
          );
          return ((value / total) * 100).toFixed(1) + "%";
        },
        font: { weight: "bold", size: 12 },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">
        Expenses by Category
      </h2>
      <div className="w-full h-80">
        {" "}
        {/* Set width & height */}
        <Pie data={data} options={options} plugins={[ChartDataLabels]} />
      </div>
    </div>
  );
};

export default PieChart;
