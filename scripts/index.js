

let CodeFilled = 0;
let MSGText = document.getElementById("WarningMessageText");
let CreateBTN = document.getElementById("dBtn");

async function moveToNextInput(event, InputID) {
    event.target.value = event.target.value.toUpperCase();
    const setBit = (BitPos) => {
        CodeFilled |= 1 << BitPos;
    };

    if (event.target.value.length === 1) {
        setBit(InputID);
        const nextInput = event.target.nextElementSibling;
        CheckCode();

        if (nextInput) {
            nextInput.disabled = false;
            nextInput.focus();
        }
    }
}

async function CheckCode() {
    MSGText.classlist = [];
    MSGText.innerHTML = "";
    CreateBTN.innerHTML= "";
    if (CodeFilled === 0b11111) {
        const inputs = document.getElementsByClassName('UniqueCode');
        let CODE = "";
        Array.from(inputs).forEach(input => {
            CODE += input.value;
        });
        let isValid = One(CODE);
        
        var encodedValue = encodeURIComponent(CODE);
        if(isValid === window.CONFIG.ConstsInEvent.MasterCODE){
            window.location.href = `Livescore.html?code=${encodedValue}`;
        }
        else if(isValid === 0) {
            MSGText.innerHTML = '<span class="TSCodeRed">Invalid Code.</span>';
        }
        else {
            let DataFromDB = await getDataFromDB(One(CODE));
            if (DataFromDB.length === 0) {
                MSGText.innerHTML = '<span class="TSCodeGreen">Proceeding...</span>';
                window.location.href = `voting.html?code=${encodedValue}`;
            }
            else {
                MSGText.innerHTML = `The <span class="TSCodeRed">CODE</span> already been used to Vote. <br>
                                        King : ${window.CONFIG.KINGS[DataFromDB[0].KID].name} <br>
                                        Queen : ${window.CONFIG.QUEENS[DataFromDB[0].QID].name} <br>
                                     Visit the Voting page anyway?`;
                CreateBTN.innerHTML = '<button class="BTNVisit">Yes</button>';
                CreateBTN.firstChild.addEventListener('click', function () {
                    window.location.href = `voting.html?code=${encodedValue}`;
                });
            }
        }

    }
}
