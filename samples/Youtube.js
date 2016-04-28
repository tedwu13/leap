var player;

function onYouTubeIframeAPIReady() {
    console.log("iframe api ready");
    player = new YT.Player('video-placeholder', {
        width: 600,
        height: 400,
        videoId: 'pt2Wd_e-1nQ',
        playerVars: {
            color: 'white',
            playlist: 'taJ60kskkns,FG0fTKAqZ5g'
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

//PLAY PREVIOUS VIDEO/NEXT VIDEO

