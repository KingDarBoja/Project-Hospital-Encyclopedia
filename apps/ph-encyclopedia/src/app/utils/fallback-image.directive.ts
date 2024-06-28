import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'img[fallbackSrc]',
  standalone: true,
})
export class ImageFallbackDirective {
  @Input() handleImgError?: string;

  @HostListener('error', ['$event'])
  handleImageError(event: Event): void {
    event.stopPropagation();
    const image = event.target as HTMLInputElement;
    image.src = this.handleImgError ?? 'assets/icons/ph_icon_01.png'; // e.g. ./assets/images/default-image.png
  }
}
