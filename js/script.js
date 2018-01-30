$(document).ready(function(){

var bugleBox = document.getElementById("bugle-checkbox");
var flowerBox = document.getElementById("flowers-checkbox");
var honorsBox = document.getElementById("honors-deferment-checkbox");
var flowerInputs = $("#flower-presentation-inputs");
var box2 = document.getElementById("box2");
var box3 = document.getElementById("box3");
var button = document.getElementById("submit");
var script = $("#script");
script.hide();
flowerInputs.hide();

flowerBox.onclick = function() {
  flowerInputs.toggle();
}

button.onclick = function(){
  // Get unit/date/time input values;
  var unitName = $('#unit-name-input').val();
  var date = $('#ceremony-date-input').val();
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

  console.log(incomingSpouse);

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
  if (honorsBox.checked) {
    addHonors();
  } else {
    removeHonors();
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
  changeCommanderInfo(cot);
  changeCommanderInfo(ncoy);
  changeCommanderInfo(rewiewingSpouse);
  changeCommanderInfo(incomingSpouse);
  changeCommanderInfo(outgoingSpouse);


  script.show();
};

});

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

function shiftLetters() {
  $('.letter-c').html('b.');
  $('.letter-d').html('c.');
  $('.letter-e').html('d.');
  $('.letter-f').html('e.');
  $('.letter-g').html('f.');
  $('.letter-h').html('g.');
  $('.letter-i').html('h.');
  $('.letter-j').html('i.');
  $('.letter-k').html('j.');
  $('.letter-l').html('k.');
  $('.letter-m').html('l.');
  $('.letter-n').html('m.');
  $('.letter-o').html('n.');
  $('.letter-p').html('o.');
  $('.letter-q').html('p.');
  $('.letter-r').html('q.');
  $('.letter-s').html('r.');
  $('.letter-t').html('s.');
  $('.letter-u').html('s.');
  $('.letter-v').html('u.');
  $('.letter-w').html('v.');
  $('.letter-x').html('w.');
  $('.letter-l-double').html('j');
}

function restoreLetters() {
  $('.letter-f').html('f.');
  $('.letter-g').html('g.');
  $('.letter-h').html('h.');
  $('.letter-i').html('i.');
  $('.letter-j').html('j.');
  $('.letter-k').html('k.');
  $('.letter-l').html('l.');
  $('.letter-m').html('m.');
  $('.letter-n').html('n.');
  $('.letter-o').html('o.');
  $('.letter-p').html('p.');
  $('.letter-q').html('q.');
  $('.letter-r').html('r.');
  $('.letter-s').html('s.');
  $('.letter-t').html('t.');
  $('.letter-u').html('u.');
  $('.letter-v').html('v.');
  $('.letter-w').html('w.');
  $('.letter-x').html('x.');
  $('.letter-l-double').html('l');
}

function changeUnitName(unitName) {
  if (unitName) {
    $('.unit-name').html(unitName);
  }
}

function changeDate(date) {
  if (date) {
    $('.ceremony-date').html(date);
  }
}

function changeTime(time) {
  if (time) {
    $('.ceremony-time').html(time);
  }
}

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

function changeCommanderInfo(commander) {
  // Individuals status plus rank and name should be replaced with
  // their full rank and name
  console.log(commander)
  if(commander.firstName && commander.lastName){
    var rankAndNameClass = '.' + commander.status + '-rank-and-name';
    $(rankAndNameClass).html(commander.fullRankAndName);
  }
}

function addFlowers() {
  $('.flower-remove').show();
}

function removeFlowers() {
  $('.flower-remove').hide();
}

function removeHonors() {
  $('.honors-deferment').hide();
}

function addHonors() {
  $('.honors-deferment').show();
}
