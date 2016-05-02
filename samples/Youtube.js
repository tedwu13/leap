var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('video-placeholder', {
        width: 600,
        height: 400,
        videoId: '8ATu1BiOPZA',
        playerVars: {
            color: 'white',
            playlist: 'IyTv_SR2uUo, BdQce4ovifU, CwPdtMWdQIM, kzDyx_dLrhc, Nj-36jra4mQ,cRTIOhmRccE'
        }
    });
}


