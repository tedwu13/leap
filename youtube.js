var player;

function onYouTubeIframeAPIReady() {
    console.log("iframe api ready");
    player = new YT.Player('video-placeholder', {
        width: 600,
        height: 400,
        videoId: 'Xa0Q0J5tOP0',
        playerVars: {
            color: 'white',
            playlist: 'taJ60kskkns,FG0fTKAqZ5g'
        }
    });
}

// Playback

$('#play').click(function() {
    console.log("play button clicked");
    player.playVideo();
});

$('#pause').click(function() {
    console.log("pause button clicked");
    player.pauseVideo();
});
