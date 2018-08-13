import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { MessageService } from './message.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

  @Injectable()
export class HeroService {

 //private getHeroesUrl = 'api/heroes';  // URL to web api

  private getHeroesUrl: string = 'http://localhost:8080/getHeroes';
  private getHeroByNameUrl: string = 'http://localhost:8080/getHero';
  private addNewHeroUrl: string = 'http://localhost:8080/newhero';
  private deleteHeroUrl: string = 'http://localhost:8080/deletehero';
  private updateHeroUrl: string = 'http://localhost:8080/updatehero';
  private findTermUrl: string = 'http://localhost:8080//findByTerm';

  private json: string;
  public response: string = "";

  constructor(private http: HttpClient, private messageService: MessageService) { 

  //just logging
  this.http.post('http://localhost:8080/getHeroes', 'POST').subscribe(data => {   console.log(data);  });

}


  /** GET heroes from the server */
  getHeroes (): Observable<Hero[]> {
    return this.http.post<Hero[]>(this.getHeroesUrl, '')
      .pipe(
        tap(heroes => this.log(`fetched heroes`)),
        catchError(this.handleError('getHeroes', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getHeroNo404<Data>(name: string): Observable<Hero> {
    const url = `${this.getHeroByNameUrl}/${name}`;
    return this.http.post<Hero[]>(url, httpOptions)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero name=${name}`);
        }),
        catchError(this.handleError<Hero>(`getHero name=${name}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(name: string): Observable<Hero> {
  
    const url = `${this.getHeroByNameUrl}/${name}`;
    return this.http.post<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`fetched hero name=${name}`)),
      catchError(this.handleError<Hero>(`getHero name=${name}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }

    const url = `${this.findTermUrl}/${term}`;
    return this.http.post<Hero[]>(url, httpOptions).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addHero (hero: Hero): Observable<any> {
  const parameter = JSON.stringify(hero);
    return this.http.post<Hero>(this.addNewHeroUrl, parameter, httpOptions);
  }

  /** DELETE: delete the hero from the server */
  deleteHero (hero: Hero): Observable<Hero> {
    const parameter = JSON.stringify(hero);
    return this.http.post<Hero>(this.deleteHeroUrl, parameter, httpOptions).pipe(
      tap(_ => this.log(`deleted hero name=${hero.name}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

 /** PUT: update the hero on the server */
  updateHero (hero: Hero): Observable<Hero> {
    const parameter = JSON.stringify(hero);
    return this.http.post<Hero>(this.updateHeroUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero name=${hero.name}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }
}