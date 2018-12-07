var nodemailer = require('nodemailer');

/*mail setting----------------------------------------------------------*/
exports.transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST || 'mail.fiture.id',
    port: process.env.MAIL_PORT || 587,
    secure: false,
    requireTLS: true, // only use if the server really does support TLS
    tls: {
        rejectUnauthorized: false
    },
    auth: {
        user: process.env.MAIL_USER || 'admin@fiture.id', // generated ethereal user
        pass: process.env.MAIL_PASS || 'Fiture123$#'  // generated ethereal password
    }
});
/*mail setting----------------------------------------------------------*/