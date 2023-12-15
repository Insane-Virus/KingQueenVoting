// config.js
//console.log("config loaded");
const config = {
    EventName: 'King & Queen Selection',
    ConstsInEvent: {
        //replace the Key from GenerateCode.html; 
        //Key should only be changed on different Events(Festivals)
        KEY:"L9Z4V13PRO6Q7S2HGAJBNTFXUKIMC5EW",
        MasterCODE:900,
    },

    KINGS: [
        { id: 0, name: 'Not Vote Yet' ,pcards:0, major: 'None'        , fb:"#",insta:"#",hobby: 'None' },
        { id: 1, name: 'Gong Yoo'        ,pcards:4, major: 'Acting', fb:"#",insta:"#",hobby: '#' },
        { id: 2, name: 'Lee Dong wook'       ,pcards:3, major: 'Acting', fb:"#",insta:"#",hobby: '#' },
        { id: 3, name: 'Chris Hemsworth'           ,pcards:3, major: 'Acting', fb:"#",insta:"#",hobby: '#' }
    ],
    QUEENS: [
        { id: 0, name: 'Not Vote Yet',pcards:0, major: 'None', fb:"#",insta:"#",hobby: 'None' },
        { id: 1, name: 'Kim Jisoo'   ,pcards:4, major: 'IDOL', fb:"#",insta:"#",hobby: 'Going Nuts' },
        { id: 2, name: 'Irene'       ,pcards:4, major: 'IDOL', fb:"#",insta:"#",hobby: '#' },
        { id: 3, name: 'Shin Yuna'   ,pcards:4, major: 'IDOL', fb:"#",insta:"#",hobby: '#' },
        { id: 4, name: 'Myoui Mina'  ,pcards:4, major: 'IDOL', fb:"#",insta:"#",hobby: 'Ballet' }
        
    ],
    misc: {

    }
};

export default config;
