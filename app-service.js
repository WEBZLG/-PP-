	var __wxAppData = __wxAppData || {}; 	var __wxRoute = __wxRoute || ""; 	var __wxRouteBegin = __wxRouteBegin || ""; 	var __wxAppCode__ = __wxAppCode__ || {};	var global = global || {};	var __WXML_GLOBAL__=__WXML_GLOBAL__ || {};	var __wxAppCurrentFile__=__wxAppCurrentFile__||""; 	var Component = Component || function(){};	var definePlugin = definePlugin || function(){};	var requirePlugin = requirePlugin || function(){};	var Behavior = Behavior || function(){};
	/*v0.5vv_20181221_syb_scopedata*/global.__wcc_version__='v0.5vv_20181221_syb_scopedata';global.__wcc_version_info__={"customComponents":true,"fixZeroRpx":true,"propValueDeepCopy":false};
var $gwxc
var $gaic={}
$gwx=function(path,global){
if(typeof global === 'undefined') global={};if(typeof __WXML_GLOBAL__ === 'undefined') {__WXML_GLOBAL__={};
}__WXML_GLOBAL__.modules = __WXML_GLOBAL__.modules || {};
function _(a,b){if(typeof(b)!='undefined')a.children.push(b);}
function _v(k){if(typeof(k)!='undefined')return {tag:'virtual','wxKey':k,children:[]};return {tag:'virtual',children:[]};}
function _n(tag){$gwxc++;if($gwxc>=16000){throw 'Dom limit exceeded, please check if there\'s any mistake you\'ve made.'};return {tag:'wx-'+tag,attr:{},children:[],n:[],raw:{},generics:{}}}
function _p(a,b){b&&a.properities.push(b);}
function _s(scope,env,key){return typeof(scope[key])!='undefined'?scope[key]:env[key]}
function _wp(m){console.warn("WXMLRT_$gwx:"+m)}
function _wl(tname,prefix){_wp(prefix+':-1:-1:-1: Template `' + tname + '` is being called recursively, will be stop.')}
$gwn=console.warn;
$gwl=console.log;
function $gwh()
{
function x()
{
}
x.prototype = 
{
hn: function( obj, all )
{
if( typeof(obj) == 'object' )
{
var cnt=0;
var any1=false,any2=false;
for(var x in obj)
{
any1=any1|x==='__value__';
any2=any2|x==='__wxspec__';
cnt++;
if(cnt>2)break;
}
return cnt == 2 && any1 && any2 && ( all || obj.__wxspec__ !== 'm' || this.hn(obj.__value__) === 'h' ) ? "h" : "n";
}
return "n";
},
nh: function( obj, special )
{
return { __value__: obj, __wxspec__: special ? special : true }
},
rv: function( obj )
{
return this.hn(obj,true)==='n'?obj:this.rv(obj.__value__);
},
hm: function( obj )
{
if( typeof(obj) == 'object' )
{
var cnt=0;
var any1=false,any2=false;
for(var x in obj)
{
any1=any1|x==='__value__';
any2=any2|x==='__wxspec__';
cnt++;
if(cnt>2)break;
}
return cnt == 2 && any1 && any2 && (obj.__wxspec__ === 'm' || this.hm(obj.__value__) );
}
return false;
}
}
return new x;
}
wh=$gwh();
function $gstack(s){
var tmp=s.split('\n '+' '+' '+' ');
for(var i=0;i<tmp.length;++i){
if(0==i) continue;
if(")"===tmp[i][tmp[i].length-1])
tmp[i]=tmp[i].replace(/\s\(.*\)$/,"");
else
tmp[i]="at anonymous function";
}
return tmp.join('\n '+' '+' '+' ');
}
function $gwrt( should_pass_type_info )
{
function ArithmeticEv( ops, e, s, g, o )
{
var _f = false;
var rop = ops[0][1];
var _a,_b,_c,_d, _aa, _bb;
switch( rop )
{
case '?:':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && ( wh.hn(_a) === 'h' );
_d = wh.rv( _a ) ? rev( ops[2], e, s, g, o, _f ) : rev( ops[3], e, s, g, o, _f );
_d = _c && wh.hn( _d ) === 'n' ? wh.nh( _d, 'c' ) : _d;
return _d;
break;
case '&&':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && ( wh.hn(_a) === 'h' );
_d = wh.rv( _a ) ? rev( ops[2], e, s, g, o, _f ) : wh.rv( _a );
_d = _c && wh.hn( _d ) === 'n' ? wh.nh( _d, 'c' ) : _d;
return _d;
break;
case '||':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && ( wh.hn(_a) === 'h' );
_d = wh.rv( _a ) ? wh.rv(_a) : rev( ops[2], e, s, g, o, _f );
_d = _c && wh.hn( _d ) === 'n' ? wh.nh( _d, 'c' ) : _d;
return _d;
break;
case '+':
case '*':
case '/':
case '%':
case '|':
case '^':
case '&':
case '===':
case '==':
case '!=':
case '!==':
case '>=':
case '<=':
case '>':
case '<':
case '<<':
case '>>':
_a = rev( ops[1], e, s, g, o, _f );
_b = rev( ops[2], e, s, g, o, _f );
_c = should_pass_type_info && (wh.hn( _a ) === 'h' || wh.hn( _b ) === 'h');
switch( rop )
{
case '+':
_d = wh.rv( _a ) + wh.rv( _b );
break;
case '*':
_d = wh.rv( _a ) * wh.rv( _b );
break;
case '/':
_d = wh.rv( _a ) / wh.rv( _b );
break;
case '%':
_d = wh.rv( _a ) % wh.rv( _b );
break;
case '|':
_d = wh.rv( _a ) | wh.rv( _b );
break;
case '^':
_d = wh.rv( _a ) ^ wh.rv( _b );
break;
case '&':
_d = wh.rv( _a ) & wh.rv( _b );
break;
case '===':
_d = wh.rv( _a ) === wh.rv( _b );
break;
case '==':
_d = wh.rv( _a ) == wh.rv( _b );
break;
case '!=':
_d = wh.rv( _a ) != wh.rv( _b );
break;
case '!==':
_d = wh.rv( _a ) !== wh.rv( _b );
break;
case '>=':
_d = wh.rv( _a ) >= wh.rv( _b );
break;
case '<=':
_d = wh.rv( _a ) <= wh.rv( _b );
break;
case '>':
_d = wh.rv( _a ) > wh.rv( _b );
break;
case '<':
_d = wh.rv( _a ) < wh.rv( _b );
break;
case '<<':
_d = wh.rv( _a ) << wh.rv( _b );
break;
case '>>':
_d = wh.rv( _a ) >> wh.rv( _b );
break;
default:
break;
}
return _c ? wh.nh( _d, "c" ) : _d;
break;
case '-':
_a = ops.length === 3 ? rev( ops[1], e, s, g, o, _f ) : 0;
_b = ops.length === 3 ? rev( ops[2], e, s, g, o, _f ) : rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && (wh.hn( _a ) === 'h' || wh.hn( _b ) === 'h');
_d = _c ? wh.rv( _a ) - wh.rv( _b ) : _a - _b;
return _c ? wh.nh( _d, "c" ) : _d;
break;
case '!':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && (wh.hn( _a ) == 'h');
_d = !wh.rv(_a);
return _c ? wh.nh( _d, "c" ) : _d;
case '~':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && (wh.hn( _a ) == 'h');
_d = ~wh.rv(_a);
return _c ? wh.nh( _d, "c" ) : _d;
default:
$gwn('unrecognized op' + rop );
}
}
function rev( ops, e, s, g, o, newap )
{
var op = ops[0];
var _f = false;
if ( typeof newap !== "undefined" ) o.ap = newap;
if( typeof(op)==='object' )
{
var vop=op[0];
var _a, _aa, _b, _bb, _c, _d, _s, _e, _ta, _tb, _td;
switch(vop)
{
case 2:
return ArithmeticEv(ops,e,s,g,o);
break;
case 4: 
return rev( ops[1], e, s, g, o, _f );
break;
case 5: 
switch( ops.length )
{
case 2: 
_a = rev( ops[1],e,s,g,o,_f );
return should_pass_type_info?[_a]:[wh.rv(_a)];
return [_a];
break;
case 1: 
return [];
break;
default:
_a = rev( ops[1],e,s,g,o,_f );
_b = rev( ops[2],e,s,g,o,_f );
_a.push( 
should_pass_type_info ?
_b :
wh.rv( _b )
);
return _a;
break;
}
break;
case 6:
_a = rev(ops[1],e,s,g,o);
var ap = o.ap;
_ta = wh.hn(_a)==='h';
_aa = _ta ? wh.rv(_a) : _a;
o.is_affected |= _ta;
if( should_pass_type_info )
{
if( _aa===null || typeof(_aa) === 'undefined' )
{
return _ta ? wh.nh(undefined, 'e') : undefined;
}
_b = rev(ops[2],e,s,g,o,_f);
_tb = wh.hn(_b) === 'h';
_bb = _tb ? wh.rv(_b) : _b;
o.ap = ap;
o.is_affected |= _tb;
if( _bb===null || typeof(_bb) === 'undefined' || 
_bb === "__proto__" || _bb === "prototype" || _bb === "caller" ) 
{
return (_ta || _tb) ? wh.nh(undefined, 'e') : undefined;
}
_d = _aa[_bb];
if ( typeof _d === 'function' && !ap ) _d = undefined;
_td = wh.hn(_d)==='h';
o.is_affected |= _td;
return (_ta || _tb) ? (_td ? _d : wh.nh(_d, 'e')) : _d;
}
else
{
if( _aa===null || typeof(_aa) === 'undefined' )
{
return undefined;
}
_b = rev(ops[2],e,s,g,o,_f);
_tb = wh.hn(_b) === 'h';
_bb = _tb ? wh.rv(_b) : _b;
o.ap = ap;
o.is_affected |= _tb;
if( _bb===null || typeof(_bb) === 'undefined' || 
_bb === "__proto__" || _bb === "prototype" || _bb === "caller" ) 
{
return undefined;
}
_d = _aa[_bb];
if ( typeof _d === 'function' && !ap ) _d = undefined;
_td = wh.hn(_d)==='h';
o.is_affected |= _td;
return _td ? wh.rv(_d) : _d;
}
case 7: 
switch(ops[1][0])
{
case 11:
o.is_affected |= wh.hn(g)==='h';
return g;
case 3:
_s = wh.rv( s );
_e = wh.rv( e );
_b = ops[1][1];
if (g && g.f && g.f.hasOwnProperty(_b) )
{
_a = g.f;
o.ap = true;
}
else
{
_a = _s && _s.hasOwnProperty(_b) ? 
s : (_e && _e.hasOwnProperty(_b) ? e : undefined );
}
if( should_pass_type_info )
{
if( _a )
{
_ta = wh.hn(_a) === 'h';
_aa = _ta ? wh.rv( _a ) : _a;
_d = _aa[_b];
_td = wh.hn(_d) === 'h';
o.is_affected |= _ta || _td;
_d = _ta && !_td ? wh.nh(_d,'e') : _d;
return _d;
}
}
else
{
if( _a )
{
_ta = wh.hn(_a) === 'h';
_aa = _ta ? wh.rv( _a ) : _a;
_d = _aa[_b];
_td = wh.hn(_d) === 'h';
o.is_affected |= _ta || _td;
return wh.rv(_d);
}
}
return undefined;
}
break;
case 8: 
_a = {};
_a[ops[1]] = rev(ops[2],e,s,g,o,_f);
return _a;
break;
case 9: 
_a = rev(ops[1],e,s,g,o,_f);
_b = rev(ops[2],e,s,g,o,_f);
function merge( _a, _b, _ow )
{
var ka, _bbk;
_ta = wh.hn(_a)==='h';
_tb = wh.hn(_b)==='h';
_aa = wh.rv(_a);
_bb = wh.rv(_b);
for(var k in _bb)
{
if ( _ow || !_aa.hasOwnProperty(k) )
{
_aa[k] = should_pass_type_info ? (_tb ? wh.nh(_bb[k],'e') : _bb[k]) : wh.rv(_bb[k]);
}
}
return _a;
}
var _c = _a
var _ow = true
if ( typeof(ops[1][0]) === "object" && ops[1][0][0] === 10 ) {
_a = _b
_b = _c
_ow = false
}
if ( typeof(ops[1][0]) === "object" && ops[1][0][0] === 10 ) {
var _r = {}
return merge( merge( _r, _a, _ow ), _b, _ow );
}
else
return merge( _a, _b, _ow );
break;
case 10:
_a = rev(ops[1],e,s,g,o,_f);
_a = should_pass_type_info ? _a : wh.rv( _a );
return _a ;
break;
case 12:
var _r;
_a = rev(ops[1],e,s,g,o);
if ( !o.ap )
{
return should_pass_type_info && wh.hn(_a)==='h' ? wh.nh( _r, 'f' ) : _r;
}
var ap = o.ap;
_b = rev(ops[2],e,s,g,o,_f);
o.ap = ap;
_ta = wh.hn(_a)==='h';
_tb = _ca(_b);
_aa = wh.rv(_a);	
_bb = wh.rv(_b); snap_bb=$gdc(_bb,"nv_");
try{
_r = typeof _aa === "function" ? $gdc(_aa.apply(null, snap_bb)) : undefined;
} catch (e){
e.message = e.message.replace(/nv_/g,"");
e.stack = e.stack.substring(0,e.stack.indexOf("\n", e.stack.lastIndexOf("at nv_")));
e.stack = e.stack.replace(/\snv_/g," "); 
e.stack = $gstack(e.stack);	
if(g.debugInfo)
{
e.stack += "\n "+" "+" "+" at "+g.debugInfo[0]+":"+g.debugInfo[1]+":"+g.debugInfo[2];
console.error(e);
}
_r = undefined;
}
return should_pass_type_info && (_tb || _ta) ? wh.nh( _r, 'f' ) : _r;
}
}
else
{
if( op === 3 || op === 1) return ops[1];
else if( op === 11 ) 
{
var _a='';
for( var i = 1 ; i < ops.length ; i++ )
{
var xp = wh.rv(rev(ops[i],e,s,g,o,_f));
_a += typeof(xp) === 'undefined' ? '' : xp;
}
return _a;
}
}
}
function wrapper( ops, e, s, g, o, newap )
{
if( ops[0] == '11182016' )
{
g.debugInfo = ops[2];
return rev( ops[1], e, s, g, o, newap );
}
else
{
g.debugInfo = null;
return rev( ops, e, s, g, o, newap );
}
}
return wrapper;
}
gra=$gwrt(true); 
grb=$gwrt(false); 
function TestTest( expr, ops, e,s,g, expect_a, expect_b, expect_affected )
{
{
var o = {is_affected:false};
var a = gra( ops, e,s,g, o );
if( JSON.stringify(a) != JSON.stringify( expect_a )
|| o.is_affected != expect_affected )
{
console.warn( "A. " + expr + " get result " + JSON.stringify(a) + ", " + o.is_affected + ", but " + JSON.stringify( expect_a ) + ", " + expect_affected + " is expected" );
}
}
{
var o = {is_affected:false};
var a = grb( ops, e,s,g, o );
if( JSON.stringify(a) != JSON.stringify( expect_b )
|| o.is_affected != expect_affected )
{
console.warn( "B. " + expr + " get result " + JSON.stringify(a) + ", " + o.is_affected + ", but " + JSON.stringify( expect_b ) + ", " + expect_affected + " is expected" );
}
}
}

function wfor( to_iter, func, env, _s, global, father, itemname, indexname, keyname )
{
var _n = wh.hn( to_iter ) === 'n'; 
var scope = wh.rv( _s ); 
var has_old_item = scope.hasOwnProperty(itemname);
var has_old_index = scope.hasOwnProperty(indexname);
var old_item = scope[itemname];
var old_index = scope[indexname];
var full = Object.prototype.toString.call(wh.rv(to_iter));
var type = full[8]; 
if( type === 'N' && full[10] === 'l' ) type = 'X'; 
var _y;
if( _n )
{
if( type === 'A' ) 
{
var r_iter_item;
for( var i = 0 ; i < to_iter.length ; i++ )
{
scope[itemname] = to_iter[i];
scope[indexname] = _n ? i : wh.nh(i, 'h');
r_iter_item = wh.rv(to_iter[i]);
var key = keyname && r_iter_item ? (keyname==="*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
_y = _v(key);
_(father,_y);
func( env, scope, _y, global );
}
}
else if( type === 'O' ) 
{
var i = 0;
var r_iter_item;
for( var k in to_iter )
{
scope[itemname] = to_iter[k];
scope[indexname] = _n ? k : wh.nh(k, 'h');
r_iter_item = wh.rv(to_iter[k]);
var key = keyname && r_iter_item ? (keyname==="*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
_y = _v(key);
_(father,_y);
func( env,scope,_y,global );
i++;
}
}
else if( type === 'S' ) 
{
for( var i = 0 ; i < to_iter.length ; i++ )
{
scope[itemname] = to_iter[i];
scope[indexname] = _n ? i : wh.nh(i, 'h');
_y = _v( to_iter[i] + i );
_(father,_y);
func( env,scope,_y,global );
}
}
else if( type === 'N' ) 
{
for( var i = 0 ; i < to_iter ; i++ )
{
scope[itemname] = i;
scope[indexname] = _n ? i : wh.nh(i, 'h');
_y = _v( i );
_(father,_y);
func(env,scope,_y,global);
}
}
else
{
}
}
else
{
var r_to_iter = wh.rv(to_iter);
var r_iter_item, iter_item;
if( type === 'A' ) 
{
for( var i = 0 ; i < r_to_iter.length ; i++ )
{
iter_item = r_to_iter[i];
iter_item = wh.hn(iter_item)==='n' ? wh.nh(iter_item,'h') : iter_item;
r_iter_item = wh.rv( iter_item );
scope[itemname] = iter_item
scope[indexname] = _n ? i : wh.nh(i, 'h');
var key = keyname && r_iter_item ? (keyname==="*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
_y = _v(key);
_(father,_y);
func( env, scope, _y, global );
}
}
else if( type === 'O' ) 
{
var i=0;
for( var k in r_to_iter )
{
iter_item = r_to_iter[k];
iter_item = wh.hn(iter_item)==='n'? wh.nh(iter_item,'h') : iter_item;
r_iter_item = wh.rv( iter_item );
scope[itemname] = iter_item;
scope[indexname] = _n ? k : wh.nh(k, 'h');
var key = keyname && r_iter_item ? (keyname==="*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
_y=_v(key);
_(father,_y);
func( env, scope, _y, global );
i++
}
}
else if( type === 'S' ) 
{
for( var i = 0 ; i < r_to_iter.length ; i++ )
{
iter_item = wh.nh(r_to_iter[i],'h');
scope[itemname] = iter_item;
scope[indexname] = _n ? i : wh.nh(i, 'h');
_y = _v( to_iter[i] + i );
_(father,_y);
func( env, scope, _y, global );
}
}
else if( type === 'N' ) 
{
for( var i = 0 ; i < r_to_iter ; i++ )
{
iter_item = wh.nh(i,'h');
scope[itemname] = iter_item;
scope[indexname]= _n ? i : wh.nh(i,'h');
_y = _v( i );
_(father,_y);
func(env,scope,_y,global);
}
}
else
{
}
}
if(has_old_item)
{
scope[itemname]=old_item;
}
else
{
delete scope[itemname];
}
if(has_old_index)
{
scope[indexname]=old_index;
}
else
{
delete scope[indexname];
}
}

function _ca(o)
{ 
if ( wh.hn(o) == 'h' ) return true;
if ( typeof o !== "object" ) return false;
for(var i in o){ 
if ( o.hasOwnProperty(i) ){
if (_ca(o[i])) return true;
}
}
return false;
}
function _da( node, attrname, opindex, raw, o )
{
var isaffected = false;
var value = $gdc( raw, "", 2 );
if ( o.ap && value && value.constructor===Function ) 
{
attrname = "$wxs:" + attrname; 
node.attr["$gdc"] = $gdc;
}
if ( o.is_affected || _ca(raw) ) 
{
node.n.push( attrname );
node.raw[attrname] = raw;
}
node.attr[attrname] = value;
}
function _r( node, attrname, opindex, env, scope, global ) 
{
global.opindex=opindex;
var o = {}, _env;
var a = grb( z[opindex], env, scope, global, o );
_da( node, attrname, opindex, a, o );
}
function _rz( z, node, attrname, opindex, env, scope, global ) 
{
global.opindex=opindex;
var o = {}, _env;
var a = grb( z[opindex], env, scope, global, o );
_da( node, attrname, opindex, a, o );
}
function _o( opindex, env, scope, global )
{
global.opindex=opindex;
var nothing = {};
var r = grb( z[opindex], env, scope, global, nothing );
return (r&&r.constructor===Function) ? undefined : r;
}
function _oz( z, opindex, env, scope, global )
{
global.opindex=opindex;
var nothing = {};
var r = grb( z[opindex], env, scope, global, nothing );
return (r&&r.constructor===Function) ? undefined : r;
}
function _1( opindex, env, scope, global, o )
{
var o = o || {};
global.opindex=opindex;
return gra( z[opindex], env, scope, global, o );
}
function _1z( z, opindex, env, scope, global, o )
{
var o = o || {};
global.opindex=opindex;
return gra( z[opindex], env, scope, global, o );
}
function _2( opindex, func, env, scope, global, father, itemname, indexname, keyname )
{
var o = {};
var to_iter = _1( opindex, env, scope, global );
wfor( to_iter, func, env, scope, global, father, itemname, indexname, keyname );
}
function _2z( z, opindex, func, env, scope, global, father, itemname, indexname, keyname )
{
var o = {};
var to_iter = _1z( z, opindex, env, scope, global );
wfor( to_iter, func, env, scope, global, father, itemname, indexname, keyname );
}


function _m(tag,attrs,generics,env,scope,global)
{
var tmp=_n(tag);
var base=0;
for(var i = 0 ; i < attrs.length ; i+=2 )
{
if(base+attrs[i+1]<0)
{
tmp.attr[attrs[i]]=true;
}
else
{
_r(tmp,attrs[i],base+attrs[i+1],env,scope,global);
if(base===0)base=attrs[i+1];
}
}
for(var i=0;i<generics.length;i+=2)
{
if(base+generics[i+1]<0)
{
tmp.generics[generics[i]]="";
}
else
{
var $t=grb(z[base+generics[i+1]],env,scope,global);
if ($t!="") $t="wx-"+$t;
tmp.generics[generics[i]]=$t;
if(base===0)base=generics[i+1];
}
}
return tmp;
}
function _mz(z,tag,attrs,generics,env,scope,global)
{
var tmp=_n(tag);
var base=0;
for(var i = 0 ; i < attrs.length ; i+=2 )
{
if(base+attrs[i+1]<0)
{
tmp.attr[attrs[i]]=true;
}
else
{
_rz(z, tmp,attrs[i],base+attrs[i+1],env,scope,global);
if(base===0)base=attrs[i+1];
}
}
for(var i=0;i<generics.length;i+=2)
{
if(base+generics[i+1]<0)
{
tmp.generics[generics[i]]="";
}
else
{
var $t=grb(z[base+generics[i+1]],env,scope,global);
if ($t!="") $t="wx-"+$t;
tmp.generics[generics[i]]=$t;
if(base===0)base=generics[i+1];
}
}
return tmp;
}

var nf_init=function(){
if(typeof __WXML_GLOBAL__==="undefined"||undefined===__WXML_GLOBAL__.wxs_nf_init){
nf_init_Object();nf_init_Function();nf_init_Array();nf_init_String();nf_init_Boolean();nf_init_Number();nf_init_Math();nf_init_Date();nf_init_RegExp();
}
if(typeof __WXML_GLOBAL__!=="undefined") __WXML_GLOBAL__.wxs_nf_init=true;
};
var nf_init_Object=function(){
Object.defineProperty(Object.prototype,"nv_constructor",{writable:true,value:"Object"})
Object.defineProperty(Object.prototype,"nv_toString",{writable:true,value:function(){return "[object Object]"}})
}
var nf_init_Function=function(){
Object.defineProperty(Function.prototype,"nv_constructor",{writable:true,value:"Function"})
Object.defineProperty(Function.prototype,"nv_length",{get:function(){return this.length;},set:function(){}});
Object.defineProperty(Function.prototype,"nv_toString",{writable:true,value:function(){return "[function Function]"}})
}
var nf_init_Array=function(){
Object.defineProperty(Array.prototype,"nv_toString",{writable:true,value:function(){return this.nv_join();}})
Object.defineProperty(Array.prototype,"nv_join",{writable:true,value:function(s){
s=undefined==s?',':s;
var r="";
for(var i=0;i<this.length;++i){
if(0!=i) r+=s;
if(null==this[i]||undefined==this[i]) r+='';	
else if(typeof this[i]=='function') r+=this[i].nv_toString();
else if(typeof this[i]=='object'&&this[i].nv_constructor==="Array") r+=this[i].nv_join();
else r+=this[i].toString();
}
return r;
}})
Object.defineProperty(Array.prototype,"nv_constructor",{writable:true,value:"Array"})
Object.defineProperty(Array.prototype,"nv_concat",{writable:true,value:Array.prototype.concat})
Object.defineProperty(Array.prototype,"nv_pop",{writable:true,value:Array.prototype.pop})
Object.defineProperty(Array.prototype,"nv_push",{writable:true,value:Array.prototype.push})
Object.defineProperty(Array.prototype,"nv_reverse",{writable:true,value:Array.prototype.reverse})
Object.defineProperty(Array.prototype,"nv_shift",{writable:true,value:Array.prototype.shift})
Object.defineProperty(Array.prototype,"nv_slice",{writable:true,value:Array.prototype.slice})
Object.defineProperty(Array.prototype,"nv_sort",{writable:true,value:Array.prototype.sort})
Object.defineProperty(Array.prototype,"nv_splice",{writable:true,value:Array.prototype.splice})
Object.defineProperty(Array.prototype,"nv_unshift",{writable:true,value:Array.prototype.unshift})
Object.defineProperty(Array.prototype,"nv_indexOf",{writable:true,value:Array.prototype.indexOf})
Object.defineProperty(Array.prototype,"nv_lastIndexOf",{writable:true,value:Array.prototype.lastIndexOf})
Object.defineProperty(Array.prototype,"nv_every",{writable:true,value:Array.prototype.every})
Object.defineProperty(Array.prototype,"nv_some",{writable:true,value:Array.prototype.some})
Object.defineProperty(Array.prototype,"nv_forEach",{writable:true,value:Array.prototype.forEach})
Object.defineProperty(Array.prototype,"nv_map",{writable:true,value:Array.prototype.map})
Object.defineProperty(Array.prototype,"nv_filter",{writable:true,value:Array.prototype.filter})
Object.defineProperty(Array.prototype,"nv_reduce",{writable:true,value:Array.prototype.reduce})
Object.defineProperty(Array.prototype,"nv_reduceRight",{writable:true,value:Array.prototype.reduceRight})
Object.defineProperty(Array.prototype,"nv_length",{get:function(){return this.length;},set:function(value){this.length=value;}});
}
var nf_init_String=function(){
Object.defineProperty(String.prototype,"nv_constructor",{writable:true,value:"String"})
Object.defineProperty(String.prototype,"nv_toString",{writable:true,value:String.prototype.toString})
Object.defineProperty(String.prototype,"nv_valueOf",{writable:true,value:String.prototype.valueOf})
Object.defineProperty(String.prototype,"nv_charAt",{writable:true,value:String.prototype.charAt})
Object.defineProperty(String.prototype,"nv_charCodeAt",{writable:true,value:String.prototype.charCodeAt})
Object.defineProperty(String.prototype,"nv_concat",{writable:true,value:String.prototype.concat})
Object.defineProperty(String.prototype,"nv_indexOf",{writable:true,value:String.prototype.indexOf})
Object.defineProperty(String.prototype,"nv_lastIndexOf",{writable:true,value:String.prototype.lastIndexOf})
Object.defineProperty(String.prototype,"nv_localeCompare",{writable:true,value:String.prototype.localeCompare})
Object.defineProperty(String.prototype,"nv_match",{writable:true,value:String.prototype.match})
Object.defineProperty(String.prototype,"nv_replace",{writable:true,value:String.prototype.replace})
Object.defineProperty(String.prototype,"nv_search",{writable:true,value:String.prototype.search})
Object.defineProperty(String.prototype,"nv_slice",{writable:true,value:String.prototype.slice})
Object.defineProperty(String.prototype,"nv_split",{writable:true,value:String.prototype.split})
Object.defineProperty(String.prototype,"nv_substring",{writable:true,value:String.prototype.substring})
Object.defineProperty(String.prototype,"nv_toLowerCase",{writable:true,value:String.prototype.toLowerCase})
Object.defineProperty(String.prototype,"nv_toLocaleLowerCase",{writable:true,value:String.prototype.toLocaleLowerCase})
Object.defineProperty(String.prototype,"nv_toUpperCase",{writable:true,value:String.prototype.toUpperCase})
Object.defineProperty(String.prototype,"nv_toLocaleUpperCase",{writable:true,value:String.prototype.toLocaleUpperCase})
Object.defineProperty(String.prototype,"nv_trim",{writable:true,value:String.prototype.trim})
Object.defineProperty(String.prototype,"nv_length",{get:function(){return this.length;},set:function(value){this.length=value;}});
}
var nf_init_Boolean=function(){
Object.defineProperty(Boolean.prototype,"nv_constructor",{writable:true,value:"Boolean"})
Object.defineProperty(Boolean.prototype,"nv_toString",{writable:true,value:Boolean.prototype.toString})
Object.defineProperty(Boolean.prototype,"nv_valueOf",{writable:true,value:Boolean.prototype.valueOf})
}
var nf_init_Number=function(){
Object.defineProperty(Number,"nv_MAX_VALUE",{writable:false,value:Number.MAX_VALUE})
Object.defineProperty(Number,"nv_MIN_VALUE",{writable:false,value:Number.MIN_VALUE})
Object.defineProperty(Number,"nv_NEGATIVE_INFINITY",{writable:false,value:Number.NEGATIVE_INFINITY})
Object.defineProperty(Number,"nv_POSITIVE_INFINITY",{writable:false,value:Number.POSITIVE_INFINITY})
Object.defineProperty(Number.prototype,"nv_constructor",{writable:true,value:"Number"})
Object.defineProperty(Number.prototype,"nv_toString",{writable:true,value:Number.prototype.toString})
Object.defineProperty(Number.prototype,"nv_toLocaleString",{writable:true,value:Number.prototype.toLocaleString})
Object.defineProperty(Number.prototype,"nv_valueOf",{writable:true,value:Number.prototype.valueOf})
Object.defineProperty(Number.prototype,"nv_toFixed",{writable:true,value:Number.prototype.toFixed})
Object.defineProperty(Number.prototype,"nv_toExponential",{writable:true,value:Number.prototype.toExponential})
Object.defineProperty(Number.prototype,"nv_toPrecision",{writable:true,value:Number.prototype.toPrecision})
}
var nf_init_Math=function(){
Object.defineProperty(Math,"nv_E",{writable:false,value:Math.E})
Object.defineProperty(Math,"nv_LN10",{writable:false,value:Math.LN10})
Object.defineProperty(Math,"nv_LN2",{writable:false,value:Math.LN2})
Object.defineProperty(Math,"nv_LOG2E",{writable:false,value:Math.LOG2E})
Object.defineProperty(Math,"nv_LOG10E",{writable:false,value:Math.LOG10E})
Object.defineProperty(Math,"nv_PI",{writable:false,value:Math.PI})
Object.defineProperty(Math,"nv_SQRT1_2",{writable:false,value:Math.SQRT1_2})
Object.defineProperty(Math,"nv_SQRT2",{writable:false,value:Math.SQRT2})
Object.defineProperty(Math,"nv_abs",{writable:false,value:Math.abs})
Object.defineProperty(Math,"nv_acos",{writable:false,value:Math.acos})
Object.defineProperty(Math,"nv_asin",{writable:false,value:Math.asin})
Object.defineProperty(Math,"nv_atan",{writable:false,value:Math.atan})
Object.defineProperty(Math,"nv_atan2",{writable:false,value:Math.atan2})
Object.defineProperty(Math,"nv_ceil",{writable:false,value:Math.ceil})
Object.defineProperty(Math,"nv_cos",{writable:false,value:Math.cos})
Object.defineProperty(Math,"nv_exp",{writable:false,value:Math.exp})
Object.defineProperty(Math,"nv_floor",{writable:false,value:Math.floor})
Object.defineProperty(Math,"nv_log",{writable:false,value:Math.log})
Object.defineProperty(Math,"nv_max",{writable:false,value:Math.max})
Object.defineProperty(Math,"nv_min",{writable:false,value:Math.min})
Object.defineProperty(Math,"nv_pow",{writable:false,value:Math.pow})
Object.defineProperty(Math,"nv_random",{writable:false,value:Math.random})
Object.defineProperty(Math,"nv_round",{writable:false,value:Math.round})
Object.defineProperty(Math,"nv_sin",{writable:false,value:Math.sin})
Object.defineProperty(Math,"nv_sqrt",{writable:false,value:Math.sqrt})
Object.defineProperty(Math,"nv_tan",{writable:false,value:Math.tan})
}
var nf_init_Date=function(){
Object.defineProperty(Date.prototype,"nv_constructor",{writable:true,value:"Date"})
Object.defineProperty(Date,"nv_parse",{writable:true,value:Date.parse})
Object.defineProperty(Date,"nv_UTC",{writable:true,value:Date.UTC})
Object.defineProperty(Date,"nv_now",{writable:true,value:Date.now})
Object.defineProperty(Date.prototype,"nv_toString",{writable:true,value:Date.prototype.toString})
Object.defineProperty(Date.prototype,"nv_toDateString",{writable:true,value:Date.prototype.toDateString})
Object.defineProperty(Date.prototype,"nv_toTimeString",{writable:true,value:Date.prototype.toTimeString})
Object.defineProperty(Date.prototype,"nv_toLocaleString",{writable:true,value:Date.prototype.toLocaleString})
Object.defineProperty(Date.prototype,"nv_toLocaleDateString",{writable:true,value:Date.prototype.toLocaleDateString})
Object.defineProperty(Date.prototype,"nv_toLocaleTimeString",{writable:true,value:Date.prototype.toLocaleTimeString})
Object.defineProperty(Date.prototype,"nv_valueOf",{writable:true,value:Date.prototype.valueOf})
Object.defineProperty(Date.prototype,"nv_getTime",{writable:true,value:Date.prototype.getTime})
Object.defineProperty(Date.prototype,"nv_getFullYear",{writable:true,value:Date.prototype.getFullYear})
Object.defineProperty(Date.prototype,"nv_getUTCFullYear",{writable:true,value:Date.prototype.getUTCFullYear})
Object.defineProperty(Date.prototype,"nv_getMonth",{writable:true,value:Date.prototype.getMonth})
Object.defineProperty(Date.prototype,"nv_getUTCMonth",{writable:true,value:Date.prototype.getUTCMonth})
Object.defineProperty(Date.prototype,"nv_getDate",{writable:true,value:Date.prototype.getDate})
Object.defineProperty(Date.prototype,"nv_getUTCDate",{writable:true,value:Date.prototype.getUTCDate})
Object.defineProperty(Date.prototype,"nv_getDay",{writable:true,value:Date.prototype.getDay})
Object.defineProperty(Date.prototype,"nv_getUTCDay",{writable:true,value:Date.prototype.getUTCDay})
Object.defineProperty(Date.prototype,"nv_getHours",{writable:true,value:Date.prototype.getHours})
Object.defineProperty(Date.prototype,"nv_getUTCHours",{writable:true,value:Date.prototype.getUTCHours})
Object.defineProperty(Date.prototype,"nv_getMinutes",{writable:true,value:Date.prototype.getMinutes})
Object.defineProperty(Date.prototype,"nv_getUTCMinutes",{writable:true,value:Date.prototype.getUTCMinutes})
Object.defineProperty(Date.prototype,"nv_getSeconds",{writable:true,value:Date.prototype.getSeconds})
Object.defineProperty(Date.prototype,"nv_getUTCSeconds",{writable:true,value:Date.prototype.getUTCSeconds})
Object.defineProperty(Date.prototype,"nv_getMilliseconds",{writable:true,value:Date.prototype.getMilliseconds})
Object.defineProperty(Date.prototype,"nv_getUTCMilliseconds",{writable:true,value:Date.prototype.getUTCMilliseconds})
Object.defineProperty(Date.prototype,"nv_getTimezoneOffset",{writable:true,value:Date.prototype.getTimezoneOffset})
Object.defineProperty(Date.prototype,"nv_setTime",{writable:true,value:Date.prototype.setTime})
Object.defineProperty(Date.prototype,"nv_setMilliseconds",{writable:true,value:Date.prototype.setMilliseconds})
Object.defineProperty(Date.prototype,"nv_setUTCMilliseconds",{writable:true,value:Date.prototype.setUTCMilliseconds})
Object.defineProperty(Date.prototype,"nv_setSeconds",{writable:true,value:Date.prototype.setSeconds})
Object.defineProperty(Date.prototype,"nv_setUTCSeconds",{writable:true,value:Date.prototype.setUTCSeconds})
Object.defineProperty(Date.prototype,"nv_setMinutes",{writable:true,value:Date.prototype.setMinutes})
Object.defineProperty(Date.prototype,"nv_setUTCMinutes",{writable:true,value:Date.prototype.setUTCMinutes})
Object.defineProperty(Date.prototype,"nv_setHours",{writable:true,value:Date.prototype.setHours})
Object.defineProperty(Date.prototype,"nv_setUTCHours",{writable:true,value:Date.prototype.setUTCHours})
Object.defineProperty(Date.prototype,"nv_setDate",{writable:true,value:Date.prototype.setDate})
Object.defineProperty(Date.prototype,"nv_setUTCDate",{writable:true,value:Date.prototype.setUTCDate})
Object.defineProperty(Date.prototype,"nv_setMonth",{writable:true,value:Date.prototype.setMonth})
Object.defineProperty(Date.prototype,"nv_setUTCMonth",{writable:true,value:Date.prototype.setUTCMonth})
Object.defineProperty(Date.prototype,"nv_setFullYear",{writable:true,value:Date.prototype.setFullYear})
Object.defineProperty(Date.prototype,"nv_setUTCFullYear",{writable:true,value:Date.prototype.setUTCFullYear})
Object.defineProperty(Date.prototype,"nv_toUTCString",{writable:true,value:Date.prototype.toUTCString})
Object.defineProperty(Date.prototype,"nv_toISOString",{writable:true,value:Date.prototype.toISOString})
Object.defineProperty(Date.prototype,"nv_toJSON",{writable:true,value:Date.prototype.toJSON})
}
var nf_init_RegExp=function(){
Object.defineProperty(RegExp.prototype,"nv_constructor",{writable:true,value:"RegExp"})
Object.defineProperty(RegExp.prototype,"nv_exec",{writable:true,value:RegExp.prototype.exec})
Object.defineProperty(RegExp.prototype,"nv_test",{writable:true,value:RegExp.prototype.test})
Object.defineProperty(RegExp.prototype,"nv_toString",{writable:true,value:RegExp.prototype.toString})
Object.defineProperty(RegExp.prototype,"nv_source",{get:function(){return this.source;},set:function(){}});
Object.defineProperty(RegExp.prototype,"nv_global",{get:function(){return this.global;},set:function(){}});
Object.defineProperty(RegExp.prototype,"nv_ignoreCase",{get:function(){return this.ignoreCase;},set:function(){}});
Object.defineProperty(RegExp.prototype,"nv_multiline",{get:function(){return this.multiline;},set:function(){}});
Object.defineProperty(RegExp.prototype,"nv_lastIndex",{get:function(){return this.lastIndex;},set:function(v){this.lastIndex=v;}});
}
nf_init();
var nv_getDate=function(){var args=Array.prototype.slice.call(arguments);args.unshift(Date);return new(Function.prototype.bind.apply(Date, args));}
var nv_getRegExp=function(){var args=Array.prototype.slice.call(arguments);args.unshift(RegExp);return new(Function.prototype.bind.apply(RegExp, args));}
var nv_console={}
nv_console.nv_log=function(){var res="WXSRT:";for(var i=0;i<arguments.length;++i)res+=arguments[i]+" ";console.log(res);}
var nv_parseInt = parseInt, nv_parseFloat = parseFloat, nv_isNaN = isNaN, nv_isFinite = isFinite, nv_decodeURI = decodeURI, nv_decodeURIComponent = decodeURIComponent, nv_encodeURI = encodeURI, nv_encodeURIComponent = encodeURIComponent;
function $gdc(o,p,r) {
o=wh.rv(o);
if(o===null||o===undefined) return o;
if(o.constructor===String||o.constructor===Boolean||o.constructor===Number) return o;
if(o.constructor===Object){
var copy={};
for(var k in o)
if(o.hasOwnProperty(k))
if(undefined===p) copy[k.substring(3)]=$gdc(o[k],p,r);
else copy[p+k]=$gdc(o[k],p,r);
return copy;
}
if(o.constructor===Array){
var copy=[];
for(var i=0;i<o.length;i++) copy.push($gdc(o[i],p,r));
return copy;
}
if(o.constructor===Date){
var copy=new Date();
copy.setTime(o.getTime());
return copy;
}
if(o.constructor===RegExp){
var f="";
if(o.global) f+="g";
if(o.ignoreCase) f+="i";
if(o.multiline) f+="m";
return (new RegExp(o.source,f));
}
if(r&&o.constructor===Function){
if ( r == 1 ) return $gdc(o(),undefined, 2);
if ( r == 2 ) return o;
}
return null;
}
var nv_JSON={}
nv_JSON.nv_stringify=function(o){
JSON.stringify(o);
return JSON.stringify($gdc(o));
}
nv_JSON.nv_parse=function(o){
if(o===undefined) return undefined;
var t=JSON.parse(o);
return $gdc(t,'nv_');
}

function _af(p, a, c){
p.extraAttr = {"t_action": a, "t_cid": c};
}

function _ai(i,p,e,me,r,c){var x=_grp(p,e,me);if(x)i.push(x);else{i.push('');_wp(me+':import:'+r+':'+c+': Path `'+p+'` not found from `'+me+'`.')}}
function _grp(p,e,me){if(p[0]!='/'){var mepart=me.split('/');mepart.pop();var ppart=p.split('/');for(var i=0;i<ppart.length;i++){if( ppart[i]=='..')mepart.pop();else if(!ppart[i]||ppart[i]=='.')continue;else mepart.push(ppart[i]);}p=mepart.join('/');}if(me[0]=='.'&&p[0]=='/')p='.'+p;if(e[p])return p;if(e[p+'.wxml'])return p+'.wxml';}
function _gd(p,c,e,d){if(!c)return;if(d[p][c])return d[p][c];for(var x=e[p].i.length-1;x>=0;x--){if(e[p].i[x]&&d[e[p].i[x]][c])return d[e[p].i[x]][c]};for(var x=e[p].ti.length-1;x>=0;x--){var q=_grp(e[p].ti[x],e,p);if(q&&d[q][c])return d[q][c]}var ii=_gapi(e,p);for(var x=0;x<ii.length;x++){if(ii[x]&&d[ii[x]][c])return d[ii[x]][c]}for(var k=e[p].j.length-1;k>=0;k--)if(e[p].j[k]){for(var q=e[e[p].j[k]].ti.length-1;q>=0;q--){var pp=_grp(e[e[p].j[k]].ti[q],e,p);if(pp&&d[pp][c]){return d[pp][c]}}}}
function _gapi(e,p){if(!p)return [];if($gaic[p]){return $gaic[p]};var ret=[],q=[],h=0,t=0,put={},visited={};q.push(p);visited[p]=true;t++;while(h<t){var a=q[h++];for(var i=0;i<e[a].ic.length;i++){var nd=e[a].ic[i];var np=_grp(nd,e,a);if(np&&!visited[np]){visited[np]=true;q.push(np);t++;}}for(var i=0;a!=p&&i<e[a].ti.length;i++){var ni=e[a].ti[i];var nm=_grp(ni,e,a);if(nm&&!put[nm]){put[nm]=true;ret.push(nm);}}}$gaic[p]=ret;return ret;}
var $ixc={};function _ic(p,ent,me,e,s,r,gg){var x=_grp(p,ent,me);ent[me].j.push(x);if(x){if($ixc[x]){_wp('-1:include:-1:-1: `'+p+'` is being included in a loop, will be stop.');return;}$ixc[x]=true;try{ent[x].f(e,s,r,gg)}catch(e){}$ixc[x]=false;}else{_wp(me+':include:-1:-1: Included path `'+p+'` not found from `'+me+'`.')}}
function _w(tn,f,line,c){_wp(f+':template:'+line+':'+c+': Template `'+tn+'` not found.');}function _ev(dom){var changed=false;delete dom.properities;delete dom.n;if(dom.children){do{changed=false;var newch = [];for(var i=0;i<dom.children.length;i++){var ch=dom.children[i];if( ch.tag=='virtual'){changed=true;for(var j=0;ch.children&&j<ch.children.length;j++){newch.push(ch.children[j]);}}else { newch.push(ch); } } dom.children = newch; }while(changed);for(var i=0;i<dom.children.length;i++){_ev(dom.children[i]);}} return dom; }
function _tsd( root )
{
if( root.tag == "wx-wx-scope" ) 
{
root.tag = "virtual";
root.wxCkey = "11";
root['wxScopeData'] = root.attr['wx:scope-data'];
delete root.n;
delete root.raw;
delete root.generics;
delete root.attr;
}
for( var i = 0 ; root.children && i < root.children.length ; i++ )
{
_tsd( root.children[i] );
}
return root;
}

var e_={}
if(typeof(global.entrys)==='undefined')global.entrys={};e_=global.entrys;
var d_={}
if(typeof(global.defines)==='undefined')global.defines={};d_=global.defines;
var f_={}
if(typeof(global.modules)==='undefined')global.modules={};f_=global.modules || {};
var p_={}
__WXML_GLOBAL__.ops_cached = __WXML_GLOBAL__.ops_cached || {}
__WXML_GLOBAL__.ops_set = __WXML_GLOBAL__.ops_set || {};
__WXML_GLOBAL__.ops_init = __WXML_GLOBAL__.ops_init || {};
var z=__WXML_GLOBAL__.ops_set.$gwx || [];
function gz$gwx_1(){
if( __WXML_GLOBAL__.ops_cached.$gwx_1)return __WXML_GLOBAL__.ops_cached.$gwx_1
__WXML_GLOBAL__.ops_cached.$gwx_1=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_1);return __WXML_GLOBAL__.ops_cached.$gwx_1
}
function gz$gwx_2(){
if( __WXML_GLOBAL__.ops_cached.$gwx_2)return __WXML_GLOBAL__.ops_cached.$gwx_2
__WXML_GLOBAL__.ops_cached.$gwx_2=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_2);return __WXML_GLOBAL__.ops_cached.$gwx_2
}
function gz$gwx_3(){
if( __WXML_GLOBAL__.ops_cached.$gwx_3)return __WXML_GLOBAL__.ops_cached.$gwx_3
__WXML_GLOBAL__.ops_cached.$gwx_3=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_3);return __WXML_GLOBAL__.ops_cached.$gwx_3
}
function gz$gwx_4(){
if( __WXML_GLOBAL__.ops_cached.$gwx_4)return __WXML_GLOBAL__.ops_cached.$gwx_4
__WXML_GLOBAL__.ops_cached.$gwx_4=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_4);return __WXML_GLOBAL__.ops_cached.$gwx_4
}
function gz$gwx_5(){
if( __WXML_GLOBAL__.ops_cached.$gwx_5)return __WXML_GLOBAL__.ops_cached.$gwx_5
__WXML_GLOBAL__.ops_cached.$gwx_5=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_5);return __WXML_GLOBAL__.ops_cached.$gwx_5
}
function gz$gwx_6(){
if( __WXML_GLOBAL__.ops_cached.$gwx_6)return __WXML_GLOBAL__.ops_cached.$gwx_6
__WXML_GLOBAL__.ops_cached.$gwx_6=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_6);return __WXML_GLOBAL__.ops_cached.$gwx_6
}
function gz$gwx_7(){
if( __WXML_GLOBAL__.ops_cached.$gwx_7)return __WXML_GLOBAL__.ops_cached.$gwx_7
__WXML_GLOBAL__.ops_cached.$gwx_7=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_7);return __WXML_GLOBAL__.ops_cached.$gwx_7
}
function gz$gwx_8(){
if( __WXML_GLOBAL__.ops_cached.$gwx_8)return __WXML_GLOBAL__.ops_cached.$gwx_8
__WXML_GLOBAL__.ops_cached.$gwx_8=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_8);return __WXML_GLOBAL__.ops_cached.$gwx_8
}
__WXML_GLOBAL__.ops_set.$gwx=z;
__WXML_GLOBAL__.ops_init.$gwx=true;
var nv_require=function(){var nnm={};var nom={};return function(n){return function(){if(!nnm[n]) return undefined;try{if(!nom[n])nom[n]=nnm[n]();return nom[n];}catch(e){e.message=e.message.replace(/nv_/g,'');var tmp = e.stack.substring(0,e.stack.lastIndexOf(n));e.stack = tmp.substring(0,tmp.lastIndexOf('\n'));e.stack = e.stack.replace(/\snv_/g,' ');e.stack = $gstack(e.stack);e.stack += '\n    at ' + n.substring(2);console.error(e);}
}}}()
var x=['./pages/3d/index.wxml','./pages/3d/mybook.wxml','./pages/3d/share.wxml','./pages/3d/view.wxml','./pages/hzh/index.wxml','./pages/hzh/share.wxml','./pages/hzh/test.wxml','./pages/hzh/zhizuo.wxml'];d_[x[0]]={}
var m0=function(e,s,r,gg){
var z=gz$gwx_1()
return r
}
e_[x[0]]={f:m0,j:[],i:[],ti:[],ic:[]}
d_[x[1]]={}
var m1=function(e,s,r,gg){
var z=gz$gwx_2()
return r
}
e_[x[1]]={f:m1,j:[],i:[],ti:[],ic:[]}
d_[x[2]]={}
var m2=function(e,s,r,gg){
var z=gz$gwx_3()
return r
}
e_[x[2]]={f:m2,j:[],i:[],ti:[],ic:[]}
d_[x[3]]={}
var m3=function(e,s,r,gg){
var z=gz$gwx_4()
return r
}
e_[x[3]]={f:m3,j:[],i:[],ti:[],ic:[]}
d_[x[4]]={}
var m4=function(e,s,r,gg){
var z=gz$gwx_5()
return r
}
e_[x[4]]={f:m4,j:[],i:[],ti:[],ic:[]}
d_[x[5]]={}
var m5=function(e,s,r,gg){
var z=gz$gwx_6()
return r
}
e_[x[5]]={f:m5,j:[],i:[],ti:[],ic:[]}
d_[x[6]]={}
var m6=function(e,s,r,gg){
var z=gz$gwx_7()
return r
}
e_[x[6]]={f:m6,j:[],i:[],ti:[],ic:[]}
d_[x[7]]={}
var m7=function(e,s,r,gg){
var z=gz$gwx_8()
return r
}
e_[x[7]]={f:m7,j:[],i:[],ti:[],ic:[]}
if(path&&e_[path]){
return function(env,dd,global){$gwxc=0;var root={"tag":"wx-page"};root.children=[]
var main=e_[path].f
if (typeof global==="undefined")global={};global.f=$gdc(f_[path],"",1);
try{
main(env,{},root,global);
_tsd(root)
}catch(err){
console.log(err)
}
return root;
}
}
}
	__wxAppCode__['pages/hzh/test.json'] = {"component":true,"usingComponents":{},"__warning__":"无效的 pageJSON(pages/hzh/test)[\"component\"]"};
		__wxAppCode__['pages/hzh/test.wxml'] = $gwx( './pages/hzh/test.wxml' );
	
	define("pages/hzh/index.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";var e=getApp(),t=require("../../utils/config.js"),o=wx.createInnerAudioContext();Page({data:{host:t.host,a:"ss",openid:"",src:"https://www.vop2.cn/music/hzh/bf3b570bd284.mp3"},onLoad:function(){o.autoplay=!1,o.src="https://www.vop2.cn/music/hzh/5bf3b570bd284.mp3",o.loop=!0;var a=this;wx.request({url:t.host+"index.php?c=Sharetxt&a=contxt",method:"post",header:{"Content-Type":"application/json"},success:function(e){a.setData({sharearr:e.data})}}),wx.login({success:function(o){wx.request({url:t.requestUrl+"&a=getOpenid&code="+o.code,success:function(t){e.globalData.openid=t.data,a.setData({openid:t.data}),console.log(a.data.openid)}})}})},zhizuo:function(){var e=this;o.pause(),wx.chooseImage({count:"1",sizeType:["compressed"],sourceType:["album"],success:function(o){console.log(o),wx.uploadFile({url:t.host+"index.php?c=HZH&a=wxUpload",filePath:o.tempFilePaths[0],name:"photo",header:{"content-type":"multipart/form-data"},formData:{openid:e.data.openid,skin:7,music:"https://www.vop2.cn/music/hzh/5bf3b570bd284.mp3"},success:function(e){var t=e.data.replace(/\ufeff/g,""),o=JSON.parse(t);console.log(o.id),wx.navigateTo({url:"zhizuo?id="+o.id})}})}})}}); 
 			}); 
		define("pages/hzh/share.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";var t=getApp(),i=require("../../utils/config.js"),c=wx.createInnerAudioContext();Page({data:{host:i.host,tabs:[],tabW:0,a:[],xcid:"",tu:{},skinid:"",skinmusic:"",sharearr:[],texiao:[{id:7,title:"夕阳红",icon:"https://www.vop2.cn/icon/xiyanghong.jpg",music:"https://www.vop2.cn/music/hzh/5bf3b570bd284.mp3"},{id:12,title:"桃花源",icon:"https://www.vop2.cn/icon/taohua.jpg",music:"https://www.vop2.cn/music/hzh/taohua1.mp3"},{id:9,title:"风车",icon:"https://www.vop2.cn/icon/fengche.jpg",music:"https://www.vop2.cn/music/hzh/5bf3b02617fe5.mp3"},{id:13,title:"玫瑰",icon:"https://www.vop2.cn/icon/meigui.jpg",music:"https://www.vop2.cn/music/hzh/meigui1.mp3"},{id:1,title:"蒲公英",icon:"https://www.vop2.cn/icon/pugongying.jpg",music:"https://www.vop2.cn/music/hzh/5befb45f42688.mp3"},{id:14,title:"莲",icon:"https://www.vop2.cn/icon/lianhua.jpg",music:"https://www.vop2.cn/music/hzh/lianhua1.mp3"},{id:5,title:"彩蝶",icon:"https://www.vop2.cn/icon/caidie.jpg",music:"https://www.vop2.cn/music/hzh/5bf3afffa8c9e.mp3"},{id:11,title:"雪季",icon:"https://www.vop2.cn/icon/xue.jpg",music:"https://www.vop2.cn/music/hzh/xue1.mp3"},{id:6,title:"雨天",icon:"https://www.vop2.cn/icon/yutian.jpg",music:"https://www.vop2.cn/music/hzh/5be923394153a.mp3"},{id:15,title:"紫藤",icon:"https://www.vop2.cn/icon/ziteng.jpg",music:"https://www.vop2.cn/music/hzh/ziteng1.mp3"},{id:10,title:"晚安",icon:"https://www.vop2.cn/icon/wanan.jpg",music:"https://www.vop2.cn/music/hzh/5be9311db2934.mp3"},{id:3,title:"纸飞机",icon:"https://www.vop2.cn/icon/feiji3.jpg",music:"https://www.vop2.cn/music/hzh/5be0fae43cafb.mp3"}]},onLoad:function(c){var o=this;wx.request({url:i.host+"index.php?c=Sharetxt&a=contxt",method:"post",header:{"Content-Type":"application/json"},success:function(t){o.setData({sharearr:t.data})}}),this.setData({xcid:c.id}),this.huoqutupian(),wx.login({success:function(c){wx.request({url:i.requestUrl+"&a=getOpenid&code="+c.code,success:function(i){t.globalData.openid=i.data,o.setData({openid:i.data}),console.log(o.data.openid)}})}})},huoqutupian:function(){var t=this;wx.request({url:i.host+"index.php?c=HZH&a=getHZHbyid",data:{id:this.data.xcid},success:function(i){console.log(i.data),t.setData({tu:i.data}),c.src=i.data.music,c.autoplay=!0,c.loop=!0;var o=[];o[i.data.skin_id]="display:block",t.setData({a:o})}})},zhizuo:function(){var t=this;c.pause(),wx.chooseImage({count:"1",sizeType:["compressed"],sourceType:["album"],success:function(c){console.log(c),wx.uploadFile({url:i.host+"index.php?c=HZH&a=wxUpload",filePath:c.tempFilePaths[0],name:"photo",header:{"content-type":"multipart/form-data"},formData:{openid:t.data.openid,skin:7,music:"https://www.vop2.cn/music/hzh/5bf3b570bd284.mp3"},success:function(t){var i=t.data.replace(/\ufeff/g,""),c=JSON.parse(i);console.log(c.id),wx.navigateTo({url:"zhizuo?id="+c.id})}})}})}}); 
 			}); 
		define("pages/hzh/zhizuo.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";var t=getApp(),i=require("../../utils/config.js"),c=wx.createInnerAudioContext();Page({data:{host:i.host,tabs:[],tabW:0,a:[],xcid:"",tu:{},skinid:"",skinmusic:"",tuurl:"",sharearr:[],texiao:[{id:7,title:"夕阳红",icon:"https://www.vop2.cn/icon/xiyanghong.jpg",music:"https://www.vop2.cn/music/hzh/5bf3b570bd284.mp3"},{id:12,title:"桃花源",icon:"https://www.vop2.cn/icon/taohua.jpg",music:"https://www.vop2.cn/music/hzh/taohua1.mp3"},{id:9,title:"风车",icon:"https://www.vop2.cn/icon/fengche.jpg",music:"https://www.vop2.cn/music/hzh/5bf3b02617fe5.mp3"},{id:13,title:"玫瑰",icon:"https://www.vop2.cn/icon/meigui.jpg",music:"https://www.vop2.cn/music/hzh/meigui1.mp3"},{id:1,title:"蒲公英",icon:"https://www.vop2.cn/icon/pugongying.jpg",music:"https://www.vop2.cn/music/hzh/5befb45f42688.mp3"},{id:14,title:"莲",icon:"https://www.vop2.cn/icon/lianhua.jpg",music:"https://www.vop2.cn/music/hzh/lianhua1.mp3"},{id:5,title:"彩蝶",icon:"https://www.vop2.cn/icon/caidie.jpg",music:"https://www.vop2.cn/music/hzh/5bf3afffa8c9e.mp3"},{id:11,title:"雪季",icon:"https://www.vop2.cn/icon/xue.jpg",music:"https://www.vop2.cn/music/hzh/xue1.mp3"},{id:6,title:"雨天",icon:"https://www.vop2.cn/icon/yutian.jpg",music:"https://www.vop2.cn/music/hzh/5be923394153a.mp3"},{id:15,title:"紫藤",icon:"https://www.vop2.cn/icon/ziteng.jpg",music:"https://www.vop2.cn/music/hzh/ziteng1.mp3"},{id:10,title:"晚安",icon:"https://www.vop2.cn/icon/wanan.jpg",music:"https://www.vop2.cn/music/hzh/5be9311db2934.mp3"},{id:3,title:"纸飞机",icon:"https://www.vop2.cn/icon/feiji3.jpg",music:"https://www.vop2.cn/music/hzh/5be0fae43cafb.mp3"}]},onLoad:function(t){var c=this;this.setData({xcid:t.id}),wx.request({url:i.host+"index.php?c=Sharetxt&a=contxt",method:"post",header:{"Content-Type":"application/json"},success:function(t){c.setData({sharearr:t.data})}})},huoqutupian:function(){var t=this;wx.request({url:i.host+"index.php?c=HZH&a=getHZHbyid",data:{id:this.data.xcid},success:function(i){console.log(i.data),t.setData({tu:i.data}),c.src=i.data.music;var s=[];s[i.data.skin_id]="display:block",t.setData({a:s})}})},onReady:function(){},onShow:function(){c.autoplay=!0,c.src="",c.loop=!0;this.huoqutupian()},onShareAppMessage:function(){return{title:"我的照片动起来了，简直太美了！",path:"/pages/hzh/share?id="+this.data.xcid,imageUrl:i.host+this.data.tu.image,success:function(){wx.showToast({title:"分享成功",icon:"success"})}}},texiao:function(s){console.log(s);var a=this,n=s.currentTarget.dataset.id,o=s.currentTarget.dataset.music;c.src=o;var e=[];e[n]="display:block",a.setData({a:e,skinid:n,skinmusic:o}),wx.request({url:i.host+"index.php?c=HZH&a=shareAdd",data:{openid:t.globalData.openid,imageurl:a.data.tu.image,skin:n,music:o},success:function(t){a.setData({xcid:t.data})}})},changeimage:function(){var c=this;wx.chooseImage({count:"1",sizeType:["compressed"],sourceType:["album"],success:function(s){wx.uploadFile({url:i.host+"index.php?c=HZH&a=wxUpload",filePath:s.tempFilePaths[0],name:"photo",header:{"content-type":"multipart/form-data"},formData:{openid:t.globalData.openid,skin:c.data.skinid,music:"https://www.vop2.cn/music/hzh/5bf3b570bd284.mp3"},success:function(t){var i=t.data.replace(/\ufeff/g,""),s=JSON.parse(i);console.log(s.id),c.setData({xcid:s.id}),c.huoqutupian()}})}})}}); 
 			}); 
		define("utils/bmap-wx.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";function t(t,a){if(!(t instanceof a))throw new TypeError("Cannot call a class as a function")}var a=function(){function t(t,a){for(var e=0;e<a.length;e++){var i=a[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(a,e,i){return e&&t(a.prototype,e),i&&t(a,i),a}}(),e=function(){function e(a){t(this,e),this.ak=a.ak}return a(e,[{key:"getWXLocation",value:function(t,a,e,i){t=t||"gcj02",a=a||function(){},e=e||function(){},i=i||function(){},wx.getLocation({type:t,success:a,fail:e,complete:i})}},{key:"search",value:function(t){var a=this,e={query:(t=t||{}).query||"生活服务$美食&酒店",scope:t.scope||1,filter:t.filter||"",coord_type:t.coord_type||2,page_size:t.page_size||10,page_num:t.page_num||0,output:t.output||"json",ak:a.ak,sn:t.sn||"",timestamp:t.timestamp||"",radius:t.radius||2e3,ret_coordtype:"gcj02ll"},i={iconPath:t.iconPath,iconTapPath:t.iconTapPath,width:t.width,height:t.height,alpha:t.alpha||1,success:t.success||function(){},fail:t.fail||function(){}},n=function(t){e.location=t.latitude+","+t.longitude,wx.request({url:"https://api.map.baidu.com/place/v2/search",data:e,header:{"content-type":"application/json"},method:"GET",success:function(t){var a=t.data;if(0===a.status){var e=a.results,n={};n.originalData=a,n.wxMarkerData=[];for(var o=0;o<e.length;o++)n.wxMarkerData[o]={id:o,latitude:e[o].location.lat,longitude:e[o].location.lng,title:e[o].name,iconPath:i.iconPath,iconTapPath:i.iconTapPath,address:e[o].address,telephone:e[o].telephone,alpha:i.alpha,width:i.width,height:i.height};i.success(n)}else i.fail({errMsg:a.message,statusCode:a.status})},fail:function(t){i.fail(t)}})};if(t.location){var o=t.location.split(",")[1];n({errMsg:"input location",latitude:t.location.split(",")[0],longitude:o})}else a.getWXLocation("gcj02",n,function(t){i.fail(t)},function(){})}},{key:"suggestion",value:function(t){var a=this,e={query:(t=t||{}).query||"",region:t.region||"全国",city_limit:t.city_limit||!1,output:t.output||"json",ak:a.ak,sn:t.sn||"",timestamp:t.timestamp||"",ret_coordtype:"gcj02ll"},i={success:t.success||function(){},fail:t.fail||function(){}};wx.request({url:"https://api.map.baidu.com/place/v2/suggestion",data:e,header:{"content-type":"application/json"},method:"GET",success:function(t){var a=t.data;0===a.status?i.success(a):i.fail({errMsg:a.message,statusCode:a.status})},fail:function(t){i.fail(t)}})}},{key:"regeocoding",value:function(t){var a=this,e={coordtype:(t=t||{}).coordtype||"gcj02ll",pois:t.pois||0,output:t.output||"json",ak:a.ak,sn:t.sn||"",timestamp:t.timestamp||"",ret_coordtype:"gcj02ll"},i={iconPath:t.iconPath,iconTapPath:t.iconTapPath,width:t.width,height:t.height,alpha:t.alpha||1,success:t.success||function(){},fail:t.fail||function(){}},n=function(t){e.location=t.latitude+","+t.longitude,wx.request({url:"https://api.map.baidu.com/geocoder/v2/",data:e,header:{"content-type":"application/json"},method:"GET",success:function(a){var e=a.data;if(0===e.status){var n=e.result,o={};o.originalData=e,o.wxMarkerData=[],o.wxMarkerData[0]={id:0,latitude:t.latitude,longitude:t.longitude,address:n.formatted_address,iconPath:i.iconPath,iconTapPath:i.iconTapPath,desc:n.sematic_description,business:n.business,alpha:i.alpha,width:i.width,height:i.height},i.success(o)}else i.fail({errMsg:e.message,statusCode:e.status})},fail:function(t){i.fail(t)}})};if(t.location){var o=t.location.split(",")[1];n({errMsg:"input location",latitude:t.location.split(",")[0],longitude:o})}else a.getWXLocation("gcj02",n,function(t){i.fail(t)},function(){})}},{key:"weather",value:function(t){var a=this,e={coord_type:(t=t||{}).coord_type||"gcj02",output:t.output||"json",ak:a.ak,sn:t.sn||"",timestamp:t.timestamp||""},i={success:t.success||function(){},fail:t.fail||function(){}},n=function(t){e.location=t.longitude+","+t.latitude,wx.request({url:"https://api.map.baidu.com/telematics/v3/weather",data:e,header:{"content-type":"application/json"},method:"GET",success:function(t){var a=t.data;if(0===a.error&&"success"===a.status){var e=a.results,n={};n.originalData=a,n.currentWeather=[],n.currentWeather[0]={currentCity:e[0].currentCity,pm25:e[0].pm25,date:e[0].weather_data[0].date,temperature:e[0].weather_data[0].temperature,weatherDesc:e[0].weather_data[0].weather,wind:e[0].weather_data[0].wind},i.success(n)}else i.fail({errMsg:a.message,statusCode:a.status})},fail:function(t){i.fail(t)}})};if(t.location){var o=t.location.split(",")[0];n({errMsg:"input location",latitude:t.location.split(",")[1],longitude:o})}else a.getWXLocation("gcj02",n,function(t){i.fail(t)},function(){})}}]),e}();module.exports.BMapWX=e; 
 			}); 
		define("utils/config.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";var p="www.mini3.top",t={host:"https://"+p+"/",apptype:"b1",requestUrl:"https://"+p+"/admin.php?m=Qwadmin&c=Xcapp&app_type=b1",ad:"adunit-bbe9b329c354213b",template_id:"EhrihKfOg8PKY20lpwVF-pwQL75Ys-uL0KjDmH9INRY"};module.exports=t; 
 			}); 
		define("utils/network.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";module.exports={request:function(t,e,i,o){this.requestLoading(t,e,"",i,o)},requestLoading:function(t,e,i,o,a){wx.showNavigationBarLoading(),""!=i&&wx.showLoading({title:i}),wx.request({url:t,data:e,header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(t){wx.hideNavigationBarLoading(),0!=t.data&&(200==t.statusCode?o(t.data):a()),""!=i&&wx.hideLoading()},fail:function(t){wx.hideNavigationBarLoading(),""!=i&&wx.hideLoading(),a()},complete:function(t){wx.stopPullDownRefresh()}})}}; 
 			}); 
		define("utils/util.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";function t(t){return(t=t.toString())[1]?t:"0"+t}module.exports={formatTime:function(e){var n=e.getMonth()+1,o=e.getDate(),r=e.getHours(),i=e.getMinutes();return[n,o].map(t).join("-")+" "+[r,i].map(t).join(":")}}; 
 			}); 
		define("app.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";require("utils/config.js");App({globalData:{userInfo:null,openid:""}}); 
 			}); 	require("app.js");
 		__wxRoute = 'pages/hzh/test';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'pages/hzh/test.js';	define("pages/hzh/test.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";var t=getApp(),a=require("../../utils/config.js"),e=wx.createInnerAudioContext();Page({data:{host:a.host,a:"ss",openid:"",src:"https://www.iav6.top/music/2018-11-20/5bf3b570bd284.mp3",w:"",h:""},onLoad:function(){e.autoplay=!1,e.src=this.data.src,e.loop=!0;var o=this;wx.request({url:a.host+"index.php?c=Sharetxt&a=contxt",method:"post",header:{"Content-Type":"application/json"},success:function(t){console.log(t.data),o.setData({sharearr:t.data})}}),wx.login({success:function(e){wx.request({url:a.requestUrl+"&a=getOpenid&code="+e.code,success:function(a){t.globalData.openid=a.data,o.setData({openid:a.data}),console.log(o.data.openid)}})}})},zhizuo:function(){var t=this;e.pause(),wx.chooseImage({count:"1",sizeType:["compressed"],sourceType:["album"],success:function(e){console.log(e),wx.uploadFile({url:a.host+"index.php?c=HZH&a=wxUpload",filePath:e.tempFilePaths[0],name:"photo",header:{"content-type":"multipart/form-data"},formData:{openid:t.data.openid,skin:7,music:t.data.src},success:function(t){var a=t.data.replace(/\ufeff/g,""),e=JSON.parse(a);console.log(e.id),wx.navigateTo({url:"zhizuo?id="+e.id})}})}})},bindImageload:function(t){this.setData({w:t.detail.width,h:t.detail.height}),console.log(this.data.w/this.data.h)}}); 
 			}); 	require("pages/hzh/test.js");
 		__wxRoute = 'pages/3d/index';__wxRouteBegin = true; 	define("pages/3d/index.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";var e=getApp(),a=require("../../utils/config.js");Page({data:{ad:a.ad,host:a.host},onLoad:function(){wx.login({success:function(o){wx.request({url:a.requestUrl+"&a=getOpenid&code="+o.code,success:function(a){e.globalData.openid=a.data,console.log(e.globalData.openid)}})}})},mybook:function(){wx.navigateTo({url:"mybook"})},newphoto:function(o){var t=this,n=o.detail.formId;console.log(n),wx.request({url:a.host+"admin.php?m=Qwadmin&c=Zz&a=index",data:{apptype:a.apptype,openid:e.globalData.openid,template_id:a.template_id,formid:n}}),wx.chooseImage({count:4,sizeType:["compressed"],sourceType:["album"],success:function(e){console.log(e.tempFilePaths);e.tempFilePaths;t.uploadImage(e.tempFilePaths)}})},uploadImage:function(o){wx.uploadFile({url:a.host+"index.php?m=WEB&c=D3Uploader&a=wxUpload",filePath:o[0],name:"createImage",header:{chartset:"utf-8","content-type":"multipart/form-data"},formData:{unionid:e.globalData.openid},success:function(e){console.log(e.data);var t=e.data.replace(/\ufeff/g,""),n=JSON.parse(t),i=parseInt(n.wxid);for(var s in o)wx.uploadFile({url:a.host+"index.php?m=WEB&c=D3Uploader&a=wxUploadlist",filePath:o[s],name:"photo",header:{chartset:"utf-8","content-type":"multipart/form-data"},formData:{tuid:i,one:s},success:function(e){console.log("副表返回ID："+e.data)}});wx.navigateTo({url:"view?id="+parseInt(i)+"&share=0"})}})},onHide:function(){wx.pauseBackgroundAudio()},onShareAppMessage:function(e){return"menu"===e.from&&console.log(e.target),{title:"转发",path:"/pages/3d/index",success:function(e){},fail:function(e){}}}}); 
 			}); 	require("pages/3d/index.js");
 		__wxRoute = 'pages/3d/view';__wxRouteBegin = true; 	define("pages/3d/view.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";var e=getApp(),i=require("../../utils/config.js");Page({data:{dview:"",id:0},onLoad:function(a){var t=this;wx.login({success:function(s){wx.request({url:i.requestUrl+"&a=getOpenid&code="+s.code,success:function(s){e.globalData.openid=s.data,t.setData({dview:i.host+"index.php?c=D3View&a=overall&id="+a.id+"&share="+a.share,id:a.id})}})}}),console.log(i.host+"index.php?c=D3View&a=overall&id="+a.id+"&share="+a.share),wx.showLoading({title:"等待...",mask:1}),setTimeout(function(){wx.hideLoading()},1e3)},onShareAppMessage:function(e){return"menu"===e.from&&console.log(e.target),{title:"我制作了一个魔幻3D全景立体相册，打开看看",path:"/pages/3d/view?id="+this.data.id+"&share=1"}}}); 
 			}); 	require("pages/3d/view.js");
 		__wxRoute = 'pages/3d/mybook';__wxRouteBegin = true; 	define("pages/3d/mybook.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";var t=getApp(),e=require("../../utils/config.js");Page({data:{photolist:[],userInfo:[],UnionID:null,ad:e.ad,host:e.host},photoLoad:function(t){var a=this;wx.request({url:e.host+"index.php?m=WEB&c=D3Photos&a=WXgetListByuid",data:{uid:t},header:{"content-type":"application/json"},success:function(t){a.setData({photolist:t.data}),console.log(t.data)}})},onLoad:function(){this.setData({UnionID:t.globalData.openid})},onShow:function(){this.photoLoad(t.globalData.openid)},newphoto:function(){var t=this;wx.chooseImage({count:9,sizeType:["compressed"],sourceType:["album"],success:function(e){console.log("获取图片路径"),console.log(e.tempFilePaths);e.tempFilePaths;t.uploadImage(e.tempFilePaths)}})},uploadImage:function(t){wx.uploadFile({url:e.host+"index.php?m=WEB&c=D3Uploader&a=wxUpload",filePath:t[0],name:"createImage",header:{chartset:"utf-8","content-type":"multipart/form-data"},formData:{unionid:this.data.UnionID},success:function(a){var o=a.data.replace(/\ufeff/g,""),n=JSON.parse(o),i=parseInt(n.wxid);for(var s in t)wx.uploadFile({url:e.host+"index.php?m=WEB&c=D3Uploader&a=wxUploadlist",filePath:t[s],name:"photo",header:{chartset:"utf-8","content-type":"multipart/form-data"},formData:{tuid:i,one:s},success:function(t){console.log("副表返回ID："+t.data)}});wx.navigateTo({url:"view?id="+parseInt(i)+"&share=0"})}})},remove:function(t){console.log(t);var e=this;wx.showModal({title:"温馨提示",content:"是否确定删除该相册",showCancel:!0,success:function(a){console.log(a),a.confirm?(console.log(t.currentTarget.dataset.id),e.del(t.currentTarget.dataset.id)):console.log("用户点击取消")}})},del:function(t){var a=this;wx.request({url:e.host+"index.php?m=WEB&c=D3View&a=delKxiuByid",data:{wxid:t},header:{"content-type":"application/json"},success:function(t){console.log(t),console.log(t.data),a.photoLoad(t.data)}})},backindex:function(){wx.reLaunch({url:"../aindex/index"})},sharee:function(t){var e=t.currentTarget.dataset.id;wx.navigateTo({url:"share?id="+e})},look:function(t){var e=t.currentTarget.dataset.id;wx.navigateTo({url:"view?id="+e+"&share=1"})},dan:function(t){var a=t.currentTarget.dataset.id;t.currentTarget.dataset.bg,t.currentTarget.dataset.skinurl,t.currentTarget.dataset.musicurl;wx.request({url:e.host+"index.php?m=WEB&c=D3View&a=addclick",data:{wxid:a},header:{"content-type":"application/json"},success:function(t){wx.navigateTo({url:"view?id="+a+"&share=0"})}})}}); 
 			}); 	require("pages/3d/mybook.js");
 		__wxRoute = 'pages/3d/share';__wxRouteBegin = true; 	define("pages/3d/share.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";getApp();var e=require("../../utils/config.js");Page({data:{photolist:[],sharearr:[],visibility_baocun:" visibility:hidden",baocun:0,sharepic:"",touxiang:"",id:0,ma:"",sign:"0",ad:e.ad,host:e.host,userInfo:[]},onLoad:function(t){this.setData({id:t.id});var a=this;wx.request({url:e.host+"index.php?&m=Web&c=D3Photos&a=getTuwenlist",data:{id:t.id},header:{"content-type":"application/json"},success:function(t){console.log(t.data),t.data.wxcove=e.host+t.data.wxcove,a.setData({photolist:t.data,sharepic:t.data.wxcove,sign:t.data.sign})}})},pengyou:function(){var t=this;wx.showLoading({title:"保存中，请稍后"}),wx.downloadFile({url:e.host+"background/bg.jpg",success:function(a){console.log(a.tempFilePath),wx.downloadFile({url:t.data.sharepic,success:function(a){console.log(a.tempFilePath),wx.request({url:e.host+"/index.php?c=Dd&a=careteqc",data:{id:t.data.id,sign:t.data.sign},success:function(o){console.log(o.data),console.log(e.host+"/"+o.data),wx.downloadFile({url:e.host+"/"+o.data,success:function(e){console.log(e.tempFilePath);var o=wx.createCanvasContext("shareCanvas");o.setFillStyle("#ffffff"),o.fillRect(0,0,400,600),o.setFillStyle("#000000"),o.setFontSize(40),o.fillText("我的3D全景相册",54,45),o.drawImage(a.tempFilePath,15,65,371,386),o.drawImage(e.tempFilePath,148,457,106,106),o.setFillStyle("#000000"),o.setFontSize(20),o.fillText("长按识别二维码查看",109,585),o.draw(),setTimeout(function(){t.canvasSave("shareCanvas")},200),wx.hideLoading()}})}})}})}})},canvasSave:function(e){wx.canvasToTempFilePath({canvasId:"shareCanvas",fileType:"jpg",quality:1,success:function(e){console.log(e),wx.saveImageToPhotosAlbum({filePath:e.tempFilePath,success:function(e){wx.hideLoading(),wx.showToast({title:"保存到手机相册成功",icon:"succes",duration:1e3,mask:!0})},fail:function(e){console.log(e),"saveImageToPhotosAlbum:fail auth deny"===e.errMsg&&(console.log("用户一开始拒绝了，我们想再次发起授权"),console.log("打开设置窗口"),wx.openSetting({success:function(e){console.log(e),e.authSetting["scope.writePhotosAlbum"]?console.log("获取权限成功，给出再次点击图片保存到相册的提示。"):console.log("获取权限失败，给出不给权限就无法正常使用的提示")}}))}})}})},onShareAppMessage:function(){var e=this.data.photolist;return{title:e.wxtitle,path:"/pages/3d/view?id="+e.wxid+"&share=1",imageUrl:e.wxcove}},clkyulan:function(){var e=this.data.photolist;wx.navigateTo({url:"/pages/3d/view?id="+e.wxid+"&share=1"})},backbtn:function(){wx.reLaunch({url:"index"})},xcbook:function(){wx.reLaunch({url:"mybook"})}}); 
 			}); 	require("pages/3d/share.js");
 	