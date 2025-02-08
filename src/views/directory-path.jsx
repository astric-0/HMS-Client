import { useMemo } from "react";
import propTypes from "prop-types";
import { Breadcrumb } from "react-bootstrap";

function DirectoryPath({ children, path, setPath }) {
	const breadCrumbsInfo = useMemo(() => {
		const basePath = [];
		return path.map((name) => {
			basePath.push(name);
			return { name, basePath: [...basePath] };
		});
	}, [path]);

	return (
		<Breadcrumb>
			{children && <Breadcrumb.Item linkAs="div">{children}</Breadcrumb.Item>}
			{breadCrumbsInfo.map((breadcrumb) => (
				<Breadcrumb.Item
					linkAs="span"
					role="button"
          className="my-1"
					key={breadcrumb.name}
					onClick={() => setPath(breadcrumb.basePath)}
				>
					{breadcrumb.name}
				</Breadcrumb.Item>
			))}
		</Breadcrumb>
	);
}

DirectoryPath.propTypes = {
	rootDir: propTypes.string.isRequired,
	path: propTypes.array,
	setPath: propTypes.func,
	children: propTypes.node,
};

export default DirectoryPath;
