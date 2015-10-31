var Waterline = require('waterline');

module.exports = Waterline.Collection.extend({
   identity: 'subject',
   connection: 'disk',
   attributes: {
       
       name: {
           type: 'string',
           required: true,
       },
       
       leiras: {
           type: 'string',
       },
       
       teacher: {
            type: 'string'  
       },
       
       credit: {
           type: 'int'
       },
 
       user: {
            model: 'user'  
       }
   }
});