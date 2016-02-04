var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET gestion reservation page. */
router.get('/', function(req, res, next) {
	res.render('reservation', {});
});

/* GET gestion reservation view page. */
router.get('/view', function(req, res, next) {
        res.render('reservation-view', {});
});

/* POST gestion reservation view . */
router.post('/view', function(req, res, next) {
	mongoose.model('reservationCroc')
		.find({
			servi : false
		})
		.sort({
			heure : 1,
			date : 1
		})
		.limit(5)
		.exec(
			function(err , reservs){
			res.send(JSON.stringify(reservs));
		});
});


/* GET gestion reservation add page. */
router.post('/add', function(req, res, next) { 
	var commande = JSON.parse(req.body.commande);
		
	if(typeof commande === "object"){
		if(typeof commande.menu === "number"){
			var resCroc = new (mongoose.model('reservationCroc'));
			
			resCroc.acheteur = commande.name || "John Doe";
			
			resCroc.menu = commande.menu;
			if (resCroc.menu == 0) {
				if(typeof commande.croc1 === "object" 
				&& typeof commande.croc2 ===  "object"){
					if(typeof commande.croc1.nature === "boolean"
					&& typeof commande.croc1.jambon === "boolean"
					&& typeof commande.croc1.tomate === "boolean"
					&& typeof commande.croc2.nature === "boolean"
					&& typeof commande.croc2.jambon === "boolean"
					&& typeof commande.croc2.tomate === "boolean"){
						
						resCroc.croc1.nature = commande.croc1.nature;
						resCroc.croc1.jambon = commande.croc1.jambon;
						resCroc.croc1.tomate = commande.croc1.tomate;
						resCroc.croc2.nature = commande.croc2.nature;
						resCroc.croc2.jambon = commande.croc2.jambon;
						resCroc.croc2.tomate = commande.croc2.tomate;
						resCroc.heure = commande.heure;
						resCroc.prix = 230;
						resCroc.save();
						
						res.send('ok');
					}
				}
			}
			else if (resCroc.menu == 1){
				if(typeof commande.nature === "boolean"
				&& typeof commande.jambon === "boolean"
				&& typeof commande.tomate === "boolean"){
					
					resCroc.croc1.nature = commande.nature;
					resCroc.croc1.jambon = commande.jambon;
					resCroc.croc1.tomate = commande.tomate;
					resCroc.heure = commande.heure;
					resCroc.prix = 100;
					
					resCroc.save();
					
					res.send('ok');
				}
			}
			else {
				if(typeof commande.banane === "boolean"
				&& typeof commande.poire === "boolean"){
					
					resCroc.croc1.tomate = commande.banane;
					resCroc.croc2.tomate = commande.poire;
					resCroc.heure = 59;
					resCroc.prix = 50;
					
					resCroc.save();
					
					res.send('ok');
				}
			}
		}
	}
	
	if (!res.headersSent){
		err = new Error('Precondition Failed');
		err.status = 412;
		next(err)
	}
});


/* POST gestion reservation . */
router.post('/', function(req, res, next) {
	mongoose.model('reservationCroc')
		.find(null)
		.sort({
			heure : 1,
			date : 1
		})
		.exec(
			function(err , reservs){
			res.send(JSON.stringify(reservs));
		});
});


/* GET gestion reservation payer. */
router.get('/payer', function(req, res, next) {
	mongoose.model('reservationCroc')
		.update({
			'_id' : req.query.id 
		},
		{
			$set:{
				payer : true
			}
		},
			function(err , reserv){
				res.send('OK');
			}
		);
});

/* GET gestion reservation servi. */
router.get('/servi', function(req, res, next) {
	mongoose.model('reservationCroc')
		.update({
			'_id' : req.query.id
		},
		{
			$set:{
				servi : true
			}
		},
			function(err , reserv){
				res.send('OK');
			}
	);
});

/* GET gestion reservation annuler. */
router.get('/annuler', function(req, res, next) {
	mongoose.model('reservationCroc')
		.remove({
			'_id' : req.query.id
		},
			function(err , reserv){
				res.send('OK');
			}
	);
});

module.exports = router; 
