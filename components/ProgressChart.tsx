import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { useStore } from '@/utils/store';
import { formatDate } from '@/utils/helpers';

interface ProgressChartProps {
  goalId: string;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ goalId }) => {
  const [chartData, setChartData] = useState<{ labels: string[]; datasets: any[] }>({
    labels: [],
    datasets: [],
  });
  const { goals } = useStore();
  const goal = goals.find((g) => g.goalId === goalId);

  useEffect(() => {
    if (goal) {
      const progressData = goal.progress.map((p) => ({
        date: formatDate(p.date),
        value: p.metrics[goal.type],
      }));

      const labels = progressData.map((d) => d.date);
      const datasets = [
        {
          label: goal.name,
          data: progressData.map((d) => d.value),
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
        },
      ];

      setChartData({ labels, datasets });
    }
  }, [goal]);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="mt-4">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ProgressChart;