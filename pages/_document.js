import NextDocument, { Html, Head, Main, NextScript } from "next/document";

export default class Document extends NextDocument {
	render() {
		return (
			<Html lang="en">
				<Head>
					<link
						href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=M+PLUS+Rounded+1c:wght@300;400;500;700;800&display=swap"
						rel="stylesheet"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
