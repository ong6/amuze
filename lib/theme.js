import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const styles = {
	global: (props) => ({
		body: {
			bg: mode("#0C111F")(props),
		},
		html: {
			scrollBehavior: "smooth",
		},
	}),
};

const components = {
	Heading: {
		variants: {
			"section-title": {
				textDecoration: "underline",
				fontSize: 20,
				textUnderlineOffset: 6,
				textDecorationColor: "#525252",
				textDecorationThickness: 4,
				marginTop: 3,
				marginBottom: 4,
			},
		},
	},
	Link: {
		baseStyle: (props) => ({
			color: mode("#3d7aed", "#ff63c3")(props),
			textUnderlineOffset: 3,
		}),
	},
};

const fonts = {
	heading: "inter",
	body: "inter",
};

const colors = {
	lightPink: "#EDC7B7",
	lightGray: "#EEE2DC",
	darkGray: "#BAB2B5",
	darkBlue: "#123C69",
	hotPink: "#AC3B61",
};

const config = {
	initialColorMode: "dark",
	useSystemColorMode: true,
};

const theme = extendTheme({
	config,
	styles,
	components,
	fonts,
	colors,
});
export default theme;
