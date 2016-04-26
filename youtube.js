var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('video-placeholder', {
        width: 600,
        height: 400,
        videoId: 'Xa0Q0J5tOP0',
        playerVars: {
            color: 'white',
            playlist: 'taJ60kskkns,FG0fTKAqZ5g'
        },
        events: {
            onReady: initialize
        }
    });
}

function initialize() {
    // // Update the controls on load
    //     updateProgressBar();

    //     // Clear any old interval.
    //     clearInterval(time_update_interval);

    //     // Start interval to update elapsed time display and
    //     // the elapsed part of the progress bar every second.
    //     time_update_interval = setInterval(function () {
    //         updateProgressBar();
    //     }, 1000)

}


$('#play').on('click', function () {

    player.playVideo();

});
