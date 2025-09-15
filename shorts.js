
function showControls(event) {
    setTimeout(function(){ event.target.controls = true; }, 500)
}

function removeOverlay() {
    document.querySelectorAll("#overlay, #actions").forEach(function(e){ e.remove() })
}

function nextVideo() {
    document.querySelector("button[aria-label='Nächstes Video']").click();
}

function nextVideoTimeout(nowSec, endSec) {
    clearTimeout(window.waitTillNextVideo);
    window.waitTillNextVideo = setTimeout(nextVideo, endSec*1000 - nowSec*1000)
}

function logVideo(reason, event) {
    console.log(reason, event.target.duration, event.target.baseURI);
}

function videoPlaying(event) {
    removeOverlay()
    showControls(event)
    logVideo("playing", event)
    nextVideoTimeout(event.target.currentTime, event.target.duration)
}

function videoPaused(event) {
    showControls(event)
	clearTimeout(window.waitTillNextVideo);
    logVideo("paused", event)
}

function videoEnd(event) {
    logVideo("ended", event)
}

document.querySelectorAll("video").forEach(function(video){ 
    if ( location.href.includes("/shorts/") ) {
        video.addEventListener('playing', videoPlaying);
        video.addEventListener('pause', videoPaused);
        video.addEventListener('ended', videoEnd);
    }
});
