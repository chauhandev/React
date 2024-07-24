import React, { useState, useEffect, useRef } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  PointElement,
  BarElement,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  PointElement,
  BarElement,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const LoanVisualizer = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [timePeriod, setTimePeriod] = useState('');
  const [selectedYear, setSelectedYear] = useState(1);
  const [chartData, setChartData] = useState(null);
  const [years, setYears] = useState([]);
  const [fixedPayment, setFixedPayment] = useState(false);
  const [graphType, setGraphType] = useState('Bar');
  const [totalAmountPaid, setTotalAmountPaid] = useState(0);
  const [totalInterestPaid, setTotalInterestPaid] = useState(0);
  const [totalPrincipalPaid, setTotalPrincipalPaid] = useState(0);
  const [yearlyPrincipalPaid, setYearlyPrincipalPaid] = useState([]);

  let chartRef = useRef(null);

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const annualInterestRate = parseFloat(interestRate) / 100;
    const months = parseInt(timePeriod) * 12;
    const monthlyInterestRate = annualInterestRate / 12;

    let remainingPrincipal = principal;
    const monthlyData = [];
    let totalInterest = 0;
    let yearlyPrincipal = [];

    if (fixedPayment) {
      // Calculate fixed monthly payment
      const fixedMonthlyPayment =
        (principal * monthlyInterestRate) /
        (1 - Math.pow(1 + monthlyInterestRate, -months));

      for (let i = 0; i < months; i++) {
        const interestForMonth = remainingPrincipal * monthlyInterestRate;
        const principalForMonth = fixedMonthlyPayment - interestForMonth;
        remainingPrincipal -= principalForMonth;

        monthlyData.push({
          month: i + 1,
          principal: principalForMonth,
          interest: interestForMonth,
        });

        totalInterest += interestForMonth;

        const yearIndex = Math.floor(i / 12);
        if (!yearlyPrincipal[yearIndex]) yearlyPrincipal[yearIndex] = 0;
        yearlyPrincipal[yearIndex] += principalForMonth;
      }
    } else {
      for (let i = 0; i < months; i++) {
        const interestForMonth = remainingPrincipal * monthlyInterestRate;
        const principalForMonth = principal / months;
        remainingPrincipal -= principalForMonth;

        monthlyData.push({
          month: i + 1,
          principal: principalForMonth,
          interest: interestForMonth,
        });

        totalInterest += interestForMonth;

        const yearIndex = Math.floor(i / 12);
        if (!yearlyPrincipal[yearIndex]) yearlyPrincipal[yearIndex] = 0;
        yearlyPrincipal[yearIndex] += principalForMonth;
      }
    }

    const totalYears = Math.ceil(months / 12);
    const yearOptions = Array.from({ length: totalYears }, (_, i) => i + 1);
    setYears(yearOptions);
    setSelectedYear(1); // Reset to the first year when calculating

    setTotalAmountPaid(principal + totalInterest);
    setTotalInterestPaid(totalInterest);
    setTotalPrincipalPaid(principal);
    setYearlyPrincipalPaid(yearlyPrincipal);

    updateChartData(monthlyData, 1);
  };

  const updateChartData = (monthlyData, year) => {
    const startMonth = (year - 1) * 12;
    const endMonth = startMonth + 12;
    const yearData = monthlyData.slice(startMonth, endMonth);

    const labels = yearData.map((data) => `Month ${data.month}`);
    const principalData = yearData.map((data) => data.principal);
    const interestData = yearData.map((data) => data.interest);

    setChartData({
      labels,
      datasets: [
        {
          label: 'Principal',
          data: principalData,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
        {
          label: 'Interest',
          data: interestData,
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
        },
        {
          label: 'Total',
          data: interestData.map((val, idx) => val + principalData[idx]),
          backgroundColor: 'rgba(255, 144, 150, 0.6)',
        },
      ],
    });
  };

  const handleYearChange = (event) => {
    const year = parseInt(event.target.value);
    setSelectedYear(year);
    calculateLoanForYear(year);
  };

  const calculateLoanForYear = (year) => {
    const principal = parseFloat(loanAmount);
    const annualInterestRate = parseFloat(interestRate) / 100;
    const months = parseInt(timePeriod) * 12;
    const monthlyInterestRate = annualInterestRate / 12;

    let remainingPrincipal = principal;
    const monthlyData = [];

    if (fixedPayment) {
      const fixedMonthlyPayment =
        (principal * monthlyInterestRate) /
        (1 - Math.pow(1 + monthlyInterestRate, -months));

      for (let i = 0; i < months; i++) {
        const interestForMonth = remainingPrincipal * monthlyInterestRate;
        const principalForMonth = fixedMonthlyPayment - interestForMonth;
        remainingPrincipal -= principalForMonth;

        monthlyData.push({
          month: i + 1,
          principal: principalForMonth,
          interest: interestForMonth,
        });
      }
    } else {
      for (let i = 0; i < months; i++) {
        const interestForMonth = remainingPrincipal * monthlyInterestRate;
        const principalForMonth = principal / months;
        remainingPrincipal -= principalForMonth;

        monthlyData.push({
          month: i + 1,
          principal: principalForMonth,
          interest: interestForMonth,
        });
      }
    }

    updateChartData(monthlyData, year);
  };

  useEffect(() => {
    console.log('Mounting .....');

    return () => {
      console.log('UnMounting .....');

      if (chartRef.current) {
        chartRef = null;
      }
    };
  }, [graphType]);

  const renderChart = () => {
    console.log('creating graph.....');

    switch (graphType) {
      case 'Bar':
        return <Bar ref={chartRef} data={chartData} />;
      case 'Line':
        return <Line ref={chartRef} data={chartData} />;
      case 'Pie':
        return <Pie ref={chartRef} data={chartData} />;
      default:
        return null;
    }
  };

  const resetData = () => {
    setChartData(null);
    setTotalAmountPaid(0);
    setTotalInterestPaid(0);
    setTotalPrincipalPaid(0);
    setYearlyPrincipalPaid([]);
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Loan Visualizer</h1>
      {!chartData ? (
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <div className="mb-4">
            <label className="block text-gray-700">Loan Amount</label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="mt-1 block w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Interest Rate (%)</label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="mt-1 block w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Time Period (Years)</label>
            <input
              type="number"
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              className="mt-1 block w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              checked={fixedPayment}
              onChange={(e) => setFixedPayment(e.target.checked)}
              className="mr-2"
            />
            <label className="text-gray-700">Fixed Monthly Payment</label>
          </div>
          <button
            onClick={calculateLoan}
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Visualize Loan
          </button>
        </div>
      ) : (
        <div className="flex justify-between items-center mb-4 w-full max-w-md">
         
          {years.length > 0 && (
            <div className="flex items-center">
              {/* <label className="mr-4 text-gray-700">Select Year</label> */}
              <select
                value={selectedYear}
                onChange={handleYearChange}
                className="mt-1 block w-24 p-2 border rounded"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    Year {year}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="ml-4 flex items-center">
            {/* <label className="mr-4 text-gray-700">Graph Type:</label> */}
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="Bar"
                  checked={graphType === 'Bar'}
                  onChange={() => setGraphType('Bar')}
                  className="mr-2"
                />
                Bar
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="Line"
                  checked={graphType === 'Line'}
                  onChange={() => setGraphType('Line')}
                  className="mr-2"
                />
                Line
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="Pie"
                  checked={graphType === 'Pie'}
                  onChange={() => setGraphType('Pie')}
                  className="mr-2"
                />
                Pie
              </label>
            </div>
          </div>

          <button
            onClick={resetData}
            className="bg-blue-500 text-white py-2 rounded w-32"
          >
            Update Details
          </button>
        </div>
      )}

      {chartData && (
        <div className="mt-6 w-full max-w-4xl">{renderChart()}</div>
      )}

      {chartData && (
        <div className="mt-6 w-full max-w-4xl bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4">Loan Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-lg font-semibold">Total Amount Paid:</p>
              <p className="text-blue-500 text-xl font-bold">
                {totalAmountPaid.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-lg font-semibold">Total Interest Paid:</p>
              <p className="text-red-500 text-xl font-bold">
                {totalInterestPaid.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-lg font-semibold">Total Principal Paid:</p>
              <p className="text-green-500 text-xl font-bold">
                {totalPrincipalPaid.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanVisualizer;
