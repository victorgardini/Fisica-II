
var validar = false;
// var ccalcular = false;

function expo(x, f) {
  return Number.parseFloat(x).toExponential(f);
}

function fechar_resultado () {
	document.getElementById("resultados").style.display = "none";
}

function resetar_circuito () {
    // document.getElementById("section-box-imgcircuito").style.display = "none";
    //document.getElementById("img_circuito").src = "selecionar_circuito.jpg";
    //Limpando todos os campos
     document.getElementById("tensao").value = '';
     document.getElementById("resistencia1").value = '';
     document.getElementById("resistencia2").value = '';
     document.getElementById("capacitancia").value = '';
    //validar = false;
    // ccalcular = false;
}

// Validando as entradas
function InvalidMsg(textbox, circuito) {
    if (textbox.value == '') {
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
    // return true;
}

/* FUNÇÃO CALCULAR VALORES */
function Calcular() {
    // if (ccalcular == true) {
    //     alert("Você já calculou! Clique em limpar para calcular novamente");
    // }
    // else {
   //     if (validar == true) {
            // Pegando os valores
            tensao = document.getElementById("tensao").value;
            res1 = document.getElementById("resistencia1").value;
            res2 = document.getElementById("resistencia2").value;
            capacitancia = document.getElementById("capacitancia").value;
			
			// Validando
		if((tensao == '' || res1 == '' ||  res2 == '' || capacitancia == '') || (tensao == 0 || res1 == 0 ||  res2 == 0 || capacitancia == 0)){
			document.getElementById("resultados").style.display = "none";
		}
        else {
			document.getElementById("resultados").style.display = "block";
			
            // Multiplicando pela escada
            escala_resistencia1 = document.getElementById("escala_res-1").value;
            // window.alert(escala_resistencia1); ESTÁ FUNCIONANDO... GRAÇAS A DEUS!
            escala_resistencia2 = document.getElementById("escala_res-2").value;
            escala_capacitancia = document.getElementById("escala_capacitor").value;

            // Aplicando as escalas
            res1 = res1 * escala_resistencia1;
            res2 = res2 * escala_resistencia2;
            // alert(res1);

            // document.getElementById("resultados").style.display = "block";
            // alert ("Tensão: "+tensao+" Resistencia1: "+res1+" Resistencia2: "+res2+" Capacitância: "+capacitancia);
            
            // Exercício a
            corrente_alt_a = tensao / res1;
            // Fazendo um bkp dessa variável para exibir o resultado em notação científica
            bkp_corrente_alt_a = corrente_alt_a;
             if(bkp_corrente_alt_a>999 || bkp_corrente_alt_a<0.100) {
                 bkp_corrente_alt_a = expo(bkp_corrente_alt_a, 2);
             }

            // Exercício b
            corrente_estacionaria = tensao / (res1 + res2);
            if(corrente_estacionaria>999 || corrente_estacionaria<0.100) {
                corrente_estacionaria = expo(corrente_estacionaria, 2);
            }

            // Exercício c
            voltagem_maxima = (tensao / (res1 + res2)) * res2;
            if(voltagem_maxima>999 || voltagem_maxima<0.100) {
                voltagem_maxima = expo(voltagem_maxima, 2);
            }

            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toExponential

            // Exibindo resultados
            document.getElementById("alt_a").innerHTML = bkp_corrente_alt_a;
            document.getElementById("alt_b").innerHTML = corrente_estacionaria;
            document.getElementById("alt_c").innerHTML = voltagem_maxima;
            document.getElementById("v_tensao").innerHTML = tensao;
            document.getElementById("v_res1").innerHTML = res1;
            document.getElementById("v_res2").innerHTML = res2;

            // ccalcular = true;
        }
    // }
}

