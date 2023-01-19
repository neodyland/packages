const { writeFile } = require("node:fs/promises");

fetch("https://data.iana.org/TLD/tlds-alpha-by-domain.txt")
	.then((res) => res.text())
	.then((text) => {
		const tlds = text.split("\n");
		const tldsSet = new Set(tlds);
		const tldlist = Array.from(tldsSet)
			.filter((tld) => !tld.includes(" ") && tld.length > 1)
			.map((tld) => tld.toLocaleLowerCase());
		return writeFile(
			"src/tld.ts",
			`export const tld = ${JSON.stringify(tldlist)};`
		);
	});
