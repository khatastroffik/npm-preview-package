/**
 * npm-preview-package 
 *
 * License: MIT
 * Copyright (c) 2020, Loïs Bégué
 *
**/
export type SortFunction = ( objPropA: [ string, unknown ], objPropB: [ string, unknown ] ) => number;

export enum TreeifierColorMode {
  default = 1,
  dark = 2,
  light = 3
}

export type TreeifierOptions = {
  colorMode?: TreeifierColorMode | undefined;
  sort?: boolean | SortFunction | undefined;
};

const DefaultTreeifierOptions = { colorMode: TreeifierColorMode.default, sort: false };

export class Treeifier {
  private output: Array<string> = [];
  private options: TreeifierOptions = DefaultTreeifierOptions;

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
  private parseInternal( inObject: object, depth: number, prefix: string): void {
    const maxIndex = inObject && Object.entries( inObject ).length - 1;
    let entries = Object.entries( inObject );
    const sortFunction = this.options.sort;
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
      this.parseInternal( value, depth + 1, this.updatePrefix( prefix, maxIndex - index ));
    } );
  }


  // eslint-disable-next-line @typescript-eslint/ban-types
  parse( objectToParse?: object | null, options?: TreeifierOptions ): Array<string> {
    this.output = [];
    // initialize with default values and adapt with provided values
    this.options = { ...DefaultTreeifierOptions, ...options };
    if ( objectToParse ) this.parseInternal( objectToParse, 0, '' );
    return this.output;
  }
}


// function reverseSort( objPropA: [ string, unknown ], objPropB: [ string, unknown ]): number {
//   return objPropB[0].localeCompare( objPropA[0] );
// }
