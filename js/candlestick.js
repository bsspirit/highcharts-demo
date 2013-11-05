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
 * Paser Origin Data to Chart
 */
function paserStockData(data,transferDate){
    var ohlc = [],
        volume = [];

    for (var i = 0; i < data.length; i++) {
        if(transferDate||false){
            data[i][0] = moment(data[i][0], 'YYYYMMDDHHmmss').toDate().getTime();
        }

        ohlc.push([
            data[i][0], // the date
            data[i][1], // open
            data[i][2], // high
            data[i][3], // low
            data[i][4] // close
        ]);

        volume.push([
            data[i][0], // the date
            data[i][5] // the volume
        ])
    }

    var groupingUnits = [
        ['week',[1]],
        ['month',[1, 2, 3, 4, 5, 6]]
    ];

    var series=[{
        type: 'candlestick',
        name: 'Stock',
        data: ohlc,
        dataGrouping: {
            units: groupingUnits
        }
    }, {
        type: 'column',
        name: 'Volume',
        data: volume,
        yAxis: 1,
        dataGrouping: {
            units: groupingUnits
        }
    }];
    return series;
}

/**
 * Spline Chart Template
 */
function getCandlestick(series) {
    return {
        rangeSelector: {
            selected: 1
        },
        credits:defaultCredits,
        title: {
            text: 'Title'
        },
        yAxis: [{
            title: {
                text: 'Price'
            },
            height: 200,
            lineWidth: 2
        }, {
            title: {
                text: 'Volume'
            },
            top: 300,
            height: 100,
            offset: 0,
            lineWidth: 2
        }],
        series:series
    }
}

/**
* Create a Candlestick
*/
function createCandlestick(id,url,transDate){
    $.get(url, function (json) {
        json=paserStockData(json,transDate);
        $(id).highcharts('StockChart',getCandlestick(json));
    });
}

