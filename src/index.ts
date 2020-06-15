
import * as packlist from 'npm-packlist';
import * as path from 'path';
import * as treeify from "treeify";
import { explorerSort, optimizedCompressionSort, normalizePath } from "./utils";

type FilesArray = Array<string>;
const defaultScanPath = './';

function buildTreeFromFiles( files: FilesArray ): object {
  var tree = {};
  files.forEach( file => {
    let node = tree;
    let relativePath = path.relative( './', file );
    if ( relativePath.indexOf( '..' ) !== 0 ) {
      relativePath.split( path.sep ).forEach( function ( part ) {
        typeof node[part] !== 'object' && ( node[part] = {} );
        node = node[part];
      } );
    }
  } );
  return tree;
}

const scanPath = defaultScanPath;

packlist( { path: scanPath } )
  .then( ( files: FilesArray ) => {
    files = files.sort( explorerSort );
    // console.log( files.join( '\n' ) );
    var fileTree = buildTreeFromFiles( files );
    const p = normalizePath(path.resolve(scanPath));
    console.log( p );
    console.log( treeify.asTree( fileTree, true ) );
    process.exit( 0 );
  } )
  .catch( error => {
    // ref: https://nodejs.org/api/errors.html#errors_common_system_errors
    if (error.code = 'ENOENT') {
      console.error(`[ERROR] No such file or directory: ${scanPath}` );
    } else {
      console.error( error );
    }
    process.exit( 1 );
  } );
