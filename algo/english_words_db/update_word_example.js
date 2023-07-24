///updare translate example
const mysql = require("mysql");
const axios = require("axios");

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

async function translateText(data) {
  await Promise.all(
    data.map(async (element) => {
      try {
        const response = await axios.request({
          method: "GET",
          url: "https://just-translated.p.rapidapi.com/",
          params: {
            lang: "uz",
            text: String(element.t),
          },
          headers: {
            "X-RapidAPI-Key":
              "b0daa6b4b5mshe195d0534bfed1dp1c0470jsn3ac738645775",
            "X-RapidAPI-Host": "just-translated.p.rapidapi.com",
          },
        });
        if (response.data) {
          element.t = response.data.text[0];
        }
      } catch (error) {
        console.error(error);
      }
    })
  );
  return data;
}

let id = 29;

async function getAndTranslate() {
  console.log(id);
  // Ma'lumotlar bazasidan so'rov yuborish
  const sqlQuery1 = "SELECT `example_rus` FROM `words` WHERE id=" + id;
  await connection.query(sqlQuery1, async (err, result) => {
    if (err) {
      console.error("So'rov yakunlanishida xatolik: ", err);
      return;
    }
    if (result[0].example_rus == null) {
      console.log(result[0]);
      return false;
    }
    let data = JSON.parse(result[0].example_rus);
    data = await translateText(data);
    console.log(data);
    const updateQuery = "UPDATE `words` SET `example_uzb`= ? WHERE id = ?";
    await connection.query(updateQuery, [JSON.stringify(data), id], (err) => {
      if (err) {
        console.error("Tarjima o'zgartirishida xatolik: ", err);
      }
      return true;
    });
  });
}

// Ma'lumotlar bazasidagi tarjimalarni har ikki soniyada o'zgartirish uchun setInterval yordamidan foydalanamiz
const intervalInSeconds = 10;
setInterval(() => {
  if (id == 5001) {
    process.exit();
  }
  id = id + 1;
  getAndTranslate();
}, intervalInSeconds * 1000);

// connection.end((err) => {
//   if (err) {
//     console.error("Ulanishni yopishda xatolik: ", err);
//     return;
//   }
//   console.log(
//     "Ma'lumotlar bazasi bilan muvaffaqiyatli ravishda aloqa yopildi!"
//   );
// });
