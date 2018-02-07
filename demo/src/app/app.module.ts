import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { DataserviceService } from './dataservice.service';
import { NvD3Module } from 'ng2-nvd3';
import 'd3';
import 'nvd3';


@NgModule({
  declarations: [
    AppComponent,
    ChartComponent
	
  ],
  imports: [
    BrowserModule,
	HttpClientModule,
	NvD3Module
  ],
  providers: [DataserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
