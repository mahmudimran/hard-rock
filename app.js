const searchSongs = () =>{
    const searchText = document.getElementById('search-field').value;
    url =  `https://api.lyrics.ovh/suggest/${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => displaySongs(data.data))
    .catch(error => displayError('Something Went Wrong !! Please Try Again later'))

}

const displaySongs = songs => {
    const songsContainer = document.getElementById('songs-container');
    songs.forEach(song => {
    
        // console.log(song)
        const songsDiv = document.createElement("div");
        songsDiv.className ='single-result row align-items-center my-3 p-3';
        songsDiv.innerHTML = `<div class="col-md-8">
        <h3 class="lyrics-name">${song.title}</h3>
        <p class="author lead">Album by <span>${song.artist.name}</span></p>
        <p class="author lead">Album by ID <span>${song.id}</span></p>
        <audio controls>
            <source src= ${song.preview} type="audio/mpeg">
        </audio>
        <br>
        <button onclick="getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        <div class="col-md-4 mt-3 text-md-right text-center">
        <img class="img-thumbnail" src="${song.album.cover}">
        </div>`;       
        songsContainer.appendChild(songsDiv);

    })

}

const getLyrics = (artist,title) =>{
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
  
        fetch(url)
        .then(res=>res.json())
        .then(data=> displayLyrics(data.lyrics))
   

}

const displayLyrics = lyrics =>{
    const lyricsDiv = document.getElementById("display-lyrics");
    lyricsDiv.innerText = lyrics;
}

const displayError = error =>{
    const errorTag = document.getElementById('error-meassage');
    errorTag.innerText = error;
}