import { Container, Table, Spinner, Alert } from "react-bootstrap";
import { FILE_ICONS } from "../constants";
import { useDownloadsDirectory } from "../api";
import { useCallback } from "react";

function DownloadsDirectory() {
	const { data, isLoading, error } = useDownloadsDirectory();

	const files = data?.files || [];

	const getIcon = useCallback((file) => {
		if (file.isDir) {
			return "bi-folder-fill";
		}
		const ext = file.extension
			? file.extension.toLowerCase().substring(1)
			: "default";
		return FILE_ICONS[ext] || FILE_ICONS["default"];
	}, []);

	const formatFileSize = useCallback((bytes) => {
		if (bytes === 0) return "0 Bytes";
		const k = 1024;
		const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
	}, []);

	return (
		<Container>
			<h3 className="my-3">Downloads Directory</h3>
			{error && (
				<Alert variant="danger">
					Error fetching directory contents: {error.message}
				</Alert>
			)}
			{isLoading ? (
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Loading directory contents...</span>
				</Spinner>
			) : (
				<Table striped bordered hover responsive>
					<thead>
						<tr>
							<th>Name</th>
							<th>Size</th>
							<th>Type</th>
						</tr>
					</thead>
					<tbody>
						{files.map((file) => (
							<tr key={file.path}>
								<td>
									<i className={`bi ${getIcon(file)} me-2`}></i>
									{file.name}
								</td>
								<td>{formatFileSize(file.size)}</td>
								<td>
									{file.isDir
										? "Directory"
										: file.extension?.substring(1).toUpperCase() || "File"}
								</td>
							</tr>
						))}
						{files.length === 0 && !isLoading && !error && (
							<tr>
								<td colSpan="3" className="text-center">
									Directory is empty.
								</td>
							</tr>
						)}
					</tbody>
				</Table>
			)}
		</Container>
	);
}

export default DownloadsDirectory;
