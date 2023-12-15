function fInit() {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedData = urlParams.get('code');
    const CODE = decodeURIComponent(encodedData);
    (One(CODE) === window.CONFIG.ConstsInEvent.MasterCODE) ? null : window.location.href = `index.html`;
    fRefresh();
}
async function fRefresh() {
    document.querySelector(".ff .refresh").classList.toggle('rotate-image');
    var Kings = await getTopInColumn('KID');
    var vties = fFindTies(Kings);
    var ElementString = "";
    let i = 0;
    for (let x = 0; x < vties.length; x++) {
        for (let y = 0; y < vties[x]; y++) {
            ElementString += `<div id="i${x + 1}" class ="Profile">
                            <img src="Media/Images/King/${parseInt(Kings[i].KID, 10)}/1.jpg">
                            <div class="BL"><h3>#${x + 1} <span>${Kings[i].value_count} Votes</span></h3>
                            <h5>Name - ${window.CONFIG.KINGS[parseInt(Kings[i].KID, 10)].name} | Major - ${window.CONFIG.KINGS[parseInt(Kings[i].KID, 10)].major}  </h5>
                            </div>
                            </div>`;
            i++;
        }
    }
    var MaleDIV = document.querySelector('.Males');
    MaleDIV.innerHTML = ElementString;

    var Queens = await getTopInColumn('QID');
    vties = fFindTies(Queens);
    ElementString = "";
    i = 0;
    for (let x = 0; x < vties.length; x++) {
        for (let y = 0; y < vties[x]; y++) {
            ElementString += `<div id="i${x + 1}" class ="Profile">
                            <img src="Media/Images/Queen/${parseInt(Queens[i].QID, 10)}/1.jpg">
                            <div class="BL"><h3>#${x + 1}<span>${Queens[i].value_count} Votes</span></h3>
                            <h5>Name - ${window.CONFIG.QUEENS[parseInt(Queens[i].QID, 10)].name} | Major - ${window.CONFIG.QUEENS[parseInt(Queens[i].QID, 10)].major}  </h5>
                            </div>
                            </div>`;
            i++;
        }
    }
    var FemaleDIV = document.querySelector('.Females');
    FemaleDIV.innerHTML = ElementString;
    document.querySelector(".ff .refresh").classList.toggle('rotate-image');
}

function fFindTies(array) {
    const countMap = new Map();
    var PTies = [];
    var pos = -1;
    var ties = 1;
    for (const obj of array) {
        const valueCount = obj.value_count;

        if (countMap.has(valueCount)) {
            PTies[pos] += 1;
        } else {
            countMap.set(valueCount, true);
            pos += 1;
            PTies[pos] = 1;
            ties = 1;
        }
    }
    return PTies;
}
