
			function calc(oDocument)
			{
				document.getElementById("tbToCurrSum").value = Math.round(new Number(document.getElementById("tbFromCurrSum").value)
					*parseFloat(document.getElementById("tbQuotePrice").value)*100)/100;
			}