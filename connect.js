const token = "fac18590858c49df46da8c9d44f40e0c";
const http = require("http");

let json = "";

http
  .get(
    "http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=placebo&api_key=fac18590858c49df46da8c9d44f40e0c&format=json",
    (res) => {
      let data = "";
      let results = '';
      let listeners = 0;

      res.on("data", (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      res.on("end", () => {
        data = JSON.parse(data);
        results = data.results;
        listeners = results.artistmatches.artist[0].listeners;

        console.log(listeners);
      });
    }
  )
  .on("error", (err) => {
    console.log("error");
  });
