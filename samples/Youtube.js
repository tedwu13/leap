var player;

function onYouTubeIframeAPIReady() {
    console.log("iframe api ready");
    player = new YT.Player('video-placeholder', {
        width: 600,
        height: 400,
        videoId: 'TtgZb0uGUGI',
        playerVars: {
            color: 'white',
            playlist: 'IyTv_SR2uUo, BdQce4ovifU'
        }
    });
}

// Play button 

$('#play').click(function() {
    player.playVideo();
});

// Pause button
$('#pause').click(function() {
    player.pauseVideo();
});

$('#mute-toggle').click(function() {
    if(player.isMuted()) {
        player.unMute();
    }
    else {
        player.mute();
    }
});

$('#volume-input').on('change', function() {
    player.setVolume($(this).val());
})


//to do:

//Gestures: key tap, extend fingers/fist, move x direction, circle 

//PLAY PREVIOUS VIDEO/NEXT VIDEO (swipe right/swip left )
//PLAY FASTER/SLOWER (speed)

