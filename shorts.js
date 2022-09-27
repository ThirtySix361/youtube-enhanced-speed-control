
document.querySelectorAll("video").forEach(function(video){ 
    video.addEventListener('playing', (event) => {
        if ( location.href.includes("/shorts/") ) {
            if ( window.storedpathname != event.target.duration || !window.storedpathname || window.paused ) {
                // setup video
                window.paused = false;
                storedpathname = event.target.duration;
                console.log("video", event.target.duration, event.target.baseURI);
                setTimeout(function(){ event.target.controls = true; }, 250)
                document.querySelectorAll("#overlay, #actions").forEach(function(e){ e.remove() })
            } else if ( !window.new ) {
                // goto new video
                console.log("new");
                window.new = true;
                setTimeout(function(){ window.new = false; }, 500)
                document.querySelector("button[aria-label='Nächstes Video']").click();
            }
        }
    });
});

document.querySelectorAll("video").forEach(function(video){ 
    video.addEventListener('pause', (event) => {
        if ( location.href.includes("/shorts/") ) {
            window.paused = true;
            console.log("pause");
            setTimeout(function(){ event.target.controls = true; }, 250)
        }
    });
});

document.querySelectorAll("video").forEach(function(video){ 
    video.addEventListener('ended', (event) => {
        console.log("ended");
        document.querySelector("button[aria-label='Nächstes Video']").click();
    });
});
