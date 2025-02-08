import { useCallback, useState } from "react";
import { Container, Alert } from "react-bootstrap";
import { MEDIA_TYPES } from "../constants";
import { useDirectoryInfo } from "../api";
import DirectoryTable from "../views/directory-table";
//import StorageInfo from "../views/storage-info";
import ChooseDirectoryDropdown from "../views/choose-directory-dropdown";
import DirectoryPath from "../views/directory-path";

function Directory() {
	const [rootDir, setRootDir] = useState(MEDIA_TYPES.SERIES);
	const [path, setPath] = useState([]);

	const { data, isLoading, error } = useDirectoryInfo(rootDir, path);
	const files = data?.files || [];

	const handleChooseRootDir = useCallback((dir) => {
		setPath([]);
		setRootDir(dir);
	}, []);

	const handleOpenDir = useCallback((directoryName) => {
		setPath((curr) => [...curr, directoryName]);
	}, []);

	return (
		<Container>
			<h3 className="my-3">Directory</h3>
			<DirectoryPath {...{ rootDir, path, setPath }}>
				<ChooseDirectoryDropdown {...{ handleChooseRootDir, rootDir }} />
			</DirectoryPath>
			{error && (
				<Alert variant="danger">
					Error fetching directory contents: {error.message}
				</Alert>
			)}
			{!error && !isLoading && (
				<>
					<DirectoryTable
						{...{ isLoading, files, error, rootDir, path, handleOpenDir }}
					/>
				</>
			)}
		</Container>
	);
}

export default Directory;
