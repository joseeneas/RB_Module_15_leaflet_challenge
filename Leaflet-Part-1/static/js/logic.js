  // url
  const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson';

  d3.json(url).then(function(data) { // begin of function retrieve data
    
    ctype = data.type;
    console.log('-----------------------------');
    console.log('bef loop - ctype : ',data.type);
    metadata = {};
    metadata = { generated : data.metadata.generated,
                 url       : data.metadata.url,
                 title     : data.metadata.title,
                 api       : data.metadata.api,
                 count     : data.metadata.count,
                 status    : data.metadata.status};
    console.log('-----------------------------');
    console.log('bef loop - gen   : ',metadata.generated);
    console.log('bef loop - url   : ',metadata.url);
    console.log('bef loop - title : ',metadata.title);
    console.log('bef loop - api   : ',metadata.api);
    console.log('bef loop - count : ',metadata.count);
    console.log('bef loop - stat  : ',metadata.status);
    features = [];
    for (let i=0; i < metadata.count; i++) { 
      features[i] = {};
      features[i] = { ftype   : data.features[i].type,
                      mag     : data.features[i].properties.mag,
                      place   : data.features[i].properties.place,
                      time    : data.features[i].properties.time,
                      updated : data.features[i].properties.updated,
                      tz      : data.features[i].properties.tz,
                      url     : data.features[i].properties.url,
                      detail  : data.features[i].properties.detail,
                      felt    : data.features[i].properties.felt,
                      cdi     : data.features[i].properties.cdi,
                      mmi     : data.features[i].properties.mmi,
                      alert   : data.features[i].properties.alert,
                      status  : data.features[i].properties.status,
                      tsunami : data.features[i].properties.tsunami,
                      sig     : data.features[i].properties.sig,
                      net     : data.features[i].properties.net,
                      code    : data.features[i].properties.code,
                      ids     : data.features[i].properties.ids,
                      sources : data.features[i].properties.sources,
                      types   : data.features[i].properties.types, 
                      nst     : data.features[i].properties.nst,
                      dmin    : data.features[i].properties.dmin,
                      rms     : data.features[i].properties.rms,
                      gap     : data.features[i].properties.gap,
                      magType : data.features[i].properties.magType,
                      ptype   : data.features[i].properties.type,
                      title   : data.features[i].properties.title,
                      long    : data.features[i].geometry.coordinates[0],
                      lat     : data.features[i].geometry.coordinates[1],
                      depth   : data.features[i].geometry.coordinates[2],
                      id      : data.features[i].id};
      console.log('-----------------------------');
      console.log('in  loop - i     : ',i);
      console.log('in  loop - type  : ',features[i].ftype);
      console.log('in  loop - mag   : ',features[i].mag);
      console.log('in  loop - place : ',features[i].place)
      console.log('in  loop - time  : ',features[i].time);
      console.log('in  loop - updt  : ',features[i].updated);
      console.log('in  loop - tz    : ',features[i].tz);
      console.log('in  loop - url   : ',features[i].url);
      console.log('in  loop - detail: ',features[i].detail);
      console.log('in  loop - felt  : ',features[i].felt);
      console.log('in  loop - cdi   : ',features[i].cdi);
      console.log('in  loop - mmi   : ',features[i].mmi);
      console.log('in  loop - alert : ',features[i].alert);
      console.log('in  loop - status: ',features[i].status);
      console.log('in  loop - tsu   : ',features[i].tsunami);
      console.log('in  loop - sig   : ',features[i].sig);
      console.log('in  loop - net   : ',features[i].net);
      console.log('in  loop - code  : ',features[i].code);
      console.log('in  loop - ids   : ',features[i].ids);
      console.log('in  loop - src   : ',features[i].sources);
      console.log('in  loop - types : ',features[i].types);
      console.log('in  loop - nst   : ',features[i].nst);
      console.log('in  loop - dmin  : ',features[i].dmin);
      console.log('in  loop - rms   : ',features[i].rms);
      console.log('in  loop - gap   : ',features[i].gap);
      console.log('in  loop - magTyp: ',features[i].magType);
      console.log('in  loop - type  : ',features[i].ptype);
      console.log('in  loop - title : ',features[i].title);
      console.log('in  loop - long  : ',features[i].long);
      console.log('in  loop - lat   : ',features[i].lat);
      console.log('in  loop - depth : ',features[i].depth);
      console.log('in  loop - id    : ',features[i].id);
    } 
    bbox = {};
    bbox = { minlon : data.bbox[0],
             minlat : data.bbox[1],
             mindep : data.bbox[2],
             maxlon : data.bbox[3],
             maxlat : data.bbox[4],
             maxdep : data.bbox[5] }
    console.log('-----------------------------');
    console.log('aft loop - < lon : ',bbox.minlon);
    console.log('aft loop - < lat : ',bbox.minlat);
    console.log('aft loop - < dep : ',bbox.mindep);
    console.log('aft loop - > lon : ',bbox.maxlon);
    console.log('aft loop - > lat : ',bbox.maxlat);
    console.log('aft loop - > dep : ',bbox.maxdep); 


  }); // end of function retrieve data
  