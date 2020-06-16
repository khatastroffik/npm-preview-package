#!/usr/bin/env node

/**
 * npm-preview-package 
 *
 * License: MIT
 * Copyright (c) 2020, Loïs Bégué
 *
**/

import { getPackageContent, getPackageContentPreview, FilesArray } from "./lib/index";


console.log( '----- Package Content -----' );
const packageContent: FilesArray = getPackageContent( "" );
console.log( packageContent.join( '\n' ) );

console.log( '----- Package Preview -----' );
const packageContentPreview = getPackageContentPreview( "" );
console.log( packageContentPreview );
