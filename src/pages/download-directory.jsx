import { Container, Alert } from "react-bootstrap";
import { useDownloadsDirectory } from "../api";
import DirectoryTable from "../views/directory-table";
import StorageInfo from "../views/storage-info";

function DownloadsDirectory() {
	const { data, isLoading, error } = useDownloadsDirectory();
	const files = data?.files || [];

	console.log(data);

	return (
		<Container>
			<h3 className="my-3">Downloads Directory</h3>
			{error && (
				<Alert variant="danger">
					Error fetching directory contents: {error.message}
				</Alert>
			)}
			{!error && !isLoading && (
				<>
					<StorageInfo info={data.storageInfo} />
					<DirectoryTable {...{ isLoading, files, error }} />
				</>
			)}
		</Container>
	);
}

export default DownloadsDirectory;
