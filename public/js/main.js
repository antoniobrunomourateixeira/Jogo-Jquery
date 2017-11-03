var tempoInicial = $("#tempo-digitacao").text();
var campo        = $(".campo-digitacao");

$(function() {
	atualizaTamanhoFrase();
	inicializaContadores();
	inicializaCronometro();
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
				 campo.attr("disabled", "true");
				 clearInterval(cronometroID);
				 campo.addClass("campo-desativado");
			 }
			 $("#tempo-digitacao").text(tempoRestante);
		 }, 1000);
	});
}

function reiniciaJogo() {
	campo.removeAttr("disabled");
	campo.val("");
	$("#contador-caracteres").text("0");
	$("#contador-palavras").text("0");
	$("#tempo-digitacao").text(tempoInicial);
	campo.removeClass("campo-desativado");
	inicializaCronometro();
}
