!function t(e,l,o){function r(u,m){if(!l[u]){if(!e[u]){var d="function"==typeof require&&require;if(!m&&d)return d(u,!0);if(n)return n(u,!0);throw new Error("Cannot find module '"+u+"'")}var h=l[u]={exports:{}};e[u][0].call(h.exports,function(t){var l=e[u][1][t];return r(l||t)},h,h.exports,t,e,l,o)}return l[u].exports}for(var n="function"==typeof require&&require,u=0;u<o.length;u++)r(o[u]);return r}({1:[function(t,e,l){function o(t){var e=$("#"+t+"-rank-input").val(),l=$("#"+t+"-first-input").val(),o=$("#"+t+"-last-input").val();return{status:t,rank:e,firstName:l,lastName:o,fullName:l+" "+o,fullRankAndName:e+" "+l+" "+o}}function r(t){if(console.log(t),t.firstName&&t.lastName){var e="."+t.status+"-rank-and-name";$(e).html(t.fullRankAndName)}}$(document).ready(function(){var t=document.getElementById("bugle-checkbox"),e=document.getElementById("flowers-checkbox"),l=document.getElementById("honors-deferment-checkbox"),n=$("#flower-presentation-inputs"),u=(document.getElementById("box2"),document.getElementById("box3"),document.getElementById("submit")),m=$("#script");m.hide(),n.hide(),e.onclick=function(){n.toggle()},u.onclick=function(){var n=$("#unit-name-input").val(),u=new Date($("#ceremony-date-input").val());console.log(u);var d,h,a=$("#ceremony-time-input").val(),i=o("outgoing"),s=o("incoming"),c=o("reviewing"),g=o("cot"),R=o("ncoy"),p=o("reviewing-spouse"),f=o("incoming-spouse"),A=o("outgoing-spouse");console.log(f),t.checked?($(".bugle-remove").show(),$(".adj-bugle-cue-atn").html("The ADJ directs bugler to sound &ldquo;Attention.&rdquo; "),$(".adj-bugle-cue-pr").html("The ADJ directs bugler to sound &ldquo;Parade Rest.&rdquo; "),$(".sound-atn").html("SOUND ATTENTION. "),$(".sound-pr").html("SOUND PARADE REST. "),$(".sound-pa").html("SOUND PRESENT ARMS. "),$(".sound-oa").html("SOUND ORDER ARMS. "),$(".sound-oa-and-pr").html("SOUND ORDER ARMS AND PARADE REST. "),$(".sound-occ").html("SOUND OFFICERS AND COLORS CENTER, MARCH. "),$(".sound-cpm").html("SOUND COLORS POST, MARCH. "),$(".sound-atn-and-pa").html("SOUND ATTENTION, <i>&lt;&lt;</i>Pause<i>&gt;&gt;,</i>PRESENT ARMS. <o:p></o:p>"),$(".bugle-cue").html("[Bugler]: "),$(".bugle-cue-atn").html("The bugler sounds &ldquo;Attention.&rdquo; On hearing the note of execution, all units take the position of &ldquo;Attention&rdquo; simultaneously. "),$(".bugle-cue-pr").html("The bugler sounds the call for &ldquo;Parade Rest.&rdquo; On hearing the note of execution, all units take the position of &ldquo;Parade Rest&rdquo; simultaneously. "),$(".bugle-cue-oa").html("The bugler sounds the call for &ldquo;Order Arms.&rdquo; On hearing the note of execution, all units take the position of &ldquo;Order Arms&rdquo; simultaneously. "),$(".bugle-cue-atn-pa").html("The bugler sounds &ldquo;Attention,&rdquo; then &ldquo;Present Arms.&rdquo;"),$(".bugle-cue-oa-pr").html("bugler sound &ldquo;Order Arms&rdquo; then &ldquo;Parade Rest.&rdquo;"),$(".prep-note").html("first note of execution"),$(".exec-note").html("second note of execution"),$(".letter-f").html("f."),$(".letter-g").html("g."),$(".letter-h").html("h."),$(".letter-i").html("i."),$(".letter-j").html("j."),$(".letter-k").html("k."),$(".letter-l").html("l."),$(".letter-m").html("m."),$(".letter-n").html("n."),$(".letter-o").html("o."),$(".letter-p").html("p."),$(".letter-q").html("q."),$(".letter-r").html("r."),$(".letter-s").html("s."),$(".letter-t").html("t."),$(".letter-u").html("u."),$(".letter-v").html("v."),$(".letter-w").html("w."),$(".letter-x").html("x."),$(".letter-l-double").html("l.")):($(".bugle-remove").hide(),$(".adj-bugle-cue-atn").html('The ADJ directs unit commanders to bring their units to "Attention." '),$(".adj-bugle-cue-pr").html('The ADJ directs unit commanders to bring the units to "Parade Rest." '),$(".sound-atn").html("BRING YOUR UNITS TO ATTENTION. "),$(".sound-pr").html("BRING YOUR UNITS TO PARADE REST. "),$(".sound-pa").html("BRING YOUR UNITS TO PRESENT ARMS. "),$(".sound-oa").html("BRING YOUR UNITS TO ORDER ARMS. "),$(".sound-oa-and-pr").html("BRING YOUR UNITS TO ORDER ARMS AND PARADE REST. "),$(".sound-occ").html("OFFICERS AND COLORS CENTER, MARCH. "),$(".sound-cpm").html("COLORS POST, MARCH. "),$(".sound-atn-and-pa").html("BRING YOUR UNITS TO ATTENTION, <i>&lt;&lt;</i>Pause<i>&gt;&gt;, </i>BRING YOUR UNITS TO PRESENT ARMS. <o:p></o:p>"),$(".bugle-cue").html("[Unit Commanders]: "),$(".bugle-cue-atn").html("Commanders bring their units to &ldquo;Attention.&rdquo;"),$(".bugle-cue-pr").html("Commanders bring their units to &ldquo;Parade Rest.&rdquo;"),$(".bugle-cue-pa").html("Commanders bring their units to &ldquo;Present Arms.&rdquo;"),$(".bugle-cue-oa").html("Commanders bring their units to &ldquo;Order Arms.&rdquo;"),$(".bugle-cue-atn-pa").html("Commanders bring their units to &ldquo;Attention&rdquo; then &ldquo;Present Arms.&rdquo;"),$(".bugle-cue-oa-pr").html("Commanders bring their units to &ldquo;Order Arms&rdquo; then &ldquo;Parade Rest.&rdquo;"),$(".prep-note").html("preperatory command"),$(".exec-note").html("command of execution"),$(".letter-c").html("b."),$(".letter-d").html("c."),$(".letter-e").html("d."),$(".letter-f").html("e."),$(".letter-g").html("f."),$(".letter-h").html("g."),$(".letter-i").html("h."),$(".letter-j").html("i."),$(".letter-k").html("j."),$(".letter-l").html("k."),$(".letter-m").html("l."),$(".letter-n").html("m."),$(".letter-o").html("n."),$(".letter-p").html("o."),$(".letter-q").html("p."),$(".letter-r").html("q."),$(".letter-s").html("r."),$(".letter-t").html("s."),$(".letter-u").html("s."),$(".letter-v").html("u."),$(".letter-w").html("v."),$(".letter-x").html("w."),$(".letter-l-double").html("j.")),e.checked?$(".flower-remove").show():$(".flower-remove").hide(),l.checked?$(".honors-deferment").show():$(".honors-deferment").hide(),(d=n)&&$(".unit-name").html(d),function(t){if(t){var e=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][t.getDay()];console.log(e);var l=t.getDate(),o=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][t.getMonth()],r=t.getFullYear(),n=e+" "+o+" "+l+", "+r;$(".ceremony-date").html(n)}}(u),(h=a)&&$(".ceremony-time").html(h),r(i),r(s),r(c),r(g),r(R),r(p),r(f),r(A),m.show()}})},{}]},{},[1]);