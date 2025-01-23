import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IElement } from '@core/interfaces/app.interface';
import { Observable } from 'rxjs/internal/Observable';
import elementData from '@core/json/elements.json';
import { Subscriber } from 'rxjs/internal/Subscriber';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private httpClient: HttpClient = inject(HttpClient);

  public getAllElements():Observable<IElement[]> {
    return new Observable((obs: Subscriber<IElement[]>) => {
      obs.next(elementData);
      obs.complete();
    });
  }
}
