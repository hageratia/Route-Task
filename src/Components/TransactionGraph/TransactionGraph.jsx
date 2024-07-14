import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./TransactionGraph.css";

const TransactionGraph = ({ data }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    console.log("TransactionGraph data:", data);
    if (data.length === 0) return; // Ensure data is not empty

    const ctx = canvasRef.current.getContext("2d");
    const chartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map((transaction) => transaction.date),
        datasets: [
          {
            label: "Transactions",
            data: data.map((transaction) => transaction.amount),
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, [data]);

  return (
    <div className="chart-container">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default TransactionGraph;
