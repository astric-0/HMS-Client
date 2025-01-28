import { Container, Alert } from "react-bootstrap";
import { useDownloadsDirectory } from "../api";
import DirectoryTable from "../views/DirectoryTable";

function DownloadsDirectory() {
	const { data, isLoading, error } = useDownloadsDirectory();
	const files = data?.files || [];

	return (
		<Container>
			<h3 className="my-3">Downloads Directory</h3>
			{error && (
				<Alert variant="danger">
					Error fetching directory contents: {error.message}
				</Alert>
			)}

			<DirectoryTable {...{ isLoading, files, error }} />
		</Container>
	);
}

export default DownloadsDirectory;
