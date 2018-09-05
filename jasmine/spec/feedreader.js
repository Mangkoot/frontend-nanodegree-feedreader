
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', () => {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('has URL', () => {
                for (i in allFeeds) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe('');
            }
         });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('has name', () => {
                for (i in allFeeds) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe('');
            }
        });
    });


      /* A new test suite named "The menu" */
    describe('The menu', () => {
        /* A test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         //Got on track here:https://github.com/velesin/jasmine-jquery/pull/238/files
         it('menu element is hidden', () => {
                expect($('body').hasClass('menu-hidden')).toBe(true);
         });
   
         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('menu element changes visibility when clicked', () => {
                //Click to open the menu
                $('.menu-icon-link').click();
                expect($('body').hasClass('menu-hidden')).toEqual(false);
                //Click to hide the menu
                $('.menu-icon-link').click();
                expect($('body').hasClass('menu-hidden')).toEqual(true);
          });
     });
    /* A test suite named "Initial Entries" */
    describe('Initial Entries', () => {
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         beforeEach(function(done) {
          loadFeed(0, () => {
            done();
          });
        });

         it('check if feed has at least one entry', () => {
            const feed = $('.feed .entry');
            expect(feed.length).not.toBe(0);
         });
    });
    /* A test suite named "New Feed Selection" */
    describe('New Feed Selection', () => {


        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
         let feedOne, feedTwo;

         beforeEach(function(done) {
            loadFeed(0, () => {
              feedOne = $('.feed').html();
              loadFeed(1, () => {
                done();
              });
          });
        });
         it('content changes when feed is loaded', (done) => {
            feedTwo = $('.feed').html();
            expect(feedOne).not.toBe(feedTwo);
            done();
         });
    });
}());
