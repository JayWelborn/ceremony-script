$(document).ready(function(){

// globals are bad, I know.
var bugleBox = document.getElementById("bugle-checkbox");
var flowerBox = document.getElementById("flowers-checkbox");
var honorsDeferredBox = document.getElementById("honors-deferment-checkbox");
var flowerInputs = $("#flower-presentation-inputs");
var box2 = document.getElementById("box2");
var box3 = document.getElementById("box3");
var button = document.getElementById("submit");
var script = $("#script");
var entitledToHonors = ['BG', 'MG', 'LTG', 'GEN'];
var honorsRemoved = false;



/**
 * Page loads with script and flower input fields hidden
 */
script.hide();
flowerInputs.hide();



/**
 * Shows the flower input fields when flower checkbox
 * is clicked
 */
flowerBox.onclick = function() {
  flowerInputs.toggle();
}



/**
 * Disables defer honors checkbox if
 * outgoing commander's rank is too low.
 * re-enable if rank changes to become high enough
 */
$("#outgoing-rank-input").change(function(event) {

  // If the rank of the outgoing commander is not entitled
  // to honors:
  if (entitledToHonors.indexOf(event.currentTarget.value) === -1) {
    $('#honors-deferment-checkbox').prop('disabled', true);
    // Alert user if they attempted to defer honors to a
    // COL or lower, and de-check the checkbox
    if($('#honors-deferment-checkbox').prop('checked')) {
      $('#honors-deferment-checkbox').prop('checked', false);
      alert("Honors are only rendered for officers in grade O7 and above. " +
            "For more information, see AR 600-25 Chapter 2 Table 2-1.");
    }
  // If the outgoing command is entitled ot honors
  } else {
    $('#honors-deferment-checkbox').prop('disabled', false);
  }
});



/**
 * Remove honors from the ceremony entirely if
 * the reviewing officer is not entitled
 * to honors.
 *
 * Removal and addition are delegated to methods defined below.
 */
$("#reviewing-rank-input").change(function(event) {
  var ruffles = entitledToHonors.indexOf(event.target.value);
  // If the reviewing officer is not entitled ot honors
  if (ruffles === -1) {
    removeHonors();
  } else {
    // Ruffles and flourishes is equal to the index of the
    // officer's rank plus one (1 for BG, 2 for MG, etc).
    addHonors(++ruffles);
  }
})


/**
 * When 'Make Ceremony' button is clicked, perform the following actions:
 *
 * Get value from 'unit name' field
 * Get value from 'date' field
 * Get value from 'time' field
 *
 * Get values for incoming outgoing and reviewing officers, COT, NCOY, and
 * spouses for string substitution.
 *
 * Add bugle if bugle box is checked, remove it if unchecked
 *
 * Add flower presentation if box is checked, remove it if unchecked
 *
 * Add honors deferrment if box is checked, remove it if unchecked
 *
 * Insert unit name, date, time, and names of individuals in the
 * ceremony in their appropriate locations in the script.
 * These actions are delegated to methods defined below.
 *
 * Reveal the script, post edits.
 */
button.onclick = function(){
  // Get unit/date/time input values;
  var unitName = $('#unit-name-input').val();
  var date = new Date($('#ceremony-date-input').val());
  // console.log(date);
  var time = $('#ceremony-time-input').val();

  // Outgoing/Incoming Commander Values
  var outgoing = getCommanderValues('outgoing');
  var incoming = getCommanderValues('incoming');
  var reviewing = getCommanderValues('reviewing');
  var cot = getCommanderValues('cot');
  var ncoy = getCommanderValues('ncoy');
  var rewiewingSpouse = getCommanderValues('reviewing-spouse');
  var incomingSpouse = getCommanderValues('incoming-spouse');
  var outgoingSpouse = getCommanderValues('outgoing-spouse');

  // console.log(incomingSpouse);

  // add or remove bugle
  if (! bugleBox.checked) {
    removeBugle();
  } else {
    addBugle();
  };

  // add or remove flower presentation
  if (flowerBox.checked) {
    addFlowers();
  } else {
    removeFlowers();
  }

  // add or remove deferment of honors
  // checked indicates honors are being deferred
  if (honorsDeferredBox.checked) {
    unDeferHonors();
  } else {
    deferHonors();
  }

  // Change unit name
  changeUnitName(unitName);

  // Update ceremony date
  changeDate(date);

  // Update ceremony time
  changeTime(time);

  // Update outgoing/incoming commander's info
  changeCommanderInfo(outgoing);
  changeCommanderInfo(incoming);
  changeCommanderInfo(reviewing);

  // Update COT, NCOY, spouse info
  changeCommanderInfo(cot);
  changeCommanderInfo(ncoy);
  changeCommanderInfo(rewiewingSpouse);
  changeCommanderInfo(incomingSpouse);
  changeCommanderInfo(outgoingSpouse);

  // Reveal script
  script.show();
};

});



/**
 * Remove the command bugle from the ceremony.
 * This function alters the narration and Adjutant commands
 * to remove the command bugle from the ceremony.
 *
 * After removal, letters denoting current location in the ceremony
 * are decremented to account for the missing portions of narration.
 */
function removeBugle() {
  $('.bugle-remove').hide();
  $('.adj-bugle-cue-atn').html('The ADJ directs unit commanders to bring their units to "Attention." ');
  $('.adj-bugle-cue-pr').html('The ADJ directs unit commanders to bring the units to "Parade Rest." ');
  $('.sound-atn').html('BRING YOUR UNITS TO ATTENTION. ');
  $('.sound-pr').html('BRING YOUR UNITS TO PARADE REST. ');
  $('.sound-pa').html('BRING YOUR UNITS TO PRESENT ARMS. ');
  $('.sound-oa').html('BRING YOUR UNITS TO ORDER ARMS. ');
  $('.sound-oa-and-pr').html('BRING YOUR UNITS TO ORDER ARMS AND PARADE REST. ');
  $('.sound-occ').html('OFFICERS AND COLORS CENTER, MARCH. ');
  $('.sound-cpm').html('COLORS POST, MARCH. ')
  $('.sound-atn-and-pa').html('BRING YOUR UNITS TO ATTENTION, <i>&lt;&lt;</i>Pause<i>&gt;&gt;, </i>BRING YOUR UNITS TO PRESENT ARMS. <o:p></o:p>');
  $('.bugle-cue').html('[Unit Commanders]: ');
  $('.bugle-cue-atn').html('Commanders bring their units to &ldquo;Attention.&rdquo;');
  $('.bugle-cue-pr').html('Commanders bring their units to &ldquo;Parade Rest.&rdquo;');
  $('.bugle-cue-pa').html('Commanders bring their units to &ldquo;Present Arms.&rdquo;');
  $('.bugle-cue-oa').html('Commanders bring their units to &ldquo;Order Arms.&rdquo;');
  $('.bugle-cue-atn-pa').html('Commanders bring their units to &ldquo;Attention&rdquo; then &ldquo;Present Arms.&rdquo;');
  $('.bugle-cue-oa-pr').html('Commanders bring their units to &ldquo;Order Arms&rdquo; then &ldquo;Parade Rest.&rdquo;');
  $('.prep-note').html('preperatory command');
  $('.exec-note').html('command of execution');

  shiftLetters();
};


/**
 * Add a bugle back into the ceremony.
 * This function alters the narration and Adjutant
 * commands to add a command bugle to the cermeony.
 *
 * After adding, letters denoting the current location in the cermeony
 * are incremented to account for the additional portions of narration.
 */
function addBugle() {
  $('.bugle-remove').show();
  $('.adj-bugle-cue-atn').html('The ADJ directs bugler to sound &ldquo;Attention.&rdquo; ');
  $('.adj-bugle-cue-pr').html('The ADJ directs bugler to sound &ldquo;Parade Rest.&rdquo; ');
  $('.sound-atn').html('SOUND ATTENTION. ');
  $('.sound-pr').html('SOUND PARADE REST. ');
  $('.sound-pa').html('SOUND PRESENT ARMS. ');
  $('.sound-oa').html('SOUND ORDER ARMS. ');
  $('.sound-oa-and-pr').html('SOUND ORDER ARMS AND PARADE REST. ');
  $('.sound-occ').html('SOUND OFFICERS AND COLORS CENTER, MARCH. ');
  $('.sound-cpm').html('SOUND COLORS POST, MARCH. ');
  $('.sound-atn-and-pa').html('SOUND ATTENTION, <i>&lt;&lt;</i>Pause<i>&gt;&gt;,</i>PRESENT ARMS. <o:p></o:p>');
  $('.bugle-cue').html('[Bugler]: ');
  $('.bugle-cue-atn').html('The bugler sounds &ldquo;Attention.&rdquo; On hearing the note of execution, all units take the position of &ldquo;Attention&rdquo; simultaneously. ');
  $('.bugle-cue-pr').html('The bugler sounds the call for &ldquo;Parade Rest.&rdquo; On hearing the note of execution, all units take the position of &ldquo;Parade Rest&rdquo; simultaneously. ');
  $('.bugle-cue-oa').html('The bugler sounds the call for &ldquo;Order Arms.&rdquo; On hearing the note of execution, all units take the position of &ldquo;Order Arms&rdquo; simultaneously. ');
  $('.bugle-cue-atn-pa').html('The bugler sounds &ldquo;Attention,&rdquo; then &ldquo;Present Arms.&rdquo;');
  $('.bugle-cue-oa-pr').html('bugler sound &ldquo;Order Arms&rdquo; then &ldquo;Parade Rest.&rdquo;');
  $('.prep-note').html('first note of execution');
  $('.exec-note').html('second note of execution');

  restoreLetters();
};


/**
 * This is the ugliest thing I've ever written.
 *
 * This shifts each letter of narration to account
 * for bugle removal. This badly needs to be refactored, but
 * refactoring this will likely result in the structure of the
 * HTML document being fundamentally re-written, and that
 * will be a pain.
 */
function shiftLetters() {
  $('.letter-c').each(function(i, obj) {
    $(this).html('b.');
  });
  $('.letter-d').each(function(i, obj) {
    $(this).html('c.');
  });
  $('.letter-e').each(function(i, obj) {
    $(this).html('d.');
  });
  $('.letter-f').each(function(i, obj) {
    $(this).html('e.');
  });
  $('.letter-g').each(function(i, obj) {
    $(this).html('f.');
  });
  $('.letter-h').each(function(i, obj) {
    $(this).html('g.');
  });
  $('.letter-i').each(function(i, obj) {
    $(this).html('h.');
  });
  $('.letter-j').each(function(i, obj) {
    $(this).html('i.');
  });
  $('.letter-k').each(function(i, obj) {
    $(this).html('j.');
  });
  $('.letter-l').each(function(i, obj) {
    $(this).html('k.');
  });
  $('.letter-m').each(function(i, obj) {
    $(this).html('l.');
  });
  $('.letter-n').each(function(i, obj) {
    $(this).html('m.');
  });
  $('.letter-o').each(function(i, obj) {
    $(this).html('n.');
  });
  $('.letter-p').each(function(i, obj) {
    $(this).html('o.');
  });
  $('.letter-q').each(function(i, obj) {
    $(this).html('p.');
  });
  $('.letter-r').each(function(i, obj) {
    $(this).html('q.');
  });
  $('.letter-s').each(function(i, obj) {
    $(this).html('r.');
  });
  $('.letter-t').each(function(i, obj) {
    $(this).html('s.');
  });
  $('.letter-u').each(function(i, obj) {
    $(this).html('s.');
  });
  $('.letter-v').each(function(i, obj) {
    $(this).html('u.');
  });
  $('.letter-w').each(function(i, obj) {
    $(this).html('v.');
  });
  $('.letter-x').each(function(i, obj) {
    $(this).html('w.');
  });
  $('.letter-l-double').each(function(i, obj) {
    $(this).html('j.');
  });
}


/**
 * This is the other ugliest thing I've ever written.
 *
 * This shifts each letter of narration to account
 * for bugle addition. This badly needs to be refactored, but
 * refactoring this will likely result in the structure of the
 * HTML document being fundamentally re-written, and that
 * will be a pain.
 */
function restoreLetters() {
  $('.letter-f').each(function(i, obj) {
    $(this).html('f.');
  });
  $('.letter-g').each(function(i, obj) {
    $(this).html('g.');
  });
  $('.letter-h').each(function(i, obj) {
    $(this).html('h.');
  });
  $('.letter-i').each(function(i, obj) {
    $(this).html('i.');
  });
  $('.letter-j').each(function(i, obj) {
    $(this).html('j.');
  });
  $('.letter-k').each(function(i, obj) {
    $(this).html('k.');
  });
  $('.letter-l').each(function(i, obj) {
    $(this).html('l.');
  });
  $('.letter-m').each(function(i, obj) {
    $(this).html('m.');
  });
  $('.letter-n').each(function(i, obj) {
    $(this).html('n.');
  });
  $('.letter-o').each(function(i, obj) {
    $(this).html('o.');
  });
  $('.letter-p').each(function(i, obj) {
    $(this).html('p.');
  });
  $('.letter-q').each(function(i, obj) {
    $(this).html('q.');
  });
  $('.letter-r').each(function(i, obj) {
    $(this).html('r.');
  });
  $('.letter-s').each(function(i, obj) {
    $(this).html('s.');
  });
  $('.letter-t').each(function(i, obj) {
    $(this).html('t.');
  });
  $('.letter-u').each(function(i, obj) {
    $(this).html('u.');
  });
  $('.letter-v').each(function(i, obj) {
    $(this).html('v.');
  });
  $('.letter-w').each(function(i, obj) {
    $(this).html('w.');
  });
  $('.letter-x').each(function(i, obj) {
    $(this).html('x.');
  });
  $('.letter-l-double').each(function(i, obj) {
    $(this).html('l.');
  });
}


/**
 * Insert name in the 'unit name' field everywehre
 * it appears in the script.
 *
 * Despite JQuery's official
 * documentation stating the class selectors only
 * affect the first instance of the class in the HTML
 * document, this function works on the entire document.
 *
 * Not sure why.
 */
function changeUnitName(unitName) {
  if (unitName) {
    $('.unit-name').html(unitName);
  }
}


/**
 * Insert date from the 'date' field everywehre
 * it appears in the script. Convert date into
 * pretty string format using javascript's
 * built in date API.
 *
 * Despite JQuery's official
 * documentation stating the class selectors only
 * affect the first instance of the class in the HTML
 * document, this function works on the entire document.
 *
 * Not sure why.
 */
function changeDate(date) {
  if (!isNaN(date.getDate())) {

    var months = [
      "Jan", "Feb", "Mar",
      "Apr", "May", "Jun", "Jul",
      "Aug", "Sep", "Oct",
      "Nov", "Dec"
    ]

    var days = [
      "Sunday", "Monday", "Tuesday", "Wednesday",
      "Thursday","Friday","Saturday"
    ];

    var weekDay = days[date.getDay()];
    // console.log(weekDay);
    var day = date.getDate();
    var month = months[date.getMonth()];
    var year = date.getFullYear();

    var prettyDate = weekDay + ' ' + month + ' ' + day + ', ' + year;

    $('.ceremony-date').html(prettyDate);
  }
}


/**
 * Insert time in the 'time' field everywehre
 * it appears in the script.
 *
 * Despite JQuery's official
 * documentation stating the class selectors only
 * affect the first instance of the class in the HTML
 * document, this function works on the entire document.
 *
 * Not sure why.
 */
function changeTime(time) {
  if (time) {
    $('.ceremony-time').html(time);
  }
}


/**
 * Utility function to get a commanders info from the fields
 * in the HTML form at the top of the page. Commanders
 * are stored as key-value objects with keys for rank, first name,
 * last name, full name, and full rank and name.
 *
 * @param  {String} status
 *         The position of the commander within the ceremony (e.g. incoming, outgoing)
 * @return {Object} Commander
 *         The key-value object representation of a ceremony participant.
 */
function getCommanderValues(status) {
  var rank = $('#' + status + '-rank-input').val();
  var firstName = $('#' + status + '-first-input').val();
  var lastName = $('#' + status + '-last-input').val();

  var commander = {
    status: status,
    rank: rank,
    firstName: firstName,
    lastName: lastName,
    fullName: firstName + ' ' + lastName,
    fullRankAndName: rank + ' ' + firstName + ' ' + lastName,
  }

  return commander;
}


/**
 * Programmatically updates every html element with a given class with
 * the appropriate ceremony participant's information.
 * @param  {Object} commander
 *         Key-value representation of a ceremony participant with info for first/last name, rank
 *         status, and full rank and name.
 */
function changeCommanderInfo(commander) {
  // Individuals status plus rank and name should be replaced with
  // their full rank and name
  if(commander.firstName && commander.lastName){
    var rankAndNameClass = '.' + commander.status + '-rank-and-name';
    $(rankAndNameClass).html(commander.fullRankAndName);
  }
}


/**
 * Add flowers presentation to ceremony.
 */
function addFlowers() {
  $('.flower-remove').show();
}


/**
 * Remove flowers presentation from ceremony
 */
function removeFlowers() {
  $('.flower-remove').hide();
}


/**
 * Hide the honors deferment section of the script
 */
function deferHonors() {
  $('.honors-deferment').hide();
}


/**
 * Show the honors deferment section of the script
 */
function unDeferHonors() {
  $('.honors-deferment').show();
}


/**
 * Remove the rendering of honors to the reviewing officer from the ceremony.
 * This function is auto-triggered when the rank of the reviewing officer is COL or below.
 */
function removeHonors() {
  $('.honors').hide();
  $('.honors-number').each(function(i, obj) {
    var number = parseInt($(this).html());
    $(this).html(--number);
  });
  // set global state to track when honors have been removed.
  honorsRemoved = true;
}


/**
 * Add the rendering of honors to the reviewing officer to the ceremony.
 * This function is auto-triggered when the rank of the reviewing officer is BG or above.
 */
function addHonors(ruffles) {
  $('.honors').show();
  // Only add one to these title numbers if honors have been removed.
  if (honorsRemoved) {
    $('.honors-number').each(function(i, obj) {
      var number = parseInt($(this).html());
      $(this).html(++number);
    });
  }

  $('.ruffles').each(function(i, obj) {
    $(this).html(ruffles);
  });

  $('.guns').each(function(i, obj) {
    $(this).html(9 + 2 * ruffles);
  });

  honorsRemoved = false;
}
