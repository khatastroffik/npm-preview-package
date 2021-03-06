/**
 * npm-preview-package 
 *
 * License: MIT
 * Copyright (c) 2020, Loïs Bégué
 *
**/
import { Treeifier, TreeifierOptions, TreeifierColorMode } from "../src/lib/treeify";
import chalk from "chalk";
import 'jest-extended';

describe( 'Treeifier', () => {
  it( 'should be created and parse object', () => {
    const inputObject = { a: {}, b: { c: { d: null }, e: {} }, f: { g: null }, h: {} };
    const treeifier = new Treeifier();
    const result = treeifier.parse( inputObject );
    const expected = [ "├─ a", "├─ b", "│  ├─ c", "│  │  └─ d", "│  └─ e", "├─ f", "│  └─ g", "└─ h" ];
    expect( result ).toStrictEqual( expected );
  } );

  it( 'should return emptyness while parsing a null object ', () => {
    const inputObject = null;
    const treeifier = new Treeifier();
    const result = treeifier.parse( inputObject ).join( '\n' );
    expect( result ).toBeEmpty();

  } );
  it( 'should return emptyness when parsing an empty object ', () => {
    const inputObject = {};
    const treeifier = new Treeifier();
    const result = treeifier.parse( inputObject ).join( '\n' );
    expect( result ).toBeEmpty();
  } );

  describe( 'Sorting functionality', () => {
    it( 'should sort using integrated sort function', () => {
      const inputObject = { f: {}, b: { e: { d: null }, c: {} }, a: { g: null }, h: {} };
      const treeifier = new Treeifier();
      const treeifierOptions: TreeifierOptions = { sort: true };
      const result = treeifier.parse( inputObject, treeifierOptions );
      const expected = [ "├─ a", "│  └─ g", "├─ b", "│  ├─ c", "│  └─ e", "│     └─ d", "├─ f", "└─ h" ];
      expect( result ).toStrictEqual( expected );
    } );

    it( 'should sort using custom (client) sort function', () => {
      function customSort( objPropA: [ string, unknown ], objPropB: [ string, unknown ] ): number {
        return objPropA[ 0 ].localeCompare( objPropB[ 0 ] );
      }
      const inputObject = { f: {}, b: { e: { d: null }, c: {} }, a: { g: null }, h: {} };
      const treeifier = new Treeifier();
      const treeifierOptions: TreeifierOptions = { sort: customSort };
      const result = treeifier.parse( inputObject, treeifierOptions );
      const expected = [ "├─ a", "│  └─ g", "├─ b", "│  ├─ c", "│  └─ e", "│     └─ d", "├─ f", "└─ h" ];
      expect( result ).toStrictEqual( expected );
    } );
  } );

  describe( 'Coloring functionality', () => {
    it( 'should render using dark colors', () => {
      const inputObject = { a: {} };
      const treeifier = new Treeifier();
      const treeifierOptions: TreeifierOptions = { colorMode: TreeifierColorMode.dark };
      const result = treeifier.parse( inputObject, treeifierOptions );
      const expected = [ "└─ a" ];
      expect( result ).not.toStrictEqual( expected );
      expect( true ).toBeTrue();
    });
    it( 'should render using light colors', () => {
      const inputObject = { a: {}};
      const treeifier = new Treeifier();
      const treeifierOptions: TreeifierOptions = { colorMode: TreeifierColorMode.bright };
      const result = treeifier.parse( inputObject, treeifierOptions );
      const expectedTree = "[31m└─ ";
      const expectedText = "[31ma";
      expect( result.toString() ).not.toContain( expectedTree );
      expect( result.toString() ).not.toContain( expectedText );
    } );

    it( 'should render using custom colors', () => {
      const inputObject = { a: {} };
      const treeifier = new Treeifier();
      const treeifierOptions: TreeifierOptions = { colorMode: TreeifierColorMode.custom };
      treeifier.setCustomColors( chalk.keyword( 'ivory' ), chalk.keyword('sandybrown') );
      const result = treeifier.parse( inputObject, treeifierOptions );
      const expectedTree = "[31m└─ ";
      const expectedText = "[31ma";
      expect( result.toString() ).not.toContain( expectedTree );
      expect( result.toString() ).not.toContain( expectedText );

    } );
    
  });
} );
