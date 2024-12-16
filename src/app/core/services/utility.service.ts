import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  public uidGenerator(): Promise<string> {
    return new Promise((resolve) => {
      resolve(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
    }) 
  }

  public fileToDataURI(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader: FileReader = new FileReader();
      reader.onload = (event: any) => {
        resolve(event.target.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }
}
