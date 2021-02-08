const rp = require("request-promise");
const $ = require("cheerio");
const url = "http://rate.am/en/armenian-dram-exchange-rates/banks/non-cash";

const TABLE_ROW_IDS = [
  "69460818-02ec-456e-8d09-8eeff6494bce",
  "0fffdcc4-8e36-49f3-9863-93ad02ce6541",
  "65351947-217c-4593-9011-941b88ee7baf",
  "8e9bd4c8-6f4a-4663-ae86-b8fbaf295030",
  "ebd241ce-4a38-45a4-9bcd-c6e607079706",
  "466fe84c-197f-4174-bc97-e1dc7960edc7",
  "5ee70183-87fe-4799-802e-ef7f5e7323db",
  "f3ffb6cf-dbb6-4d43-b49c-f6d71350d7fb",
  "b5bb13d2-8a79-43a8-a538-ffd1e2e21009",
  "db08ff22-add9-45ea-a450-1fe5b1993704",
  "2119a3f1-b233-4254-a450-304a2a5bff19",
  "989ba942-a5cf-4fc2-b62e-3248c4edfbbc",
  "e1a68c2e-bc47-4f58-afd2-3b80a8465b14",
  "332c7078-97ad-4bf7-b8ee-44d85a9c88d1",
  "133240fd-5910-421d-b417-5a9cedd5f5f7",
];

exports.rateScrapper = () => {
  return rp(url)
    .then((url) => {
      let resultsArr = [];
      for (let i = 0; i < TABLE_ROW_IDS.length; i++) {
        let currencyArr = [];
        let bankName = $(
          `tbody > tr[id=${TABLE_ROW_IDS[i]}] > td:nth-child(2) > a`,
          url
        ).text();

        for (let j = 6; j <= 13; j++) {
          currencyArr.push(
            $(
              `tbody > tr[id=${TABLE_ROW_IDS[i]}] > td:nth-child(${j})`,
              url
            ).text()
          );
        }
        //console.log("cur", currencyArr);
        resultsArr.push({
          bankName,
          USD: { buy: currencyArr[0], sell: currencyArr[1] },
          EUR: { buy: currencyArr[2], sell: currencyArr[3] },
          RUB: { buy: currencyArr[4], sell: currencyArr[5] },
          GBP: { buy: currencyArr[6], sell: currencyArr[7] },
        });
      }
      return resultsArr;
    })
    .catch((error) => {
      console.log(error);
    });
};
