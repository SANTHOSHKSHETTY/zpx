import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DataserviceService } from '../dataservice.service';

declare let d3: any;


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['../../../node_modules/nvd3/build/nv.d3.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChartComponent implements OnInit {
options: any;
data: any;
price:any=[];
marketcap:any=[];
volume:any=[];
currencyname:any='AdEx';
currencydate:any=1511239767;
  constructor( private d3data: DataserviceService) {
  }

  ngOnInit() {
   
 this.loadChart();
 this.getDetailData();
 this.loadData();
 
   
   /*  **********pi chart
    this.options = {
      chart: {
        type: 'pieChart',
        height: 500,
        x: function (d) {
          return d.key;
        },
        y: function (d) {
          return d.y;
        },
        showLabels: true,
        duration: 500,
        labelThreshold: 0.01,
        labelSunbeamLayout: true,
        legend: {
          margin: {
            top: 5,
            right: 35,
            bottom: 5,
            left: 0
          }
        }
      }
    };

    this.data = [
      {
        key: "P60-1",
        y: 256
      },
      {
        key: "P60-2",
        y: 445
      },
      {
        key: "P40",
        y: 225
      },
      {
        key: "P73",
        y: 127
      },
      {
        key: "P71",
        y: 128
      }
    ];
  
  */
  
  
  
  
  }

compare(a,b):any {
  if (a.x < b.x)
    return -1;
  if (a.x > b.y)
    return 1;
  return 0;
}


  
  getDetailData() :void {
this.d3data.getDetail(this.currencyname,this.currencydate).subscribe(     d=> 
                          {
						  console.log(d);
						  d.map ( a=>  {
						                    let str=Number(a['last_updated']*1000)
						                    let dt:Date=new Date (str);
											this.price.push( {x:dt, y:a['price_usd']}) ;
											this.marketcap.push( {x:dt, y:a['market_cap_usd']}) ; 
											this.volume.push( {x:dt, y:a['volume_usd_24h']}) ; 
										}
								);
						  this.price.sort(this.compare);
                          this.marketcap.sort(this.compare);
                          this.volume.sort(this.compare);						  
						  this.loadData();
						    console.log(this.price);
							 console.log(this.marketcap);
							  console.log(this.volume);
						  //this.loadChart();
                          }
						  );
}

  /*
 
 
  */
 

//load chart options data

loadChart():void {
 this.options = {
      chart: {
        type: 'lineChart',
        height: 450,
        margin : {
          top: 20,
          right: 20,
          bottom: 50,
          left: 55
        },
        x: function(d){return d.x;},
        y: function(d){return d.y;},
  useInteractiveGuideline: true,
  dispatch: {
        stateChange: function(e){ console.log("stateChange"); },
        changeState: function(e){ console.log("changeState"); },
        tooltipShow: function(e){ console.log("tooltipShow"); },
        tooltipHide: function(e){ console.log("tooltipHide"); }
            },
        showValues: true,
 
        //duration: 500,
        xAxis: {
          axisLabel: 'Periods',
    tickFormat: function(d) {
	return d3.time.format('%m %d %H:%M:%S')(new Date(d));
          //return d3.time.format('%d %b %Y %H:%M')(new Date(d));
		  //return d3.time.format('%H:%M')(new Date(d));
        },
        showMaxMin: false
        },
        yAxis: {
          axisLabel: 'Y Axis'
    //tickFormat: function(d) {
      //    return d3.format('.2f')(d) }
         // axisLabelDistance: -10
        },
  callback: function(chart){
  
        console.log("!!! lineChart callback !!!");
       }
      }
    };
 
 
 
 }   // end of load chart 




//load data
 loadData() :void {
   this.data= [ 
      {
        key: "Price",
        values: this.price
      },
      {
        key: "Market Cap",
        values: this.marketcap
      },
   
     {
        key: "Volume",
        values: this.volume
      }
     
    ]; 
 } // end of loadData function
 

 
}  // class
