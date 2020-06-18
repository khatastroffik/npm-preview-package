/**
 * npm-preview-package 
 *
 * License: MIT
 * Copyright (c) 2020, Loïs Bégué
 *
**/
import { Treeifier } from "../src/lib/treeify";
import 'jest-extended';

describe( 'Treeifier class', () => {
  it( 'should be created and parse object', () => {
    const inputObject = { a: {}, b: { c: { d: null }, e: {} }, f: { g: null }, h: {} };
    const treeifier = new Treeifier();
    const result = treeifier.parse( inputObject );
    const expected = [ "├─ a", "├─ b", "│  ├─ c", "│  │  └─ d", "│  └─ e", "├─ f", "│  └─ g", "└─ h" ];    
    expect( result ).toStrictEqual( expected);
  } );
  
});
