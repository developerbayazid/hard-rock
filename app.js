document.getElementById('search-text').addEventListener('keypress', function(event) {
    if(event.key == 'Enter'){
        document.getElementById('search-button').click();
    }
});

const searchSongs = async() => {
    const searchText = document.getElementById('search-text').value;
    spinnerLoading();
    const url = `https://api.lyrics.ovh/suggest/${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displaySongs(data.data);
}
const displaySongs = songs => {
    const songParentDiv = document.getElementById('song-parent');
    document.getElementById('song-lyrics').innerHTML = ''; 
    songParentDiv.innerHTML = '';
    document.getElementById('error-message').innerHTML = '';
    if(songs.length == 0){
        document.getElementById('error-message').innerText = "Songs not Found!";
    }

    songs.forEach(song => {
        const songChildDiv = document.createElement('div');
        songChildDiv.className = "search-result col-md-8 mx-auto py-4";
        const songContents = `
            <div class="single-result row align-items-center my-3 p-3">
                <div class="col-md-9">
                    <h3 class="lyrics-name">${song.title}</h3>
                    <p class="author lead">Album by <span>${song.artist.name}</span></p>
                    <audio controls>
                        <source src="${song.preview}" type="audio/ogg">
                  </audio> 
                </div>
                <div class="col-md-3 text-md-right text-center">
                    <button onclick="getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
                </div>
            </div>
        `
        songChildDiv.innerHTML = songContents;
        songParentDiv.appendChild(songChildDiv);
        spinnerLoading();
    });
}

const getLyric = async(artist, song) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${song}`;
    const res = await fetch(url);
    const data = await res.json();
    displayLyrics(data.lyrics);
}

const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('song-lyrics');
    if(lyrics == undefined){
        document.getElementById('error-message').innerText = "Lyrics not Found!";
    } else {
        document.getElementById('error-message').innerText = "";
        lyricsDiv.innerText = lyrics;
    }
}

const spinnerLoading = () => {
    const spinner = document.getElementById('spinner-loading');
    const songs = document.getElementById('song-parent');
    spinner.classList.toggle('d-none');
    songs.classList.toggle('d-none');
}