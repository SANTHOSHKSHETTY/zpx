import { Component,Input,OnInit ,ElementRef, ViewEncapsulation} from '@angular/core';
import { DataserviceService } from './dataservice.service';
import { Observable } from 'rxjs/Observable';

declare let d3: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
    // include original styles
  styleUrls: [
    '../../node_modules/nvd3/build/nv.d3.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
price:any=[];
marketcap:any=[];
volume:any=[];
ticketsMap:any = {};
rowchart :any;
options: any;
data: any;
columns:string[]=["name",
        "price_usd",
        "volume_usd_24h",
        "market_cap_usd",
        "total_supply",
        "percent_change_24h"];
tickets:any[];
currencyname:any='AdEx';
currencydate:any=1511239767;
constructor( private d3data: DataserviceService, private eleRef: ElementRef) {
  }

 ngOnInit() {
 this.loadChart();
 this.getSummaryData();
 this.getDetailData();
 this.loadData();
 
 } 
  
onRowClick(event) {
this.price=[];
this.marketcap=[];
this.volume=[];
//this.removeElement(elem.ownerDocument);
console.log(event);
var elem=event.target;
this.currencyname=elem.parentNode.cells[0].innerHTML;
this.currencydate=Number(this.getDate(this.currencyname.trim()));
this.getDetailData();
console.log(this.currencyname);
console.log(this.currencydate);

this.removeElement(elem.ownerDocument);
console.log(elem);
console.log("OK");
console.log("row element");
console.log(elem.parentNode);
console.log(elem.parentNode.cells[0].innerHTML);
console.log(elem.parentNode.cells[0].textContent);
console.log(elem.parentNode.parentNode);
var cell = document.createElement("td");
cell.setAttribute("colspan", '8');
//var appchart =document.createElement("app-chart");
//console.log("appcahrt");
//console.log(appchart);
 //var div =document.createElement("div");
 //var text = document.createTextNode("<app-chart></app-chart>");
 //div.appendChild(text);
 //div.innerHTML=this.d3Object.nativeElement.firstChild.innerHTML
//console.log(elem.ownerDocument.getElementById('chart'));
 //div.innerHTML=elem.ownerDocument.getElementById('chart').firstElementChild.innerHTML
 
 //console.log(elem.ownerDocument.getElementById('chart'));
 //" <nvd3 [options]='options' [data]='data'></nvd3>"
 var div;
 if(this.rowchart) {
 div =this.rowchart;
 } else {
 div =elem.ownerDocument.getElementById('chart') ;}
 
 div.setAttribute("style", "display: 'none'");
 div.setAttribute("style", "display: ''");
 //div.offsetHeight;
 cell.appendChild(div);
 var row=elem.parentNode.parentNode.insertRow(elem.parentNode.rowIndex+1);
 row.setAttribute("id", "RowChart");
 row.appendChild(cell);
 row.setAttribute("style", "display:'none'");
 row.setAttribute("style", "display:''");
 
 // row.focus();
 //elem.dispatchEvent('click');
  }
  
removeElement(d) {
    var elem = d.getElementById('RowChart');
	if (elem) {
    //elem.parentNode.removeChild(elem);   // works fine
	this.rowchart=elem;
	elem.parentNode.deleteRow(elem.rowIndex)   ;   // works fine
	}
    return false;
}
	
//get details data

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
	
// get summary data 	
	
getSummaryData():void   {
      this.d3data.getSummary().subscribe(     d=> 
           {  this.tickets= d ;
               console.log(d);
          //console.log(this.data);
		    this.createMap();
           }
		   
      );
}


createMap() : void {
var i = null;
for (i = 0; this.tickets.length > i; i++) {
console.log (this.tickets[i]);
console.log (this.tickets[i].name);
console.log (this.tickets[i].last_updated);
    this.ticketsMap[this.tickets[i].name] = this.tickets[i].last_updated;
	console.log (this.ticketsMap);
}
}

getDate (name):any {
    return this.ticketsMap[name];
}



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
        showMaxMin: true
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
 




}  //class