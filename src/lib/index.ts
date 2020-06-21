/**
 * npm-preview-package 
 *
 * License: MIT
 * Copyright (c) 2020, Loïs Bégué
 *
**/

import packlist from 'npm-packlist';
import path from 'path';
import { Treeifier, TreeifierOptions, TreeifierColorMode } from "./treeify";
import { explorerSort, normalizePath } from "./utils";
import chalk from 'chalk';

const defaultScanPath = './';
type ContentObject = Record<string, unknown>;

export type FilesArray = Array<string>;
export type PreviewOptions = {
  color?: boolean;
  verbose?: boolean;
  stats?: boolean;
};

function normalizeScanPath( scanPath: string ): string {
  return normalizePath( path.resolve( scanPath ) );
}

function getPackageContentObject( files: FilesArray ): ContentObject {
  const tree = {} as ContentObject;
  files.forEach( ( file: string ) => {
    let node: ContentObject = tree;
    const relativePath = path.relative( './', file );
    relativePath.split( path.sep ).forEach( function ( part: string ) {
      typeof node[ part ] !== 'object' && ( node[ part ] = {} as Record<string, unknown> );
      node = node[ part ] as ContentObject;
    } );
  } );
  return tree;
}

export function getPackageContent( scanPath = defaultScanPath ): FilesArray {
  const content: FilesArray = packlist.sync( { path: scanPath } );
  return content.sort( explorerSort );
}

export function getPackageContentPreview( scanPath = defaultScanPath, colorMode?: TreeifierColorMode, customTextColor?: string, customBranchColor?: string ): string {
  const packageContent = getPackageContent( scanPath );
  const packageContentObject = getPackageContentObject( packageContent );
  const options: TreeifierOptions = { ...{ colorMode } };
  const treeifier = new Treeifier();
  treeifier.setCustomColors( chalk.keyword(customTextColor || 'lightgray'), chalk.keyword(customBranchColor || 'lightgray' ));
  const tree = treeifier.parse( packageContentObject, options );
  return normalizeScanPath( scanPath ) + '\n' + tree.join( '\n' ).trim();
}

// BUG: library "npm-packlist" fails when path to scan contains an ending "/" -> need to normalize before scan i.e. remove last "/" char
