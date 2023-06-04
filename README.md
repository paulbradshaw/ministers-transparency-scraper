# ministers-transparency-scraper

Files for a scraper that fetches CSV files using Deno and TypeScript. The scraper:

* Starts at https://www.gov.uk/government/collections/ministers-transparency-publications
* Grabs links to all the (relevant) pages linked from that
* Goes to each of those pages and grabs all the CSV links
* Downloads those CSV files to a folder called 'output'

You need to [install Deno](https://deno.com/manual@v1.33.4/getting_started/installation), e.g. using `brew install deno` in command line, and install packages in your text editor (e.g. [this is a guide for Sublime Text](https://johan.im/writings/sublime-text-deno/).

One story using these methods is [‘They are buying something’: the cash, gifts and arms cementing the Qatari-UK relationship](https://www.theguardian.com/world/2022/nov/17/they-are-buying-something-the-cash-gifts-and-arms-cementing-the-qatari-uk-relationship)

