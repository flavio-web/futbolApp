import { Pipe, PipeTransform } from '@angular/core';
import { Futbolista } from '../interfaces/interface';

@Pipe({
  name: 'futbolImg'
})
export class FutbolImgPipe implements PipeTransform {

  transform( futbolista: Futbolista | undefined ): string {

    if( !futbolista?.imagen ) return 'img/no-image.png';

    return futbolista.imagen;
  }

}
