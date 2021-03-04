import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError,map,tap} from 'rxjs/operators';
import { VideoHolder,PostHolder,CommentHolder,Response } from "../models/MultimediaModels";


@Injectable({
  providedIn: 'root'
})
export class VideoService{
  constructor(
    private http:HttpClient) {
  }
  private httpOptions={
    headers:new HttpHeaders({'Content-type':'application/json'})
  };

  getVideosFromUrl(url):Observable<Response<VideoHolder[]>>{
    return this.getDataFromUrl<Response<VideoHolder[]>>(
      url,'getting videos VideoService','getVideosFromUrl');
  }
  getPostsFromUrl(url):Observable<Response<PostHolder[]>>{
    return this.getDataFromUrl<Response<PostHolder[]>>(
      url,'getting posts VideoService','getPostsFromUrl');
  }
  getCommentsFromUrl(url):Observable<Response<CommentHolder[]>>{
    return this.getDataFromUrl<Response<CommentHolder[]>>(
      url,'getting comments VideoService','getCommentsFromUrl');
  }

  getDataFromUrl<T>(url:string,tapMessage:string,methodName:string){
    return this.http.get<T>(url)
    .pipe(
      tap(_=>console.log(tapMessage)),
      catchError(this.handleError<T>(methodName))
    );
  }





/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(error);
    console.log(`${operation} failed: ${error.message}`);
    return of(result as T);
  };
}




}
