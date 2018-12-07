var Midtrans = require('midtrans-nodex');

exports.midtrans = new Midtrans({
    "clientKey": process.env.MIDTRANS_CLIENT_KEY || "SB-Mid-client-I5tBe40D29Tq-bgl",
    "serverKey": process.env.MIDTRANS_SERVER_KEY || "SB-Mid-server-SWOBHsvy4C7tfR6kZ3ntEXHr",
    "isProduction": (process.env.MIDTRANS_IS_PRODUCTION == 'true') || false
});
//testing midtrans-----------------------------------------------------------
// const Midtrans = require('midtrans-nodex');
// const mds = new Midtrans({
//     "clientKey": "SB-Mid-client-I5tBe40D29Tq-bgl",
//     "serverKey": "SB-Mid-server-SWOBHsvy4C7tfR6kZ3ntEXHr",
//     "isProduction": false
// });
// mds.transaction.status('ORDER-101-1527703882032')
// .then((res) => {
//   console.log(res.data);
// })
// .catch((err) => {
//   console.log(err);
// });

// const payload = {
//     "transaction_details": {
//         "order_id": "ORDER-102",
//         "gross_amount": 10000
//     }
// };
// mds.snap.transactions(payload)
//     .then((token) => {
//         console.log(token);
//     })
//     .catch((err) => {
//         console.log(err);
//     });
//testing midtrans-----------------------------------------------------------
