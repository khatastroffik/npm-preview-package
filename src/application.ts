#!/usr/bin/env node

/**
 * npm-preview-package 
 *
 * License: MIT
 * Copyright (c) 2020, Loïs Bégué
 *
**/
import { Command } from 'commander';
import { getPackageContent, getPackageContentPreview, FilesArray } from "./lib/index";
import { getFileNameWithoutExtension } from "./lib/utils";
import { TreeifierColorMode } from './lib/treeify';
import chalk from 'chalk';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require( '../package.json' );
const command = new Command();
const packageVersion = pkg.version;
const cliName = ( ( typeof pkg.bin === 'object' ) ? Object.keys( pkg.bin )[ 0 ] : false ) || getFileNameWithoutExtension( pkg.bin ) || '';
let pathToScan = '';

command.usage( '[options] [path-to-the-package]' )
  .name( cliName )
  .description( `${ command.name() ? `"${ command.name() }" ` : '' }displays a preview of the content of a given package.` )
  .version( packageVersion, '-v, --version', 'output the version of this application' )
  .arguments( '[path-to-the-package]' )
  .action( ( pathToThePackage: string ) => { pathToScan = pathToThePackage; } )
  .option( '-l, --list', 'return a flat list instead of a treeview' )
  .option( '-d, --dark-colors', 'use (predifined) dark color for displaying the treeview' )
  .option( '-b, --bright-colors', 'use (predifined) bright color for displaying the treeview' )
  .option( '-c, --custom-colors', 'use custom color for displaying the treeview' )
  .option( '-tc, --text-color <color>', 'define the custom color of the text. See "extended help".' )
  .option( '-bc, --branch-color <color>', 'define the custom color of the tree branches. See "extended help".' )
  .option( '-eh, --extended-help', 'display additional help on "custom colors" and "Usage Examples"' )
  .on( '--help', () => {
    if ( !command.extendedHelp ) {
      console.log( '' );
      console.log( 'Display Extended Help:' );
      console.log( chalk.keyword( 'khaki' )( `  $ ${ command.name() } -eh` ));
    } else {
      console.log( '' );
      console.log( chalk.keyword( 'cornflowerblue' )( 'Custom colors:' ) );
      console.log( '' );
      console.log( '  All custom colors must match a standard CSS color name as defined by the W3C:' );
      console.log( '  (https://www.w3.org/wiki/CSS/Properties/color/keywords)' );
      console.log( '' );
      console.log( '  The custom colors may be (pre-) defined as ENV variables like so (e.g.):' );
      console.log( chalk.keyword( 'khaki' )( '    $ set TreeifierTextColor=orange' ));
      console.log( chalk.keyword( 'khaki' )( '    $ set TreeifierBranchColor=red' ));
      console.log( '  Hence, the allowed environment variables are:' );
      console.log( '    TreeifierTextColor' );
      console.log( '    TreeifierBranchColor' );
      console.log( '' );
      console.log( '  In case any env variable is set prior to calling the application, then' );
      console.log( '  the option "--custom-colors" may be used without requiring' );
      console.log( '  that the text and/or branch colors are explicitly set in the call.' );
      console.log( '' );
      console.log( '  If the custom colors are not explicitly set in the call, then they default to' );
      console.log( '  their corresponding ENV values (if defined) or to the default color "lightgray".' );
      console.log( '' );
      console.log( chalk.keyword( 'cornflowerblue' )( 'Example calls:' ) );
      console.log( '' );
      console.log( '  - scan the current directory (default)' );
      console.log( `    $ ${ chalk.keyword( 'khaki' )( command.name() ) }` );
      console.log( '' );
      console.log( '  - scan a specific directory (absolute or relative paths are permitted)' );
      console.log( chalk.keyword( 'khaki' )( `    $ ${ command.name() } ../some-other-app-directory` ) );
      console.log( '' );
      console.log( '  - scan the current directory and display the result as an ordered list' );
      console.log( chalk.keyword( 'khaki' )( `    $ ${ command.name() } --list` ) );
      console.log( '' );
      console.log( '  - display the preview using dark color mode' );
      console.log( chalk.keyword( 'khaki' )( `    $ ${ command.name() } --dark` ) );
      console.log( '' );
      console.log( '  - display the preview using custom colors' );
      console.log( chalk.keyword( 'khaki' )( `    $ ${ command.name() } --text-color orange --branch-color red` ) );
      console.log( '' );
      console.log( '  - display the preview using custom colors as defined per ENV variables' );
      console.log( chalk.keyword( 'khaki' )( `    $ ${ command.name() } --custom-colors` ) );
    }
  } )
  .parse();

function parseColor( color: string ): string {
  if ( !color ) return '';
  color = color.toLowerCase();
  try {
    chalk.keyword( color );
  } catch ( error ) {
    console.error( chalk.red( `Color name "${ color }" is not valid` ) );
    command.help();
  }
  return color;
}

if ( command.extendedHelp ) {
  command.help();
} else if ( command.list ) {
  const packageContent: FilesArray = getPackageContent( pathToScan );
  console.log( packageContent.join( '\n' ) );
} else {
  // try parsing the colors from command line arguments
  let textColor = parseColor( command.textColor );
  let branchColor = parseColor( command.branchColor );
  // get color mode from command line arguments
  let colorMode: TreeifierColorMode = TreeifierColorMode.default;
  command.darkColors && ( colorMode = TreeifierColorMode.dark );
  command.brightColors && ( colorMode = TreeifierColorMode.bright );
  command.customColors && ( colorMode = TreeifierColorMode.custom );
  // if any color is specified in command line arguments, the custom color mode should be selected automatically
  if ( textColor || branchColor ) colorMode = TreeifierColorMode.custom;
  // if color mode is custom then ensure the colors are set accordingly (default to "lightgray")
  if ( colorMode === TreeifierColorMode.custom ) {
    textColor = textColor || process.env.TreeifierTextColor || 'lightgray';
    branchColor = branchColor || process.env.TreeifierBranchColor || 'lightgray';
  }
  //const colorMode: TreeifierColorMode = command.darkColors ? TreeifierColorMode.dark : command.brightColors ? TreeifierColorMode.bright : command.customColors ? TreeifierColorMode.custom : TreeifierColorMode.default;
  const packageContentPreview = getPackageContentPreview( pathToScan, colorMode, textColor, branchColor );
  console.log( packageContentPreview );
}
process.exit( 0 );

// TODO: add 2 required (!) params to the option "custom" to retrieve the "textcolor" and "treecolor" as rgb value... 
//       then pass those values to "getPackageContentPreview";
