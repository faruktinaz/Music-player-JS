const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const prev = document.querySelector("#controls #prev");
const play = document.querySelector("#controls #play");
const next = document.querySelector("#controls #next");
const duration = document.querySelector("#duration");
const currentTime = document.querySelector("#current-time");
const progressBar = document.querySelector("#progress-bar");
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");
const ul = document.querySelector("ul");


const player = new MusicPlayer(musicList);



window.addEventListener("load", () => {
    let music = player.getMusic();
    displayMusic(music);
    displayMusicList(player.musicList);
    isPlayingNow();
})

function displayMusic(music){
    title.innerText = music.getName();;
    singer.innerText = music.singer;
    image.src = "/img/" + music.img;
    audio.src = "/mp3/" + music.file;
}


play.addEventListener("click", () => {
    const isMusicPlay = container.classList.contains("playing");
    isMusicPlay ? pauseMusic() : playMusic();
})

prev.addEventListener("click", () =>{ prevMusic(); })

next.addEventListener("click",()=>{ nextMusic(); })

const playMusic = () => {
    audio.play();
    container.classList.add("playing");
    play.querySelector("i").classList = "fa-solid fa-pause";

}

const prevMusic = () => {
    player.previous();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingNow();
}

const pauseMusic = () => {
   audio.pause(); 
   container.classList.remove("playing");
   play.querySelector("i").classList = "fa-solid fa-play";

} 
const nextMusic = () => {
    debugger;
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingNow();
}

const calculateTime = (second) =>{
    const dakika = Math.floor(second/60);
    const saniye = Math.floor(second % 60);
    const guncellenenSaniye = saniye < 10 ? `0${saniye}` : `${saniye}`; 
    const sonuc = `${dakika}:${guncellenenSaniye}`;
    return sonuc;
}

audio.addEventListener("loadedmetadata", () => {
    duration.textContent = calculateTime(audio.duration);
    progressBar.max = Math.floor(audio.duration);
});


audio.addEventListener("timeupdate", () => {
    progressBar.value = Math.floor(audio.currentTime);
    currentTime.textContent = calculateTime (progressBar.value);
});


progressBar.addEventListener("input", () => {
    currentTime.textContent = calculateTime(progressBar.value);
    audio.currentTime = progressBar.value;
});

let muteState = "unmuted";
let volumeState;

volumeBar.addEventListener("input", (e) => {
    const value = e.target.value;
    audio.volume = value/100;
    if(value==0){
        unmutedState();
        volumeState = 5;
    }
    else if(value > 0){
        mutedState();
    }
})

volume.addEventListener("click", () => {
    if( muteState === "unmuted"){
        volumeState = volumeBar.value;
        unmutedState();
    }else{
        mutedState();
        volumeBar.value = volumeState;
        audio.volume = volumeState/100;
    } 
})

let unmutedState = () =>{
    audio.muted = true;
    muteState = "muted";
    volume.classList = "fa-solid fa-volume-xmark";
    volumeBar.value = 0;
}
let mutedState = () =>{
    audio.muted = false;
    muteState = "unmuted";
    volume.classList = "fa-solid fa-volume-high";
}

const  displayMusicList = (list) => {
    for(let i = 0; i < list.length; i++){
        let liTag = `
        <li li-index='${i}' onclick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-items-center music-list-select">
            <span>${list[i].getName()}</span>
            <span id = "music-${i}" class="badge bg-primary rounded-pill"></span>
            <audio class="music-${i}" src ="mp3/${list[i].file}"></audio>
        </li>
        `;
        
        ul.insertAdjacentHTML("beforeend",liTag);

        let liAudioDuration = ul.querySelector(`#music-${i}`);
        let liAudioTag = ul.querySelector(`.music-${i}`);

        liAudioTag.addEventListener("loadeddata", () => {
            liAudioDuration.innerText = calculateTime(liAudioTag.duration);
        })
    }
}


const selectedMusic = (li) =>{
    player.index = li.getAttribute("li-index");
    displayMusic(player.getMusic()); 
    playMusic();
    isPlayingNow();
}


const isPlayingNow = () => {
    for(let li of ul.querySelectorAll("li")){
        if(li.classList.contains("playing")){
            li.classList.remove("playing");
        }

        if (li.getAttribute("li-index") == player.index){
            li.classList.add("playing");
        }
    }
}


audio.addEventListener("ended", () => {
    nextMusic();
})