$(function(){

	// menu

	$('.mobile').click(function(){
		$('.mobile').find('ul').slideToggle();
	});


	// venda.html (preco-fill)

	var currentValue = 0;
	var isDrag = false;

	var precoMax = 70000
	var precoAtual = 0

	$('.pointer-barra').mousedown(function(){
		isDrag = true;
	})

	$(document).mouseup(function(){
		isDrag = false;
		enableTextSelection();
	})

	$('.barra-preco').mousemove(function(e){
		if(isDrag == true){
			disableTextSelection();

			var elBase = $(this);
			var mouseX = e.pageX - elBase.offset().left;

			if(mouseX < 0)
				mouseX = 0;
			if(mouseX > elBase.width())
				mouseX = elBase.width();

			$('.pointer-barra').css('left', (mouseX - 13)+'px');
			currentValue = (mouseX / elBase.width()) * 100;
			$('.barra-preco-fill').css('width', currentValue+'%');
			
			precoAtual = (currentValue / 100) * precoMax;
			precoAtual = formatPreco(precoAtual);
			$('.preco_pesquisa').html('R$' + precoAtual);
		}
	})

	function formatPreco(precoAtual){
		precoAtual = precoAtual.toFixed(2);
		precoArr = precoAtual.split('.');

		var novoPreco = formatTotal(precoArr);
		return novoPreco;
	}

	function formatTotal(precoArr){
		if(precoArr[0] < 1000){
			return precoArr[0]+','+precoArr[1];
		}else if(precoArr[0] < 10000){
			return precoArr[0][0]+'.'+precoArr[0].substr(1, precoArr[0].length)+','+precoArr[1];
		}else{
			return precoArr[0][0]+precoArr[0][1]+'.'+precoArr[0].substr(2, precoArr[0].length)+','+precoArr[1];
		}
	}

	function disableTextSelection(){
		$('body').css('-webkit-user-select', 'none');
		$('body').css('-moz-user-select', 'none');
		$('body').css('-ms-user-select', 'none');
		$('body').css('-o-user-select', 'none');
		$('body').css('-user-select', 'none');
	}

	function enableTextSelection(){
		$('body').css('-webkit-user-select', 'auto');
		$('body').css('-moz-user-select', 'auto');
		$('body').css('-ms-user-select', 'auto');
		$('body').css('-o-user-select', 'auto');
		$('body').css('-user-select', 'auto');
	}

	// carro.html (slide)

	var imgShow = 3;
	var minIndex = imgShow - 1;
	var maxIndex = Math.ceil($('.mini-img-wrapper').length/3) - 1;
	var currIndex = 0;

	initSlider();
	navigateSlider();
	clickSlider();

	function initSlider(){
		var amt = $('.mini-img-wrapper').length * 33.3;
		var elScroll = $('.nav-galeria-wrapper');
		var elSingle = $('.mini-img-wrapper');

		elScroll.css('width', amt+'%');
		elSingle.css('width', 33.3*(100/amt)+'%');
	}

	function navigateSlider(){
		$('.arrow-right-nav').click(function(){
			if(currIndex < maxIndex){
				currIndex++;
				var elOff = $('.mini-img-wrapper').eq(currIndex*3).offset().left - $('.nav-galeria-wrapper').offset().left;
				$('.nav-galeria').animate({'scrollLeft': elOff+'px'});			
			}
		});

		$('.arrow-left-nav').click(function(){
			if(currIndex > 0){
				currIndex--;
				var elOff = $('.mini-img-wrapper').eq(currIndex*3).offset().left - $('.nav-galeria-wrapper').offset().left;
				$('.nav-galeria').animate({'scrollLeft': elOff+'px'});			
			}
		});
	}

	function clickSlider(){
		$('.mini-img-wrapper').click(function(){
			$('.mini-img-wrapper').css('background-color', 'transparent');
			$(this).css('background-color', 'rgb(210, 210, 210)');
		
			var img = $(this).children().css('background-image');

			$('.foto-destaque').css('background-image', img);
		});

		$('.mini-img-wrapper').eq(0).click();
	}

	// go to 'contato'

	$('[goto=contato]').click(function(){
		$('header nav a').css('color', 'black');
		$('footer nav a').css('color', 'white');
		$('.contato').css('color', '#EB2D2D');

		$('html,body').animate({'scrollTop': $('#contato').offset().top});
		return false;
	});

});