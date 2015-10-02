
var Smile = (function() {

    // PRIVATE VARIABLES
        
    // The backend we'll use for Part 2. For Part 3, you'll replace this 
    // with your backend.
    var apiUrl = 'http://localhost:3000'; 

    // FINISH ME (Task 4): You can use the default smile space, but this means
    //            that your new smiles will be merged with everybody else's
    //            which can get confusing. Change this to a name that 
    //            is unlikely to be used by others. 
    var smileSpace = 'yoloswag'; // The smile space to use. 


    var smiles; // smiles container, value set in the "start" method below
    var smileTemplateHtml; // a template for creating smiles. Read from index.html
                           // in the "start" method
    var create; // create form, value set in the "start" method below


    // PRIVATE METHODS
      
   /**
    * HTTP GET request 
    * @param  {string}   url       URL path, e.g. "/api/smiles"
    * @param  {function} onSuccess   callback method to execute upon request success (200 status)
    * @param  {function} onFailure   callback method to execute upon request failure (non-200 status)
    * @return {None}
    */
   var makeGetRequest = function(url, onSuccess, onFailure) {
       $.ajax({
           type: 'GET',
           url: apiUrl + url,
           dataType: "json",
           success: onSuccess,
           error: onFailure
       });
   };

    /**
     * HTTP POST request
     * @param  {string}   url       URL path, e.g. "/api/smiles"
     * @param  {Object}   data      JSON data to send in request body
     * @param  {function} onSuccess   callback method to execute upon request success (200 status)
     * @param  {function} onFailure   callback method to execute upon request failure (non-200 status)
     * @return {None}
     */
    var makePostRequest = function(url, data, onSuccess, onFailure) {
        $.ajax({
            type: 'POST',
            url: apiUrl + url,
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json",
            success: onSuccess,
            error: onFailure
        });
    };
        
    /**
     * Insert smile into smiles container in UI
     * @param  {Object}  smile       smile JSON
     * @param  {boolean} beginning   if true, insert smile at the beginning of the list of smiles
     * @return {None}
     */
    var insertSmile = function(smile, beginning) {
        // Start with the template, make a new DOM element using jQuery
        var newElem = $(smileTemplateHtml);
        // Populate the data in the new element
        // Set the "id" attribute 
        newElem.attr('id', smile.id); 
        // Now fill in the data that we retrieved from the server
        newElem.find('.title').text(smile.title);
        // FINISH ME (Task 2): fill-in the rest of the data
        newElem.find('.story').text(smile.story);
        newElem.find('.count').text(smile.like_count);
        newElem.find('.created_at').text('Posted at '.concat((new Date(smile.created_at*1000))));
        newElem.find(".happiness-level-1").attr("class", "happiness-level-".concat(smile.happiness_level));
        // console.log(smile);
        if (beginning) {
            smiles.prepend(newElem);
        } else {
            smiles.append(newElem);
        }
    };
    
    /**
     * Get recent smiles from API and display 10 most recent smiles
     * @return {None}
     */
    var displaySmiles = function() {
        // Prepare the AJAX handlers for success and failure
        var onSuccess = function(data) {
            /* FINISH ME (Task 2): display smiles with most recent smiles at the beginning */
            if (data.smiles.length < 1){
                console.error("no smiles");
            } else {
                for (i = 0; i < data.smiles.length; i++) {
                    insertSmile(data.smiles[i], i == 0);
                    console.log(smiles[i]);
                }
            }
        };
        var onFailure = function() { 
            console.error('display smiles failed'); 
        };
        /* FINISH ME (Task 2): make a GET request to get recent smiles */
        makeGetRequest('/api/smiles?space=yoloswag&count=10&order_by=created_at', onSuccess, onFailure);
    };

    /**
     * Add event handlers for clicking like.
     * @return {None}
     */
    var attachLikeHandler = function(e) {
        // Attach this handler to the 'click' action for elements with class 'like'
        smiles.on('click', '.like', function(e) {
            // FINISH ME (Task 3): get the id of the smile clicked on to use in the POST request
            var smileId = e.toElement.parentElement.parentElement.parentElement['id'];
            // Prepare the AJAX handlers for success and failure
            var onSuccess = function(data) {
                /* FINISH ME (Task 3): update the like count in the UI */
                // e.toElement.parentElement.parentElement.count.text(data.smile.like_count);
                $(e.target).parent().parent().children('div.count').text(data.smile.like_count);
            };
            var onFailure = function() { 
                console.error('like smile error'); 
            };
            /* FINISH ME (Task 3): make a POST request to like this smile */
            makePostRequest('/api/smiles/'.concat(smileId, '/like'), null, onSuccess, onFailure);
        });
    };


    /**
     * Add event handlers for submitting the create form.
     * @return {None}
     */
    var attachCreateHandler = function(e) {
        // First, hide the form, initially 
        create.find('form').hide();

        // FINISH ME (Task 4): add a handler to the 'Share a smile...' button to
        //                     show the 'form' and hide to button
        create.on('click', '.my-button', function (e) {
            e.preventDefault (); // Tell the browser to skip its default click action
            // console.log(e);
            create.find('form').show();
            create.find('a.my-button').hide();
            var smile = {}; // Prepare the smile object to send to the server
            smile.title = create.find('.title-input').val();
            // FINISH ME (Task 4): collect the rest of the data for the smile
            var onSuccess = function(data) {
                // FINISH ME (Task 4): insert smile at the beginning of the smiles container
            };
            var onFailure = function() { 
                console.error('create smile failed'); 
            };
            
            // FINISH ME (Task 4): make a POST request to create the smile, then 
            //            hide the form and show the 'Shared a smile...' button
        });

        create.on('click', '.cancel-post', function (e) {
            e.preventDefault (); // Tell the browser to skip its default click action
            // console.log(e);
            create.find('form').hide();
            create.find('a.my-button').show();

            // create.find('a.my-button').hide();
            var smile = {}; // Prepare the smile object to send to the server
            smile.title = create.find('.title-input').val();
            // FINISH ME (Task 4): collect the rest of the data for the smile
            var onSuccess = function(data) {
                // FINISH ME (Task 4): insert smile at the beginning of the smiles container
            };
            var onFailure = function() { 
                console.error('create smile failed'); 
            };
            
            // FINISH ME (Task 4): make a POST request to create the smile, then 
            //            hide the form and show the 'Shared a smile...' button
        });

        // FINISH ME (Task 4): add a handler for the 'Cancel' button to hide the form
        // and show the 'Shared a smile...' button

        // The handler for the Post button in the form
        create.on('click', '.submit-input', function (e) {
            e.preventDefault (); // Tell the browser to skip its default click action

            var smile = {}; // Prepare the smile object to send to the server
            smile.title = create.find('.title-input').val();
            // FINISH ME (Task 4): collect the rest of the data for the smile
            var onSuccess = function(data) {
                // FINISH ME (Task 4): insert smile at the beginning of the smiles container
                insertSmile(data.smile, true);
            };
            var onFailure = function() { 
                console.error('create smile failed'); 
            };
            
            // FINISH ME (Task 4): make a POST request to create the smile, then 
            //            hide the form and show the 'Shared a smile...' button
            var title1 = $("#create_form_title").val();
            var story1 = $("#create_form_story").val();
            var ecstasy1 = $("#happiness-level").val();
            var data = {title: title1, space: smileSpace, story:story1, happiness_level: parseInt(ecstasy1)};
            var outputError = "";
            if (title1.length <= 0 || title1.length > 64)
                outputError = outputError.concat("Title must be between 0 and 64 characters.\n");
            if (parseInt(ecstasy1) < 1 || parseInt(ecstasy1) > 3)
                outputError = outputError.concat("Invalid happiness. Must be between 1 and 3.\n");
            if (story1.length <= 0 || story1.length > 2048)
                outputError = outputError.concat("Story must be between 0 and 2048 characters.");
            if (outputError.length == 0)
                makePostRequest('/api/smiles', data, onSuccess, onFailure);
            else
                alert(outputError);
        });

    };

    
    /**
     * Start the app by displaying the most recent smiles and attaching event handlers.
     * @return {None}
     */
    var start = function() {
        smiles = $(".smiles");
        create = $(".create");

        // Grab the first smile, to use as a template
        smileTemplateHtml = $(".smiles .smile")[0].outerHTML;
        // Delete everything from .smiles
        smiles.html('');

        displaySmiles();
        attachLikeHandler();
        attachCreateHandler();
    };
    

    // PUBLIC METHODS
    // any private methods returned in the hash are accessible via Smile.key_name, e.g. Smile.start()
    return {
        start: start
    };
    
})();
