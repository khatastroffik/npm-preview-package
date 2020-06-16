/**
 * npm-preview-package 
 *
 * License: MIT
 * Copyright (c) 2020, Loïs Bégué
 *
**/

import { getPackageContent, getPackageContentPreview } from "../src/lib/index";
import 'jest-extended';
describe( 'library', () => {
  
  describe( 'getPackageContent', () => {
    it('should return content', () => {
      const content = getPackageContent( './test/fixture' );
      expect( content ).toContain( 'file01.txt' );
      expect( content ).toContain( 'file02.txt' );
      expect( content.indexOf( 'file02.txt' ) ).toBeGreaterThan( content.indexOf( 'file01.txt' ) );
    } );
    
    it( 'should return current package content', () => {
      const content = getPackageContent();
      expect( content ).toContain( 'package.json' );
      expect( content ).toContain( 'README.md' );
      expect( content ).not.toContain( 'index.spec.ts' );
    });
  } );
  
  describe('getPackageContentPreview', () => {
    it( 'should return preview', () => {
      const preview = getPackageContentPreview( './test/fixture' );
      expect( preview ).toContain( 'file01.txt' );
      expect( preview ).toContain( 'file02.txt' );
      expect( preview ).toContain( '├─' );
      expect( preview ).toContain( '└─' );
      expect( preview ).toContain( '/test/fixture' );
      expect( preview.indexOf( 'file02.txt' ) ).toBeGreaterThan( preview.indexOf( 'file01.txt' ) );
    } );

    it( 'should return current package preview', () => {
      const preview = getPackageContentPreview();
      expect( preview ).toContain( 'package.json' );
      expect( preview ).toContain( 'README.md' );
      expect( preview ).not.toContain( 'index.spec.ts' );
    } );    

  });

});
