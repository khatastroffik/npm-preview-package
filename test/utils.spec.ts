/**
 * npm-preview-package 
 *
 * License: MIT
 * Copyright (c) 2020, Loïs Bégué
 *
**/
import { explorerSort, normalizePath, getFileNameWithoutExtension } from "../src/lib/utils";
import 'jest-extended';

describe( 'utility', () => {

  describe( 'exploreSort', () => {

    function shuffle( inputArray: Array<string> ): Array<string> {
      // Fisher-Yates algorithm
      const result = [ ...inputArray ];
      for ( let i = result.length - 1; i > 0; i-- ) {
        const j = Math.floor( Math.random() * ( i + 1 ) );
        [ result[ i ], result[ j ] ] = [ result[ j ], result[ i ] ];
      }
      return result;
    }

    function arrayAreEqual( array1: Array<string>, array2: Array<string> ): boolean{
      return array1.every( ( element: string, index: number ) => element === array2[ index ] ) &&
        array2.every( ( element: string, index: number ) => element === array1[ index ] );
    }

    it( 'should sort', () => {
      const expectation = [
        ".dummydir/a.dummy",
        ".dummydir/dummy.js",
        ".dummydir/z.dummy",
        "dist/lib/.dummy",
        "dist/lib/a.dummy",
        "dist/lib/a.dummy.a",
        "dist/lib/a.dummy.z",
        "dist/lib/index.js",
        "dist/lib/m.dummy",
        "dist/lib/utils.js",
        "dist/lib/z.dummy",
        "dist/.dummy",
        "dist/a.dummy",
        "dist/application.js",
        "dist/z.dummy",
        "types/lib/index.d.js",
        "types/lib/utils.d.js",
        "types/application.d.js",        
        ".dummy",
        "a.dummy",
        "a.dummy.a",
        "a.dummy.z",
        "package.json",
        "README.md",
        "z.dummy"
      ];
      const fixture: Array<string> = shuffle( expectation );
      const result: Array<string> = fixture.sort( explorerSort );
      expect( arrayAreEqual( fixture, shuffle( expectation) ) ).toBeFalse();
      expect( arrayAreEqual( result, expectation ) ).toBeTrue();
    } );
  } );

  describe( 'normalizePath', () => {
    it('should replace "\\" with "/"', () => {
      expect( normalizePath( '\\' ) ).toEqual( '/' );
      expect( normalizePath( 'C:\\temp\\' ) ).toEqual( 'C:/temp/' );
      expect( normalizePath( '\\\\temp\\\\' ) ).toEqual( '//temp//' );
    });
  } );
  
  describe( 'getFileNameWithoutExtension', () => {
    it( 'should remove extension from path', () => {
      expect( getFileNameWithoutExtension() ).toEqual('');
      expect( getFileNameWithoutExtension('') ).toEqual('');
      expect( getFileNameWithoutExtension('a.b') ).toEqual('a');
      expect( getFileNameWithoutExtension('a/b.c') ).toEqual('b');
      expect( getFileNameWithoutExtension('a\\b.c') ).toEqual('b');
      expect( getFileNameWithoutExtension('c:\\a.b') ).toEqual('a');
      expect( getFileNameWithoutExtension('c:/a.b') ).toEqual('a');
      expect( getFileNameWithoutExtension('./a/b/c') ).toEqual('c');
      expect( getFileNameWithoutExtension('./a/b/c.d') ).toEqual('c');
      expect( getFileNameWithoutExtension('./a/b/c.d.e') ).toEqual('c.d');
      expect( getFileNameWithoutExtension('./../a.b') ).toEqual('a');
      expect( getFileNameWithoutExtension('.config') ).toEqual('.config');
      expect( getFileNameWithoutExtension('/a/b/.config') ).toEqual('.config');
      expect( getFileNameWithoutExtension('./a/b/.config') ).toEqual('.config');      
    });
    
  });
} );
