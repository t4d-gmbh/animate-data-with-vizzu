const data = {
  series: [
		{ name: 'Year',    type: 'dimension' },
		{ name: 'Format',  type: 'dimension' },
		{ name: 'New tourism establishments', type: 'measure', unit: '' }
	  ],
	  records: []
}


const config = {
  locateFile: filename => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/${filename}`
}


initSqlJs(config).then(function(SQL){
	
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/animate-data-with-vizzu/data.db', true);
  xhr.responseType = 'arraybuffer';

  xhr.onload = e => {
    const uInt8Array = new Uint8Array(xhr.response);
    const db = new SQL.Database(uInt8Array);
    const contents = db.exec("SELECT year, dimension, CAST(measure as TEXT) as measure FROM measure_per_year_and_dimension WHERE evaluation=1");
	data['records'] = contents[0].values;
  };
  xhr.send();

});

export default data