var validar = false;

function expo(x, f) {
  return Number.parseFloat(x).toExponential(f);
}

// Closure
(function(){

	/**
	 * Decimal adjustment of a number.
	 *
	 * @param	{String}	type	The type of adjustment.
	 * @param	{Number}	value	The number.
	 * @param	{Integer}	exp		The exponent (the 10 logarithm of the adjustment base).
	 * @returns	{Number}			The adjusted value.
	 */
	function decimalAdjust(type, value, exp) {
		// If the exp is undefined or zero...
		if (typeof exp === 'undefined' || +exp === 0) {
			return Math[type](value);
		}
		value = +value;
		exp = +exp;
		// If the value is not a number or the exp is not an integer...
		if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
			return NaN;
		}
		// Shift
		value = value.toString().split('e');
		value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
		// Shift back
		value = value.toString().split('e');
		return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
	}

	// Decimal round
	if (!Math.round10) {
		Math.round10 = function(value, exp) {
			return decimalAdjust('round', value, exp);
		};
	}
	// Decimal floor
	if (!Math.floor10) {
		Math.floor10 = function(value, exp) {
			return decimalAdjust('floor', value, exp);
		};
	}
	// Decimal ceil
	if (!Math.ceil10) {
		Math.ceil10 = function(value, exp) {
			return decimalAdjust('ceil', value, exp);
		};
	}

})();

function fechar_resultado () {
	document.getElementById("resultados").style.display = "none";
}

function resetar_circuito () {
    //Limpando todos os campos
     document.getElementById("fluxo_magnetico").value = '';
     document.getElementById("velocidade").value = '';
     document.getElementById("comprimento").value = '';
     document.getElementById("resistencia").value = '';
}

// Validando as entradas
function InvalidMsg(textbox, circuito) {
    if (textbox.value == "") {
        textbox.setCustomValidity('Digite o valor ' + circuito);
        validar = false;
    }
    else if(textbox.value <= 0) {
        textbox.setCustomValidity('Digite o valor ' + circuito + ' maior que 0');
        validar = false;
    }
    else if(textbox.validity.typeMismatch){
        textbox.setCustomValidity('please enter a valid email address');
        validar = false;
    }
    else {
        textbox.setCustomValidity('');
        validar = false;
    }
    validar = true;
}

/* FUNÇÃO CALCULAR VALORES */
function Calcular() {
        fluxo_magnetico = document.getElementById("fluxo_magnetico").value;
        velocidade = document.getElementById("velocidade").value;
        comprimento = document.getElementById("comprimento").value;
        resistencia = document.getElementById("resistencia").value;
			
		// Validando
		if((fluxo_magnetico == '' || velocidade == '' ||  comprimento == '' || resistencia == '') || (fluxo_magnetico == 0 || velocidade == 0 ||  comprimento == 0 || resistencia == 0)){
			document.getElementById("resultados").style.display = "none";
		}
        else {
			document.getElementById("resultados").style.display = "block";
			
            
            // Exercício a
            fem_induzida_circuito = velocidade * fluxo_magnetico * comprimento;       
			// Fazendo um bakcup dessa variável para exibir o resultado em notação científica
            bkp_fem_induzida_circuito = fem_induzida_circuito;            
			if(bkp_fem_induzida_circuito > 999 || bkp_fem_induzida_circuito < 0.100) {
				bkp_fem_induzida_circuito = expo(bkp_fem_induzida_circuito, 2);
            }

            // Exercício b
            corrente_circuito = fem_induzida_circuito / resistencia;
			bkp_corrente_circuito = corrente_circuito;
            if(bkp_corrente_circuito > 999 || bkp_corrente_circuito < 0.100) {
				bkp_corrente_circuito = expo(bkp_corrente_circuito, 2);
            }

            // Exercício c
            forca_mover_haste = fluxo_magnetico * corrente_circuito * comprimento;
			bkp_forca_mover_haste = forca_mover_haste;
            if(bkp_forca_mover_haste > 999 || bkp_forca_mover_haste < 0.100) {
                bkp_forca_mover_haste = expo(bkp_forca_mover_haste, 2);
            }
			
			// Exercício d
			potencia_entrada = forca_mover_haste * velocidade;
            if(potencia_entrada > 999 || potencia_entrada < 0.100) {
                potencia_entrada = expo(potencia_entrada, 2);
            }
			
			// Exercício e
			taxa_efeito_joule = Math.pow(corrente_circuito, 2) * resistencia;
            if(taxa_efeito_joule > 999 || taxa_efeito_joule < 0.100) {
                taxa_efeito_joule = expo(taxa_efeito_joule, 2);
            }
			

            // Exibindo resultados
            document.getElementById("fem_induzida_circuito").innerHTML = Math.round10(bkp_fem_induzida_circuito, -3);
            document.getElementById("corrente_circuito").innerHTML = Math.round10(bkp_corrente_circuito, -3);
            document.getElementById("forca_mover_haste").innerHTML = Math.round10(bkp_forca_mover_haste, -3);
            document.getElementById("potencia_entrada").innerHTML = Math.round10(potencia_entrada, -3);
            document.getElementById("taxa_efeito_joule").innerHTML = Math.round10(taxa_efeito_joule, -3);
        }
}

