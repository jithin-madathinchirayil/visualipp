import { trigger, state, style, animate, transition } from '@angular/animations';

export const heightAnimation = trigger('heightAnimation', [
  state('collapsed', style({ height: '0'})),
  state('expanded', style({ height: 'auto',padding:'0.5rem'})),
  transition('collapsed <=> expanded', animate('250ms ease-in-out')),
]);