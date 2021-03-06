const Ajax = require('robe-ajax')

export default function request(url, options) {
  if (options.weather) {
    return Ajax.getJSON(url, {
      q: "select * from weather.forecast where woeid in (select woeid from geo.places(1) w" +
          "here text='(" + options.data.cityData.coords.latitude + ',' + options.data.cityData.coords.longitude + ")') and u='c'",
      format: 'json'
    })
  } else if (options.cross) {
    return Ajax.getJSON(url, {
      q: Ajax.param(options.data),
      format: 'json'
    })
  } else {
    console.log(url,options)
    return Ajax.ajax({
      url: url,
      method: options.method || 'get',
      data: options.data || {},
      dataType: 'json'
    }).done((data) => {
       console.log(url,"dataaaaaaa",data);
      return data
    })
  }
}
