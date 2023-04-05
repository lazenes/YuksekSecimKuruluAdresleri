/*! SVG Türkiye Haritası | MIT Lisans | dnomak.com */

function svgturkiyeharitasi() {
  const element = document.querySelector('#svg-turkiye-haritasi');
  const info = document.querySelector('.il-isimleri');

  element.addEventListener(
    'mouseover',
    function (event) {
      if (event.target.tagName === 'path' && event.target.parentNode.id !== 'guney-kibris') {
        info.innerHTML = [
          '<div>',
          event.target.parentNode.getAttribute('data-iladi'),
          '</div>'
        ].join('');
      }
    }
  );

  element.addEventListener(
    'mousemove',
    function (event) {
      info.style.top = event.pageY + 25 + 'px';
      info.style.left = event.pageX + 'px';
    }
  );

  element.addEventListener(
    'mouseout',
    function (event) {
      info.innerHTML = '';
    }
  );

  element.addEventListener(
    'click',
    function (event) {
      if (event.target.tagName === 'path') {
        const parent = event.target.parentNode;
        const id = parent.getAttribute('id');

        if (
          id === 'guney-kibris'
        ) {
          return;
        }		
		
		   $.getJSON("adresler.json", function(data){      
			var plaka=parent.getAttribute('data-plakakodu')-1;
			var obj = data[plaka].ilceler;
			var datas = [];
			   
			   $("#tablo").html('<h3>'+ data[plaka].ilAdi + ' SEÇİM KURULLARI</h3>');  
			  $('#tableId').show();
$.each(obj, function(key,value) { 
	   datas.push({"Secim Kurulu": value.birimAdi,"Telefon": value.birimTel,"Adres": value.birimAdres});    
}); 
			   
		//console.log(datas[0]);	   
	


var headerData = datas[0];
var columns = [];

			   
$.each(headerData, function(name, value) {

   var obj = {'data': name};
	
   columns.push(obj);
	
   });
		   
			   
$('#tableId').DataTable({
	    destroy: true,
	 "language": {
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Turkish.json"
        },
    data: datas,
    "columns": columns
});	  
			   
	  
            $('#myModal').modal('show');
  
        }).fail(function(){
            console.log("Trafoya Kedi Filan Kaçtı Herhalde Hatası Oluştu.");
        });

      }
    }
  );
}
