import 'reflect-metadata';
import {join} from 'path';
import {expect,use} from 'chai'
import chaiAsPromised from 'chai-as-promised';
use(chaiAsPromised);
import  'mocha'

/**
 * This Root Path is based on dist/${env} folder.
 * env : development : staging : production
 */
const rootPath = join(__dirname, '../../',);
console.log(rootPath);

/**
 * Configuring Module alais.
 */
require(rootPath+'module.alias.config')();
