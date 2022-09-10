module.exports = {
	globDirectory: 'build/',
	globPatterns: [
		'**/*.{json,ico,html,png,txt,css,js}'
	],
	// ignoreURLParametersMatching: [
		// 	/^utm_/,
		// 	/^fbclid$/
		// ],
	swDest: 'build/sw.js',
	swSrc: 'src/sw-template.js' // workbox generateSW no funciona con esta propiedad
};