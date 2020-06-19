/**
 * npm-preview-package 
 *
 * License: MIT
 * Copyright (c) 2020, Loïs Bégué
 *
**/

import packlist from 'npm-packlist';
import path from 'path';
import { Treeifier } from "./treeify";
import { explorerSort, normalizePath } from "./utils";

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

export function getPackageContentPreview( scanPath = defaultScanPath /*, options: PreviewOptions = {} */ ): string {
  const packageContent = getPackageContent( scanPath );
  const packageContentObject = getPackageContentObject( packageContent );
  const tree = new Treeifier().parse( packageContentObject );
  return normalizeScanPath( scanPath ) + '\n' + tree.join('\n').trim();
}

// BUG: library "npm-packlist" fails when path to scan contains an ending "/" -> need to normalize before scan i.e. remove last "/" char
