export const MEDIA_TYPES = Object.freeze({
	MOVIES: "movie",
	SERIES: "series",
	MOVIE_SERIES: "movie_series",
	DOWNLOADS: "default_downloads",
});

export const FILE_ICONS = {
	default: "bi-file-earmark",
	zip: "bi-file-zip-fill",
	rar: "bi-file-zip-fill",
	"7z": "bi-file-zip-fill",
	mkv: "bi-film",
	mp4: "bi-film",
	avi: "bi-film",
	mov: "bi-film",
	wmv: "bi-film",
	flv: "bi-film",
	webm: "bi-film",
	mpg: "bi-film",
	mpeg: "bi-film",
	ts: "bi-film",
	m3u8: "bi-film",
	vob: "bi-film",
	iso: "bi-disc",
	img: "bi-disc",
	folder: "bi-folder-fill", // Already used in component, but good to have here too
	txt: "bi-file-text",
	log: "bi-file-text",
	pdf: "bi-file-pdf",
	doc: "bi-file-word",
	docx: "bi-file-word",
	xls: "bi-file-excel",
	xlsx: "bi-file-excel",
	ppt: "bi-file-ppt",
	pptx: "bi-file-ppt",
	exe: "bi-file-earmark-binary",
	dll: "bi-file-earmark-binary",
	apk: "bi-android2",
	jpg: "bi-file-image",
	jpeg: "bi-file-image",
	png: "bi-file-image",
	gif: "bi-file-image",
	bmp: "bi-file-image",
	svg: "bi-file-image",
	psd: "bi-file-image",
	ai: "bi-file-image",
	" Audacity": "bi-file-earmark-music",
	mp3: "bi-file-earmark-music",
	wav: "bi-file-earmark-music",
	flac: "bi-file-earmark-music",
	aac: "bi-file-earmark-music",
	ogg: "bi-file-earmark-music",
	wma: "bi-file-earmark-music",
	m4a: "bi-file-earmark-music",
	json: "bi-file-code",
	js: "bi-file-code",
	css: "bi-file-code",
	html: "bi-file-code",
	php: "bi-file-code",
	py: "bi-file-code",
	java: "bi-file-code",
	cpp: "bi-file-code",
	c: "bi-file-code",
	sh: "bi-terminal",
	bat: "bi-terminal",
	conf: "bi-gear-fill",
	ini: "bi-gear-fill",
	cfg: "bi-gear-fill",
};

export const getFileIcon = (file) => {
	if (file.isDir) {
		return "bi-folder-fill";
	}
	const ext = file.extension
		? file.extension.toLowerCase().substring(1)
		: "default";
	return FILE_ICONS[ext] || FILE_ICONS["default"];
};
