'use strict';
const fs = require('fs');
const request = require('request');
const path = require('path');

function onRawRequest(socket) {
   let data = '';
   socket.setEncoding('latin1');
   socket.on('data', (chunk) => (data += chunk));
   socket.on('close', () => {
      if (data != "~HI") {
         console.log(`RAW data to print (${data.length} bytes)`);
         const filename = createZplLabel(data);
         printZplLabel(filename, data);
      }
   });
}

function createZplLabel(data) {
   if (!fs.existsSync('zpl')) {
      fs.mkdirSync('zpl');
   }
   const filename = 'label' + Date.now();
   fs.writeFile(path.join(__dirname,'zpl',filename + '.zpl'), data, function (err) {
      if (err) {
         console.log(err);
      }
   });
   return filename;
}

function printZplLabel(filename, data) {

   const options = {
      encoding: null,
      formData: { file: data },
      headers: { 'Accept': 'application/pdf' },
      url: process.env.LABELARY_API_URL ? process.env.LABELARY_API_URL : 'http://api.labelary.com/v1/printers/8dpmm/labels/4.133858x8.267717/0'
   };

   request.post(options, function (err, resp, body) {
      if (err) {
         return console.log(err);
      }

      if (!fs.existsSync('pdf')) {
         fs.mkdirSync('pdf');
      }
      fs.writeFile(path.join(__dirname, 'pdf',filename + '.pdf'), body, function (err) {
         if (err) {
            console.log(err);
         }
      });
   });
}
module.exports = {
   onRawRequest,
};
