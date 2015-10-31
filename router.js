var express = require('express');
var passport = require('passport');
var router = new express.Router;

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    req.flash('error', 'A kért tartalom megtekintéséhez be kell jelentekzni!');
    res.redirect('/login/login');
}

router.route('/login/login') 
    .get(function (req, res) {
        res.render('login/index', {
            uzenetek: req.flash()
        });
    })
    .post(passport.authenticate('local-login', {
        successRedirect: '/list',
        failureRedirect: '/login/login',
        failureFlash: true,
        badRequestMessage: 'Hibás felhasználó vagy jelszó!'
    }));

router.route('/login/signup')
    .get(function (req, res) {
        res.render('login/signup', {
            uzenetek: req.flash()
        });
    })
    .post(passport.authenticate('local-signup', {
        successRedirect:    '/login/login',
        failureRedirect:    '/login/signup',
        failureFlash:       true,
        badRequestMessage:  'Hiányzó adatok'
    }));

router.use('/login/logout', function (req, res) {
    req.logout();
    res.redirect('/login/login');
});

router.route('/')
    .get(function (req, res){
       res.render('info');
    });
    
router.route('/list')
    .get(ensureAuthenticated, function (req, res) {
        var result;
        if (req.query.kereses) {
            result = req.app.models.subject.find({
                 name: { 'contains': req.query.kereses },
                 user: req.user.id
            });
        } else {
            result = req.app.models.subject.find({
                user: req.user.id
            });
        }
        result
            .then(function (targyak) {
                res.render('list', {
                    targyak: targyak,
                    uzenetek: req.flash()
                });
            })
            .catch(function () {
                console.log('Hiba!!');
                throw 'error';
            });
    });
    
    
router.route('/add')
    .get(ensureAuthenticated,function(req, res) {
        res.render('add', {
           uzenetek: req.flash() 
        });
    })
    .post(ensureAuthenticated, function(req, res){
       req.checkBody('name').notEmpty().withMessage('Nem adtál meg nevet!');
       req.checkBody('leiras').notEmpty().withMessage('Nem adtál meg leírást!');
       req.checkBody('teacher').notEmpty().withMessage('Nem adtál meg oktatót!');
       req.checkBody('credit').isInt().notEmpty().withMessage('Nem, vagy nem jól adtál meg kreditet!');
       
       if (req.validationErrors()) {
            req.validationErrors().forEach(function (error) {
                req.flash('error', error.msg);
            });
            res.redirect('/add');
        } else {
           req.app.models.subject.create({
               name:req.body.name,
               leiras:req.body.leiras,
               teacher:req.body.teacher,
               credit:req.body.credit,
               user:req.user.id
           })
           
            .then(function () {
                req.flash('success', 'Tantárgy sikeresen hozzáadva.');
                res.redirect('/add'); 
            })
            .catch(function () {
                req.flash('error', 'Tantárgy felvétele sikertelen!');
                res.redirect('/add');
            });
        }
    });

router.route('/edit/:id')
    .get(ensureAuthenticated, function(req, res) {
        req.app.models.subject.findOne({
            id:req.params.id
        }).then(function (subject){
            res.render('edit', {
            subject: subject,
            uzenetek: req.flash()
        })
    })
    })
    .post(ensureAuthenticated, function(req, res) {
       req.checkBody('name').notEmpty().withMessage('Nem adtál meg nevet!');
       req.checkBody('leiras').notEmpty().withMessage('Nem adtál meg leírást!');
       req.checkBody('teacher').notEmpty().withMessage('Nem adtál meg oktatót!');
       req.checkBody('credit').isInt().notEmpty().withMessage('Nem, vagy nem jól adtál meg kreditet!');
       
       if (req.validationErrors()) {
            req.validationErrors().forEach(function (error) {
                req.flash('error', error.msg);
            });
            res.redirect('/edit');
        } else {
           req.app.models.subject.update({
              id:req.params.id
           },req.body)
            .then(function (targy) {
                req.flash('success', 'Tantárgy sikeresen módosítva!')
                res.redirect('/list'); 
            })
            .catch(function () {
                req.flash('error', 'Tantárgy módosítás sikertelen!');
                res.redirect('/edit/:id');
            });
        }
    });
    
router.use('/delete/:id', ensureAuthenticated, function (req, res) {
        req.app.models.subject.destroy({ id: req.params.id })
        .then(function () {
            req.flash('success', 'Tantárgy törölve');
            res.redirect('/list'); 
        })
        .catch(function () {
            req.flash('error', 'Tantárgy törlése sikertelen');
            res.redirect('/list');
        });;
    });

router.route('/subject/:id')
    .get(ensureAuthenticated, function (req, res) {
        req.app.models.subject.findOne({
            id: req.params.id
        }).then(function (subject) {
            res.render('subject', {
                subject: subject
            })
        });;
    });

module.exports = router;