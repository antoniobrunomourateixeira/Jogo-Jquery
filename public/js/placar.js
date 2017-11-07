$("#botao-placar").click(mostraPlacar);

function inserePlacar() {
	var corpoTabela = $(".placar").find("tbody");
	var usuario 		= "Bruno Moura";
	var numPalavras = $("#contador-palavras").text();

	var linha = novaLinha(usuario, numPalavras);
	linha.find(".botao-remover").click(removerLinha);

	/* Evendo prepend adiciona a linha no inicio da tabela,
	já o append sempre adiciona no final */
	corpoTabela.prepend(linha);
	$(".placar").slideDown(500);
	scrollPlacar()
}

function scrollPlacar() {
  var posicaoPlacar = $(".placar").offset().top;
	$("body").animate(
	{
		scrollTop: posicaoPlacar + "px"
	}, 1000);
}

function novaLinha(usuario, palavras) {
	var linha 				= $("<tr>");
	var colunaUsuario = $("<td>").text(usuario);
	var colunaPalavra = $("<td>").text(palavras);
	var colunaRemover = $("<td>");
	var link          = $("<a>").addClass("botao-remover").attr("href", "#");
	var icone 				= $("<i>").addClass("small").addClass("material-icons").text("delete");
	link.append(icone);
	colunaRemover.append(link);
	linha.append(colunaUsuario);
	linha.append(colunaPalavra);
	linha.append(colunaRemover);
	return linha;
	scrollPlacar();
}

function removerLinha() {
	event.preventDefault();
	var linha = $(this).parent().parent();
	linha.fadeOut();
	setTimeout(function() {
		linha.remove();
	}, 1000);
}

function mostraPlacar() {
	$(".placar").stop().slideToggle(600);
}
