import { useCallback, useState } from "react";
import { Container, Alert } from "react-bootstrap";
import { MEDIA_TYPES } from "../constants";
import { useDirectoryInfo } from "../api";
import DirectoryTable from "../views/directory-table";
import StorageInfo from "../views/storage-info";
import ChooseDirectoryDropdown from "../views/choose-directory-dropdown";

function Directory() {
	const [rootDir, setRootDir] = useState(MEDIA_TYPES.SERIES);
	const [path, setPath] = useState([]);

	const { data, isLoading, error } = useDirectoryInfo(rootDir, path);
	const files = data?.files || [];

	const handleChooseRootDir = useCallback((rootDir) => {
		setPath([]);
		setRootDir(rootDir);
	}, []);

	const handleOpenDir = useCallback((directoryName) => {
		setPath((curr) => [...curr, directoryName]);
	}, []);

	return (
		<Container>
			<h3 className="my-3">Directory</h3>
			<ChooseDirectoryDropdown {...{ handleChooseRootDir, rootDir }} />
			{error && (
				<Alert variant="danger">
					Error fetching directory contents: {error.message}
				</Alert>
			)}
			{!error && !isLoading && (
				<>
					<StorageInfo info={data.storageInfo} />
					<DirectoryTable
						{...{ isLoading, files, error, rootDir, handleOpenDir }}
					/>
				</>
			)}
		</Container>
	);
}

export default Directory;
