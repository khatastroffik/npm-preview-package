/**
 * npm-preview-package 
 *
 * License: MIT
 * Copyright (c) 2020, Loïs Bégué
 *
**/
export type SortFunction = ( objPropA: [ string, unknown ], objPropB: [ string, unknown ] ) => number;

export class Treeifier {
  private output: Array<string>;

  constructor() {
    this.output = [];
  }

  private joint( index: number, maxIndex: number ): string {
    return ( index == maxIndex ) ? '└─ ' : '├─ ';
  }

  private updatePrefix( currentPrefix: string, remainingParent: number ): string {
    return currentPrefix + ( ( remainingParent == 0 ) ? '   ' : '│  ' );
  }

  private pushToOutput( prefix: string, index: number, maxIndex: number, label: string ): void {
    this.output.push( prefix + this.joint( index, maxIndex ) + label );
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private parseInternal( inObject: object, depth: number, prefix: string, sortFunction: boolean | SortFunction ): void {
    const maxIndex = inObject && Object.entries( inObject ).length - 1;
    let entries = Object.entries( inObject );
    if ( sortFunction && maxIndex > 0 ) {
      if ( typeof sortFunction === 'function' )
        ( entries = entries.sort( sortFunction ) );
      else
        ( entries = entries.sort() );
    }
    entries.forEach( ( [ key, value ], index ) => {
      if ( !value || Object.getOwnPropertyNames( value ).length == 0 ) {
        this.pushToOutput( prefix, index, maxIndex, key );
        return;
      }
      this.pushToOutput( prefix, index, maxIndex, key );
      this.parseInternal( value, depth + 1, this.updatePrefix( prefix, maxIndex - index ), sortFunction );
    } );
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  parse( objectToParse?: object | null, sort?: boolean | SortFunction ): Array<string> {
    this.output = [];
    if ( !sort ) sort = false;
    if ( objectToParse ) this.parseInternal( objectToParse, 0, '', sort );
    return this.output;
  }
}


// function reverseSort( objPropA: [ string, unknown ], objPropB: [ string, unknown ]): number {
//   return objPropB[0].localeCompare( objPropA[0] );
// }
