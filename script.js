let songBtns = document.querySelectorAll(".cards");

songBtns.forEach((btn) => {
    btn.addEventListener("mouseover", ()=>{
        let deb = btn.querySelector(".play-btn");
        deb.style.visibility = "visible";
    });
    btn.addEventListener("mouseout", () => {
        let deb = btn.querySelector(".play-btn");
        deb.style.visibility = "hidden";
    });
});

let songName = document.querySelector(".songname");
let singerName = document.querySelector(".singername");

let playPausebtn = document.querySelector(".playpause-btn");
let prevbtn = document.querySelector(".prev-btn");
let skipbtn = document.querySelector(".skip-btn");

let seek_slider = document.querySelector(".seek_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let volume_slider = document.querySelector(".volume_slider");

let track_index = 0;
let abhinay = document.querySelectorAll(".sragviPlaytrack");
let abhinayArray = [...abhinay];
abhinay.forEach((btn) => {
    btn.addEventListener("click", () => {
        track_index = abhinayArray.indexOf(btn);
        loadTrack(track_index);
    });
});

let trackContainers = document.querySelectorAll(".trackNamebySragvi");
let trackContainersArray = [...trackContainers];

let sragviPlaysSongButtons = document.querySelectorAll(".sragviPlaysSong");

trackContainersArray.forEach((container) => {
    container.addEventListener("click", () => {
        document.querySelectorAll('.trackName, .playsNumber, .durationNumber').forEach(el => el.classList.remove('active-song'));
        container.querySelector('.trackName').classList.add('active-song');
        container.querySelector('.playsNumber').classList.add('active-song');
        container.querySelector('.durationNumber').classList.add('active-song');
    });
});


let isPlaying = false;
let updateTimer;

let curr_track = document.createElement('audio');

let sragviTrackList = [
    {
        name: "Apsara ali",
        artist: "Parigi Sragvi",
        duration: "01:04",
        plays: "61",
        image: "../Assets/This is Sragvi.png",
        path: "./ApsaraAliBySragvi.mp3"
    },
    {
        name: "Riptide",
        artist: "Parigi Sragvi",
        duration: "01:29",
        plays: "97",
        image: "../Assets/This is Sragvi.png",
        path: "./RiptideBySragvi.mp3"
    },
    {
        name: "Zara zara",
        artist: "Parigi Sragvi",
        duration: "01:25",
        plays: "67",
        image: "../Assets/This is Sragvi.png",
        path: "./ZaraZaraBySragvi.mp3"
    },
    {
        name: "Abhi mujhme kahin",
        artist: "Parigi Sragvi",
        duration: "01:18",
        plays: "115",
        image: "../Assets/This is Sragvi.png",
        path: "./AbhiMujhMeKahiBySragvi.mp3"
    },
    {
        name: "Perfect",
        artist: "Parigi Sragvi",
        duration: "06:39",
        plays: "100",
        image: "../Assets/This is Sragvi.png",
        path: "./PerfectBySragvi.mp3"
    },
    {
        name: "Bohemian Rhapsody",
        artist: "Parigi Sragvi",
        duration: "05:59",
        plays: "175",
        image: "../Assets/This is Sragvi.png",
        path: "./BohemianRapsodyBySragvi.mp3"
    },
    {
        name: "Shallow",
        artist: "Parigi Sragvi ft. Arnav",
        duration: "03:27",
        plays: "131",
        image: "../Assets/This is Sragvi.png",
        path: "./ShallowBySragviAndArnav.mp3"
    },
    {
        name: "Counting Stars",
        artist: "Parigi Sragvi",
        duration: "01:11",
        plays: "73",
        image: "../Assets/This is Sragvi.png",
        path: "./CountingStarsBySragvi.mp3"
    },
    {
        name: "Small part of thinkning loud",
        artist: "Parigi Sragvi",
        duration: "00:27",
        plays: "105",
        image: "../Assets/This is Sragvi.png",
        path: "./SmallPartOfThinkingLoudBySragvi.mp3"
    },
    {
        name: "Inken inkem kavali",
        artist: "Parigi Sragvi",
        duration: "03:19",
        plays: "148",
        image: "../Assets/This is Sragvi.png",
        path: "./InkemInkemKavaliBySragvi.mp3"
    },
    {
        name: "Carnatic music and Arabian nights",
        artist: "Parigi Sragvi",
        duration: "01:17",
        plays: "111",
        image: "../Assets/This is Sragvi.png",
        path: "./CarnatikBySragvi.mp3"
    },
    {
        name: "Teenage Dreams",
        artist: "Parigi Sragvi",
        duration: "00:38",
        plays: "98",
        image: "../Assets/This is Sragvi.png",
        path: "./TeenageDreamsBySragvi.mp3"
    },
    {
        name: "Sweet child of mine",
        artist: "Parigi Sragvi",
        duration: "04:02",
        plays: "169",
        image: "../Assets/This is Sragvi.png",
        path: "./SweetChildOfMineBySragvi.mp3"
    },
    {
        name: "Zaroori tha",
        artist: "Parigi Sragvi",
        duration: "01:13",
        plays: "145",
        image: "../Assets/This is Sragvi.png",
        path: "./ZarooriThaBySragvi.mp3",
    }
];

sragviTrackList.sort((a, b) => {
    if (a.name < b.name) {
        return -1;
    } else if (a.name > b.name) {
        return 1;
    } else {
        return 0;
    }
});

function loadTrack(track_index){
    clearInterval(updateTimer);
    resetValues();

    curr_track.src = sragviTrackList[track_index].path;
    curr_track.load();

    songName.textContent = sragviTrackList[track_index].name;
    singerName.textContent = sragviTrackList[track_index].artist;

    updateTimer = setInterval(seekUpdate, 1000);

    curr_track.addEventListener("ended", nextTrack);
}

function resetValues(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function playPauseTrack(){
    if(!isPlaying) playTrack();
    else pauseTrack();
}

function playTrack(){
    curr_track.play();
    isPlaying = true;

    let deb = playPausebtn.querySelector(".material-icons")
    deb.textContent = "pause";
    let vamsi = document.querySelector(".sragviPlaysSong");
    vamsi.querySelector(".material-symbols-outlined").textContent = "pause";
    let sragviPlaytrackButton = document.querySelectorAll(".sragviPlaytrack");
    let symbol = sragviPlaytrackButton[track_index].querySelector('.material-symbols-outlined');
    symbol.textContent = "pause";
}

function pauseTrack(){
    curr_track.pause();
    isPlaying = false;

    let deb = playPausebtn.querySelector(".material-icons")
    deb.textContent = "play_circle";
    let vamsi = document.querySelector(".sragviPlaysSong");
    vamsi.querySelector(".material-symbols-outlined").textContent = "play_arrow";
    let sragviPlaytrackButton = document.querySelectorAll(".sragviPlaytrack");
    let symbol = sragviPlaytrackButton[track_index].querySelector('.material-symbols-outlined');
    symbol.textContent = "play_arrow";
}

function nextTrack(){
    if(track_index < sragviTrackList.length -1){
        track_index+=1;
    }else{
        track_index=0;
    }

    loadTrack(track_index);
    playTrack();
}

function prevTrack(){
    if(track_index>0){
        track_index-=1;
    }else{
        track_index = sragviTrackList.length -1;
    }

    loadTrack(track_index);
    playTrack();
}

function seekTo(){
    let seekTo = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekTo;
}

function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
    let seekPosition = 0;
    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;
        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

loadTrack(track_index);

let trackBarTrack = document.querySelectorAll(".trackName");
let playNumbers = document.querySelectorAll(".playsNumber");

let idx = 0;

trackBarTrack.forEach((track, idx) => {
    track.textContent = sragviTrackList[idx].name;
    idx++;
});
idx = 0;
playNumbers.forEach((playNumber, idx) => {
    playNumber.textContent = sragviTrackList[idx].plays;
    idx++;
});
idx=0;
let sragvibtn = document.querySelectorAll(".trackNamebySragvi");

sragvibtn.forEach((btn) => {
    btn.addEventListener("mouseover", () => {
        let mrid = btn.querySelector(".sragviPlaytrack");
        mrid.style.visibility = "visible";
    })
});

sragvibtn.forEach((btn) => {
    btn.addEventListener("mouseout", () => {
        let mrid = btn.querySelector(".sragviPlaytrack");
        mrid.style.visibility = "hidden";
    })
});

let sragviDurationvar = document.querySelectorAll(".durationNumber");
sragviDurationvar.forEach((btn) => {
    btn.textContent = sragviTrackList[idx].duration;
    idx++;
});

const currentDate = new Date();
const hours = currentDate.getHours();
let greeting = document.querySelector(".home");
let dynGreeting = greeting.querySelector("h2");
if(hours>=6 && hours<12){
    dynGreeting.textContent = "Good morning";
}else if(hours>=12 && hours<18){
    dynGreeting.textContent = "Good afternoon";
}else{
    dynGreeting.textContent = "Good evening";
}