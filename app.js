const searchSong = async ()=>{
    const searchText = document.getElementById("search-field").value;
    const url = ` https://api.lyrics.ovh/suggest/${searchText}`;
    toggleSpinner();

    try{
        const res = await fetch(url);
        const data = await res.json();
        displaySongs(data.data);
    }
    catch(error){
        console.log(error);
    }

    
    
    // fetch(url)
    // .then(res=> res.json())
    // .then(data => displaySongs(data.data));
}

var searchBtn = document.getElementById("search-button");
var searchTxt = document.getElementById("search-field");

searchTxt.addEventListener("keypress", function(event) {   
    if (event.key === 'Enter'){
        searchBtn.click();
    }
    
});

const displaySongs = songs =>{
    const songContianer = document.getElementById("song-container") 
    songContianer.innerHTML = '';


    songs.forEach(song=> {
        const songDiv = document.createElement('div');
        songDiv.className = 'search-result col-md-8 mx-auto py-4';
        songDiv.innerHTML = `
        <div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                    <source src="${song.preview}" type="audio/ogg">                    
                </audio>

            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyric('${song.artist.name}', '${song.title}' )" class="btn btn-success">Get Lyrics</button>
            </div>
        </div>
        `
        songContianer.appendChild(songDiv);
        toggleSpinner();

    })
}

const getLyric = async (artist, title) => {
    const url = ` https://api.lyrics.ovh/v1/${artist}/${title}`

    try{
        const res = await fetch(url);
        const data = await res.json();
        displayLyrics(data.lyrics);
    }
    
    catch(error){
        console.log(error);
    }

    // fetch(url)
    // .then(res => res.json())
    // .then(data => displayLyrics(data.lyrics))
}

const displayLyrics = lyrics =>{
    const lyricsDiv = document.getElementById("song-lyrics");
    lyricsDiv.innerText = lyrics;    
}

const toggleSpinner = () =>{
    const spinner = document.getElementById("loading-spinner");
    const songs = document.getElementById("song-container");
    spinner.classList.toggle('d-none');
    songs.classList.toggle('d-none');
}