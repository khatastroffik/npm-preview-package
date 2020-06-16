/**
 * npm-preview-package 
 *
 * License: MIT
 * Copyright (c) 2020, Loïs Bégué
 *
**/
import path from 'path';

export const explorerSort = function ( pathA: string, pathB: string ): number {
  const fileNameA = path.basename( pathA ).toLowerCase();
  const fileNameB = path.basename( pathB ).toLowerCase();
  const directoryA = path.dirname( pathA ).toLowerCase();
  const directoryB = path.dirname( pathB ).toLowerCase();
  const isRootA = ( directoryA === '.' );
  const isRootB = ( directoryB === '.' );
  if ( directoryA === directoryB ) return fileNameA.localeCompare( fileNameB );
  if ( isRootA != isRootB ) return isRootA ? 1 : -1;
  if ( directoryA.indexOf( directoryB ) == 0 ) return -1;
  if ( directoryB.indexOf( directoryA ) == 0 ) return 1;
  return directoryA.localeCompare( directoryB );
};

export function normalizePath( inputPath: string ): string {
  return inputPath.replace( /\\/g, '/' );
}

export function getFileNameWithoutExtension( filePath?: string ): string {
  return path.basename( filePath ?? '' ).replace( /(.+)\..+$/mg, '$1' );
}

// export const optimizedCompressionSort = function ( pathA: string, pathB: string ): number {
//   const extensionA = path.extname( pathA ).toLowerCase();
//   const extensionB = path.extname( pathB ).toLowerCase();
//   const fileNameA = path.basename( pathA ).toLowerCase();
//   const fileNameB = path.basename( pathB ).toLowerCase();
//   return extensionA.localeCompare( extensionB ) || fileNameA.localeCompare( fileNameB ) || pathA.localeCompare( pathB );
// };
