/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         for(let feed of allFeeds) {
            it('have an URL', function(){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
         };

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         for(let feed of allFeeds) {
            it('have a name', function(){
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
         };
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        let menu = document.getElementsByClassName('menu-hidden'); // look for the css class that hides the menu

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('is hidden by default', function() {

            expect(menu.length).not.toBe(0); // if the menu is hidden the class ".menu-hidden" should be present and therefore the HTML Collection "menu" should not be empty => length not 0
         });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('shows and hides on clicking the menu icon', function () {
              let menuIcon = document.querySelector('.menu-icon-link'); // get the HTML element that opens and closes the menu

              function hideShow() { // click on the menu and toggle the class ".menu-hidden"
                  menuIcon.click();
                  menu = document.getElementsByClassName('menu-hidden');
              };

              hideShow();

              expect(menu.length).toBe(0); // after one click the class ".menu-hidden" should not be present

              hideShow();

              expect(menu.length).not.toBe(0); // after another click the class ".menu-hidden" should be present again
          });
    });


    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        let i = 0;

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) { // load a new feed before each expectation
            loadFeed(i, function(){
                done();
            });
            i += 1;
        });

        for (let feed of allFeeds) { // loop through the feeds to check each
            it('are present', function(done) {
                let entries = document.querySelectorAll('.feed a'); // get the entries

                expect(entries.length).not.toBe(0); // check if there are entries
                done();
            });
        };
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        let i = 0;
        let entry;
        let entries = [];

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        beforeEach(function(done) { // load a new feed before each expectation
            loadFeed(i, function(){
                done();
            });
            entry = document.querySelector('h2').innerHTML; //get the title of the first entry
            entries.push(entry); // add to an arry
            i += 1;
        });

        for (let feed in allFeeds) { // loop through the feeds
            it('changes feed content', function(done) {
                expect(entries[feed]).not.toEqual(entries[feed - 1]); // compare the entry corresponding to the feed with the one before to check for a change
                done();
            });
        };
    });
}());
