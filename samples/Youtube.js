var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('video-placeholder', {
        width: 600,
        height: 400,
        videoId: '8ATu1BiOPZA',
        playerVars: {
            color: 'white',
            playlist: 'IyTv_SR2uUo'
        }
    });
}


