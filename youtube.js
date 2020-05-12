// // // // // // // // // // // // // // // // // // // // //
// this tool was developed by thirtysix						//
// discord contact: ThirtySix#6977							//
// all rights reserved to the owner of the code				//
// // // // // // // // // // // // // // // // // // // // //

let sheet = '';
sheet += '';
sheet += '.slider:hover { opacity: 1; cursor: pointer; }';
sheet += '.slider::-webkit-slider-thumb { -webkit-appearance: none; width: 10px; height: 10px; background: #fff; border: 1px solid white; border-radius: 100%; cursor: pointer; }';
sheet += '.slider::-moz-range-thumb { -webkit-appearance: none; width: 10px; height: 10px; background: #fff; border: 1px solid white; border-radius: 100%; cursor: pointer; }';
sheet += '.slider { -webkit-appearance: none; background: red; border: solid 0px #fff; height: 5px; width: 250px; outline: none; opacity: 0.5; -webkit-transition: .2s; transition: opacity .2s; user-select: none; }';
sheet += '';
sheet += '.checkbox_wrapper {position: relative;display: inline-block;width: 30px;height: 17px;vertical-align: middle;user-select: none;}';
sheet += '.checkbox_wrapper input {opacity: 0;width: 0;height: 0;}';
sheet += '.customcheckbox {opacity: 0.7; position: absolute;cursor: pointer;top: 0;left: 0;right: 0;bottom: 0;background-color: white;-webkit-transition: .4s;transition: .4s;border-radius: 34px;border:4px solid white;}';
sheet += '.checkbox_wrapper input:checked + .customcheckbox {border:4px solid white;}';
sheet += '.customcheckbox:hover {opacity: 1;}';
sheet += '';
sheet += '.input_wrapper {position: relative;display: inline-block;width: 30px;height: 17px;vertical-align: middle;user-select: none;}';
sheet += '.input_wrapper input {opacity: 0;width: 0;height: 0;}';
sheet += '.custombutton {opacity: 0.7; position: absolute;cursor: pointer;top: 0;left: 0;right: 0;bottom: 0;background-color: white;-webkit-transition: .1s;transition: .1s;border-radius: 34px;border:4px solid white;}';
sheet += '.input_wrapper input:focus + .custombutton {border:4px solid white;}';
sheet += '.custombutton:hover {opacity: 1;}';
sheet += '';
sheet += '';
sheet += '.tooltip {position: relative;display: inline-block;border: 1px black; user-select: none;}';
sheet += '.tooltip .tooltiptext {visibility: hidden;width: auto;margin-bottom: 20px;background-color: rgba(0,0,0,0.7);color: #fff;text-align: center;border-radius: 6px;padding: 0px 10px;position: absolute;z-index: 1;bottom: 100%;left: 50%;transform: translateX(-50%);white-space: nowrap;}';
sheet += '.tooltip:hover .tooltiptext {visibility: visible;}';
sheet += '';

let style = document.createElement('style');
document.body.appendChild(style); 
style.id = "youtube_enhanced_speed_control_by_36";
style.innerHTML = sheet;

function insertAfter(referenceNode, newNode) {
	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function timestring_to_seconds(data) {
	timearr = data.split(':');
	if ( timearr.length == 2 ) {
		seconds = (+timearr[0]) * 60 + (+timearr[1]);
	} else {
		seconds = (+timearr[0]) * 60 * 60 + (+timearr[1]) * 60 + (+timearr[2]);
	}
	return seconds;
}

function timeseconds_to_string(data) {
	date = new Date(0);
	date.setSeconds(data);
	if (data < 3600) {
		newString = date.toISOString().substr(14, 5);
	} else {
		newString = date.toISOString().substr(11, 8);
	}
	return newString;
}

function update_ui() {
	
	if (typeof slider_el == "undefined") {
		parent_el = document.querySelector(".ytp-time-duration");
		slider_el = document.createElement("span");
		slider_el.id = "newspeedslider";
		slider_el.style.paddingLeft = "100px";
		slider_el.innerHTML = '<input id="slider" class="slider" type="range" value="1" step="0.05" min="0.1" max="3" /> <span id="speed" style="color: white;">2</span>';
		slider_el.innerHTML += '<span style="padding-left: 10px;"><label class="input_wrapper tooltip"><input type="button" id="save_speed"><span class="custombutton"></span><span id="save__speed" class="tooltiptext">save current speed as default speed</span></label></span>';
		slider_el.innerHTML += '<span style="padding-left: 10px;"><label class="checkbox_wrapper tooltip"><input type="checkbox" id="music_checkbox"><span class="customcheckbox"></span><span class="tooltiptext">play music videos always at 1.00 speed</span></label></span>';
		insertAfter(parent_el, slider_el);
		
		document.getElementById("slider").oninput = function() {
			playbackrate = this.value;
			document.getElementById("speed").innerHTML = parseFloat(playbackrate).toFixed(2);
			document.getElementById("slider").style.background = 'linear-gradient(to right, #fff 0%, #fff ' + parseFloat(playbackrate)*99/3 + '%, ' + colorcode + ' ' + parseFloat(playbackrate)*99/3 + '%, ' + colorcode + ' 100%)';
			document.querySelectorAll("video, audio").forEach(function(e) {
				e.playbackRate = playbackrate;
			});
		};
		
		document.getElementById("save_speed").onclick = function() {
			localStorage.setItem("thirtysix_speed", playbackrate);
			document.querySelector(".custombutton").style.border = "4px solid " + colorcode; 
			document.getElementById("save__speed").innerHTML = "saved";
			setTimeout(function(){ 
				document.querySelector(".custombutton").style.border = "4px solid white"; 
				document.getElementById("save__speed").innerHTML = "save current as default speed";
			}, 300);
		}
		
		document.getElementById("music_checkbox").onclick = function() {
			if (document.getElementById("music_checkbox").checked) { 
				document.querySelector(".customcheckbox").style.border = "4px solid " + colorcode; 
				localStorage.setItem("thirtysix_music", true);
			} else { 
				document.querySelector(".customcheckbox").style.border = "4px solid white"; 
				localStorage.setItem("thirtysix_music", false);
			}
		}
		
		if (localStorage.getItem("thirtysix_music") && localStorage.getItem("thirtysix_music") == "true" && !document.getElementById("music_checkbox").checked) { document.getElementById("music_checkbox").click(); }
		
	}
	
	document.getElementById("slider").value = parseFloat(playbackrate);
	document.getElementById("speed").innerHTML = parseFloat(playbackrate).toFixed(2);
	document.getElementById("slider").style.background = 'linear-gradient(to right, #fff 0%, #fff ' + parseFloat(playbackrate)*99/3 + '%, ' + colorcode + ' ' + parseFloat(playbackrate)*99/3 + '%, ' + colorcode + ' 100%)';
	if ( document.getElementById("music_checkbox").checked ) { document.querySelector(".customcheckbox").style.border = "4px solid " + colorcode; }
	
	if (typeof timer_el == "undefined") {
		parent_el = slider_el;
		timer_el = document.createElement("span");
		timer_el.id = "newtimestring";
		timer_el.style.paddingLeft = "100px";
		insertAfter(parent_el, timer_el);
	}
	
	if ( typeof timer_loop != "undefined" ) { clearInterval(timer_loop); }
	timer_loop = setInterval(function(){
		
		time_duration = document.querySelector(".ytp-time-duration").innerHTML;
		newtime_duration_seconds = Math.round( timestring_to_seconds(time_duration) / parseFloat(playbackrate) )
		newtime_duration_string =  timeseconds_to_string(newtime_duration_seconds);
		
		time_current = document.querySelector(".ytp-time-current").innerHTML;
		newtime_current_seconds = Math.round( timestring_to_seconds(time_current) / parseFloat(playbackrate) )
		newtime_current_string = timeseconds_to_string(newtime_current_seconds - newtime_duration_seconds + newtime_duration_seconds);
		
		time_remaining_string = timeseconds_to_string(newtime_duration_seconds - newtime_current_seconds);
		
		timer_el.innerHTML = '' + newtime_current_string + " / " + newtime_duration_string + " ( " + time_remaining_string + " ) ";
		
	}, 300);
	
}

function new_video(speed) {
	
	playbackrate = speed;
	update_ui();
	
	document.querySelectorAll("video, audio").forEach(function(e) {
		e.playbackRate = parseFloat(playbackrate); 
	});
	
}

colorcode = "red";
triggered = false;
check = "";

setInterval( function() {
    
    var url = window.location.href;
    if ( url != check && url.includes("v=") ) {
 
        check = url;
		
        setTimeout(function() {
            
			var video_id = window.location.search.split('v=')[1];
			var ampersandPosition = video_id.indexOf('&');
			if(ampersandPosition != -1) { video_id = video_id.substring(0, ampersandPosition); }
			
			key = "AIzaSyByajtIoT9Nq9-bKZI6bAFk2usmjm1COK8"; 
			parts = "snippet";
			field = "items(snippet(categoryId,liveBroadcastContent))";
			api_url = "https://www.googleapis.com/youtube/v3/videos";
			link = api_url + "?key=" + key + "&id=" + video_id + "&fields=" + field + "&part=" + parts;
			
			fetch(link)
			.then(response => response.json())
			.then(function(data) { 
				
				category = data.items[0].snippet.categoryId;
				is_live = data.items[0].snippet.liveBroadcastContent; 
				
				console.log("new video\nid = "+video_id+"\ncategory = "+category+"\nlive = "+is_live);
				
				if (category == "10" || is_live == "live" ) { 
					if ( localStorage.getItem("thirtysix_music") == "true" || is_live == "live" ) { playbackrate = 1.0 }
					else if ( localStorage.getItem("thirtysix_speed") ) { playbackrate = localStorage.getItem("thirtysix_speed"); }
					else { playbackrate = 1.00; }
					colorcode = "rgba(205, 87, 87, 0.8)";
				} else { 
					if ( localStorage.getItem("thirtysix_speed") ) { playbackrate = localStorage.getItem("thirtysix_speed"); }
					else { playbackrate = 1.00; }
					colorcode = "rgba(50, 121, 168, 0.8)";
				}
				
				new_video(playbackrate);
				
			})
			.catch(function(err) { 
				console.log(err);
				
				if ( localStorage.getItem("thirtysix_speed") ) { playbackrate = localStorage.getItem("thirtysix_speed"); }
				else { playbackrate = 1.00; }
				colorcode = "rgba(255, 0, 0, 0.8)";
				
				new_video(playbackrate);
				
			})

        },1000);
		
    } 
	
	// remove video info box because i dont care about it!
    if ( document.getElementById("clarify-box") !== null ) {
        document.getElementById("clarify-box").parentNode.removeChild(document.getElementById("clarify-box"))
    }
	
	// switch link to /videos of a channel
	var target = ["channel", "user"]
    target.forEach(function(e) {
        if (url.includes("youtube") && url.includes(e)) {
            let anchor = url.indexOf(e);
            let newurl = url.substring(anchor + e.length + 1, url.length);
            
            if ( !newurl.includes("/") && !triggered ) {
                window.stop();
                triggered = true;
                setTimeout(function(){triggered = false;}, 2000);
                setTimeout(function(){window.location.href = newurl + "/videos";}, 100);
            }
        }
    });

}, 500);

/*

    document.querySelectorAll("#text-container .yt-simple-endpoint").forEach( (e) => {

        if ( !e.href.includes("/videos") )
        e.href = e.href + "/videos";

    })

*/
