//read sql words then translate words then write words translated

const mysql = require("mysql");
const axios = require("axios");

// Ma'lumotlar bazasiga ulanish uchun konfiguratsiya
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "english_words",
});

// Ma'lumotlar bazasiga ulanish
connection.connect((err) => {
  if (err) {
    console.error("Xatolik yuz berdi: ", err);
    return;
  }
  console.log("Ma'lumotlar bazasiga muvaffaqiyatli ulanildi!");
});

// const transData = [];
let id = 2967; //1622; 

async function getAndTranslate() {
    console.log(id);
    // Ma'lumotlar bazasidan so'rov yuborish
    const sqlQuery1 = "SELECT `id`, `name` FROM `words` WHERE id="+id;
    await connection.query(sqlQuery1, async (err, result) => {
      if (err) {
        console.error("So'rov yakunlanishida xatolik: ", err);
        return;
      }
    //   console.log(result[0].name);
      try {
        const response = await axios.request({
            method: "GET",
            url: "https://just-translated.p.rapidapi.com/",
            params: {
              lang: "uz",
              text: String(result[0].name),
            },
            headers: {
              "X-RapidAPI-Key": "b0daa6b4b5mshe195d0534bfed1dp1c0470jsn3ac738645775",
              "X-RapidAPI-Host": "just-translated.p.rapidapi.com",
            },
          });
        console.log("eng: "+ result[0].name +", uzb: "+ response.data.text[0]);
        if(response.data.text[0]){
            const updateQuery = 'UPDATE `words` SET `uzb`= ? WHERE id = ?';
            // const updateQuery = "UPDATE  SET ='"+response.data.text[0]+"]' WHERE id="+id;
            await connection.query(updateQuery, [response.data.text[0], id], (err) => {
                if (err) {
                    console.error('Tarjima o\'zgartirishida xatolik: ', err);
                }
                return true;
            });
        }
      } catch (error) {
        console.error(error);
      }
      

    //   connection.end((err) => {
    //     if (err) {
    //       console.error("Ulanishni yopishda xatolik: ", err);
    //       return;
    //     }
    //     console.log(
    //       "Ma'lumotlar bazasi bilan muvaffaqiyatli ravishda aloqa yopildi!"
    //     );
    //   });

    });

}

// Ma'lumotlar bazasidagi tarjimalarni har ikki soniyada o'zgartirish uchun setInterval yordamidan foydalanamiz
const intervalInSeconds = 6; 
setInterval(() => {
  if(id==5000) {
    process.exit()
  }
    id=id+1;
    getAndTranslate();
}, intervalInSeconds * 1000);