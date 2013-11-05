/**
 * hightcharts global
 */
Highcharts.setOptions({
    global: {useUTC: false}
});

/**
 * my credits
 */
var defaultCredits = {
    href: 'http://blog.fens.me',
    position: {x: -30, y: -30},
    style: {color: '#191a37', fontWeight: 'bold'},
    text: 'http://blog.fens.me'
}

/**
 * transfer Datetime: 20130101101010 to time
 */
function transferDate(json) {
    for (var i = 0; i < json.length; i++) {
        var obj = json[i].data;
        for (var j = 0; j < obj.length; j++) {
            obj[j][0] = moment(obj[j][0], 'YYYYMMDDHHmmss').toDate().getTime();
        }
    }
    return json;
}

/**
 * Spline Chart Template
 */
function getSplineChart(series) {
    return {
        chart: {
            type: 'spline',
            animation: Highcharts.svg,
            marginRight: 10
        },
        title: {
            text: 'Title'
        },
        credits: defaultCredits,
        xAxis: {
            maxPadding: 0.05, minPadding: 0.05, type: 'datetime', tickWidth: 5,
            labels: {
                formatter: function() {
                    return Highcharts.dateFormat('%H:%M:%S', this.value);
                }
            }
        },
        yAxis: {
            title: {text: 'yAxis'},
            plotLines: [
                {value: 0, width: 1, color: '#808080'}
            ]
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                    Highcharts.dateFormat('%H:%M:%S', this.x) + '<br/>' +
                    Highcharts.numberFormat(this.y, 2);
            }
        },
        legend: {enabled: true},
        exporting: {enabled: false},
        plotOptions: {
            spline: {
                lineWidth: 4, states: {hover: {lineWidth: 5}},
                marker: {enabled: false},
                pointInterval: 3600000,
                pointStart: Date.UTC(2009, 9, 6, 0, 0, 0)
            }
        },
        series: series
    };
}

/**
 * Create a spline
 */
function createSpline(id,url,transDate){
    $.get(url, function (json) {
        if(transDate||false) json=transferDate(json);
        $(id).highcharts(getSplineChart(json));
    });
}

