import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchArtist'
})

@Injectable()
export class SearchArtistPipe implements PipeTransform {
    transform(items: any, term: any):any{
        if(term === undefined){
            return items;
        }

        /* itera continuamente items busca en los nombres de los elementos un string que este contenido dentro de ellos */
        /*
            items -> array/lista de objetos 
            term -> termino de busqueda
            Si el termino de busqueda está vacío (undefined) devuelve todos los elementos 
            En el caso de que no, utilizo funcion de javascript (filter()) que tiene una funcion de callback
            que va a ir iterando los elementos y busca en los nombres de esos elementos el término (term) que este incluido en ellos (nombres)
            si escribe "caballo" y existe caballo lo va a devolver 
        */
        return (items || []).filter(function(item){
            return item.name.toLowerCase().includes(term.toLowerCase());
        });
    }
}