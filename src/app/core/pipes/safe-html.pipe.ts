import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml',
  standalone: true
})
export class SafeHtmlPipe implements PipeTransform {
  private sanitizer: DomSanitizer = inject(DomSanitizer);
  transform(value: string | undefined): SafeHtml | null {
    if(!value) return null;
    return this.sanitizer.bypassSecurityTrustHtml(value)
  }

}
