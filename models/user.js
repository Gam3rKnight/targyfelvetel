var Waterline = require('waterline');
var bcrypt = require('bcryptjs');

module.exports = Waterline.Collection.extend({
   identity: 'user',
   connection: 'disk',
   attributes: {
        neptun: {
            type: 'string',
            required: true,
            unique: true,
        },
      
        password: {
            type: 'string',
            required: true,
        },
       
        surname: {
            type: 'string',
            required: true,
        }, 
       
        forename: {
            type: 'string',
            required: true,
        },
       
        subjects: {
            collection: 'subject',
            via: 'user'
        },
       
        validPassword: function(password){
            return bcrypt.compareSync(password, this.password);
        }
    },
    beforeCreate: function(values, next){
        bcrypt.hash(values.password, 10, function(err, hash){
            if(err){
                return next(err);
            } 
            values.password = hash;
            next();
        });
    }
});