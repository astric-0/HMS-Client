import { Table } from "react-bootstrap";
import PropTypes from "prop-types";

function DownloadsTable({ jobs, caption }) {
	return (
		<Table striped bordered hover responsive>
			<caption>{caption}</caption>
			<thead>
				<tr>
					<th className="w-75">Filename</th>
					<th className="w-25">Progress</th>
				</tr>
			</thead>
			<tbody>
				{jobs?.length ? (
					jobs?.map?.((download) => (
						<tr key={download.id}>
							<td>{download.data.filename}</td>
							<td>{download.progress}%</td>
						</tr>
					))
				) : (
					<tr>
						<td colSpan="4" className="text-center">
							No Jobs.
						</td>
					</tr>
				)}
			</tbody>
		</Table>
	);
}

DownloadsTable.propTypes = {
	jobs: PropTypes.array.isRequired,
	caption: PropTypes.string.isRequired,
};

export default DownloadsTable;
