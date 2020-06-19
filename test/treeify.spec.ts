/**
 * npm-preview-package 
 *
 * License: MIT
 * Copyright (c) 2020, Loïs Bégué
 *
**/
import { Treeifier } from "../src/lib/treeify";
import 'jest-extended';

describe( 'Treeifier', () => {
  it( 'should be created and parse object', () => {
    const inputObject = { a: {}, b: { c: { d: null }, e: {} }, f: { g: null }, h: {} };
    const treeifier = new Treeifier();
    const result = treeifier.parse( inputObject );
    const expected = [ "├─ a", "├─ b", "│  ├─ c", "│  │  └─ d", "│  └─ e", "├─ f", "│  └─ g", "└─ h" ];    
    expect( result ).toStrictEqual( expected);
  } );
  
  it( 'should return emptyness while parsing a null object ', () => {
    const inputObject = null;
    const treeifier = new Treeifier();
    const result = treeifier.parse( inputObject ).join('\n');
    expect( result ).toBeEmpty();
    
  } );
  it( 'should return emptyness when parsing an empty object ', () => {
    const inputObject = {};
    const treeifier = new Treeifier();
    const result = treeifier.parse( inputObject ).join( '\n' );
    expect( result ).toBeEmpty();
  } );

  it( 'should sort using integrated sort function', () => {
    const inputObject = { f: {}, b: { e: { d: null }, c: {} }, a: { g: null }, h: {} };
    const treeifier = new Treeifier();
    const result = treeifier.parse( inputObject, true);
    const expected = [ "├─ a", "│  └─ g", "├─ b", "│  ├─ c", "│  └─ e", "│     └─ d", "├─ f", "└─ h"];
    expect( result ).toStrictEqual( expected );
  });
  
  it( 'should sort using custom (client) sort function', () => {
    function customSort( objPropA: [ string, unknown ], objPropB: [ string, unknown ]): number {
      return objPropA[0].localeCompare( objPropB[0] );
    }
    const inputObject = { f: {}, b: { e: { d: null }, c: {} }, a: { g: null }, h: {} };
    const treeifier = new Treeifier();
    const result = treeifier.parse( inputObject, customSort );
    const expected = [ "├─ a", "│  └─ g", "├─ b", "│  ├─ c", "│  └─ e", "│     └─ d", "├─ f", "└─ h" ];
    expect( result ).toStrictEqual( expected );
  } );  
});
