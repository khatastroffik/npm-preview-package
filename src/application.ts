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

const command = new Command();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require( '../package.json' );
const packageVersion = pkg.version;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function retrieveCLIname( pkg: any ): string {
  return ( ( typeof pkg.bin === 'object' ) ? Object.keys( pkg.bin )[ 0 ] : false ) || getFileNameWithoutExtension( pkg.bin ) || '';
}

let pathToScan = '';
const cliName = retrieveCLIname( pkg );

command.usage( '[options] [path-to-the-package]' )
  .name( cliName )
  .description( `${ cliName ? `"${ cliName }" ` : '' }displays a preview of the content of a given package.` )
  .version( packageVersion, '-v, --version', 'output the version of this application' )
  .arguments( '[path-to-the-package]' )
  .action( ( pathToThePackage: string ) => { pathToScan = pathToThePackage; } )
  .option( '-l, --list', 'return a flat list instead of a treeview' )
  .parse();

if ( command.list ) {
  const packageContent: FilesArray = getPackageContent( pathToScan );
  console.log( packageContent.join( '\n' ) );
} else {
  const packageContentPreview = getPackageContentPreview( pathToScan );
  console.log( packageContentPreview );
}
process.exit( 0 );
