import { Injectable  } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class DataserviceService {

 
  constructor( private _http:HttpClient) { }
  
  getSummary() :Observable <any> {
  
  //return this._http.get('http://ngdemothree.herokuapp.com/summary', {responseType:'json'});
  
   //return this._http.get('http://ngdemotwo.herokuapp.com/summary', {responseType:'json'});
  
  return this._http.get('http://localhost:3000/summary', {responseType:'json'});
  
  }
  
  
  
  getDetail( name,date) :Observable<any> {
  //return this._http.post('http://ngdemothree.herokuapp.com/detail', {currencyname:name,currencydate:date}, {responseType:'json'});
    
   //return this._http.post('http://ngdemotwo.herokuapp.com/detail', {currencyname:name,currencydate:date}, {responseType:'json'});
    
  return this._http.post('http://localhost:3000/detail', {currencyname:name,currencydate:date}, {responseType:'json'});
  
  }
  
  
  

}
