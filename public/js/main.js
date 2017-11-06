var tempoInicial = $("#tempo-digitacao").text();
var campo        = $(".campo-digitacao");

$(function() {
	atualizaTamanhoFrase();
	inicializaContadores();
	inicializaCronometro();
	inicializaMarcadores();
	$("#botao-reiniciar").click(reiniciaJogo);
});

function atualizaTamanhoFrase() {
	var frase = $(".frase").text();
	var numPalavras = frase.split(" ").length;
	$("#tamanho-frase").text(numPalavras);
}

function inicializaContadores() {
	campo.on("input", function() {
		var conteudo = campo.val();
		var qtdPalavras = conteudo.split(/\S+/).length - 1;
		$("#contador-palavras").text(qtdPalavras);

		var qtdCaracteres = conteudo.length;
		$("#contador-caracteres").text(qtdCaracteres);
	});
}

function inicializaCronometro() {
	var tempoRestante = $("#tempo-digitacao").text();
	campo.one("focus", function () {
	   var cronometroID = setInterval(function() {
			 tempoRestante--;
			 if(tempoRestante <= 0) {
				 clearInterval(cronometroID);
				 finalizaJogo();
			 }
			 $("#tempo-digitacao").text(tempoRestante);
		 }, 1000);
	});
}

function finalizaJogo() {
	campo.attr("disabled", "true");
	campo.addClass("campo-desativado");
	inserePlacar();
}

function inicializaMarcadores() {
	var frase = $(".frase").text();
	campo.on("input", function() {
		var digitado = campo.val();
		var comparavel = frase.substr(0, digitado.length);

		if ( digitado == comparavel ) {
			campo.addClass("borda-verde");
			campo.removeClass("borda-vermelho");
		} else {
			campo.addClass("borda-vermelho");
			campo.removeClass("borda-verde");
		}

	});
}


function reiniciaJogo() {
	campo.removeAttr("disabled");
	campo.val("");
	$("#contador-caracteres").text("0");
	$("#contador-palavras").text("0");
	$("#tempo-digitacao").text(tempoInicial);
	campo.removeClass("campo-desativado");
	campo.removeClass("borda-vermelho");
	campo.removeClass("borda-verde");
	inicializaCronometro();
}
