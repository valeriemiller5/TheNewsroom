# news-scraper

This is an on-line app that allows users to look up articles from across the country scraped from the open-source news site, patch.com.

Once stories are populated by clicking the "Click Here for Articles" button in the nav bar,users may "like" stories by clicking the "Save as Favorite" attached to each article's card.

Users may then click the "Saved Favorites" button in the nav bar to look at the articles they have saved.  Users may then include a comment on the story or remove the story from their favorites.

## Getting Started
To visit my site, open the link https://valeriemiller5.github.io/Professional-Portfolio/. Navigation buttons have been added to the top left-hand side of the page.

## Prerequisites
Google Chrome is recommended for running this program.  If the user has pulled the app from the GitHub repository, please remember to `npm install` in the terminal before running the app.

## Challenges
Getting the comments to render in the modal proved to be an issue.  Though Handlebars can help to simplify getting information from a database, entering the code _exactly_ as it is required was tricky.  Similar issues were found trying to get the news articles to render on the webpage by clicking a button rather than uploading by default upon opening the app.

As was a challenge before with previous Handlebars projects, the styling format was strange. Some styling (i.e. webpage background, margins on Bootstrap elements) could be done with the 'style.css' file, however, font styles and colors had to be updated directly in the tag for the line that was being styled.

## Built With
* Express - Node package used to set up server (`npm i express`)
* Express-Handlebars - Node package used for html templates that create "shortcuts" to a database connected to the Express server (`npm i express-handlebars`)
* Mongoose - Node package used for easier setup of MongoDB database (`npm i mongoose`)
* Cheerio - Node package used to  parse information scrapped from a website, typically used along with Axios (`npm i cheerio`)
* Axios - Node package used, along with Cheerio, to scrape information from a database and save is as a JSON object for developer use (`npm i axios`)
* Morgan - Node package used to log activity between the front and back end of an app, displaying response codes so the developer knows where errors are or verify that the front end is connecting with the back end (`npm i morgan`) 
* Bootstrap - CSS library used for easier styling

## Authors
Valerie Flores - Initial work

## License
This project is licensed under the MIT License - see the LICENSE.md file for details

## Acknowledgments
Thank you to UCI Coding Bootcamp classmates for your help and suggestions, patch.com for clearly defining article for easy use, and the many examples of other coders online.