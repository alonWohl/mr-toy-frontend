import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar, Line } from 'react-chartjs-2'
import { loadToys } from '../store/actions/toy.actions'
import { showErrorMsg } from '../services/event-bus.service'

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend)

export function Dashboard() {
	const chartsData = useSelector(storeState => storeState.toyModule.chartsData)

	useEffect(() => {
		loadToys().catch(() => {
			showErrorMsg('Cannot load toys!')
		})
	}, [])

	const priceChartOptions = {
		responsive: true,
		plugins: {
			legend: { position: 'top' },
			title: {
				display: true,
				text: 'Average Price by Label'
			}
		}
	}

	const inventoryChartOptions = {
		responsive: true,
		plugins: {
			legend: { position: 'top' },
			title: {
				display: true,
				text: 'Inventory Percentage by Label'
			}
		},
		scales: {
			y: {
				beginAtZero: true,
				max: 100,
				ticks: {
					callback: value => value + '%'
				}
			}
		}
	}

	const salesChartOptions = {
		responsive: true,
		plugins: {
			legend: { position: 'top' },
			title: {
				display: true,
				text: 'Monthly Sales Trend'
			}
		}
	}

	const priceChartData = {
		labels: chartsData?.pricesByLabel?.labels || [],
		datasets: [
			{
				label: 'Average Price ($)',
				data: chartsData?.pricesByLabel?.data || [],
				backgroundColor: 'rgba(53, 162, 235, 0.5)',
				borderColor: 'rgb(53, 162, 235)',
				borderWidth: 1
			}
		]
	}

	const inventoryChartData = {
		labels: chartsData?.inventoryByLabel?.labels || [],
		datasets: [
			{
				label: 'In Stock (%)',
				data: chartsData?.inventoryByLabel?.data || [],
				backgroundColor: 'rgba(75, 192, 192, 0.5)',
				borderColor: 'rgb(75, 192, 192)',
				borderWidth: 1
			}
		]
	}

	const salesChartData = {
		labels: chartsData?.monthlySales?.labels || [],
		datasets: [
			{
				label: 'Sales',
				data: chartsData?.monthlySales?.data || [],
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
				tension: 0.3
			}
		]
	}

	return (
		<section className="dashboard">
			<h1 className="text-2xl font-bold">Toy Store Analytics</h1>

			<div className="charts-container">
				<div className="chart-wrapper">
					<Bar options={priceChartOptions} data={priceChartData} />
				</div>

				<div className="chart-wrapper">
					<Bar options={inventoryChartOptions} data={inventoryChartData} />
				</div>

				<div className="chart-wrapper line-chart">
					<Line options={salesChartOptions} data={salesChartData} />
				</div>
			</div>
		</section>
	)
}
