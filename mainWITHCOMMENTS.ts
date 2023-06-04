// import libraries
import {
  DOMParser,
  Element,
} from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import { download } from "https://deno.land/x/download/mod.ts";

// create and run a function
// see https://www.atatus.com/blog/introduction-to-async-await-in-typescript/
async function main() {
	// fetch the page at the URL and store in collectionPageResponse
  const collectionPageResponse = await fetch(
    "https://www.gov.uk/government/collections/ministers-transparency-publications",
  );
  // grab the text of collectionPageResponse and put in collectionPageHtml
  const collectionPageHtml = await collectionPageResponse.text();
  // create a new parser
  const parser = new DOMParser();
  // use that parser's parseFromString function to parse collectionPageHtml
  // store results in collectionPageDocument
  const collectionPageDocument = parser.parseFromString(
  	collectionPageHtml,
  	"text/html",
  	);
  // select elements with class="a.gem-c-document-list__item-title"
  const transparencyDataLinkElements = collectionPageDocument?.querySelectorAll(
   "a.gem-c-document-list__item-title",
 ) as Element[] | undefined;
// transparencyDataLinkElements is a list of elements
  // make a new directory called output
 await Deno.mkdir("./output");
 // loops through transparencyDataLinkElements
 for (const linkElement of transparencyDataLinkElements || []) {
   const url = linkElement.getAttribute("href"); // get each href= value and store in url
//fetch the doc at that url - adding http://gov.uk
   // store in transparencyDataPageResponse
   const transparencyDataPageResponse = await fetch(
     `https://www.gov.uk${url}`,
   );
   // extract the text of the page and store in transparencyDataPageHtml
   const transparencyDataPageHtml = await transparencyDataPageResponse
     .text();
     // parse transparencyDataPageHtml as HTML and store as transparencyDataPageDocument
   const transparencyDataPageDocument = parser.parseFromString(
     transparencyDataPageHtml,
     "text/html",
   );
// find all the a tags in transparencyDataPageDocument where the href value ends in .csv 
   const csvDownloadUrlElements = transparencyDataPageDocument
     ?.querySelectorAll(
       'a[href$=".csv"]',
     ) as Element[] | undefined;
//print out all matches of class="gem-c-title__text"
   console.log(
     transparencyDataPageDocument?.querySelector(".gem-c-title__text")
       ?.textContent,
   );
//loop through the CSV matches
   for (const csvDownloadUrlElement of csvDownloadUrlElements || []) {
     const csvDownloadUrl = csvDownloadUrlElement.getAttribute("href");
      if (csvDownloadUrl === null) { //if the link is empty: stop, otherwise continue
       continue;
     }
     // download from that URL into the output directory
     await download(csvDownloadUrl, {
       dir: "./output",
     });

   }

	}
}


main();