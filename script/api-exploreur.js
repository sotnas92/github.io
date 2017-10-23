var bitcoin_change = 0;
var euro_converted = 0;

$(document).ready(function() {
//change en EUR
$.ajax({
	url : "https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCEUR",
	dataType : "json",
	contentType : "application/json; charset=utf-8",
	type : "GET",
	timeout:	"5000",
	async : true,

	success : function(data) {
		bitcoin_change = data.last;
		$('#percent_variation').append(data.changes.percent.day);
		$('#price_variation').append(data.changes.price.day);
		if(data.changes.percent.day > 0)
		{
			$('.fleche').removeClass().addClass('fa fa-caret-up');
		}
		else{
			$('.fleche').removeClass().addClass('fa fa-caret-down');
		}
		$('#volume').append(data.volume);
		$('#bitcoin_change').append(bitcoin_change);

	},

	error : function(xhr, status, err) {
		$('#bitcoin_change').append(err+" N/A");
	}
});
$.ajax({
		url : "https://api.blockchain.info/stats?cors=true",
		dataType : "json",
		type : "GET",
		timeout:	"5000",
		async : true,

		success : function(data) {
			$('#blocks').append(data.n_blocks_total);
			/*$('#bitcoin_minutes').append(data.minutes_between_blocks);
			$('#miners_revenue_btc').append(data.miners_revenue_btc);
			$('#blocks_size').append(data.blocks_size);*/
		},

		error : function(xhr, status, err) {
			$('#bitcoin_minutes').append(err+" N/A");
		}
	});
});
function ConvertToEuro() {
	euro_converted = (bitcoin_change * $('#bitcoin_to_change')[0].value).toFixed(2);
	$('#euro_converted')[0].value = euro_converted;
	if (euro_converted > balance) {
		$('.alert').show();
		document.getElementById('btn_conversion').disabled = 'true';
	}
	else
	{
		$('.alert').hide();
		document.getElementById('btn_conversion').disabled = '';
	}
}

function ConvertToBitcoin() {
	bitcoin_converted =($('#euro_converted')[0].value / bitcoin_change).toFixed(8);
	$('#bitcoin_to_change')[0].value = bitcoin_converted;
	if ($('#euro_converted')[0].value > balance) {
		$('.alert').show();
		document.getElementById('btn_conversion').disabled = 'true';
	}
	else
	{
		$('.alert').hide();
		document.getElementById('btn_conversion').disabled = '';
	}
}

function toTimestamp(strDate){
	var datum = Date.parse(strDate);
	return datum/1000;
}
