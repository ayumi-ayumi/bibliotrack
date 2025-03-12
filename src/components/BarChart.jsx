import { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useBooks } from '../contexts/BookContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function onChartResize(chart) {
  if (window.innerWidth < 640) {
    chart.canvas.style.height = '180px';
    chart.canvas.style.width = '360px';
  }
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  onResize: onChartResize,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'The Number of Books I Read',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
      },
    },
  },
};

const months = [
  { idx: 0, month: 'January' },
  { idx: 1, month: 'February' },
  { idx: 2, month: 'March' },
  { idx: 3, month: 'April' },
  { idx: 4, month: 'May' },
  { idx: 5, month: 'June' },
  { idx: 6, month: 'July' },
  { idx: 7, month: 'August' },
  { idx: 8, month: 'September' },
  { idx: 9, month: 'October' },
  { idx: 10, month: 'November' },
  { idx: 11, month: 'December' },
];

function getBooksMonthlyObj(books) {
  const readBooks = books.filter((book) => book.status === 'Have Read');

  const booksMonthly = {};
  readBooks.forEach((book) => {
    const month = new Date(book.date).getMonth();
    booksMonthly[month] = (booksMonthly[month] || 0) + 1;
  });
  return booksMonthly;
}

function getCurrentSixMonths() {
  const currentMonth = new Date().getMonth();
  let sixMonths;
  if (currentMonth > 5) {
    sixMonths = months.slice(currentMonth - 5, currentMonth + 1);
  } else {
    const firstPartMonths = months.slice(currentMonth + 1 - 6);
    const lastPartMonths = months.slice(0, currentMonth + 1);
    sixMonths = [...firstPartMonths, ...lastPartMonths];
  }
  return sixMonths;
}

export default function BarChart() {
  const books = useBooks();

  const booksReadMonthly = useMemo(() => getBooksMonthlyObj(books), [books]);
  const lastSixMonths = useMemo(() => getCurrentSixMonths(), []);

  const numberOfBooksMonthly = lastSixMonths.map(
    (month) => booksReadMonthly[month.idx] || 0,
  );

  const data = {
    labels: lastSixMonths.map((month) => month.month),
    datasets: [
      {
        data: numberOfBooksMonthly,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <Bar
      options={options}
      data={data}
      width={'600'}
      height={'300'}
      style={{ margin: '0 auto' }}
    />
  );
}
