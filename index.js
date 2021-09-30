const PORT = 8000;
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const url = 'https://enter the url of the website to be scraped here';

axios(url)
    .then(response => {
        const articles = [];
        const html = response.data;  // Literally returns back all of the html of the url.
        const $ = cheerio.load(html); // Assigning cheerio.load to a variable for cherry picking of html elements.
        $('.item__title', html).each(function() { // <-- cannot be a function expression
            const title = $(this).text();
            // $(this).attr('href'); <-- You can either directly call it like this or follow the syntax below
            const url = $(this).find('a').attr('href');
            articles.push({
                title,
                url
            });
        })
        //console.log(html);
        console.log(articles);
    }).catch(err => console.log(err));

app.listen(PORT, () => console.log(`Basic Web Scraper Server running on PORT ${PORT}`));
