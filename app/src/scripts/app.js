// the ready event occurs when the DOM has been loaded
$(document).ready(function() {
  // Write code in an IIFE function
  (function loadApp() {
    // An array to store the answers
    let answers = [];
    // Store the lastItem's data-item attribute value in lastItemValue
    let lastItemValue = $('.last-item').attr('data-item');
    // A function to start the animation of first item
    let startApp = function() {
      /*
      Select h1 from .item-one and add drop effect from top for 500ms and then
      add the class started to .start-quiz
      */
      $('.item-one h1').show("drop", {
        direction: 'up'
      }, 500, function() {
        $('.start-quiz').addClass("started");
      });
      // Listen for click event on .start-quiz and call the following functions
      $('.start-quiz').on("click", function() {
        showCurrentItem(1);
        goToNext();
      });
    };
    // A function to hide previous item and show the item with the position passed
    let showCurrentItem = function(position) {
      // Store the previous item dom object in previousItem
      let previousItem = $(`div[data-item = ${position-1}]`);
      // get the descendant with filtered selector and animate it top and then make the opacity to 0
      previousItem.find('.wrapper').animate({
        top: "-=100px",
        opacity: 0
      }, 500, function() {
        // When opacity is made to 0, add class 'hidden' which changes css property display to none
        previousItem.addClass('hidden');
        // Store the current item dom object in currentItem
        let currentItem = $(`div[data-item = ${position}]`);
        // Remove the 'hidden' class which makes it visible
        currentItem.removeClass('hidden');
        // Call the function with currentItem DOM object
        showCurrentItemWrapper(currentItem);
        // compare the position with lastItemValue
        if (position == Number(lastItemValue)) {
          // call appendAnswers with answers array
          appendAnswers();
        }
      });
    };
    // A function to animate currentItemWrapper
    let showCurrentItemWrapper = function(currentItem) {
      // store the wrapper object in wrapper
      let wrapper = currentItem.find('.wrapper');
      // fade it in 1000 seconds
      wrapper.fadeIn('1000', function() {
        // call the function when animation is complete
        showCurrentItemOptions(currentItem);
      });
    };
    // A function to animate showCurrentItemOptions
    let showCurrentItemOptions = function(currentItem) {
      // store the options object in options
      let options = currentItem.find('.options');
      // store the array of paragraph objects
      let childrens = options.find('p');
      // initialize a counter to 0
      var counter = 0;
      // run each function on childrens to animate each paragraph object
      childrens.each(function(item, el) {
        // deley the element by counter and add puff effect
        $(el).delay(counter).show('puff');
        /*
        increment counter so that next element in array will delay
        before displaying by following counter value
        */
        counter += 750;
      });
      // check for click event on children objects
      childrens.on("click", function() {
        // remove 'active' class on all objects
        childrens.removeClass('active');
        // add valid class to currentItem
        currentItem.addClass('valid');
        // add 'active' class to object clicked
        $(this).addClass('active');
      });
    };
    // A function to handle click event on next question btn
    let goToNext = function() {
      // listen for click event on next question btn
      $('.next-question').on("click", function() {
        // call the function with next question object passed
        if (validateSelection($(this))) {
          // store the value of data-next in nextItemNumber
          let nextItemNumber = $(this).data('next');
          // call the following functions with nextItemNumber
          showCurrentItem(nextItemNumber);
          showProgressAndStore(nextItemNumber);
        }
      });
    };
    // A function to validate if an answer is selected
    let validateSelection = function(nextBtn) {
      // get item dom object and store it in parent
      let parent = nextBtn.parents().eq(1);
      // check to see if the parent has class 'valid'
      if (parent.hasClass('valid')) {
        // return true
        return true;
      }
      // if it doesn't have class 'valid'
      else {
        // select error object and fade it in 500ms and fade it out for 5000ms after 1000ms
        $('.error').fadeIn('500', function() {
          $(this).delay(1000).fadeOut('500');
        });
        // return false
        return false;
      }
    };
    // A function to animate progress bar and store the answers
    let showProgressAndStore = function(item) {
      // select the object and animate its width by 20% for 500ms
      $('.progress .bar').animate({
        'width': '+=20%'
      }, 500);
      // Go to previous data item and store its options obejct in options
      let options = $(`div[data-item = ${item-1}]`).find('.options');
      // find paragraph's from it and run each method to check if element has class 'active'
      options.find('p').each(function(item, el) {
        if ($(this).hasClass('active')) {
          // push the element's text with active class to answers array
          answers.push($(this).text());
        }
      });
    };
    // A function to append answers to dom
    let appendAnswers = function() {
      // Create an empty string
      let str = '';
      // run map function on answers array
      answers.map(item => {
        // add the item from array with empty space to the string
        str += item + ' ';
      });
      // add the string in a paragraph and append paragraph to .answer-list
      $('.answer-list').append(`<p>${str}</p>`);
      // display the answers by adding display:block css to .answer-list p
      $(".answer-list p").css("display", "block");

    }
    // call the startApp
    startApp();
    // listen for click event on restart btn
    $(".restart").on("click", function() {
      // reload the app
      document.location.reload();
    });
  }());
});