function afficheMenu(){
	var $menu = $('[name=menu]:checked').val();
	if ( $menu == 'menu'){
		$('#commande').html('<div id="croc1"> Croc 1 : \
 		<input type="radio" id="nature1" name="pain1" value="nature" checked />\
		<label for="nature1">Nature</label>\
		<input type="radio" id="complet1" name="pain1" value="complet" />\
		<label for="complet1">Complet</label>\
		<input type="radio" id="jambon1" name="viande1" value="jambon" checked />\
		<label for="jambon1">Jambon</label>\
		<input type="radio" id="poulet1" name="viande1" value="poulet" />\
		<label for="poulet1">Poulet</label>\
		<label> Tomate \
			<input name="tomate1" type="checkbox" value="true"/>\
		</label>\
		</div>\
		<div id="croc2"> Croc 2 : \
		<input type="radio" id="nature2" name="pain2" value="nature" checked />\
		<label for="nature2">Nature</label>\
		<input type="radio" id="complet2" name="pain2" value="complet" />\
		<label for="complet2">Complet</label>\
		<input type="radio" id="jambon2" name="viande2" value="jambon" checked />\
		<label for="jambon2">Jambon</label>\
		<input type="radio" id="poulet2" name="viande2" value="poulet" />\
		<label for="poulet2">Poulet</label>\
		<label> Tomate \
		<input name="tomate2" type="checkbox" value="true"/>\
		</label>\
		</div>\
		<div>12h<input name="heure" type="number"  min=0 max=59 value=0></div>');
		
		$('#prixCroc').text('2,30€');
	}
	else if ( $menu == 'croc'){
		$('#commande').html('\
		<input type="radio" id="nature" name="pain" value="nature" checked />\
                <label for="nature">Nature</label>\
                <input type="radio" id="complet" name="pain" value="complet" />\
                <label for="complet">Complet</label>\
                <input type="radio" id="jambon" name="viande" value="jambon" checked />\
                <label for="jambon">Jambon</label>\
                <input type="radio" id="poulet" name="viande" value="poulet" />\
                <label for="poulet">Poulet</label> \
		<label> Tomate \
		  <input name="tomate" type="checkbox" value="true"/>\
		</label>\
		<div>12h<input name="heure" type="number"  min=0 max=59 value=0></div>');
		$('#prixCroc').text('1,00€');
	}
	else {
		$('#commande').html('<label> Banane \
		  <input name="banane" type="checkbox" value="true"/>\
		</label><label> Poire \
		  <input name="poire" type="checkbox" value="true"/>\
		</label>');
		$('#prixCroc').text('0,50€');
	}
}

function envoiCroc() {
	commande ={};
	if ($('[name=nameCroc]').val() != '')
		commande.name = $('[name=nameCroc]').val();
	if ($('[name=menu]:checked').val() == 'menu'){
		commande.menu = 0;
		commande.croc1 = {
			nature : $('[name=pain1]:checked').val() == 'nature',
			jambon : $('[name=viande1]:checked').val() == 'jambon',
			tomate : $('[name=tomate1]').is(':checked')
		};
		commande.croc2 = {
			nature : $('[name=pain2]:checked').val() == 'nature',
			jambon : $('[name=viande2]:checked').val() == 'jambon',
			tomate : $('[name=tomate2]').is(':checked')
		};
		commande.heure = $('[name=heure]').val();
	}
	else if ($('[name=menu]:checked').val() == 'croc'){
		commande.menu = 1;
		commande.nature = $('[name=pain]:checked').val() == 'nature', 
		commande.jambon = $('[name=viande]:checked').val() == 'jambon';
		commande.tomate = $('[name=tomate]').is(':checked');
		commande.heure = $('[name=heure]').val();
	}
	else {
		commande.menu = 2;
		commande.banane = $('[name=banane]').is(':checked');
		commande.poire  = $('[name=poire]').is(':checked');
	}
	xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200 ) {
			rechargerListe();
		}
	}
	xhr.open("POST", "/add", true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	commande = JSON.stringify(commande);
	console.log(commande);
	xhr.send("commande="+commande);
	
}

function rechargerListe() {
	xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200 ) {
			var reservs = JSON.parse(xhr.responseText);
			var codet = '';
			var nbSale = 0;
			var nbSucre = 0;
			while (reservs.length > 0){
				reserv = reservs.pop();
				var code = '';
				if(reserv.menu == 0){
					code = '<tr><td>'+reserv.acheteur+'</td><td>';
					if (reserv.croc1.nature)
						code += 'nature, ';
					else
						code += 'complet, ';
					
					if (reserv.croc1.jambon)
						code += 'jambon, ';
					else
						code += 'poulet, ';
					
					if (reserv.croc1.tomate)
						code += 'avec'
					else
						code += 'sans';
					code += ' tomates</td><td>';
					
					if (reserv.croc2.nature)
						code += 'nature, ';
					else
						code += 'complet, ';
					
					if (reserv.croc2.jambon)
						code += 'jambon ';
					else
						code += 'poulet ';
					
					if (reserv.croc2.tomate)
						code += 'avec'
					else
						code += 'sans';
					code += ' tomates</td><td>12h'+normaliseMinutes(reserv.heure)+'</td><td>2.30€</td><td>';
					nbSale += 2;
				}
				else if (reserv.menu == 1){
					code = '<tr><td>'+reserv.acheteur+'</td><td>';
					if (reserv.croc1.nature)
						code += 'nature, ';
					else
						code += 'complet, ';
					if (reserv.croc1.jambon)
						code += 'jambon, ';
					else
						code += 'poulet, ';
					if (reserv.croc1.tomate)
						code += 'avec'
					else
						code += 'sans';
					code += ' tomates</td><td></td><td>12h'+normaliseMinutes(reserv.heure)+'</td><td>1,00€</td><td>';
					nbSale++;
				}
				else {
					code = '<tr><td>'+reserv.acheteur+'</td><td>choco, ';
					
					if (reserv.croc1.tomate)
						code += 'avec'
					else
						code += 'sans';
					code += ' banane, ';
					if (reserv.croc2.tomate)
						code += 'avec'
					else
						code += 'sans';
					code += ' poire</td><td></td><td>13h00</td><td>0.50€</td><td>';
					nbSucre++;
				}
				if(reserv.payer){
					code += 'payer</td>';
					if(reserv.servi)
						code += '<td>servi</td>';
					else
						code += '<td><button onclick="servi(\''+reserv._id+'\')">servi</button></td>';
				}
				else
					code += '<button onclick="payer(\''+reserv._id+'\')">payer</button></td><td><button disabled>servi</button></td>';
				
				codet = code +'<td><button onclick="annuler(\''+reserv._id+'\')">annuler</button></td></tr>'+ codet;
			}
			$('#listeCrocs').html(codet);
			$('#sale').text(nbSale);
			$('#sucre').text(nbSucre);
		}
	}
	xhr.open("POST", "/", true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("");
}

function payer(id) {
	xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200 ) {
			rechargerListe();
		}
	}
	xhr.open("GET","/payer?id="+id);
	xhr.send(null);
}
function servi(id) {
	xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200 ) {
			rechargerListe();
		}
	}
	xhr.open("GET","/servi?id="+id);
	xhr.send(null);
}

function annuler(id) {
	xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200 ) {
			rechargerListe();
		}
	}
	xhr.open("GET","/annuler?id="+id);
	xhr.send(null);
}
function normaliseMinutes(minutes) {
	minutes = minutes%60;
	if (minutes < 10)
		minutes = '0'+minutes;
	return minutes;
}

function view(){
	xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200 ) {
			var reservs = JSON.parse(xhr.responseText);
			if(reservs.length >0){
			var suite = "";
			var code = '';
			var reserv = reservs[0];
				if(reserv.menu == 0){
					code += '<b>Croc1: </b>';
					if (reserv.croc1.nature)
						code += 'nature, ';
					else
						code += 'complet, ';
					
					if (reserv.croc1.jambon)
						code += 'jambon, ';
					else
						code += 'poulet, ';
					
					if (reserv.croc1.tomate)
						code += 'avec'
					else
						code += 'sans';
					code += ' tomates</td><td>';
					
					code += '<br/><b>Croc2: </b>';
					if (reserv.croc2.nature)
						code += 'nature, ';
					else
						code += 'complet, ';
					
					if (reserv.croc2.jambon)
						code += 'jambon ';
					else
						code += 'poulet ';
					
					if (reserv.croc2.tomate)
						code += 'avec'
					else
						code += 'sans';
					code += ' tomates</td>';
				}
				else if (reserv.menu == 1){
					code += "<b>Simple </b>";
					if (reserv.croc1.nature)
						code += 'nature, ';
					else
						code += 'complet, ';
					if (reserv.croc1.jambon)
						code += 'jambon, ';
					else
						code += 'poulet, ';
					if (reserv.croc1.tomate)
						code += 'avec'
					else
						code += 'sans';
					code += ' tomates</td>';
				}
				else {
					code += "<b>Choco </b> "
					if (reserv.croc1.tomate)
						code += 'avec'
					else
						code += 'sans';
					code += ' banane, ';
					if (reserv.croc2.tomate)
						code += 'avec'
					else
						code += 'sans';
					code += ' poire</td>'
				}
			$("#one").html('<h2>'+reservs[0].acheteur+'</h2>'+code);
			if(reservs.length > 1){
			for (var i=1, c=reservs.length;i<c;i++){
				code = '<p>';
			    reserv = reservs[i];
				if(reserv.menu == 0){
					code += '<b>Croc1: </b>';
					if (reserv.croc1.nature)
						code += 'nature, ';
					else
						code += 'complet, ';
					
					if (reserv.croc1.jambon)
						code += 'jambon, ';
					else
						code += 'poulet, ';
					
					if (reserv.croc1.tomate)
						code += 'avec'
					else
						code += 'sans';
					code += ' tomates';
					
					code += '<br/><b>Croc2: </b>';
					
					if (reserv.croc2.nature)
						code += 'nature, ';
					else
						code += 'complet, ';
					
					if (reserv.croc2.jambon)
						code += 'jambon ';
					else
						code += 'poulet ';
					
					if (reserv.croc2.tomate)
						code += 'avec'
					else
						code += 'sans';
					code += ' tomates</p>';
				}
				else if (reserv.menu == 1){
					code += "<b>Simple </b>";
					if (reserv.croc1.nature)
						code += 'nature, ';
					else
						code += 'complet, ';
					if (reserv.croc1.jambon)
						code += 'jambon, ';
					else
						code += 'poulet, ';
					if (reserv.croc1.tomate)
						code += 'avec'
					else
						code += 'sans';
					code += ' tomates</p>';
				}
				else {
					code += "<b>Choco </b>";
					if (reserv.croc1.tomate)
						code += 'avec'
					else
						code += 'sans';
					code += ' banane, ';
					if (reserv.croc2.tomate)
						code += 'avec'
					else
						code += 'sans';
					code += ' poire</p>'
				}
				suite += '<h3>'+reservs[i].acheteur+'</h3>'+code;
			}
			$("#suite").html(suite);
			}}
		}
	}
	xhr.open("POST", "/view", true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("");
}
