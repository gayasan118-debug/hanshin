function js_changeBannerAndNumber(areaId, delaytime, idx) 
{
	var $title = $(areaId + " .title img");
	var $target = $(areaId + " .target div");
	idx = (idx>$target.length-1) ? 0 : idx;
	$title.each(function(){
		$(this).attr("src", $(this).attr("src").replace("_over", ""))
	});
	$title.eq(idx).attr("src", $title.eq(idx).attr("src").replace(".", "_over."));
	
	$target.hide().eq(idx).show().animate({ opacity: 1 }, delaytime, function() 
	{
		js_changeBannerAndNumber(areaId, delaytime, parseInt(idx)+1);
	});	
}

loadticker = function(c1,c2,ticnum){
		var fticnum = add_commas(ticnum);
		var numheight=44;
		addticker(c1,c2,fticnum);
		if (ticnum && ticnum != 0) {
			
			var s = String(fticnum);
			
			for (i=s.length;i>=0; i--)
			{
				var onum=s.charAt(i);			
				$("."+ c2 +"#num"+i).attr('value',onum);
			}
			
			$("."+ c2).each( function() {
				var nval=$(this).attr("value");
				if (!isNaN(nval)) {
					var nheight = Number(nval)*numheight*-1;
					$(this).animate({ top: nheight+'px'}, 1500 );
				} 
				if (nval==','){
					$(this).animate({ top: '-440px'}, 1500 );
				}
	  		});
		}
	}
	
	addticker = function(c1,c2,newnum) {
		var digitcnt = $("."+ c2).size();
		var nnum = String(newnum).length;
		var digitdiff = Number(nnum - Number(digitcnt));
		if (digitdiff <0) {
			var ltdig = (Number(nnum)-1);
			$("."+ c2 +":gt(" + ltdig + ")").remove();
		}
		
		for(i=1;i<=digitdiff;i++) {
			$("."+ c1).append('<div class="'+ c2 +'" id="num' + (Number(digitcnt+i-1)) + '">&nbsp;</div>');
		}
	}
	
	add_commas = function(nStr) {
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
	}