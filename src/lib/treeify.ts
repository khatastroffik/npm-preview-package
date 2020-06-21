/**
 * npm-preview-package 
 *
 * License: MIT
 * Copyright (c) 2020, Loïs Bégué
 *
**/

import chalk from "chalk";
export type SortFunction = ( objPropA: [ string, unknown ], objPropB: [ string, unknown ] ) => number;

/** TREEIFIER OPTIONS */
export type TreeifierOptions = {
  colorMode?: TreeifierColorMode | undefined;
  sort?: boolean | SortFunction | undefined;
};

const DefaultTreeifierOptions = { colorMode: TreeifierColorMode.default, sort: false };

/** COLOR DEFINITIONS */
export const enum TreeifierColorMode {
  default ,
  dark ,
  bright,
  custom
}

type TreeColorsType = Record<number, chalk.Chalk[]>;

const defaultColors = [ chalk.keyword( 'lightgray' ), chalk.keyword( 'lightgray' ) ];
const darkColors = [ chalk.keyword('darkslategrey'), chalk.keyword('lightslategrey') ];
const brightColors = [ chalk.keyword('sandybrown'), chalk.keyword( 'ivory') ];
// const darkColors = [ chalk.hsl( 207, 44, 39 ), chalk.hsl( 210, 5, 63 ) ];
// const brightColors = [ chalk.hsl( 39, 85, 48 ), chalk.hsl( 60, 56, 91 ) ];

const treeColorsDefault: TreeColorsType = {
  [ TreeifierColorMode.default ]: defaultColors,
  [ TreeifierColorMode.dark ]: darkColors,
  [ TreeifierColorMode.bright ]: brightColors,
  [ TreeifierColorMode.custom ]: defaultColors,
};

/**
 * Generate a treeview representation of a given object
 *
 * @export
 * @class Treeifier
 */
export class Treeifier {
  private output: Array<string> = [];
  private options: TreeifierOptions = DefaultTreeifierOptions;
  private treeColors: TreeColorsType = { ...treeColorsDefault };

  setCustomColors( textColor: chalk.Chalk, treeColor: chalk.Chalk ): void {
    this.treeColors = { ...treeColorsDefault, [ TreeifierColorMode.custom ]: [ treeColor, textColor ] };
  }
  private colorize( content: string, isText: boolean ): string {  
    if ( this.options.colorMode == TreeifierColorMode.default || !chalk.supportsColor ) {
      return content;
    } else {
      const color = this.treeColors[ this.options.colorMode ?? DefaultTreeifierOptions.colorMode ][ isText ? 1 : 0 ];
      return color( content );
    }
  }
  private joint( index: number, maxIndex: number ): string {
    return ( index == maxIndex ) ? '└─ ' : '├─ ';
  }

  private updatePrefix( currentPrefix: string, remainingParent: number ): string {
    return currentPrefix + ( ( remainingParent == 0 ) ? '   ' : '│  ' );
  }

  private pushToOutput( prefix: string, index: number, maxIndex: number, label: string ): void {
    const coloredText = this.colorize( prefix, false ) + this.colorize( this.joint( index, maxIndex ), false ) + this.colorize( label, true );
    this.output.push( coloredText );
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private parseInternal( inObject: object, depth: number, prefix: string ): void {
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
      this.parseInternal( value, depth + 1, this.updatePrefix( prefix, maxIndex - index ) );
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
