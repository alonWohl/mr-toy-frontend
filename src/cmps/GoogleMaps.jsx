import { useState } from 'react'
import GoogleMapReact from 'google-map-react'

const MarkerComponent = ({ text }) => <div className="marker">{text}</div>

export function GoogleMaps() {
	const [coordinates, setCoordinates] = useState({
		lat: 32.08987,
		lng: 34.880451
	})
	const [zoom, setZoom] = useState(11)

	const branches = [
		{ id: 1, lat: 32.0887895, lng: 34.8617988, name: 'Branch 1' },
		{ id: 2, lat: 32.08987, lng: 34.880451, name: 'Branch 2' }
	]

	function focusOnBranch(branch) {
		setCoordinates({ lat: branch.lat, lng: branch.lng })
		setZoom(15)
	}

	return (
		<div className="map-container">
			<div className="button-container">
				{branches.map(branch => (
					<button key={branch.id} onClick={() => focusOnBranch(branch)} className="focus-button">
						{branch.name}
					</button>
				))}
			</div>

			<div style={{ height: '40vh', width: '100%' }} className="map-wrapper">
				<GoogleMapReact bootstrapURLKeys={{ key: 'AIzaSyA5YAKbctMWmj2etXv-KY7MSXDMGaWr0qs' }} center={coordinates} zoom={zoom}>
					{branches.map(branch => (
						<MarkerComponent key={branch.id} lat={branch.lat} lng={branch.lng} text="🛍️" />
					))}
				</GoogleMapReact>
			</div>
		</div>
	)
}
