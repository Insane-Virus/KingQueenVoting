function GenerateKey() {
    var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const randomLetters = Array.from({ length: 24 }, () => {
        const randomIndex = Math.floor(Math.random() * letters.length);
        const selectedLetter = letters[randomIndex];
        letters.splice(randomIndex, 1);
        return selectedLetter;
    });
    const randomDigits = Array.from({ length: 8 }, () => {
        const randomIndex = Math.floor(Math.random() * digits.length);
        const selectedDigit = digits[randomIndex];
        // Remove the selected digit from the available pool
        digits.splice(randomIndex, 1);
        return selectedDigit;
    });
    const combinedString = randomLetters.join('') + randomDigits.join('');
    const KEY = combinedString
        .split('')
        .sort(() => Math.random() - 0.5)
        .join('');
    return KEY;
}
var KEY = window.CONFIG.ConstsInEvent.KEY;
function SwapCharInString(InputString, indx1, indx2) {
    const temp = InputString[indx1];
    InputString[indx1] = InputString[indx2];
    InputString[indx2] = temp;
    return InputString;
}

function zero(dd) {
    const MaxValue = 524288;
    const StartValue = 280000;
    const EndValue = 498700;
    const IncPerCount = 243;
    const MaxInc = 900;
    const SpBits = [4, 3, 3, 5, 4];
    SplittedBits = [[], [], [], [], []];
    SplittedInt = [];
    const ind = dd;
    const result = StartValue + (IncPerCount * ind);
    const result1 = result.toString(2);
    result2 = result1.split('').map(Number);
    result2 = SwapCharInString(result2, 1, 13);
    result2 = SwapCharInString(result2, 2, 14);
    result2 = SwapCharInString(result2, 5, 17);
    result2 = SwapCharInString(result2, 6, 18);
    let z = 0;
    for (let x = 0; x < 5; x++) {

        for (let y = 0; y < SpBits[x]; y++) {
            SplittedBits[x][y] = result2[z + y];
        }
        z += SpBits[x];
    }
    for (let x = 0; x < 5; x++) {
        let t = SplittedBits[x].join('');
        SplittedInt[x] = parseInt(t, 2);
    }
    let C = [];
    let counter = 0;
    Array.from(SplittedInt).forEach(val => {
        C[counter] = KEY[val];
        counter++;
    })
    console.log(dd, C.join(''));
    return C.join('');
}

function One(Code) {
    const MaxValue = 524288;
    const StartValue = 280000;
    const EndValue = 498700;
    const IncPerCount = 243;
    const MaxInc = 900;
    const SpBits = [4, 3, 3, 5, 4];
    SplittedBits = [[], [], [], [], []];
    SplittedInt = [];
    const ind = 1;
    let counter = 0;
    Array.from(Code).forEach(val => {
        SplittedInt[counter] = KEY.indexOf(Code[counter]);
        counter++;
    })
    counter = 0;
    Array.from(SplittedInt).forEach(val => {
        let result = SplittedInt[counter].toString(2);
        while (result.length < SpBits[counter]) {
            result = '0' + result;
        }
        SplittedBits[counter] = result.split('').map(Number);
        counter++;
    })
    let combinedArray = [...SplittedBits[0], ...SplittedBits[1], ...SplittedBits[2], ...SplittedBits[3], ...SplittedBits[4]];
    combinedArray = SwapCharInString(combinedArray, 1, 13);
    combinedArray = SwapCharInString(combinedArray, 2, 14);
    combinedArray = SwapCharInString(combinedArray, 5, 17);
    combinedArray = SwapCharInString(combinedArray, 6, 18);
    let result1 = combinedArray.join('');
    result1 = parseInt(result1, 2);
    if (result1 > EndValue || result1 <= StartValue) {
        console.log("invalid Code 1 ");
        return 0;
    }
    result1 -= StartValue;
    if ((result1 % IncPerCount)) {
        console.log("invalid Code 2");
        return 0;
    }
    result1 /= IncPerCount;

    //console.log(result1);
    return result1;
}

function getDataFromDB(VID) {
    const Query_String = `SELECT * FROM votes where VouchID=${VID}`;
    const paramString = encodeURIComponent(Query_String);
    return fetch(`./php/php-mysqli.php?data=${paramString}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

function insertDataToDB(VID, KID, QID) {
    const Query_String = `INSERT INTO votes (VouchID, KID,QID) VALUES (${VID}, ${KID},${QID});`;
    console.log(Query_String);
    const paramString = encodeURIComponent(Query_String);
    return fetch(`./php/php-mysqli.php?data=${paramString}`)
        .then(response => {
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

function getTopInColumn(CID) {
    const Query_String = `SELECT ${CID}, COUNT(*) AS value_count
                            FROM votes
                            GROUP BY ${CID}
                            ORDER BY value_count DESC;`;
    const paramString = encodeURIComponent(Query_String);
    return fetch(`./php/php-mysqli.php?data=${paramString}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}
