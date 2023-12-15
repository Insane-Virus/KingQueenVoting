
const urlParams = new URLSearchParams(window.location.search);
const encodedData = urlParams.get('code');
const CODE = decodeURIComponent(encodedData);
var isVisiting = 1;
let PreviousData = [];
let ChoseKing = 0;
let ChoseQueen = 0;
let SelectedRole = 0;
//ProfileSwiper Init
var ProfileSwiper = new Swiper(".ProfileSwiper", {
    spaceBetween: 30,
    effect: "creative",
    creativeEffect: {
        prev: {
            translate: ['-150%', 0, -400],
        },
        next: {
            translate: ['120%', 0, 0],
        },
    },
    grabCursor: true,
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
    },
});
//PhotoSwiper Init
var PhotoSwiper = new Swiper(".PhotoSwiper", {
    direction: "vertical",
    grabCursor: true,
    aspectRatio: 1 / 1,
    spaceBetween: 10,
    effect: "flip",
    pagination: {
        el: ".PhotoPagination",
        dynamicBullets: true,
    },
});

async function fInitialization() {
    let isValid = One(CODE);
    (isValid) ? null : window.location.href = `index.html`;

    PreviousData = await getDataFromDB(One(CODE));
    (PreviousData.length === 0) ? isVisiting = 0 : isVisiting = 1;
    if (isVisiting) {
        ChoseKing = parseInt(PreviousData[0].KID,10);
        ChoseQueen = parseInt(PreviousData[0].QID,10);
    }
    fOpenTab(0);
}
var ROLES = ['KINGS', 'QUEENS'];
var MediaLocs = ['King', 'Queen'];

function fOpenTab(WhichRole) {
    SelectedRole = WhichRole;
    ActiveTab();
    fCheckProfileSwiperSlides(window.CONFIG[ROLES[WhichRole]].length - 1);
    fUpdateSlides();
}

function fCheckProfileSwiperSlides(NoOfContent) {
    const NewSlide = '<div class="swiper-slide"></div>';
    let AvailableSlides = document.querySelectorAll(`.ProfileSwiper .swiper-wrapper .swiper-slide:not(.PhotoSwiper .swiper-wrapper .swiper-slide)`);
    if (NoOfContent > AvailableSlides.length) {
        let i = 1;
        let SlidesToCreate = NoOfContent - AvailableSlides.length;
        while (i <= SlidesToCreate) {
            ProfileSwiper.appendSlide(NewSlide);
            i++;
        }
    }
    if (NoOfContent < AvailableSlides.length) {
        let SlidesToRemove = AvailableSlides.length - NoOfContent;
        let i = 1;
        while (i <= SlidesToRemove) {
            ProfileSwiper.removeSlide(AvailableSlides.length - i);
            i++;
        }
    }
}

function fUpdateSlides() {
    var VotedInd = 0;
    if(!SelectedRole && ChoseKing){
        VotedInd = ChoseKing;
    }
    if(SelectedRole && ChoseQueen){
        VotedInd = ChoseQueen;
    }
    let AvailableSlides = document.querySelectorAll(`.ProfileSwiper .swiper-wrapper .swiper-slide:not(.PhotoSwiper .swiper-wrapper .swiper-slide)`);
    AvailableSlides.forEach((Slide, index) => {
        Slide.classList.contains('votedcard') ? Slide.classList.toggle('votedcard') : null;
        if(VotedInd === (index+1))
        {
            Slide.classList.toggle('votedcard');
        }
        
        var NPhotos = window.CONFIG[ROLES[SelectedRole]][index + 1].pcards;
        var tempString = "";
        for (let i = 1; i <= NPhotos; i++) {
            tempString += `<img class="swiper-slide" src="Media/Images/${MediaLocs[SelectedRole]}/${index + 1}/${i}.jpg"></img>`
        }
        var isVotedBTN = [`<button class="VoteBTN" onclick="fVote(event,${index+1})">Vote</button>`,'',`<button class="VoteBTN TabRolePressed" disabled="true" onclick="fVote(event,${index+1})">Voted</button>`]
        Slide.innerHTML = `<h3>King & Queen <br> Crowning Glory Competition </h3>
                            <div class="PhotoSwiper">
                                <div class="swiper-wrapper">
                                ${tempString}
                                </div> 
                                <div class="PhotoPagination"></div>
                            </div>
                            <p>Name - ${window.CONFIG[ROLES[SelectedRole]][index + 1].name}<br> Major - ${window.CONFIG[ROLES[SelectedRole]][index + 1].major}<br> Hobby - ${window.CONFIG[ROLES[SelectedRole]][index + 1].hobby}<br></p>
                            <div class="Actions">
                                <img src="Media/Images/fb.png" onclick="openNewTab('${window.CONFIG[ROLES[SelectedRole]][index + 1].fb}')">
                                <img src="Media/Images/insta.png" onclick="openNewTab('${window.CONFIG[ROLES[SelectedRole]][index + 1].insta}')">
                                ${(VotedInd)?isVotedBTN[1]:isVotedBTN[0]}${(VotedInd === (index+1))?isVotedBTN[2]:isVotedBTN[1]}
                            </div>`;
    });
    ReInitializePhotoSwiper();
    (SelectedRole)?ProfileSwiper.slideTo(ChoseQueen-1):ProfileSwiper.slideTo(ChoseKing-1);
}
function ReInitializePhotoSwiper() {
    PhotoSwiper = new Swiper(".PhotoSwiper", {
        direction: "vertical",
        grabCursor: true,
        aspectRatio: 1 / 1,
        spaceBetween: 10,
        effect: "flip",
        pagination: {
            el: ".PhotoPagination",
            dynamicBullets: true,
        },
    });
}
function ActiveTab() {
    var TabBTNs = document.querySelectorAll('.TabContainer .TabRole');
    TabBTNs.forEach((btn) => {
        btn.classList.contains('TabRolePressed') ? btn.classList.toggle('TabRolePressed') : null;
    });
    TabBTNs[SelectedRole].classList.toggle('TabRolePressed');
}
async function fVote(event,ID)
{
    if(!ChoseKing ||!ChoseQueen)
    {
        event.currentTarget.classList.toggle('TabRolePressed');
        event.currentTarget.innerText = 'Voted';
        event.currentTarget.disabled = true;
        event.currentTarget.parentNode.parentNode.classList.toggle('votedcard');
        var AllVoteBtns = document.querySelectorAll('.VoteBTN');
        AllVoteBtns.forEach((btn) => {
            if (!btn.classList.contains('TabRolePressed')) {
                btn.parentNode.removeChild(btn);
            }
        });
        if(!SelectedRole&&!ChoseKing){
            ChoseKing=ProfileSwiper.activeIndex+1;
            if(!ChoseQueen)
            {
                return fOpenTab(1);
            }
        }
        if(SelectedRole&&!ChoseQueen){
            ChoseQueen=ProfileSwiper.activeIndex+1;
            if(!ChoseKing)
            {
                return fOpenTab(0);
            }
        }
    }
    if(ChoseKing&&ChoseQueen)
    {
        if (confirm(`Your Votes \n King : ${window.CONFIG.KINGS[ChoseKing].name} \n Queen : ${window.CONFIG.QUEENS[ChoseQueen].name}\n Are you sure you want to proceed?`)) {
            await insertDataToDB(One(CODE), ChoseKing, ChoseQueen);
        } else {
            ChoseKing = 0;
            ChoseQueen = 0;
            fOpenTab(0);
        }
    }
    
}