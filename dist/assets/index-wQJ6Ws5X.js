var zS=Object.defineProperty;var HS=(n,e,t)=>e in n?zS(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var us=(n,e,t)=>HS(n,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/**
* @vue/shared v3.5.11
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**//*! #__NO_SIDE_EFFECTS__ */function up(n){const e=Object.create(null);for(const t of n.split(","))e[t]=1;return t=>t in e}const At={},Go=[],ts=()=>{},VS=()=>!1,Au=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),hp=n=>n.startsWith("onUpdate:"),xn=Object.assign,fp=(n,e)=>{const t=n.indexOf(e);t>-1&&n.splice(t,1)},GS=Object.prototype.hasOwnProperty,_t=(n,e)=>GS.call(n,e),et=Array.isArray,Wo=n=>Cu(n)==="[object Map]",Uv=n=>Cu(n)==="[object Set]",st=n=>typeof n=="function",Yt=n=>typeof n=="string",Mr=n=>typeof n=="symbol",Lt=n=>n!==null&&typeof n=="object",Ov=n=>(Lt(n)||st(n))&&st(n.then)&&st(n.catch),Fv=Object.prototype.toString,Cu=n=>Fv.call(n),WS=n=>Cu(n).slice(8,-1),Nv=n=>Cu(n)==="[object Object]",dp=n=>Yt(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,sl=up(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Ru=n=>{const e=Object.create(null);return t=>e[t]||(e[t]=n(t))},XS=/-(\w)/g,_r=Ru(n=>n.replace(XS,(e,t)=>t?t.toUpperCase():"")),qS=/\B([A-Z])/g,fo=Ru(n=>n.replace(qS,"-$1").toLowerCase()),Bv=Ru(n=>n.charAt(0).toUpperCase()+n.slice(1)),rh=Ru(n=>n?`on${Bv(n)}`:""),vr=(n,e)=>!Object.is(n,e),oh=(n,...e)=>{for(let t=0;t<n.length;t++)n[t](...e)},kv=(n,e,t,i=!1)=>{Object.defineProperty(n,e,{configurable:!0,enumerable:!1,writable:i,value:t})},$S=n=>{const e=parseFloat(n);return isNaN(e)?n:e};let Im;const zv=()=>Im||(Im=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function pp(n){if(et(n)){const e={};for(let t=0;t<n.length;t++){const i=n[t],s=Yt(i)?ZS(i):pp(i);if(s)for(const r in s)e[r]=s[r]}return e}else if(Yt(n)||Lt(n))return n}const YS=/;(?![^(]*\))/g,jS=/:([^]+)/,KS=/\/\*[^]*?\*\//g;function ZS(n){const e={};return n.replace(KS,"").split(YS).forEach(t=>{if(t){const i=t.split(jS);i.length>1&&(e[i[0].trim()]=i[1].trim())}}),e}function ss(n){let e="";if(Yt(n))e=n;else if(et(n))for(let t=0;t<n.length;t++){const i=ss(n[t]);i&&(e+=i+" ")}else if(Lt(n))for(const t in n)n[t]&&(e+=t+" ");return e.trim()}const QS="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",JS=up(QS);function Hv(n){return!!n||n===""}const Vv=n=>!!(n&&n.__v_isRef===!0),ro=n=>Yt(n)?n:n==null?"":et(n)||Lt(n)&&(n.toString===Fv||!st(n.toString))?Vv(n)?ro(n.value):JSON.stringify(n,Gv,2):String(n),Gv=(n,e)=>Vv(e)?Gv(n,e.value):Wo(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((t,[i,s],r)=>(t[ah(i,r)+" =>"]=s,t),{})}:Uv(e)?{[`Set(${e.size})`]:[...e.values()].map(t=>ah(t))}:Mr(e)?ah(e):Lt(e)&&!et(e)&&!Nv(e)?String(e):e,ah=(n,e="")=>{var t;return Mr(n)?`Symbol(${(t=n.description)!=null?t:e})`:n};/**
* @vue/reactivity v3.5.11
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let jn;class ey{constructor(e=!1){this.detached=e,this._active=!0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=jn,!e&&jn&&(this.index=(jn.scopes||(jn.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){const t=jn;try{return jn=this,e()}finally{jn=t}}}on(){jn=this}off(){jn=this.parent}stop(e){if(this._active){let t,i;for(t=0,i=this.effects.length;t<i;t++)this.effects[t].stop();for(t=0,i=this.cleanups.length;t<i;t++)this.cleanups[t]();if(this.scopes)for(t=0,i=this.scopes.length;t<i;t++)this.scopes[t].stop(!0);if(!this.detached&&this.parent&&!e){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0,this._active=!1}}}function ty(){return jn}let Tt;const lh=new WeakSet;class Wv{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,jn&&jn.active&&jn.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,lh.has(this)&&(lh.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||qv(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Um(this),$v(this);const e=Tt,t=Ui;Tt=this,Ui=!0;try{return this.fn()}finally{Yv(this),Tt=e,Ui=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)_p(e);this.deps=this.depsTail=void 0,Um(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?lh.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Af(this)&&this.run()}get dirty(){return Af(this)}}let Xv=0,rl,ol;function qv(n,e=!1){if(n.flags|=8,e){n.next=ol,ol=n;return}n.next=rl,rl=n}function mp(){Xv++}function gp(){if(--Xv>0)return;if(ol){let e=ol;for(ol=void 0;e;){const t=e.next;e.next=void 0,e.flags&=-9,e=t}}let n;for(;rl;){let e=rl;for(rl=void 0;e;){const t=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(i){n||(n=i)}e=t}}if(n)throw n}function $v(n){for(let e=n.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function Yv(n){let e,t=n.depsTail,i=t;for(;i;){const s=i.prevDep;i.version===-1?(i===t&&(t=s),_p(i),ny(i)):e=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=s}n.deps=e,n.depsTail=t}function Af(n){for(let e=n.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(jv(e.dep.computed)||e.dep.version!==e.version))return!0;return!!n._dirty}function jv(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===vl))return;n.globalVersion=vl;const e=n.dep;if(n.flags|=2,e.version>0&&!n.isSSR&&n.deps&&!Af(n)){n.flags&=-3;return}const t=Tt,i=Ui;Tt=n,Ui=!0;try{$v(n);const s=n.fn(n._value);(e.version===0||vr(s,n._value))&&(n._value=s,e.version++)}catch(s){throw e.version++,s}finally{Tt=t,Ui=i,Yv(n),n.flags&=-3}}function _p(n,e=!1){const{dep:t,prevSub:i,nextSub:s}=n;if(i&&(i.nextSub=s,n.prevSub=void 0),s&&(s.prevSub=i,n.nextSub=void 0),t.subs===n&&(t.subs=i),!t.subs&&t.computed){t.computed.flags&=-5;for(let r=t.computed.deps;r;r=r.nextDep)_p(r,!0)}!e&&!--t.sc&&t.map&&t.map.delete(t.key)}function ny(n){const{prevDep:e,nextDep:t}=n;e&&(e.nextDep=t,n.prevDep=void 0),t&&(t.prevDep=e,n.nextDep=void 0)}let Ui=!0;const Kv=[];function Er(){Kv.push(Ui),Ui=!1}function wr(){const n=Kv.pop();Ui=n===void 0?!0:n}function Um(n){const{cleanup:e}=n;if(n.cleanup=void 0,e){const t=Tt;Tt=void 0;try{e()}finally{Tt=t}}}let vl=0;class iy{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class vp{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0}track(e){if(!Tt||!Ui||Tt===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==Tt)t=this.activeLink=new iy(Tt,this),Tt.deps?(t.prevDep=Tt.depsTail,Tt.depsTail.nextDep=t,Tt.depsTail=t):Tt.deps=Tt.depsTail=t,Zv(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){const i=t.nextDep;i.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=i),t.prevDep=Tt.depsTail,t.nextDep=void 0,Tt.depsTail.nextDep=t,Tt.depsTail=t,Tt.deps===t&&(Tt.deps=i)}return t}trigger(e){this.version++,vl++,this.notify(e)}notify(e){mp();try{for(let t=this.subs;t;t=t.prevSub)t.sub.notify()&&t.sub.dep.notify()}finally{gp()}}}function Zv(n){if(n.dep.sc++,n.sub.flags&4){const e=n.dep.computed;if(e&&!n.dep.subs){e.flags|=20;for(let i=e.deps;i;i=i.nextDep)Zv(i)}const t=n.dep.subs;t!==n&&(n.prevSub=t,t&&(t.nextSub=n)),n.dep.subs=n}}const Cf=new WeakMap,Qr=Symbol(""),Rf=Symbol(""),xl=Symbol("");function fn(n,e,t){if(Ui&&Tt){let i=Cf.get(n);i||Cf.set(n,i=new Map);let s=i.get(t);s||(i.set(t,s=new vp),s.map=i,s.key=t),s.track()}}function Ls(n,e,t,i,s,r){const o=Cf.get(n);if(!o){vl++;return}const a=l=>{l&&l.trigger()};if(mp(),e==="clear")o.forEach(a);else{const l=et(n),c=l&&dp(t);if(l&&t==="length"){const u=Number(i);o.forEach((h,f)=>{(f==="length"||f===xl||!Mr(f)&&f>=u)&&a(h)})}else switch(t!==void 0&&a(o.get(t)),c&&a(o.get(xl)),e){case"add":l?c&&a(o.get("length")):(a(o.get(Qr)),Wo(n)&&a(o.get(Rf)));break;case"delete":l||(a(o.get(Qr)),Wo(n)&&a(o.get(Rf)));break;case"set":Wo(n)&&a(o.get(Qr));break}}gp()}function go(n){const e=vt(n);return e===n?e:(fn(e,"iterate",xl),bi(n)?e:e.map(rn))}function Pu(n){return fn(n=vt(n),"iterate",xl),n}const sy={__proto__:null,[Symbol.iterator](){return ch(this,Symbol.iterator,rn)},concat(...n){return go(this).concat(...n.map(e=>et(e)?go(e):e))},entries(){return ch(this,"entries",n=>(n[1]=rn(n[1]),n))},every(n,e){return hs(this,"every",n,e,void 0,arguments)},filter(n,e){return hs(this,"filter",n,e,t=>t.map(rn),arguments)},find(n,e){return hs(this,"find",n,e,rn,arguments)},findIndex(n,e){return hs(this,"findIndex",n,e,void 0,arguments)},findLast(n,e){return hs(this,"findLast",n,e,rn,arguments)},findLastIndex(n,e){return hs(this,"findLastIndex",n,e,void 0,arguments)},forEach(n,e){return hs(this,"forEach",n,e,void 0,arguments)},includes(...n){return uh(this,"includes",n)},indexOf(...n){return uh(this,"indexOf",n)},join(n){return go(this).join(n)},lastIndexOf(...n){return uh(this,"lastIndexOf",n)},map(n,e){return hs(this,"map",n,e,void 0,arguments)},pop(){return Ia(this,"pop")},push(...n){return Ia(this,"push",n)},reduce(n,...e){return Om(this,"reduce",n,e)},reduceRight(n,...e){return Om(this,"reduceRight",n,e)},shift(){return Ia(this,"shift")},some(n,e){return hs(this,"some",n,e,void 0,arguments)},splice(...n){return Ia(this,"splice",n)},toReversed(){return go(this).toReversed()},toSorted(n){return go(this).toSorted(n)},toSpliced(...n){return go(this).toSpliced(...n)},unshift(...n){return Ia(this,"unshift",n)},values(){return ch(this,"values",rn)}};function ch(n,e,t){const i=Pu(n),s=i[e]();return i!==n&&!bi(n)&&(s._next=s.next,s.next=()=>{const r=s._next();return r.value&&(r.value=t(r.value)),r}),s}const ry=Array.prototype;function hs(n,e,t,i,s,r){const o=Pu(n),a=o!==n&&!bi(n),l=o[e];if(l!==ry[e]){const h=l.apply(n,r);return a?rn(h):h}let c=t;o!==n&&(a?c=function(h,f){return t.call(this,rn(h),f,n)}:t.length>2&&(c=function(h,f){return t.call(this,h,f,n)}));const u=l.call(o,c,i);return a&&s?s(u):u}function Om(n,e,t,i){const s=Pu(n);let r=t;return s!==n&&(bi(n)?t.length>3&&(r=function(o,a,l){return t.call(this,o,a,l,n)}):r=function(o,a,l){return t.call(this,o,rn(a),l,n)}),s[e](r,...i)}function uh(n,e,t){const i=vt(n);fn(i,"iterate",xl);const s=i[e](...t);return(s===-1||s===!1)&&yp(t[0])?(t[0]=vt(t[0]),i[e](...t)):s}function Ia(n,e,t=[]){Er(),mp();const i=vt(n)[e].apply(n,t);return gp(),wr(),i}const oy=up("__proto__,__v_isRef,__isVue"),Qv=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(Mr));function ay(n){Mr(n)||(n=String(n));const e=vt(this);return fn(e,"has",n),e.hasOwnProperty(n)}class Jv{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,i){const s=this._isReadonly,r=this._isShallow;if(t==="__v_isReactive")return!s;if(t==="__v_isReadonly")return s;if(t==="__v_isShallow")return r;if(t==="__v_raw")return i===(s?r?by:i0:r?n0:t0).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(i)?e:void 0;const o=et(e);if(!s){let l;if(o&&(l=sy[t]))return l;if(t==="hasOwnProperty")return ay}const a=Reflect.get(e,t,ln(e)?e:i);return(Mr(t)?Qv.has(t):oy(t))||(s||fn(e,"get",t),r)?a:ln(a)?o&&dp(t)?a:a.value:Lt(a)?s?r0(a):Lu(a):a}}class e0 extends Jv{constructor(e=!1){super(!1,e)}set(e,t,i,s){let r=e[t];if(!this._isShallow){const l=oo(r);if(!bi(i)&&!oo(i)&&(r=vt(r),i=vt(i)),!et(e)&&ln(r)&&!ln(i))return l?!1:(r.value=i,!0)}const o=et(e)&&dp(t)?Number(t)<e.length:_t(e,t),a=Reflect.set(e,t,i,ln(e)?e:s);return e===vt(s)&&(o?vr(i,r)&&Ls(e,"set",t,i):Ls(e,"add",t,i)),a}deleteProperty(e,t){const i=_t(e,t);e[t];const s=Reflect.deleteProperty(e,t);return s&&i&&Ls(e,"delete",t,void 0),s}has(e,t){const i=Reflect.has(e,t);return(!Mr(t)||!Qv.has(t))&&fn(e,"has",t),i}ownKeys(e){return fn(e,"iterate",et(e)?"length":Qr),Reflect.ownKeys(e)}}class ly extends Jv{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const cy=new e0,uy=new ly,hy=new e0(!0);const xp=n=>n,Du=n=>Reflect.getPrototypeOf(n);function Jl(n,e,t=!1,i=!1){n=n.__v_raw;const s=vt(n),r=vt(e);t||(vr(e,r)&&fn(s,"get",e),fn(s,"get",r));const{has:o}=Du(s),a=i?xp:t?Mp:rn;if(o.call(s,e))return a(n.get(e));if(o.call(s,r))return a(n.get(r));n!==s&&n.get(e)}function ec(n,e=!1){const t=this.__v_raw,i=vt(t),s=vt(n);return e||(vr(n,s)&&fn(i,"has",n),fn(i,"has",s)),n===s?t.has(n):t.has(n)||t.has(s)}function tc(n,e=!1){return n=n.__v_raw,!e&&fn(vt(n),"iterate",Qr),Reflect.get(n,"size",n)}function Fm(n,e=!1){!e&&!bi(n)&&!oo(n)&&(n=vt(n));const t=vt(this);return Du(t).has.call(t,n)||(t.add(n),Ls(t,"add",n,n)),this}function Nm(n,e,t=!1){!t&&!bi(e)&&!oo(e)&&(e=vt(e));const i=vt(this),{has:s,get:r}=Du(i);let o=s.call(i,n);o||(n=vt(n),o=s.call(i,n));const a=r.call(i,n);return i.set(n,e),o?vr(e,a)&&Ls(i,"set",n,e):Ls(i,"add",n,e),this}function Bm(n){const e=vt(this),{has:t,get:i}=Du(e);let s=t.call(e,n);s||(n=vt(n),s=t.call(e,n)),i&&i.call(e,n);const r=e.delete(n);return s&&Ls(e,"delete",n,void 0),r}function km(){const n=vt(this),e=n.size!==0,t=n.clear();return e&&Ls(n,"clear",void 0,void 0),t}function nc(n,e){return function(i,s){const r=this,o=r.__v_raw,a=vt(o),l=e?xp:n?Mp:rn;return!n&&fn(a,"iterate",Qr),o.forEach((c,u)=>i.call(s,l(c),l(u),r))}}function ic(n,e,t){return function(...i){const s=this.__v_raw,r=vt(s),o=Wo(r),a=n==="entries"||n===Symbol.iterator&&o,l=n==="keys"&&o,c=s[n](...i),u=t?xp:e?Mp:rn;return!e&&fn(r,"iterate",l?Rf:Qr),{next(){const{value:h,done:f}=c.next();return f?{value:h,done:f}:{value:a?[u(h[0]),u(h[1])]:u(h),done:f}},[Symbol.iterator](){return this}}}}function Xs(n){return function(...e){return n==="delete"?!1:n==="clear"?void 0:this}}function fy(){const n={get(r){return Jl(this,r)},get size(){return tc(this)},has:ec,add:Fm,set:Nm,delete:Bm,clear:km,forEach:nc(!1,!1)},e={get(r){return Jl(this,r,!1,!0)},get size(){return tc(this)},has:ec,add(r){return Fm.call(this,r,!0)},set(r,o){return Nm.call(this,r,o,!0)},delete:Bm,clear:km,forEach:nc(!1,!0)},t={get(r){return Jl(this,r,!0)},get size(){return tc(this,!0)},has(r){return ec.call(this,r,!0)},add:Xs("add"),set:Xs("set"),delete:Xs("delete"),clear:Xs("clear"),forEach:nc(!0,!1)},i={get(r){return Jl(this,r,!0,!0)},get size(){return tc(this,!0)},has(r){return ec.call(this,r,!0)},add:Xs("add"),set:Xs("set"),delete:Xs("delete"),clear:Xs("clear"),forEach:nc(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(r=>{n[r]=ic(r,!1,!1),t[r]=ic(r,!0,!1),e[r]=ic(r,!1,!0),i[r]=ic(r,!0,!0)}),[n,t,e,i]}const[dy,py,my,gy]=fy();function bp(n,e){const t=e?n?gy:my:n?py:dy;return(i,s,r)=>s==="__v_isReactive"?!n:s==="__v_isReadonly"?n:s==="__v_raw"?i:Reflect.get(_t(t,s)&&s in i?t:i,s,r)}const _y={get:bp(!1,!1)},vy={get:bp(!1,!0)},xy={get:bp(!0,!1)};const t0=new WeakMap,n0=new WeakMap,i0=new WeakMap,by=new WeakMap;function Sy(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function yy(n){return n.__v_skip||!Object.isExtensible(n)?0:Sy(WS(n))}function Lu(n){return oo(n)?n:Sp(n,!1,cy,_y,t0)}function s0(n){return Sp(n,!1,hy,vy,n0)}function r0(n){return Sp(n,!0,uy,xy,i0)}function Sp(n,e,t,i,s){if(!Lt(n)||n.__v_raw&&!(e&&n.__v_isReactive))return n;const r=s.get(n);if(r)return r;const o=yy(n);if(o===0)return n;const a=new Proxy(n,o===2?i:t);return s.set(n,a),a}function Xo(n){return oo(n)?Xo(n.__v_raw):!!(n&&n.__v_isReactive)}function oo(n){return!!(n&&n.__v_isReadonly)}function bi(n){return!!(n&&n.__v_isShallow)}function yp(n){return n?!!n.__v_raw:!1}function vt(n){const e=n&&n.__v_raw;return e?vt(e):n}function My(n){return!_t(n,"__v_skip")&&Object.isExtensible(n)&&kv(n,"__v_skip",!0),n}const rn=n=>Lt(n)?Lu(n):n,Mp=n=>Lt(n)?r0(n):n;function ln(n){return n?n.__v_isRef===!0:!1}function at(n){return o0(n,!1)}function Ey(n){return o0(n,!0)}function o0(n,e){return ln(n)?n:new wy(n,e)}class wy{constructor(e,t){this.dep=new vp,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:vt(e),this._value=t?e:rn(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){const t=this._rawValue,i=this.__v_isShallow||bi(e)||oo(e);e=i?e:vt(e),vr(e,t)&&(this._rawValue=e,this._value=i?e:rn(e),this.dep.trigger())}}function Oi(n){return ln(n)?n.value:n}const Ty={get:(n,e,t)=>e==="__v_raw"?n:Oi(Reflect.get(n,e,t)),set:(n,e,t,i)=>{const s=n[e];return ln(s)&&!ln(t)?(s.value=t,!0):Reflect.set(n,e,t,i)}};function a0(n){return Xo(n)?n:new Proxy(n,Ty)}class Ay{constructor(e,t,i){this.fn=e,this.setter=t,this._value=void 0,this.dep=new vp(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=vl-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&Tt!==this)return qv(this,!0),!0}get value(){const e=this.dep.track();return jv(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function Cy(n,e,t=!1){let i,s;return st(n)?i=n:(i=n.get,s=n.set),new Ay(i,s,t)}const sc={},Jc=new WeakMap;let Gr;function Ry(n,e=!1,t=Gr){if(t){let i=Jc.get(t);i||Jc.set(t,i=[]),i.push(n)}}function Py(n,e,t=At){const{immediate:i,deep:s,once:r,scheduler:o,augmentJob:a,call:l}=t,c=v=>s?v:bi(v)||s===!1||s===0?rr(v,1):rr(v);let u,h,f,d,g=!1,_=!1;if(ln(n)?(h=()=>n.value,g=bi(n)):Xo(n)?(h=()=>c(n),g=!0):et(n)?(_=!0,g=n.some(v=>Xo(v)||bi(v)),h=()=>n.map(v=>{if(ln(v))return v.value;if(Xo(v))return c(v);if(st(v))return l?l(v,2):v()})):st(n)?e?h=l?()=>l(n,2):n:h=()=>{if(f){Er();try{f()}finally{wr()}}const v=Gr;Gr=u;try{return l?l(n,3,[d]):n(d)}finally{Gr=v}}:h=ts,e&&s){const v=h,C=s===!0?1/0:s;h=()=>rr(v(),C)}const m=ty(),p=()=>{u.stop(),m&&fp(m.effects,u)};if(r&&e){const v=e;e=(...C)=>{v(...C),p()}}let x=_?new Array(n.length).fill(sc):sc;const b=v=>{if(!(!(u.flags&1)||!u.dirty&&!v))if(e){const C=u.run();if(s||g||(_?C.some((A,T)=>vr(A,x[T])):vr(C,x))){f&&f();const A=Gr;Gr=u;try{const T=[C,x===sc?void 0:_&&x[0]===sc?[]:x,d];l?l(e,3,T):e(...T),x=C}finally{Gr=A}}}else u.run()};return a&&a(b),u=new Wv(h),u.scheduler=o?()=>o(b,!1):b,d=v=>Ry(v,!1,u),f=u.onStop=()=>{const v=Jc.get(u);if(v){if(l)l(v,4);else for(const C of v)C();Jc.delete(u)}},e?i?b(!0):x=u.run():o?o(b.bind(null,!0),!0):u.run(),p.pause=u.pause.bind(u),p.resume=u.resume.bind(u),p.stop=p,p}function rr(n,e=1/0,t){if(e<=0||!Lt(n)||n.__v_skip||(t=t||new Set,t.has(n)))return n;if(t.add(n),e--,ln(n))rr(n.value,e,t);else if(et(n))for(let i=0;i<n.length;i++)rr(n[i],e,t);else if(Uv(n)||Wo(n))n.forEach(i=>{rr(i,e,t)});else if(Nv(n)){for(const i in n)rr(n[i],e,t);for(const i of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,i)&&rr(n[i],e,t)}return n}/**
* @vue/runtime-core v3.5.11
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Hl(n,e,t,i){try{return i?n(...i):n()}catch(s){Iu(s,e,t)}}function rs(n,e,t,i){if(st(n)){const s=Hl(n,e,t,i);return s&&Ov(s)&&s.catch(r=>{Iu(r,e,t)}),s}if(et(n)){const s=[];for(let r=0;r<n.length;r++)s.push(rs(n[r],e,t,i));return s}}function Iu(n,e,t,i=!0){const s=e?e.vnode:null,{errorHandler:r,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||At;if(e){let a=e.parent;const l=e.proxy,c=`https://vuejs.org/error-reference/#runtime-${t}`;for(;a;){const u=a.ec;if(u){for(let h=0;h<u.length;h++)if(u[h](n,l,c)===!1)return}a=a.parent}if(r){Er(),Hl(r,null,10,[n,l,c]),wr();return}}Dy(n,t,s,i,o)}function Dy(n,e,t,i=!0,s=!1){if(s)throw n;console.error(n)}const mn=[];let Xi=-1;const qo=[];let nr=null,Uo=0;const l0=Promise.resolve();let eu=null;function c0(n){const e=eu||l0;return n?e.then(this?n.bind(this):n):e}function Ly(n){let e=Xi+1,t=mn.length;for(;e<t;){const i=e+t>>>1,s=mn[i],r=bl(s);r<n||r===n&&s.flags&2?e=i+1:t=i}return e}function Ep(n){if(!(n.flags&1)){const e=bl(n),t=mn[mn.length-1];!t||!(n.flags&2)&&e>=bl(t)?mn.push(n):mn.splice(Ly(e),0,n),n.flags|=1,u0()}}function u0(){eu||(eu=l0.then(f0))}function Iy(n){et(n)?qo.push(...n):nr&&n.id===-1?nr.splice(Uo+1,0,n):n.flags&1||(qo.push(n),n.flags|=1),u0()}function zm(n,e,t=Xi+1){for(;t<mn.length;t++){const i=mn[t];if(i&&i.flags&2){if(n&&i.id!==n.uid)continue;mn.splice(t,1),t--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function h0(n){if(qo.length){const e=[...new Set(qo)].sort((t,i)=>bl(t)-bl(i));if(qo.length=0,nr){nr.push(...e);return}for(nr=e,Uo=0;Uo<nr.length;Uo++){const t=nr[Uo];t.flags&4&&(t.flags&=-2),t.flags&8||t(),t.flags&=-2}nr=null,Uo=0}}const bl=n=>n.id==null?n.flags&2?-1:1/0:n.id;function f0(n){try{for(Xi=0;Xi<mn.length;Xi++){const e=mn[Xi];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),Hl(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;Xi<mn.length;Xi++){const e=mn[Xi];e&&(e.flags&=-2)}Xi=-1,mn.length=0,h0(),eu=null,(mn.length||qo.length)&&f0()}}let Qi=null,d0=null;function tu(n){const e=Qi;return Qi=n,d0=n&&n.type.__scopeId||null,e}function Uy(n,e=Qi,t){if(!e||n._n)return n;const i=(...s)=>{i._d&&jm(-1);const r=tu(e);let o;try{o=n(...s)}finally{tu(r),i._d&&jm(1)}return o};return i._n=!0,i._c=!0,i._d=!0,i}function Dr(n,e,t,i){const s=n.dirs,r=e&&e.dirs;for(let o=0;o<s.length;o++){const a=s[o];r&&(a.oldValue=r[o].value);let l=a.dir[i];l&&(Er(),rs(l,t,8,[n.el,a,n,e]),wr())}}const Oy=Symbol("_vte"),Fy=n=>n.__isTeleport;function wp(n,e){n.shapeFlag&6&&n.component?(n.transition=e,wp(n.component.subTree,e)):n.shapeFlag&128?(n.ssContent.transition=e.clone(n.ssContent),n.ssFallback.transition=e.clone(n.ssFallback)):n.transition=e}/*! #__NO_SIDE_EFFECTS__ */function p0(n,e){return st(n)?xn({name:n.name},e,{setup:n}):n}function m0(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}function Pf(n,e,t,i,s=!1){if(et(n)){n.forEach((g,_)=>Pf(g,e&&(et(e)?e[_]:e),t,i,s));return}if(al(i)&&!s)return;const r=i.shapeFlag&4?Cp(i.component):i.el,o=s?null:r,{i:a,r:l}=n,c=e&&e.r,u=a.refs===At?a.refs={}:a.refs,h=a.setupState,f=vt(h),d=h===At?()=>!1:g=>_t(f,g);if(c!=null&&c!==l&&(Yt(c)?(u[c]=null,d(c)&&(h[c]=null)):ln(c)&&(c.value=null)),st(l))Hl(l,a,12,[o,u]);else{const g=Yt(l),_=ln(l);if(g||_){const m=()=>{if(n.f){const p=g?d(l)?h[l]:u[l]:l.value;s?et(p)&&fp(p,r):et(p)?p.includes(r)||p.push(r):g?(u[l]=[r],d(l)&&(h[l]=u[l])):(l.value=[r],n.k&&(u[n.k]=l.value))}else g?(u[l]=o,d(l)&&(h[l]=o)):_&&(l.value=o,n.k&&(u[n.k]=o))};o?(m.id=-1,Yn(m,t)):m()}}}const al=n=>!!n.type.__asyncLoader,g0=n=>n.type.__isKeepAlive;function Ny(n,e){_0(n,"a",e)}function By(n,e){_0(n,"da",e)}function _0(n,e,t=gn){const i=n.__wdc||(n.__wdc=()=>{let s=t;for(;s;){if(s.isDeactivated)return;s=s.parent}return n()});if(Uu(e,i,t),t){let s=t.parent;for(;s&&s.parent;)g0(s.parent.vnode)&&ky(i,e,t,s),s=s.parent}}function ky(n,e,t,i){const s=Uu(e,n,i,!0);v0(()=>{fp(i[e],s)},t)}function Uu(n,e,t=gn,i=!1){if(t){const s=t[n]||(t[n]=[]),r=e.__weh||(e.__weh=(...o)=>{Er();const a=Vl(t),l=rs(e,t,n,o);return a(),wr(),l});return i?s.unshift(r):s.push(r),r}}const Hs=n=>(e,t=gn)=>{(!Nu||n==="sp")&&Uu(n,(...i)=>e(...i),t)},zy=Hs("bm"),ci=Hs("m"),Hy=Hs("bu"),Vy=Hs("u"),yi=Hs("bum"),v0=Hs("um"),Gy=Hs("sp"),Wy=Hs("rtg"),Xy=Hs("rtc");function qy(n,e=gn){Uu("ec",n,e)}const $y=Symbol.for("v-ndc");function Yy(n,e,t,i){let s;const r=t,o=et(n);if(o||Yt(n)){const a=o&&Xo(n);let l=!1;a&&(l=!bi(n),n=Pu(n)),s=new Array(n.length);for(let c=0,u=n.length;c<u;c++)s[c]=e(l?rn(n[c]):n[c],c,void 0,r)}else if(typeof n=="number"){s=new Array(n);for(let a=0;a<n;a++)s[a]=e(a+1,a,void 0,r)}else if(Lt(n))if(n[Symbol.iterator])s=Array.from(n,(a,l)=>e(a,l,void 0,r));else{const a=Object.keys(n);s=new Array(a.length);for(let l=0,c=a.length;l<c;l++){const u=a[l];s[l]=e(n[u],u,l,r)}}else s=[];return s}const Df=n=>n?k0(n)?Cp(n):Df(n.parent):null,ll=xn(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>Df(n.parent),$root:n=>Df(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>b0(n),$forceUpdate:n=>n.f||(n.f=()=>{Ep(n.update)}),$nextTick:n=>n.n||(n.n=c0.bind(n.proxy)),$watch:n=>mM.bind(n)}),hh=(n,e)=>n!==At&&!n.__isScriptSetup&&_t(n,e),jy={get({_:n},e){if(e==="__v_skip")return!0;const{ctx:t,setupState:i,data:s,props:r,accessCache:o,type:a,appContext:l}=n;let c;if(e[0]!=="$"){const d=o[e];if(d!==void 0)switch(d){case 1:return i[e];case 2:return s[e];case 4:return t[e];case 3:return r[e]}else{if(hh(i,e))return o[e]=1,i[e];if(s!==At&&_t(s,e))return o[e]=2,s[e];if((c=n.propsOptions[0])&&_t(c,e))return o[e]=3,r[e];if(t!==At&&_t(t,e))return o[e]=4,t[e];Lf&&(o[e]=0)}}const u=ll[e];let h,f;if(u)return e==="$attrs"&&fn(n.attrs,"get",""),u(n);if((h=a.__cssModules)&&(h=h[e]))return h;if(t!==At&&_t(t,e))return o[e]=4,t[e];if(f=l.config.globalProperties,_t(f,e))return f[e]},set({_:n},e,t){const{data:i,setupState:s,ctx:r}=n;return hh(s,e)?(s[e]=t,!0):i!==At&&_t(i,e)?(i[e]=t,!0):_t(n.props,e)||e[0]==="$"&&e.slice(1)in n?!1:(r[e]=t,!0)},has({_:{data:n,setupState:e,accessCache:t,ctx:i,appContext:s,propsOptions:r}},o){let a;return!!t[o]||n!==At&&_t(n,o)||hh(e,o)||(a=r[0])&&_t(a,o)||_t(i,o)||_t(ll,o)||_t(s.config.globalProperties,o)},defineProperty(n,e,t){return t.get!=null?n._.accessCache[e]=0:_t(t,"value")&&this.set(n,e,t.value,null),Reflect.defineProperty(n,e,t)}};function Hm(n){return et(n)?n.reduce((e,t)=>(e[t]=null,e),{}):n}let Lf=!0;function Ky(n){const e=b0(n),t=n.proxy,i=n.ctx;Lf=!1,e.beforeCreate&&Vm(e.beforeCreate,n,"bc");const{data:s,computed:r,methods:o,watch:a,provide:l,inject:c,created:u,beforeMount:h,mounted:f,beforeUpdate:d,updated:g,activated:_,deactivated:m,beforeDestroy:p,beforeUnmount:x,destroyed:b,unmounted:v,render:C,renderTracked:A,renderTriggered:T,errorCaptured:L,serverPrefetch:M,expose:y,inheritAttrs:D,components:F,directives:N,filters:K}=e;if(c&&Zy(c,i,null),o)for(const W in o){const B=o[W];st(B)&&(i[W]=B.bind(t))}if(s){const W=s.call(t,t);Lt(W)&&(n.data=Lu(W))}if(Lf=!0,r)for(const W in r){const B=r[W],pe=st(B)?B.bind(t,t):st(B.get)?B.get.bind(t,t):ts,be=!st(B)&&st(B.set)?B.set.bind(t):ts,ue=Di({get:pe,set:be});Object.defineProperty(i,W,{enumerable:!0,configurable:!0,get:()=>ue.value,set:ce=>ue.value=ce})}if(a)for(const W in a)x0(a[W],i,t,W);if(l){const W=st(l)?l.call(t):l;Reflect.ownKeys(W).forEach(B=>{Nc(B,W[B])})}u&&Vm(u,n,"c");function H(W,B){et(B)?B.forEach(pe=>W(pe.bind(t))):B&&W(B.bind(t))}if(H(zy,h),H(ci,f),H(Hy,d),H(Vy,g),H(Ny,_),H(By,m),H(qy,L),H(Xy,A),H(Wy,T),H(yi,x),H(v0,v),H(Gy,M),et(y))if(y.length){const W=n.exposed||(n.exposed={});y.forEach(B=>{Object.defineProperty(W,B,{get:()=>t[B],set:pe=>t[B]=pe})})}else n.exposed||(n.exposed={});C&&n.render===ts&&(n.render=C),D!=null&&(n.inheritAttrs=D),F&&(n.components=F),N&&(n.directives=N),M&&m0(n)}function Zy(n,e,t=ts){et(n)&&(n=If(n));for(const i in n){const s=n[i];let r;Lt(s)?"default"in s?r=Fi(s.from||i,s.default,!0):r=Fi(s.from||i):r=Fi(s),ln(r)?Object.defineProperty(e,i,{enumerable:!0,configurable:!0,get:()=>r.value,set:o=>r.value=o}):e[i]=r}}function Vm(n,e,t){rs(et(n)?n.map(i=>i.bind(e.proxy)):n.bind(e.proxy),e,t)}function x0(n,e,t,i){let s=i.includes(".")?U0(t,i):()=>t[i];if(Yt(n)){const r=e[n];st(r)&&cl(s,r)}else if(st(n))cl(s,n.bind(t));else if(Lt(n))if(et(n))n.forEach(r=>x0(r,e,t,i));else{const r=st(n.handler)?n.handler.bind(t):e[n.handler];st(r)&&cl(s,r,n)}}function b0(n){const e=n.type,{mixins:t,extends:i}=e,{mixins:s,optionsCache:r,config:{optionMergeStrategies:o}}=n.appContext,a=r.get(e);let l;return a?l=a:!s.length&&!t&&!i?l=e:(l={},s.length&&s.forEach(c=>nu(l,c,o,!0)),nu(l,e,o)),Lt(e)&&r.set(e,l),l}function nu(n,e,t,i=!1){const{mixins:s,extends:r}=e;r&&nu(n,r,t,!0),s&&s.forEach(o=>nu(n,o,t,!0));for(const o in e)if(!(i&&o==="expose")){const a=Qy[o]||t&&t[o];n[o]=a?a(n[o],e[o]):e[o]}return n}const Qy={data:Gm,props:Wm,emits:Wm,methods:Ka,computed:Ka,beforeCreate:dn,created:dn,beforeMount:dn,mounted:dn,beforeUpdate:dn,updated:dn,beforeDestroy:dn,beforeUnmount:dn,destroyed:dn,unmounted:dn,activated:dn,deactivated:dn,errorCaptured:dn,serverPrefetch:dn,components:Ka,directives:Ka,watch:eM,provide:Gm,inject:Jy};function Gm(n,e){return e?n?function(){return xn(st(n)?n.call(this,this):n,st(e)?e.call(this,this):e)}:e:n}function Jy(n,e){return Ka(If(n),If(e))}function If(n){if(et(n)){const e={};for(let t=0;t<n.length;t++)e[n[t]]=n[t];return e}return n}function dn(n,e){return n?[...new Set([].concat(n,e))]:e}function Ka(n,e){return n?xn(Object.create(null),n,e):e}function Wm(n,e){return n?et(n)&&et(e)?[...new Set([...n,...e])]:xn(Object.create(null),Hm(n),Hm(e??{})):e}function eM(n,e){if(!n)return e;if(!e)return n;const t=xn(Object.create(null),n);for(const i in e)t[i]=dn(n[i],e[i]);return t}function S0(){return{app:null,config:{isNativeTag:VS,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let tM=0;function nM(n,e){return function(i,s=null){st(i)||(i=xn({},i)),s!=null&&!Lt(s)&&(s=null);const r=S0(),o=new WeakSet,a=[];let l=!1;const c=r.app={_uid:tM++,_component:i,_props:s,_container:null,_context:r,_instance:null,version:OM,get config(){return r.config},set config(u){},use(u,...h){return o.has(u)||(u&&st(u.install)?(o.add(u),u.install(c,...h)):st(u)&&(o.add(u),u(c,...h))),c},mixin(u){return r.mixins.includes(u)||r.mixins.push(u),c},component(u,h){return h?(r.components[u]=h,c):r.components[u]},directive(u,h){return h?(r.directives[u]=h,c):r.directives[u]},mount(u,h,f){if(!l){const d=c._ceVNode||Ft(i,s);return d.appContext=r,f===!0?f="svg":f===!1&&(f=void 0),n(d,u,f),l=!0,c._container=u,u.__vue_app__=c,Cp(d.component)}},onUnmount(u){a.push(u)},unmount(){l&&(rs(a,c._instance,16),n(null,c._container),delete c._container.__vue_app__)},provide(u,h){return r.provides[u]=h,c},runWithContext(u){const h=$o;$o=c;try{return u()}finally{$o=h}}};return c}}let $o=null;function Nc(n,e){if(gn){let t=gn.provides;const i=gn.parent&&gn.parent.provides;i===t&&(t=gn.provides=Object.create(i)),t[n]=e}}function Fi(n,e,t=!1){const i=gn||Qi;if(i||$o){const s=$o?$o._context.provides:i?i.parent==null?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(s&&n in s)return s[n];if(arguments.length>1)return t&&st(e)?e.call(i&&i.proxy):e}}const y0={},M0=()=>Object.create(y0),E0=n=>Object.getPrototypeOf(n)===y0;function iM(n,e,t,i=!1){const s={},r=M0();n.propsDefaults=Object.create(null),w0(n,e,s,r);for(const o in n.propsOptions[0])o in s||(s[o]=void 0);t?n.props=i?s:s0(s):n.type.props?n.props=s:n.props=r,n.attrs=r}function sM(n,e,t,i){const{props:s,attrs:r,vnode:{patchFlag:o}}=n,a=vt(s),[l]=n.propsOptions;let c=!1;if((i||o>0)&&!(o&16)){if(o&8){const u=n.vnode.dynamicProps;for(let h=0;h<u.length;h++){let f=u[h];if(Ou(n.emitsOptions,f))continue;const d=e[f];if(l)if(_t(r,f))d!==r[f]&&(r[f]=d,c=!0);else{const g=_r(f);s[g]=Uf(l,a,g,d,n,!1)}else d!==r[f]&&(r[f]=d,c=!0)}}}else{w0(n,e,s,r)&&(c=!0);let u;for(const h in a)(!e||!_t(e,h)&&((u=fo(h))===h||!_t(e,u)))&&(l?t&&(t[h]!==void 0||t[u]!==void 0)&&(s[h]=Uf(l,a,h,void 0,n,!0)):delete s[h]);if(r!==a)for(const h in r)(!e||!_t(e,h))&&(delete r[h],c=!0)}c&&Ls(n.attrs,"set","")}function w0(n,e,t,i){const[s,r]=n.propsOptions;let o=!1,a;if(e)for(let l in e){if(sl(l))continue;const c=e[l];let u;s&&_t(s,u=_r(l))?!r||!r.includes(u)?t[u]=c:(a||(a={}))[u]=c:Ou(n.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,o=!0)}if(r){const l=vt(t),c=a||At;for(let u=0;u<r.length;u++){const h=r[u];t[h]=Uf(s,l,h,c[h],n,!_t(c,h))}}return o}function Uf(n,e,t,i,s,r){const o=n[t];if(o!=null){const a=_t(o,"default");if(a&&i===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&st(l)){const{propsDefaults:c}=s;if(t in c)i=c[t];else{const u=Vl(s);i=c[t]=l.call(null,e),u()}}else i=l;s.ce&&s.ce._setProp(t,i)}o[0]&&(r&&!a?i=!1:o[1]&&(i===""||i===fo(t))&&(i=!0))}return i}const rM=new WeakMap;function T0(n,e,t=!1){const i=t?rM:e.propsCache,s=i.get(n);if(s)return s;const r=n.props,o={},a=[];let l=!1;if(!st(n)){const u=h=>{l=!0;const[f,d]=T0(h,e,!0);xn(o,f),d&&a.push(...d)};!t&&e.mixins.length&&e.mixins.forEach(u),n.extends&&u(n.extends),n.mixins&&n.mixins.forEach(u)}if(!r&&!l)return Lt(n)&&i.set(n,Go),Go;if(et(r))for(let u=0;u<r.length;u++){const h=_r(r[u]);Xm(h)&&(o[h]=At)}else if(r)for(const u in r){const h=_r(u);if(Xm(h)){const f=r[u],d=o[h]=et(f)||st(f)?{type:f}:xn({},f),g=d.type;let _=!1,m=!0;if(et(g))for(let p=0;p<g.length;++p){const x=g[p],b=st(x)&&x.name;if(b==="Boolean"){_=!0;break}else b==="String"&&(m=!1)}else _=st(g)&&g.name==="Boolean";d[0]=_,d[1]=m,(_||_t(d,"default"))&&a.push(h)}}const c=[o,a];return Lt(n)&&i.set(n,c),c}function Xm(n){return n[0]!=="$"&&!sl(n)}const A0=n=>n[0]==="_"||n==="$stable",Tp=n=>et(n)?n.map(Yi):[Yi(n)],oM=(n,e,t)=>{if(e._n)return e;const i=Uy((...s)=>Tp(e(...s)),t);return i._c=!1,i},C0=(n,e,t)=>{const i=n._ctx;for(const s in n){if(A0(s))continue;const r=n[s];if(st(r))e[s]=oM(s,r,i);else if(r!=null){const o=Tp(r);e[s]=()=>o}}},R0=(n,e)=>{const t=Tp(e);n.slots.default=()=>t},P0=(n,e,t)=>{for(const i in e)(t||i!=="_")&&(n[i]=e[i])},aM=(n,e,t)=>{const i=n.slots=M0();if(n.vnode.shapeFlag&32){const s=e._;s?(P0(i,e,t),t&&kv(i,"_",s,!0)):C0(e,i)}else e&&R0(n,e)},lM=(n,e,t)=>{const{vnode:i,slots:s}=n;let r=!0,o=At;if(i.shapeFlag&32){const a=e._;a?t&&a===1?r=!1:P0(s,e,t):(r=!e.$stable,C0(e,s)),o=e}else e&&(R0(n,e),o={default:1});if(r)for(const a in s)!A0(a)&&o[a]==null&&delete s[a]},Yn=yM;function cM(n){return uM(n)}function uM(n,e){const t=zv();t.__VUE__=!0;const{insert:i,remove:s,patchProp:r,createElement:o,createText:a,createComment:l,setText:c,setElementText:u,parentNode:h,nextSibling:f,setScopeId:d=ts,insertStaticContent:g}=n,_=(P,I,E,se=null,J=null,Q=null,le=void 0,de=null,ee=!!I.dynamicChildren)=>{if(P===I)return;P&&!Ua(P,I)&&(se=U(P),ce(P,J,Q,!0),P=null),I.patchFlag===-2&&(ee=!1,I.dynamicChildren=null);const{type:w,ref:S,shapeFlag:O}=I;switch(w){case Fu:m(P,I,E,se);break;case Sl:p(P,I,E,se);break;case dh:P==null&&x(I,E,se,le);break;case Ri:F(P,I,E,se,J,Q,le,de,ee);break;default:O&1?C(P,I,E,se,J,Q,le,de,ee):O&6?N(P,I,E,se,J,Q,le,de,ee):(O&64||O&128)&&w.process(P,I,E,se,J,Q,le,de,ee,re)}S!=null&&J&&Pf(S,P&&P.ref,Q,I||P,!I)},m=(P,I,E,se)=>{if(P==null)i(I.el=a(I.children),E,se);else{const J=I.el=P.el;I.children!==P.children&&c(J,I.children)}},p=(P,I,E,se)=>{P==null?i(I.el=l(I.children||""),E,se):I.el=P.el},x=(P,I,E,se)=>{[P.el,P.anchor]=g(P.children,I,E,se,P.el,P.anchor)},b=({el:P,anchor:I},E,se)=>{let J;for(;P&&P!==I;)J=f(P),i(P,E,se),P=J;i(I,E,se)},v=({el:P,anchor:I})=>{let E;for(;P&&P!==I;)E=f(P),s(P),P=E;s(I)},C=(P,I,E,se,J,Q,le,de,ee)=>{I.type==="svg"?le="svg":I.type==="math"&&(le="mathml"),P==null?A(I,E,se,J,Q,le,de,ee):M(P,I,J,Q,le,de,ee)},A=(P,I,E,se,J,Q,le,de)=>{let ee,w;const{props:S,shapeFlag:O,transition:q,dirs:ne}=P;if(ee=P.el=o(P.type,Q,S&&S.is,S),O&8?u(ee,P.children):O&16&&L(P.children,ee,null,se,J,fh(P,Q),le,de),ne&&Dr(P,null,se,"created"),T(ee,P,P.scopeId,le,se),S){for(const Ee in S)Ee!=="value"&&!sl(Ee)&&r(ee,Ee,null,S[Ee],Q,se);"value"in S&&r(ee,"value",null,S.value,Q),(w=S.onVnodeBeforeMount)&&Vi(w,se,P)}ne&&Dr(P,null,se,"beforeMount");const te=hM(J,q);te&&q.beforeEnter(ee),i(ee,I,E),((w=S&&S.onVnodeMounted)||te||ne)&&Yn(()=>{w&&Vi(w,se,P),te&&q.enter(ee),ne&&Dr(P,null,se,"mounted")},J)},T=(P,I,E,se,J)=>{if(E&&d(P,E),se)for(let Q=0;Q<se.length;Q++)d(P,se[Q]);if(J){let Q=J.subTree;if(I===Q||F0(Q.type)&&(Q.ssContent===I||Q.ssFallback===I)){const le=J.vnode;T(P,le,le.scopeId,le.slotScopeIds,J.parent)}}},L=(P,I,E,se,J,Q,le,de,ee=0)=>{for(let w=ee;w<P.length;w++){const S=P[w]=de?ir(P[w]):Yi(P[w]);_(null,S,I,E,se,J,Q,le,de)}},M=(P,I,E,se,J,Q,le)=>{const de=I.el=P.el;let{patchFlag:ee,dynamicChildren:w,dirs:S}=I;ee|=P.patchFlag&16;const O=P.props||At,q=I.props||At;let ne;if(E&&Lr(E,!1),(ne=q.onVnodeBeforeUpdate)&&Vi(ne,E,I,P),S&&Dr(I,P,E,"beforeUpdate"),E&&Lr(E,!0),(O.innerHTML&&q.innerHTML==null||O.textContent&&q.textContent==null)&&u(de,""),w?y(P.dynamicChildren,w,de,E,se,fh(I,J),Q):le||B(P,I,de,null,E,se,fh(I,J),Q,!1),ee>0){if(ee&16)D(de,O,q,E,J);else if(ee&2&&O.class!==q.class&&r(de,"class",null,q.class,J),ee&4&&r(de,"style",O.style,q.style,J),ee&8){const te=I.dynamicProps;for(let Ee=0;Ee<te.length;Ee++){const ve=te[Ee],Te=O[ve],Xe=q[ve];(Xe!==Te||ve==="value")&&r(de,ve,Te,Xe,J,E)}}ee&1&&P.children!==I.children&&u(de,I.children)}else!le&&w==null&&D(de,O,q,E,J);((ne=q.onVnodeUpdated)||S)&&Yn(()=>{ne&&Vi(ne,E,I,P),S&&Dr(I,P,E,"updated")},se)},y=(P,I,E,se,J,Q,le)=>{for(let de=0;de<I.length;de++){const ee=P[de],w=I[de],S=ee.el&&(ee.type===Ri||!Ua(ee,w)||ee.shapeFlag&70)?h(ee.el):E;_(ee,w,S,null,se,J,Q,le,!0)}},D=(P,I,E,se,J)=>{if(I!==E){if(I!==At)for(const Q in I)!sl(Q)&&!(Q in E)&&r(P,Q,I[Q],null,J,se);for(const Q in E){if(sl(Q))continue;const le=E[Q],de=I[Q];le!==de&&Q!=="value"&&r(P,Q,de,le,J,se)}"value"in E&&r(P,"value",I.value,E.value,J)}},F=(P,I,E,se,J,Q,le,de,ee)=>{const w=I.el=P?P.el:a(""),S=I.anchor=P?P.anchor:a("");let{patchFlag:O,dynamicChildren:q,slotScopeIds:ne}=I;ne&&(de=de?de.concat(ne):ne),P==null?(i(w,E,se),i(S,E,se),L(I.children||[],E,S,J,Q,le,de,ee)):O>0&&O&64&&q&&P.dynamicChildren?(y(P.dynamicChildren,q,E,J,Q,le,de),(I.key!=null||J&&I===J.subTree)&&D0(P,I,!0)):B(P,I,E,S,J,Q,le,de,ee)},N=(P,I,E,se,J,Q,le,de,ee)=>{I.slotScopeIds=de,P==null?I.shapeFlag&512?J.ctx.activate(I,E,se,le,ee):K(I,E,se,J,Q,le,ee):j(P,I,ee)},K=(P,I,E,se,J,Q,le)=>{const de=P.component=RM(P,se,J);if(g0(P)&&(de.ctx.renderer=re),PM(de,!1,le),de.asyncDep){if(J&&J.registerDep(de,H,le),!P.el){const ee=de.subTree=Ft(Sl);p(null,ee,I,E)}}else H(de,P,I,E,J,Q,le)},j=(P,I,E)=>{const se=I.component=P.component;if(bM(P,I,E))if(se.asyncDep&&!se.asyncResolved){W(se,I,E);return}else se.next=I,se.update();else I.el=P.el,se.vnode=I},H=(P,I,E,se,J,Q,le)=>{const de=()=>{if(P.isMounted){let{next:O,bu:q,u:ne,parent:te,vnode:Ee}=P;{const Ce=L0(P);if(Ce){O&&(O.el=Ee.el,W(P,O,le)),Ce.asyncDep.then(()=>{P.isUnmounted||de()});return}}let ve=O,Te;Lr(P,!1),O?(O.el=Ee.el,W(P,O,le)):O=Ee,q&&oh(q),(Te=O.props&&O.props.onVnodeBeforeUpdate)&&Vi(Te,te,O,Ee),Lr(P,!0);const Xe=$m(P),xe=P.subTree;P.subTree=Xe,_(xe,Xe,h(xe.el),U(xe),P,J,Q),O.el=Xe.el,ve===null&&SM(P,Xe.el),ne&&Yn(ne,J),(Te=O.props&&O.props.onVnodeUpdated)&&Yn(()=>Vi(Te,te,O,Ee),J)}else{let O;const{el:q,props:ne}=I,{bm:te,m:Ee,parent:ve,root:Te,type:Xe}=P,xe=al(I);Lr(P,!1),te&&oh(te),!xe&&(O=ne&&ne.onVnodeBeforeMount)&&Vi(O,ve,I),Lr(P,!0);{Te.ce&&Te.ce._injectChildStyle(Xe);const Ce=P.subTree=$m(P);_(null,Ce,E,se,P,J,Q),I.el=Ce.el}if(Ee&&Yn(Ee,J),!xe&&(O=ne&&ne.onVnodeMounted)){const Ce=I;Yn(()=>Vi(O,ve,Ce),J)}(I.shapeFlag&256||ve&&al(ve.vnode)&&ve.vnode.shapeFlag&256)&&P.a&&Yn(P.a,J),P.isMounted=!0,I=E=se=null}};P.scope.on();const ee=P.effect=new Wv(de);P.scope.off();const w=P.update=ee.run.bind(ee),S=P.job=ee.runIfDirty.bind(ee);S.i=P,S.id=P.uid,ee.scheduler=()=>Ep(S),Lr(P,!0),w()},W=(P,I,E)=>{I.component=P;const se=P.vnode.props;P.vnode=I,P.next=null,sM(P,I.props,se,E),lM(P,I.children,E),Er(),zm(P),wr()},B=(P,I,E,se,J,Q,le,de,ee=!1)=>{const w=P&&P.children,S=P?P.shapeFlag:0,O=I.children,{patchFlag:q,shapeFlag:ne}=I;if(q>0){if(q&128){be(w,O,E,se,J,Q,le,de,ee);return}else if(q&256){pe(w,O,E,se,J,Q,le,de,ee);return}}ne&8?(S&16&&ie(w,J,Q),O!==w&&u(E,O)):S&16?ne&16?be(w,O,E,se,J,Q,le,de,ee):ie(w,J,Q,!0):(S&8&&u(E,""),ne&16&&L(O,E,se,J,Q,le,de,ee))},pe=(P,I,E,se,J,Q,le,de,ee)=>{P=P||Go,I=I||Go;const w=P.length,S=I.length,O=Math.min(w,S);let q;for(q=0;q<O;q++){const ne=I[q]=ee?ir(I[q]):Yi(I[q]);_(P[q],ne,E,null,J,Q,le,de,ee)}w>S?ie(P,J,Q,!0,!1,O):L(I,E,se,J,Q,le,de,ee,O)},be=(P,I,E,se,J,Q,le,de,ee)=>{let w=0;const S=I.length;let O=P.length-1,q=S-1;for(;w<=O&&w<=q;){const ne=P[w],te=I[w]=ee?ir(I[w]):Yi(I[w]);if(Ua(ne,te))_(ne,te,E,null,J,Q,le,de,ee);else break;w++}for(;w<=O&&w<=q;){const ne=P[O],te=I[q]=ee?ir(I[q]):Yi(I[q]);if(Ua(ne,te))_(ne,te,E,null,J,Q,le,de,ee);else break;O--,q--}if(w>O){if(w<=q){const ne=q+1,te=ne<S?I[ne].el:se;for(;w<=q;)_(null,I[w]=ee?ir(I[w]):Yi(I[w]),E,te,J,Q,le,de,ee),w++}}else if(w>q)for(;w<=O;)ce(P[w],J,Q,!0),w++;else{const ne=w,te=w,Ee=new Map;for(w=te;w<=q;w++){const Ae=I[w]=ee?ir(I[w]):Yi(I[w]);Ae.key!=null&&Ee.set(Ae.key,w)}let ve,Te=0;const Xe=q-te+1;let xe=!1,Ce=0;const ke=new Array(Xe);for(w=0;w<Xe;w++)ke[w]=0;for(w=ne;w<=O;w++){const Ae=P[w];if(Te>=Xe){ce(Ae,J,Q,!0);continue}let Ye;if(Ae.key!=null)Ye=Ee.get(Ae.key);else for(ve=te;ve<=q;ve++)if(ke[ve-te]===0&&Ua(Ae,I[ve])){Ye=ve;break}Ye===void 0?ce(Ae,J,Q,!0):(ke[Ye-te]=w+1,Ye>=Ce?Ce=Ye:xe=!0,_(Ae,I[Ye],E,null,J,Q,le,de,ee),Te++)}const $e=xe?fM(ke):Go;for(ve=$e.length-1,w=Xe-1;w>=0;w--){const Ae=te+w,Ye=I[Ae],We=Ae+1<S?I[Ae+1].el:se;ke[w]===0?_(null,Ye,E,We,J,Q,le,de,ee):xe&&(ve<0||w!==$e[ve]?ue(Ye,E,We,2):ve--)}}},ue=(P,I,E,se,J=null)=>{const{el:Q,type:le,transition:de,children:ee,shapeFlag:w}=P;if(w&6){ue(P.component.subTree,I,E,se);return}if(w&128){P.suspense.move(I,E,se);return}if(w&64){le.move(P,I,E,re);return}if(le===Ri){i(Q,I,E);for(let O=0;O<ee.length;O++)ue(ee[O],I,E,se);i(P.anchor,I,E);return}if(le===dh){b(P,I,E);return}if(se!==2&&w&1&&de)if(se===0)de.beforeEnter(Q),i(Q,I,E),Yn(()=>de.enter(Q),J);else{const{leave:O,delayLeave:q,afterLeave:ne}=de,te=()=>i(Q,I,E),Ee=()=>{O(Q,()=>{te(),ne&&ne()})};q?q(Q,te,Ee):Ee()}else i(Q,I,E)},ce=(P,I,E,se=!1,J=!1)=>{const{type:Q,props:le,ref:de,children:ee,dynamicChildren:w,shapeFlag:S,patchFlag:O,dirs:q,cacheIndex:ne}=P;if(O===-2&&(J=!1),de!=null&&Pf(de,null,E,P,!0),ne!=null&&(I.renderCache[ne]=void 0),S&256){I.ctx.deactivate(P);return}const te=S&1&&q,Ee=!al(P);let ve;if(Ee&&(ve=le&&le.onVnodeBeforeUnmount)&&Vi(ve,I,P),S&6)G(P.component,E,se);else{if(S&128){P.suspense.unmount(E,se);return}te&&Dr(P,null,I,"beforeUnmount"),S&64?P.type.remove(P,I,E,re,se):w&&!w.hasOnce&&(Q!==Ri||O>0&&O&64)?ie(w,I,E,!1,!0):(Q===Ri&&O&384||!J&&S&16)&&ie(ee,I,E),se&&he(P)}(Ee&&(ve=le&&le.onVnodeUnmounted)||te)&&Yn(()=>{ve&&Vi(ve,I,P),te&&Dr(P,null,I,"unmounted")},E)},he=P=>{const{type:I,el:E,anchor:se,transition:J}=P;if(I===Ri){k(E,se);return}if(I===dh){v(P);return}const Q=()=>{s(E),J&&!J.persisted&&J.afterLeave&&J.afterLeave()};if(P.shapeFlag&1&&J&&!J.persisted){const{leave:le,delayLeave:de}=J,ee=()=>le(E,Q);de?de(P.el,Q,ee):ee()}else Q()},k=(P,I)=>{let E;for(;P!==I;)E=f(P),s(P),P=E;s(I)},G=(P,I,E)=>{const{bum:se,scope:J,job:Q,subTree:le,um:de,m:ee,a:w}=P;qm(ee),qm(w),se&&oh(se),J.stop(),Q&&(Q.flags|=8,ce(le,P,I,E)),de&&Yn(de,I),Yn(()=>{P.isUnmounted=!0},I),I&&I.pendingBranch&&!I.isUnmounted&&P.asyncDep&&!P.asyncResolved&&P.suspenseId===I.pendingId&&(I.deps--,I.deps===0&&I.resolve())},ie=(P,I,E,se=!1,J=!1,Q=0)=>{for(let le=Q;le<P.length;le++)ce(P[le],I,E,se,J)},U=P=>{if(P.shapeFlag&6)return U(P.component.subTree);if(P.shapeFlag&128)return P.suspense.next();const I=f(P.anchor||P.el),E=I&&I[Oy];return E?f(E):I};let Y=!1;const Z=(P,I,E)=>{P==null?I._vnode&&ce(I._vnode,null,null,!0):_(I._vnode||null,P,I,null,null,null,E),I._vnode=P,Y||(Y=!0,zm(),h0(),Y=!1)},re={p:_,um:ce,m:ue,r:he,mt:K,mc:L,pc:B,pbc:y,n:U,o:n};return{render:Z,hydrate:void 0,createApp:nM(Z)}}function fh({type:n,props:e},t){return t==="svg"&&n==="foreignObject"||t==="mathml"&&n==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:t}function Lr({effect:n,job:e},t){t?(n.flags|=32,e.flags|=4):(n.flags&=-33,e.flags&=-5)}function hM(n,e){return(!n||n&&!n.pendingBranch)&&e&&!e.persisted}function D0(n,e,t=!1){const i=n.children,s=e.children;if(et(i)&&et(s))for(let r=0;r<i.length;r++){const o=i[r];let a=s[r];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=s[r]=ir(s[r]),a.el=o.el),!t&&a.patchFlag!==-2&&D0(o,a)),a.type===Fu&&(a.el=o.el)}}function fM(n){const e=n.slice(),t=[0];let i,s,r,o,a;const l=n.length;for(i=0;i<l;i++){const c=n[i];if(c!==0){if(s=t[t.length-1],n[s]<c){e[i]=s,t.push(i);continue}for(r=0,o=t.length-1;r<o;)a=r+o>>1,n[t[a]]<c?r=a+1:o=a;c<n[t[r]]&&(r>0&&(e[i]=t[r-1]),t[r]=i)}}for(r=t.length,o=t[r-1];r-- >0;)t[r]=o,o=e[o];return t}function L0(n){const e=n.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:L0(e)}function qm(n){if(n)for(let e=0;e<n.length;e++)n[e].flags|=8}const dM=Symbol.for("v-scx"),pM=()=>Fi(dM);function cl(n,e,t){return I0(n,e,t)}function I0(n,e,t=At){const{immediate:i,deep:s,flush:r,once:o}=t,a=xn({},t);let l;if(Nu)if(r==="sync"){const f=pM();l=f.__watcherHandles||(f.__watcherHandles=[])}else if(!e||i)a.once=!0;else{const f=()=>{};return f.stop=ts,f.resume=ts,f.pause=ts,f}const c=gn;a.call=(f,d,g)=>rs(f,c,d,g);let u=!1;r==="post"?a.scheduler=f=>{Yn(f,c&&c.suspense)}:r!=="sync"&&(u=!0,a.scheduler=(f,d)=>{d?f():Ep(f)}),a.augmentJob=f=>{e&&(f.flags|=4),u&&(f.flags|=2,c&&(f.id=c.uid,f.i=c))};const h=Py(n,e,a);return l&&l.push(h),h}function mM(n,e,t){const i=this.proxy,s=Yt(n)?n.includes(".")?U0(i,n):()=>i[n]:n.bind(i,i);let r;st(e)?r=e:(r=e.handler,t=e);const o=Vl(this),a=I0(s,r.bind(i),t);return o(),a}function U0(n,e){const t=e.split(".");return()=>{let i=n;for(let s=0;s<t.length&&i;s++)i=i[t[s]];return i}}const gM=(n,e)=>e==="modelValue"||e==="model-value"?n.modelModifiers:n[`${e}Modifiers`]||n[`${_r(e)}Modifiers`]||n[`${fo(e)}Modifiers`];function _M(n,e,...t){if(n.isUnmounted)return;const i=n.vnode.props||At;let s=t;const r=e.startsWith("update:"),o=r&&gM(i,e.slice(7));o&&(o.trim&&(s=t.map(u=>Yt(u)?u.trim():u)),o.number&&(s=t.map($S)));let a,l=i[a=rh(e)]||i[a=rh(_r(e))];!l&&r&&(l=i[a=rh(fo(e))]),l&&rs(l,n,6,s);const c=i[a+"Once"];if(c){if(!n.emitted)n.emitted={};else if(n.emitted[a])return;n.emitted[a]=!0,rs(c,n,6,s)}}function O0(n,e,t=!1){const i=e.emitsCache,s=i.get(n);if(s!==void 0)return s;const r=n.emits;let o={},a=!1;if(!st(n)){const l=c=>{const u=O0(c,e,!0);u&&(a=!0,xn(o,u))};!t&&e.mixins.length&&e.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!r&&!a?(Lt(n)&&i.set(n,null),null):(et(r)?r.forEach(l=>o[l]=null):xn(o,r),Lt(n)&&i.set(n,o),o)}function Ou(n,e){return!n||!Au(e)?!1:(e=e.slice(2).replace(/Once$/,""),_t(n,e[0].toLowerCase()+e.slice(1))||_t(n,fo(e))||_t(n,e))}function $m(n){const{type:e,vnode:t,proxy:i,withProxy:s,propsOptions:[r],slots:o,attrs:a,emit:l,render:c,renderCache:u,props:h,data:f,setupState:d,ctx:g,inheritAttrs:_}=n,m=tu(n);let p,x;try{if(t.shapeFlag&4){const v=s||i,C=v;p=Yi(c.call(C,v,u,h,d,f,g)),x=a}else{const v=e;p=Yi(v.length>1?v(h,{attrs:a,slots:o,emit:l}):v(h,null)),x=e.props?a:vM(a)}}catch(v){ul.length=0,Iu(v,n,1),p=Ft(Sl)}let b=p;if(x&&_!==!1){const v=Object.keys(x),{shapeFlag:C}=b;v.length&&C&7&&(r&&v.some(hp)&&(x=xM(x,r)),b=ra(b,x,!1,!0))}return t.dirs&&(b=ra(b,null,!1,!0),b.dirs=b.dirs?b.dirs.concat(t.dirs):t.dirs),t.transition&&wp(b,t.transition),p=b,tu(m),p}const vM=n=>{let e;for(const t in n)(t==="class"||t==="style"||Au(t))&&((e||(e={}))[t]=n[t]);return e},xM=(n,e)=>{const t={};for(const i in n)(!hp(i)||!(i.slice(9)in e))&&(t[i]=n[i]);return t};function bM(n,e,t){const{props:i,children:s,component:r}=n,{props:o,children:a,patchFlag:l}=e,c=r.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&l>=0){if(l&1024)return!0;if(l&16)return i?Ym(i,o,c):!!o;if(l&8){const u=e.dynamicProps;for(let h=0;h<u.length;h++){const f=u[h];if(o[f]!==i[f]&&!Ou(c,f))return!0}}}else return(s||a)&&(!a||!a.$stable)?!0:i===o?!1:i?o?Ym(i,o,c):!0:!!o;return!1}function Ym(n,e,t){const i=Object.keys(e);if(i.length!==Object.keys(n).length)return!0;for(let s=0;s<i.length;s++){const r=i[s];if(e[r]!==n[r]&&!Ou(t,r))return!0}return!1}function SM({vnode:n,parent:e},t){for(;e;){const i=e.subTree;if(i.suspense&&i.suspense.activeBranch===n&&(i.el=n.el),i===n)(n=e.vnode).el=t,e=e.parent;else break}}const F0=n=>n.__isSuspense;function yM(n,e){e&&e.pendingBranch?et(n)?e.effects.push(...n):e.effects.push(n):Iy(n)}const Ri=Symbol.for("v-fgt"),Fu=Symbol.for("v-txt"),Sl=Symbol.for("v-cmt"),dh=Symbol.for("v-stc"),ul=[];let ti=null;function tn(n=!1){ul.push(ti=n?null:[])}function MM(){ul.pop(),ti=ul[ul.length-1]||null}let yl=1;function jm(n){yl+=n,n<0&&ti&&(ti.hasOnce=!0)}function N0(n){return n.dynamicChildren=yl>0?ti||Go:null,MM(),yl>0&&ti&&ti.push(n),n}function Vn(n,e,t,i,s,r){return N0(Ke(n,e,t,i,s,r,!0))}function Of(n,e,t,i,s){return N0(Ft(n,e,t,i,s,!0))}function iu(n){return n?n.__v_isVNode===!0:!1}function Ua(n,e){return n.type===e.type&&n.key===e.key}const B0=({key:n})=>n??null,Bc=({ref:n,ref_key:e,ref_for:t})=>(typeof n=="number"&&(n=""+n),n!=null?Yt(n)||ln(n)||st(n)?{i:Qi,r:n,k:e,f:!!t}:n:null);function Ke(n,e=null,t=null,i=0,s=null,r=n===Ri?0:1,o=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:e,key:e&&B0(e),ref:e&&Bc(e),scopeId:d0,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:i,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:Qi};return a?(Ap(l,t),r&128&&n.normalize(l)):t&&(l.shapeFlag|=Yt(t)?8:16),yl>0&&!o&&ti&&(l.patchFlag>0||r&6)&&l.patchFlag!==32&&ti.push(l),l}const Ft=EM;function EM(n,e=null,t=null,i=0,s=null,r=!1){if((!n||n===$y)&&(n=Sl),iu(n)){const a=ra(n,e,!0);return t&&Ap(a,t),yl>0&&!r&&ti&&(a.shapeFlag&6?ti[ti.indexOf(n)]=a:ti.push(a)),a.patchFlag=-2,a}if(UM(n)&&(n=n.__vccOpts),e){e=wM(e);let{class:a,style:l}=e;a&&!Yt(a)&&(e.class=ss(a)),Lt(l)&&(yp(l)&&!et(l)&&(l=xn({},l)),e.style=pp(l))}const o=Yt(n)?1:F0(n)?128:Fy(n)?64:Lt(n)?4:st(n)?2:0;return Ke(n,e,t,i,s,o,r,!0)}function wM(n){return n?yp(n)||E0(n)?xn({},n):n:null}function ra(n,e,t=!1,i=!1){const{props:s,ref:r,patchFlag:o,children:a,transition:l}=n,c=e?TM(s||{},e):s,u={__v_isVNode:!0,__v_skip:!0,type:n.type,props:c,key:c&&B0(c),ref:e&&e.ref?t&&r?et(r)?r.concat(Bc(e)):[r,Bc(e)]:Bc(e):r,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:a,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:e&&n.type!==Ri?o===-1?16:o|16:o,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:l,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&ra(n.ssContent),ssFallback:n.ssFallback&&ra(n.ssFallback),el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce};return l&&i&&wp(u,l.clone(u)),u}function Yo(n=" ",e=0){return Ft(Fu,null,n,e)}function Yi(n){return n==null||typeof n=="boolean"?Ft(Sl):et(n)?Ft(Ri,null,n.slice()):iu(n)?ir(n):Ft(Fu,null,String(n))}function ir(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:ra(n)}function Ap(n,e){let t=0;const{shapeFlag:i}=n;if(e==null)e=null;else if(et(e))t=16;else if(typeof e=="object")if(i&65){const s=e.default;s&&(s._c&&(s._d=!1),Ap(n,s()),s._c&&(s._d=!0));return}else{t=32;const s=e._;!s&&!E0(e)?e._ctx=Qi:s===3&&Qi&&(Qi.slots._===1?e._=1:(e._=2,n.patchFlag|=1024))}else st(e)?(e={default:e,_ctx:Qi},t=32):(e=String(e),i&64?(t=16,e=[Yo(e)]):t=8);n.children=e,n.shapeFlag|=t}function TM(...n){const e={};for(let t=0;t<n.length;t++){const i=n[t];for(const s in i)if(s==="class")e.class!==i.class&&(e.class=ss([e.class,i.class]));else if(s==="style")e.style=pp([e.style,i.style]);else if(Au(s)){const r=e[s],o=i[s];o&&r!==o&&!(et(r)&&r.includes(o))&&(e[s]=r?[].concat(r,o):o)}else s!==""&&(e[s]=i[s])}return e}function Vi(n,e,t,i=null){rs(n,e,7,[t,i])}const AM=S0();let CM=0;function RM(n,e,t){const i=n.type,s=(e?e.appContext:n.appContext)||AM,r={uid:CM++,vnode:n,type:i,parent:e,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new ey(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(s.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:T0(i,s),emitsOptions:O0(i,s),emit:null,emitted:null,propsDefaults:At,inheritAttrs:i.inheritAttrs,ctx:At,data:At,props:At,attrs:At,slots:At,refs:At,setupState:At,setupContext:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=e?e.root:r,r.emit=_M.bind(null,r),n.ce&&n.ce(r),r}let gn=null,su,Ff;{const n=zv(),e=(t,i)=>{let s;return(s=n[t])||(s=n[t]=[]),s.push(i),r=>{s.length>1?s.forEach(o=>o(r)):s[0](r)}};su=e("__VUE_INSTANCE_SETTERS__",t=>gn=t),Ff=e("__VUE_SSR_SETTERS__",t=>Nu=t)}const Vl=n=>{const e=gn;return su(n),n.scope.on(),()=>{n.scope.off(),su(e)}},Km=()=>{gn&&gn.scope.off(),su(null)};function k0(n){return n.vnode.shapeFlag&4}let Nu=!1;function PM(n,e=!1,t=!1){e&&Ff(e);const{props:i,children:s}=n.vnode,r=k0(n);iM(n,i,r,e),aM(n,s,t);const o=r?DM(n,e):void 0;return e&&Ff(!1),o}function DM(n,e){const t=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,jy);const{setup:i}=t;if(i){const s=n.setupContext=i.length>1?IM(n):null,r=Vl(n);Er();const o=Hl(i,n,0,[n.props,s]);if(wr(),r(),Ov(o)){if(al(n)||m0(n),o.then(Km,Km),e)return o.then(a=>{Zm(n,a)}).catch(a=>{Iu(a,n,0)});n.asyncDep=o}else Zm(n,o)}else z0(n)}function Zm(n,e,t){st(e)?n.type.__ssrInlineRender?n.ssrRender=e:n.render=e:Lt(e)&&(n.setupState=a0(e)),z0(n)}function z0(n,e,t){const i=n.type;n.render||(n.render=i.render||ts);{const s=Vl(n);Er();try{Ky(n)}finally{wr(),s()}}}const LM={get(n,e){return fn(n,"get",""),n[e]}};function IM(n){const e=t=>{n.exposed=t||{}};return{attrs:new Proxy(n.attrs,LM),slots:n.slots,emit:n.emit,expose:e}}function Cp(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(a0(My(n.exposed)),{get(e,t){if(t in e)return e[t];if(t in ll)return ll[t](n)},has(e,t){return t in e||t in ll}})):n.proxy}function UM(n){return st(n)&&"__vccOpts"in n}const Di=(n,e)=>Cy(n,e,Nu);function H0(n,e,t){const i=arguments.length;return i===2?Lt(e)&&!et(e)?iu(e)?Ft(n,null,[e]):Ft(n,e):Ft(n,null,e):(i>3?t=Array.prototype.slice.call(arguments,2):i===3&&iu(t)&&(t=[t]),Ft(n,e,t))}const OM="3.5.11";/**
* @vue/runtime-dom v3.5.11
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Nf;const Qm=typeof window<"u"&&window.trustedTypes;if(Qm)try{Nf=Qm.createPolicy("vue",{createHTML:n=>n})}catch{}const V0=Nf?n=>Nf.createHTML(n):n=>n,FM="http://www.w3.org/2000/svg",NM="http://www.w3.org/1998/Math/MathML",xs=typeof document<"u"?document:null,Jm=xs&&xs.createElement("template"),BM={insert:(n,e,t)=>{e.insertBefore(n,t||null)},remove:n=>{const e=n.parentNode;e&&e.removeChild(n)},createElement:(n,e,t,i)=>{const s=e==="svg"?xs.createElementNS(FM,n):e==="mathml"?xs.createElementNS(NM,n):t?xs.createElement(n,{is:t}):xs.createElement(n);return n==="select"&&i&&i.multiple!=null&&s.setAttribute("multiple",i.multiple),s},createText:n=>xs.createTextNode(n),createComment:n=>xs.createComment(n),setText:(n,e)=>{n.nodeValue=e},setElementText:(n,e)=>{n.textContent=e},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>xs.querySelector(n),setScopeId(n,e){n.setAttribute(e,"")},insertStaticContent(n,e,t,i,s,r){const o=t?t.previousSibling:e.lastChild;if(s&&(s===r||s.nextSibling))for(;e.insertBefore(s.cloneNode(!0),t),!(s===r||!(s=s.nextSibling)););else{Jm.innerHTML=V0(i==="svg"?`<svg>${n}</svg>`:i==="mathml"?`<math>${n}</math>`:n);const a=Jm.content;if(i==="svg"||i==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}e.insertBefore(a,t)}return[o?o.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}},kM=Symbol("_vtc");function zM(n,e,t){const i=n[kM];i&&(e=(e?[e,...i]:[...i]).join(" ")),e==null?n.removeAttribute("class"):t?n.setAttribute("class",e):n.className=e}const eg=Symbol("_vod"),HM=Symbol("_vsh"),VM=Symbol(""),GM=/(^|;)\s*display\s*:/;function WM(n,e,t){const i=n.style,s=Yt(t);let r=!1;if(t&&!s){if(e)if(Yt(e))for(const o of e.split(";")){const a=o.slice(0,o.indexOf(":")).trim();t[a]==null&&kc(i,a,"")}else for(const o in e)t[o]==null&&kc(i,o,"");for(const o in t)o==="display"&&(r=!0),kc(i,o,t[o])}else if(s){if(e!==t){const o=i[VM];o&&(t+=";"+o),i.cssText=t,r=GM.test(t)}}else e&&n.removeAttribute("style");eg in n&&(n[eg]=r?i.display:"",n[HM]&&(i.display="none"))}const tg=/\s*!important$/;function kc(n,e,t){if(et(t))t.forEach(i=>kc(n,e,i));else if(t==null&&(t=""),e.startsWith("--"))n.setProperty(e,t);else{const i=XM(n,e);tg.test(t)?n.setProperty(fo(i),t.replace(tg,""),"important"):n[i]=t}}const ng=["Webkit","Moz","ms"],ph={};function XM(n,e){const t=ph[e];if(t)return t;let i=_r(e);if(i!=="filter"&&i in n)return ph[e]=i;i=Bv(i);for(let s=0;s<ng.length;s++){const r=ng[s]+i;if(r in n)return ph[e]=r}return e}const ig="http://www.w3.org/1999/xlink";function sg(n,e,t,i,s,r=JS(e)){i&&e.startsWith("xlink:")?t==null?n.removeAttributeNS(ig,e.slice(6,e.length)):n.setAttributeNS(ig,e,t):t==null||r&&!Hv(t)?n.removeAttribute(e):n.setAttribute(e,r?"":Mr(t)?String(t):t)}function rg(n,e,t,i){if(e==="innerHTML"||e==="textContent"){t!=null&&(n[e]=e==="innerHTML"?V0(t):t);return}const s=n.tagName;if(e==="value"&&s!=="PROGRESS"&&!s.includes("-")){const o=s==="OPTION"?n.getAttribute("value")||"":n.value,a=t==null?n.type==="checkbox"?"on":"":String(t);(o!==a||!("_value"in n))&&(n.value=a),t==null&&n.removeAttribute(e),n._value=t;return}let r=!1;if(t===""||t==null){const o=typeof n[e];o==="boolean"?t=Hv(t):t==null&&o==="string"?(t="",r=!0):o==="number"&&(t=0,r=!0)}try{n[e]=t}catch{}r&&n.removeAttribute(e)}function qM(n,e,t,i){n.addEventListener(e,t,i)}function $M(n,e,t,i){n.removeEventListener(e,t,i)}const og=Symbol("_vei");function YM(n,e,t,i,s=null){const r=n[og]||(n[og]={}),o=r[e];if(i&&o)o.value=i;else{const[a,l]=jM(e);if(i){const c=r[e]=QM(i,s);qM(n,a,c,l)}else o&&($M(n,a,o,l),r[e]=void 0)}}const ag=/(?:Once|Passive|Capture)$/;function jM(n){let e;if(ag.test(n)){e={};let i;for(;i=n.match(ag);)n=n.slice(0,n.length-i[0].length),e[i[0].toLowerCase()]=!0}return[n[2]===":"?n.slice(3):fo(n.slice(2)),e]}let mh=0;const KM=Promise.resolve(),ZM=()=>mh||(KM.then(()=>mh=0),mh=Date.now());function QM(n,e){const t=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=t.attached)return;rs(JM(i,t.value),e,5,[i])};return t.value=n,t.attached=ZM(),t}function JM(n,e){if(et(e)){const t=n.stopImmediatePropagation;return n.stopImmediatePropagation=()=>{t.call(n),n._stopped=!0},e.map(i=>s=>!s._stopped&&i&&i(s))}else return e}const lg=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,eE=(n,e,t,i,s,r)=>{const o=s==="svg";e==="class"?zM(n,i,o):e==="style"?WM(n,t,i):Au(e)?hp(e)||YM(n,e,t,i,r):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):tE(n,e,i,o))?(rg(n,e,i),!n.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&sg(n,e,i,o,r,e!=="value")):n._isVueCE&&(/[A-Z]/.test(e)||!Yt(i))?rg(n,_r(e),i):(e==="true-value"?n._trueValue=i:e==="false-value"&&(n._falseValue=i),sg(n,e,i,o))};function tE(n,e,t,i){if(i)return!!(e==="innerHTML"||e==="textContent"||e in n&&lg(e)&&st(t));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="form"||e==="list"&&n.tagName==="INPUT"||e==="type"&&n.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const s=n.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return lg(e)&&Yt(t)?!1:e in n}const nE=xn({patchProp:eE},BM);let cg;function iE(){return cg||(cg=cM(nE))}const sE=(...n)=>{const e=iE().createApp(...n),{mount:t}=e;return e.mount=i=>{const s=oE(i);if(!s)return;const r=e._component;!st(r)&&!r.render&&!r.template&&(r.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const o=t(s,!1,rE(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},e};function rE(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function oE(n){return Yt(n)?document.querySelector(n):n}/*!
  * vue-router v4.4.5
  * (c) 2024 Eduardo San Martin Morote
  * @license MIT
  */const Oo=typeof document<"u";function G0(n){return typeof n=="object"||"displayName"in n||"props"in n||"__vccOpts"in n}function aE(n){return n.__esModule||n[Symbol.toStringTag]==="Module"||n.default&&G0(n.default)}const xt=Object.assign;function gh(n,e){const t={};for(const i in e){const s=e[i];t[i]=Ni(s)?s.map(n):n(s)}return t}const hl=()=>{},Ni=Array.isArray,W0=/#/g,lE=/&/g,cE=/\//g,uE=/=/g,hE=/\?/g,X0=/\+/g,fE=/%5B/g,dE=/%5D/g,q0=/%5E/g,pE=/%60/g,$0=/%7B/g,mE=/%7C/g,Y0=/%7D/g,gE=/%20/g;function Rp(n){return encodeURI(""+n).replace(mE,"|").replace(fE,"[").replace(dE,"]")}function _E(n){return Rp(n).replace($0,"{").replace(Y0,"}").replace(q0,"^")}function Bf(n){return Rp(n).replace(X0,"%2B").replace(gE,"+").replace(W0,"%23").replace(lE,"%26").replace(pE,"`").replace($0,"{").replace(Y0,"}").replace(q0,"^")}function vE(n){return Bf(n).replace(uE,"%3D")}function xE(n){return Rp(n).replace(W0,"%23").replace(hE,"%3F")}function bE(n){return n==null?"":xE(n).replace(cE,"%2F")}function Ml(n){try{return decodeURIComponent(""+n)}catch{}return""+n}const SE=/\/$/,yE=n=>n.replace(SE,"");function _h(n,e,t="/"){let i,s={},r="",o="";const a=e.indexOf("#");let l=e.indexOf("?");return a<l&&a>=0&&(l=-1),l>-1&&(i=e.slice(0,l),r=e.slice(l+1,a>-1?a:e.length),s=n(r)),a>-1&&(i=i||e.slice(0,a),o=e.slice(a,e.length)),i=TE(i??e,t),{fullPath:i+(r&&"?")+r+o,path:i,query:s,hash:Ml(o)}}function ME(n,e){const t=e.query?n(e.query):"";return e.path+(t&&"?")+t+(e.hash||"")}function ug(n,e){return!e||!n.toLowerCase().startsWith(e.toLowerCase())?n:n.slice(e.length)||"/"}function EE(n,e,t){const i=e.matched.length-1,s=t.matched.length-1;return i>-1&&i===s&&oa(e.matched[i],t.matched[s])&&j0(e.params,t.params)&&n(e.query)===n(t.query)&&e.hash===t.hash}function oa(n,e){return(n.aliasOf||n)===(e.aliasOf||e)}function j0(n,e){if(Object.keys(n).length!==Object.keys(e).length)return!1;for(const t in n)if(!wE(n[t],e[t]))return!1;return!0}function wE(n,e){return Ni(n)?hg(n,e):Ni(e)?hg(e,n):n===e}function hg(n,e){return Ni(e)?n.length===e.length&&n.every((t,i)=>t===e[i]):n.length===1&&n[0]===e}function TE(n,e){if(n.startsWith("/"))return n;if(!n)return e;const t=e.split("/"),i=n.split("/"),s=i[i.length-1];(s===".."||s===".")&&i.push("");let r=t.length-1,o,a;for(o=0;o<i.length;o++)if(a=i[o],a!==".")if(a==="..")r>1&&r--;else break;return t.slice(0,r).join("/")+"/"+i.slice(o).join("/")}const qs={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};var El;(function(n){n.pop="pop",n.push="push"})(El||(El={}));var fl;(function(n){n.back="back",n.forward="forward",n.unknown=""})(fl||(fl={}));function AE(n){if(!n)if(Oo){const e=document.querySelector("base");n=e&&e.getAttribute("href")||"/",n=n.replace(/^\w+:\/\/[^\/]+/,"")}else n="/";return n[0]!=="/"&&n[0]!=="#"&&(n="/"+n),yE(n)}const CE=/^[^#]+#/;function RE(n,e){return n.replace(CE,"#")+e}function PE(n,e){const t=document.documentElement.getBoundingClientRect(),i=n.getBoundingClientRect();return{behavior:e.behavior,left:i.left-t.left-(e.left||0),top:i.top-t.top-(e.top||0)}}const Bu=()=>({left:window.scrollX,top:window.scrollY});function DE(n){let e;if("el"in n){const t=n.el,i=typeof t=="string"&&t.startsWith("#"),s=typeof t=="string"?i?document.getElementById(t.slice(1)):document.querySelector(t):t;if(!s)return;e=PE(s,n)}else e=n;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.scrollX,e.top!=null?e.top:window.scrollY)}function fg(n,e){return(history.state?history.state.position-e:-1)+n}const kf=new Map;function LE(n,e){kf.set(n,e)}function IE(n){const e=kf.get(n);return kf.delete(n),e}let UE=()=>location.protocol+"//"+location.host;function K0(n,e){const{pathname:t,search:i,hash:s}=e,r=n.indexOf("#");if(r>-1){let a=s.includes(n.slice(r))?n.slice(r).length:1,l=s.slice(a);return l[0]!=="/"&&(l="/"+l),ug(l,"")}return ug(t,n)+i+s}function OE(n,e,t,i){let s=[],r=[],o=null;const a=({state:f})=>{const d=K0(n,location),g=t.value,_=e.value;let m=0;if(f){if(t.value=d,e.value=f,o&&o===g){o=null;return}m=_?f.position-_.position:0}else i(d);s.forEach(p=>{p(t.value,g,{delta:m,type:El.pop,direction:m?m>0?fl.forward:fl.back:fl.unknown})})};function l(){o=t.value}function c(f){s.push(f);const d=()=>{const g=s.indexOf(f);g>-1&&s.splice(g,1)};return r.push(d),d}function u(){const{history:f}=window;f.state&&f.replaceState(xt({},f.state,{scroll:Bu()}),"")}function h(){for(const f of r)f();r=[],window.removeEventListener("popstate",a),window.removeEventListener("beforeunload",u)}return window.addEventListener("popstate",a),window.addEventListener("beforeunload",u,{passive:!0}),{pauseListeners:l,listen:c,destroy:h}}function dg(n,e,t,i=!1,s=!1){return{back:n,current:e,forward:t,replaced:i,position:window.history.length,scroll:s?Bu():null}}function FE(n){const{history:e,location:t}=window,i={value:K0(n,t)},s={value:e.state};s.value||r(i.value,{back:null,current:i.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function r(l,c,u){const h=n.indexOf("#"),f=h>-1?(t.host&&document.querySelector("base")?n:n.slice(h))+l:UE()+n+l;try{e[u?"replaceState":"pushState"](c,"",f),s.value=c}catch(d){console.error(d),t[u?"replace":"assign"](f)}}function o(l,c){const u=xt({},e.state,dg(s.value.back,l,s.value.forward,!0),c,{position:s.value.position});r(l,u,!0),i.value=l}function a(l,c){const u=xt({},s.value,e.state,{forward:l,scroll:Bu()});r(u.current,u,!0);const h=xt({},dg(i.value,l,null),{position:u.position+1},c);r(l,h,!1),i.value=l}return{location:i,state:s,push:a,replace:o}}function NE(n){n=AE(n);const e=FE(n),t=OE(n,e.state,e.location,e.replace);function i(r,o=!0){o||t.pauseListeners(),history.go(r)}const s=xt({location:"",base:n,go:i,createHref:RE.bind(null,n)},e,t);return Object.defineProperty(s,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(s,"state",{enumerable:!0,get:()=>e.state.value}),s}function BE(n){return typeof n=="string"||n&&typeof n=="object"}function Z0(n){return typeof n=="string"||typeof n=="symbol"}const Q0=Symbol("");var pg;(function(n){n[n.aborted=4]="aborted",n[n.cancelled=8]="cancelled",n[n.duplicated=16]="duplicated"})(pg||(pg={}));function aa(n,e){return xt(new Error,{type:n,[Q0]:!0},e)}function fs(n,e){return n instanceof Error&&Q0 in n&&(e==null||!!(n.type&e))}const mg="[^/]+?",kE={sensitive:!1,strict:!1,start:!0,end:!0},zE=/[.+*?^${}()[\]/\\]/g;function HE(n,e){const t=xt({},kE,e),i=[];let s=t.start?"^":"";const r=[];for(const c of n){const u=c.length?[]:[90];t.strict&&!c.length&&(s+="/");for(let h=0;h<c.length;h++){const f=c[h];let d=40+(t.sensitive?.25:0);if(f.type===0)h||(s+="/"),s+=f.value.replace(zE,"\\$&"),d+=40;else if(f.type===1){const{value:g,repeatable:_,optional:m,regexp:p}=f;r.push({name:g,repeatable:_,optional:m});const x=p||mg;if(x!==mg){d+=10;try{new RegExp(`(${x})`)}catch(v){throw new Error(`Invalid custom RegExp for param "${g}" (${x}): `+v.message)}}let b=_?`((?:${x})(?:/(?:${x}))*)`:`(${x})`;h||(b=m&&c.length<2?`(?:/${b})`:"/"+b),m&&(b+="?"),s+=b,d+=20,m&&(d+=-8),_&&(d+=-20),x===".*"&&(d+=-50)}u.push(d)}i.push(u)}if(t.strict&&t.end){const c=i.length-1;i[c][i[c].length-1]+=.7000000000000001}t.strict||(s+="/?"),t.end?s+="$":t.strict&&(s+="(?:/|$)");const o=new RegExp(s,t.sensitive?"":"i");function a(c){const u=c.match(o),h={};if(!u)return null;for(let f=1;f<u.length;f++){const d=u[f]||"",g=r[f-1];h[g.name]=d&&g.repeatable?d.split("/"):d}return h}function l(c){let u="",h=!1;for(const f of n){(!h||!u.endsWith("/"))&&(u+="/"),h=!1;for(const d of f)if(d.type===0)u+=d.value;else if(d.type===1){const{value:g,repeatable:_,optional:m}=d,p=g in c?c[g]:"";if(Ni(p)&&!_)throw new Error(`Provided param "${g}" is an array but it is not repeatable (* or + modifiers)`);const x=Ni(p)?p.join("/"):p;if(!x)if(m)f.length<2&&(u.endsWith("/")?u=u.slice(0,-1):h=!0);else throw new Error(`Missing required param "${g}"`);u+=x}}return u||"/"}return{re:o,score:i,keys:r,parse:a,stringify:l}}function VE(n,e){let t=0;for(;t<n.length&&t<e.length;){const i=e[t]-n[t];if(i)return i;t++}return n.length<e.length?n.length===1&&n[0]===80?-1:1:n.length>e.length?e.length===1&&e[0]===80?1:-1:0}function J0(n,e){let t=0;const i=n.score,s=e.score;for(;t<i.length&&t<s.length;){const r=VE(i[t],s[t]);if(r)return r;t++}if(Math.abs(s.length-i.length)===1){if(gg(i))return 1;if(gg(s))return-1}return s.length-i.length}function gg(n){const e=n[n.length-1];return n.length>0&&e[e.length-1]<0}const GE={type:0,value:""},WE=/[a-zA-Z0-9_]/;function XE(n){if(!n)return[[]];if(n==="/")return[[GE]];if(!n.startsWith("/"))throw new Error(`Invalid path "${n}"`);function e(d){throw new Error(`ERR (${t})/"${c}": ${d}`)}let t=0,i=t;const s=[];let r;function o(){r&&s.push(r),r=[]}let a=0,l,c="",u="";function h(){c&&(t===0?r.push({type:0,value:c}):t===1||t===2||t===3?(r.length>1&&(l==="*"||l==="+")&&e(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`),r.push({type:1,value:c,regexp:u,repeatable:l==="*"||l==="+",optional:l==="*"||l==="?"})):e("Invalid state to consume buffer"),c="")}function f(){c+=l}for(;a<n.length;){if(l=n[a++],l==="\\"&&t!==2){i=t,t=4;continue}switch(t){case 0:l==="/"?(c&&h(),o()):l===":"?(h(),t=1):f();break;case 4:f(),t=i;break;case 1:l==="("?t=2:WE.test(l)?f():(h(),t=0,l!=="*"&&l!=="?"&&l!=="+"&&a--);break;case 2:l===")"?u[u.length-1]=="\\"?u=u.slice(0,-1)+l:t=3:u+=l;break;case 3:h(),t=0,l!=="*"&&l!=="?"&&l!=="+"&&a--,u="";break;default:e("Unknown state");break}}return t===2&&e(`Unfinished custom RegExp for param "${c}"`),h(),o(),s}function qE(n,e,t){const i=HE(XE(n.path),t),s=xt(i,{record:n,parent:e,children:[],alias:[]});return e&&!s.record.aliasOf==!e.record.aliasOf&&e.children.push(s),s}function $E(n,e){const t=[],i=new Map;e=bg({strict:!1,end:!0,sensitive:!1},e);function s(h){return i.get(h)}function r(h,f,d){const g=!d,_=vg(h);_.aliasOf=d&&d.record;const m=bg(e,h),p=[_];if("alias"in h){const v=typeof h.alias=="string"?[h.alias]:h.alias;for(const C of v)p.push(vg(xt({},_,{components:d?d.record.components:_.components,path:C,aliasOf:d?d.record:_})))}let x,b;for(const v of p){const{path:C}=v;if(f&&C[0]!=="/"){const A=f.record.path,T=A[A.length-1]==="/"?"":"/";v.path=f.record.path+(C&&T+C)}if(x=qE(v,f,m),d?d.alias.push(x):(b=b||x,b!==x&&b.alias.push(x),g&&h.name&&!xg(x)&&o(h.name)),ex(x)&&l(x),_.children){const A=_.children;for(let T=0;T<A.length;T++)r(A[T],x,d&&d.children[T])}d=d||x}return b?()=>{o(b)}:hl}function o(h){if(Z0(h)){const f=i.get(h);f&&(i.delete(h),t.splice(t.indexOf(f),1),f.children.forEach(o),f.alias.forEach(o))}else{const f=t.indexOf(h);f>-1&&(t.splice(f,1),h.record.name&&i.delete(h.record.name),h.children.forEach(o),h.alias.forEach(o))}}function a(){return t}function l(h){const f=KE(h,t);t.splice(f,0,h),h.record.name&&!xg(h)&&i.set(h.record.name,h)}function c(h,f){let d,g={},_,m;if("name"in h&&h.name){if(d=i.get(h.name),!d)throw aa(1,{location:h});m=d.record.name,g=xt(_g(f.params,d.keys.filter(b=>!b.optional).concat(d.parent?d.parent.keys.filter(b=>b.optional):[]).map(b=>b.name)),h.params&&_g(h.params,d.keys.map(b=>b.name))),_=d.stringify(g)}else if(h.path!=null)_=h.path,d=t.find(b=>b.re.test(_)),d&&(g=d.parse(_),m=d.record.name);else{if(d=f.name?i.get(f.name):t.find(b=>b.re.test(f.path)),!d)throw aa(1,{location:h,currentLocation:f});m=d.record.name,g=xt({},f.params,h.params),_=d.stringify(g)}const p=[];let x=d;for(;x;)p.unshift(x.record),x=x.parent;return{name:m,path:_,params:g,matched:p,meta:jE(p)}}n.forEach(h=>r(h));function u(){t.length=0,i.clear()}return{addRoute:r,resolve:c,removeRoute:o,clearRoutes:u,getRoutes:a,getRecordMatcher:s}}function _g(n,e){const t={};for(const i of e)i in n&&(t[i]=n[i]);return t}function vg(n){const e={path:n.path,redirect:n.redirect,name:n.name,meta:n.meta||{},aliasOf:n.aliasOf,beforeEnter:n.beforeEnter,props:YE(n),children:n.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in n?n.components||null:n.component&&{default:n.component}};return Object.defineProperty(e,"mods",{value:{}}),e}function YE(n){const e={},t=n.props||!1;if("component"in n)e.default=t;else for(const i in n.components)e[i]=typeof t=="object"?t[i]:t;return e}function xg(n){for(;n;){if(n.record.aliasOf)return!0;n=n.parent}return!1}function jE(n){return n.reduce((e,t)=>xt(e,t.meta),{})}function bg(n,e){const t={};for(const i in n)t[i]=i in e?e[i]:n[i];return t}function KE(n,e){let t=0,i=e.length;for(;t!==i;){const r=t+i>>1;J0(n,e[r])<0?i=r:t=r+1}const s=ZE(n);return s&&(i=e.lastIndexOf(s,i-1)),i}function ZE(n){let e=n;for(;e=e.parent;)if(ex(e)&&J0(n,e)===0)return e}function ex({record:n}){return!!(n.name||n.components&&Object.keys(n.components).length||n.redirect)}function QE(n){const e={};if(n===""||n==="?")return e;const i=(n[0]==="?"?n.slice(1):n).split("&");for(let s=0;s<i.length;++s){const r=i[s].replace(X0," "),o=r.indexOf("="),a=Ml(o<0?r:r.slice(0,o)),l=o<0?null:Ml(r.slice(o+1));if(a in e){let c=e[a];Ni(c)||(c=e[a]=[c]),c.push(l)}else e[a]=l}return e}function Sg(n){let e="";for(let t in n){const i=n[t];if(t=vE(t),i==null){i!==void 0&&(e+=(e.length?"&":"")+t);continue}(Ni(i)?i.map(r=>r&&Bf(r)):[i&&Bf(i)]).forEach(r=>{r!==void 0&&(e+=(e.length?"&":"")+t,r!=null&&(e+="="+r))})}return e}function JE(n){const e={};for(const t in n){const i=n[t];i!==void 0&&(e[t]=Ni(i)?i.map(s=>s==null?null:""+s):i==null?i:""+i)}return e}const ew=Symbol(""),yg=Symbol(""),ku=Symbol(""),Pp=Symbol(""),zf=Symbol("");function Oa(){let n=[];function e(i){return n.push(i),()=>{const s=n.indexOf(i);s>-1&&n.splice(s,1)}}function t(){n=[]}return{add:e,list:()=>n.slice(),reset:t}}function sr(n,e,t,i,s,r=o=>o()){const o=i&&(i.enterCallbacks[s]=i.enterCallbacks[s]||[]);return()=>new Promise((a,l)=>{const c=f=>{f===!1?l(aa(4,{from:t,to:e})):f instanceof Error?l(f):BE(f)?l(aa(2,{from:e,to:f})):(o&&i.enterCallbacks[s]===o&&typeof f=="function"&&o.push(f),a())},u=r(()=>n.call(i&&i.instances[s],e,t,c));let h=Promise.resolve(u);n.length<3&&(h=h.then(c)),h.catch(f=>l(f))})}function vh(n,e,t,i,s=r=>r()){const r=[];for(const o of n)for(const a in o.components){let l=o.components[a];if(!(e!=="beforeRouteEnter"&&!o.instances[a]))if(G0(l)){const u=(l.__vccOpts||l)[e];u&&r.push(sr(u,t,i,o,a,s))}else{let c=l();r.push(()=>c.then(u=>{if(!u)throw new Error(`Couldn't resolve component "${a}" at "${o.path}"`);const h=aE(u)?u.default:u;o.mods[a]=u,o.components[a]=h;const d=(h.__vccOpts||h)[e];return d&&sr(d,t,i,o,a,s)()}))}}return r}function Mg(n){const e=Fi(ku),t=Fi(Pp),i=Di(()=>{const l=Oi(n.to);return e.resolve(l)}),s=Di(()=>{const{matched:l}=i.value,{length:c}=l,u=l[c-1],h=t.matched;if(!u||!h.length)return-1;const f=h.findIndex(oa.bind(null,u));if(f>-1)return f;const d=Eg(l[c-2]);return c>1&&Eg(u)===d&&h[h.length-1].path!==d?h.findIndex(oa.bind(null,l[c-2])):f}),r=Di(()=>s.value>-1&&sw(t.params,i.value.params)),o=Di(()=>s.value>-1&&s.value===t.matched.length-1&&j0(t.params,i.value.params));function a(l={}){return iw(l)?e[Oi(n.replace)?"replace":"push"](Oi(n.to)).catch(hl):Promise.resolve()}return{route:i,href:Di(()=>i.value.href),isActive:r,isExactActive:o,navigate:a}}const tw=p0({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:Mg,setup(n,{slots:e}){const t=Lu(Mg(n)),{options:i}=Fi(ku),s=Di(()=>({[wg(n.activeClass,i.linkActiveClass,"router-link-active")]:t.isActive,[wg(n.exactActiveClass,i.linkExactActiveClass,"router-link-exact-active")]:t.isExactActive}));return()=>{const r=e.default&&e.default(t);return n.custom?r:H0("a",{"aria-current":t.isExactActive?n.ariaCurrentValue:null,href:t.href,onClick:t.navigate,class:s.value},r)}}}),nw=tw;function iw(n){if(!(n.metaKey||n.altKey||n.ctrlKey||n.shiftKey)&&!n.defaultPrevented&&!(n.button!==void 0&&n.button!==0)){if(n.currentTarget&&n.currentTarget.getAttribute){const e=n.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return n.preventDefault&&n.preventDefault(),!0}}function sw(n,e){for(const t in e){const i=e[t],s=n[t];if(typeof i=="string"){if(i!==s)return!1}else if(!Ni(s)||s.length!==i.length||i.some((r,o)=>r!==s[o]))return!1}return!0}function Eg(n){return n?n.aliasOf?n.aliasOf.path:n.path:""}const wg=(n,e,t)=>n??e??t,rw=p0({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(n,{attrs:e,slots:t}){const i=Fi(zf),s=Di(()=>n.route||i.value),r=Fi(yg,0),o=Di(()=>{let c=Oi(r);const{matched:u}=s.value;let h;for(;(h=u[c])&&!h.components;)c++;return c}),a=Di(()=>s.value.matched[o.value]);Nc(yg,Di(()=>o.value+1)),Nc(ew,a),Nc(zf,s);const l=at();return cl(()=>[l.value,a.value,n.name],([c,u,h],[f,d,g])=>{u&&(u.instances[h]=c,d&&d!==u&&c&&c===f&&(u.leaveGuards.size||(u.leaveGuards=d.leaveGuards),u.updateGuards.size||(u.updateGuards=d.updateGuards))),c&&u&&(!d||!oa(u,d)||!f)&&(u.enterCallbacks[h]||[]).forEach(_=>_(c))},{flush:"post"}),()=>{const c=s.value,u=n.name,h=a.value,f=h&&h.components[u];if(!f)return Tg(t.default,{Component:f,route:c});const d=h.props[u],g=d?d===!0?c.params:typeof d=="function"?d(c):d:null,m=H0(f,xt({},g,e,{onVnodeUnmounted:p=>{p.component.isUnmounted&&(h.instances[u]=null)},ref:l}));return Tg(t.default,{Component:m,route:c})||m}}});function Tg(n,e){if(!n)return null;const t=n(e);return t.length===1?t[0]:t}const tx=rw;function ow(n){const e=$E(n.routes,n),t=n.parseQuery||QE,i=n.stringifyQuery||Sg,s=n.history,r=Oa(),o=Oa(),a=Oa(),l=Ey(qs);let c=qs;Oo&&n.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const u=gh.bind(null,U=>""+U),h=gh.bind(null,bE),f=gh.bind(null,Ml);function d(U,Y){let Z,re;return Z0(U)?(Z=e.getRecordMatcher(U),re=Y):re=U,e.addRoute(re,Z)}function g(U){const Y=e.getRecordMatcher(U);Y&&e.removeRoute(Y)}function _(){return e.getRoutes().map(U=>U.record)}function m(U){return!!e.getRecordMatcher(U)}function p(U,Y){if(Y=xt({},Y||l.value),typeof U=="string"){const E=_h(t,U,Y.path),se=e.resolve({path:E.path},Y),J=s.createHref(E.fullPath);return xt(E,se,{params:f(se.params),hash:Ml(E.hash),redirectedFrom:void 0,href:J})}let Z;if(U.path!=null)Z=xt({},U,{path:_h(t,U.path,Y.path).path});else{const E=xt({},U.params);for(const se in E)E[se]==null&&delete E[se];Z=xt({},U,{params:h(E)}),Y.params=h(Y.params)}const re=e.resolve(Z,Y),Pe=U.hash||"";re.params=u(f(re.params));const P=ME(i,xt({},U,{hash:_E(Pe),path:re.path})),I=s.createHref(P);return xt({fullPath:P,hash:Pe,query:i===Sg?JE(U.query):U.query||{}},re,{redirectedFrom:void 0,href:I})}function x(U){return typeof U=="string"?_h(t,U,l.value.path):xt({},U)}function b(U,Y){if(c!==U)return aa(8,{from:Y,to:U})}function v(U){return T(U)}function C(U){return v(xt(x(U),{replace:!0}))}function A(U){const Y=U.matched[U.matched.length-1];if(Y&&Y.redirect){const{redirect:Z}=Y;let re=typeof Z=="function"?Z(U):Z;return typeof re=="string"&&(re=re.includes("?")||re.includes("#")?re=x(re):{path:re},re.params={}),xt({query:U.query,hash:U.hash,params:re.path!=null?{}:U.params},re)}}function T(U,Y){const Z=c=p(U),re=l.value,Pe=U.state,P=U.force,I=U.replace===!0,E=A(Z);if(E)return T(xt(x(E),{state:typeof E=="object"?xt({},Pe,E.state):Pe,force:P,replace:I}),Y||Z);const se=Z;se.redirectedFrom=Y;let J;return!P&&EE(i,re,Z)&&(J=aa(16,{to:se,from:re}),ue(re,re,!0,!1)),(J?Promise.resolve(J):y(se,re)).catch(Q=>fs(Q)?fs(Q,2)?Q:be(Q):B(Q,se,re)).then(Q=>{if(Q){if(fs(Q,2))return T(xt({replace:I},x(Q.to),{state:typeof Q.to=="object"?xt({},Pe,Q.to.state):Pe,force:P}),Y||se)}else Q=F(se,re,!0,I,Pe);return D(se,re,Q),Q})}function L(U,Y){const Z=b(U,Y);return Z?Promise.reject(Z):Promise.resolve()}function M(U){const Y=k.values().next().value;return Y&&typeof Y.runWithContext=="function"?Y.runWithContext(U):U()}function y(U,Y){let Z;const[re,Pe,P]=aw(U,Y);Z=vh(re.reverse(),"beforeRouteLeave",U,Y);for(const E of re)E.leaveGuards.forEach(se=>{Z.push(sr(se,U,Y))});const I=L.bind(null,U,Y);return Z.push(I),ie(Z).then(()=>{Z=[];for(const E of r.list())Z.push(sr(E,U,Y));return Z.push(I),ie(Z)}).then(()=>{Z=vh(Pe,"beforeRouteUpdate",U,Y);for(const E of Pe)E.updateGuards.forEach(se=>{Z.push(sr(se,U,Y))});return Z.push(I),ie(Z)}).then(()=>{Z=[];for(const E of P)if(E.beforeEnter)if(Ni(E.beforeEnter))for(const se of E.beforeEnter)Z.push(sr(se,U,Y));else Z.push(sr(E.beforeEnter,U,Y));return Z.push(I),ie(Z)}).then(()=>(U.matched.forEach(E=>E.enterCallbacks={}),Z=vh(P,"beforeRouteEnter",U,Y,M),Z.push(I),ie(Z))).then(()=>{Z=[];for(const E of o.list())Z.push(sr(E,U,Y));return Z.push(I),ie(Z)}).catch(E=>fs(E,8)?E:Promise.reject(E))}function D(U,Y,Z){a.list().forEach(re=>M(()=>re(U,Y,Z)))}function F(U,Y,Z,re,Pe){const P=b(U,Y);if(P)return P;const I=Y===qs,E=Oo?history.state:{};Z&&(re||I?s.replace(U.fullPath,xt({scroll:I&&E&&E.scroll},Pe)):s.push(U.fullPath,Pe)),l.value=U,ue(U,Y,Z,I),be()}let N;function K(){N||(N=s.listen((U,Y,Z)=>{if(!G.listening)return;const re=p(U),Pe=A(re);if(Pe){T(xt(Pe,{replace:!0}),re).catch(hl);return}c=re;const P=l.value;Oo&&LE(fg(P.fullPath,Z.delta),Bu()),y(re,P).catch(I=>fs(I,12)?I:fs(I,2)?(T(I.to,re).then(E=>{fs(E,20)&&!Z.delta&&Z.type===El.pop&&s.go(-1,!1)}).catch(hl),Promise.reject()):(Z.delta&&s.go(-Z.delta,!1),B(I,re,P))).then(I=>{I=I||F(re,P,!1),I&&(Z.delta&&!fs(I,8)?s.go(-Z.delta,!1):Z.type===El.pop&&fs(I,20)&&s.go(-1,!1)),D(re,P,I)}).catch(hl)}))}let j=Oa(),H=Oa(),W;function B(U,Y,Z){be(U);const re=H.list();return re.length?re.forEach(Pe=>Pe(U,Y,Z)):console.error(U),Promise.reject(U)}function pe(){return W&&l.value!==qs?Promise.resolve():new Promise((U,Y)=>{j.add([U,Y])})}function be(U){return W||(W=!U,K(),j.list().forEach(([Y,Z])=>U?Z(U):Y()),j.reset()),U}function ue(U,Y,Z,re){const{scrollBehavior:Pe}=n;if(!Oo||!Pe)return Promise.resolve();const P=!Z&&IE(fg(U.fullPath,0))||(re||!Z)&&history.state&&history.state.scroll||null;return c0().then(()=>Pe(U,Y,P)).then(I=>I&&DE(I)).catch(I=>B(I,U,Y))}const ce=U=>s.go(U);let he;const k=new Set,G={currentRoute:l,listening:!0,addRoute:d,removeRoute:g,clearRoutes:e.clearRoutes,hasRoute:m,getRoutes:_,resolve:p,options:n,push:v,replace:C,go:ce,back:()=>ce(-1),forward:()=>ce(1),beforeEach:r.add,beforeResolve:o.add,afterEach:a.add,onError:H.add,isReady:pe,install(U){const Y=this;U.component("RouterLink",nw),U.component("RouterView",tx),U.config.globalProperties.$router=Y,Object.defineProperty(U.config.globalProperties,"$route",{enumerable:!0,get:()=>Oi(l)}),Oo&&!he&&l.value===qs&&(he=!0,v(s.location).catch(Pe=>{}));const Z={};for(const Pe in qs)Object.defineProperty(Z,Pe,{get:()=>l.value[Pe],enumerable:!0});U.provide(ku,Y),U.provide(Pp,s0(Z)),U.provide(zf,l);const re=U.unmount;k.add(U),U.unmount=function(){k.delete(U),k.size<1&&(c=qs,N&&N(),N=null,l.value=qs,he=!1,W=!1),re()}}};function ie(U){return U.reduce((Y,Z)=>Y.then(()=>M(Z)),Promise.resolve())}return G}function aw(n,e){const t=[],i=[],s=[],r=Math.max(e.matched.length,n.matched.length);for(let o=0;o<r;o++){const a=e.matched[o];a&&(n.matched.find(c=>oa(c,a))?i.push(a):t.push(a));const l=n.matched[o];l&&(e.matched.find(c=>oa(c,l))||s.push(l))}return[t,i,s]}function lw(){return Fi(ku)}function cw(n){return Fi(Pp)}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Dp="170",uw=0,Ag=1,hw=2,nx=1,fw=2,vs=3,bn=0,Fn=1,Es=2,Is=0,jo=1,Cg=2,Rg=3,Pg=4,dw=5,$r=100,pw=101,mw=102,gw=103,_w=104,vw=200,xw=201,bw=202,Sw=203,Hf=204,Vf=205,yw=206,Mw=207,Ew=208,ww=209,Tw=210,Aw=211,Cw=212,Rw=213,Pw=214,Gf=0,Wf=1,Xf=2,la=3,qf=4,$f=5,Yf=6,jf=7,ix=0,Dw=1,Lw=2,dr=0,Iw=1,Uw=2,Ow=3,Fw=4,Nw=5,Bw=6,kw=7,sx=300,ca=301,ua=302,Kf=303,Zf=304,zu=306,wl=1e3,As=1001,Qf=1002,vn=1003,zw=1004,rc=1005,Un=1006,xh=1007,Kr=1008,oi=1009,rx=1010,ox=1011,Tl=1012,Lp=1013,xr=1014,Cs=1015,Fs=1016,Ip=1017,Up=1018,ao=1020,ax=35902,lx=1021,cx=1022,vi=1023,ux=1024,hx=1025,Ko=1026,lo=1027,fx=1028,Op=1029,dx=1030,Fp=1031,Np=1033,zc=33776,Hc=33777,Vc=33778,Gc=33779,Jf=35840,ed=35841,td=35842,nd=35843,id=36196,sd=37492,rd=37496,od=37808,ad=37809,ld=37810,cd=37811,ud=37812,hd=37813,fd=37814,dd=37815,pd=37816,md=37817,gd=37818,_d=37819,vd=37820,xd=37821,Wc=36492,bd=36494,Sd=36495,px=36283,yd=36284,Md=36285,Ed=36286,mx=3200,Hw=3201,Vw=0,Gw=1,or="",zt="srgb",ya="srgb-linear",Hu="linear",yt="srgb",_o=7680,Dg=519,Ww=512,Xw=513,qw=514,gx=515,$w=516,Yw=517,jw=518,Kw=519,Lg=35044,Ig="300 es",Rs=2e3,ru=2001;class Ma{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const nn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],bh=Math.PI/180,wd=180/Math.PI;function Gl(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(nn[n&255]+nn[n>>8&255]+nn[n>>16&255]+nn[n>>24&255]+"-"+nn[e&255]+nn[e>>8&255]+"-"+nn[e>>16&15|64]+nn[e>>24&255]+"-"+nn[t&63|128]+nn[t>>8&255]+"-"+nn[t>>16&255]+nn[t>>24&255]+nn[i&255]+nn[i>>8&255]+nn[i>>16&255]+nn[i>>24&255]).toLowerCase()}function Rn(n,e,t){return Math.max(e,Math.min(t,n))}function Zw(n,e){return(n%e+e)%e}function Sh(n,e,t){return(1-t)*n+t*e}function Fa(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function wn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class qe{constructor(e=0,t=0){qe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Rn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*i-o*s+e.x,this.y=r*s+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class it{constructor(e,t,i,s,r,o,a,l,c){it.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,l,c)}set(e,t,i,s,r,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=s,u[2]=a,u[3]=t,u[4]=r,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],h=i[7],f=i[2],d=i[5],g=i[8],_=s[0],m=s[3],p=s[6],x=s[1],b=s[4],v=s[7],C=s[2],A=s[5],T=s[8];return r[0]=o*_+a*x+l*C,r[3]=o*m+a*b+l*A,r[6]=o*p+a*v+l*T,r[1]=c*_+u*x+h*C,r[4]=c*m+u*b+h*A,r[7]=c*p+u*v+h*T,r[2]=f*_+d*x+g*C,r[5]=f*m+d*b+g*A,r[8]=f*p+d*v+g*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-i*r*u+i*a*l+s*r*c-s*o*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=u*o-a*c,f=a*l-u*r,d=c*r-o*l,g=t*h+i*f+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=h*_,e[1]=(s*c-u*i)*_,e[2]=(a*i-s*o)*_,e[3]=f*_,e[4]=(u*t-s*l)*_,e[5]=(s*r-a*t)*_,e[6]=d*_,e[7]=(i*l-c*t)*_,e[8]=(o*t-i*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(yh.makeScale(e,t)),this}rotate(e){return this.premultiply(yh.makeRotation(-e)),this}translate(e,t){return this.premultiply(yh.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const yh=new it;function _x(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Al(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Qw(){const n=Al("canvas");return n.style.display="block",n}const Ug={};function Za(n){n in Ug||(Ug[n]=!0,console.warn(n))}function Jw(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}function eT(n){const e=n.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function tT(n){const e=n.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const ut={enabled:!0,workingColorSpace:ya,spaces:{},convert:function(n,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===yt&&(n.r=Us(n.r),n.g=Us(n.g),n.b=Us(n.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(n.applyMatrix3(this.spaces[e].toXYZ),n.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===yt&&(n.r=Zo(n.r),n.g=Zo(n.g),n.b=Zo(n.b))),n},fromWorkingColorSpace:function(n,e){return this.convert(n,this.workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===or?Hu:this.spaces[n].transfer},getLuminanceCoefficients:function(n,e=this.workingColorSpace){return n.fromArray(this.spaces[e].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,e,t){return n.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function Us(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Zo(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}const Og=[.64,.33,.3,.6,.15,.06],Fg=[.2126,.7152,.0722],Ng=[.3127,.329],Bg=new it().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),kg=new it().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);ut.define({[ya]:{primaries:Og,whitePoint:Ng,transfer:Hu,toXYZ:Bg,fromXYZ:kg,luminanceCoefficients:Fg,workingColorSpaceConfig:{unpackColorSpace:zt},outputColorSpaceConfig:{drawingBufferColorSpace:zt}},[zt]:{primaries:Og,whitePoint:Ng,transfer:yt,toXYZ:Bg,fromXYZ:kg,luminanceCoefficients:Fg,outputColorSpaceConfig:{drawingBufferColorSpace:zt}}});let vo;class nT{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{vo===void 0&&(vo=Al("canvas")),vo.width=e.width,vo.height=e.height;const i=vo.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=vo}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Al("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Us(r[o]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Us(t[i]/255)*255):t[i]=Us(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let iT=0;class vx{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:iT++}),this.uuid=Gl(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Mh(s[o].image)):r.push(Mh(s[o]))}else r=Mh(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function Mh(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?nT.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let sT=0;class cn extends Ma{constructor(e=cn.DEFAULT_IMAGE,t=cn.DEFAULT_MAPPING,i=As,s=As,r=Un,o=Kr,a=vi,l=oi,c=cn.DEFAULT_ANISOTROPY,u=or){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:sT++}),this.uuid=Gl(),this.name="",this.source=new vx(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new qe(0,0),this.repeat=new qe(1,1),this.center=new qe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new it,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==sx)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case wl:e.x=e.x-Math.floor(e.x);break;case As:e.x=e.x<0?0:1;break;case Qf:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case wl:e.y=e.y-Math.floor(e.y);break;case As:e.y=e.y<0?0:1;break;case Qf:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}cn.DEFAULT_IMAGE=null;cn.DEFAULT_MAPPING=sx;cn.DEFAULT_ANISOTROPY=1;class Ht{constructor(e=0,t=0,i=0,s=1){Ht.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*i+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const l=e.elements,c=l[0],u=l[4],h=l[8],f=l[1],d=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(c+1)/2,v=(d+1)/2,C=(p+1)/2,A=(u+f)/4,T=(h+_)/4,L=(g+m)/4;return b>v&&b>C?b<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(b),s=A/i,r=T/i):v>C?v<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),i=A/s,r=L/s):C<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(C),i=T/r,s=L/r),this.set(i,s,r,t),this}let x=Math.sqrt((m-g)*(m-g)+(h-_)*(h-_)+(f-u)*(f-u));return Math.abs(x)<.001&&(x=1),this.x=(m-g)/x,this.y=(h-_)/x,this.z=(f-u)/x,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class rT extends Ma{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Ht(0,0,e,t),this.scissorTest=!1,this.viewport=new Ht(0,0,e,t);const s={width:e,height:t,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Un,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const r=new cn(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,s=e.textures.length;i<s;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new vx(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ai extends rT{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class xx extends cn{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=vn,this.minFilter=vn,this.wrapR=As,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class oT extends cn{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=vn,this.minFilter=vn,this.wrapR=As,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Wl{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,o,a){let l=i[s+0],c=i[s+1],u=i[s+2],h=i[s+3];const f=r[o+0],d=r[o+1],g=r[o+2],_=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=f,e[t+1]=d,e[t+2]=g,e[t+3]=_;return}if(h!==_||l!==f||c!==d||u!==g){let m=1-a;const p=l*f+c*d+u*g+h*_,x=p>=0?1:-1,b=1-p*p;if(b>Number.EPSILON){const C=Math.sqrt(b),A=Math.atan2(C,p*x);m=Math.sin(m*A)/C,a=Math.sin(a*A)/C}const v=a*x;if(l=l*m+f*v,c=c*m+d*v,u=u*m+g*v,h=h*m+_*v,m===1-a){const C=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=C,c*=C,u*=C,h*=C}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,s,r,o){const a=i[s],l=i[s+1],c=i[s+2],u=i[s+3],h=r[o],f=r[o+1],d=r[o+2],g=r[o+3];return e[t]=a*g+u*h+l*d-c*f,e[t+1]=l*g+u*f+c*h-a*d,e[t+2]=c*g+u*d+a*f-l*h,e[t+3]=u*g-a*h-l*f-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(s/2),h=a(r/2),f=l(i/2),d=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=f*u*h+c*d*g,this._y=c*d*h-f*u*g,this._z=c*u*g+f*d*h,this._w=c*u*h-f*d*g;break;case"YXZ":this._x=f*u*h+c*d*g,this._y=c*d*h-f*u*g,this._z=c*u*g-f*d*h,this._w=c*u*h+f*d*g;break;case"ZXY":this._x=f*u*h-c*d*g,this._y=c*d*h+f*u*g,this._z=c*u*g+f*d*h,this._w=c*u*h-f*d*g;break;case"ZYX":this._x=f*u*h-c*d*g,this._y=c*d*h+f*u*g,this._z=c*u*g-f*d*h,this._w=c*u*h+f*d*g;break;case"YZX":this._x=f*u*h+c*d*g,this._y=c*d*h+f*u*g,this._z=c*u*g-f*d*h,this._w=c*u*h-f*d*g;break;case"XZY":this._x=f*u*h-c*d*g,this._y=c*d*h-f*u*g,this._z=c*u*g+f*d*h,this._w=c*u*h+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],h=t[10],f=i+a+h;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-l)*d,this._y=(r-c)*d,this._z=(o-s)*d}else if(i>a&&i>h){const d=2*Math.sqrt(1+i-a-h);this._w=(u-l)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+c)/d}else if(a>h){const d=2*Math.sqrt(1+a-i-h);this._w=(r-c)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+h-i-a);this._w=(o-s)/d,this._x=(r+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Rn(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+o*a+s*c-r*l,this._y=s*u+o*l+r*a-i*c,this._z=r*u+o*c+i*l-s*a,this._w=o*u-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+i*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-t;return this._w=d*o+t*this._w,this._x=d*i+t*this._x,this._y=d*s+t*this._y,this._z=d*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-t)*u)/c,f=Math.sin(t*u)/c;return this._w=o*h+this._w*f,this._x=i*h+this._x*f,this._y=s*h+this._y*f,this._z=r*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class z{constructor(e=0,t=0,i=0){z.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(zg.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(zg.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*i),u=2*(a*t-r*s),h=2*(r*i-o*t);return this.x=t+l*c+o*h-a*u,this.y=i+l*u+a*c-r*h,this.z=s+l*h+r*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Eh.copy(this).projectOnVector(e),this.sub(Eh)}reflect(e){return this.sub(Eh.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Rn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Eh=new z,zg=new Wl;class Xl{constructor(e=new z(1/0,1/0,1/0),t=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Ti.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Ti.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Ti.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Ti):Ti.fromBufferAttribute(r,o),Ti.applyMatrix4(e.matrixWorld),this.expandByPoint(Ti);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),oc.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),oc.copy(i.boundingBox)),oc.applyMatrix4(e.matrixWorld),this.union(oc)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ti),Ti.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Na),ac.subVectors(this.max,Na),xo.subVectors(e.a,Na),bo.subVectors(e.b,Na),So.subVectors(e.c,Na),$s.subVectors(bo,xo),Ys.subVectors(So,bo),Ir.subVectors(xo,So);let t=[0,-$s.z,$s.y,0,-Ys.z,Ys.y,0,-Ir.z,Ir.y,$s.z,0,-$s.x,Ys.z,0,-Ys.x,Ir.z,0,-Ir.x,-$s.y,$s.x,0,-Ys.y,Ys.x,0,-Ir.y,Ir.x,0];return!wh(t,xo,bo,So,ac)||(t=[1,0,0,0,1,0,0,0,1],!wh(t,xo,bo,So,ac))?!1:(lc.crossVectors($s,Ys),t=[lc.x,lc.y,lc.z],wh(t,xo,bo,So,ac))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ti).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ti).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ds[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ds[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ds[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ds[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ds[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ds[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ds[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ds[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ds),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const ds=[new z,new z,new z,new z,new z,new z,new z,new z],Ti=new z,oc=new Xl,xo=new z,bo=new z,So=new z,$s=new z,Ys=new z,Ir=new z,Na=new z,ac=new z,lc=new z,Ur=new z;function wh(n,e,t,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){Ur.fromArray(n,r);const a=s.x*Math.abs(Ur.x)+s.y*Math.abs(Ur.y)+s.z*Math.abs(Ur.z),l=e.dot(Ur),c=t.dot(Ur),u=i.dot(Ur);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const aT=new Xl,Ba=new z,Th=new z;class Bp{constructor(e=new z,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):aT.setFromPoints(e).getCenter(i);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ba.subVectors(e,this.center);const t=Ba.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Ba,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Th.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ba.copy(e.center).add(Th)),this.expandByPoint(Ba.copy(e.center).sub(Th))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ps=new z,Ah=new z,cc=new z,js=new z,Ch=new z,uc=new z,Rh=new z;class bx{constructor(e=new z,t=new z(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ps)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=ps.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ps.copy(this.origin).addScaledVector(this.direction,t),ps.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Ah.copy(e).add(t).multiplyScalar(.5),cc.copy(t).sub(e).normalize(),js.copy(this.origin).sub(Ah);const r=e.distanceTo(t)*.5,o=-this.direction.dot(cc),a=js.dot(this.direction),l=-js.dot(cc),c=js.lengthSq(),u=Math.abs(1-o*o);let h,f,d,g;if(u>0)if(h=o*l-a,f=o*a-l,g=r*u,h>=0)if(f>=-g)if(f<=g){const _=1/u;h*=_,f*=_,d=h*(h+o*f+2*a)+f*(o*h+f+2*l)+c}else f=r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;else f=-r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;else f<=-g?(h=Math.max(0,-(-o*r+a)),f=h>0?-r:Math.min(Math.max(-r,-l),r),d=-h*h+f*(f+2*l)+c):f<=g?(h=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+c):(h=Math.max(0,-(o*r+a)),f=h>0?r:Math.min(Math.max(-r,-l),r),d=-h*h+f*(f+2*l)+c);else f=o>0?-r:r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(Ah).addScaledVector(cc,f),d}intersectSphere(e,t){ps.subVectors(e.center,this.origin);const i=ps.dot(this.direction),s=ps.dot(ps)-i*i,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,s=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,s=(e.min.x-f.x)*c),u>=0?(r=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(r=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),h>=0?(a=(e.min.z-f.z)*h,l=(e.max.z-f.z)*h):(a=(e.max.z-f.z)*h,l=(e.min.z-f.z)*h),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,ps)!==null}intersectTriangle(e,t,i,s,r){Ch.subVectors(t,e),uc.subVectors(i,e),Rh.crossVectors(Ch,uc);let o=this.direction.dot(Rh),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;js.subVectors(this.origin,e);const l=a*this.direction.dot(uc.crossVectors(js,uc));if(l<0)return null;const c=a*this.direction.dot(Ch.cross(js));if(c<0||l+c>o)return null;const u=-a*js.dot(Rh);return u<0?null:this.at(u/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Gt{constructor(e,t,i,s,r,o,a,l,c,u,h,f,d,g,_,m){Gt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,l,c,u,h,f,d,g,_,m)}set(e,t,i,s,r,o,a,l,c,u,h,f,d,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=h,p[14]=f,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Gt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,s=1/yo.setFromMatrixColumn(e,0).length(),r=1/yo.setFromMatrixColumn(e,1).length(),o=1/yo.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const f=o*u,d=o*h,g=a*u,_=a*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=d+g*c,t[5]=f-_*c,t[9]=-a*l,t[2]=_-f*c,t[6]=g+d*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*u,d=l*h,g=c*u,_=c*h;t[0]=f+_*a,t[4]=g*a-d,t[8]=o*c,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=d*a-g,t[6]=_+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*u,d=l*h,g=c*u,_=c*h;t[0]=f-_*a,t[4]=-o*h,t[8]=g+d*a,t[1]=d+g*a,t[5]=o*u,t[9]=_-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*u,d=o*h,g=a*u,_=a*h;t[0]=l*u,t[4]=g*c-d,t[8]=f*c+_,t[1]=l*h,t[5]=_*c+f,t[9]=d*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,d=o*c,g=a*l,_=a*c;t[0]=l*u,t[4]=_-f*h,t[8]=g*h+d,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=d*h+g,t[10]=f-_*h}else if(e.order==="XZY"){const f=o*l,d=o*c,g=a*l,_=a*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=f*h+_,t[5]=o*u,t[9]=d*h-g,t[2]=g*h-d,t[6]=a*u,t[10]=_*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(lT,e,cT)}lookAt(e,t,i){const s=this.elements;return qn.subVectors(e,t),qn.lengthSq()===0&&(qn.z=1),qn.normalize(),Ks.crossVectors(i,qn),Ks.lengthSq()===0&&(Math.abs(i.z)===1?qn.x+=1e-4:qn.z+=1e-4,qn.normalize(),Ks.crossVectors(i,qn)),Ks.normalize(),hc.crossVectors(qn,Ks),s[0]=Ks.x,s[4]=hc.x,s[8]=qn.x,s[1]=Ks.y,s[5]=hc.y,s[9]=qn.y,s[2]=Ks.z,s[6]=hc.z,s[10]=qn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],h=i[5],f=i[9],d=i[13],g=i[2],_=i[6],m=i[10],p=i[14],x=i[3],b=i[7],v=i[11],C=i[15],A=s[0],T=s[4],L=s[8],M=s[12],y=s[1],D=s[5],F=s[9],N=s[13],K=s[2],j=s[6],H=s[10],W=s[14],B=s[3],pe=s[7],be=s[11],ue=s[15];return r[0]=o*A+a*y+l*K+c*B,r[4]=o*T+a*D+l*j+c*pe,r[8]=o*L+a*F+l*H+c*be,r[12]=o*M+a*N+l*W+c*ue,r[1]=u*A+h*y+f*K+d*B,r[5]=u*T+h*D+f*j+d*pe,r[9]=u*L+h*F+f*H+d*be,r[13]=u*M+h*N+f*W+d*ue,r[2]=g*A+_*y+m*K+p*B,r[6]=g*T+_*D+m*j+p*pe,r[10]=g*L+_*F+m*H+p*be,r[14]=g*M+_*N+m*W+p*ue,r[3]=x*A+b*y+v*K+C*B,r[7]=x*T+b*D+v*j+C*pe,r[11]=x*L+b*F+v*H+C*be,r[15]=x*M+b*N+v*W+C*ue,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],h=e[6],f=e[10],d=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+r*l*h-s*c*h-r*a*f+i*c*f+s*a*d-i*l*d)+_*(+t*l*d-t*c*f+r*o*f-s*o*d+s*c*u-r*l*u)+m*(+t*c*h-t*a*d-r*o*h+i*o*d+r*a*u-i*c*u)+p*(-s*a*u-t*l*h+t*a*f+s*o*h-i*o*f+i*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=e[9],f=e[10],d=e[11],g=e[12],_=e[13],m=e[14],p=e[15],x=h*m*c-_*f*c+_*l*d-a*m*d-h*l*p+a*f*p,b=g*f*c-u*m*c-g*l*d+o*m*d+u*l*p-o*f*p,v=u*_*c-g*h*c+g*a*d-o*_*d-u*a*p+o*h*p,C=g*h*l-u*_*l-g*a*f+o*_*f+u*a*m-o*h*m,A=t*x+i*b+s*v+r*C;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/A;return e[0]=x*T,e[1]=(_*f*r-h*m*r-_*s*d+i*m*d+h*s*p-i*f*p)*T,e[2]=(a*m*r-_*l*r+_*s*c-i*m*c-a*s*p+i*l*p)*T,e[3]=(h*l*r-a*f*r-h*s*c+i*f*c+a*s*d-i*l*d)*T,e[4]=b*T,e[5]=(u*m*r-g*f*r+g*s*d-t*m*d-u*s*p+t*f*p)*T,e[6]=(g*l*r-o*m*r-g*s*c+t*m*c+o*s*p-t*l*p)*T,e[7]=(o*f*r-u*l*r+u*s*c-t*f*c-o*s*d+t*l*d)*T,e[8]=v*T,e[9]=(g*h*r-u*_*r-g*i*d+t*_*d+u*i*p-t*h*p)*T,e[10]=(o*_*r-g*a*r+g*i*c-t*_*c-o*i*p+t*a*p)*T,e[11]=(u*a*r-o*h*r-u*i*c+t*h*c+o*i*d-t*a*d)*T,e[12]=C*T,e[13]=(u*_*s-g*h*s+g*i*f-t*_*f-u*i*m+t*h*m)*T,e[14]=(g*a*s-o*_*s-g*i*l+t*_*l+o*i*m-t*a*m)*T,e[15]=(o*h*s-u*a*s+u*i*l-t*h*l-o*i*f+t*a*f)*T,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,o=e.x,a=e.y,l=e.z,c=r*o,u=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,u*a+i,u*l-s*o,0,c*l-s*a,u*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,o){return this.set(1,i,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,u=o+o,h=a+a,f=r*c,d=r*u,g=r*h,_=o*u,m=o*h,p=a*h,x=l*c,b=l*u,v=l*h,C=i.x,A=i.y,T=i.z;return s[0]=(1-(_+p))*C,s[1]=(d+v)*C,s[2]=(g-b)*C,s[3]=0,s[4]=(d-v)*A,s[5]=(1-(f+p))*A,s[6]=(m+x)*A,s[7]=0,s[8]=(g+b)*T,s[9]=(m-x)*T,s[10]=(1-(f+_))*T,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;let r=yo.set(s[0],s[1],s[2]).length();const o=yo.set(s[4],s[5],s[6]).length(),a=yo.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Ai.copy(this);const c=1/r,u=1/o,h=1/a;return Ai.elements[0]*=c,Ai.elements[1]*=c,Ai.elements[2]*=c,Ai.elements[4]*=u,Ai.elements[5]*=u,Ai.elements[6]*=u,Ai.elements[8]*=h,Ai.elements[9]*=h,Ai.elements[10]*=h,t.setFromRotationMatrix(Ai),i.x=r,i.y=o,i.z=a,this}makePerspective(e,t,i,s,r,o,a=Rs){const l=this.elements,c=2*r/(t-e),u=2*r/(i-s),h=(t+e)/(t-e),f=(i+s)/(i-s);let d,g;if(a===Rs)d=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===ru)d=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,s,r,o,a=Rs){const l=this.elements,c=1/(t-e),u=1/(i-s),h=1/(o-r),f=(t+e)*c,d=(i+s)*u;let g,_;if(a===Rs)g=(o+r)*h,_=-2*h;else if(a===ru)g=r*h,_=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const yo=new z,Ai=new Gt,lT=new z(0,0,0),cT=new z(1,1,1),Ks=new z,hc=new z,qn=new z,Hg=new Gt,Vg=new Wl;class Ns{constructor(e=0,t=0,i=0,s=Ns.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],u=s[9],h=s[2],f=s[6],d=s[10];switch(t){case"XYZ":this._y=Math.asin(Rn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Rn(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Rn(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Rn(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Rn(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Rn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Hg.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Hg,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Vg.setFromEuler(this),this.setFromQuaternion(Vg,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ns.DEFAULT_ORDER="XYZ";class kp{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let uT=0;const Gg=new z,Mo=new Wl,ms=new Gt,fc=new z,ka=new z,hT=new z,fT=new Wl,Wg=new z(1,0,0),Xg=new z(0,1,0),qg=new z(0,0,1),$g={type:"added"},dT={type:"removed"},Eo={type:"childadded",child:null},Ph={type:"childremoved",child:null};class ii extends Ma{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:uT++}),this.uuid=Gl(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ii.DEFAULT_UP.clone();const e=new z,t=new Ns,i=new Wl,s=new z(1,1,1);function r(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Gt},normalMatrix:{value:new it}}),this.matrix=new Gt,this.matrixWorld=new Gt,this.matrixAutoUpdate=ii.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ii.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new kp,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Mo.setFromAxisAngle(e,t),this.quaternion.multiply(Mo),this}rotateOnWorldAxis(e,t){return Mo.setFromAxisAngle(e,t),this.quaternion.premultiply(Mo),this}rotateX(e){return this.rotateOnAxis(Wg,e)}rotateY(e){return this.rotateOnAxis(Xg,e)}rotateZ(e){return this.rotateOnAxis(qg,e)}translateOnAxis(e,t){return Gg.copy(e).applyQuaternion(this.quaternion),this.position.add(Gg.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Wg,e)}translateY(e){return this.translateOnAxis(Xg,e)}translateZ(e){return this.translateOnAxis(qg,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ms.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?fc.copy(e):fc.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),ka.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ms.lookAt(ka,fc,this.up):ms.lookAt(fc,ka,this.up),this.quaternion.setFromRotationMatrix(ms),s&&(ms.extractRotation(s.matrixWorld),Mo.setFromRotationMatrix(ms),this.quaternion.premultiply(Mo.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent($g),Eo.child=e,this.dispatchEvent(Eo),Eo.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(dT),Ph.child=e,this.dispatchEvent(Ph),Ph.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ms.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ms.multiply(e.parent.matrixWorld)),e.applyMatrix4(ms),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent($g),Eo.child=e,this.dispatchEvent(Eo),Eo.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ka,e,hT),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ka,fT,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),h=o(e.shapes),f=o(e.skeletons),d=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),d.length>0&&(i.animations=d),g.length>0&&(i.nodes=g)}return i.object=s,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}ii.DEFAULT_UP=new z(0,1,0);ii.DEFAULT_MATRIX_AUTO_UPDATE=!0;ii.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Ci=new z,gs=new z,Dh=new z,_s=new z,wo=new z,To=new z,Yg=new z,Lh=new z,Ih=new z,Uh=new z,Oh=new Ht,Fh=new Ht,Nh=new Ht;class Li{constructor(e=new z,t=new z,i=new z){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Ci.subVectors(e,t),s.cross(Ci);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){Ci.subVectors(s,t),gs.subVectors(i,t),Dh.subVectors(e,t);const o=Ci.dot(Ci),a=Ci.dot(gs),l=Ci.dot(Dh),c=gs.dot(gs),u=gs.dot(Dh),h=o*c-a*a;if(h===0)return r.set(0,0,0),null;const f=1/h,d=(c*l-a*u)*f,g=(o*u-a*l)*f;return r.set(1-d-g,g,d)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,_s)===null?!1:_s.x>=0&&_s.y>=0&&_s.x+_s.y<=1}static getInterpolation(e,t,i,s,r,o,a,l){return this.getBarycoord(e,t,i,s,_s)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,_s.x),l.addScaledVector(o,_s.y),l.addScaledVector(a,_s.z),l)}static getInterpolatedAttribute(e,t,i,s,r,o){return Oh.setScalar(0),Fh.setScalar(0),Nh.setScalar(0),Oh.fromBufferAttribute(e,t),Fh.fromBufferAttribute(e,i),Nh.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Oh,r.x),o.addScaledVector(Fh,r.y),o.addScaledVector(Nh,r.z),o}static isFrontFacing(e,t,i,s){return Ci.subVectors(i,t),gs.subVectors(e,t),Ci.cross(gs).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ci.subVectors(this.c,this.b),gs.subVectors(this.a,this.b),Ci.cross(gs).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Li.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Li.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return Li.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return Li.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Li.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let o,a;wo.subVectors(s,i),To.subVectors(r,i),Lh.subVectors(e,i);const l=wo.dot(Lh),c=To.dot(Lh);if(l<=0&&c<=0)return t.copy(i);Ih.subVectors(e,s);const u=wo.dot(Ih),h=To.dot(Ih);if(u>=0&&h<=u)return t.copy(s);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(i).addScaledVector(wo,o);Uh.subVectors(e,r);const d=wo.dot(Uh),g=To.dot(Uh);if(g>=0&&d<=g)return t.copy(r);const _=d*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(i).addScaledVector(To,a);const m=u*g-d*h;if(m<=0&&h-u>=0&&d-g>=0)return Yg.subVectors(r,s),a=(h-u)/(h-u+(d-g)),t.copy(s).addScaledVector(Yg,a);const p=1/(m+_+f);return o=_*p,a=f*p,t.copy(i).addScaledVector(wo,o).addScaledVector(To,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Sx={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Zs={h:0,s:0,l:0},dc={h:0,s:0,l:0};function Bh(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class lt{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=zt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ut.toWorkingColorSpace(this,t),this}setRGB(e,t,i,s=ut.workingColorSpace){return this.r=e,this.g=t,this.b=i,ut.toWorkingColorSpace(this,s),this}setHSL(e,t,i,s=ut.workingColorSpace){if(e=Zw(e,1),t=Rn(t,0,1),i=Rn(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,o=2*i-r;this.r=Bh(o,r,e+1/3),this.g=Bh(o,r,e),this.b=Bh(o,r,e-1/3)}return ut.toWorkingColorSpace(this,s),this}setStyle(e,t=zt){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=zt){const i=Sx[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Us(e.r),this.g=Us(e.g),this.b=Us(e.b),this}copyLinearToSRGB(e){return this.r=Zo(e.r),this.g=Zo(e.g),this.b=Zo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=zt){return ut.fromWorkingColorSpace(sn.copy(this),e),Math.round(Rn(sn.r*255,0,255))*65536+Math.round(Rn(sn.g*255,0,255))*256+Math.round(Rn(sn.b*255,0,255))}getHexString(e=zt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ut.workingColorSpace){ut.fromWorkingColorSpace(sn.copy(this),t);const i=sn.r,s=sn.g,r=sn.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case i:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-i)/h+2;break;case r:l=(i-s)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=ut.workingColorSpace){return ut.fromWorkingColorSpace(sn.copy(this),t),e.r=sn.r,e.g=sn.g,e.b=sn.b,e}getStyle(e=zt){ut.fromWorkingColorSpace(sn.copy(this),e);const t=sn.r,i=sn.g,s=sn.b;return e!==zt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(Zs),this.setHSL(Zs.h+e,Zs.s+t,Zs.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Zs),e.getHSL(dc);const i=Sh(Zs.h,dc.h,t),s=Sh(Zs.s,dc.s,t),r=Sh(Zs.l,dc.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const sn=new lt;lt.NAMES=Sx;let pT=0;class ql extends Ma{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:pT++}),this.uuid=Gl(),this.name="",this.blending=jo,this.side=bn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Hf,this.blendDst=Vf,this.blendEquation=$r,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new lt(0,0,0),this.blendAlpha=0,this.depthFunc=la,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Dg,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=_o,this.stencilZFail=_o,this.stencilZPass=_o,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==jo&&(i.blending=this.blending),this.side!==bn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Hf&&(i.blendSrc=this.blendSrc),this.blendDst!==Vf&&(i.blendDst=this.blendDst),this.blendEquation!==$r&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==la&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Dg&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==_o&&(i.stencilFail=this.stencilFail),this.stencilZFail!==_o&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==_o&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class zp extends ql{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new lt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ns,this.combine=ix,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Xt=new z,pc=new qe;class Nn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Lg,this.updateRanges=[],this.gpuType=Cs,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)pc.fromBufferAttribute(this,t),pc.applyMatrix3(e),this.setXY(t,pc.x,pc.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Xt.fromBufferAttribute(this,t),Xt.applyMatrix3(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Xt.fromBufferAttribute(this,t),Xt.applyMatrix4(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Xt.fromBufferAttribute(this,t),Xt.applyNormalMatrix(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Xt.fromBufferAttribute(this,t),Xt.transformDirection(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Fa(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=wn(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Fa(t,this.array)),t}setX(e,t){return this.normalized&&(t=wn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Fa(t,this.array)),t}setY(e,t){return this.normalized&&(t=wn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Fa(t,this.array)),t}setZ(e,t){return this.normalized&&(t=wn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Fa(t,this.array)),t}setW(e,t){return this.normalized&&(t=wn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=wn(t,this.array),i=wn(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=wn(t,this.array),i=wn(i,this.array),s=wn(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=wn(t,this.array),i=wn(i,this.array),s=wn(s,this.array),r=wn(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Lg&&(e.usage=this.usage),e}}class yx extends Nn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Mx extends Nn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Jr extends Nn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let mT=0;const di=new Gt,kh=new ii,Ao=new z,$n=new Xl,za=new Xl,Qt=new z;class Vs extends Ma{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:mT++}),this.uuid=Gl(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(_x(e)?Mx:yx)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new it().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return di.makeRotationFromQuaternion(e),this.applyMatrix4(di),this}rotateX(e){return di.makeRotationX(e),this.applyMatrix4(di),this}rotateY(e){return di.makeRotationY(e),this.applyMatrix4(di),this}rotateZ(e){return di.makeRotationZ(e),this.applyMatrix4(di),this}translate(e,t,i){return di.makeTranslation(e,t,i),this.applyMatrix4(di),this}scale(e,t,i){return di.makeScale(e,t,i),this.applyMatrix4(di),this}lookAt(e){return kh.lookAt(e),kh.updateMatrix(),this.applyMatrix4(kh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ao).negate(),this.translate(Ao.x,Ao.y,Ao.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Jr(i,3))}else{for(let i=0,s=t.count;i<s;i++){const r=e[i];t.setXYZ(i,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Xl);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];$n.setFromBufferAttribute(r),this.morphTargetsRelative?(Qt.addVectors(this.boundingBox.min,$n.min),this.boundingBox.expandByPoint(Qt),Qt.addVectors(this.boundingBox.max,$n.max),this.boundingBox.expandByPoint(Qt)):(this.boundingBox.expandByPoint($n.min),this.boundingBox.expandByPoint($n.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Bp);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new z,1/0);return}if(e){const i=this.boundingSphere.center;if($n.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];za.setFromBufferAttribute(a),this.morphTargetsRelative?(Qt.addVectors($n.min,za.min),$n.expandByPoint(Qt),Qt.addVectors($n.max,za.max),$n.expandByPoint(Qt)):($n.expandByPoint(za.min),$n.expandByPoint(za.max))}$n.getCenter(i);let s=0;for(let r=0,o=e.count;r<o;r++)Qt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Qt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Qt.fromBufferAttribute(a,c),l&&(Ao.fromBufferAttribute(e,c),Qt.add(Ao)),s=Math.max(s,i.distanceToSquared(Qt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Nn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let L=0;L<i.count;L++)a[L]=new z,l[L]=new z;const c=new z,u=new z,h=new z,f=new qe,d=new qe,g=new qe,_=new z,m=new z;function p(L,M,y){c.fromBufferAttribute(i,L),u.fromBufferAttribute(i,M),h.fromBufferAttribute(i,y),f.fromBufferAttribute(r,L),d.fromBufferAttribute(r,M),g.fromBufferAttribute(r,y),u.sub(c),h.sub(c),d.sub(f),g.sub(f);const D=1/(d.x*g.y-g.x*d.y);isFinite(D)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(h,-d.y).multiplyScalar(D),m.copy(h).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(D),a[L].add(_),a[M].add(_),a[y].add(_),l[L].add(m),l[M].add(m),l[y].add(m))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let L=0,M=x.length;L<M;++L){const y=x[L],D=y.start,F=y.count;for(let N=D,K=D+F;N<K;N+=3)p(e.getX(N+0),e.getX(N+1),e.getX(N+2))}const b=new z,v=new z,C=new z,A=new z;function T(L){C.fromBufferAttribute(s,L),A.copy(C);const M=a[L];b.copy(M),b.sub(C.multiplyScalar(C.dot(M))).normalize(),v.crossVectors(A,M);const D=v.dot(l[L])<0?-1:1;o.setXYZW(L,b.x,b.y,b.z,D)}for(let L=0,M=x.length;L<M;++L){const y=x[L],D=y.start,F=y.count;for(let N=D,K=D+F;N<K;N+=3)T(e.getX(N+0)),T(e.getX(N+1)),T(e.getX(N+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Nn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,d=i.count;f<d;f++)i.setXYZ(f,0,0,0);const s=new z,r=new z,o=new z,a=new z,l=new z,c=new z,u=new z,h=new z;if(e)for(let f=0,d=e.count;f<d;f+=3){const g=e.getX(f+0),_=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),a.add(u),l.add(u),c.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,d=t.count;f<d;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Qt.fromBufferAttribute(e,t),Qt.normalize(),e.setXYZ(t,Qt.x,Qt.y,Qt.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,h=a.normalized,f=new c.constructor(l.length*u);let d=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?d=l[_]*a.data.stride+a.offset:d=l[_]*u;for(let p=0;p<u;p++)f[g++]=c[d++]}return new Nn(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Vs,i=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=e(l,i);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let u=0,h=c.length;u<h;u++){const f=c[u],d=e(f,i);l.push(d)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const d=c[h];u.push(d.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const s=e.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(t))}const r=e.morphAttributes;for(const c in r){const u=[],h=r[c];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const jg=new Gt,Or=new bx,mc=new Bp,Kg=new z,gc=new z,_c=new z,vc=new z,zh=new z,xc=new z,Zg=new z,bc=new z;class Nt extends ii{constructor(e=new Vs,t=new zp){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){xc.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=a[l],h=r[l];u!==0&&(zh.fromBufferAttribute(h,e),o?xc.addScaledVector(zh,u):xc.addScaledVector(zh.sub(t),u))}t.add(xc)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),mc.copy(i.boundingSphere),mc.applyMatrix4(r),Or.copy(e.ray).recast(e.near),!(mc.containsPoint(Or.origin)===!1&&(Or.intersectSphere(mc,Kg)===null||Or.origin.distanceToSquared(Kg)>(e.far-e.near)**2))&&(jg.copy(r).invert(),Or.copy(e.ray).applyMatrix4(jg),!(i.boundingBox!==null&&Or.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Or)))}_computeIntersections(e,t,i){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=o[m.materialIndex],x=Math.max(m.start,d.start),b=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let v=x,C=b;v<C;v+=3){const A=a.getX(v),T=a.getX(v+1),L=a.getX(v+2);s=Sc(this,p,e,i,c,u,h,A,T,L),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const x=a.getX(m),b=a.getX(m+1),v=a.getX(m+2);s=Sc(this,o,e,i,c,u,h,x,b,v),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=o[m.materialIndex],x=Math.max(m.start,d.start),b=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let v=x,C=b;v<C;v+=3){const A=v,T=v+1,L=v+2;s=Sc(this,p,e,i,c,u,h,A,T,L),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const x=m,b=m+1,v=m+2;s=Sc(this,o,e,i,c,u,h,x,b,v),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function gT(n,e,t,i,s,r,o,a){let l;if(e.side===Fn?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,e.side===bn,a),l===null)return null;bc.copy(a),bc.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(bc);return c<t.near||c>t.far?null:{distance:c,point:bc.clone(),object:n}}function Sc(n,e,t,i,s,r,o,a,l,c){n.getVertexPosition(a,gc),n.getVertexPosition(l,_c),n.getVertexPosition(c,vc);const u=gT(n,e,t,i,gc,_c,vc,Zg);if(u){const h=new z;Li.getBarycoord(Zg,gc,_c,vc,h),s&&(u.uv=Li.getInterpolatedAttribute(s,a,l,c,h,new qe)),r&&(u.uv1=Li.getInterpolatedAttribute(r,a,l,c,h,new qe)),o&&(u.normal=Li.getInterpolatedAttribute(o,a,l,c,h,new z),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new z,materialIndex:0};Li.getNormal(gc,_c,vc,f.normal),u.face=f,u.barycoord=h}return u}class $l extends Vs{constructor(e=1,t=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],u=[],h=[];let f=0,d=0;g("z","y","x",-1,-1,i,t,e,o,r,0),g("z","y","x",1,-1,i,t,-e,o,r,1),g("x","z","y",1,1,e,i,t,s,o,2),g("x","z","y",1,-1,e,i,-t,s,o,3),g("x","y","z",1,-1,e,t,i,s,r,4),g("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Jr(c,3)),this.setAttribute("normal",new Jr(u,3)),this.setAttribute("uv",new Jr(h,2));function g(_,m,p,x,b,v,C,A,T,L,M){const y=v/T,D=C/L,F=v/2,N=C/2,K=A/2,j=T+1,H=L+1;let W=0,B=0;const pe=new z;for(let be=0;be<H;be++){const ue=be*D-N;for(let ce=0;ce<j;ce++){const he=ce*y-F;pe[_]=he*x,pe[m]=ue*b,pe[p]=K,c.push(pe.x,pe.y,pe.z),pe[_]=0,pe[m]=0,pe[p]=A>0?1:-1,u.push(pe.x,pe.y,pe.z),h.push(ce/T),h.push(1-be/L),W+=1}}for(let be=0;be<L;be++)for(let ue=0;ue<T;ue++){const ce=f+ue+j*be,he=f+ue+j*(be+1),k=f+(ue+1)+j*(be+1),G=f+(ue+1)+j*be;l.push(ce,he,G),l.push(he,k,G),B+=6}a.addGroup(d,B,M),d+=B,f+=W}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $l(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ha(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function pn(n){const e={};for(let t=0;t<n.length;t++){const i=ha(n[t]);for(const s in i)e[s]=i[s]}return e}function _T(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Ex(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ut.workingColorSpace}const vT={clone:ha,merge:pn};var xT=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,bT=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Wt extends ql{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=xT,this.fragmentShader=bT,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ha(e.uniforms),this.uniformsGroups=_T(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Vu extends ii{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Gt,this.projectionMatrix=new Gt,this.projectionMatrixInverse=new Gt,this.coordinateSystem=Rs}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Qs=new z,Qg=new qe,Jg=new qe;class Pn extends Vu{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=wd*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(bh*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return wd*2*Math.atan(Math.tan(bh*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Qs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Qs.x,Qs.y).multiplyScalar(-e/Qs.z),Qs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Qs.x,Qs.y).multiplyScalar(-e/Qs.z)}getViewSize(e,t){return this.getViewBounds(e,Qg,Jg),t.subVectors(Jg,Qg)}setViewOffset(e,t,i,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(bh*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Co=-90,Ro=1;class ST extends ii{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Pn(Co,Ro,e,t);s.layers=this.layers,this.add(s);const r=new Pn(Co,Ro,e,t);r.layers=this.layers,this.add(r);const o=new Pn(Co,Ro,e,t);o.layers=this.layers,this.add(o);const a=new Pn(Co,Ro,e,t);a.layers=this.layers,this.add(a);const l=new Pn(Co,Ro,e,t);l.layers=this.layers,this.add(l);const c=new Pn(Co,Ro,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===Rs)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ru)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,r),e.setRenderTarget(i,1,s),e.render(t,o),e.setRenderTarget(i,2,s),e.render(t,a),e.setRenderTarget(i,3,s),e.render(t,l),e.setRenderTarget(i,4,s),e.render(t,c),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,s),e.render(t,u),e.setRenderTarget(h,f,d),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class wx extends cn{constructor(e,t,i,s,r,o,a,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:ca,super(e,t,i,s,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class yT extends ai{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new wx(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Un}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new $l(5,5,5),r=new Wt({name:"CubemapFromEquirect",uniforms:ha(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Fn,blending:Is});r.uniforms.tEquirect.value=t;const o=new Nt(s,r),a=t.minFilter;return t.minFilter===Kr&&(t.minFilter=Un),new ST(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,i,s){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,s);e.setRenderTarget(r)}}const Hh=new z,MT=new z,ET=new it;class Wr{constructor(e=new z(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=Hh.subVectors(i,t).cross(MT.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Hh),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||ET.getNormalMatrix(e),s=this.coplanarPoint(Hh).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Fr=new Bp,yc=new z;class Tx{constructor(e=new Wr,t=new Wr,i=new Wr,s=new Wr,r=new Wr,o=new Wr){this.planes=[e,t,i,s,r,o]}set(e,t,i,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Rs){const i=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],u=s[5],h=s[6],f=s[7],d=s[8],g=s[9],_=s[10],m=s[11],p=s[12],x=s[13],b=s[14],v=s[15];if(i[0].setComponents(l-r,f-c,m-d,v-p).normalize(),i[1].setComponents(l+r,f+c,m+d,v+p).normalize(),i[2].setComponents(l+o,f+u,m+g,v+x).normalize(),i[3].setComponents(l-o,f-u,m-g,v-x).normalize(),i[4].setComponents(l-a,f-h,m-_,v-b).normalize(),t===Rs)i[5].setComponents(l+a,f+h,m+_,v+b).normalize();else if(t===ru)i[5].setComponents(a,h,_,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Fr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Fr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Fr)}intersectsSprite(e){return Fr.center.set(0,0,0),Fr.radius=.7071067811865476,Fr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Fr)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(yc.x=s.normal.x>0?e.max.x:e.min.x,yc.y=s.normal.y>0?e.max.y:e.min.y,yc.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(yc)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Ax(){let n=null,e=!1,t=null,i=null;function s(r,o){t(r,o),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function wT(n){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,h=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,u),a.onUploadCallback();let d;if(c instanceof Float32Array)d=n.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=n.SHORT;else if(c instanceof Uint32Array)d=n.UNSIGNED_INT;else if(c instanceof Int32Array)d=n.INT;else if(c instanceof Int8Array)d=n.BYTE;else if(c instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function i(a,l,c){const u=l.array,h=l.updateRanges;if(n.bindBuffer(c,a),h.length===0)n.bufferSubData(c,0,u);else{h.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<h.length;d++){const g=h[f],_=h[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,h[f]=_)}h.length=f+1;for(let d=0,g=h.length;d<g;d++){const _=h[d];n.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(n.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}class Sn extends Vs{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(i),l=Math.floor(s),c=a+1,u=l+1,h=e/a,f=t/l,d=[],g=[],_=[],m=[];for(let p=0;p<u;p++){const x=p*f-o;for(let b=0;b<c;b++){const v=b*h-r;g.push(v,-x,0),_.push(0,0,1),m.push(b/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let x=0;x<a;x++){const b=x+c*p,v=x+c*(p+1),C=x+1+c*(p+1),A=x+1+c*p;d.push(b,v,A),d.push(v,C,A)}this.setIndex(d),this.setAttribute("position",new Jr(g,3)),this.setAttribute("normal",new Jr(_,3)),this.setAttribute("uv",new Jr(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Sn(e.width,e.height,e.widthSegments,e.heightSegments)}}var TT=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,AT=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,CT=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,RT=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,PT=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,DT=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,LT=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,IT=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,UT=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,OT=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,FT=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,NT=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,BT=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,kT=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,zT=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,HT=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,VT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,GT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,WT=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,XT=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,qT=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,$T=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,YT=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,jT=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,KT=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,ZT=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,QT=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,JT=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,e1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,t1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,n1="gl_FragColor = linearToOutputTexel( gl_FragColor );",i1=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,s1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,r1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,o1=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,a1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,l1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,c1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,u1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,h1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,f1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,d1=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,p1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,m1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,g1=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,_1=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,v1=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,x1=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,b1=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,S1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,y1=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,M1=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,E1=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,w1=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,T1=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,A1=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,C1=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,R1=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,P1=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,D1=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,L1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,I1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,U1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,O1=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,F1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,N1=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,B1=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,k1=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,z1=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,H1=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,V1=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,G1=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,W1=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,X1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,q1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$1=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Y1=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,j1=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,K1=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Z1=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Q1=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,J1=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,eA=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,tA=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,nA=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,iA=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,sA=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,rA=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,oA=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,aA=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,lA=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,cA=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,uA=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,hA=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,fA=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,dA=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,pA=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,mA=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,gA=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,_A=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,vA=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,xA=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,bA=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,SA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,yA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,MA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,EA=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const wA=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,TA=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,AA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,CA=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,RA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,PA=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,DA=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,LA=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,IA=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,UA=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,OA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,FA=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,NA=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,BA=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,kA=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,zA=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,HA=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,VA=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,GA=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,WA=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,XA=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,qA=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,$A=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,YA=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jA=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,KA=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ZA=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,QA=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,JA=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,eC=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,tC=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,nC=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,iC=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sC=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,rt={alphahash_fragment:TT,alphahash_pars_fragment:AT,alphamap_fragment:CT,alphamap_pars_fragment:RT,alphatest_fragment:PT,alphatest_pars_fragment:DT,aomap_fragment:LT,aomap_pars_fragment:IT,batching_pars_vertex:UT,batching_vertex:OT,begin_vertex:FT,beginnormal_vertex:NT,bsdfs:BT,iridescence_fragment:kT,bumpmap_pars_fragment:zT,clipping_planes_fragment:HT,clipping_planes_pars_fragment:VT,clipping_planes_pars_vertex:GT,clipping_planes_vertex:WT,color_fragment:XT,color_pars_fragment:qT,color_pars_vertex:$T,color_vertex:YT,common:jT,cube_uv_reflection_fragment:KT,defaultnormal_vertex:ZT,displacementmap_pars_vertex:QT,displacementmap_vertex:JT,emissivemap_fragment:e1,emissivemap_pars_fragment:t1,colorspace_fragment:n1,colorspace_pars_fragment:i1,envmap_fragment:s1,envmap_common_pars_fragment:r1,envmap_pars_fragment:o1,envmap_pars_vertex:a1,envmap_physical_pars_fragment:v1,envmap_vertex:l1,fog_vertex:c1,fog_pars_vertex:u1,fog_fragment:h1,fog_pars_fragment:f1,gradientmap_pars_fragment:d1,lightmap_pars_fragment:p1,lights_lambert_fragment:m1,lights_lambert_pars_fragment:g1,lights_pars_begin:_1,lights_toon_fragment:x1,lights_toon_pars_fragment:b1,lights_phong_fragment:S1,lights_phong_pars_fragment:y1,lights_physical_fragment:M1,lights_physical_pars_fragment:E1,lights_fragment_begin:w1,lights_fragment_maps:T1,lights_fragment_end:A1,logdepthbuf_fragment:C1,logdepthbuf_pars_fragment:R1,logdepthbuf_pars_vertex:P1,logdepthbuf_vertex:D1,map_fragment:L1,map_pars_fragment:I1,map_particle_fragment:U1,map_particle_pars_fragment:O1,metalnessmap_fragment:F1,metalnessmap_pars_fragment:N1,morphinstance_vertex:B1,morphcolor_vertex:k1,morphnormal_vertex:z1,morphtarget_pars_vertex:H1,morphtarget_vertex:V1,normal_fragment_begin:G1,normal_fragment_maps:W1,normal_pars_fragment:X1,normal_pars_vertex:q1,normal_vertex:$1,normalmap_pars_fragment:Y1,clearcoat_normal_fragment_begin:j1,clearcoat_normal_fragment_maps:K1,clearcoat_pars_fragment:Z1,iridescence_pars_fragment:Q1,opaque_fragment:J1,packing:eA,premultiplied_alpha_fragment:tA,project_vertex:nA,dithering_fragment:iA,dithering_pars_fragment:sA,roughnessmap_fragment:rA,roughnessmap_pars_fragment:oA,shadowmap_pars_fragment:aA,shadowmap_pars_vertex:lA,shadowmap_vertex:cA,shadowmask_pars_fragment:uA,skinbase_vertex:hA,skinning_pars_vertex:fA,skinning_vertex:dA,skinnormal_vertex:pA,specularmap_fragment:mA,specularmap_pars_fragment:gA,tonemapping_fragment:_A,tonemapping_pars_fragment:vA,transmission_fragment:xA,transmission_pars_fragment:bA,uv_pars_fragment:SA,uv_pars_vertex:yA,uv_vertex:MA,worldpos_vertex:EA,background_vert:wA,background_frag:TA,backgroundCube_vert:AA,backgroundCube_frag:CA,cube_vert:RA,cube_frag:PA,depth_vert:DA,depth_frag:LA,distanceRGBA_vert:IA,distanceRGBA_frag:UA,equirect_vert:OA,equirect_frag:FA,linedashed_vert:NA,linedashed_frag:BA,meshbasic_vert:kA,meshbasic_frag:zA,meshlambert_vert:HA,meshlambert_frag:VA,meshmatcap_vert:GA,meshmatcap_frag:WA,meshnormal_vert:XA,meshnormal_frag:qA,meshphong_vert:$A,meshphong_frag:YA,meshphysical_vert:jA,meshphysical_frag:KA,meshtoon_vert:ZA,meshtoon_frag:QA,points_vert:JA,points_frag:eC,shadow_vert:tC,shadow_frag:nC,sprite_vert:iC,sprite_frag:sC},De={common:{diffuse:{value:new lt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new it},alphaMap:{value:null},alphaMapTransform:{value:new it},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new it}},envmap:{envMap:{value:null},envMapRotation:{value:new it},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new it}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new it}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new it},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new it},normalScale:{value:new qe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new it},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new it}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new it}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new it}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new lt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new lt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new it},alphaTest:{value:0},uvTransform:{value:new it}},sprite:{diffuse:{value:new lt(16777215)},opacity:{value:1},center:{value:new qe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new it},alphaMap:{value:null},alphaMapTransform:{value:new it},alphaTest:{value:0}}},ji={basic:{uniforms:pn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.fog]),vertexShader:rt.meshbasic_vert,fragmentShader:rt.meshbasic_frag},lambert:{uniforms:pn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new lt(0)}}]),vertexShader:rt.meshlambert_vert,fragmentShader:rt.meshlambert_frag},phong:{uniforms:pn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new lt(0)},specular:{value:new lt(1118481)},shininess:{value:30}}]),vertexShader:rt.meshphong_vert,fragmentShader:rt.meshphong_frag},standard:{uniforms:pn([De.common,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.roughnessmap,De.metalnessmap,De.fog,De.lights,{emissive:{value:new lt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:rt.meshphysical_vert,fragmentShader:rt.meshphysical_frag},toon:{uniforms:pn([De.common,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.gradientmap,De.fog,De.lights,{emissive:{value:new lt(0)}}]),vertexShader:rt.meshtoon_vert,fragmentShader:rt.meshtoon_frag},matcap:{uniforms:pn([De.common,De.bumpmap,De.normalmap,De.displacementmap,De.fog,{matcap:{value:null}}]),vertexShader:rt.meshmatcap_vert,fragmentShader:rt.meshmatcap_frag},points:{uniforms:pn([De.points,De.fog]),vertexShader:rt.points_vert,fragmentShader:rt.points_frag},dashed:{uniforms:pn([De.common,De.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:rt.linedashed_vert,fragmentShader:rt.linedashed_frag},depth:{uniforms:pn([De.common,De.displacementmap]),vertexShader:rt.depth_vert,fragmentShader:rt.depth_frag},normal:{uniforms:pn([De.common,De.bumpmap,De.normalmap,De.displacementmap,{opacity:{value:1}}]),vertexShader:rt.meshnormal_vert,fragmentShader:rt.meshnormal_frag},sprite:{uniforms:pn([De.sprite,De.fog]),vertexShader:rt.sprite_vert,fragmentShader:rt.sprite_frag},background:{uniforms:{uvTransform:{value:new it},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:rt.background_vert,fragmentShader:rt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new it}},vertexShader:rt.backgroundCube_vert,fragmentShader:rt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:rt.cube_vert,fragmentShader:rt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:rt.equirect_vert,fragmentShader:rt.equirect_frag},distanceRGBA:{uniforms:pn([De.common,De.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:rt.distanceRGBA_vert,fragmentShader:rt.distanceRGBA_frag},shadow:{uniforms:pn([De.lights,De.fog,{color:{value:new lt(0)},opacity:{value:1}}]),vertexShader:rt.shadow_vert,fragmentShader:rt.shadow_frag}};ji.physical={uniforms:pn([ji.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new it},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new it},clearcoatNormalScale:{value:new qe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new it},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new it},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new it},sheen:{value:0},sheenColor:{value:new lt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new it},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new it},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new it},transmissionSamplerSize:{value:new qe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new it},attenuationDistance:{value:0},attenuationColor:{value:new lt(0)},specularColor:{value:new lt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new it},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new it},anisotropyVector:{value:new qe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new it}}]),vertexShader:rt.meshphysical_vert,fragmentShader:rt.meshphysical_frag};const Mc={r:0,b:0,g:0},Nr=new Ns,rC=new Gt;function oC(n,e,t,i,s,r,o){const a=new lt(0);let l=r===!0?0:1,c,u,h=null,f=0,d=null;function g(x){let b=x.isScene===!0?x.background:null;return b&&b.isTexture&&(b=(x.backgroundBlurriness>0?t:e).get(b)),b}function _(x){let b=!1;const v=g(x);v===null?p(a,l):v&&v.isColor&&(p(v,1),b=!0);const C=n.xr.getEnvironmentBlendMode();C==="additive"?i.buffers.color.setClear(0,0,0,1,o):C==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||b)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(x,b){const v=g(b);v&&(v.isCubeTexture||v.mapping===zu)?(u===void 0&&(u=new Nt(new $l(1,1,1),new Wt({name:"BackgroundCubeMaterial",uniforms:ha(ji.backgroundCube.uniforms),vertexShader:ji.backgroundCube.vertexShader,fragmentShader:ji.backgroundCube.fragmentShader,side:Fn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(C,A,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),Nr.copy(b.backgroundRotation),Nr.x*=-1,Nr.y*=-1,Nr.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Nr.y*=-1,Nr.z*=-1),u.material.uniforms.envMap.value=v,u.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(rC.makeRotationFromEuler(Nr)),u.material.toneMapped=ut.getTransfer(v.colorSpace)!==yt,(h!==v||f!==v.version||d!==n.toneMapping)&&(u.material.needsUpdate=!0,h=v,f=v.version,d=n.toneMapping),u.layers.enableAll(),x.unshift(u,u.geometry,u.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new Nt(new Sn(2,2),new Wt({name:"BackgroundMaterial",uniforms:ha(ji.background.uniforms),vertexShader:ji.background.vertexShader,fragmentShader:ji.background.fragmentShader,side:bn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.toneMapped=ut.getTransfer(v.colorSpace)!==yt,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||f!==v.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,h=v,f=v.version,d=n.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function p(x,b){x.getRGB(Mc,Ex(n)),i.buffers.color.setClear(Mc.r,Mc.g,Mc.b,b,o)}return{getClearColor:function(){return a},setClearColor:function(x,b=1){a.set(x),l=b,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,p(a,l)},render:_,addToRenderList:m}}function aC(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=f(null);let r=s,o=!1;function a(y,D,F,N,K){let j=!1;const H=h(N,F,D);r!==H&&(r=H,c(r.object)),j=d(y,N,F,K),j&&g(y,N,F,K),K!==null&&e.update(K,n.ELEMENT_ARRAY_BUFFER),(j||o)&&(o=!1,v(y,D,F,N),K!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(K).buffer))}function l(){return n.createVertexArray()}function c(y){return n.bindVertexArray(y)}function u(y){return n.deleteVertexArray(y)}function h(y,D,F){const N=F.wireframe===!0;let K=i[y.id];K===void 0&&(K={},i[y.id]=K);let j=K[D.id];j===void 0&&(j={},K[D.id]=j);let H=j[N];return H===void 0&&(H=f(l()),j[N]=H),H}function f(y){const D=[],F=[],N=[];for(let K=0;K<t;K++)D[K]=0,F[K]=0,N[K]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:F,attributeDivisors:N,object:y,attributes:{},index:null}}function d(y,D,F,N){const K=r.attributes,j=D.attributes;let H=0;const W=F.getAttributes();for(const B in W)if(W[B].location>=0){const be=K[B];let ue=j[B];if(ue===void 0&&(B==="instanceMatrix"&&y.instanceMatrix&&(ue=y.instanceMatrix),B==="instanceColor"&&y.instanceColor&&(ue=y.instanceColor)),be===void 0||be.attribute!==ue||ue&&be.data!==ue.data)return!0;H++}return r.attributesNum!==H||r.index!==N}function g(y,D,F,N){const K={},j=D.attributes;let H=0;const W=F.getAttributes();for(const B in W)if(W[B].location>=0){let be=j[B];be===void 0&&(B==="instanceMatrix"&&y.instanceMatrix&&(be=y.instanceMatrix),B==="instanceColor"&&y.instanceColor&&(be=y.instanceColor));const ue={};ue.attribute=be,be&&be.data&&(ue.data=be.data),K[B]=ue,H++}r.attributes=K,r.attributesNum=H,r.index=N}function _(){const y=r.newAttributes;for(let D=0,F=y.length;D<F;D++)y[D]=0}function m(y){p(y,0)}function p(y,D){const F=r.newAttributes,N=r.enabledAttributes,K=r.attributeDivisors;F[y]=1,N[y]===0&&(n.enableVertexAttribArray(y),N[y]=1),K[y]!==D&&(n.vertexAttribDivisor(y,D),K[y]=D)}function x(){const y=r.newAttributes,D=r.enabledAttributes;for(let F=0,N=D.length;F<N;F++)D[F]!==y[F]&&(n.disableVertexAttribArray(F),D[F]=0)}function b(y,D,F,N,K,j,H){H===!0?n.vertexAttribIPointer(y,D,F,K,j):n.vertexAttribPointer(y,D,F,N,K,j)}function v(y,D,F,N){_();const K=N.attributes,j=F.getAttributes(),H=D.defaultAttributeValues;for(const W in j){const B=j[W];if(B.location>=0){let pe=K[W];if(pe===void 0&&(W==="instanceMatrix"&&y.instanceMatrix&&(pe=y.instanceMatrix),W==="instanceColor"&&y.instanceColor&&(pe=y.instanceColor)),pe!==void 0){const be=pe.normalized,ue=pe.itemSize,ce=e.get(pe);if(ce===void 0)continue;const he=ce.buffer,k=ce.type,G=ce.bytesPerElement,ie=k===n.INT||k===n.UNSIGNED_INT||pe.gpuType===Lp;if(pe.isInterleavedBufferAttribute){const U=pe.data,Y=U.stride,Z=pe.offset;if(U.isInstancedInterleavedBuffer){for(let re=0;re<B.locationSize;re++)p(B.location+re,U.meshPerAttribute);y.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=U.meshPerAttribute*U.count)}else for(let re=0;re<B.locationSize;re++)m(B.location+re);n.bindBuffer(n.ARRAY_BUFFER,he);for(let re=0;re<B.locationSize;re++)b(B.location+re,ue/B.locationSize,k,be,Y*G,(Z+ue/B.locationSize*re)*G,ie)}else{if(pe.isInstancedBufferAttribute){for(let U=0;U<B.locationSize;U++)p(B.location+U,pe.meshPerAttribute);y.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=pe.meshPerAttribute*pe.count)}else for(let U=0;U<B.locationSize;U++)m(B.location+U);n.bindBuffer(n.ARRAY_BUFFER,he);for(let U=0;U<B.locationSize;U++)b(B.location+U,ue/B.locationSize,k,be,ue*G,ue/B.locationSize*U*G,ie)}}else if(H!==void 0){const be=H[W];if(be!==void 0)switch(be.length){case 2:n.vertexAttrib2fv(B.location,be);break;case 3:n.vertexAttrib3fv(B.location,be);break;case 4:n.vertexAttrib4fv(B.location,be);break;default:n.vertexAttrib1fv(B.location,be)}}}}x()}function C(){L();for(const y in i){const D=i[y];for(const F in D){const N=D[F];for(const K in N)u(N[K].object),delete N[K];delete D[F]}delete i[y]}}function A(y){if(i[y.id]===void 0)return;const D=i[y.id];for(const F in D){const N=D[F];for(const K in N)u(N[K].object),delete N[K];delete D[F]}delete i[y.id]}function T(y){for(const D in i){const F=i[D];if(F[y.id]===void 0)continue;const N=F[y.id];for(const K in N)u(N[K].object),delete N[K];delete F[y.id]}}function L(){M(),o=!0,r!==s&&(r=s,c(r.object))}function M(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:L,resetDefaultState:M,dispose:C,releaseStatesOfGeometry:A,releaseStatesOfProgram:T,initAttributes:_,enableAttribute:m,disableUnusedAttributes:x}}function lC(n,e,t){let i;function s(c){i=c}function r(c,u){n.drawArrays(i,c,u),t.update(u,i,1)}function o(c,u,h){h!==0&&(n.drawArraysInstanced(i,c,u,h),t.update(u,i,h))}function a(c,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,h);let d=0;for(let g=0;g<h;g++)d+=u[g];t.update(d,i,1)}function l(c,u,h,f){if(h===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<c.length;g++)o(c[g],u[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(i,c,0,u,0,f,0,h);let g=0;for(let _=0;_<h;_++)g+=u[_]*f[_];t.update(g,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function cC(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(T){return!(T!==vi&&i.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(T){const L=T===Fs&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==oi&&i.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==Cs&&!L)}function l(T){if(T==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),x=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),b=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,A=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:x,maxVaryings:b,maxFragmentUniforms:v,vertexTextures:C,maxSamples:A}}function uC(n){const e=this;let t=null,i=0,s=!1,r=!1;const o=new Wr,a=new it,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const d=h.length!==0||f||i!==0||s;return s=f,i=h.length,d},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,d){const g=h.clippingPlanes,_=h.clipIntersection,m=h.clipShadows,p=n.get(h);if(!s||g===null||g.length===0||r&&!m)r?u(null):c();else{const x=r?0:i,b=x*4;let v=p.clippingState||null;l.value=v,v=u(g,f,b,d);for(let C=0;C!==b;++C)v[C]=t[C];p.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(h,f,d,g){const _=h!==null?h.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=d+_*4,x=f.matrixWorldInverse;a.getNormalMatrix(x),(m===null||m.length<p)&&(m=new Float32Array(p));for(let b=0,v=d;b!==_;++b,v+=4)o.copy(h[b]).applyMatrix4(x,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function hC(n){let e=new WeakMap;function t(o,a){return a===Kf?o.mapping=ca:a===Zf&&(o.mapping=ua),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Kf||a===Zf)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new yT(l.height);return c.fromEquirectangularTexture(n,o),e.set(o,c),o.addEventListener("dispose",s),t(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}class fC extends Vu{constructor(e=-1,t=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,o=i+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Fo=4,e_=[.125,.215,.35,.446,.526,.582],Yr=20,Vh=new fC,t_=new lt;let Gh=null,Wh=0,Xh=0,qh=!1;const Xr=(1+Math.sqrt(5))/2,Po=1/Xr,n_=[new z(-Xr,Po,0),new z(Xr,Po,0),new z(-Po,0,Xr),new z(Po,0,Xr),new z(0,Xr,-Po),new z(0,Xr,Po),new z(-1,1,-1),new z(1,1,-1),new z(-1,1,1),new z(1,1,1)];class i_{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100){Gh=this._renderer.getRenderTarget(),Wh=this._renderer.getActiveCubeFace(),Xh=this._renderer.getActiveMipmapLevel(),qh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,i,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=o_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=r_(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Gh,Wh,Xh),this._renderer.xr.enabled=qh,e.scissorTest=!1,Ec(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ca||e.mapping===ua?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Gh=this._renderer.getRenderTarget(),Wh=this._renderer.getActiveCubeFace(),Xh=this._renderer.getActiveMipmapLevel(),qh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Un,minFilter:Un,generateMipmaps:!1,type:Fs,format:vi,colorSpace:ya,depthBuffer:!1},s=s_(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=s_(e,t,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=dC(r)),this._blurMaterial=pC(r,e,t)}return s}_compileMaterial(e){const t=new Nt(this._lodPlanes[0],e);this._renderer.compile(t,Vh)}_sceneToCubeUV(e,t,i,s){const a=new Pn(90,1,t,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(t_),u.toneMapping=dr,u.autoClear=!1;const d=new zp({name:"PMREM.Background",side:Fn,depthWrite:!1,depthTest:!1}),g=new Nt(new $l,d);let _=!1;const m=e.background;m?m.isColor&&(d.color.copy(m),e.background=null,_=!0):(d.color.copy(t_),_=!0);for(let p=0;p<6;p++){const x=p%3;x===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):x===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const b=this._cubeSize;Ec(s,x*b,p>2?b:0,b,b),u.setRenderTarget(s),_&&u.render(g,a),u.render(e,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=h,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===ca||e.mapping===ua;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=o_()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=r_());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new Nt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;Ec(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,Vh)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=n_[(s-r-1)%n_.length];this._blur(e,r-1,r,o,a)}t.autoClear=i}_blur(e,t,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,s,"latitudinal",r),this._halfBlur(o,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new Nt(this._lodPlanes[s],c),f=c.uniforms,d=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*Yr-1),_=r/g,m=isFinite(r)?1+Math.floor(u*_):Yr;m>Yr&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Yr}`);const p=[];let x=0;for(let T=0;T<Yr;++T){const L=T/_,M=Math.exp(-L*L/2);p.push(M),T===0?x+=M:T<m&&(x+=2*M)}for(let T=0;T<p.length;T++)p[T]=p[T]/x;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:b}=this;f.dTheta.value=g,f.mipInt.value=b-i;const v=this._sizeLods[s],C=3*v*(s>b-Fo?s-b+Fo:0),A=4*(this._cubeSize-v);Ec(t,C,A,3*v,2*v),l.setRenderTarget(t),l.render(h,Vh)}}function dC(n){const e=[],t=[],i=[];let s=n;const r=n-Fo+1+e_.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let l=1/a;o>n-Fo?l=e_[o-n+Fo-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,g=6,_=3,m=2,p=1,x=new Float32Array(_*g*d),b=new Float32Array(m*g*d),v=new Float32Array(p*g*d);for(let A=0;A<d;A++){const T=A%3*2/3-1,L=A>2?0:-1,M=[T,L,0,T+2/3,L,0,T+2/3,L+1,0,T,L,0,T+2/3,L+1,0,T,L+1,0];x.set(M,_*g*A),b.set(f,m*g*A);const y=[A,A,A,A,A,A];v.set(y,p*g*A)}const C=new Vs;C.setAttribute("position",new Nn(x,_)),C.setAttribute("uv",new Nn(b,m)),C.setAttribute("faceIndex",new Nn(v,p)),e.push(C),s>Fo&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function s_(n,e,t){const i=new ai(n,e,t);return i.texture.mapping=zu,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ec(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function pC(n,e,t){const i=new Float32Array(Yr),s=new z(0,1,0);return new Wt({name:"SphericalGaussianBlur",defines:{n:Yr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Hp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Is,depthTest:!1,depthWrite:!1})}function r_(){return new Wt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Hp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Is,depthTest:!1,depthWrite:!1})}function o_(){return new Wt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Hp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Is,depthTest:!1,depthWrite:!1})}function Hp(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function mC(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===Kf||l===Zf,u=l===ca||l===ua;if(c||u){let h=e.get(a);const f=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new i_(n)),h=c?t.fromEquirectangular(a,h):t.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),h.texture;if(h!==void 0)return h.texture;{const d=a.image;return c&&d&&d.height>0||u&&d&&s(d)?(t===null&&(t=new i_(n)),h=c?t.fromEquirectangular(a):t.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),a.addEventListener("dispose",r),h.texture):null}}}return a}function s(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function gC(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&Za("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function _C(n,e,t,i){const s={},r=new WeakMap;function o(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);for(const g in f.morphAttributes){const _=f.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)e.remove(_[m])}f.removeEventListener("dispose",o),delete s[f.id];const d=r.get(f);d&&(e.remove(d),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(h,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,t.memory.geometries++),f}function l(h){const f=h.attributes;for(const g in f)e.update(f[g],n.ARRAY_BUFFER);const d=h.morphAttributes;for(const g in d){const _=d[g];for(let m=0,p=_.length;m<p;m++)e.update(_[m],n.ARRAY_BUFFER)}}function c(h){const f=[],d=h.index,g=h.attributes.position;let _=0;if(d!==null){const x=d.array;_=d.version;for(let b=0,v=x.length;b<v;b+=3){const C=x[b+0],A=x[b+1],T=x[b+2];f.push(C,A,A,T,T,C)}}else if(g!==void 0){const x=g.array;_=g.version;for(let b=0,v=x.length/3-1;b<v;b+=3){const C=b+0,A=b+1,T=b+2;f.push(C,A,A,T,T,C)}}else return;const m=new(_x(f)?Mx:yx)(f,1);m.version=_;const p=r.get(h);p&&e.remove(p),r.set(h,m)}function u(h){const f=r.get(h);if(f){const d=h.index;d!==null&&f.version<d.version&&c(h)}else c(h);return r.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function vC(n,e,t){let i;function s(f){i=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function l(f,d){n.drawElements(i,d,r,f*o),t.update(d,i,1)}function c(f,d,g){g!==0&&(n.drawElementsInstanced(i,d,r,f*o,g),t.update(d,i,g))}function u(f,d,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,r,f,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];t.update(m,i,1)}function h(f,d,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)c(f[p]/o,d[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(i,d,0,r,f,0,_,0,g);let p=0;for(let x=0;x<g;x++)p+=d[x]*_[x];t.update(p,i,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function xC(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(r/3);break;case n.LINES:t.lines+=a*(r/2);break;case n.LINE_STRIP:t.lines+=a*(r-1);break;case n.LINE_LOOP:t.lines+=a*r;break;case n.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function bC(n,e,t){const i=new WeakMap,s=new Ht;function r(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let f=i.get(a);if(f===void 0||f.count!==h){let y=function(){L.dispose(),i.delete(a),a.removeEventListener("dispose",y)};var d=y;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],x=a.morphAttributes.normal||[],b=a.morphAttributes.color||[];let v=0;g===!0&&(v=1),_===!0&&(v=2),m===!0&&(v=3);let C=a.attributes.position.count*v,A=1;C>e.maxTextureSize&&(A=Math.ceil(C/e.maxTextureSize),C=e.maxTextureSize);const T=new Float32Array(C*A*4*h),L=new xx(T,C,A,h);L.type=Cs,L.needsUpdate=!0;const M=v*4;for(let D=0;D<h;D++){const F=p[D],N=x[D],K=b[D],j=C*A*4*D;for(let H=0;H<F.count;H++){const W=H*M;g===!0&&(s.fromBufferAttribute(F,H),T[j+W+0]=s.x,T[j+W+1]=s.y,T[j+W+2]=s.z,T[j+W+3]=0),_===!0&&(s.fromBufferAttribute(N,H),T[j+W+4]=s.x,T[j+W+5]=s.y,T[j+W+6]=s.z,T[j+W+7]=0),m===!0&&(s.fromBufferAttribute(K,H),T[j+W+8]=s.x,T[j+W+9]=s.y,T[j+W+10]=s.z,T[j+W+11]=K.itemSize===4?s.w:1)}}f={count:h,texture:L,size:new qe(C,A)},i.set(a,f),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const _=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",_),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:r}}function SC(n,e,t,i){let s=new WeakMap;function r(l){const c=i.render.frame,u=l.geometry,h=e.get(l,u);if(s.get(h)!==c&&(e.update(h),s.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return h}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}class Vp extends cn{constructor(e,t,i,s,r,o,a,l,c,u=Ko){if(u!==Ko&&u!==lo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===Ko&&(i=xr),i===void 0&&u===lo&&(i=ao),super(null,s,r,o,a,l,u,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:vn,this.minFilter=l!==void 0?l:vn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Cx=new cn,a_=new Vp(1,1),Rx=new xx,Px=new oT,Dx=new wx,l_=[],c_=[],u_=new Float32Array(16),h_=new Float32Array(9),f_=new Float32Array(4);function Ea(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=l_[s];if(r===void 0&&(r=new Float32Array(s),l_[s]=r),e!==0){i.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(r,a)}return r}function jt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Kt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Gu(n,e){let t=c_[e];t===void 0&&(t=new Int32Array(e),c_[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function yC(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function MC(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(jt(t,e))return;n.uniform2fv(this.addr,e),Kt(t,e)}}function EC(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(jt(t,e))return;n.uniform3fv(this.addr,e),Kt(t,e)}}function wC(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(jt(t,e))return;n.uniform4fv(this.addr,e),Kt(t,e)}}function TC(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(jt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Kt(t,e)}else{if(jt(t,i))return;f_.set(i),n.uniformMatrix2fv(this.addr,!1,f_),Kt(t,i)}}function AC(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(jt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Kt(t,e)}else{if(jt(t,i))return;h_.set(i),n.uniformMatrix3fv(this.addr,!1,h_),Kt(t,i)}}function CC(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(jt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Kt(t,e)}else{if(jt(t,i))return;u_.set(i),n.uniformMatrix4fv(this.addr,!1,u_),Kt(t,i)}}function RC(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function PC(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(jt(t,e))return;n.uniform2iv(this.addr,e),Kt(t,e)}}function DC(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(jt(t,e))return;n.uniform3iv(this.addr,e),Kt(t,e)}}function LC(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(jt(t,e))return;n.uniform4iv(this.addr,e),Kt(t,e)}}function IC(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function UC(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(jt(t,e))return;n.uniform2uiv(this.addr,e),Kt(t,e)}}function OC(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(jt(t,e))return;n.uniform3uiv(this.addr,e),Kt(t,e)}}function FC(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(jt(t,e))return;n.uniform4uiv(this.addr,e),Kt(t,e)}}function NC(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(a_.compareFunction=gx,r=a_):r=Cx,t.setTexture2D(e||r,s)}function BC(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||Px,s)}function kC(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||Dx,s)}function zC(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Rx,s)}function HC(n){switch(n){case 5126:return yC;case 35664:return MC;case 35665:return EC;case 35666:return wC;case 35674:return TC;case 35675:return AC;case 35676:return CC;case 5124:case 35670:return RC;case 35667:case 35671:return PC;case 35668:case 35672:return DC;case 35669:case 35673:return LC;case 5125:return IC;case 36294:return UC;case 36295:return OC;case 36296:return FC;case 35678:case 36198:case 36298:case 36306:case 35682:return NC;case 35679:case 36299:case 36307:return BC;case 35680:case 36300:case 36308:case 36293:return kC;case 36289:case 36303:case 36311:case 36292:return zC}}function VC(n,e){n.uniform1fv(this.addr,e)}function GC(n,e){const t=Ea(e,this.size,2);n.uniform2fv(this.addr,t)}function WC(n,e){const t=Ea(e,this.size,3);n.uniform3fv(this.addr,t)}function XC(n,e){const t=Ea(e,this.size,4);n.uniform4fv(this.addr,t)}function qC(n,e){const t=Ea(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function $C(n,e){const t=Ea(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function YC(n,e){const t=Ea(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function jC(n,e){n.uniform1iv(this.addr,e)}function KC(n,e){n.uniform2iv(this.addr,e)}function ZC(n,e){n.uniform3iv(this.addr,e)}function QC(n,e){n.uniform4iv(this.addr,e)}function JC(n,e){n.uniform1uiv(this.addr,e)}function eR(n,e){n.uniform2uiv(this.addr,e)}function tR(n,e){n.uniform3uiv(this.addr,e)}function nR(n,e){n.uniform4uiv(this.addr,e)}function iR(n,e,t){const i=this.cache,s=e.length,r=Gu(t,s);jt(i,r)||(n.uniform1iv(this.addr,r),Kt(i,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||Cx,r[o])}function sR(n,e,t){const i=this.cache,s=e.length,r=Gu(t,s);jt(i,r)||(n.uniform1iv(this.addr,r),Kt(i,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Px,r[o])}function rR(n,e,t){const i=this.cache,s=e.length,r=Gu(t,s);jt(i,r)||(n.uniform1iv(this.addr,r),Kt(i,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Dx,r[o])}function oR(n,e,t){const i=this.cache,s=e.length,r=Gu(t,s);jt(i,r)||(n.uniform1iv(this.addr,r),Kt(i,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Rx,r[o])}function aR(n){switch(n){case 5126:return VC;case 35664:return GC;case 35665:return WC;case 35666:return XC;case 35674:return qC;case 35675:return $C;case 35676:return YC;case 5124:case 35670:return jC;case 35667:case 35671:return KC;case 35668:case 35672:return ZC;case 35669:case 35673:return QC;case 5125:return JC;case 36294:return eR;case 36295:return tR;case 36296:return nR;case 35678:case 36198:case 36298:case 36306:case 35682:return iR;case 35679:case 36299:case 36307:return sR;case 35680:case 36300:case 36308:case 36293:return rR;case 36289:case 36303:case 36311:case 36292:return oR}}class lR{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=HC(t.type)}}class cR{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=aR(t.type)}}class uR{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],i)}}}const $h=/(\w+)(\])?(\[|\.)?/g;function d_(n,e){n.seq.push(e),n.map[e.id]=e}function hR(n,e,t){const i=n.name,s=i.length;for($h.lastIndex=0;;){const r=$h.exec(i),o=$h.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){d_(t,c===void 0?new lR(a,n,e):new cR(a,n,e));break}else{let h=t.map[a];h===void 0&&(h=new uR(a),d_(t,h)),t=h}}}class Xc{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);hR(r,o,this)}}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&i.push(o)}return i}}function p_(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const fR=37297;let dR=0;function pR(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}const m_=new it;function mR(n){ut._getMatrix(m_,ut.workingColorSpace,n);const e=`mat3( ${m_.elements.map(t=>t.toFixed(4))} )`;switch(ut.getTransfer(n)){case Hu:return[e,"LinearTransferOETF"];case yt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function g_(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=n.getShaderInfoLog(e).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+pR(n.getShaderSource(e),o)}else return s}function gR(n,e){const t=mR(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function _R(n,e){let t;switch(e){case Iw:t="Linear";break;case Uw:t="Reinhard";break;case Ow:t="Cineon";break;case Fw:t="ACESFilmic";break;case Bw:t="AgX";break;case kw:t="Neutral";break;case Nw:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const wc=new z;function vR(){ut.getLuminanceCoefficients(wc);const n=wc.x.toFixed(4),e=wc.y.toFixed(4),t=wc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function xR(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Qa).join(`
`)}function bR(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function SR(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Qa(n){return n!==""}function __(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function v_(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const yR=/^[ \t]*#include +<([\w\d./]+)>/gm;function Td(n){return n.replace(yR,ER)}const MR=new Map;function ER(n,e){let t=rt[e];if(t===void 0){const i=MR.get(e);if(i!==void 0)t=rt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Td(t)}const wR=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function x_(n){return n.replace(wR,TR)}function TR(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function b_(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function AR(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===nx?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===fw?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===vs&&(e="SHADOWMAP_TYPE_VSM"),e}function CR(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case ca:case ua:e="ENVMAP_TYPE_CUBE";break;case zu:e="ENVMAP_TYPE_CUBE_UV";break}return e}function RR(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case ua:e="ENVMAP_MODE_REFRACTION";break}return e}function PR(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case ix:e="ENVMAP_BLENDING_MULTIPLY";break;case Dw:e="ENVMAP_BLENDING_MIX";break;case Lw:e="ENVMAP_BLENDING_ADD";break}return e}function DR(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function LR(n,e,t,i){const s=n.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=AR(t),c=CR(t),u=RR(t),h=PR(t),f=DR(t),d=xR(t),g=bR(r),_=s.createProgram();let m,p,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Qa).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Qa).join(`
`),p.length>0&&(p+=`
`)):(m=[b_(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Qa).join(`
`),p=[b_(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==dr?"#define TONE_MAPPING":"",t.toneMapping!==dr?rt.tonemapping_pars_fragment:"",t.toneMapping!==dr?_R("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",rt.colorspace_pars_fragment,gR("linearToOutputTexel",t.outputColorSpace),vR(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Qa).join(`
`)),o=Td(o),o=__(o,t),o=v_(o,t),a=Td(a),a=__(a,t),a=v_(a,t),o=x_(o),a=x_(a),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Ig?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ig?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const b=x+m+o,v=x+p+a,C=p_(s,s.VERTEX_SHADER,b),A=p_(s,s.FRAGMENT_SHADER,v);s.attachShader(_,C),s.attachShader(_,A),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function T(D){if(n.debug.checkShaderErrors){const F=s.getProgramInfoLog(_).trim(),N=s.getShaderInfoLog(C).trim(),K=s.getShaderInfoLog(A).trim();let j=!0,H=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(j=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,_,C,A);else{const W=g_(s,C,"vertex"),B=g_(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+F+`
`+W+`
`+B)}else F!==""?console.warn("THREE.WebGLProgram: Program Info Log:",F):(N===""||K==="")&&(H=!1);H&&(D.diagnostics={runnable:j,programLog:F,vertexShader:{log:N,prefix:m},fragmentShader:{log:K,prefix:p}})}s.deleteShader(C),s.deleteShader(A),L=new Xc(s,_),M=SR(s,_)}let L;this.getUniforms=function(){return L===void 0&&T(this),L};let M;this.getAttributes=function(){return M===void 0&&T(this),M};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(_,fR)),y},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=dR++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=C,this.fragmentShader=A,this}let IR=0;class UR{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new OR(e),t.set(e,i)),i}}class OR{constructor(e){this.id=IR++,this.code=e,this.usedTimes=0}}function FR(n,e,t,i,s,r,o){const a=new kp,l=new UR,c=new Set,u=[],h=s.logarithmicDepthBuffer,f=s.vertexTextures;let d=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return c.add(M),M===0?"uv":`uv${M}`}function m(M,y,D,F,N){const K=F.fog,j=N.geometry,H=M.isMeshStandardMaterial?F.environment:null,W=(M.isMeshStandardMaterial?t:e).get(M.envMap||H),B=W&&W.mapping===zu?W.image.height:null,pe=g[M.type];M.precision!==null&&(d=s.getMaxPrecision(M.precision),d!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",d,"instead."));const be=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,ue=be!==void 0?be.length:0;let ce=0;j.morphAttributes.position!==void 0&&(ce=1),j.morphAttributes.normal!==void 0&&(ce=2),j.morphAttributes.color!==void 0&&(ce=3);let he,k,G,ie;if(pe){const pt=ji[pe];he=pt.vertexShader,k=pt.fragmentShader}else he=M.vertexShader,k=M.fragmentShader,l.update(M),G=l.getVertexShaderID(M),ie=l.getFragmentShaderID(M);const U=n.getRenderTarget(),Y=n.state.buffers.depth.getReversed(),Z=N.isInstancedMesh===!0,re=N.isBatchedMesh===!0,Pe=!!M.map,P=!!M.matcap,I=!!W,E=!!M.aoMap,se=!!M.lightMap,J=!!M.bumpMap,Q=!!M.normalMap,le=!!M.displacementMap,de=!!M.emissiveMap,ee=!!M.metalnessMap,w=!!M.roughnessMap,S=M.anisotropy>0,O=M.clearcoat>0,q=M.dispersion>0,ne=M.iridescence>0,te=M.sheen>0,Ee=M.transmission>0,ve=S&&!!M.anisotropyMap,Te=O&&!!M.clearcoatMap,Xe=O&&!!M.clearcoatNormalMap,xe=O&&!!M.clearcoatRoughnessMap,Ce=ne&&!!M.iridescenceMap,ke=ne&&!!M.iridescenceThicknessMap,$e=te&&!!M.sheenColorMap,Ae=te&&!!M.sheenRoughnessMap,Ye=!!M.specularMap,We=!!M.specularColorMap,dt=!!M.specularIntensityMap,V=Ee&&!!M.transmissionMap,Re=Ee&&!!M.thicknessMap,fe=!!M.gradientMap,ge=!!M.alphaMap,Le=M.alphaTest>0,Ie=!!M.alphaHash,tt=!!M.extensions;let bt=dr;M.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(bt=n.toneMapping);const Zt={shaderID:pe,shaderType:M.type,shaderName:M.name,vertexShader:he,fragmentShader:k,defines:M.defines,customVertexShaderID:G,customFragmentShaderID:ie,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:d,batching:re,batchingColor:re&&N._colorsTexture!==null,instancing:Z,instancingColor:Z&&N.instanceColor!==null,instancingMorph:Z&&N.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:U===null?n.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:ya,alphaToCoverage:!!M.alphaToCoverage,map:Pe,matcap:P,envMap:I,envMapMode:I&&W.mapping,envMapCubeUVHeight:B,aoMap:E,lightMap:se,bumpMap:J,normalMap:Q,displacementMap:f&&le,emissiveMap:de,normalMapObjectSpace:Q&&M.normalMapType===Gw,normalMapTangentSpace:Q&&M.normalMapType===Vw,metalnessMap:ee,roughnessMap:w,anisotropy:S,anisotropyMap:ve,clearcoat:O,clearcoatMap:Te,clearcoatNormalMap:Xe,clearcoatRoughnessMap:xe,dispersion:q,iridescence:ne,iridescenceMap:Ce,iridescenceThicknessMap:ke,sheen:te,sheenColorMap:$e,sheenRoughnessMap:Ae,specularMap:Ye,specularColorMap:We,specularIntensityMap:dt,transmission:Ee,transmissionMap:V,thicknessMap:Re,gradientMap:fe,opaque:M.transparent===!1&&M.blending===jo&&M.alphaToCoverage===!1,alphaMap:ge,alphaTest:Le,alphaHash:Ie,combine:M.combine,mapUv:Pe&&_(M.map.channel),aoMapUv:E&&_(M.aoMap.channel),lightMapUv:se&&_(M.lightMap.channel),bumpMapUv:J&&_(M.bumpMap.channel),normalMapUv:Q&&_(M.normalMap.channel),displacementMapUv:le&&_(M.displacementMap.channel),emissiveMapUv:de&&_(M.emissiveMap.channel),metalnessMapUv:ee&&_(M.metalnessMap.channel),roughnessMapUv:w&&_(M.roughnessMap.channel),anisotropyMapUv:ve&&_(M.anisotropyMap.channel),clearcoatMapUv:Te&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:Xe&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:xe&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Ce&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:ke&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:$e&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:Ae&&_(M.sheenRoughnessMap.channel),specularMapUv:Ye&&_(M.specularMap.channel),specularColorMapUv:We&&_(M.specularColorMap.channel),specularIntensityMapUv:dt&&_(M.specularIntensityMap.channel),transmissionMapUv:V&&_(M.transmissionMap.channel),thicknessMapUv:Re&&_(M.thicknessMap.channel),alphaMapUv:ge&&_(M.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(Q||S),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!j.attributes.uv&&(Pe||ge),fog:!!K,useFog:M.fog===!0,fogExp2:!!K&&K.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:Y,skinning:N.isSkinnedMesh===!0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:ue,morphTextureStride:ce,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:n.shadowMap.enabled&&D.length>0,shadowMapType:n.shadowMap.type,toneMapping:bt,decodeVideoTexture:Pe&&M.map.isVideoTexture===!0&&ut.getTransfer(M.map.colorSpace)===yt,decodeVideoTextureEmissive:de&&M.emissiveMap.isVideoTexture===!0&&ut.getTransfer(M.emissiveMap.colorSpace)===yt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Es,flipSided:M.side===Fn,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:tt&&M.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(tt&&M.extensions.multiDraw===!0||re)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return Zt.vertexUv1s=c.has(1),Zt.vertexUv2s=c.has(2),Zt.vertexUv3s=c.has(3),c.clear(),Zt}function p(M){const y=[];if(M.shaderID?y.push(M.shaderID):(y.push(M.customVertexShaderID),y.push(M.customFragmentShaderID)),M.defines!==void 0)for(const D in M.defines)y.push(D),y.push(M.defines[D]);return M.isRawShaderMaterial===!1&&(x(y,M),b(y,M),y.push(n.outputColorSpace)),y.push(M.customProgramCacheKey),y.join()}function x(M,y){M.push(y.precision),M.push(y.outputColorSpace),M.push(y.envMapMode),M.push(y.envMapCubeUVHeight),M.push(y.mapUv),M.push(y.alphaMapUv),M.push(y.lightMapUv),M.push(y.aoMapUv),M.push(y.bumpMapUv),M.push(y.normalMapUv),M.push(y.displacementMapUv),M.push(y.emissiveMapUv),M.push(y.metalnessMapUv),M.push(y.roughnessMapUv),M.push(y.anisotropyMapUv),M.push(y.clearcoatMapUv),M.push(y.clearcoatNormalMapUv),M.push(y.clearcoatRoughnessMapUv),M.push(y.iridescenceMapUv),M.push(y.iridescenceThicknessMapUv),M.push(y.sheenColorMapUv),M.push(y.sheenRoughnessMapUv),M.push(y.specularMapUv),M.push(y.specularColorMapUv),M.push(y.specularIntensityMapUv),M.push(y.transmissionMapUv),M.push(y.thicknessMapUv),M.push(y.combine),M.push(y.fogExp2),M.push(y.sizeAttenuation),M.push(y.morphTargetsCount),M.push(y.morphAttributeCount),M.push(y.numDirLights),M.push(y.numPointLights),M.push(y.numSpotLights),M.push(y.numSpotLightMaps),M.push(y.numHemiLights),M.push(y.numRectAreaLights),M.push(y.numDirLightShadows),M.push(y.numPointLightShadows),M.push(y.numSpotLightShadows),M.push(y.numSpotLightShadowsWithMaps),M.push(y.numLightProbes),M.push(y.shadowMapType),M.push(y.toneMapping),M.push(y.numClippingPlanes),M.push(y.numClipIntersection),M.push(y.depthPacking)}function b(M,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),M.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reverseDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),M.push(a.mask)}function v(M){const y=g[M.type];let D;if(y){const F=ji[y];D=vT.clone(F.uniforms)}else D=M.uniforms;return D}function C(M,y){let D;for(let F=0,N=u.length;F<N;F++){const K=u[F];if(K.cacheKey===y){D=K,++D.usedTimes;break}}return D===void 0&&(D=new LR(n,y,M,r),u.push(D)),D}function A(M){if(--M.usedTimes===0){const y=u.indexOf(M);u[y]=u[u.length-1],u.pop(),M.destroy()}}function T(M){l.remove(M)}function L(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:C,releaseProgram:A,releaseShaderCache:T,programs:u,dispose:L}}function NR(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,l){n.get(o)[a]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function BR(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function S_(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function y_(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function o(h,f,d,g,_,m){let p=n[e];return p===void 0?(p={id:h.id,object:h,geometry:f,material:d,groupOrder:g,renderOrder:h.renderOrder,z:_,group:m},n[e]=p):(p.id=h.id,p.object=h,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=h.renderOrder,p.z=_,p.group=m),e++,p}function a(h,f,d,g,_,m){const p=o(h,f,d,g,_,m);d.transmission>0?i.push(p):d.transparent===!0?s.push(p):t.push(p)}function l(h,f,d,g,_,m){const p=o(h,f,d,g,_,m);d.transmission>0?i.unshift(p):d.transparent===!0?s.unshift(p):t.unshift(p)}function c(h,f){t.length>1&&t.sort(h||BR),i.length>1&&i.sort(f||S_),s.length>1&&s.sort(f||S_)}function u(){for(let h=e,f=n.length;h<f;h++){const d=n[h];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:a,unshift:l,finish:u,sort:c}}function kR(){let n=new WeakMap;function e(i,s){const r=n.get(i);let o;return r===void 0?(o=new y_,n.set(i,[o])):s>=r.length?(o=new y_,r.push(o)):o=r[s],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function zR(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new z,color:new lt};break;case"SpotLight":t={position:new z,direction:new z,color:new lt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new z,color:new lt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new z,skyColor:new lt,groundColor:new lt};break;case"RectAreaLight":t={color:new lt,position:new z,halfWidth:new z,halfHeight:new z};break}return n[e.id]=t,t}}}function HR(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let VR=0;function GR(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function WR(n){const e=new zR,t=HR(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new z);const s=new z,r=new Gt,o=new Gt;function a(c){let u=0,h=0,f=0;for(let M=0;M<9;M++)i.probe[M].set(0,0,0);let d=0,g=0,_=0,m=0,p=0,x=0,b=0,v=0,C=0,A=0,T=0;c.sort(GR);for(let M=0,y=c.length;M<y;M++){const D=c[M],F=D.color,N=D.intensity,K=D.distance,j=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)u+=F.r*N,h+=F.g*N,f+=F.b*N;else if(D.isLightProbe){for(let H=0;H<9;H++)i.probe[H].addScaledVector(D.sh.coefficients[H],N);T++}else if(D.isDirectionalLight){const H=e.get(D);if(H.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const W=D.shadow,B=t.get(D);B.shadowIntensity=W.intensity,B.shadowBias=W.bias,B.shadowNormalBias=W.normalBias,B.shadowRadius=W.radius,B.shadowMapSize=W.mapSize,i.directionalShadow[d]=B,i.directionalShadowMap[d]=j,i.directionalShadowMatrix[d]=D.shadow.matrix,x++}i.directional[d]=H,d++}else if(D.isSpotLight){const H=e.get(D);H.position.setFromMatrixPosition(D.matrixWorld),H.color.copy(F).multiplyScalar(N),H.distance=K,H.coneCos=Math.cos(D.angle),H.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),H.decay=D.decay,i.spot[_]=H;const W=D.shadow;if(D.map&&(i.spotLightMap[C]=D.map,C++,W.updateMatrices(D),D.castShadow&&A++),i.spotLightMatrix[_]=W.matrix,D.castShadow){const B=t.get(D);B.shadowIntensity=W.intensity,B.shadowBias=W.bias,B.shadowNormalBias=W.normalBias,B.shadowRadius=W.radius,B.shadowMapSize=W.mapSize,i.spotShadow[_]=B,i.spotShadowMap[_]=j,v++}_++}else if(D.isRectAreaLight){const H=e.get(D);H.color.copy(F).multiplyScalar(N),H.halfWidth.set(D.width*.5,0,0),H.halfHeight.set(0,D.height*.5,0),i.rectArea[m]=H,m++}else if(D.isPointLight){const H=e.get(D);if(H.color.copy(D.color).multiplyScalar(D.intensity),H.distance=D.distance,H.decay=D.decay,D.castShadow){const W=D.shadow,B=t.get(D);B.shadowIntensity=W.intensity,B.shadowBias=W.bias,B.shadowNormalBias=W.normalBias,B.shadowRadius=W.radius,B.shadowMapSize=W.mapSize,B.shadowCameraNear=W.camera.near,B.shadowCameraFar=W.camera.far,i.pointShadow[g]=B,i.pointShadowMap[g]=j,i.pointShadowMatrix[g]=D.shadow.matrix,b++}i.point[g]=H,g++}else if(D.isHemisphereLight){const H=e.get(D);H.skyColor.copy(D.color).multiplyScalar(N),H.groundColor.copy(D.groundColor).multiplyScalar(N),i.hemi[p]=H,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=De.LTC_FLOAT_1,i.rectAreaLTC2=De.LTC_FLOAT_2):(i.rectAreaLTC1=De.LTC_HALF_1,i.rectAreaLTC2=De.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=h,i.ambient[2]=f;const L=i.hash;(L.directionalLength!==d||L.pointLength!==g||L.spotLength!==_||L.rectAreaLength!==m||L.hemiLength!==p||L.numDirectionalShadows!==x||L.numPointShadows!==b||L.numSpotShadows!==v||L.numSpotMaps!==C||L.numLightProbes!==T)&&(i.directional.length=d,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=x,i.directionalShadowMap.length=x,i.pointShadow.length=b,i.pointShadowMap.length=b,i.spotShadow.length=v,i.spotShadowMap.length=v,i.directionalShadowMatrix.length=x,i.pointShadowMatrix.length=b,i.spotLightMatrix.length=v+C-A,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=T,L.directionalLength=d,L.pointLength=g,L.spotLength=_,L.rectAreaLength=m,L.hemiLength=p,L.numDirectionalShadows=x,L.numPointShadows=b,L.numSpotShadows=v,L.numSpotMaps=C,L.numLightProbes=T,i.version=VR++)}function l(c,u){let h=0,f=0,d=0,g=0,_=0;const m=u.matrixWorldInverse;for(let p=0,x=c.length;p<x;p++){const b=c[p];if(b.isDirectionalLight){const v=i.directional[h];v.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),h++}else if(b.isSpotLight){const v=i.spot[d];v.position.setFromMatrixPosition(b.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),d++}else if(b.isRectAreaLight){const v=i.rectArea[g];v.position.setFromMatrixPosition(b.matrixWorld),v.position.applyMatrix4(m),o.identity(),r.copy(b.matrixWorld),r.premultiply(m),o.extractRotation(r),v.halfWidth.set(b.width*.5,0,0),v.halfHeight.set(0,b.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),g++}else if(b.isPointLight){const v=i.point[f];v.position.setFromMatrixPosition(b.matrixWorld),v.position.applyMatrix4(m),f++}else if(b.isHemisphereLight){const v=i.hemi[_];v.direction.setFromMatrixPosition(b.matrixWorld),v.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:i}}function M_(n){const e=new WR(n),t=[],i=[];function s(u){c.camera=u,t.length=0,i.length=0}function r(u){t.push(u)}function o(u){i.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function XR(n){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new M_(n),e.set(s,[a])):r>=o.length?(a=new M_(n),o.push(a)):a=o[r],a}function i(){e=new WeakMap}return{get:t,dispose:i}}class qR extends ql{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=mx,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class $R extends ql{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const YR=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,jR=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function KR(n,e,t){let i=new Tx;const s=new qe,r=new qe,o=new Ht,a=new qR({depthPacking:Hw}),l=new $R,c={},u=t.maxTextureSize,h={[bn]:Fn,[Fn]:bn,[Es]:Es},f=new Wt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new qe},radius:{value:4}},vertexShader:YR,fragmentShader:jR}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new Vs;g.setAttribute("position",new Nn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Nt(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=nx;let p=this.type;this.render=function(A,T,L){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const M=n.getRenderTarget(),y=n.getActiveCubeFace(),D=n.getActiveMipmapLevel(),F=n.state;F.setBlending(Is),F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const N=p!==vs&&this.type===vs,K=p===vs&&this.type!==vs;for(let j=0,H=A.length;j<H;j++){const W=A[j],B=W.shadow;if(B===void 0){console.warn("THREE.WebGLShadowMap:",W,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;s.copy(B.mapSize);const pe=B.getFrameExtents();if(s.multiply(pe),r.copy(B.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/pe.x),s.x=r.x*pe.x,B.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/pe.y),s.y=r.y*pe.y,B.mapSize.y=r.y)),B.map===null||N===!0||K===!0){const ue=this.type!==vs?{minFilter:vn,magFilter:vn}:{};B.map!==null&&B.map.dispose(),B.map=new ai(s.x,s.y,ue),B.map.texture.name=W.name+".shadowMap",B.camera.updateProjectionMatrix()}n.setRenderTarget(B.map),n.clear();const be=B.getViewportCount();for(let ue=0;ue<be;ue++){const ce=B.getViewport(ue);o.set(r.x*ce.x,r.y*ce.y,r.x*ce.z,r.y*ce.w),F.viewport(o),B.updateMatrices(W,ue),i=B.getFrustum(),v(T,L,B.camera,W,this.type)}B.isPointLightShadow!==!0&&this.type===vs&&x(B,L),B.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(M,y,D)};function x(A,T){const L=e.update(_);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,d.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new ai(s.x,s.y)),f.uniforms.shadow_pass.value=A.map.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(T,null,L,f,_,null),d.uniforms.shadow_pass.value=A.mapPass.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(T,null,L,d,_,null)}function b(A,T,L,M){let y=null;const D=L.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(D!==void 0)y=D;else if(y=L.isPointLight===!0?l:a,n.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const F=y.uuid,N=T.uuid;let K=c[F];K===void 0&&(K={},c[F]=K);let j=K[N];j===void 0&&(j=y.clone(),K[N]=j,T.addEventListener("dispose",C)),y=j}if(y.visible=T.visible,y.wireframe=T.wireframe,M===vs?y.side=T.shadowSide!==null?T.shadowSide:T.side:y.side=T.shadowSide!==null?T.shadowSide:h[T.side],y.alphaMap=T.alphaMap,y.alphaTest=T.alphaTest,y.map=T.map,y.clipShadows=T.clipShadows,y.clippingPlanes=T.clippingPlanes,y.clipIntersection=T.clipIntersection,y.displacementMap=T.displacementMap,y.displacementScale=T.displacementScale,y.displacementBias=T.displacementBias,y.wireframeLinewidth=T.wireframeLinewidth,y.linewidth=T.linewidth,L.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const F=n.properties.get(y);F.light=L}return y}function v(A,T,L,M,y){if(A.visible===!1)return;if(A.layers.test(T.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&y===vs)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,A.matrixWorld);const N=e.update(A),K=A.material;if(Array.isArray(K)){const j=N.groups;for(let H=0,W=j.length;H<W;H++){const B=j[H],pe=K[B.materialIndex];if(pe&&pe.visible){const be=b(A,pe,M,y);A.onBeforeShadow(n,A,T,L,N,be,B),n.renderBufferDirect(L,null,N,be,A,B),A.onAfterShadow(n,A,T,L,N,be,B)}}}else if(K.visible){const j=b(A,K,M,y);A.onBeforeShadow(n,A,T,L,N,j,null),n.renderBufferDirect(L,null,N,j,A,null),A.onAfterShadow(n,A,T,L,N,j,null)}}const F=A.children;for(let N=0,K=F.length;N<K;N++)v(F[N],T,L,M,y)}function C(A){A.target.removeEventListener("dispose",C);for(const L in c){const M=c[L],y=A.target.uuid;y in M&&(M[y].dispose(),delete M[y])}}}const ZR={[Gf]:Wf,[Xf]:Yf,[qf]:jf,[la]:$f,[Wf]:Gf,[Yf]:Xf,[jf]:qf,[$f]:la};function QR(n,e){function t(){let V=!1;const Re=new Ht;let fe=null;const ge=new Ht(0,0,0,0);return{setMask:function(Le){fe!==Le&&!V&&(n.colorMask(Le,Le,Le,Le),fe=Le)},setLocked:function(Le){V=Le},setClear:function(Le,Ie,tt,bt,Zt){Zt===!0&&(Le*=bt,Ie*=bt,tt*=bt),Re.set(Le,Ie,tt,bt),ge.equals(Re)===!1&&(n.clearColor(Le,Ie,tt,bt),ge.copy(Re))},reset:function(){V=!1,fe=null,ge.set(-1,0,0,0)}}}function i(){let V=!1,Re=!1,fe=null,ge=null,Le=null;return{setReversed:function(Ie){if(Re!==Ie){const tt=e.get("EXT_clip_control");Re?tt.clipControlEXT(tt.LOWER_LEFT_EXT,tt.ZERO_TO_ONE_EXT):tt.clipControlEXT(tt.LOWER_LEFT_EXT,tt.NEGATIVE_ONE_TO_ONE_EXT);const bt=Le;Le=null,this.setClear(bt)}Re=Ie},getReversed:function(){return Re},setTest:function(Ie){Ie?U(n.DEPTH_TEST):Y(n.DEPTH_TEST)},setMask:function(Ie){fe!==Ie&&!V&&(n.depthMask(Ie),fe=Ie)},setFunc:function(Ie){if(Re&&(Ie=ZR[Ie]),ge!==Ie){switch(Ie){case Gf:n.depthFunc(n.NEVER);break;case Wf:n.depthFunc(n.ALWAYS);break;case Xf:n.depthFunc(n.LESS);break;case la:n.depthFunc(n.LEQUAL);break;case qf:n.depthFunc(n.EQUAL);break;case $f:n.depthFunc(n.GEQUAL);break;case Yf:n.depthFunc(n.GREATER);break;case jf:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ge=Ie}},setLocked:function(Ie){V=Ie},setClear:function(Ie){Le!==Ie&&(Re&&(Ie=1-Ie),n.clearDepth(Ie),Le=Ie)},reset:function(){V=!1,fe=null,ge=null,Le=null,Re=!1}}}function s(){let V=!1,Re=null,fe=null,ge=null,Le=null,Ie=null,tt=null,bt=null,Zt=null;return{setTest:function(pt){V||(pt?U(n.STENCIL_TEST):Y(n.STENCIL_TEST))},setMask:function(pt){Re!==pt&&!V&&(n.stencilMask(pt),Re=pt)},setFunc:function(pt,yn,Mn){(fe!==pt||ge!==yn||Le!==Mn)&&(n.stencilFunc(pt,yn,Mn),fe=pt,ge=yn,Le=Mn)},setOp:function(pt,yn,Mn){(Ie!==pt||tt!==yn||bt!==Mn)&&(n.stencilOp(pt,yn,Mn),Ie=pt,tt=yn,bt=Mn)},setLocked:function(pt){V=pt},setClear:function(pt){Zt!==pt&&(n.clearStencil(pt),Zt=pt)},reset:function(){V=!1,Re=null,fe=null,ge=null,Le=null,Ie=null,tt=null,bt=null,Zt=null}}}const r=new t,o=new i,a=new s,l=new WeakMap,c=new WeakMap;let u={},h={},f=new WeakMap,d=[],g=null,_=!1,m=null,p=null,x=null,b=null,v=null,C=null,A=null,T=new lt(0,0,0),L=0,M=!1,y=null,D=null,F=null,N=null,K=null;const j=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,W=0;const B=n.getParameter(n.VERSION);B.indexOf("WebGL")!==-1?(W=parseFloat(/^WebGL (\d)/.exec(B)[1]),H=W>=1):B.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec(B)[1]),H=W>=2);let pe=null,be={};const ue=n.getParameter(n.SCISSOR_BOX),ce=n.getParameter(n.VIEWPORT),he=new Ht().fromArray(ue),k=new Ht().fromArray(ce);function G(V,Re,fe,ge){const Le=new Uint8Array(4),Ie=n.createTexture();n.bindTexture(V,Ie),n.texParameteri(V,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(V,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let tt=0;tt<fe;tt++)V===n.TEXTURE_3D||V===n.TEXTURE_2D_ARRAY?n.texImage3D(Re,0,n.RGBA,1,1,ge,0,n.RGBA,n.UNSIGNED_BYTE,Le):n.texImage2D(Re+tt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Le);return Ie}const ie={};ie[n.TEXTURE_2D]=G(n.TEXTURE_2D,n.TEXTURE_2D,1),ie[n.TEXTURE_CUBE_MAP]=G(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ie[n.TEXTURE_2D_ARRAY]=G(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ie[n.TEXTURE_3D]=G(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),U(n.DEPTH_TEST),o.setFunc(la),J(!1),Q(Ag),U(n.CULL_FACE),E(Is);function U(V){u[V]!==!0&&(n.enable(V),u[V]=!0)}function Y(V){u[V]!==!1&&(n.disable(V),u[V]=!1)}function Z(V,Re){return h[V]!==Re?(n.bindFramebuffer(V,Re),h[V]=Re,V===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=Re),V===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=Re),!0):!1}function re(V,Re){let fe=d,ge=!1;if(V){fe=f.get(Re),fe===void 0&&(fe=[],f.set(Re,fe));const Le=V.textures;if(fe.length!==Le.length||fe[0]!==n.COLOR_ATTACHMENT0){for(let Ie=0,tt=Le.length;Ie<tt;Ie++)fe[Ie]=n.COLOR_ATTACHMENT0+Ie;fe.length=Le.length,ge=!0}}else fe[0]!==n.BACK&&(fe[0]=n.BACK,ge=!0);ge&&n.drawBuffers(fe)}function Pe(V){return g!==V?(n.useProgram(V),g=V,!0):!1}const P={[$r]:n.FUNC_ADD,[pw]:n.FUNC_SUBTRACT,[mw]:n.FUNC_REVERSE_SUBTRACT};P[gw]=n.MIN,P[_w]=n.MAX;const I={[vw]:n.ZERO,[xw]:n.ONE,[bw]:n.SRC_COLOR,[Hf]:n.SRC_ALPHA,[Tw]:n.SRC_ALPHA_SATURATE,[Ew]:n.DST_COLOR,[yw]:n.DST_ALPHA,[Sw]:n.ONE_MINUS_SRC_COLOR,[Vf]:n.ONE_MINUS_SRC_ALPHA,[ww]:n.ONE_MINUS_DST_COLOR,[Mw]:n.ONE_MINUS_DST_ALPHA,[Aw]:n.CONSTANT_COLOR,[Cw]:n.ONE_MINUS_CONSTANT_COLOR,[Rw]:n.CONSTANT_ALPHA,[Pw]:n.ONE_MINUS_CONSTANT_ALPHA};function E(V,Re,fe,ge,Le,Ie,tt,bt,Zt,pt){if(V===Is){_===!0&&(Y(n.BLEND),_=!1);return}if(_===!1&&(U(n.BLEND),_=!0),V!==dw){if(V!==m||pt!==M){if((p!==$r||v!==$r)&&(n.blendEquation(n.FUNC_ADD),p=$r,v=$r),pt)switch(V){case jo:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Cg:n.blendFunc(n.ONE,n.ONE);break;case Rg:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Pg:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}else switch(V){case jo:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Cg:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Rg:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Pg:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}x=null,b=null,C=null,A=null,T.set(0,0,0),L=0,m=V,M=pt}return}Le=Le||Re,Ie=Ie||fe,tt=tt||ge,(Re!==p||Le!==v)&&(n.blendEquationSeparate(P[Re],P[Le]),p=Re,v=Le),(fe!==x||ge!==b||Ie!==C||tt!==A)&&(n.blendFuncSeparate(I[fe],I[ge],I[Ie],I[tt]),x=fe,b=ge,C=Ie,A=tt),(bt.equals(T)===!1||Zt!==L)&&(n.blendColor(bt.r,bt.g,bt.b,Zt),T.copy(bt),L=Zt),m=V,M=!1}function se(V,Re){V.side===Es?Y(n.CULL_FACE):U(n.CULL_FACE);let fe=V.side===Fn;Re&&(fe=!fe),J(fe),V.blending===jo&&V.transparent===!1?E(Is):E(V.blending,V.blendEquation,V.blendSrc,V.blendDst,V.blendEquationAlpha,V.blendSrcAlpha,V.blendDstAlpha,V.blendColor,V.blendAlpha,V.premultipliedAlpha),o.setFunc(V.depthFunc),o.setTest(V.depthTest),o.setMask(V.depthWrite),r.setMask(V.colorWrite);const ge=V.stencilWrite;a.setTest(ge),ge&&(a.setMask(V.stencilWriteMask),a.setFunc(V.stencilFunc,V.stencilRef,V.stencilFuncMask),a.setOp(V.stencilFail,V.stencilZFail,V.stencilZPass)),de(V.polygonOffset,V.polygonOffsetFactor,V.polygonOffsetUnits),V.alphaToCoverage===!0?U(n.SAMPLE_ALPHA_TO_COVERAGE):Y(n.SAMPLE_ALPHA_TO_COVERAGE)}function J(V){y!==V&&(V?n.frontFace(n.CW):n.frontFace(n.CCW),y=V)}function Q(V){V!==uw?(U(n.CULL_FACE),V!==D&&(V===Ag?n.cullFace(n.BACK):V===hw?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Y(n.CULL_FACE),D=V}function le(V){V!==F&&(H&&n.lineWidth(V),F=V)}function de(V,Re,fe){V?(U(n.POLYGON_OFFSET_FILL),(N!==Re||K!==fe)&&(n.polygonOffset(Re,fe),N=Re,K=fe)):Y(n.POLYGON_OFFSET_FILL)}function ee(V){V?U(n.SCISSOR_TEST):Y(n.SCISSOR_TEST)}function w(V){V===void 0&&(V=n.TEXTURE0+j-1),pe!==V&&(n.activeTexture(V),pe=V)}function S(V,Re,fe){fe===void 0&&(pe===null?fe=n.TEXTURE0+j-1:fe=pe);let ge=be[fe];ge===void 0&&(ge={type:void 0,texture:void 0},be[fe]=ge),(ge.type!==V||ge.texture!==Re)&&(pe!==fe&&(n.activeTexture(fe),pe=fe),n.bindTexture(V,Re||ie[V]),ge.type=V,ge.texture=Re)}function O(){const V=be[pe];V!==void 0&&V.type!==void 0&&(n.bindTexture(V.type,null),V.type=void 0,V.texture=void 0)}function q(){try{n.compressedTexImage2D.apply(n,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function ne(){try{n.compressedTexImage3D.apply(n,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function te(){try{n.texSubImage2D.apply(n,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Ee(){try{n.texSubImage3D.apply(n,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function ve(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Te(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Xe(){try{n.texStorage2D.apply(n,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function xe(){try{n.texStorage3D.apply(n,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Ce(){try{n.texImage2D.apply(n,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function ke(){try{n.texImage3D.apply(n,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function $e(V){he.equals(V)===!1&&(n.scissor(V.x,V.y,V.z,V.w),he.copy(V))}function Ae(V){k.equals(V)===!1&&(n.viewport(V.x,V.y,V.z,V.w),k.copy(V))}function Ye(V,Re){let fe=c.get(Re);fe===void 0&&(fe=new WeakMap,c.set(Re,fe));let ge=fe.get(V);ge===void 0&&(ge=n.getUniformBlockIndex(Re,V.name),fe.set(V,ge))}function We(V,Re){const ge=c.get(Re).get(V);l.get(Re)!==ge&&(n.uniformBlockBinding(Re,ge,V.__bindingPointIndex),l.set(Re,ge))}function dt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},pe=null,be={},h={},f=new WeakMap,d=[],g=null,_=!1,m=null,p=null,x=null,b=null,v=null,C=null,A=null,T=new lt(0,0,0),L=0,M=!1,y=null,D=null,F=null,N=null,K=null,he.set(0,0,n.canvas.width,n.canvas.height),k.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:U,disable:Y,bindFramebuffer:Z,drawBuffers:re,useProgram:Pe,setBlending:E,setMaterial:se,setFlipSided:J,setCullFace:Q,setLineWidth:le,setPolygonOffset:de,setScissorTest:ee,activeTexture:w,bindTexture:S,unbindTexture:O,compressedTexImage2D:q,compressedTexImage3D:ne,texImage2D:Ce,texImage3D:ke,updateUBOMapping:Ye,uniformBlockBinding:We,texStorage2D:Xe,texStorage3D:xe,texSubImage2D:te,texSubImage3D:Ee,compressedTexSubImage2D:ve,compressedTexSubImage3D:Te,scissor:$e,viewport:Ae,reset:dt}}function E_(n,e,t,i){const s=JR(i);switch(t){case lx:return n*e;case ux:return n*e;case hx:return n*e*2;case fx:return n*e/s.components*s.byteLength;case Op:return n*e/s.components*s.byteLength;case dx:return n*e*2/s.components*s.byteLength;case Fp:return n*e*2/s.components*s.byteLength;case cx:return n*e*3/s.components*s.byteLength;case vi:return n*e*4/s.components*s.byteLength;case Np:return n*e*4/s.components*s.byteLength;case zc:case Hc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Vc:case Gc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ed:case nd:return Math.max(n,16)*Math.max(e,8)/4;case Jf:case td:return Math.max(n,8)*Math.max(e,8)/2;case id:case sd:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case rd:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case od:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ad:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case ld:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case cd:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case ud:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case hd:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case fd:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case dd:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case pd:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case md:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case gd:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case _d:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case vd:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case xd:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Wc:case bd:case Sd:return Math.ceil(n/4)*Math.ceil(e/4)*16;case px:case yd:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Md:case Ed:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function JR(n){switch(n){case oi:case rx:return{byteLength:1,components:1};case Tl:case ox:case Fs:return{byteLength:2,components:1};case Ip:case Up:return{byteLength:2,components:4};case xr:case Lp:case Cs:return{byteLength:4,components:1};case ax:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function eP(n,e,t,i,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new qe,u=new WeakMap;let h;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(w,S){return d?new OffscreenCanvas(w,S):Al("canvas")}function _(w,S,O){let q=1;const ne=ee(w);if((ne.width>O||ne.height>O)&&(q=O/Math.max(ne.width,ne.height)),q<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const te=Math.floor(q*ne.width),Ee=Math.floor(q*ne.height);h===void 0&&(h=g(te,Ee));const ve=S?g(te,Ee):h;return ve.width=te,ve.height=Ee,ve.getContext("2d").drawImage(w,0,0,te,Ee),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ne.width+"x"+ne.height+") to ("+te+"x"+Ee+")."),ve}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ne.width+"x"+ne.height+")."),w;return w}function m(w){return w.generateMipmaps}function p(w){n.generateMipmap(w)}function x(w){return w.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?n.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function b(w,S,O,q,ne=!1){if(w!==null){if(n[w]!==void 0)return n[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let te=S;if(S===n.RED&&(O===n.FLOAT&&(te=n.R32F),O===n.HALF_FLOAT&&(te=n.R16F),O===n.UNSIGNED_BYTE&&(te=n.R8)),S===n.RED_INTEGER&&(O===n.UNSIGNED_BYTE&&(te=n.R8UI),O===n.UNSIGNED_SHORT&&(te=n.R16UI),O===n.UNSIGNED_INT&&(te=n.R32UI),O===n.BYTE&&(te=n.R8I),O===n.SHORT&&(te=n.R16I),O===n.INT&&(te=n.R32I)),S===n.RG&&(O===n.FLOAT&&(te=n.RG32F),O===n.HALF_FLOAT&&(te=n.RG16F),O===n.UNSIGNED_BYTE&&(te=n.RG8)),S===n.RG_INTEGER&&(O===n.UNSIGNED_BYTE&&(te=n.RG8UI),O===n.UNSIGNED_SHORT&&(te=n.RG16UI),O===n.UNSIGNED_INT&&(te=n.RG32UI),O===n.BYTE&&(te=n.RG8I),O===n.SHORT&&(te=n.RG16I),O===n.INT&&(te=n.RG32I)),S===n.RGB_INTEGER&&(O===n.UNSIGNED_BYTE&&(te=n.RGB8UI),O===n.UNSIGNED_SHORT&&(te=n.RGB16UI),O===n.UNSIGNED_INT&&(te=n.RGB32UI),O===n.BYTE&&(te=n.RGB8I),O===n.SHORT&&(te=n.RGB16I),O===n.INT&&(te=n.RGB32I)),S===n.RGBA_INTEGER&&(O===n.UNSIGNED_BYTE&&(te=n.RGBA8UI),O===n.UNSIGNED_SHORT&&(te=n.RGBA16UI),O===n.UNSIGNED_INT&&(te=n.RGBA32UI),O===n.BYTE&&(te=n.RGBA8I),O===n.SHORT&&(te=n.RGBA16I),O===n.INT&&(te=n.RGBA32I)),S===n.RGB&&O===n.UNSIGNED_INT_5_9_9_9_REV&&(te=n.RGB9_E5),S===n.RGBA){const Ee=ne?Hu:ut.getTransfer(q);O===n.FLOAT&&(te=n.RGBA32F),O===n.HALF_FLOAT&&(te=n.RGBA16F),O===n.UNSIGNED_BYTE&&(te=Ee===yt?n.SRGB8_ALPHA8:n.RGBA8),O===n.UNSIGNED_SHORT_4_4_4_4&&(te=n.RGBA4),O===n.UNSIGNED_SHORT_5_5_5_1&&(te=n.RGB5_A1)}return(te===n.R16F||te===n.R32F||te===n.RG16F||te===n.RG32F||te===n.RGBA16F||te===n.RGBA32F)&&e.get("EXT_color_buffer_float"),te}function v(w,S){let O;return w?S===null||S===xr||S===ao?O=n.DEPTH24_STENCIL8:S===Cs?O=n.DEPTH32F_STENCIL8:S===Tl&&(O=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===xr||S===ao?O=n.DEPTH_COMPONENT24:S===Cs?O=n.DEPTH_COMPONENT32F:S===Tl&&(O=n.DEPTH_COMPONENT16),O}function C(w,S){return m(w)===!0||w.isFramebufferTexture&&w.minFilter!==vn&&w.minFilter!==Un?Math.log2(Math.max(S.width,S.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?S.mipmaps.length:1}function A(w){const S=w.target;S.removeEventListener("dispose",A),L(S),S.isVideoTexture&&u.delete(S)}function T(w){const S=w.target;S.removeEventListener("dispose",T),y(S)}function L(w){const S=i.get(w);if(S.__webglInit===void 0)return;const O=w.source,q=f.get(O);if(q){const ne=q[S.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&M(w),Object.keys(q).length===0&&f.delete(O)}i.remove(w)}function M(w){const S=i.get(w);n.deleteTexture(S.__webglTexture);const O=w.source,q=f.get(O);delete q[S.__cacheKey],o.memory.textures--}function y(w){const S=i.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),i.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(S.__webglFramebuffer[q]))for(let ne=0;ne<S.__webglFramebuffer[q].length;ne++)n.deleteFramebuffer(S.__webglFramebuffer[q][ne]);else n.deleteFramebuffer(S.__webglFramebuffer[q]);S.__webglDepthbuffer&&n.deleteRenderbuffer(S.__webglDepthbuffer[q])}else{if(Array.isArray(S.__webglFramebuffer))for(let q=0;q<S.__webglFramebuffer.length;q++)n.deleteFramebuffer(S.__webglFramebuffer[q]);else n.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&n.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&n.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let q=0;q<S.__webglColorRenderbuffer.length;q++)S.__webglColorRenderbuffer[q]&&n.deleteRenderbuffer(S.__webglColorRenderbuffer[q]);S.__webglDepthRenderbuffer&&n.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const O=w.textures;for(let q=0,ne=O.length;q<ne;q++){const te=i.get(O[q]);te.__webglTexture&&(n.deleteTexture(te.__webglTexture),o.memory.textures--),i.remove(O[q])}i.remove(w)}let D=0;function F(){D=0}function N(){const w=D;return w>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),D+=1,w}function K(w){const S=[];return S.push(w.wrapS),S.push(w.wrapT),S.push(w.wrapR||0),S.push(w.magFilter),S.push(w.minFilter),S.push(w.anisotropy),S.push(w.internalFormat),S.push(w.format),S.push(w.type),S.push(w.generateMipmaps),S.push(w.premultiplyAlpha),S.push(w.flipY),S.push(w.unpackAlignment),S.push(w.colorSpace),S.join()}function j(w,S){const O=i.get(w);if(w.isVideoTexture&&le(w),w.isRenderTargetTexture===!1&&w.version>0&&O.__version!==w.version){const q=w.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{k(O,w,S);return}}t.bindTexture(n.TEXTURE_2D,O.__webglTexture,n.TEXTURE0+S)}function H(w,S){const O=i.get(w);if(w.version>0&&O.__version!==w.version){k(O,w,S);return}t.bindTexture(n.TEXTURE_2D_ARRAY,O.__webglTexture,n.TEXTURE0+S)}function W(w,S){const O=i.get(w);if(w.version>0&&O.__version!==w.version){k(O,w,S);return}t.bindTexture(n.TEXTURE_3D,O.__webglTexture,n.TEXTURE0+S)}function B(w,S){const O=i.get(w);if(w.version>0&&O.__version!==w.version){G(O,w,S);return}t.bindTexture(n.TEXTURE_CUBE_MAP,O.__webglTexture,n.TEXTURE0+S)}const pe={[wl]:n.REPEAT,[As]:n.CLAMP_TO_EDGE,[Qf]:n.MIRRORED_REPEAT},be={[vn]:n.NEAREST,[zw]:n.NEAREST_MIPMAP_NEAREST,[rc]:n.NEAREST_MIPMAP_LINEAR,[Un]:n.LINEAR,[xh]:n.LINEAR_MIPMAP_NEAREST,[Kr]:n.LINEAR_MIPMAP_LINEAR},ue={[Ww]:n.NEVER,[Kw]:n.ALWAYS,[Xw]:n.LESS,[gx]:n.LEQUAL,[qw]:n.EQUAL,[jw]:n.GEQUAL,[$w]:n.GREATER,[Yw]:n.NOTEQUAL};function ce(w,S){if(S.type===Cs&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===Un||S.magFilter===xh||S.magFilter===rc||S.magFilter===Kr||S.minFilter===Un||S.minFilter===xh||S.minFilter===rc||S.minFilter===Kr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(w,n.TEXTURE_WRAP_S,pe[S.wrapS]),n.texParameteri(w,n.TEXTURE_WRAP_T,pe[S.wrapT]),(w===n.TEXTURE_3D||w===n.TEXTURE_2D_ARRAY)&&n.texParameteri(w,n.TEXTURE_WRAP_R,pe[S.wrapR]),n.texParameteri(w,n.TEXTURE_MAG_FILTER,be[S.magFilter]),n.texParameteri(w,n.TEXTURE_MIN_FILTER,be[S.minFilter]),S.compareFunction&&(n.texParameteri(w,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(w,n.TEXTURE_COMPARE_FUNC,ue[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===vn||S.minFilter!==rc&&S.minFilter!==Kr||S.type===Cs&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||i.get(S).__currentAnisotropy){const O=e.get("EXT_texture_filter_anisotropic");n.texParameterf(w,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy}}}function he(w,S){let O=!1;w.__webglInit===void 0&&(w.__webglInit=!0,S.addEventListener("dispose",A));const q=S.source;let ne=f.get(q);ne===void 0&&(ne={},f.set(q,ne));const te=K(S);if(te!==w.__cacheKey){ne[te]===void 0&&(ne[te]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,O=!0),ne[te].usedTimes++;const Ee=ne[w.__cacheKey];Ee!==void 0&&(ne[w.__cacheKey].usedTimes--,Ee.usedTimes===0&&M(S)),w.__cacheKey=te,w.__webglTexture=ne[te].texture}return O}function k(w,S,O){let q=n.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(q=n.TEXTURE_2D_ARRAY),S.isData3DTexture&&(q=n.TEXTURE_3D);const ne=he(w,S),te=S.source;t.bindTexture(q,w.__webglTexture,n.TEXTURE0+O);const Ee=i.get(te);if(te.version!==Ee.__version||ne===!0){t.activeTexture(n.TEXTURE0+O);const ve=ut.getPrimaries(ut.workingColorSpace),Te=S.colorSpace===or?null:ut.getPrimaries(S.colorSpace),Xe=S.colorSpace===or||ve===Te?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Xe);let xe=_(S.image,!1,s.maxTextureSize);xe=de(S,xe);const Ce=r.convert(S.format,S.colorSpace),ke=r.convert(S.type);let $e=b(S.internalFormat,Ce,ke,S.colorSpace,S.isVideoTexture);ce(q,S);let Ae;const Ye=S.mipmaps,We=S.isVideoTexture!==!0,dt=Ee.__version===void 0||ne===!0,V=te.dataReady,Re=C(S,xe);if(S.isDepthTexture)$e=v(S.format===lo,S.type),dt&&(We?t.texStorage2D(n.TEXTURE_2D,1,$e,xe.width,xe.height):t.texImage2D(n.TEXTURE_2D,0,$e,xe.width,xe.height,0,Ce,ke,null));else if(S.isDataTexture)if(Ye.length>0){We&&dt&&t.texStorage2D(n.TEXTURE_2D,Re,$e,Ye[0].width,Ye[0].height);for(let fe=0,ge=Ye.length;fe<ge;fe++)Ae=Ye[fe],We?V&&t.texSubImage2D(n.TEXTURE_2D,fe,0,0,Ae.width,Ae.height,Ce,ke,Ae.data):t.texImage2D(n.TEXTURE_2D,fe,$e,Ae.width,Ae.height,0,Ce,ke,Ae.data);S.generateMipmaps=!1}else We?(dt&&t.texStorage2D(n.TEXTURE_2D,Re,$e,xe.width,xe.height),V&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,xe.width,xe.height,Ce,ke,xe.data)):t.texImage2D(n.TEXTURE_2D,0,$e,xe.width,xe.height,0,Ce,ke,xe.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){We&&dt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Re,$e,Ye[0].width,Ye[0].height,xe.depth);for(let fe=0,ge=Ye.length;fe<ge;fe++)if(Ae=Ye[fe],S.format!==vi)if(Ce!==null)if(We){if(V)if(S.layerUpdates.size>0){const Le=E_(Ae.width,Ae.height,S.format,S.type);for(const Ie of S.layerUpdates){const tt=Ae.data.subarray(Ie*Le/Ae.data.BYTES_PER_ELEMENT,(Ie+1)*Le/Ae.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,fe,0,0,Ie,Ae.width,Ae.height,1,Ce,tt)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,fe,0,0,0,Ae.width,Ae.height,xe.depth,Ce,Ae.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,fe,$e,Ae.width,Ae.height,xe.depth,0,Ae.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else We?V&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,fe,0,0,0,Ae.width,Ae.height,xe.depth,Ce,ke,Ae.data):t.texImage3D(n.TEXTURE_2D_ARRAY,fe,$e,Ae.width,Ae.height,xe.depth,0,Ce,ke,Ae.data)}else{We&&dt&&t.texStorage2D(n.TEXTURE_2D,Re,$e,Ye[0].width,Ye[0].height);for(let fe=0,ge=Ye.length;fe<ge;fe++)Ae=Ye[fe],S.format!==vi?Ce!==null?We?V&&t.compressedTexSubImage2D(n.TEXTURE_2D,fe,0,0,Ae.width,Ae.height,Ce,Ae.data):t.compressedTexImage2D(n.TEXTURE_2D,fe,$e,Ae.width,Ae.height,0,Ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):We?V&&t.texSubImage2D(n.TEXTURE_2D,fe,0,0,Ae.width,Ae.height,Ce,ke,Ae.data):t.texImage2D(n.TEXTURE_2D,fe,$e,Ae.width,Ae.height,0,Ce,ke,Ae.data)}else if(S.isDataArrayTexture)if(We){if(dt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Re,$e,xe.width,xe.height,xe.depth),V)if(S.layerUpdates.size>0){const fe=E_(xe.width,xe.height,S.format,S.type);for(const ge of S.layerUpdates){const Le=xe.data.subarray(ge*fe/xe.data.BYTES_PER_ELEMENT,(ge+1)*fe/xe.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ge,xe.width,xe.height,1,Ce,ke,Le)}S.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,xe.width,xe.height,xe.depth,Ce,ke,xe.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,$e,xe.width,xe.height,xe.depth,0,Ce,ke,xe.data);else if(S.isData3DTexture)We?(dt&&t.texStorage3D(n.TEXTURE_3D,Re,$e,xe.width,xe.height,xe.depth),V&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,xe.width,xe.height,xe.depth,Ce,ke,xe.data)):t.texImage3D(n.TEXTURE_3D,0,$e,xe.width,xe.height,xe.depth,0,Ce,ke,xe.data);else if(S.isFramebufferTexture){if(dt)if(We)t.texStorage2D(n.TEXTURE_2D,Re,$e,xe.width,xe.height);else{let fe=xe.width,ge=xe.height;for(let Le=0;Le<Re;Le++)t.texImage2D(n.TEXTURE_2D,Le,$e,fe,ge,0,Ce,ke,null),fe>>=1,ge>>=1}}else if(Ye.length>0){if(We&&dt){const fe=ee(Ye[0]);t.texStorage2D(n.TEXTURE_2D,Re,$e,fe.width,fe.height)}for(let fe=0,ge=Ye.length;fe<ge;fe++)Ae=Ye[fe],We?V&&t.texSubImage2D(n.TEXTURE_2D,fe,0,0,Ce,ke,Ae):t.texImage2D(n.TEXTURE_2D,fe,$e,Ce,ke,Ae);S.generateMipmaps=!1}else if(We){if(dt){const fe=ee(xe);t.texStorage2D(n.TEXTURE_2D,Re,$e,fe.width,fe.height)}V&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,Ce,ke,xe)}else t.texImage2D(n.TEXTURE_2D,0,$e,Ce,ke,xe);m(S)&&p(q),Ee.__version=te.version,S.onUpdate&&S.onUpdate(S)}w.__version=S.version}function G(w,S,O){if(S.image.length!==6)return;const q=he(w,S),ne=S.source;t.bindTexture(n.TEXTURE_CUBE_MAP,w.__webglTexture,n.TEXTURE0+O);const te=i.get(ne);if(ne.version!==te.__version||q===!0){t.activeTexture(n.TEXTURE0+O);const Ee=ut.getPrimaries(ut.workingColorSpace),ve=S.colorSpace===or?null:ut.getPrimaries(S.colorSpace),Te=S.colorSpace===or||Ee===ve?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Te);const Xe=S.isCompressedTexture||S.image[0].isCompressedTexture,xe=S.image[0]&&S.image[0].isDataTexture,Ce=[];for(let ge=0;ge<6;ge++)!Xe&&!xe?Ce[ge]=_(S.image[ge],!0,s.maxCubemapSize):Ce[ge]=xe?S.image[ge].image:S.image[ge],Ce[ge]=de(S,Ce[ge]);const ke=Ce[0],$e=r.convert(S.format,S.colorSpace),Ae=r.convert(S.type),Ye=b(S.internalFormat,$e,Ae,S.colorSpace),We=S.isVideoTexture!==!0,dt=te.__version===void 0||q===!0,V=ne.dataReady;let Re=C(S,ke);ce(n.TEXTURE_CUBE_MAP,S);let fe;if(Xe){We&&dt&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Re,Ye,ke.width,ke.height);for(let ge=0;ge<6;ge++){fe=Ce[ge].mipmaps;for(let Le=0;Le<fe.length;Le++){const Ie=fe[Le];S.format!==vi?$e!==null?We?V&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Le,0,0,Ie.width,Ie.height,$e,Ie.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Le,Ye,Ie.width,Ie.height,0,Ie.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):We?V&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Le,0,0,Ie.width,Ie.height,$e,Ae,Ie.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Le,Ye,Ie.width,Ie.height,0,$e,Ae,Ie.data)}}}else{if(fe=S.mipmaps,We&&dt){fe.length>0&&Re++;const ge=ee(Ce[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Re,Ye,ge.width,ge.height)}for(let ge=0;ge<6;ge++)if(xe){We?V&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,0,0,Ce[ge].width,Ce[ge].height,$e,Ae,Ce[ge].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,Ye,Ce[ge].width,Ce[ge].height,0,$e,Ae,Ce[ge].data);for(let Le=0;Le<fe.length;Le++){const tt=fe[Le].image[ge].image;We?V&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Le+1,0,0,tt.width,tt.height,$e,Ae,tt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Le+1,Ye,tt.width,tt.height,0,$e,Ae,tt.data)}}else{We?V&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,0,0,$e,Ae,Ce[ge]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,Ye,$e,Ae,Ce[ge]);for(let Le=0;Le<fe.length;Le++){const Ie=fe[Le];We?V&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Le+1,0,0,$e,Ae,Ie.image[ge]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Le+1,Ye,$e,Ae,Ie.image[ge])}}}m(S)&&p(n.TEXTURE_CUBE_MAP),te.__version=ne.version,S.onUpdate&&S.onUpdate(S)}w.__version=S.version}function ie(w,S,O,q,ne,te){const Ee=r.convert(O.format,O.colorSpace),ve=r.convert(O.type),Te=b(O.internalFormat,Ee,ve,O.colorSpace),Xe=i.get(S),xe=i.get(O);if(xe.__renderTarget=S,!Xe.__hasExternalTextures){const Ce=Math.max(1,S.width>>te),ke=Math.max(1,S.height>>te);ne===n.TEXTURE_3D||ne===n.TEXTURE_2D_ARRAY?t.texImage3D(ne,te,Te,Ce,ke,S.depth,0,Ee,ve,null):t.texImage2D(ne,te,Te,Ce,ke,0,Ee,ve,null)}t.bindFramebuffer(n.FRAMEBUFFER,w),Q(S)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,q,ne,xe.__webglTexture,0,J(S)):(ne===n.TEXTURE_2D||ne>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,q,ne,xe.__webglTexture,te),t.bindFramebuffer(n.FRAMEBUFFER,null)}function U(w,S,O){if(n.bindRenderbuffer(n.RENDERBUFFER,w),S.depthBuffer){const q=S.depthTexture,ne=q&&q.isDepthTexture?q.type:null,te=v(S.stencilBuffer,ne),Ee=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ve=J(S);Q(S)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ve,te,S.width,S.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,ve,te,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,te,S.width,S.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Ee,n.RENDERBUFFER,w)}else{const q=S.textures;for(let ne=0;ne<q.length;ne++){const te=q[ne],Ee=r.convert(te.format,te.colorSpace),ve=r.convert(te.type),Te=b(te.internalFormat,Ee,ve,te.colorSpace),Xe=J(S);O&&Q(S)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Xe,Te,S.width,S.height):Q(S)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Xe,Te,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,Te,S.width,S.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Y(w,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,w),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const q=i.get(S.depthTexture);q.__renderTarget=S,(!q.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),j(S.depthTexture,0);const ne=q.__webglTexture,te=J(S);if(S.depthTexture.format===Ko)Q(S)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ne,0,te):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ne,0);else if(S.depthTexture.format===lo)Q(S)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ne,0,te):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ne,0);else throw new Error("Unknown depthTexture format")}function Z(w){const S=i.get(w),O=w.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==w.depthTexture){const q=w.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),q){const ne=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,q.removeEventListener("dispose",ne)};q.addEventListener("dispose",ne),S.__depthDisposeCallback=ne}S.__boundDepthTexture=q}if(w.depthTexture&&!S.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");Y(S.__webglFramebuffer,w)}else if(O){S.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer[q]),S.__webglDepthbuffer[q]===void 0)S.__webglDepthbuffer[q]=n.createRenderbuffer(),U(S.__webglDepthbuffer[q],w,!1);else{const ne=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,te=S.__webglDepthbuffer[q];n.bindRenderbuffer(n.RENDERBUFFER,te),n.framebufferRenderbuffer(n.FRAMEBUFFER,ne,n.RENDERBUFFER,te)}}else if(t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=n.createRenderbuffer(),U(S.__webglDepthbuffer,w,!1);else{const q=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ne=S.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ne),n.framebufferRenderbuffer(n.FRAMEBUFFER,q,n.RENDERBUFFER,ne)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function re(w,S,O){const q=i.get(w);S!==void 0&&ie(q.__webglFramebuffer,w,w.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),O!==void 0&&Z(w)}function Pe(w){const S=w.texture,O=i.get(w),q=i.get(S);w.addEventListener("dispose",T);const ne=w.textures,te=w.isWebGLCubeRenderTarget===!0,Ee=ne.length>1;if(Ee||(q.__webglTexture===void 0&&(q.__webglTexture=n.createTexture()),q.__version=S.version,o.memory.textures++),te){O.__webglFramebuffer=[];for(let ve=0;ve<6;ve++)if(S.mipmaps&&S.mipmaps.length>0){O.__webglFramebuffer[ve]=[];for(let Te=0;Te<S.mipmaps.length;Te++)O.__webglFramebuffer[ve][Te]=n.createFramebuffer()}else O.__webglFramebuffer[ve]=n.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){O.__webglFramebuffer=[];for(let ve=0;ve<S.mipmaps.length;ve++)O.__webglFramebuffer[ve]=n.createFramebuffer()}else O.__webglFramebuffer=n.createFramebuffer();if(Ee)for(let ve=0,Te=ne.length;ve<Te;ve++){const Xe=i.get(ne[ve]);Xe.__webglTexture===void 0&&(Xe.__webglTexture=n.createTexture(),o.memory.textures++)}if(w.samples>0&&Q(w)===!1){O.__webglMultisampledFramebuffer=n.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let ve=0;ve<ne.length;ve++){const Te=ne[ve];O.__webglColorRenderbuffer[ve]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,O.__webglColorRenderbuffer[ve]);const Xe=r.convert(Te.format,Te.colorSpace),xe=r.convert(Te.type),Ce=b(Te.internalFormat,Xe,xe,Te.colorSpace,w.isXRRenderTarget===!0),ke=J(w);n.renderbufferStorageMultisample(n.RENDERBUFFER,ke,Ce,w.width,w.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ve,n.RENDERBUFFER,O.__webglColorRenderbuffer[ve])}n.bindRenderbuffer(n.RENDERBUFFER,null),w.depthBuffer&&(O.__webglDepthRenderbuffer=n.createRenderbuffer(),U(O.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(te){t.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture),ce(n.TEXTURE_CUBE_MAP,S);for(let ve=0;ve<6;ve++)if(S.mipmaps&&S.mipmaps.length>0)for(let Te=0;Te<S.mipmaps.length;Te++)ie(O.__webglFramebuffer[ve][Te],w,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Te);else ie(O.__webglFramebuffer[ve],w,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0);m(S)&&p(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ee){for(let ve=0,Te=ne.length;ve<Te;ve++){const Xe=ne[ve],xe=i.get(Xe);t.bindTexture(n.TEXTURE_2D,xe.__webglTexture),ce(n.TEXTURE_2D,Xe),ie(O.__webglFramebuffer,w,Xe,n.COLOR_ATTACHMENT0+ve,n.TEXTURE_2D,0),m(Xe)&&p(n.TEXTURE_2D)}t.unbindTexture()}else{let ve=n.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ve=w.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ve,q.__webglTexture),ce(ve,S),S.mipmaps&&S.mipmaps.length>0)for(let Te=0;Te<S.mipmaps.length;Te++)ie(O.__webglFramebuffer[Te],w,S,n.COLOR_ATTACHMENT0,ve,Te);else ie(O.__webglFramebuffer,w,S,n.COLOR_ATTACHMENT0,ve,0);m(S)&&p(ve),t.unbindTexture()}w.depthBuffer&&Z(w)}function P(w){const S=w.textures;for(let O=0,q=S.length;O<q;O++){const ne=S[O];if(m(ne)){const te=x(w),Ee=i.get(ne).__webglTexture;t.bindTexture(te,Ee),p(te),t.unbindTexture()}}}const I=[],E=[];function se(w){if(w.samples>0){if(Q(w)===!1){const S=w.textures,O=w.width,q=w.height;let ne=n.COLOR_BUFFER_BIT;const te=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Ee=i.get(w),ve=S.length>1;if(ve)for(let Te=0;Te<S.length;Te++)t.bindFramebuffer(n.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Te,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Ee.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Te,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer);for(let Te=0;Te<S.length;Te++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(ne|=n.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(ne|=n.STENCIL_BUFFER_BIT)),ve){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Ee.__webglColorRenderbuffer[Te]);const Xe=i.get(S[Te]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Xe,0)}n.blitFramebuffer(0,0,O,q,0,0,O,q,ne,n.NEAREST),l===!0&&(I.length=0,E.length=0,I.push(n.COLOR_ATTACHMENT0+Te),w.depthBuffer&&w.resolveDepthBuffer===!1&&(I.push(te),E.push(te),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,E)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,I))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ve)for(let Te=0;Te<S.length;Te++){t.bindFramebuffer(n.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Te,n.RENDERBUFFER,Ee.__webglColorRenderbuffer[Te]);const Xe=i.get(S[Te]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Ee.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Te,n.TEXTURE_2D,Xe,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){const S=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[S])}}}function J(w){return Math.min(s.maxSamples,w.samples)}function Q(w){const S=i.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function le(w){const S=o.render.frame;u.get(w)!==S&&(u.set(w,S),w.update())}function de(w,S){const O=w.colorSpace,q=w.format,ne=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||O!==ya&&O!==or&&(ut.getTransfer(O)===yt?(q!==vi||ne!==oi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),S}function ee(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=N,this.resetTextureUnits=F,this.setTexture2D=j,this.setTexture2DArray=H,this.setTexture3D=W,this.setTextureCube=B,this.rebindTextures=re,this.setupRenderTarget=Pe,this.updateRenderTargetMipmap=P,this.updateMultisampleRenderTarget=se,this.setupDepthRenderbuffer=Z,this.setupFrameBufferTexture=ie,this.useMultisampledRTT=Q}function tP(n,e){function t(i,s=or){let r;const o=ut.getTransfer(s);if(i===oi)return n.UNSIGNED_BYTE;if(i===Ip)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Up)return n.UNSIGNED_SHORT_5_5_5_1;if(i===ax)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===rx)return n.BYTE;if(i===ox)return n.SHORT;if(i===Tl)return n.UNSIGNED_SHORT;if(i===Lp)return n.INT;if(i===xr)return n.UNSIGNED_INT;if(i===Cs)return n.FLOAT;if(i===Fs)return n.HALF_FLOAT;if(i===lx)return n.ALPHA;if(i===cx)return n.RGB;if(i===vi)return n.RGBA;if(i===ux)return n.LUMINANCE;if(i===hx)return n.LUMINANCE_ALPHA;if(i===Ko)return n.DEPTH_COMPONENT;if(i===lo)return n.DEPTH_STENCIL;if(i===fx)return n.RED;if(i===Op)return n.RED_INTEGER;if(i===dx)return n.RG;if(i===Fp)return n.RG_INTEGER;if(i===Np)return n.RGBA_INTEGER;if(i===zc||i===Hc||i===Vc||i===Gc)if(o===yt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===zc)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Hc)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Vc)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Gc)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===zc)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Hc)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Vc)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Gc)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Jf||i===ed||i===td||i===nd)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Jf)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ed)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===td)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===nd)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===id||i===sd||i===rd)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===id||i===sd)return o===yt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===rd)return o===yt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===od||i===ad||i===ld||i===cd||i===ud||i===hd||i===fd||i===dd||i===pd||i===md||i===gd||i===_d||i===vd||i===xd)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===od)return o===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===ad)return o===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===ld)return o===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===cd)return o===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===ud)return o===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===hd)return o===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===fd)return o===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===dd)return o===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===pd)return o===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===md)return o===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===gd)return o===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===_d)return o===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===vd)return o===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===xd)return o===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Wc||i===bd||i===Sd)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===Wc)return o===yt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===bd)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Sd)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===px||i===yd||i===Md||i===Ed)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===Wc)return r.COMPRESSED_RED_RGTC1_EXT;if(i===yd)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Md)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Ed)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ao?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}class nP extends Pn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Vt extends ii{constructor(){super(),this.isGroup=!0,this.type="Group"}}const iP={type:"move"};class Yh{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Vt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Vt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Vt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,i),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,g=.005;c.inputState.pinching&&f>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(iP)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Vt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const sP=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,rP=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class oP{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,i){if(this.texture===null){const s=new cn,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=i.depthNear||t.depthFar!=i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Wt({vertexShader:sP,fragmentShader:rP,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Nt(new Sn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class aP extends Ma{constructor(e,t){super();const i=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,f=null,d=null,g=null;const _=new oP,m=t.getContextAttributes();let p=null,x=null;const b=[],v=[],C=new qe;let A=null;const T=new Pn;T.viewport=new Ht;const L=new Pn;L.viewport=new Ht;const M=[T,L],y=new nP;let D=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(k){let G=b[k];return G===void 0&&(G=new Yh,b[k]=G),G.getTargetRaySpace()},this.getControllerGrip=function(k){let G=b[k];return G===void 0&&(G=new Yh,b[k]=G),G.getGripSpace()},this.getHand=function(k){let G=b[k];return G===void 0&&(G=new Yh,b[k]=G),G.getHandSpace()};function N(k){const G=v.indexOf(k.inputSource);if(G===-1)return;const ie=b[G];ie!==void 0&&(ie.update(k.inputSource,k.frame,c||o),ie.dispatchEvent({type:k.type,data:k.inputSource}))}function K(){s.removeEventListener("select",N),s.removeEventListener("selectstart",N),s.removeEventListener("selectend",N),s.removeEventListener("squeeze",N),s.removeEventListener("squeezestart",N),s.removeEventListener("squeezeend",N),s.removeEventListener("end",K),s.removeEventListener("inputsourceschange",j);for(let k=0;k<b.length;k++){const G=v[k];G!==null&&(v[k]=null,b[k].disconnect(G))}D=null,F=null,_.reset(),e.setRenderTarget(p),d=null,f=null,h=null,s=null,x=null,he.stop(),i.isPresenting=!1,e.setPixelRatio(A),e.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(k){r=k,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(k){a=k,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(k){c=k},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(k){if(s=k,s!==null){if(p=e.getRenderTarget(),s.addEventListener("select",N),s.addEventListener("selectstart",N),s.addEventListener("selectend",N),s.addEventListener("squeeze",N),s.addEventListener("squeezestart",N),s.addEventListener("squeezeend",N),s.addEventListener("end",K),s.addEventListener("inputsourceschange",j),m.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(C),s.renderState.layers===void 0){const G={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,t,G),s.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),x=new ai(d.framebufferWidth,d.framebufferHeight,{format:vi,type:oi,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let G=null,ie=null,U=null;m.depth&&(U=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,G=m.stencil?lo:Ko,ie=m.stencil?ao:xr);const Y={colorFormat:t.RGBA8,depthFormat:U,scaleFactor:r};h=new XRWebGLBinding(s,t),f=h.createProjectionLayer(Y),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),x=new ai(f.textureWidth,f.textureHeight,{format:vi,type:oi,depthTexture:new Vp(f.textureWidth,f.textureHeight,ie,void 0,void 0,void 0,void 0,void 0,void 0,G),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),he.setContext(s),he.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function j(k){for(let G=0;G<k.removed.length;G++){const ie=k.removed[G],U=v.indexOf(ie);U>=0&&(v[U]=null,b[U].disconnect(ie))}for(let G=0;G<k.added.length;G++){const ie=k.added[G];let U=v.indexOf(ie);if(U===-1){for(let Z=0;Z<b.length;Z++)if(Z>=v.length){v.push(ie),U=Z;break}else if(v[Z]===null){v[Z]=ie,U=Z;break}if(U===-1)break}const Y=b[U];Y&&Y.connect(ie)}}const H=new z,W=new z;function B(k,G,ie){H.setFromMatrixPosition(G.matrixWorld),W.setFromMatrixPosition(ie.matrixWorld);const U=H.distanceTo(W),Y=G.projectionMatrix.elements,Z=ie.projectionMatrix.elements,re=Y[14]/(Y[10]-1),Pe=Y[14]/(Y[10]+1),P=(Y[9]+1)/Y[5],I=(Y[9]-1)/Y[5],E=(Y[8]-1)/Y[0],se=(Z[8]+1)/Z[0],J=re*E,Q=re*se,le=U/(-E+se),de=le*-E;if(G.matrixWorld.decompose(k.position,k.quaternion,k.scale),k.translateX(de),k.translateZ(le),k.matrixWorld.compose(k.position,k.quaternion,k.scale),k.matrixWorldInverse.copy(k.matrixWorld).invert(),Y[10]===-1)k.projectionMatrix.copy(G.projectionMatrix),k.projectionMatrixInverse.copy(G.projectionMatrixInverse);else{const ee=re+le,w=Pe+le,S=J-de,O=Q+(U-de),q=P*Pe/w*ee,ne=I*Pe/w*ee;k.projectionMatrix.makePerspective(S,O,q,ne,ee,w),k.projectionMatrixInverse.copy(k.projectionMatrix).invert()}}function pe(k,G){G===null?k.matrixWorld.copy(k.matrix):k.matrixWorld.multiplyMatrices(G.matrixWorld,k.matrix),k.matrixWorldInverse.copy(k.matrixWorld).invert()}this.updateCamera=function(k){if(s===null)return;let G=k.near,ie=k.far;_.texture!==null&&(_.depthNear>0&&(G=_.depthNear),_.depthFar>0&&(ie=_.depthFar)),y.near=L.near=T.near=G,y.far=L.far=T.far=ie,(D!==y.near||F!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),D=y.near,F=y.far),T.layers.mask=k.layers.mask|2,L.layers.mask=k.layers.mask|4,y.layers.mask=T.layers.mask|L.layers.mask;const U=k.parent,Y=y.cameras;pe(y,U);for(let Z=0;Z<Y.length;Z++)pe(Y[Z],U);Y.length===2?B(y,T,L):y.projectionMatrix.copy(T.projectionMatrix),be(k,y,U)};function be(k,G,ie){ie===null?k.matrix.copy(G.matrixWorld):(k.matrix.copy(ie.matrixWorld),k.matrix.invert(),k.matrix.multiply(G.matrixWorld)),k.matrix.decompose(k.position,k.quaternion,k.scale),k.updateMatrixWorld(!0),k.projectionMatrix.copy(G.projectionMatrix),k.projectionMatrixInverse.copy(G.projectionMatrixInverse),k.isPerspectiveCamera&&(k.fov=wd*2*Math.atan(1/k.projectionMatrix.elements[5]),k.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(k){l=k,f!==null&&(f.fixedFoveation=k),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=k)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(y)};let ue=null;function ce(k,G){if(u=G.getViewerPose(c||o),g=G,u!==null){const ie=u.views;d!==null&&(e.setRenderTargetFramebuffer(x,d.framebuffer),e.setRenderTarget(x));let U=!1;ie.length!==y.cameras.length&&(y.cameras.length=0,U=!0);for(let Z=0;Z<ie.length;Z++){const re=ie[Z];let Pe=null;if(d!==null)Pe=d.getViewport(re);else{const I=h.getViewSubImage(f,re);Pe=I.viewport,Z===0&&(e.setRenderTargetTextures(x,I.colorTexture,f.ignoreDepthValues?void 0:I.depthStencilTexture),e.setRenderTarget(x))}let P=M[Z];P===void 0&&(P=new Pn,P.layers.enable(Z),P.viewport=new Ht,M[Z]=P),P.matrix.fromArray(re.transform.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale),P.projectionMatrix.fromArray(re.projectionMatrix),P.projectionMatrixInverse.copy(P.projectionMatrix).invert(),P.viewport.set(Pe.x,Pe.y,Pe.width,Pe.height),Z===0&&(y.matrix.copy(P.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),U===!0&&y.cameras.push(P)}const Y=s.enabledFeatures;if(Y&&Y.includes("depth-sensing")){const Z=h.getDepthInformation(ie[0]);Z&&Z.isValid&&Z.texture&&_.init(e,Z,s.renderState)}}for(let ie=0;ie<b.length;ie++){const U=v[ie],Y=b[ie];U!==null&&Y!==void 0&&Y.update(U,G,c||o)}ue&&ue(k,G),G.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:G}),g=null}const he=new Ax;he.setAnimationLoop(ce),this.setAnimationLoop=function(k){ue=k},this.dispose=function(){}}}const Br=new Ns,lP=new Gt;function cP(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,Ex(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,x,b,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),h(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,v)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,x,b):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Fn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Fn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const x=e.get(p),b=x.envMap,v=x.envMapRotation;b&&(m.envMap.value=b,Br.copy(v),Br.x*=-1,Br.y*=-1,Br.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Br.y*=-1,Br.z*=-1),m.envMapRotation.value.setFromMatrix4(lP.makeRotationFromEuler(Br)),m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,x,b){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*x,m.scale.value=b*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,x){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Fn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const x=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function uP(n,e,t,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,b){const v=b.program;i.uniformBlockBinding(x,v)}function c(x,b){let v=s[x.id];v===void 0&&(g(x),v=u(x),s[x.id]=v,x.addEventListener("dispose",m));const C=b.program;i.updateUBOMapping(x,C);const A=e.render.frame;r[x.id]!==A&&(f(x),r[x.id]=A)}function u(x){const b=h();x.__bindingPointIndex=b;const v=n.createBuffer(),C=x.__size,A=x.usage;return n.bindBuffer(n.UNIFORM_BUFFER,v),n.bufferData(n.UNIFORM_BUFFER,C,A),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,b,v),v}function h(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(x){const b=s[x.id],v=x.uniforms,C=x.__cache;n.bindBuffer(n.UNIFORM_BUFFER,b);for(let A=0,T=v.length;A<T;A++){const L=Array.isArray(v[A])?v[A]:[v[A]];for(let M=0,y=L.length;M<y;M++){const D=L[M];if(d(D,A,M,C)===!0){const F=D.__offset,N=Array.isArray(D.value)?D.value:[D.value];let K=0;for(let j=0;j<N.length;j++){const H=N[j],W=_(H);typeof H=="number"||typeof H=="boolean"?(D.__data[0]=H,n.bufferSubData(n.UNIFORM_BUFFER,F+K,D.__data)):H.isMatrix3?(D.__data[0]=H.elements[0],D.__data[1]=H.elements[1],D.__data[2]=H.elements[2],D.__data[3]=0,D.__data[4]=H.elements[3],D.__data[5]=H.elements[4],D.__data[6]=H.elements[5],D.__data[7]=0,D.__data[8]=H.elements[6],D.__data[9]=H.elements[7],D.__data[10]=H.elements[8],D.__data[11]=0):(H.toArray(D.__data,K),K+=W.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,F,D.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(x,b,v,C){const A=x.value,T=b+"_"+v;if(C[T]===void 0)return typeof A=="number"||typeof A=="boolean"?C[T]=A:C[T]=A.clone(),!0;{const L=C[T];if(typeof A=="number"||typeof A=="boolean"){if(L!==A)return C[T]=A,!0}else if(L.equals(A)===!1)return L.copy(A),!0}return!1}function g(x){const b=x.uniforms;let v=0;const C=16;for(let T=0,L=b.length;T<L;T++){const M=Array.isArray(b[T])?b[T]:[b[T]];for(let y=0,D=M.length;y<D;y++){const F=M[y],N=Array.isArray(F.value)?F.value:[F.value];for(let K=0,j=N.length;K<j;K++){const H=N[K],W=_(H),B=v%C,pe=B%W.boundary,be=B+pe;v+=pe,be!==0&&C-be<W.storage&&(v+=C-be),F.__data=new Float32Array(W.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=v,v+=W.storage}}}const A=v%C;return A>0&&(v+=C-A),x.__size=v,x.__cache={},this}function _(x){const b={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(b.boundary=4,b.storage=4):x.isVector2?(b.boundary=8,b.storage=8):x.isVector3||x.isColor?(b.boundary=16,b.storage=12):x.isVector4?(b.boundary=16,b.storage=16):x.isMatrix3?(b.boundary=48,b.storage=48):x.isMatrix4?(b.boundary=64,b.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),b}function m(x){const b=x.target;b.removeEventListener("dispose",m);const v=o.indexOf(b.__bindingPointIndex);o.splice(v,1),n.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function p(){for(const x in s)n.deleteBuffer(s[x]);o=[],s={},r={}}return{bind:l,update:c,dispose:p}}class hP{constructor(e={}){const{canvas:t=Qw(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let d;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=i.getContextAttributes().alpha}else d=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const x=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=zt,this.toneMapping=dr,this.toneMappingExposure=1;const v=this;let C=!1,A=0,T=0,L=null,M=-1,y=null;const D=new Ht,F=new Ht;let N=null;const K=new lt(0);let j=0,H=t.width,W=t.height,B=1,pe=null,be=null;const ue=new Ht(0,0,H,W),ce=new Ht(0,0,H,W);let he=!1;const k=new Tx;let G=!1,ie=!1;const U=new Gt,Y=new Gt,Z=new z,re=new Ht,Pe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let P=!1;function I(){return L===null?B:1}let E=i;function se(R,X){return t.getContext(R,X)}try{const R={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Dp}`),t.addEventListener("webglcontextlost",ge,!1),t.addEventListener("webglcontextrestored",Le,!1),t.addEventListener("webglcontextcreationerror",Ie,!1),E===null){const X="webgl2";if(E=se(X,R),E===null)throw se(X)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let J,Q,le,de,ee,w,S,O,q,ne,te,Ee,ve,Te,Xe,xe,Ce,ke,$e,Ae,Ye,We,dt,V;function Re(){J=new gC(E),J.init(),We=new tP(E,J),Q=new cC(E,J,e,We),le=new QR(E,J),Q.reverseDepthBuffer&&f&&le.buffers.depth.setReversed(!0),de=new xC(E),ee=new NR,w=new eP(E,J,le,ee,Q,We,de),S=new hC(v),O=new mC(v),q=new wT(E),dt=new aC(E,q),ne=new _C(E,q,de,dt),te=new SC(E,ne,q,de),$e=new bC(E,Q,w),xe=new uC(ee),Ee=new FR(v,S,O,J,Q,dt,xe),ve=new cP(v,ee),Te=new kR,Xe=new XR(J),ke=new oC(v,S,O,le,te,d,l),Ce=new KR(v,te,Q),V=new uP(E,de,Q,le),Ae=new lC(E,J,de),Ye=new vC(E,J,de),de.programs=Ee.programs,v.capabilities=Q,v.extensions=J,v.properties=ee,v.renderLists=Te,v.shadowMap=Ce,v.state=le,v.info=de}Re();const fe=new aP(v,E);this.xr=fe,this.getContext=function(){return E},this.getContextAttributes=function(){return E.getContextAttributes()},this.forceContextLoss=function(){const R=J.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=J.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return B},this.setPixelRatio=function(R){R!==void 0&&(B=R,this.setSize(H,W,!1))},this.getSize=function(R){return R.set(H,W)},this.setSize=function(R,X,oe=!0){if(fe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}H=R,W=X,t.width=Math.floor(R*B),t.height=Math.floor(X*B),oe===!0&&(t.style.width=R+"px",t.style.height=X+"px"),this.setViewport(0,0,R,X)},this.getDrawingBufferSize=function(R){return R.set(H*B,W*B).floor()},this.setDrawingBufferSize=function(R,X,oe){H=R,W=X,B=oe,t.width=Math.floor(R*oe),t.height=Math.floor(X*oe),this.setViewport(0,0,R,X)},this.getCurrentViewport=function(R){return R.copy(D)},this.getViewport=function(R){return R.copy(ue)},this.setViewport=function(R,X,oe,ae){R.isVector4?ue.set(R.x,R.y,R.z,R.w):ue.set(R,X,oe,ae),le.viewport(D.copy(ue).multiplyScalar(B).round())},this.getScissor=function(R){return R.copy(ce)},this.setScissor=function(R,X,oe,ae){R.isVector4?ce.set(R.x,R.y,R.z,R.w):ce.set(R,X,oe,ae),le.scissor(F.copy(ce).multiplyScalar(B).round())},this.getScissorTest=function(){return he},this.setScissorTest=function(R){le.setScissorTest(he=R)},this.setOpaqueSort=function(R){pe=R},this.setTransparentSort=function(R){be=R},this.getClearColor=function(R){return R.copy(ke.getClearColor())},this.setClearColor=function(){ke.setClearColor.apply(ke,arguments)},this.getClearAlpha=function(){return ke.getClearAlpha()},this.setClearAlpha=function(){ke.setClearAlpha.apply(ke,arguments)},this.clear=function(R=!0,X=!0,oe=!0){let ae=0;if(R){let $=!1;if(L!==null){const we=L.texture.format;$=we===Np||we===Fp||we===Op}if($){const we=L.texture.type,Ue=we===oi||we===xr||we===Tl||we===ao||we===Ip||we===Up,ze=ke.getClearColor(),He=ke.getClearAlpha(),Qe=ze.r,nt=ze.g,Ve=ze.b;Ue?(g[0]=Qe,g[1]=nt,g[2]=Ve,g[3]=He,E.clearBufferuiv(E.COLOR,0,g)):(_[0]=Qe,_[1]=nt,_[2]=Ve,_[3]=He,E.clearBufferiv(E.COLOR,0,_))}else ae|=E.COLOR_BUFFER_BIT}X&&(ae|=E.DEPTH_BUFFER_BIT),oe&&(ae|=E.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),E.clear(ae)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ge,!1),t.removeEventListener("webglcontextrestored",Le,!1),t.removeEventListener("webglcontextcreationerror",Ie,!1),Te.dispose(),Xe.dispose(),ee.dispose(),S.dispose(),O.dispose(),te.dispose(),dt.dispose(),V.dispose(),Ee.dispose(),fe.dispose(),fe.removeEventListener("sessionstart",Rr),fe.removeEventListener("sessionend",Pr),hi.stop()};function ge(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function Le(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const R=de.autoReset,X=Ce.enabled,oe=Ce.autoUpdate,ae=Ce.needsUpdate,$=Ce.type;Re(),de.autoReset=R,Ce.enabled=X,Ce.autoUpdate=oe,Ce.needsUpdate=ae,Ce.type=$}function Ie(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function tt(R){const X=R.target;X.removeEventListener("dispose",tt),bt(X)}function bt(R){Zt(R),ee.remove(R)}function Zt(R){const X=ee.get(R).programs;X!==void 0&&(X.forEach(function(oe){Ee.releaseProgram(oe)}),R.isShaderMaterial&&Ee.releaseShaderCache(R))}this.renderBufferDirect=function(R,X,oe,ae,$,we){X===null&&(X=Pe);const Ue=$.isMesh&&$.matrixWorld.determinant()<0,ze=NS(R,X,oe,ae,$);le.setMaterial(ae,Ue);let He=oe.index,Qe=1;if(ae.wireframe===!0){if(He=ne.getWireframeAttribute(oe),He===void 0)return;Qe=2}const nt=oe.drawRange,Ve=oe.attributes.position;let ht=nt.start*Qe,wt=(nt.start+nt.count)*Qe;we!==null&&(ht=Math.max(ht,we.start*Qe),wt=Math.min(wt,(we.start+we.count)*Qe)),He!==null?(ht=Math.max(ht,0),wt=Math.min(wt,He.count)):Ve!=null&&(ht=Math.max(ht,0),wt=Math.min(wt,Ve.count));const Ct=wt-ht;if(Ct<0||Ct===1/0)return;dt.setup($,ae,ze,oe,He);let En,mt=Ae;if(He!==null&&(En=q.get(He),mt=Ye,mt.setIndex(En)),$.isMesh)ae.wireframe===!0?(le.setLineWidth(ae.wireframeLinewidth*I()),mt.setMode(E.LINES)):mt.setMode(E.TRIANGLES);else if($.isLine){let Ge=ae.linewidth;Ge===void 0&&(Ge=1),le.setLineWidth(Ge*I()),$.isLineSegments?mt.setMode(E.LINES):$.isLineLoop?mt.setMode(E.LINE_LOOP):mt.setMode(E.LINE_STRIP)}else $.isPoints?mt.setMode(E.POINTS):$.isSprite&&mt.setMode(E.TRIANGLES);if($.isBatchedMesh)if($._multiDrawInstances!==null)mt.renderMultiDrawInstances($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount,$._multiDrawInstances);else if(J.get("WEBGL_multi_draw"))mt.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else{const Ge=$._multiDrawStarts,cs=$._multiDrawCounts,gt=$._multiDrawCount,wi=He?q.get(He).bytesPerElement:1,mo=ee.get(ae).currentProgram.getUniforms();for(let Xn=0;Xn<gt;Xn++)mo.setValue(E,"_gl_DrawID",Xn),mt.render(Ge[Xn]/wi,cs[Xn])}else if($.isInstancedMesh)mt.renderInstances(ht,Ct,$.count);else if(oe.isInstancedBufferGeometry){const Ge=oe._maxInstanceCount!==void 0?oe._maxInstanceCount:1/0,cs=Math.min(oe.instanceCount,Ge);mt.renderInstances(ht,Ct,cs)}else mt.render(ht,Ct)};function pt(R,X,oe){R.transparent===!0&&R.side===Es&&R.forceSinglePass===!1?(R.side=Fn,R.needsUpdate=!0,Ql(R,X,oe),R.side=bn,R.needsUpdate=!0,Ql(R,X,oe),R.side=Es):Ql(R,X,oe)}this.compile=function(R,X,oe=null){oe===null&&(oe=R),p=Xe.get(oe),p.init(X),b.push(p),oe.traverseVisible(function($){$.isLight&&$.layers.test(X.layers)&&(p.pushLight($),$.castShadow&&p.pushShadow($))}),R!==oe&&R.traverseVisible(function($){$.isLight&&$.layers.test(X.layers)&&(p.pushLight($),$.castShadow&&p.pushShadow($))}),p.setupLights();const ae=new Set;return R.traverse(function($){if(!($.isMesh||$.isPoints||$.isLine||$.isSprite))return;const we=$.material;if(we)if(Array.isArray(we))for(let Ue=0;Ue<we.length;Ue++){const ze=we[Ue];pt(ze,oe,$),ae.add(ze)}else pt(we,oe,$),ae.add(we)}),b.pop(),p=null,ae},this.compileAsync=function(R,X,oe=null){const ae=this.compile(R,X,oe);return new Promise($=>{function we(){if(ae.forEach(function(Ue){ee.get(Ue).currentProgram.isReady()&&ae.delete(Ue)}),ae.size===0){$(R);return}setTimeout(we,10)}J.get("KHR_parallel_shader_compile")!==null?we():setTimeout(we,10)})};let yn=null;function Mn(R){yn&&yn(R)}function Rr(){hi.stop()}function Pr(){hi.start()}const hi=new Ax;hi.setAnimationLoop(Mn),typeof self<"u"&&hi.setContext(self),this.setAnimationLoop=function(R){yn=R,fe.setAnimationLoop(R),R===null?hi.stop():hi.start()},fe.addEventListener("sessionstart",Rr),fe.addEventListener("sessionend",Pr),this.render=function(R,X){if(X!==void 0&&X.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),fe.enabled===!0&&fe.isPresenting===!0&&(fe.cameraAutoUpdate===!0&&fe.updateCamera(X),X=fe.getCamera()),R.isScene===!0&&R.onBeforeRender(v,R,X,L),p=Xe.get(R,b.length),p.init(X),b.push(p),Y.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),k.setFromProjectionMatrix(Y),ie=this.localClippingEnabled,G=xe.init(this.clippingPlanes,ie),m=Te.get(R,x.length),m.init(),x.push(m),fe.enabled===!0&&fe.isPresenting===!0){const we=v.xr.getDepthSensingMesh();we!==null&&Ra(we,X,-1/0,v.sortObjects)}Ra(R,X,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(pe,be),P=fe.enabled===!1||fe.isPresenting===!1||fe.hasDepthSensing()===!1,P&&ke.addToRenderList(m,R),this.info.render.frame++,G===!0&&xe.beginShadows();const oe=p.state.shadowsArray;Ce.render(oe,R,X),G===!0&&xe.endShadows(),this.info.autoReset===!0&&this.info.reset();const ae=m.opaque,$=m.transmissive;if(p.setupLights(),X.isArrayCamera){const we=X.cameras;if($.length>0)for(let Ue=0,ze=we.length;Ue<ze;Ue++){const He=we[Ue];Cm(ae,$,R,He)}P&&ke.render(R);for(let Ue=0,ze=we.length;Ue<ze;Ue++){const He=we[Ue];Pa(m,R,He,He.viewport)}}else $.length>0&&Cm(ae,$,R,X),P&&ke.render(R),Pa(m,R,X);L!==null&&(w.updateMultisampleRenderTarget(L),w.updateRenderTargetMipmap(L)),R.isScene===!0&&R.onAfterRender(v,R,X),dt.resetDefaultState(),M=-1,y=null,b.pop(),b.length>0?(p=b[b.length-1],G===!0&&xe.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,x.pop(),x.length>0?m=x[x.length-1]:m=null};function Ra(R,X,oe,ae){if(R.visible===!1)return;if(R.layers.test(X.layers)){if(R.isGroup)oe=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(X);else if(R.isLight)p.pushLight(R),R.castShadow&&p.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||k.intersectsSprite(R)){ae&&re.setFromMatrixPosition(R.matrixWorld).applyMatrix4(Y);const Ue=te.update(R),ze=R.material;ze.visible&&m.push(R,Ue,ze,oe,re.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||k.intersectsObject(R))){const Ue=te.update(R),ze=R.material;if(ae&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),re.copy(R.boundingSphere.center)):(Ue.boundingSphere===null&&Ue.computeBoundingSphere(),re.copy(Ue.boundingSphere.center)),re.applyMatrix4(R.matrixWorld).applyMatrix4(Y)),Array.isArray(ze)){const He=Ue.groups;for(let Qe=0,nt=He.length;Qe<nt;Qe++){const Ve=He[Qe],ht=ze[Ve.materialIndex];ht&&ht.visible&&m.push(R,Ue,ht,oe,re.z,Ve)}}else ze.visible&&m.push(R,Ue,ze,oe,re.z,null)}}const we=R.children;for(let Ue=0,ze=we.length;Ue<ze;Ue++)Ra(we[Ue],X,oe,ae)}function Pa(R,X,oe,ae){const $=R.opaque,we=R.transmissive,Ue=R.transparent;p.setupLightsView(oe),G===!0&&xe.setGlobalState(v.clippingPlanes,oe),ae&&le.viewport(D.copy(ae)),$.length>0&&Zl($,X,oe),we.length>0&&Zl(we,X,oe),Ue.length>0&&Zl(Ue,X,oe),le.buffers.depth.setTest(!0),le.buffers.depth.setMask(!0),le.buffers.color.setMask(!0),le.setPolygonOffset(!1)}function Cm(R,X,oe,ae){if((oe.isScene===!0?oe.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[ae.id]===void 0&&(p.state.transmissionRenderTarget[ae.id]=new ai(1,1,{generateMipmaps:!0,type:J.has("EXT_color_buffer_half_float")||J.has("EXT_color_buffer_float")?Fs:oi,minFilter:Kr,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ut.workingColorSpace}));const we=p.state.transmissionRenderTarget[ae.id],Ue=ae.viewport||D;we.setSize(Ue.z,Ue.w);const ze=v.getRenderTarget();v.setRenderTarget(we),v.getClearColor(K),j=v.getClearAlpha(),j<1&&v.setClearColor(16777215,.5),v.clear(),P&&ke.render(oe);const He=v.toneMapping;v.toneMapping=dr;const Qe=ae.viewport;if(ae.viewport!==void 0&&(ae.viewport=void 0),p.setupLightsView(ae),G===!0&&xe.setGlobalState(v.clippingPlanes,ae),Zl(R,oe,ae),w.updateMultisampleRenderTarget(we),w.updateRenderTargetMipmap(we),J.has("WEBGL_multisampled_render_to_texture")===!1){let nt=!1;for(let Ve=0,ht=X.length;Ve<ht;Ve++){const wt=X[Ve],Ct=wt.object,En=wt.geometry,mt=wt.material,Ge=wt.group;if(mt.side===Es&&Ct.layers.test(ae.layers)){const cs=mt.side;mt.side=Fn,mt.needsUpdate=!0,Rm(Ct,oe,ae,En,mt,Ge),mt.side=cs,mt.needsUpdate=!0,nt=!0}}nt===!0&&(w.updateMultisampleRenderTarget(we),w.updateRenderTargetMipmap(we))}v.setRenderTarget(ze),v.setClearColor(K,j),Qe!==void 0&&(ae.viewport=Qe),v.toneMapping=He}function Zl(R,X,oe){const ae=X.isScene===!0?X.overrideMaterial:null;for(let $=0,we=R.length;$<we;$++){const Ue=R[$],ze=Ue.object,He=Ue.geometry,Qe=ae===null?Ue.material:ae,nt=Ue.group;ze.layers.test(oe.layers)&&Rm(ze,X,oe,He,Qe,nt)}}function Rm(R,X,oe,ae,$,we){R.onBeforeRender(v,X,oe,ae,$,we),R.modelViewMatrix.multiplyMatrices(oe.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),$.onBeforeRender(v,X,oe,ae,R,we),$.transparent===!0&&$.side===Es&&$.forceSinglePass===!1?($.side=Fn,$.needsUpdate=!0,v.renderBufferDirect(oe,X,ae,$,R,we),$.side=bn,$.needsUpdate=!0,v.renderBufferDirect(oe,X,ae,$,R,we),$.side=Es):v.renderBufferDirect(oe,X,ae,$,R,we),R.onAfterRender(v,X,oe,ae,$,we)}function Ql(R,X,oe){X.isScene!==!0&&(X=Pe);const ae=ee.get(R),$=p.state.lights,we=p.state.shadowsArray,Ue=$.state.version,ze=Ee.getParameters(R,$.state,we,X,oe),He=Ee.getProgramCacheKey(ze);let Qe=ae.programs;ae.environment=R.isMeshStandardMaterial?X.environment:null,ae.fog=X.fog,ae.envMap=(R.isMeshStandardMaterial?O:S).get(R.envMap||ae.environment),ae.envMapRotation=ae.environment!==null&&R.envMap===null?X.environmentRotation:R.envMapRotation,Qe===void 0&&(R.addEventListener("dispose",tt),Qe=new Map,ae.programs=Qe);let nt=Qe.get(He);if(nt!==void 0){if(ae.currentProgram===nt&&ae.lightsStateVersion===Ue)return Dm(R,ze),nt}else ze.uniforms=Ee.getUniforms(R),R.onBeforeCompile(ze,v),nt=Ee.acquireProgram(ze,He),Qe.set(He,nt),ae.uniforms=ze.uniforms;const Ve=ae.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Ve.clippingPlanes=xe.uniform),Dm(R,ze),ae.needsLights=kS(R),ae.lightsStateVersion=Ue,ae.needsLights&&(Ve.ambientLightColor.value=$.state.ambient,Ve.lightProbe.value=$.state.probe,Ve.directionalLights.value=$.state.directional,Ve.directionalLightShadows.value=$.state.directionalShadow,Ve.spotLights.value=$.state.spot,Ve.spotLightShadows.value=$.state.spotShadow,Ve.rectAreaLights.value=$.state.rectArea,Ve.ltc_1.value=$.state.rectAreaLTC1,Ve.ltc_2.value=$.state.rectAreaLTC2,Ve.pointLights.value=$.state.point,Ve.pointLightShadows.value=$.state.pointShadow,Ve.hemisphereLights.value=$.state.hemi,Ve.directionalShadowMap.value=$.state.directionalShadowMap,Ve.directionalShadowMatrix.value=$.state.directionalShadowMatrix,Ve.spotShadowMap.value=$.state.spotShadowMap,Ve.spotLightMatrix.value=$.state.spotLightMatrix,Ve.spotLightMap.value=$.state.spotLightMap,Ve.pointShadowMap.value=$.state.pointShadowMap,Ve.pointShadowMatrix.value=$.state.pointShadowMatrix),ae.currentProgram=nt,ae.uniformsList=null,nt}function Pm(R){if(R.uniformsList===null){const X=R.currentProgram.getUniforms();R.uniformsList=Xc.seqWithValue(X.seq,R.uniforms)}return R.uniformsList}function Dm(R,X){const oe=ee.get(R);oe.outputColorSpace=X.outputColorSpace,oe.batching=X.batching,oe.batchingColor=X.batchingColor,oe.instancing=X.instancing,oe.instancingColor=X.instancingColor,oe.instancingMorph=X.instancingMorph,oe.skinning=X.skinning,oe.morphTargets=X.morphTargets,oe.morphNormals=X.morphNormals,oe.morphColors=X.morphColors,oe.morphTargetsCount=X.morphTargetsCount,oe.numClippingPlanes=X.numClippingPlanes,oe.numIntersection=X.numClipIntersection,oe.vertexAlphas=X.vertexAlphas,oe.vertexTangents=X.vertexTangents,oe.toneMapping=X.toneMapping}function NS(R,X,oe,ae,$){X.isScene!==!0&&(X=Pe),w.resetTextureUnits();const we=X.fog,Ue=ae.isMeshStandardMaterial?X.environment:null,ze=L===null?v.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:ya,He=(ae.isMeshStandardMaterial?O:S).get(ae.envMap||Ue),Qe=ae.vertexColors===!0&&!!oe.attributes.color&&oe.attributes.color.itemSize===4,nt=!!oe.attributes.tangent&&(!!ae.normalMap||ae.anisotropy>0),Ve=!!oe.morphAttributes.position,ht=!!oe.morphAttributes.normal,wt=!!oe.morphAttributes.color;let Ct=dr;ae.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(Ct=v.toneMapping);const En=oe.morphAttributes.position||oe.morphAttributes.normal||oe.morphAttributes.color,mt=En!==void 0?En.length:0,Ge=ee.get(ae),cs=p.state.lights;if(G===!0&&(ie===!0||R!==y)){const fi=R===y&&ae.id===M;xe.setState(ae,R,fi)}let gt=!1;ae.version===Ge.__version?(Ge.needsLights&&Ge.lightsStateVersion!==cs.state.version||Ge.outputColorSpace!==ze||$.isBatchedMesh&&Ge.batching===!1||!$.isBatchedMesh&&Ge.batching===!0||$.isBatchedMesh&&Ge.batchingColor===!0&&$.colorTexture===null||$.isBatchedMesh&&Ge.batchingColor===!1&&$.colorTexture!==null||$.isInstancedMesh&&Ge.instancing===!1||!$.isInstancedMesh&&Ge.instancing===!0||$.isSkinnedMesh&&Ge.skinning===!1||!$.isSkinnedMesh&&Ge.skinning===!0||$.isInstancedMesh&&Ge.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&Ge.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&Ge.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&Ge.instancingMorph===!1&&$.morphTexture!==null||Ge.envMap!==He||ae.fog===!0&&Ge.fog!==we||Ge.numClippingPlanes!==void 0&&(Ge.numClippingPlanes!==xe.numPlanes||Ge.numIntersection!==xe.numIntersection)||Ge.vertexAlphas!==Qe||Ge.vertexTangents!==nt||Ge.morphTargets!==Ve||Ge.morphNormals!==ht||Ge.morphColors!==wt||Ge.toneMapping!==Ct||Ge.morphTargetsCount!==mt)&&(gt=!0):(gt=!0,Ge.__version=ae.version);let wi=Ge.currentProgram;gt===!0&&(wi=Ql(ae,X,$));let mo=!1,Xn=!1,Da=!1;const Rt=wi.getUniforms(),Hi=Ge.uniforms;if(le.useProgram(wi.program)&&(mo=!0,Xn=!0,Da=!0),ae.id!==M&&(M=ae.id,Xn=!0),mo||y!==R){le.buffers.depth.getReversed()?(U.copy(R.projectionMatrix),eT(U),tT(U),Rt.setValue(E,"projectionMatrix",U)):Rt.setValue(E,"projectionMatrix",R.projectionMatrix),Rt.setValue(E,"viewMatrix",R.matrixWorldInverse);const Gs=Rt.map.cameraPosition;Gs!==void 0&&Gs.setValue(E,Z.setFromMatrixPosition(R.matrixWorld)),Q.logarithmicDepthBuffer&&Rt.setValue(E,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(ae.isMeshPhongMaterial||ae.isMeshToonMaterial||ae.isMeshLambertMaterial||ae.isMeshBasicMaterial||ae.isMeshStandardMaterial||ae.isShaderMaterial)&&Rt.setValue(E,"isOrthographic",R.isOrthographicCamera===!0),y!==R&&(y=R,Xn=!0,Da=!0)}if($.isSkinnedMesh){Rt.setOptional(E,$,"bindMatrix"),Rt.setOptional(E,$,"bindMatrixInverse");const fi=$.skeleton;fi&&(fi.boneTexture===null&&fi.computeBoneTexture(),Rt.setValue(E,"boneTexture",fi.boneTexture,w))}$.isBatchedMesh&&(Rt.setOptional(E,$,"batchingTexture"),Rt.setValue(E,"batchingTexture",$._matricesTexture,w),Rt.setOptional(E,$,"batchingIdTexture"),Rt.setValue(E,"batchingIdTexture",$._indirectTexture,w),Rt.setOptional(E,$,"batchingColorTexture"),$._colorsTexture!==null&&Rt.setValue(E,"batchingColorTexture",$._colorsTexture,w));const La=oe.morphAttributes;if((La.position!==void 0||La.normal!==void 0||La.color!==void 0)&&$e.update($,oe,wi),(Xn||Ge.receiveShadow!==$.receiveShadow)&&(Ge.receiveShadow=$.receiveShadow,Rt.setValue(E,"receiveShadow",$.receiveShadow)),ae.isMeshGouraudMaterial&&ae.envMap!==null&&(Hi.envMap.value=He,Hi.flipEnvMap.value=He.isCubeTexture&&He.isRenderTargetTexture===!1?-1:1),ae.isMeshStandardMaterial&&ae.envMap===null&&X.environment!==null&&(Hi.envMapIntensity.value=X.environmentIntensity),Xn&&(Rt.setValue(E,"toneMappingExposure",v.toneMappingExposure),Ge.needsLights&&BS(Hi,Da),we&&ae.fog===!0&&ve.refreshFogUniforms(Hi,we),ve.refreshMaterialUniforms(Hi,ae,B,W,p.state.transmissionRenderTarget[R.id]),Xc.upload(E,Pm(Ge),Hi,w)),ae.isShaderMaterial&&ae.uniformsNeedUpdate===!0&&(Xc.upload(E,Pm(Ge),Hi,w),ae.uniformsNeedUpdate=!1),ae.isSpriteMaterial&&Rt.setValue(E,"center",$.center),Rt.setValue(E,"modelViewMatrix",$.modelViewMatrix),Rt.setValue(E,"normalMatrix",$.normalMatrix),Rt.setValue(E,"modelMatrix",$.matrixWorld),ae.isShaderMaterial||ae.isRawShaderMaterial){const fi=ae.uniformsGroups;for(let Gs=0,Ws=fi.length;Gs<Ws;Gs++){const Lm=fi[Gs];V.update(Lm,wi),V.bind(Lm,wi)}}return wi}function BS(R,X){R.ambientLightColor.needsUpdate=X,R.lightProbe.needsUpdate=X,R.directionalLights.needsUpdate=X,R.directionalLightShadows.needsUpdate=X,R.pointLights.needsUpdate=X,R.pointLightShadows.needsUpdate=X,R.spotLights.needsUpdate=X,R.spotLightShadows.needsUpdate=X,R.rectAreaLights.needsUpdate=X,R.hemisphereLights.needsUpdate=X}function kS(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(R,X,oe){ee.get(R.texture).__webglTexture=X,ee.get(R.depthTexture).__webglTexture=oe;const ae=ee.get(R);ae.__hasExternalTextures=!0,ae.__autoAllocateDepthBuffer=oe===void 0,ae.__autoAllocateDepthBuffer||J.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),ae.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(R,X){const oe=ee.get(R);oe.__webglFramebuffer=X,oe.__useDefaultFramebuffer=X===void 0},this.setRenderTarget=function(R,X=0,oe=0){L=R,A=X,T=oe;let ae=!0,$=null,we=!1,Ue=!1;if(R){const He=ee.get(R);if(He.__useDefaultFramebuffer!==void 0)le.bindFramebuffer(E.FRAMEBUFFER,null),ae=!1;else if(He.__webglFramebuffer===void 0)w.setupRenderTarget(R);else if(He.__hasExternalTextures)w.rebindTextures(R,ee.get(R.texture).__webglTexture,ee.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const Ve=R.depthTexture;if(He.__boundDepthTexture!==Ve){if(Ve!==null&&ee.has(Ve)&&(R.width!==Ve.image.width||R.height!==Ve.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");w.setupDepthRenderbuffer(R)}}const Qe=R.texture;(Qe.isData3DTexture||Qe.isDataArrayTexture||Qe.isCompressedArrayTexture)&&(Ue=!0);const nt=ee.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(nt[X])?$=nt[X][oe]:$=nt[X],we=!0):R.samples>0&&w.useMultisampledRTT(R)===!1?$=ee.get(R).__webglMultisampledFramebuffer:Array.isArray(nt)?$=nt[oe]:$=nt,D.copy(R.viewport),F.copy(R.scissor),N=R.scissorTest}else D.copy(ue).multiplyScalar(B).floor(),F.copy(ce).multiplyScalar(B).floor(),N=he;if(le.bindFramebuffer(E.FRAMEBUFFER,$)&&ae&&le.drawBuffers(R,$),le.viewport(D),le.scissor(F),le.setScissorTest(N),we){const He=ee.get(R.texture);E.framebufferTexture2D(E.FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.TEXTURE_CUBE_MAP_POSITIVE_X+X,He.__webglTexture,oe)}else if(Ue){const He=ee.get(R.texture),Qe=X||0;E.framebufferTextureLayer(E.FRAMEBUFFER,E.COLOR_ATTACHMENT0,He.__webglTexture,oe||0,Qe)}M=-1},this.readRenderTargetPixels=function(R,X,oe,ae,$,we,Ue){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ze=ee.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Ue!==void 0&&(ze=ze[Ue]),ze){le.bindFramebuffer(E.FRAMEBUFFER,ze);try{const He=R.texture,Qe=He.format,nt=He.type;if(!Q.textureFormatReadable(Qe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Q.textureTypeReadable(nt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=R.width-ae&&oe>=0&&oe<=R.height-$&&E.readPixels(X,oe,ae,$,We.convert(Qe),We.convert(nt),we)}finally{const He=L!==null?ee.get(L).__webglFramebuffer:null;le.bindFramebuffer(E.FRAMEBUFFER,He)}}},this.readRenderTargetPixelsAsync=async function(R,X,oe,ae,$,we,Ue){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ze=ee.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Ue!==void 0&&(ze=ze[Ue]),ze){const He=R.texture,Qe=He.format,nt=He.type;if(!Q.textureFormatReadable(Qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Q.textureTypeReadable(nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(X>=0&&X<=R.width-ae&&oe>=0&&oe<=R.height-$){le.bindFramebuffer(E.FRAMEBUFFER,ze);const Ve=E.createBuffer();E.bindBuffer(E.PIXEL_PACK_BUFFER,Ve),E.bufferData(E.PIXEL_PACK_BUFFER,we.byteLength,E.STREAM_READ),E.readPixels(X,oe,ae,$,We.convert(Qe),We.convert(nt),0);const ht=L!==null?ee.get(L).__webglFramebuffer:null;le.bindFramebuffer(E.FRAMEBUFFER,ht);const wt=E.fenceSync(E.SYNC_GPU_COMMANDS_COMPLETE,0);return E.flush(),await Jw(E,wt,4),E.bindBuffer(E.PIXEL_PACK_BUFFER,Ve),E.getBufferSubData(E.PIXEL_PACK_BUFFER,0,we),E.deleteBuffer(Ve),E.deleteSync(wt),we}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(R,X=null,oe=0){R.isTexture!==!0&&(Za("WebGLRenderer: copyFramebufferToTexture function signature has changed."),X=arguments[0]||null,R=arguments[1]);const ae=Math.pow(2,-oe),$=Math.floor(R.image.width*ae),we=Math.floor(R.image.height*ae),Ue=X!==null?X.x:0,ze=X!==null?X.y:0;w.setTexture2D(R,0),E.copyTexSubImage2D(E.TEXTURE_2D,oe,0,0,Ue,ze,$,we),le.unbindTexture()},this.copyTextureToTexture=function(R,X,oe=null,ae=null,$=0){R.isTexture!==!0&&(Za("WebGLRenderer: copyTextureToTexture function signature has changed."),ae=arguments[0]||null,R=arguments[1],X=arguments[2],$=arguments[3]||0,oe=null);let we,Ue,ze,He,Qe,nt,Ve,ht,wt;const Ct=R.isCompressedTexture?R.mipmaps[$]:R.image;oe!==null?(we=oe.max.x-oe.min.x,Ue=oe.max.y-oe.min.y,ze=oe.isBox3?oe.max.z-oe.min.z:1,He=oe.min.x,Qe=oe.min.y,nt=oe.isBox3?oe.min.z:0):(we=Ct.width,Ue=Ct.height,ze=Ct.depth||1,He=0,Qe=0,nt=0),ae!==null?(Ve=ae.x,ht=ae.y,wt=ae.z):(Ve=0,ht=0,wt=0);const En=We.convert(X.format),mt=We.convert(X.type);let Ge;X.isData3DTexture?(w.setTexture3D(X,0),Ge=E.TEXTURE_3D):X.isDataArrayTexture||X.isCompressedArrayTexture?(w.setTexture2DArray(X,0),Ge=E.TEXTURE_2D_ARRAY):(w.setTexture2D(X,0),Ge=E.TEXTURE_2D),E.pixelStorei(E.UNPACK_FLIP_Y_WEBGL,X.flipY),E.pixelStorei(E.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),E.pixelStorei(E.UNPACK_ALIGNMENT,X.unpackAlignment);const cs=E.getParameter(E.UNPACK_ROW_LENGTH),gt=E.getParameter(E.UNPACK_IMAGE_HEIGHT),wi=E.getParameter(E.UNPACK_SKIP_PIXELS),mo=E.getParameter(E.UNPACK_SKIP_ROWS),Xn=E.getParameter(E.UNPACK_SKIP_IMAGES);E.pixelStorei(E.UNPACK_ROW_LENGTH,Ct.width),E.pixelStorei(E.UNPACK_IMAGE_HEIGHT,Ct.height),E.pixelStorei(E.UNPACK_SKIP_PIXELS,He),E.pixelStorei(E.UNPACK_SKIP_ROWS,Qe),E.pixelStorei(E.UNPACK_SKIP_IMAGES,nt);const Da=R.isDataArrayTexture||R.isData3DTexture,Rt=X.isDataArrayTexture||X.isData3DTexture;if(R.isRenderTargetTexture||R.isDepthTexture){const Hi=ee.get(R),La=ee.get(X),fi=ee.get(Hi.__renderTarget),Gs=ee.get(La.__renderTarget);le.bindFramebuffer(E.READ_FRAMEBUFFER,fi.__webglFramebuffer),le.bindFramebuffer(E.DRAW_FRAMEBUFFER,Gs.__webglFramebuffer);for(let Ws=0;Ws<ze;Ws++)Da&&E.framebufferTextureLayer(E.READ_FRAMEBUFFER,E.COLOR_ATTACHMENT0,ee.get(R).__webglTexture,$,nt+Ws),R.isDepthTexture?(Rt&&E.framebufferTextureLayer(E.DRAW_FRAMEBUFFER,E.COLOR_ATTACHMENT0,ee.get(X).__webglTexture,$,wt+Ws),E.blitFramebuffer(He,Qe,we,Ue,Ve,ht,we,Ue,E.DEPTH_BUFFER_BIT,E.NEAREST)):Rt?E.copyTexSubImage3D(Ge,$,Ve,ht,wt+Ws,He,Qe,we,Ue):E.copyTexSubImage2D(Ge,$,Ve,ht,wt+Ws,He,Qe,we,Ue);le.bindFramebuffer(E.READ_FRAMEBUFFER,null),le.bindFramebuffer(E.DRAW_FRAMEBUFFER,null)}else Rt?R.isDataTexture||R.isData3DTexture?E.texSubImage3D(Ge,$,Ve,ht,wt,we,Ue,ze,En,mt,Ct.data):X.isCompressedArrayTexture?E.compressedTexSubImage3D(Ge,$,Ve,ht,wt,we,Ue,ze,En,Ct.data):E.texSubImage3D(Ge,$,Ve,ht,wt,we,Ue,ze,En,mt,Ct):R.isDataTexture?E.texSubImage2D(E.TEXTURE_2D,$,Ve,ht,we,Ue,En,mt,Ct.data):R.isCompressedTexture?E.compressedTexSubImage2D(E.TEXTURE_2D,$,Ve,ht,Ct.width,Ct.height,En,Ct.data):E.texSubImage2D(E.TEXTURE_2D,$,Ve,ht,we,Ue,En,mt,Ct);E.pixelStorei(E.UNPACK_ROW_LENGTH,cs),E.pixelStorei(E.UNPACK_IMAGE_HEIGHT,gt),E.pixelStorei(E.UNPACK_SKIP_PIXELS,wi),E.pixelStorei(E.UNPACK_SKIP_ROWS,mo),E.pixelStorei(E.UNPACK_SKIP_IMAGES,Xn),$===0&&X.generateMipmaps&&E.generateMipmap(Ge),le.unbindTexture()},this.copyTextureToTexture3D=function(R,X,oe=null,ae=null,$=0){return R.isTexture!==!0&&(Za("WebGLRenderer: copyTextureToTexture3D function signature has changed."),oe=arguments[0]||null,ae=arguments[1]||null,R=arguments[2],X=arguments[3],$=arguments[4]||0),Za('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(R,X,oe,ae,$)},this.initRenderTarget=function(R){ee.get(R).__webglFramebuffer===void 0&&w.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?w.setTextureCube(R,0):R.isData3DTexture?w.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?w.setTexture2DArray(R,0):w.setTexture2D(R,0),le.unbindTexture()},this.resetState=function(){A=0,T=0,L=null,le.reset(),dt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Rs}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=ut._getDrawingBufferColorSpace(e),t.unpackColorSpace=ut._getUnpackColorSpace()}}class Ad extends ii{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ns,this.environmentIntensity=1,this.environmentRotation=new Ns,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const w_={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(this.files[n]=e)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};class fP{constructor(e,t,i){const s=this;let r=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.itemStart=function(u){a++,r===!1&&s.onStart!==void 0&&s.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,s.onProgress!==void 0&&s.onProgress(u,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){const h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,f=c.length;h<f;h+=2){const d=c[h],g=c[h+1];if(d.global&&(d.lastIndex=0),d.test(u))return g}return null}}}const dP=new fP;class Gp{constructor(e){this.manager=e!==void 0?e:dP,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const i=this;return new Promise(function(s,r){i.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Gp.DEFAULT_MATERIAL_NAME="__DEFAULT";class pP extends Gp{constructor(e){super(e)}load(e,t,i,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=w_.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;const a=Al("img");function l(){u(),w_.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(h){u(),s&&s(h),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}}class mP extends Gp{constructor(e){super(e)}load(e,t,i,s){const r=new cn,o=new pP(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},i,s),r}}class ou{constructor(e){this.value=e}clone(){return new ou(this.value.clone===void 0?this.value:this.value.clone())}}const T_=new Gt;class Lx{constructor(e,t,i=0,s=1/0){this.ray=new bx(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new kp,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return T_.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(T_),this}intersectObject(e,t=!0,i=[]){return Cd(e,this,i,t),i.sort(A_),i}intersectObjects(e,t=!0,i=[]){for(let s=0,r=e.length;s<r;s++)Cd(e[s],this,i,t);return i.sort(A_),i}}function A_(n,e){return n.distance-e.distance}function Cd(n,e,t,i){let s=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let o=0,a=r.length;o<a;o++)Cd(r[o],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Dp}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Dp);/**
 * postprocessing v6.37.1 build Thu Mar 06 2025
 * https://github.com/pmndrs/postprocessing
 * Copyright 2015-2025 Raoul van Rüschen
 * @license Zlib
 */var jh=1/1e3,gP=1e3,_P=class{constructor(){this.startTime=performance.now(),this.previousTime=0,this.currentTime=0,this._delta=0,this._elapsed=0,this._fixedDelta=1e3/60,this.timescale=1,this.useFixedDelta=!1,this._autoReset=!1}get autoReset(){return this._autoReset}set autoReset(n){typeof document<"u"&&document.hidden!==void 0&&(n?document.addEventListener("visibilitychange",this):document.removeEventListener("visibilitychange",this),this._autoReset=n)}get delta(){return this._delta*jh}get fixedDelta(){return this._fixedDelta*jh}set fixedDelta(n){this._fixedDelta=n*gP}get elapsed(){return this._elapsed*jh}update(n){this.useFixedDelta?this._delta=this.fixedDelta:(this.previousTime=this.currentTime,this.currentTime=(n!==void 0?n:performance.now())-this.startTime,this._delta=this.currentTime-this.previousTime),this._delta*=this.timescale,this._elapsed+=this._delta}reset(){this._delta=0,this._elapsed=0,this.currentTime=performance.now()-this.startTime}getDelta(){return this.delta}getElapsed(){return this.elapsed}handleEvent(n){document.hidden||(this.currentTime=performance.now()-this.startTime)}dispose(){this.autoReset=!1}},vP=(()=>{const n=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),e=new Float32Array([0,0,2,0,0,2]),t=new Vs;return t.setAttribute("position",new Nn(n,3)),t.setAttribute("uv",new Nn(e,2)),t})(),wa=class Rd{static get fullscreenGeometry(){return vP}constructor(e="Pass",t=new Ad,i=new Vu){this.name=e,this.renderer=null,this.scene=t,this.camera=i,this.screen=null,this.rtt=!0,this.needsSwap=!0,this.needsDepthTexture=!1,this.enabled=!0}get renderToScreen(){return!this.rtt}set renderToScreen(e){if(this.rtt===e){const t=this.fullscreenMaterial;t!==null&&(t.needsUpdate=!0),this.rtt=!e}}set mainScene(e){}set mainCamera(e){}setRenderer(e){this.renderer=e}isEnabled(){return this.enabled}setEnabled(e){this.enabled=e}get fullscreenMaterial(){return this.screen!==null?this.screen.material:null}set fullscreenMaterial(e){let t=this.screen;t!==null?t.material=e:(t=new Nt(Rd.fullscreenGeometry,e),t.frustumCulled=!1,this.scene===null&&(this.scene=new Ad),this.scene.add(t),this.screen=t)}getFullscreenMaterial(){return this.fullscreenMaterial}setFullscreenMaterial(e){this.fullscreenMaterial=e}getDepthTexture(){return null}setDepthTexture(e,t=mx){}render(e,t,i,s,r){throw new Error("Render method not implemented!")}setSize(e,t){}initialize(e,t,i){}dispose(){for(const e of Object.keys(this)){const t=this[e];(t instanceof ai||t instanceof ql||t instanceof cn||t instanceof Rd)&&this[e].dispose()}this.fullscreenMaterial!==null&&this.fullscreenMaterial.dispose()}},xP=class extends wa{constructor(){super("ClearMaskPass",null,null),this.needsSwap=!1}render(n,e,t,i,s){const r=n.state.buffers.stencil;r.setLocked(!1),r.setTest(!1)}},bP=`#include <common>
#include <dithering_pars_fragment>
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
uniform float opacity;varying vec2 vUv;void main(){vec4 texel=texture2D(inputBuffer,vUv);gl_FragColor=opacity*texel;
#include <colorspace_fragment>
#include <dithering_fragment>
}`,SP="varying vec2 vUv;void main(){vUv=position.xy*0.5+0.5;gl_Position=vec4(position.xy,1.0,1.0);}",yP=class extends Wt{constructor(){super({name:"CopyMaterial",uniforms:{inputBuffer:new ou(null),opacity:new ou(1)},blending:Is,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:bP,vertexShader:SP})}set inputBuffer(n){this.uniforms.inputBuffer.value=n}setInputBuffer(n){this.uniforms.inputBuffer.value=n}getOpacity(n){return this.uniforms.opacity.value}setOpacity(n){this.uniforms.opacity.value=n}},MP=class extends wa{constructor(n,e=!0){super("CopyPass"),this.fullscreenMaterial=new yP,this.needsSwap=!1,this.renderTarget=n,n===void 0&&(this.renderTarget=new ai(1,1,{minFilter:Un,magFilter:Un,stencilBuffer:!1,depthBuffer:!1}),this.renderTarget.texture.name="CopyPass.Target"),this.autoResize=e}get resize(){return this.autoResize}set resize(n){this.autoResize=n}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}setAutoResizeEnabled(n){this.autoResize=n}render(n,e,t,i,s){this.fullscreenMaterial.inputBuffer=e.texture,n.setRenderTarget(this.renderToScreen?null:this.renderTarget),n.render(this.scene,this.camera)}setSize(n,e){this.autoResize&&this.renderTarget.setSize(n,e)}initialize(n,e,t){t!==void 0&&(this.renderTarget.texture.type=t,t!==oi?this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1":n!==null&&n.outputColorSpace===zt&&(this.renderTarget.texture.colorSpace=zt))}},C_=new lt,EP=class extends wa{constructor(n=!0,e=!0,t=!1){super("ClearPass",null,null),this.needsSwap=!1,this.color=n,this.depth=e,this.stencil=t,this.overrideClearColor=null,this.overrideClearAlpha=-1}setClearFlags(n,e,t){this.color=n,this.depth=e,this.stencil=t}getOverrideClearColor(){return this.overrideClearColor}setOverrideClearColor(n){this.overrideClearColor=n}getOverrideClearAlpha(){return this.overrideClearAlpha}setOverrideClearAlpha(n){this.overrideClearAlpha=n}render(n,e,t,i,s){const r=this.overrideClearColor,o=this.overrideClearAlpha,a=n.getClearAlpha(),l=r!==null,c=o>=0;l?(n.getClearColor(C_),n.setClearColor(r,c?o:a)):c&&n.setClearAlpha(o),n.setRenderTarget(this.renderToScreen?null:e),n.clear(this.color,this.depth,this.stencil),l?n.setClearColor(C_,a):c&&n.setClearAlpha(a)}},wP=class extends wa{constructor(n,e){super("MaskPass",n,e),this.needsSwap=!1,this.clearPass=new EP(!1,!1,!0),this.inverse=!1}set mainScene(n){this.scene=n}set mainCamera(n){this.camera=n}get inverted(){return this.inverse}set inverted(n){this.inverse=n}get clear(){return this.clearPass.enabled}set clear(n){this.clearPass.enabled=n}getClearPass(){return this.clearPass}isInverted(){return this.inverted}setInverted(n){this.inverted=n}render(n,e,t,i,s){const r=n.getContext(),o=n.state.buffers,a=this.scene,l=this.camera,c=this.clearPass,u=this.inverted?0:1,h=1-u;o.color.setMask(!1),o.depth.setMask(!1),o.color.setLocked(!0),o.depth.setLocked(!0),o.stencil.setTest(!0),o.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),o.stencil.setFunc(r.ALWAYS,u,4294967295),o.stencil.setClear(h),o.stencil.setLocked(!0),this.clearPass.enabled&&(this.renderToScreen?c.render(n,null):(c.render(n,e),c.render(n,t))),this.renderToScreen?(n.setRenderTarget(null),n.render(a,l)):(n.setRenderTarget(e),n.render(a,l),n.setRenderTarget(t),n.render(a,l)),o.color.setLocked(!1),o.depth.setLocked(!1),o.stencil.setLocked(!1),o.stencil.setFunc(r.EQUAL,1,4294967295),o.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),o.stencil.setLocked(!0)}},TP=class{constructor(n=null,{depthBuffer:e=!0,stencilBuffer:t=!1,multisampling:i=0,frameBufferType:s}={}){this.renderer=null,this.inputBuffer=this.createBuffer(e,t,s,i),this.outputBuffer=this.inputBuffer.clone(),this.copyPass=new MP,this.depthTexture=null,this.passes=[],this.timer=new _P,this.autoRenderToScreen=!0,this.setRenderer(n)}get multisampling(){return this.inputBuffer.samples||0}set multisampling(n){const e=this.inputBuffer,t=this.multisampling;t>0&&n>0?(this.inputBuffer.samples=n,this.outputBuffer.samples=n,this.inputBuffer.dispose(),this.outputBuffer.dispose()):t!==n&&(this.inputBuffer.dispose(),this.outputBuffer.dispose(),this.inputBuffer=this.createBuffer(e.depthBuffer,e.stencilBuffer,e.texture.type,n),this.inputBuffer.depthTexture=this.depthTexture,this.outputBuffer=this.inputBuffer.clone())}getTimer(){return this.timer}getRenderer(){return this.renderer}setRenderer(n){if(this.renderer=n,n!==null){const e=n.getSize(new qe),t=n.getContext().getContextAttributes().alpha,i=this.inputBuffer.texture.type;i===oi&&n.outputColorSpace===zt&&(this.inputBuffer.texture.colorSpace=zt,this.outputBuffer.texture.colorSpace=zt,this.inputBuffer.dispose(),this.outputBuffer.dispose()),n.autoClear=!1,this.setSize(e.width,e.height);for(const s of this.passes)s.initialize(n,t,i)}}replaceRenderer(n,e=!0){const t=this.renderer,i=t.domElement.parentNode;return this.setRenderer(n),e&&i!==null&&(i.removeChild(t.domElement),i.appendChild(n.domElement)),t}createDepthTexture(){const n=this.depthTexture=new Vp;return this.inputBuffer.depthTexture=n,this.inputBuffer.dispose(),this.inputBuffer.stencilBuffer?(n.format=lo,n.type=ao):n.type=xr,n}deleteDepthTexture(){if(this.depthTexture!==null){this.depthTexture.dispose(),this.depthTexture=null,this.inputBuffer.depthTexture=null,this.inputBuffer.dispose();for(const n of this.passes)n.setDepthTexture(null)}}createBuffer(n,e,t,i){const s=this.renderer,r=s===null?new qe:s.getDrawingBufferSize(new qe),o={minFilter:Un,magFilter:Un,stencilBuffer:e,depthBuffer:n,type:t},a=new ai(r.width,r.height,o);return i>0&&(a.ignoreDepthForMultisampleCopy=!1,a.samples=i),t===oi&&s!==null&&s.outputColorSpace===zt&&(a.texture.colorSpace=zt),a.texture.name="EffectComposer.Buffer",a.texture.generateMipmaps=!1,a}setMainScene(n){for(const e of this.passes)e.mainScene=n}setMainCamera(n){for(const e of this.passes)e.mainCamera=n}addPass(n,e){const t=this.passes,i=this.renderer,s=i.getDrawingBufferSize(new qe),r=i.getContext().getContextAttributes().alpha,o=this.inputBuffer.texture.type;if(n.setRenderer(i),n.setSize(s.width,s.height),n.initialize(i,r,o),this.autoRenderToScreen&&(t.length>0&&(t[t.length-1].renderToScreen=!1),n.renderToScreen&&(this.autoRenderToScreen=!1)),e!==void 0?t.splice(e,0,n):t.push(n),this.autoRenderToScreen&&(t[t.length-1].renderToScreen=!0),n.needsDepthTexture||this.depthTexture!==null)if(this.depthTexture===null){const a=this.createDepthTexture();for(n of t)n.setDepthTexture(a)}else n.setDepthTexture(this.depthTexture)}removePass(n){const e=this.passes,t=e.indexOf(n);if(t!==-1&&e.splice(t,1).length>0){if(this.depthTexture!==null){const r=(a,l)=>a||l.needsDepthTexture;e.reduce(r,!1)||(n.getDepthTexture()===this.depthTexture&&n.setDepthTexture(null),this.deleteDepthTexture())}this.autoRenderToScreen&&t===e.length&&(n.renderToScreen=!1,e.length>0&&(e[e.length-1].renderToScreen=!0))}}removeAllPasses(){const n=this.passes;this.deleteDepthTexture(),n.length>0&&(this.autoRenderToScreen&&(n[n.length-1].renderToScreen=!1),this.passes=[])}render(n){const e=this.renderer,t=this.copyPass;let i=this.inputBuffer,s=this.outputBuffer,r=!1,o,a,l;n===void 0&&(this.timer.update(),n=this.timer.getDelta());for(const c of this.passes)c.enabled&&(c.render(e,i,s,n,r),c.needsSwap&&(r&&(t.renderToScreen=c.renderToScreen,o=e.getContext(),a=e.state.buffers.stencil,a.setFunc(o.NOTEQUAL,1,4294967295),t.render(e,i,s,n,r),a.setFunc(o.EQUAL,1,4294967295)),l=i,i=s,s=l),c instanceof wP?r=!0:c instanceof xP&&(r=!1))}setSize(n,e,t){const i=this.renderer,s=i.getSize(new qe);(n===void 0||e===void 0)&&(n=s.width,e=s.height),(s.width!==n||s.height!==e)&&i.setSize(n,e,t);const r=i.getDrawingBufferSize(new qe);this.inputBuffer.setSize(r.width,r.height),this.outputBuffer.setSize(r.width,r.height);for(const o of this.passes)o.setSize(r.width,r.height)}reset(){this.dispose(),this.autoRenderToScreen=!0}dispose(){for(const n of this.passes)n.dispose();this.passes=[],this.inputBuffer!==null&&this.inputBuffer.dispose(),this.outputBuffer!==null&&this.outputBuffer.dispose(),this.deleteDepthTexture(),this.copyPass.dispose(),this.timer.dispose(),wa.fullscreenGeometry.dispose()}},AP=class extends wa{constructor(n,e="inputBuffer"){super("ShaderPass"),this.fullscreenMaterial=n,this.input=e}setInput(n){this.input=n}render(n,e,t,i,s){const r=this.fullscreenMaterial.uniforms;e!==null&&r!==void 0&&r[this.input]!==void 0&&(r[this.input].value=e.texture),n.setRenderTarget(this.renderToScreen?null:t),n.render(this.scene,this.camera)}initialize(n,e,t){t!==void 0&&t!==oi&&(this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}};function bs(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function Ix(n,e){n.prototype=Object.create(e.prototype),n.prototype.constructor=n,n.__proto__=e}/*!
 * GSAP 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var si={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},fa={duration:.5,overwrite:!1,delay:0},Wp,un,Dt,ns=1e8,an=1/ns,Pd=Math.PI*2,CP=Pd/4,RP=0,Ux=Math.sqrt,PP=Math.cos,DP=Math.sin,en=function(e){return typeof e=="string"},Bt=function(e){return typeof e=="function"},Bs=function(e){return typeof e=="number"},Xp=function(e){return typeof e>"u"},os=function(e){return typeof e=="object"},Bn=function(e){return e!==!1},qp=function(){return typeof window<"u"},Tc=function(e){return Bt(e)||en(e)},Ox=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},hn=Array.isArray,Dd=/(?:-?\.?\d|\.)+/gi,Fx=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,No=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Kh=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Nx=/[+-]=-?[.\d]+/,Bx=/[^,'"\[\]\s]+/gi,LP=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,It,qi,Ld,$p,li={},au={},kx,zx=function(e){return(au=co(e,li))&&Gn},Yp=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},Cl=function(e,t){return!t&&console.warn(e)},Hx=function(e,t){return e&&(li[e]=t)&&au&&(au[e]=t)||li},Rl=function(){return 0},IP={suppressEvents:!0,isStart:!0,kill:!1},qc={suppressEvents:!0,kill:!1},UP={suppressEvents:!0},jp={},pr=[],Id={},Vx,Zn={},Zh={},R_=30,$c=[],Kp="",Zp=function(e){var t=e[0],i,s;if(os(t)||Bt(t)||(e=[e]),!(i=(t._gsap||{}).harness)){for(s=$c.length;s--&&!$c[s].targetTest(t););i=$c[s]}for(s=e.length;s--;)e[s]&&(e[s]._gsap||(e[s]._gsap=new fb(e[s],i)))||e.splice(s,1);return e},eo=function(e){return e._gsap||Zp(xi(e))[0]._gsap},Gx=function(e,t,i){return(i=e[t])&&Bt(i)?e[t]():Xp(i)&&e.getAttribute&&e.getAttribute(t)||i},kn=function(e,t){return(e=e.split(",")).forEach(t)||e},kt=function(e){return Math.round(e*1e5)/1e5||0},Jt=function(e){return Math.round(e*1e7)/1e7||0},Qo=function(e,t){var i=t.charAt(0),s=parseFloat(t.substr(2));return e=parseFloat(e),i==="+"?e+s:i==="-"?e-s:i==="*"?e*s:e/s},OP=function(e,t){for(var i=t.length,s=0;e.indexOf(t[s])<0&&++s<i;);return s<i},lu=function(){var e=pr.length,t=pr.slice(0),i,s;for(Id={},pr.length=0,i=0;i<e;i++)s=t[i],s&&s._lazy&&(s.render(s._lazy[0],s._lazy[1],!0)._lazy=0)},Wx=function(e,t,i,s){pr.length&&!un&&lu(),e.render(t,i,un&&t<0&&(e._initted||e._startAt)),pr.length&&!un&&lu()},Xx=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(Bx).length<2?t:en(e)?e.trim():e},qx=function(e){return e},Si=function(e,t){for(var i in t)i in e||(e[i]=t[i]);return e},FP=function(e){return function(t,i){for(var s in i)s in t||s==="duration"&&e||s==="ease"||(t[s]=i[s])}},co=function(e,t){for(var i in t)e[i]=t[i];return e},P_=function n(e,t){for(var i in t)i!=="__proto__"&&i!=="constructor"&&i!=="prototype"&&(e[i]=os(t[i])?n(e[i]||(e[i]={}),t[i]):t[i]);return e},cu=function(e,t){var i={},s;for(s in e)s in t||(i[s]=e[s]);return i},dl=function(e){var t=e.parent||It,i=e.keyframes?FP(hn(e.keyframes)):Si;if(Bn(e.inherit))for(;t;)i(e,t.vars.defaults),t=t.parent||t._dp;return e},NP=function(e,t){for(var i=e.length,s=i===t.length;s&&i--&&e[i]===t[i];);return i<0},$x=function(e,t,i,s,r){var o=e[s],a;if(r)for(a=t[r];o&&o[r]>a;)o=o._prev;return o?(t._next=o._next,o._next=t):(t._next=e[i],e[i]=t),t._next?t._next._prev=t:e[s]=t,t._prev=o,t.parent=t._dp=e,t},Wu=function(e,t,i,s){i===void 0&&(i="_first"),s===void 0&&(s="_last");var r=t._prev,o=t._next;r?r._next=o:e[i]===t&&(e[i]=o),o?o._prev=r:e[s]===t&&(e[s]=r),t._next=t._prev=t.parent=null},br=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},to=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var i=e;i;)i._dirty=1,i=i.parent;return e},BP=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},Ud=function(e,t,i,s){return e._startAt&&(un?e._startAt.revert(qc):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,s))},kP=function n(e){return!e||e._ts&&n(e.parent)},D_=function(e){return e._repeat?da(e._tTime,e=e.duration()+e._rDelay)*e:0},da=function(e,t){var i=Math.floor(e/=t);return e&&i===e?i-1:i},uu=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Xu=function(e){return e._end=Jt(e._start+(e._tDur/Math.abs(e._ts||e._rts||an)||0))},qu=function(e,t){var i=e._dp;return i&&i.smoothChildTiming&&e._ts&&(e._start=Jt(i._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Xu(e),i._dirty||to(i,e)),e},Yx=function(e,t){var i;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(i=uu(e.rawTime(),t),(!t._dur||Yl(0,t.totalDuration(),i)-t._tTime>an)&&t.render(i,!0)),to(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(i=e;i._dp;)i.rawTime()>=0&&i.totalTime(i._tTime),i=i._dp;e._zTime=-1e-8}},Zi=function(e,t,i,s){return t.parent&&br(t),t._start=Jt((Bs(i)?i:i||e!==It?gi(e,i,t):e._time)+t._delay),t._end=Jt(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),$x(e,t,"_first","_last",e._sort?"_start":0),Od(t)||(e._recent=t),s||Yx(e,t),e._ts<0&&qu(e,e._tTime),e},jx=function(e,t){return(li.ScrollTrigger||Yp("scrollTrigger",t))&&li.ScrollTrigger.create(t,e)},Kx=function(e,t,i,s,r){if(Jp(e,t,r),!e._initted)return 1;if(!i&&e._pt&&!un&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&Vx!==Qn.frame)return pr.push(e),e._lazy=[r,s],1},zP=function n(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||n(t))},Od=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},HP=function(e,t,i,s){var r=e.ratio,o=t<0||!t&&(!e._start&&zP(e)&&!(!e._initted&&Od(e))||(e._ts<0||e._dp._ts<0)&&!Od(e))?0:1,a=e._rDelay,l=0,c,u,h;if(a&&e._repeat&&(l=Yl(0,e._tDur,t),u=da(l,a),e._yoyo&&u&1&&(o=1-o),u!==da(e._tTime,a)&&(r=1-o,e.vars.repeatRefresh&&e._initted&&e.invalidate())),o!==r||un||s||e._zTime===an||!t&&e._zTime){if(!e._initted&&Kx(e,t,s,i,l))return;for(h=e._zTime,e._zTime=t||(i?an:0),i||(i=t&&!h),e.ratio=o,e._from&&(o=1-o),e._time=0,e._tTime=l,c=e._pt;c;)c.r(o,c.d),c=c._next;t<0&&Ud(e,t,i,!0),e._onUpdate&&!i&&ni(e,"onUpdate"),l&&e._repeat&&!i&&e.parent&&ni(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===o&&(o&&br(e,1),!i&&!un&&(ni(e,o?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},VP=function(e,t,i){var s;if(i>t)for(s=e._first;s&&s._start<=i;){if(s.data==="isPause"&&s._start>t)return s;s=s._next}else for(s=e._last;s&&s._start>=i;){if(s.data==="isPause"&&s._start<t)return s;s=s._prev}},pa=function(e,t,i,s){var r=e._repeat,o=Jt(t)||0,a=e._tTime/e._tDur;return a&&!s&&(e._time*=o/e._dur),e._dur=o,e._tDur=r?r<0?1e10:Jt(o*(r+1)+e._rDelay*r):o,a>0&&!s&&qu(e,e._tTime=e._tDur*a),e.parent&&Xu(e),i||to(e.parent,e),e},L_=function(e){return e instanceof _n?to(e):pa(e,e._dur)},GP={_start:0,endTime:Rl,totalDuration:Rl},gi=function n(e,t,i){var s=e.labels,r=e._recent||GP,o=e.duration()>=ns?r.endTime(!1):e._dur,a,l,c;return en(t)&&(isNaN(t)||t in s)?(l=t.charAt(0),c=t.substr(-1)==="%",a=t.indexOf("="),l==="<"||l===">"?(a>=0&&(t=t.replace(/=/,"")),(l==="<"?r._start:r.endTime(r._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(a<0?r:i).totalDuration()/100:1)):a<0?(t in s||(s[t]=o),s[t]):(l=parseFloat(t.charAt(a-1)+t.substr(a+1)),c&&i&&(l=l/100*(hn(i)?i[0]:i).totalDuration()),a>1?n(e,t.substr(0,a-1),i)+l:o+l)):t==null?o:+t},pl=function(e,t,i){var s=Bs(t[1]),r=(s?2:1)+(e<2?0:1),o=t[r],a,l;if(s&&(o.duration=t[1]),o.parent=i,e){for(a=o,l=i;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=Bn(l.vars.inherit)&&l.parent;o.immediateRender=Bn(a.immediateRender),e<2?o.runBackwards=1:o.startAt=t[r-1]}return new $t(t[0],o,t[r+1])},Tr=function(e,t){return e||e===0?t(e):t},Yl=function(e,t,i){return i<e?e:i>t?t:i},on=function(e,t){return!en(e)||!(t=LP.exec(e))?"":t[1]},WP=function(e,t,i){return Tr(i,function(s){return Yl(e,t,s)})},Fd=[].slice,Zx=function(e,t){return e&&os(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&os(e[0]))&&!e.nodeType&&e!==qi},XP=function(e,t,i){return i===void 0&&(i=[]),e.forEach(function(s){var r;return en(s)&&!t||Zx(s,1)?(r=i).push.apply(r,xi(s)):i.push(s)})||i},xi=function(e,t,i){return Dt&&!t&&Dt.selector?Dt.selector(e):en(e)&&!i&&(Ld||!ma())?Fd.call((t||$p).querySelectorAll(e),0):hn(e)?XP(e,i):Zx(e)?Fd.call(e,0):e?[e]:[]},Nd=function(e){return e=xi(e)[0]||Cl("Invalid scope")||{},function(t){var i=e.current||e.nativeElement||e;return xi(t,i.querySelectorAll?i:i===e?Cl("Invalid scope")||$p.createElement("div"):e)}},Qx=function(e){return e.sort(function(){return .5-Math.random()})},Jx=function(e){if(Bt(e))return e;var t=os(e)?e:{each:e},i=no(t.ease),s=t.from||0,r=parseFloat(t.base)||0,o={},a=s>0&&s<1,l=isNaN(s)||a,c=t.axis,u=s,h=s;return en(s)?u=h={center:.5,edges:.5,end:1}[s]||0:!a&&l&&(u=s[0],h=s[1]),function(f,d,g){var _=(g||t).length,m=o[_],p,x,b,v,C,A,T,L,M;if(!m){if(M=t.grid==="auto"?0:(t.grid||[1,ns])[1],!M){for(T=-1e8;T<(T=g[M++].getBoundingClientRect().left)&&M<_;);M<_&&M--}for(m=o[_]=[],p=l?Math.min(M,_)*u-.5:s%M,x=M===ns?0:l?_*h/M-.5:s/M|0,T=0,L=ns,A=0;A<_;A++)b=A%M-p,v=x-(A/M|0),m[A]=C=c?Math.abs(c==="y"?v:b):Ux(b*b+v*v),C>T&&(T=C),C<L&&(L=C);s==="random"&&Qx(m),m.max=T-L,m.min=L,m.v=_=(parseFloat(t.amount)||parseFloat(t.each)*(M>_?_-1:c?c==="y"?_/M:M:Math.max(M,_/M))||0)*(s==="edges"?-1:1),m.b=_<0?r-_:r,m.u=on(t.amount||t.each)||0,i=i&&_<0?cb(i):i}return _=(m[f]-m.min)/m.max||0,Jt(m.b+(i?i(_):_)*m.v)+m.u}},Bd=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(i){var s=Jt(Math.round(parseFloat(i)/e)*e*t);return(s-s%1)/t+(Bs(i)?0:on(i))}},eb=function(e,t){var i=hn(e),s,r;return!i&&os(e)&&(s=i=e.radius||ns,e.values?(e=xi(e.values),(r=!Bs(e[0]))&&(s*=s)):e=Bd(e.increment)),Tr(t,i?Bt(e)?function(o){return r=e(o),Math.abs(r-o)<=s?r:o}:function(o){for(var a=parseFloat(r?o.x:o),l=parseFloat(r?o.y:0),c=ns,u=0,h=e.length,f,d;h--;)r?(f=e[h].x-a,d=e[h].y-l,f=f*f+d*d):f=Math.abs(e[h]-a),f<c&&(c=f,u=h);return u=!s||c<=s?e[u]:o,r||u===o||Bs(o)?u:u+on(o)}:Bd(e))},tb=function(e,t,i,s){return Tr(hn(e)?!t:i===!0?!!(i=0):!s,function(){return hn(e)?e[~~(Math.random()*e.length)]:(i=i||1e-5)&&(s=i<1?Math.pow(10,(i+"").length-2):1)&&Math.floor(Math.round((e-i/2+Math.random()*(t-e+i*.99))/i)*i*s)/s})},qP=function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];return function(s){return t.reduce(function(r,o){return o(r)},s)}},$P=function(e,t){return function(i){return e(parseFloat(i))+(t||on(i))}},YP=function(e,t,i){return ib(e,t,0,1,i)},nb=function(e,t,i){return Tr(i,function(s){return e[~~t(s)]})},jP=function n(e,t,i){var s=t-e;return hn(e)?nb(e,n(0,e.length),t):Tr(i,function(r){return(s+(r-e)%s)%s+e})},KP=function n(e,t,i){var s=t-e,r=s*2;return hn(e)?nb(e,n(0,e.length-1),t):Tr(i,function(o){return o=(r+(o-e)%r)%r||0,e+(o>s?r-o:o)})},Pl=function(e){for(var t=0,i="",s,r,o,a;~(s=e.indexOf("random(",t));)o=e.indexOf(")",s),a=e.charAt(s+7)==="[",r=e.substr(s+7,o-s-7).match(a?Bx:Dd),i+=e.substr(t,s-t)+tb(a?r:+r[0],a?0:+r[1],+r[2]||1e-5),t=o+1;return i+e.substr(t,e.length-t)},ib=function(e,t,i,s,r){var o=t-e,a=s-i;return Tr(r,function(l){return i+((l-e)/o*a||0)})},ZP=function n(e,t,i,s){var r=isNaN(e+t)?0:function(d){return(1-d)*e+d*t};if(!r){var o=en(e),a={},l,c,u,h,f;if(i===!0&&(s=1)&&(i=null),o)e={p:e},t={p:t};else if(hn(e)&&!hn(t)){for(u=[],h=e.length,f=h-2,c=1;c<h;c++)u.push(n(e[c-1],e[c]));h--,r=function(g){g*=h;var _=Math.min(f,~~g);return u[_](g-_)},i=t}else s||(e=co(hn(e)?[]:{},e));if(!u){for(l in t)Qp.call(a,e,l,"get",t[l]);r=function(g){return nm(g,a)||(o?e.p:e)}}}return Tr(i,r)},I_=function(e,t,i){var s=e.labels,r=ns,o,a,l;for(o in s)a=s[o]-t,a<0==!!i&&a&&r>(a=Math.abs(a))&&(l=o,r=a);return l},ni=function(e,t,i){var s=e.vars,r=s[t],o=Dt,a=e._ctx,l,c,u;if(r)return l=s[t+"Params"],c=s.callbackScope||e,i&&pr.length&&lu(),a&&(Dt=a),u=l?r.apply(c,l):r.call(c),Dt=o,u},Ja=function(e){return br(e),e.scrollTrigger&&e.scrollTrigger.kill(!!un),e.progress()<1&&ni(e,"onInterrupt"),e},Bo,sb=[],rb=function(e){if(e)if(e=!e.name&&e.default||e,qp()||e.headless){var t=e.name,i=Bt(e),s=t&&!i&&e.init?function(){this._props=[]}:e,r={init:Rl,render:nm,add:Qp,kill:dD,modifier:fD,rawVars:0},o={targetTest:0,get:0,getSetter:tm,aliases:{},register:0};if(ma(),e!==s){if(Zn[t])return;Si(s,Si(cu(e,r),o)),co(s.prototype,co(r,cu(e,o))),Zn[s.prop=t]=s,e.targetTest&&($c.push(s),jp[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}Hx(t,s),e.register&&e.register(Gn,s,zn)}else sb.push(e)},Et=255,el={aqua:[0,Et,Et],lime:[0,Et,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Et],navy:[0,0,128],white:[Et,Et,Et],olive:[128,128,0],yellow:[Et,Et,0],orange:[Et,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Et,0,0],pink:[Et,192,203],cyan:[0,Et,Et],transparent:[Et,Et,Et,0]},Qh=function(e,t,i){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(i-t)*e*6:e<.5?i:e*3<2?t+(i-t)*(2/3-e)*6:t)*Et+.5|0},ob=function(e,t,i){var s=e?Bs(e)?[e>>16,e>>8&Et,e&Et]:0:el.black,r,o,a,l,c,u,h,f,d,g;if(!s){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),el[e])s=el[e];else if(e.charAt(0)==="#"){if(e.length<6&&(r=e.charAt(1),o=e.charAt(2),a=e.charAt(3),e="#"+r+r+o+o+a+a+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return s=parseInt(e.substr(1,6),16),[s>>16,s>>8&Et,s&Et,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),s=[e>>16,e>>8&Et,e&Et]}else if(e.substr(0,3)==="hsl"){if(s=g=e.match(Dd),!t)l=+s[0]%360/360,c=+s[1]/100,u=+s[2]/100,o=u<=.5?u*(c+1):u+c-u*c,r=u*2-o,s.length>3&&(s[3]*=1),s[0]=Qh(l+1/3,r,o),s[1]=Qh(l,r,o),s[2]=Qh(l-1/3,r,o);else if(~e.indexOf("="))return s=e.match(Fx),i&&s.length<4&&(s[3]=1),s}else s=e.match(Dd)||el.transparent;s=s.map(Number)}return t&&!g&&(r=s[0]/Et,o=s[1]/Et,a=s[2]/Et,h=Math.max(r,o,a),f=Math.min(r,o,a),u=(h+f)/2,h===f?l=c=0:(d=h-f,c=u>.5?d/(2-h-f):d/(h+f),l=h===r?(o-a)/d+(o<a?6:0):h===o?(a-r)/d+2:(r-o)/d+4,l*=60),s[0]=~~(l+.5),s[1]=~~(c*100+.5),s[2]=~~(u*100+.5)),i&&s.length<4&&(s[3]=1),s},ab=function(e){var t=[],i=[],s=-1;return e.split(mr).forEach(function(r){var o=r.match(No)||[];t.push.apply(t,o),i.push(s+=o.length+1)}),t.c=i,t},U_=function(e,t,i){var s="",r=(e+s).match(mr),o=t?"hsla(":"rgba(",a=0,l,c,u,h;if(!r)return e;if(r=r.map(function(f){return(f=ob(f,t,1))&&o+(t?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),i&&(u=ab(e),l=i.c,l.join(s)!==u.c.join(s)))for(c=e.replace(mr,"1").split(No),h=c.length-1;a<h;a++)s+=c[a]+(~l.indexOf(a)?r.shift()||o+"0,0,0,0)":(u.length?u:r.length?r:i).shift());if(!c)for(c=e.split(mr),h=c.length-1;a<h;a++)s+=c[a]+r[a];return s+c[h]},mr=function(){var n="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in el)n+="|"+e+"\\b";return new RegExp(n+")","gi")}(),QP=/hsl[a]?\(/,lb=function(e){var t=e.join(" "),i;if(mr.lastIndex=0,mr.test(t))return i=QP.test(t),e[1]=U_(e[1],i),e[0]=U_(e[0],i,ab(e[1])),!0},Dl,Qn=function(){var n=Date.now,e=500,t=33,i=n(),s=i,r=1e3/240,o=r,a=[],l,c,u,h,f,d,g=function _(m){var p=n()-s,x=m===!0,b,v,C,A;if((p>e||p<0)&&(i+=p-t),s+=p,C=s-i,b=C-o,(b>0||x)&&(A=++h.frame,f=C-h.time*1e3,h.time=C=C/1e3,o+=b+(b>=r?4:r-b),v=1),x||(l=c(_)),v)for(d=0;d<a.length;d++)a[d](C,f,A,m)};return h={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(m){return f/(1e3/(m||60))},wake:function(){kx&&(!Ld&&qp()&&(qi=Ld=window,$p=qi.document||{},li.gsap=Gn,(qi.gsapVersions||(qi.gsapVersions=[])).push(Gn.version),zx(au||qi.GreenSockGlobals||!qi.gsap&&qi||{}),sb.forEach(rb)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&h.sleep(),c=u||function(m){return setTimeout(m,o-h.time*1e3+1|0)},Dl=1,g(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),Dl=0,c=Rl},lagSmoothing:function(m,p){e=m||1/0,t=Math.min(p||33,e)},fps:function(m){r=1e3/(m||240),o=h.time*1e3+r},add:function(m,p,x){var b=p?function(v,C,A,T){m(v,C,A,T),h.remove(b)}:m;return h.remove(m),a[x?"unshift":"push"](b),ma(),b},remove:function(m,p){~(p=a.indexOf(m))&&a.splice(p,1)&&d>=p&&d--},_listeners:a},h}(),ma=function(){return!Dl&&Qn.wake()},ct={},JP=/^[\d.\-M][\d.\-,\s]/,eD=/["']/g,tD=function(e){for(var t={},i=e.substr(1,e.length-3).split(":"),s=i[0],r=1,o=i.length,a,l,c;r<o;r++)l=i[r],a=r!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),t[s]=isNaN(c)?c.replace(eD,"").trim():+c,s=l.substr(a+1).trim();return t},nD=function(e){var t=e.indexOf("(")+1,i=e.indexOf(")"),s=e.indexOf("(",t);return e.substring(t,~s&&s<i?e.indexOf(")",i+1):i)},iD=function(e){var t=(e+"").split("("),i=ct[t[0]];return i&&t.length>1&&i.config?i.config.apply(null,~e.indexOf("{")?[tD(t[1])]:nD(e).split(",").map(Xx)):ct._CE&&JP.test(e)?ct._CE("",e):i},cb=function(e){return function(t){return 1-e(1-t)}},ub=function n(e,t){for(var i=e._first,s;i;)i instanceof _n?n(i,t):i.vars.yoyoEase&&(!i._yoyo||!i._repeat)&&i._yoyo!==t&&(i.timeline?n(i.timeline,t):(s=i._ease,i._ease=i._yEase,i._yEase=s,i._yoyo=t)),i=i._next},no=function(e,t){return e&&(Bt(e)?e:ct[e]||iD(e))||t},po=function(e,t,i,s){i===void 0&&(i=function(l){return 1-t(1-l)}),s===void 0&&(s=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var r={easeIn:t,easeOut:i,easeInOut:s},o;return kn(e,function(a){ct[a]=li[a]=r,ct[o=a.toLowerCase()]=i;for(var l in r)ct[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=ct[a+"."+l]=r[l]}),r},hb=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},Jh=function n(e,t,i){var s=t>=1?t:1,r=(i||(e?.3:.45))/(t<1?t:1),o=r/Pd*(Math.asin(1/s)||0),a=function(u){return u===1?1:s*Math.pow(2,-10*u)*DP((u-o)*r)+1},l=e==="out"?a:e==="in"?function(c){return 1-a(1-c)}:hb(a);return r=Pd/r,l.config=function(c,u){return n(e,c,u)},l},ef=function n(e,t){t===void 0&&(t=1.70158);var i=function(o){return o?--o*o*((t+1)*o+t)+1:0},s=e==="out"?i:e==="in"?function(r){return 1-i(1-r)}:hb(i);return s.config=function(r){return n(e,r)},s};kn("Linear,Quad,Cubic,Quart,Quint,Strong",function(n,e){var t=e<5?e+1:e;po(n+",Power"+(t-1),e?function(i){return Math.pow(i,t)}:function(i){return i},function(i){return 1-Math.pow(1-i,t)},function(i){return i<.5?Math.pow(i*2,t)/2:1-Math.pow((1-i)*2,t)/2})});ct.Linear.easeNone=ct.none=ct.Linear.easeIn;po("Elastic",Jh("in"),Jh("out"),Jh());(function(n,e){var t=1/e,i=2*t,s=2.5*t,r=function(a){return a<t?n*a*a:a<i?n*Math.pow(a-1.5/e,2)+.75:a<s?n*(a-=2.25/e)*a+.9375:n*Math.pow(a-2.625/e,2)+.984375};po("Bounce",function(o){return 1-r(1-o)},r)})(7.5625,2.75);po("Expo",function(n){return n?Math.pow(2,10*(n-1)):0});po("Circ",function(n){return-(Ux(1-n*n)-1)});po("Sine",function(n){return n===1?1:-PP(n*CP)+1});po("Back",ef("in"),ef("out"),ef());ct.SteppedEase=ct.steps=li.SteppedEase={config:function(e,t){e===void 0&&(e=1);var i=1/e,s=e+(t?0:1),r=t?1:0,o=1-an;return function(a){return((s*Yl(0,o,a)|0)+r)*i}}};fa.ease=ct["quad.out"];kn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(n){return Kp+=n+","+n+"Params,"});var fb=function(e,t){this.id=RP++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:Gx,this.set=t?t.getSetter:tm},Ll=function(){function n(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,pa(this,+t.duration,1,1),this.data=t.data,Dt&&(this._ctx=Dt,Dt.data.push(this)),Dl||Qn.wake()}var e=n.prototype;return e.delay=function(i){return i||i===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+i-this._delay),this._delay=i,this):this._delay},e.duration=function(i){return arguments.length?this.totalDuration(this._repeat>0?i+(i+this._rDelay)*this._repeat:i):this.totalDuration()&&this._dur},e.totalDuration=function(i){return arguments.length?(this._dirty=0,pa(this,this._repeat<0?i:(i-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(i,s){if(ma(),!arguments.length)return this._tTime;var r=this._dp;if(r&&r.smoothChildTiming&&this._ts){for(qu(this,i),!r._dp||r.parent||Yx(r,this);r&&r.parent;)r.parent._time!==r._start+(r._ts>=0?r._tTime/r._ts:(r.totalDuration()-r._tTime)/-r._ts)&&r.totalTime(r._tTime,!0),r=r.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&i<this._tDur||this._ts<0&&i>0||!this._tDur&&!i)&&Zi(this._dp,this,this._start-this._delay)}return(this._tTime!==i||!this._dur&&!s||this._initted&&Math.abs(this._zTime)===an||!i&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=i),Wx(this,i,s)),this},e.time=function(i,s){return arguments.length?this.totalTime(Math.min(this.totalDuration(),i+D_(this))%(this._dur+this._rDelay)||(i?this._dur:0),s):this._time},e.totalProgress=function(i,s){return arguments.length?this.totalTime(this.totalDuration()*i,s):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>0?1:0},e.progress=function(i,s){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-i:i)+D_(this),s):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(i,s){var r=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(i-1)*r,s):this._repeat?da(this._tTime,r)+1:1},e.timeScale=function(i,s){if(!arguments.length)return this._rts===-1e-8?0:this._rts;if(this._rts===i)return this;var r=this.parent&&this._ts?uu(this.parent._time,this):this._tTime;return this._rts=+i||0,this._ts=this._ps||i===-1e-8?0:this._rts,this.totalTime(Yl(-Math.abs(this._delay),this._tDur,r),s!==!1),Xu(this),BP(this)},e.paused=function(i){return arguments.length?(this._ps!==i&&(this._ps=i,i?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(ma(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==an&&(this._tTime-=an)))),this):this._ps},e.startTime=function(i){if(arguments.length){this._start=i;var s=this.parent||this._dp;return s&&(s._sort||!this.parent)&&Zi(s,this,i-this._delay),this}return this._start},e.endTime=function(i){return this._start+(Bn(i)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(i){var s=this.parent||this._dp;return s?i&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?uu(s.rawTime(i),this):this._tTime:this._tTime},e.revert=function(i){i===void 0&&(i=UP);var s=un;return un=i,(this._initted||this._startAt)&&(this.timeline&&this.timeline.revert(i),this.totalTime(-.01,i.suppressEvents)),this.data!=="nested"&&i.kill!==!1&&this.kill(),un=s,this},e.globalTime=function(i){for(var s=this,r=arguments.length?i:s.rawTime();s;)r=s._start+r/(Math.abs(s._ts)||1),s=s._dp;return!this.parent&&this._sat?this._sat.globalTime(i):r},e.repeat=function(i){return arguments.length?(this._repeat=i===1/0?-2:i,L_(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(i){if(arguments.length){var s=this._time;return this._rDelay=i,L_(this),s?this.time(s):this}return this._rDelay},e.yoyo=function(i){return arguments.length?(this._yoyo=i,this):this._yoyo},e.seek=function(i,s){return this.totalTime(gi(this,i),Bn(s))},e.restart=function(i,s){return this.play().totalTime(i?-this._delay:0,Bn(s))},e.play=function(i,s){return i!=null&&this.seek(i,s),this.reversed(!1).paused(!1)},e.reverse=function(i,s){return i!=null&&this.seek(i||this.totalDuration(),s),this.reversed(!0).paused(!1)},e.pause=function(i,s){return i!=null&&this.seek(i,s),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(i){return arguments.length?(!!i!==this.reversed()&&this.timeScale(-this._rts||(i?-1e-8:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-1e-8,this},e.isActive=function(){var i=this.parent||this._dp,s=this._start,r;return!!(!i||this._ts&&this._initted&&i.isActive()&&(r=i.rawTime(!0))>=s&&r<this.endTime(!0)-an)},e.eventCallback=function(i,s,r){var o=this.vars;return arguments.length>1?(s?(o[i]=s,r&&(o[i+"Params"]=r),i==="onUpdate"&&(this._onUpdate=s)):delete o[i],this):o[i]},e.then=function(i){var s=this;return new Promise(function(r){var o=Bt(i)?i:qx,a=function(){var c=s.then;s.then=null,Bt(o)&&(o=o(s))&&(o.then||o===s)&&(s.then=c),r(o),s.then=c};s._initted&&s.totalProgress()===1&&s._ts>=0||!s._tTime&&s._ts<0?a():s._prom=a})},e.kill=function(){Ja(this)},n}();Si(Ll.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-1e-8,_prom:0,_ps:!1,_rts:1});var _n=function(n){Ix(e,n);function e(i,s){var r;return i===void 0&&(i={}),r=n.call(this,i)||this,r.labels={},r.smoothChildTiming=!!i.smoothChildTiming,r.autoRemoveChildren=!!i.autoRemoveChildren,r._sort=Bn(i.sortChildren),It&&Zi(i.parent||It,bs(r),s),i.reversed&&r.reverse(),i.paused&&r.paused(!0),i.scrollTrigger&&jx(bs(r),i.scrollTrigger),r}var t=e.prototype;return t.to=function(s,r,o){return pl(0,arguments,this),this},t.from=function(s,r,o){return pl(1,arguments,this),this},t.fromTo=function(s,r,o,a){return pl(2,arguments,this),this},t.set=function(s,r,o){return r.duration=0,r.parent=this,dl(r).repeatDelay||(r.repeat=0),r.immediateRender=!!r.immediateRender,new $t(s,r,gi(this,o),1),this},t.call=function(s,r,o){return Zi(this,$t.delayedCall(0,s,r),o)},t.staggerTo=function(s,r,o,a,l,c,u){return o.duration=r,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=u,o.parent=this,new $t(s,o,gi(this,l)),this},t.staggerFrom=function(s,r,o,a,l,c,u){return o.runBackwards=1,dl(o).immediateRender=Bn(o.immediateRender),this.staggerTo(s,r,o,a,l,c,u)},t.staggerFromTo=function(s,r,o,a,l,c,u,h){return a.startAt=o,dl(a).immediateRender=Bn(a.immediateRender),this.staggerTo(s,r,a,l,c,u,h)},t.render=function(s,r,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=s<=0?0:Jt(s),h=this._zTime<0!=s<0&&(this._initted||!c),f,d,g,_,m,p,x,b,v,C,A,T;if(this!==It&&u>l&&s>=0&&(u=l),u!==this._tTime||o||h){if(a!==this._time&&c&&(u+=this._time-a,s+=this._time-a),f=u,v=this._start,b=this._ts,p=!b,h&&(c||(a=this._zTime),(s||!r)&&(this._zTime=s)),this._repeat){if(A=this._yoyo,m=c+this._rDelay,this._repeat<-1&&s<0)return this.totalTime(m*100+s,r,o);if(f=Jt(u%m),u===l?(_=this._repeat,f=c):(_=~~(u/m),_&&_===u/m&&(f=c,_--),f>c&&(f=c)),C=da(this._tTime,m),!a&&this._tTime&&C!==_&&this._tTime-C*m-this._dur<=0&&(C=_),A&&_&1&&(f=c-f,T=1),_!==C&&!this._lock){var L=A&&C&1,M=L===(A&&_&1);if(_<C&&(L=!L),a=L?0:u%c?c:u,this._lock=1,this.render(a||(T?0:Jt(_*m)),r,!c)._lock=0,this._tTime=u,!r&&this.parent&&ni(this,"onRepeat"),this.vars.repeatRefresh&&!T&&(this.invalidate()._lock=1),a&&a!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,M&&(this._lock=2,a=L?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!T&&this.invalidate()),this._lock=0,!this._ts&&!p)return this;ub(this,T)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(x=VP(this,Jt(a),Jt(f)),x&&(u-=f-(f=x._start))),this._tTime=u,this._time=f,this._act=!b,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=s,a=0),!a&&f&&!r&&!_&&(ni(this,"onStart"),this._tTime!==u))return this;if(f>=a&&s>=0)for(d=this._first;d;){if(g=d._next,(d._act||f>=d._start)&&d._ts&&x!==d){if(d.parent!==this)return this.render(s,r,o);if(d.render(d._ts>0?(f-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(f-d._start)*d._ts,r,o),f!==this._time||!this._ts&&!p){x=0,g&&(u+=this._zTime=-1e-8);break}}d=g}else{d=this._last;for(var y=s<0?s:f;d;){if(g=d._prev,(d._act||y<=d._end)&&d._ts&&x!==d){if(d.parent!==this)return this.render(s,r,o);if(d.render(d._ts>0?(y-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(y-d._start)*d._ts,r,o||un&&(d._initted||d._startAt)),f!==this._time||!this._ts&&!p){x=0,g&&(u+=this._zTime=y?-1e-8:an);break}}d=g}}if(x&&!r&&(this.pause(),x.render(f>=a?0:-1e-8)._zTime=f>=a?1:-1,this._ts))return this._start=v,Xu(this),this.render(s,r,o);this._onUpdate&&!r&&ni(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&a)&&(v===this._start||Math.abs(b)!==Math.abs(this._ts))&&(this._lock||((s||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&br(this,1),!r&&!(s<0&&!a)&&(u||a||!l)&&(ni(this,u===l&&s>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(s,r){var o=this;if(Bs(r)||(r=gi(this,r,s)),!(s instanceof Ll)){if(hn(s))return s.forEach(function(a){return o.add(a,r)}),this;if(en(s))return this.addLabel(s,r);if(Bt(s))s=$t.delayedCall(0,s);else return this}return this!==s?Zi(this,s,r):this},t.getChildren=function(s,r,o,a){s===void 0&&(s=!0),r===void 0&&(r=!0),o===void 0&&(o=!0),a===void 0&&(a=-1e8);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof $t?r&&l.push(c):(o&&l.push(c),s&&l.push.apply(l,c.getChildren(!0,r,o)))),c=c._next;return l},t.getById=function(s){for(var r=this.getChildren(1,1,1),o=r.length;o--;)if(r[o].vars.id===s)return r[o]},t.remove=function(s){return en(s)?this.removeLabel(s):Bt(s)?this.killTweensOf(s):(Wu(this,s),s===this._recent&&(this._recent=this._last),to(this))},t.totalTime=function(s,r){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Jt(Qn.time-(this._ts>0?s/this._ts:(this.totalDuration()-s)/-this._ts))),n.prototype.totalTime.call(this,s,r),this._forcing=0,this):this._tTime},t.addLabel=function(s,r){return this.labels[s]=gi(this,r),this},t.removeLabel=function(s){return delete this.labels[s],this},t.addPause=function(s,r,o){var a=$t.delayedCall(0,r||Rl,o);return a.data="isPause",this._hasPause=1,Zi(this,a,gi(this,s))},t.removePause=function(s){var r=this._first;for(s=gi(this,s);r;)r._start===s&&r.data==="isPause"&&br(r),r=r._next},t.killTweensOf=function(s,r,o){for(var a=this.getTweensOf(s,o),l=a.length;l--;)cr!==a[l]&&a[l].kill(s,r);return this},t.getTweensOf=function(s,r){for(var o=[],a=xi(s),l=this._first,c=Bs(r),u;l;)l instanceof $t?OP(l._targets,a)&&(c?(!cr||l._initted&&l._ts)&&l.globalTime(0)<=r&&l.globalTime(l.totalDuration())>r:!r||l.isActive())&&o.push(l):(u=l.getTweensOf(a,r)).length&&o.push.apply(o,u),l=l._next;return o},t.tweenTo=function(s,r){r=r||{};var o=this,a=gi(o,s),l=r,c=l.startAt,u=l.onStart,h=l.onStartParams,f=l.immediateRender,d,g=$t.to(o,Si({ease:r.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:r.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||an,onStart:function(){if(o.pause(),!d){var m=r.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());g._dur!==m&&pa(g,m,0,1).render(g._time,!0,!0),d=1}u&&u.apply(g,h||[])}},r));return f?g.render(0):g},t.tweenFromTo=function(s,r,o){return this.tweenTo(r,Si({startAt:{time:gi(this,s)}},o))},t.recent=function(){return this._recent},t.nextLabel=function(s){return s===void 0&&(s=this._time),I_(this,gi(this,s))},t.previousLabel=function(s){return s===void 0&&(s=this._time),I_(this,gi(this,s),1)},t.currentLabel=function(s){return arguments.length?this.seek(s,!0):this.previousLabel(this._time+an)},t.shiftChildren=function(s,r,o){o===void 0&&(o=0);for(var a=this._first,l=this.labels,c;a;)a._start>=o&&(a._start+=s,a._end+=s),a=a._next;if(r)for(c in l)l[c]>=o&&(l[c]+=s);return to(this)},t.invalidate=function(s){var r=this._first;for(this._lock=0;r;)r.invalidate(s),r=r._next;return n.prototype.invalidate.call(this,s)},t.clear=function(s){s===void 0&&(s=!0);for(var r=this._first,o;r;)o=r._next,this.remove(r),r=o;return this._dp&&(this._time=this._tTime=this._pTime=0),s&&(this.labels={}),to(this)},t.totalDuration=function(s){var r=0,o=this,a=o._last,l=ns,c,u,h;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-s:s));if(o._dirty){for(h=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,Zi(o,a,u-a._delay,1)._lock=0):l=u,u<0&&a._ts&&(r-=u,(!h&&!o._dp||h&&h.smoothChildTiming)&&(o._start+=u/o._ts,o._time-=u,o._tTime-=u),o.shiftChildren(-u,!1,-1/0),l=0),a._end>r&&a._ts&&(r=a._end),a=c;pa(o,o===It&&o._time>r?o._time:r,1,1),o._dirty=0}return o._tDur},e.updateRoot=function(s){if(It._ts&&(Wx(It,uu(s,It)),Vx=Qn.frame),Qn.frame>=R_){R_+=si.autoSleep||120;var r=It._first;if((!r||!r._ts)&&si.autoSleep&&Qn._listeners.length<2){for(;r&&!r._ts;)r=r._next;r||Qn.sleep()}}},e}(Ll);Si(_n.prototype,{_lock:0,_hasPause:0,_forcing:0});var sD=function(e,t,i,s,r,o,a){var l=new zn(this._pt,e,t,0,1,vb,null,r),c=0,u=0,h,f,d,g,_,m,p,x;for(l.b=i,l.e=s,i+="",s+="",(p=~s.indexOf("random("))&&(s=Pl(s)),o&&(x=[i,s],o(x,e,t),i=x[0],s=x[1]),f=i.match(Kh)||[];h=Kh.exec(s);)g=h[0],_=s.substring(c,h.index),d?d=(d+1)%5:_.substr(-5)==="rgba("&&(d=1),g!==f[u++]&&(m=parseFloat(f[u-1])||0,l._pt={_next:l._pt,p:_||u===1?_:",",s:m,c:g.charAt(1)==="="?Qo(m,g)-m:parseFloat(g)-m,m:d&&d<4?Math.round:0},c=Kh.lastIndex);return l.c=c<s.length?s.substring(c,s.length):"",l.fp=a,(Nx.test(s)||p)&&(l.e=0),this._pt=l,l},Qp=function(e,t,i,s,r,o,a,l,c,u){Bt(s)&&(s=s(r||0,e,o));var h=e[t],f=i!=="get"?i:Bt(h)?c?e[t.indexOf("set")||!Bt(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():h,d=Bt(h)?c?cD:gb:em,g;if(en(s)&&(~s.indexOf("random(")&&(s=Pl(s)),s.charAt(1)==="="&&(g=Qo(f,s)+(on(f)||0),(g||g===0)&&(s=g))),!u||f!==s||kd)return!isNaN(f*s)&&s!==""?(g=new zn(this._pt,e,t,+f||0,s-(f||0),typeof h=="boolean"?hD:_b,0,d),c&&(g.fp=c),a&&g.modifier(a,this,e),this._pt=g):(!h&&!(t in e)&&Yp(t,s),sD.call(this,e,t,f,s,d,l||si.stringFilter,c))},rD=function(e,t,i,s,r){if(Bt(e)&&(e=ml(e,r,t,i,s)),!os(e)||e.style&&e.nodeType||hn(e)||Ox(e))return en(e)?ml(e,r,t,i,s):e;var o={},a;for(a in e)o[a]=ml(e[a],r,t,i,s);return o},db=function(e,t,i,s,r,o){var a,l,c,u;if(Zn[e]&&(a=new Zn[e]).init(r,a.rawVars?t[e]:rD(t[e],s,r,o,i),i,s,o)!==!1&&(i._pt=l=new zn(i._pt,r,e,0,1,a.render,a,0,a.priority),i!==Bo))for(c=i._ptLookup[i._targets.indexOf(r)],u=a._props.length;u--;)c[a._props[u]]=l;return a},cr,kd,Jp=function n(e,t,i){var s=e.vars,r=s.ease,o=s.startAt,a=s.immediateRender,l=s.lazy,c=s.onUpdate,u=s.runBackwards,h=s.yoyoEase,f=s.keyframes,d=s.autoRevert,g=e._dur,_=e._startAt,m=e._targets,p=e.parent,x=p&&p.data==="nested"?p.vars.targets:m,b=e._overwrite==="auto"&&!Wp,v=e.timeline,C,A,T,L,M,y,D,F,N,K,j,H,W;if(v&&(!f||!r)&&(r="none"),e._ease=no(r,fa.ease),e._yEase=h?cb(no(h===!0?r:h,fa.ease)):0,h&&e._yoyo&&!e._repeat&&(h=e._yEase,e._yEase=e._ease,e._ease=h),e._from=!v&&!!s.runBackwards,!v||f&&!s.stagger){if(F=m[0]?eo(m[0]).harness:0,H=F&&s[F.prop],C=cu(s,jp),_&&(_._zTime<0&&_.progress(1),t<0&&u&&a&&!d?_.render(-1,!0):_.revert(u&&g?qc:IP),_._lazy=0),o){if(br(e._startAt=$t.set(m,Si({data:"isStart",overwrite:!1,parent:p,immediateRender:!0,lazy:!_&&Bn(l),startAt:null,delay:0,onUpdate:c&&function(){return ni(e,"onUpdate")},stagger:0},o))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(un||!a&&!d)&&e._startAt.revert(qc),a&&g&&t<=0&&i<=0){t&&(e._zTime=t);return}}else if(u&&g&&!_){if(t&&(a=!1),T=Si({overwrite:!1,data:"isFromStart",lazy:a&&!_&&Bn(l),immediateRender:a,stagger:0,parent:p},C),H&&(T[F.prop]=H),br(e._startAt=$t.set(m,T)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(un?e._startAt.revert(qc):e._startAt.render(-1,!0)),e._zTime=t,!a)n(e._startAt,an,an);else if(!t)return}for(e._pt=e._ptCache=0,l=g&&Bn(l)||l&&!g,A=0;A<m.length;A++){if(M=m[A],D=M._gsap||Zp(m)[A]._gsap,e._ptLookup[A]=K={},Id[D.id]&&pr.length&&lu(),j=x===m?A:x.indexOf(M),F&&(N=new F).init(M,H||C,e,j,x)!==!1&&(e._pt=L=new zn(e._pt,M,N.name,0,1,N.render,N,0,N.priority),N._props.forEach(function(B){K[B]=L}),N.priority&&(y=1)),!F||H)for(T in C)Zn[T]&&(N=db(T,C,e,j,M,x))?N.priority&&(y=1):K[T]=L=Qp.call(e,M,T,"get",C[T],j,x,0,s.stringFilter);e._op&&e._op[A]&&e.kill(M,e._op[A]),b&&e._pt&&(cr=e,It.killTweensOf(M,K,e.globalTime(t)),W=!e.parent,cr=0),e._pt&&l&&(Id[D.id]=1)}y&&xb(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!W,f&&t<=0&&v.render(ns,!0,!0)},oD=function(e,t,i,s,r,o,a,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],u,h,f,d;if(!c)for(c=e._ptCache[t]=[],f=e._ptLookup,d=e._targets.length;d--;){if(u=f[d][t],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==t&&u.fp!==t;)u=u._next;if(!u)return kd=1,e.vars[t]="+=0",Jp(e,a),kd=0,l?Cl(t+" not eligible for reset"):1;c.push(u)}for(d=c.length;d--;)h=c[d],u=h._pt||h,u.s=(s||s===0)&&!r?s:u.s+(s||0)+o*u.c,u.c=i-u.s,h.e&&(h.e=kt(i)+on(h.e)),h.b&&(h.b=u.s+on(h.b))},aD=function(e,t){var i=e[0]?eo(e[0]).harness:0,s=i&&i.aliases,r,o,a,l;if(!s)return t;r=co({},t);for(o in s)if(o in r)for(l=s[o].split(","),a=l.length;a--;)r[l[a]]=r[o];return r},lD=function(e,t,i,s){var r=t.ease||s||"power1.inOut",o,a;if(hn(t))a=i[e]||(i[e]=[]),t.forEach(function(l,c){return a.push({t:c/(t.length-1)*100,v:l,e:r})});else for(o in t)a=i[o]||(i[o]=[]),o==="ease"||a.push({t:parseFloat(e),v:t[o],e:r})},ml=function(e,t,i,s,r){return Bt(e)?e.call(t,i,s,r):en(e)&&~e.indexOf("random(")?Pl(e):e},pb=Kp+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",mb={};kn(pb+",id,stagger,delay,duration,paused,scrollTrigger",function(n){return mb[n]=1});var $t=function(n){Ix(e,n);function e(i,s,r,o){var a;typeof s=="number"&&(r.duration=s,s=r,r=null),a=n.call(this,o?s:dl(s))||this;var l=a.vars,c=l.duration,u=l.delay,h=l.immediateRender,f=l.stagger,d=l.overwrite,g=l.keyframes,_=l.defaults,m=l.scrollTrigger,p=l.yoyoEase,x=s.parent||It,b=(hn(i)||Ox(i)?Bs(i[0]):"length"in s)?[i]:xi(i),v,C,A,T,L,M,y,D;if(a._targets=b.length?Zp(b):Cl("GSAP target "+i+" not found. https://gsap.com",!si.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=d,g||f||Tc(c)||Tc(u)){if(s=a.vars,v=a.timeline=new _n({data:"nested",defaults:_||{},targets:x&&x.data==="nested"?x.vars.targets:b}),v.kill(),v.parent=v._dp=bs(a),v._start=0,f||Tc(c)||Tc(u)){if(T=b.length,y=f&&Jx(f),os(f))for(L in f)~pb.indexOf(L)&&(D||(D={}),D[L]=f[L]);for(C=0;C<T;C++)A=cu(s,mb),A.stagger=0,p&&(A.yoyoEase=p),D&&co(A,D),M=b[C],A.duration=+ml(c,bs(a),C,M,b),A.delay=(+ml(u,bs(a),C,M,b)||0)-a._delay,!f&&T===1&&A.delay&&(a._delay=u=A.delay,a._start+=u,A.delay=0),v.to(M,A,y?y(C,M,b):0),v._ease=ct.none;v.duration()?c=u=0:a.timeline=0}else if(g){dl(Si(v.vars.defaults,{ease:"none"})),v._ease=no(g.ease||s.ease||"none");var F=0,N,K,j;if(hn(g))g.forEach(function(H){return v.to(b,H,">")}),v.duration();else{A={};for(L in g)L==="ease"||L==="easeEach"||lD(L,g[L],A,g.easeEach);for(L in A)for(N=A[L].sort(function(H,W){return H.t-W.t}),F=0,C=0;C<N.length;C++)K=N[C],j={ease:K.e,duration:(K.t-(C?N[C-1].t:0))/100*c},j[L]=K.v,v.to(b,j,F),F+=j.duration;v.duration()<c&&v.to({},{duration:c-v.duration()})}}c||a.duration(c=v.duration())}else a.timeline=0;return d===!0&&!Wp&&(cr=bs(a),It.killTweensOf(b),cr=0),Zi(x,bs(a),r),s.reversed&&a.reverse(),s.paused&&a.paused(!0),(h||!c&&!g&&a._start===Jt(x._time)&&Bn(h)&&kP(bs(a))&&x.data!=="nested")&&(a._tTime=-1e-8,a.render(Math.max(0,-u)||0)),m&&jx(bs(a),m),a}var t=e.prototype;return t.render=function(s,r,o){var a=this._time,l=this._tDur,c=this._dur,u=s<0,h=s>l-an&&!u?l:s<an?0:s,f,d,g,_,m,p,x,b,v;if(!c)HP(this,s,r,o);else if(h!==this._tTime||!s||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u){if(f=h,b=this.timeline,this._repeat){if(_=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(_*100+s,r,o);if(f=Jt(h%_),h===l?(g=this._repeat,f=c):(g=~~(h/_),g&&g===Jt(h/_)&&(f=c,g--),f>c&&(f=c)),p=this._yoyo&&g&1,p&&(v=this._yEase,f=c-f),m=da(this._tTime,_),f===a&&!o&&this._initted&&g===m)return this._tTime=h,this;g!==m&&(b&&this._yEase&&ub(b,p),this.vars.repeatRefresh&&!p&&!this._lock&&this._time!==_&&this._initted&&(this._lock=o=1,this.render(Jt(_*g),!0).invalidate()._lock=0))}if(!this._initted){if(Kx(this,u?s:f,o,r,h))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&g!==m))return this;if(c!==this._dur)return this.render(s,r,o)}if(this._tTime=h,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=x=(v||this._ease)(f/c),this._from&&(this.ratio=x=1-x),f&&!a&&!r&&!g&&(ni(this,"onStart"),this._tTime!==h))return this;for(d=this._pt;d;)d.r(x,d.d),d=d._next;b&&b.render(s<0?s:b._dur*b._ease(f/this._dur),r,o)||this._startAt&&(this._zTime=s),this._onUpdate&&!r&&(u&&Ud(this,s,r,o),ni(this,"onUpdate")),this._repeat&&g!==m&&this.vars.onRepeat&&!r&&this.parent&&ni(this,"onRepeat"),(h===this._tDur||!h)&&this._tTime===h&&(u&&!this._onUpdate&&Ud(this,s,!0,!0),(s||!c)&&(h===this._tDur&&this._ts>0||!h&&this._ts<0)&&br(this,1),!r&&!(u&&!a)&&(h||a||p)&&(ni(this,h===l?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(s){return(!s||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(s),n.prototype.invalidate.call(this,s)},t.resetTo=function(s,r,o,a,l){Dl||Qn.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||Jp(this,c),u=this._ease(c/this._dur),oD(this,s,r,o,a,u,c,l)?this.resetTo(s,r,o,a,1):(qu(this,0),this.parent||$x(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(s,r){if(r===void 0&&(r="all"),!s&&(!r||r==="all"))return this._lazy=this._pt=0,this.parent?Ja(this):this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(s,r,cr&&cr.vars.overwrite!==!0)._first||Ja(this),this.parent&&o!==this.timeline.totalDuration()&&pa(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=s?xi(s):a,c=this._ptLookup,u=this._pt,h,f,d,g,_,m,p;if((!r||r==="all")&&NP(a,l))return r==="all"&&(this._pt=0),Ja(this);for(h=this._op=this._op||[],r!=="all"&&(en(r)&&(_={},kn(r,function(x){return _[x]=1}),r=_),r=aD(a,r)),p=a.length;p--;)if(~l.indexOf(a[p])){f=c[p],r==="all"?(h[p]=r,g=f,d={}):(d=h[p]=h[p]||{},g=r);for(_ in g)m=f&&f[_],m&&((!("kill"in m.d)||m.d.kill(_)===!0)&&Wu(this,m,"_pt"),delete f[_]),d!=="all"&&(d[_]=1)}return this._initted&&!this._pt&&u&&Ja(this),this},e.to=function(s,r){return new e(s,r,arguments[2])},e.from=function(s,r){return pl(1,arguments)},e.delayedCall=function(s,r,o,a){return new e(r,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:s,onComplete:r,onReverseComplete:r,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},e.fromTo=function(s,r,o){return pl(2,arguments)},e.set=function(s,r){return r.duration=0,r.repeatDelay||(r.repeat=0),new e(s,r)},e.killTweensOf=function(s,r,o){return It.killTweensOf(s,r,o)},e}(Ll);Si($t.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});kn("staggerTo,staggerFrom,staggerFromTo",function(n){$t[n]=function(){var e=new _n,t=Fd.call(arguments,0);return t.splice(n==="staggerFromTo"?5:4,0,0),e[n].apply(e,t)}});var em=function(e,t,i){return e[t]=i},gb=function(e,t,i){return e[t](i)},cD=function(e,t,i,s){return e[t](s.fp,i)},uD=function(e,t,i){return e.setAttribute(t,i)},tm=function(e,t){return Bt(e[t])?gb:Xp(e[t])&&e.setAttribute?uD:em},_b=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},hD=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},vb=function(e,t){var i=t._pt,s="";if(!e&&t.b)s=t.b;else if(e===1&&t.e)s=t.e;else{for(;i;)s=i.p+(i.m?i.m(i.s+i.c*e):Math.round((i.s+i.c*e)*1e4)/1e4)+s,i=i._next;s+=t.c}t.set(t.t,t.p,s,t)},nm=function(e,t){for(var i=t._pt;i;)i.r(e,i.d),i=i._next},fD=function(e,t,i,s){for(var r=this._pt,o;r;)o=r._next,r.p===s&&r.modifier(e,t,i),r=o},dD=function(e){for(var t=this._pt,i,s;t;)s=t._next,t.p===e&&!t.op||t.op===e?Wu(this,t,"_pt"):t.dep||(i=1),t=s;return!i},pD=function(e,t,i,s){s.mSet(e,t,s.m.call(s.tween,i,s.mt),s)},xb=function(e){for(var t=e._pt,i,s,r,o;t;){for(i=t._next,s=r;s&&s.pr>t.pr;)s=s._next;(t._prev=s?s._prev:o)?t._prev._next=t:r=t,(t._next=s)?s._prev=t:o=t,t=i}e._pt=r},zn=function(){function n(t,i,s,r,o,a,l,c,u){this.t=i,this.s=r,this.c=o,this.p=s,this.r=a||_b,this.d=l||this,this.set=c||em,this.pr=u||0,this._next=t,t&&(t._prev=this)}var e=n.prototype;return e.modifier=function(i,s,r){this.mSet=this.mSet||this.set,this.set=pD,this.m=i,this.mt=r,this.tween=s},n}();kn(Kp+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(n){return jp[n]=1});li.TweenMax=li.TweenLite=$t;li.TimelineLite=li.TimelineMax=_n;It=new _n({sortChildren:!1,defaults:fa,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});si.stringFilter=lb;var io=[],Yc={},mD=[],O_=0,gD=0,tf=function(e){return(Yc[e]||mD).map(function(t){return t()})},zd=function(){var e=Date.now(),t=[];e-O_>2&&(tf("matchMediaInit"),io.forEach(function(i){var s=i.queries,r=i.conditions,o,a,l,c;for(a in s)o=qi.matchMedia(s[a]).matches,o&&(l=1),o!==r[a]&&(r[a]=o,c=1);c&&(i.revert(),l&&t.push(i))}),tf("matchMediaRevert"),t.forEach(function(i){return i.onMatch(i,function(s){return i.add(null,s)})}),O_=e,tf("matchMedia"))},bb=function(){function n(t,i){this.selector=i&&Nd(i),this.data=[],this._r=[],this.isReverted=!1,this.id=gD++,t&&this.add(t)}var e=n.prototype;return e.add=function(i,s,r){Bt(i)&&(r=s,s=i,i=Bt);var o=this,a=function(){var c=Dt,u=o.selector,h;return c&&c!==o&&c.data.push(o),r&&(o.selector=Nd(r)),Dt=o,h=s.apply(o,arguments),Bt(h)&&o._r.push(h),Dt=c,o.selector=u,o.isReverted=!1,h};return o.last=a,i===Bt?a(o,function(l){return o.add(null,l)}):i?o[i]=a:a},e.ignore=function(i){var s=Dt;Dt=null,i(this),Dt=s},e.getTweens=function(){var i=[];return this.data.forEach(function(s){return s instanceof n?i.push.apply(i,s.getTweens()):s instanceof $t&&!(s.parent&&s.parent.data==="nested")&&i.push(s)}),i},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(i,s){var r=this;if(i?function(){for(var a=r.getTweens(),l=r.data.length,c;l--;)c=r.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return a.splice(a.indexOf(u),1)}));for(a.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,h){return h.g-u.g||-1/0}).forEach(function(u){return u.t.revert(i)}),l=r.data.length;l--;)c=r.data[l],c instanceof _n?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof $t)&&c.revert&&c.revert(i);r._r.forEach(function(u){return u(i,r)}),r.isReverted=!0}():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),s)for(var o=io.length;o--;)io[o].id===this.id&&io.splice(o,1)},e.revert=function(i){this.kill(i||{})},n}(),_D=function(){function n(t){this.contexts=[],this.scope=t,Dt&&Dt.data.push(this)}var e=n.prototype;return e.add=function(i,s,r){os(i)||(i={matches:i});var o=new bb(0,r||this.scope),a=o.conditions={},l,c,u;Dt&&!o.selector&&(o.selector=Dt.selector),this.contexts.push(o),s=o.add("onMatch",s),o.queries=i;for(c in i)c==="all"?u=1:(l=qi.matchMedia(i[c]),l&&(io.indexOf(o)<0&&io.push(o),(a[c]=l.matches)&&(u=1),l.addListener?l.addListener(zd):l.addEventListener("change",zd)));return u&&s(o,function(h){return o.add(null,h)}),this},e.revert=function(i){this.kill(i||{})},e.kill=function(i){this.contexts.forEach(function(s){return s.kill(i,!0)})},n}(),hu={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];t.forEach(function(s){return rb(s)})},timeline:function(e){return new _n(e)},getTweensOf:function(e,t){return It.getTweensOf(e,t)},getProperty:function(e,t,i,s){en(e)&&(e=xi(e)[0]);var r=eo(e||{}).get,o=i?qx:Xx;return i==="native"&&(i=""),e&&(t?o((Zn[t]&&Zn[t].get||r)(e,t,i,s)):function(a,l,c){return o((Zn[a]&&Zn[a].get||r)(e,a,l,c))})},quickSetter:function(e,t,i){if(e=xi(e),e.length>1){var s=e.map(function(u){return Gn.quickSetter(u,t,i)}),r=s.length;return function(u){for(var h=r;h--;)s[h](u)}}e=e[0]||{};var o=Zn[t],a=eo(e),l=a.harness&&(a.harness.aliases||{})[t]||t,c=o?function(u){var h=new o;Bo._pt=0,h.init(e,i?u+i:u,Bo,0,[e]),h.render(1,h),Bo._pt&&nm(1,Bo)}:a.set(e,l);return o?c:function(u){return c(e,l,i?u+i:u,a,1)}},quickTo:function(e,t,i){var s,r=Gn.to(e,co((s={},s[t]="+=0.1",s.paused=!0,s),i||{})),o=function(l,c,u){return r.resetTo(t,l,c,u)};return o.tween=r,o},isTweening:function(e){return It.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=no(e.ease,fa.ease)),P_(fa,e||{})},config:function(e){return P_(si,e||{})},registerEffect:function(e){var t=e.name,i=e.effect,s=e.plugins,r=e.defaults,o=e.extendTimeline;(s||"").split(",").forEach(function(a){return a&&!Zn[a]&&!li[a]&&Cl(t+" effect requires "+a+" plugin.")}),Zh[t]=function(a,l,c){return i(xi(a),Si(l||{},r),c)},o&&(_n.prototype[t]=function(a,l,c){return this.add(Zh[t](a,os(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){ct[e]=no(t)},parseEase:function(e,t){return arguments.length?no(e,t):ct},getById:function(e){return It.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var i=new _n(e),s,r;for(i.smoothChildTiming=Bn(e.smoothChildTiming),It.remove(i),i._dp=0,i._time=i._tTime=It._time,s=It._first;s;)r=s._next,(t||!(!s._dur&&s instanceof $t&&s.vars.onComplete===s._targets[0]))&&Zi(i,s,s._start-s._delay),s=r;return Zi(It,i,0),i},context:function(e,t){return e?new bb(e,t):Dt},matchMedia:function(e){return new _D(e)},matchMediaRefresh:function(){return io.forEach(function(e){var t=e.conditions,i,s;for(s in t)t[s]&&(t[s]=!1,i=1);i&&e.revert()})||zd()},addEventListener:function(e,t){var i=Yc[e]||(Yc[e]=[]);~i.indexOf(t)||i.push(t)},removeEventListener:function(e,t){var i=Yc[e],s=i&&i.indexOf(t);s>=0&&i.splice(s,1)},utils:{wrap:jP,wrapYoyo:KP,distribute:Jx,random:tb,snap:eb,normalize:YP,getUnit:on,clamp:WP,splitColor:ob,toArray:xi,selector:Nd,mapRange:ib,pipe:qP,unitize:$P,interpolate:ZP,shuffle:Qx},install:zx,effects:Zh,ticker:Qn,updateRoot:_n.updateRoot,plugins:Zn,globalTimeline:It,core:{PropTween:zn,globals:Hx,Tween:$t,Timeline:_n,Animation:Ll,getCache:eo,_removeLinkedListItem:Wu,reverting:function(){return un},context:function(e){return e&&Dt&&(Dt.data.push(e),e._ctx=Dt),Dt},suppressOverwrites:function(e){return Wp=e}}};kn("to,from,fromTo,delayedCall,set,killTweensOf",function(n){return hu[n]=$t[n]});Qn.add(_n.updateRoot);Bo=hu.to({},{duration:0});var vD=function(e,t){for(var i=e._pt;i&&i.p!==t&&i.op!==t&&i.fp!==t;)i=i._next;return i},xD=function(e,t){var i=e._targets,s,r,o;for(s in t)for(r=i.length;r--;)o=e._ptLookup[r][s],o&&(o=o.d)&&(o._pt&&(o=vD(o,s)),o&&o.modifier&&o.modifier(t[s],e,i[r],s))},nf=function(e,t){return{name:e,rawVars:1,init:function(s,r,o){o._onInit=function(a){var l,c;if(en(r)&&(l={},kn(r,function(u){return l[u]=1}),r=l),t){l={};for(c in r)l[c]=t(r[c]);r=l}xD(a,r)}}}},Gn=hu.registerPlugin({name:"attr",init:function(e,t,i,s,r){var o,a,l;this.tween=i;for(o in t)l=e.getAttribute(o)||"",a=this.add(e,"setAttribute",(l||0)+"",t[o],s,r,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(e,t){for(var i=t._pt;i;)un?i.set(i.t,i.p,i.b,i):i.r(e,i.d),i=i._next}},{name:"endArray",init:function(e,t){for(var i=t.length;i--;)this.add(e,i,e[i]||0,t[i],0,0,0,0,0,1)}},nf("roundProps",Bd),nf("modifiers"),nf("snap",eb))||hu;$t.version=_n.version=Gn.version="3.12.5";kx=1;qp()&&ma();ct.Power0;ct.Power1;ct.Power2;ct.Power3;ct.Power4;ct.Linear;ct.Quad;ct.Cubic;ct.Quart;ct.Quint;ct.Strong;ct.Elastic;ct.Back;ct.SteppedEase;ct.Bounce;ct.Sine;ct.Expo;ct.Circ;/*!
 * CSSPlugin 3.12.5
 * https://gsap.com
 *
 * Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var F_,ur,Jo,im,Zr,N_,sm,bD=function(){return typeof window<"u"},ks={},qr=180/Math.PI,ea=Math.PI/180,Do=Math.atan2,B_=1e8,rm=/([A-Z])/g,SD=/(left|right|width|margin|padding|x)/i,yD=/[\s,\(]\S/,Ji={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Hd=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},MD=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},ED=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},wD=function(e,t){var i=t.s+t.c*e;t.set(t.t,t.p,~~(i+(i<0?-.5:.5))+t.u,t)},Sb=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},yb=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},TD=function(e,t,i){return e.style[t]=i},AD=function(e,t,i){return e.style.setProperty(t,i)},CD=function(e,t,i){return e._gsap[t]=i},RD=function(e,t,i){return e._gsap.scaleX=e._gsap.scaleY=i},PD=function(e,t,i,s,r){var o=e._gsap;o.scaleX=o.scaleY=i,o.renderTransform(r,o)},DD=function(e,t,i,s,r){var o=e._gsap;o[t]=i,o.renderTransform(r,o)},Ut="transform",Hn=Ut+"Origin",LD=function n(e,t){var i=this,s=this.target,r=s.style,o=s._gsap;if(e in ks&&r){if(this.tfm=this.tfm||{},e!=="transform")e=Ji[e]||e,~e.indexOf(",")?e.split(",").forEach(function(a){return i.tfm[a]=Ms(s,a)}):this.tfm[e]=o.x?o[e]:Ms(s,e),e===Hn&&(this.tfm.zOrigin=o.zOrigin);else return Ji.transform.split(",").forEach(function(a){return n.call(i,a,t)});if(this.props.indexOf(Ut)>=0)return;o.svg&&(this.svgo=s.getAttribute("data-svg-origin"),this.props.push(Hn,t,"")),e=Ut}(r||t)&&this.props.push(e,t,r[e])},Mb=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},ID=function(){var e=this.props,t=this.target,i=t.style,s=t._gsap,r,o;for(r=0;r<e.length;r+=3)e[r+1]?t[e[r]]=e[r+2]:e[r+2]?i[e[r]]=e[r+2]:i.removeProperty(e[r].substr(0,2)==="--"?e[r]:e[r].replace(rm,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)s[o]=this.tfm[o];s.svg&&(s.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),r=sm(),(!r||!r.isStart)&&!i[Ut]&&(Mb(i),s.zOrigin&&i[Hn]&&(i[Hn]+=" "+s.zOrigin+"px",s.zOrigin=0,s.renderTransform()),s.uncache=1)}},Eb=function(e,t){var i={target:e,props:[],revert:ID,save:LD};return e._gsap||Gn.core.getCache(e),t&&t.split(",").forEach(function(s){return i.save(s)}),i},wb,Vd=function(e,t){var i=ur.createElementNS?ur.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):ur.createElement(e);return i&&i.style?i:ur.createElement(e)},is=function n(e,t,i){var s=getComputedStyle(e);return s[t]||s.getPropertyValue(t.replace(rm,"-$1").toLowerCase())||s.getPropertyValue(t)||!i&&n(e,ga(t)||t,1)||""},k_="O,Moz,ms,Ms,Webkit".split(","),ga=function(e,t,i){var s=t||Zr,r=s.style,o=5;if(e in r&&!i)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);o--&&!(k_[o]+e in r););return o<0?null:(o===3?"ms":o>=0?k_[o]:"")+e},Gd=function(){bD()&&window.document&&(F_=window,ur=F_.document,Jo=ur.documentElement,Zr=Vd("div")||{style:{}},Vd("div"),Ut=ga(Ut),Hn=Ut+"Origin",Zr.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",wb=!!ga("perspective"),sm=Gn.core.reverting,im=1)},sf=function n(e){var t=Vd("svg",this.ownerSVGElement&&this.ownerSVGElement.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=this.parentNode,s=this.nextSibling,r=this.style.cssText,o;if(Jo.appendChild(t),t.appendChild(this),this.style.display="block",e)try{o=this.getBBox(),this._gsapBBox=this.getBBox,this.getBBox=n}catch{}else this._gsapBBox&&(o=this._gsapBBox());return i&&(s?i.insertBefore(this,s):i.appendChild(this)),Jo.removeChild(t),this.style.cssText=r,o},z_=function(e,t){for(var i=t.length;i--;)if(e.hasAttribute(t[i]))return e.getAttribute(t[i])},Tb=function(e){var t;try{t=e.getBBox()}catch{t=sf.call(e,!0)}return t&&(t.width||t.height)||e.getBBox===sf||(t=sf.call(e,!0)),t&&!t.width&&!t.x&&!t.y?{x:+z_(e,["x","cx","x1"])||0,y:+z_(e,["y","cy","y1"])||0,width:0,height:0}:t},Ab=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&Tb(e))},uo=function(e,t){if(t){var i=e.style,s;t in ks&&t!==Hn&&(t=Ut),i.removeProperty?(s=t.substr(0,2),(s==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),i.removeProperty(s==="--"?t:t.replace(rm,"-$1").toLowerCase())):i.removeAttribute(t)}},hr=function(e,t,i,s,r,o){var a=new zn(e._pt,t,i,0,1,o?yb:Sb);return e._pt=a,a.b=s,a.e=r,e._props.push(i),a},H_={deg:1,rad:1,turn:1},UD={grid:1,flex:1},Sr=function n(e,t,i,s){var r=parseFloat(i)||0,o=(i+"").trim().substr((r+"").length)||"px",a=Zr.style,l=SD.test(t),c=e.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),h=100,f=s==="px",d=s==="%",g,_,m,p;if(s===o||!r||H_[s]||H_[o])return r;if(o!=="px"&&!f&&(r=n(e,t,i,"px")),p=e.getCTM&&Ab(e),(d||o==="%")&&(ks[t]||~t.indexOf("adius")))return g=p?e.getBBox()[l?"width":"height"]:e[u],kt(d?r/g*h:r/100*g);if(a[l?"width":"height"]=h+(f?o:s),_=~t.indexOf("adius")||s==="em"&&e.appendChild&&!c?e:e.parentNode,p&&(_=(e.ownerSVGElement||{}).parentNode),(!_||_===ur||!_.appendChild)&&(_=ur.body),m=_._gsap,m&&d&&m.width&&l&&m.time===Qn.time&&!m.uncache)return kt(r/m.width*h);if(d&&(t==="height"||t==="width")){var x=e.style[t];e.style[t]=h+s,g=e[u],x?e.style[t]=x:uo(e,t)}else(d||o==="%")&&!UD[is(_,"display")]&&(a.position=is(e,"position")),_===e&&(a.position="static"),_.appendChild(Zr),g=Zr[u],_.removeChild(Zr),a.position="absolute";return l&&d&&(m=eo(_),m.time=Qn.time,m.width=_[u]),kt(f?g*r/h:g&&r?h/g*r:0)},Ms=function(e,t,i,s){var r;return im||Gd(),t in Ji&&t!=="transform"&&(t=Ji[t],~t.indexOf(",")&&(t=t.split(",")[0])),ks[t]&&t!=="transform"?(r=Ul(e,s),r=t!=="transformOrigin"?r[t]:r.svg?r.origin:du(is(e,Hn))+" "+r.zOrigin+"px"):(r=e.style[t],(!r||r==="auto"||s||~(r+"").indexOf("calc("))&&(r=fu[t]&&fu[t](e,t,i)||is(e,t)||Gx(e,t)||(t==="opacity"?1:0))),i&&!~(r+"").trim().indexOf(" ")?Sr(e,t,r,i)+i:r},OD=function(e,t,i,s){if(!i||i==="none"){var r=ga(t,e,1),o=r&&is(e,r,1);o&&o!==i?(t=r,i=o):t==="borderColor"&&(i=is(e,"borderTopColor"))}var a=new zn(this._pt,e.style,t,0,1,vb),l=0,c=0,u,h,f,d,g,_,m,p,x,b,v,C;if(a.b=i,a.e=s,i+="",s+="",s==="auto"&&(_=e.style[t],e.style[t]=s,s=is(e,t)||s,_?e.style[t]=_:uo(e,t)),u=[i,s],lb(u),i=u[0],s=u[1],f=i.match(No)||[],C=s.match(No)||[],C.length){for(;h=No.exec(s);)m=h[0],x=s.substring(l,h.index),g?g=(g+1)%5:(x.substr(-5)==="rgba("||x.substr(-5)==="hsla(")&&(g=1),m!==(_=f[c++]||"")&&(d=parseFloat(_)||0,v=_.substr((d+"").length),m.charAt(1)==="="&&(m=Qo(d,m)+v),p=parseFloat(m),b=m.substr((p+"").length),l=No.lastIndex-b.length,b||(b=b||si.units[t]||v,l===s.length&&(s+=b,a.e+=b)),v!==b&&(d=Sr(e,t,_,b)||0),a._pt={_next:a._pt,p:x||c===1?x:",",s:d,c:p-d,m:g&&g<4||t==="zIndex"?Math.round:0});a.c=l<s.length?s.substring(l,s.length):""}else a.r=t==="display"&&s==="none"?yb:Sb;return Nx.test(s)&&(a.e=0),this._pt=a,a},V_={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},FD=function(e){var t=e.split(" "),i=t[0],s=t[1]||"50%";return(i==="top"||i==="bottom"||s==="left"||s==="right")&&(e=i,i=s,s=e),t[0]=V_[i]||i,t[1]=V_[s]||s,t.join(" ")},ND=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var i=t.t,s=i.style,r=t.u,o=i._gsap,a,l,c;if(r==="all"||r===!0)s.cssText="",l=1;else for(r=r.split(","),c=r.length;--c>-1;)a=r[c],ks[a]&&(l=1,a=a==="transformOrigin"?Hn:Ut),uo(i,a);l&&(uo(i,Ut),o&&(o.svg&&i.removeAttribute("transform"),Ul(i,1),o.uncache=1,Mb(s)))}},fu={clearProps:function(e,t,i,s,r){if(r.data!=="isFromStart"){var o=e._pt=new zn(e._pt,t,i,0,0,ND);return o.u=s,o.pr=-10,o.tween=r,e._props.push(i),1}}},Il=[1,0,0,1,0,0],Cb={},Rb=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},G_=function(e){var t=is(e,Ut);return Rb(t)?Il:t.substr(7).match(Fx).map(kt)},om=function(e,t){var i=e._gsap||eo(e),s=e.style,r=G_(e),o,a,l,c;return i.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,r=[l.a,l.b,l.c,l.d,l.e,l.f],r.join(",")==="1,0,0,1,0,0"?Il:r):(r===Il&&!e.offsetParent&&e!==Jo&&!i.svg&&(l=s.display,s.display="block",o=e.parentNode,(!o||!e.offsetParent)&&(c=1,a=e.nextElementSibling,Jo.appendChild(e)),r=G_(e),l?s.display=l:uo(e,"display"),c&&(a?o.insertBefore(e,a):o?o.appendChild(e):Jo.removeChild(e))),t&&r.length>6?[r[0],r[1],r[4],r[5],r[12],r[13]]:r)},Wd=function(e,t,i,s,r,o){var a=e._gsap,l=r||om(e,!0),c=a.xOrigin||0,u=a.yOrigin||0,h=a.xOffset||0,f=a.yOffset||0,d=l[0],g=l[1],_=l[2],m=l[3],p=l[4],x=l[5],b=t.split(" "),v=parseFloat(b[0])||0,C=parseFloat(b[1])||0,A,T,L,M;i?l!==Il&&(T=d*m-g*_)&&(L=v*(m/T)+C*(-_/T)+(_*x-m*p)/T,M=v*(-g/T)+C*(d/T)-(d*x-g*p)/T,v=L,C=M):(A=Tb(e),v=A.x+(~b[0].indexOf("%")?v/100*A.width:v),C=A.y+(~(b[1]||b[0]).indexOf("%")?C/100*A.height:C)),s||s!==!1&&a.smooth?(p=v-c,x=C-u,a.xOffset=h+(p*d+x*_)-p,a.yOffset=f+(p*g+x*m)-x):a.xOffset=a.yOffset=0,a.xOrigin=v,a.yOrigin=C,a.smooth=!!s,a.origin=t,a.originIsAbsolute=!!i,e.style[Hn]="0px 0px",o&&(hr(o,a,"xOrigin",c,v),hr(o,a,"yOrigin",u,C),hr(o,a,"xOffset",h,a.xOffset),hr(o,a,"yOffset",f,a.yOffset)),e.setAttribute("data-svg-origin",v+" "+C)},Ul=function(e,t){var i=e._gsap||new fb(e);if("x"in i&&!t&&!i.uncache)return i;var s=e.style,r=i.scaleX<0,o="px",a="deg",l=getComputedStyle(e),c=is(e,Hn)||"0",u,h,f,d,g,_,m,p,x,b,v,C,A,T,L,M,y,D,F,N,K,j,H,W,B,pe,be,ue,ce,he,k,G;return u=h=f=_=m=p=x=b=v=0,d=g=1,i.svg=!!(e.getCTM&&Ab(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(s[Ut]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Ut]!=="none"?l[Ut]:"")),s.scale=s.rotate=s.translate="none"),T=om(e,i.svg),i.svg&&(i.uncache?(B=e.getBBox(),c=i.xOrigin-B.x+"px "+(i.yOrigin-B.y)+"px",W=""):W=!t&&e.getAttribute("data-svg-origin"),Wd(e,W||c,!!W||i.originIsAbsolute,i.smooth!==!1,T)),C=i.xOrigin||0,A=i.yOrigin||0,T!==Il&&(D=T[0],F=T[1],N=T[2],K=T[3],u=j=T[4],h=H=T[5],T.length===6?(d=Math.sqrt(D*D+F*F),g=Math.sqrt(K*K+N*N),_=D||F?Do(F,D)*qr:0,x=N||K?Do(N,K)*qr+_:0,x&&(g*=Math.abs(Math.cos(x*ea))),i.svg&&(u-=C-(C*D+A*N),h-=A-(C*F+A*K))):(G=T[6],he=T[7],be=T[8],ue=T[9],ce=T[10],k=T[11],u=T[12],h=T[13],f=T[14],L=Do(G,ce),m=L*qr,L&&(M=Math.cos(-L),y=Math.sin(-L),W=j*M+be*y,B=H*M+ue*y,pe=G*M+ce*y,be=j*-y+be*M,ue=H*-y+ue*M,ce=G*-y+ce*M,k=he*-y+k*M,j=W,H=B,G=pe),L=Do(-N,ce),p=L*qr,L&&(M=Math.cos(-L),y=Math.sin(-L),W=D*M-be*y,B=F*M-ue*y,pe=N*M-ce*y,k=K*y+k*M,D=W,F=B,N=pe),L=Do(F,D),_=L*qr,L&&(M=Math.cos(L),y=Math.sin(L),W=D*M+F*y,B=j*M+H*y,F=F*M-D*y,H=H*M-j*y,D=W,j=B),m&&Math.abs(m)+Math.abs(_)>359.9&&(m=_=0,p=180-p),d=kt(Math.sqrt(D*D+F*F+N*N)),g=kt(Math.sqrt(H*H+G*G)),L=Do(j,H),x=Math.abs(L)>2e-4?L*qr:0,v=k?1/(k<0?-k:k):0),i.svg&&(W=e.getAttribute("transform"),i.forceCSS=e.setAttribute("transform","")||!Rb(is(e,Ut)),W&&e.setAttribute("transform",W))),Math.abs(x)>90&&Math.abs(x)<270&&(r?(d*=-1,x+=_<=0?180:-180,_+=_<=0?180:-180):(g*=-1,x+=x<=0?180:-180)),t=t||i.uncache,i.x=u-((i.xPercent=u&&(!t&&i.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*i.xPercent/100:0)+o,i.y=h-((i.yPercent=h&&(!t&&i.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-h)?-50:0)))?e.offsetHeight*i.yPercent/100:0)+o,i.z=f+o,i.scaleX=kt(d),i.scaleY=kt(g),i.rotation=kt(_)+a,i.rotationX=kt(m)+a,i.rotationY=kt(p)+a,i.skewX=x+a,i.skewY=b+a,i.transformPerspective=v+o,(i.zOrigin=parseFloat(c.split(" ")[2])||!t&&i.zOrigin||0)&&(s[Hn]=du(c)),i.xOffset=i.yOffset=0,i.force3D=si.force3D,i.renderTransform=i.svg?kD:wb?Pb:BD,i.uncache=0,i},du=function(e){return(e=e.split(" "))[0]+" "+e[1]},rf=function(e,t,i){var s=on(t);return kt(parseFloat(t)+parseFloat(Sr(e,"x",i+"px",s)))+s},BD=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,Pb(e,t)},kr="0deg",Ha="0px",zr=") ",Pb=function(e,t){var i=t||this,s=i.xPercent,r=i.yPercent,o=i.x,a=i.y,l=i.z,c=i.rotation,u=i.rotationY,h=i.rotationX,f=i.skewX,d=i.skewY,g=i.scaleX,_=i.scaleY,m=i.transformPerspective,p=i.force3D,x=i.target,b=i.zOrigin,v="",C=p==="auto"&&e&&e!==1||p===!0;if(b&&(h!==kr||u!==kr)){var A=parseFloat(u)*ea,T=Math.sin(A),L=Math.cos(A),M;A=parseFloat(h)*ea,M=Math.cos(A),o=rf(x,o,T*M*-b),a=rf(x,a,-Math.sin(A)*-b),l=rf(x,l,L*M*-b+b)}m!==Ha&&(v+="perspective("+m+zr),(s||r)&&(v+="translate("+s+"%, "+r+"%) "),(C||o!==Ha||a!==Ha||l!==Ha)&&(v+=l!==Ha||C?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+zr),c!==kr&&(v+="rotate("+c+zr),u!==kr&&(v+="rotateY("+u+zr),h!==kr&&(v+="rotateX("+h+zr),(f!==kr||d!==kr)&&(v+="skew("+f+", "+d+zr),(g!==1||_!==1)&&(v+="scale("+g+", "+_+zr),x.style[Ut]=v||"translate(0, 0)"},kD=function(e,t){var i=t||this,s=i.xPercent,r=i.yPercent,o=i.x,a=i.y,l=i.rotation,c=i.skewX,u=i.skewY,h=i.scaleX,f=i.scaleY,d=i.target,g=i.xOrigin,_=i.yOrigin,m=i.xOffset,p=i.yOffset,x=i.forceCSS,b=parseFloat(o),v=parseFloat(a),C,A,T,L,M;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=ea,c*=ea,C=Math.cos(l)*h,A=Math.sin(l)*h,T=Math.sin(l-c)*-f,L=Math.cos(l-c)*f,c&&(u*=ea,M=Math.tan(c-u),M=Math.sqrt(1+M*M),T*=M,L*=M,u&&(M=Math.tan(u),M=Math.sqrt(1+M*M),C*=M,A*=M)),C=kt(C),A=kt(A),T=kt(T),L=kt(L)):(C=h,L=f,A=T=0),(b&&!~(o+"").indexOf("px")||v&&!~(a+"").indexOf("px"))&&(b=Sr(d,"x",o,"px"),v=Sr(d,"y",a,"px")),(g||_||m||p)&&(b=kt(b+g-(g*C+_*T)+m),v=kt(v+_-(g*A+_*L)+p)),(s||r)&&(M=d.getBBox(),b=kt(b+s/100*M.width),v=kt(v+r/100*M.height)),M="matrix("+C+","+A+","+T+","+L+","+b+","+v+")",d.setAttribute("transform",M),x&&(d.style[Ut]=M)},zD=function(e,t,i,s,r){var o=360,a=en(r),l=parseFloat(r)*(a&&~r.indexOf("rad")?qr:1),c=l-s,u=s+c+"deg",h,f;return a&&(h=r.split("_")[1],h==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-360)),h==="cw"&&c<0?c=(c+o*B_)%o-~~(c/o)*o:h==="ccw"&&c>0&&(c=(c-o*B_)%o-~~(c/o)*o)),e._pt=f=new zn(e._pt,t,i,s,c,MD),f.e=u,f.u="deg",e._props.push(i),f},W_=function(e,t){for(var i in t)e[i]=t[i];return e},HD=function(e,t,i){var s=W_({},i._gsap),r="perspective,force3D,transformOrigin,svgOrigin",o=i.style,a,l,c,u,h,f,d,g;s.svg?(c=i.getAttribute("transform"),i.setAttribute("transform",""),o[Ut]=t,a=Ul(i,1),uo(i,Ut),i.setAttribute("transform",c)):(c=getComputedStyle(i)[Ut],o[Ut]=t,a=Ul(i,1),o[Ut]=c);for(l in ks)c=s[l],u=a[l],c!==u&&r.indexOf(l)<0&&(d=on(c),g=on(u),h=d!==g?Sr(i,l,c,g):parseFloat(c),f=parseFloat(u),e._pt=new zn(e._pt,a,l,h,f-h,Hd),e._pt.u=g||0,e._props.push(l));W_(a,s)};kn("padding,margin,Width,Radius",function(n,e){var t="Top",i="Right",s="Bottom",r="Left",o=(e<3?[t,i,s,r]:[t+r,t+i,s+i,s+r]).map(function(a){return e<2?n+a:"border"+a+n});fu[e>1?"border"+n:n]=function(a,l,c,u,h){var f,d;if(arguments.length<4)return f=o.map(function(g){return Ms(a,g,c)}),d=f.join(" "),d.split(f[0]).length===5?f[0]:d;f=(u+"").split(" "),d={},o.forEach(function(g,_){return d[g]=f[_]=f[_]||f[(_-1)/2|0]}),a.init(l,d,h)}});var Db={name:"css",register:Gd,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,i,s,r){var o=this._props,a=e.style,l=i.vars.startAt,c,u,h,f,d,g,_,m,p,x,b,v,C,A,T,L;im||Gd(),this.styles=this.styles||Eb(e),L=this.styles.props,this.tween=i;for(_ in t)if(_!=="autoRound"&&(u=t[_],!(Zn[_]&&db(_,t,i,s,e,r)))){if(d=typeof u,g=fu[_],d==="function"&&(u=u.call(i,s,e,r),d=typeof u),d==="string"&&~u.indexOf("random(")&&(u=Pl(u)),g)g(this,e,_,u,i)&&(T=1);else if(_.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(_)+"").trim(),u+="",mr.lastIndex=0,mr.test(c)||(m=on(c),p=on(u)),p?m!==p&&(c=Sr(e,_,c,p)+p):m&&(u+=m),this.add(a,"setProperty",c,u,s,r,0,0,_),o.push(_),L.push(_,0,a[_]);else if(d!=="undefined"){if(l&&_ in l?(c=typeof l[_]=="function"?l[_].call(i,s,e,r):l[_],en(c)&&~c.indexOf("random(")&&(c=Pl(c)),on(c+"")||c==="auto"||(c+=si.units[_]||on(Ms(e,_))||""),(c+"").charAt(1)==="="&&(c=Ms(e,_))):c=Ms(e,_),f=parseFloat(c),x=d==="string"&&u.charAt(1)==="="&&u.substr(0,2),x&&(u=u.substr(2)),h=parseFloat(u),_ in Ji&&(_==="autoAlpha"&&(f===1&&Ms(e,"visibility")==="hidden"&&h&&(f=0),L.push("visibility",0,a.visibility),hr(this,a,"visibility",f?"inherit":"hidden",h?"inherit":"hidden",!h)),_!=="scale"&&_!=="transform"&&(_=Ji[_],~_.indexOf(",")&&(_=_.split(",")[0]))),b=_ in ks,b){if(this.styles.save(_),v||(C=e._gsap,C.renderTransform&&!t.parseTransform||Ul(e,t.parseTransform),A=t.smoothOrigin!==!1&&C.smooth,v=this._pt=new zn(this._pt,a,Ut,0,1,C.renderTransform,C,0,-1),v.dep=1),_==="scale")this._pt=new zn(this._pt,C,"scaleY",C.scaleY,(x?Qo(C.scaleY,x+h):h)-C.scaleY||0,Hd),this._pt.u=0,o.push("scaleY",_),_+="X";else if(_==="transformOrigin"){L.push(Hn,0,a[Hn]),u=FD(u),C.svg?Wd(e,u,0,A,0,this):(p=parseFloat(u.split(" ")[2])||0,p!==C.zOrigin&&hr(this,C,"zOrigin",C.zOrigin,p),hr(this,a,_,du(c),du(u)));continue}else if(_==="svgOrigin"){Wd(e,u,1,A,0,this);continue}else if(_ in Cb){zD(this,C,_,f,x?Qo(f,x+u):u);continue}else if(_==="smoothOrigin"){hr(this,C,"smooth",C.smooth,u);continue}else if(_==="force3D"){C[_]=u;continue}else if(_==="transform"){HD(this,u,e);continue}}else _ in a||(_=ga(_)||_);if(b||(h||h===0)&&(f||f===0)&&!yD.test(u)&&_ in a)m=(c+"").substr((f+"").length),h||(h=0),p=on(u)||(_ in si.units?si.units[_]:m),m!==p&&(f=Sr(e,_,c,p)),this._pt=new zn(this._pt,b?C:a,_,f,(x?Qo(f,x+h):h)-f,!b&&(p==="px"||_==="zIndex")&&t.autoRound!==!1?wD:Hd),this._pt.u=p||0,m!==p&&p!=="%"&&(this._pt.b=c,this._pt.r=ED);else if(_ in a)OD.call(this,e,_,c,x?x+u:u);else if(_ in e)this.add(e,_,c||e[_],x?x+u:u,s,r);else if(_!=="parseTransform"){Yp(_,u);continue}b||(_ in a?L.push(_,0,a[_]):L.push(_,1,c||e[_])),o.push(_)}}T&&xb(this)},render:function(e,t){if(t.tween._time||!sm())for(var i=t._pt;i;)i.r(e,i.d),i=i._next;else t.styles.revert()},get:Ms,aliases:Ji,getSetter:function(e,t,i){var s=Ji[t];return s&&s.indexOf(",")<0&&(t=s),t in ks&&t!==Hn&&(e._gsap.x||Ms(e,"x"))?i&&N_===i?t==="scale"?RD:CD:(N_=i||{})&&(t==="scale"?PD:DD):e.style&&!Xp(e.style[t])?TD:~t.indexOf("-")?AD:tm(e,t)},core:{_removeProperty:uo,_getMatrix:om}};Gn.utils.checkPrefix=ga;Gn.core.getStyleSaver=Eb;(function(n,e,t,i){var s=kn(n+","+e+","+t,function(r){ks[r]=1});kn(e,function(r){si.units[r]="deg",Cb[r]=1}),Ji[s[13]]=n+","+e,kn(i,function(r){var o=r.split(":");Ji[o[1]]=s[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");kn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(n){si.units[n]="px"});Gn.registerPlugin(Db);var Oe=Gn.registerPlugin(Db)||Gn;Oe.core.Tween;const Fe={WEBGL_LOAD_START:"WEBGL_LOAD_START",WEBGL_LOAD_PROGRESS:"WEBGL_LOAD_PROGRESS",WEBGL_LOAD_COMPLETE:"WEBGL_LOAD_COMPLETE",FIRST_RENDER:"FIRST_RENDER",MOUSE_DOWN:"MOUSE_DOWN",MOUSE_UP:"MOUSE_UP",MOUSE_MOVE:"MOUSE_MOVE",MOUSE_DRAG_START:"MOUSE_DRAG_START",MOUSE_DRAG_MOVE:"MOUSE_DRAG_MOVE",MOUSE_DRAG_END:"MOUSE_DRAG_END",FACE_DRAG_START:"FACE_DRAG_START",FACE_DRAG_END:"FACE_DRAG_END",FINGER_DRAG_START:"FINGER_DRAG_START",FINGER_DRAG_END:"FINGER_DRAG_END",UI_SHOW:"UI_SHOW",UI_HIDE:"UI_HIDE",MEDIA_SHOW:"MEDIA_SHOW",SCRIBBLES_HIDE:"SCRIBBLES_HIDE",MOBILE_SWITCH_TOGGLE:"MOBILE_SWITCH_TOGGLE"},ar={default:"Harshit Chauhan :D",surprised:"Harshit Chauhan :o",frowning:"Harshit Chauhan x/",frank:"frank leboeuf :D"},VD=()=>{const n={},e=(s,r)=>{if(s in n){const o=n[s].findIndex(a=>a===r);o!==-1&&n[s].splice(o,1)}};return{on:(s,r)=>(s in n||(n[s]=[]),n[s].push(r),()=>{e(s,r)}),off:e,trigger:(s,r)=>{s in n&&n[s].forEach(o=>o({event:s,...r}))}}},Be=VD();class Lb{constructor({manager:e,isDesktop:t}){this.manager=e,this.canvas=e.canvas,this.renderer=e.renderer,this.gl=e.renderer.gl,this.name="Scene Base",this.isActive=!1,this.hasLoaded=!1,this.shouldTriggerLoadEvents=!0,this.isDesktop=t,this.sceneVars={isDesktop:this.isDesktop,width:0,height:0,vWidth:0,vHeight:0,aspectRatio:0,cu:0,documentHeight:0},this.entities=[],this.textures={},this.scene=new Ad}enable(){this.isActive=!0,this.addEventListeners(),this.handleResize()}disable(){this.isActive=!1,this.removeEventListeners()}destroy(){this.isActive=!1,this.entities=[],this.textures=[],this.removeEventListeners()}manageLoadPromises(e,t={start:Fe.WEBGL_LOAD_START,progress:Fe.WEBGL_LOAD_PROGRESS,complete:Fe.WEBGL_LOAD_COMPLETE},i=()=>{}){this.shouldTriggerLoadEvents&&Be.trigger(t.start);const s=Promise.all(e).then(()=>{this.shouldTriggerLoadEvents&&Be.trigger(t.complete),i()});let r=0;return e.forEach(o=>{o.then(()=>{r+=1;const a=r/e.length;this.shouldTriggerLoadEvents&&Be.trigger(t.progress,{progress:a})})}),s}load(){let e=[];return this.hasLoaded?(this.shouldTriggerLoadEvents&&(Be.trigger(Fe.WEBGL_LOAD_PROGRESS,{progress:1}),Be.trigger(Fe.WEBGL_LOAD_COMPLETE)),e):(e=[...e,...this.loadTextures()],e=[...e,...this.loadModels()],e=[...e,...this.loadAudio()],this.manageLoadPromises(e,{start:Fe.WEBGL_LOAD_START,progress:Fe.WEBGL_LOAD_PROGRESS,complete:Fe.WEBGL_LOAD_COMPLETE},this.handleAssetsLoad.bind(this)))}loadTextures(){return[]}loadModels(){return[]}loadAudio(){return[]}addEventListeners(){}removeEventListeners(){this.entities.forEach(e=>{e.removeEventListeners&&e.removeEventListeners()})}handleResize(){this.updateSceneVarsDom(),this.camera&&(this.camera.aspect=this.sceneVars.aspectRatio,this.camera.updateProjectionMatrix()),this.debugCamera&&(this.debugCamera.aspect=this.sceneVars.aspectRatio,this.debugCamera.updateProjectionMatrix()),this.updateSceneVarsFov(),this.entities.forEach(e=>{e.handleResize&&e.handleResize(this.sceneVars)})}handleVisibilityChange(e){}handleAssetsLoad(){this.hasLoaded=!0,this.entities.forEach(e=>{e.handleAssetsLoad&&e.handleAssetsLoad()}),this.handleAfterLoad()}handleAfterLoad(){}updateSceneVarsDom(){const e=this.canvas.parentNode;this.sceneVars.width=e.offsetWidth,this.sceneVars.height=e.offsetHeight,this.sceneVars.aspectRatio=this.sceneVars.width/this.sceneVars.height,this.sceneVars.documentHeight=document.body.offsetHeight}updateSceneVarsFov(){if(this.camera){const e=this.camera.fov*(Math.PI/180),t=2*Math.tan(e/2)*this.camera.position.z,i=t*this.camera.aspect;this.sceneVars.vHeight=t,this.sceneVars.vWidth=i}}update(e,t){}}class Ib extends Lb{constructor(e){super(e),this.parentScene=e.parentScene,this.name="Subscene Three Base",this.shouldTriggerLoadEvents=!1,this.initRenderTarget()}initRenderTarget(){this.renderTarget=new ai(this.sceneVars.width*this.manager.pixelRatio,this.sceneVars.height*this.manager.pixelRatio,{magFilter:vn,minFilter:vn,depthBuffer:!1,stencilBuffer:!1})}handleResize(){super.handleResize(),this.renderTarget.setSize(this.sceneVars.width*this.manager.pixelRatio,this.sceneVars.height*this.manager.pixelRatio)}update(e){}}const GD=`<vert>
// attribute vec2 uv;
// attribute vec2 position;

varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0, 1);
    // gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
</vert>

<frag>
precision highp float;
 
varying vec2 vUv;

uniform float uTimeQuarter;
uniform vec2 uScreenRes;
uniform sampler2D uTex;
uniform sampler2D uTexAlpha;
uniform sampler2D uTexBeta;
uniform sampler2D uTexFlow;
uniform sampler2D uTexNoiseBlue;
uniform sampler2D uTexNoiseColor;
uniform float uMosaicResX;
uniform float uMobileWipe;

<inject>uvs</inject>

float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

float sdRoundedBox( in vec2 p, in vec2 b, in vec4 r ) {
  r.xy = (p.x>0.0)?r.xy : r.zw;
  r.x  = (p.y>0.0)?r.x  : r.y;
  vec2 q = abs(p)-b+r.x;
  return min(max(q.x,q.y),0.0) + length(max(q,0.0)) - r.x;
}
 
void main() {
  vec3 color = vec3(0.0);

  // UVs
  vec2 uvCover = generateCoverUv(vUv, uScreenRes, vec2(1.0));
  vec2 uvJitter = vUv;

  // Noise
  vec4 texNoiseBlue = texture2D(uTexNoiseBlue, uvCover * 3.0 + uTimeQuarter);
  vec4 texNoiseColor = texture2D(uTexNoiseColor, uvCover * 3.0 + uTimeQuarter);

  // Jitter
  uvJitter += texNoiseColor.rg * 0.004;

  // Flow Mosaic
  float mosaicResX = uMosaicResX;
  float mosaicResY = floor(mosaicResX * uScreenRes.y / uScreenRes.x);
  vec2 mosaicRes = vec2(mosaicResX, mosaicResY);
  vec2 mosaicFact = vec2(1.0 / mosaicResX, 1.0 / mosaicResY);

  // vec2 uvFlow = uvJitter;
  vec2 uvFlow = floor(uvJitter * mosaicRes) * mosaicFact;

  // Sampling
  vec4 texAlpha = texture2D(uTexAlpha, uvJitter);
  vec4 texBeta = texture2D(uTexBeta, uvJitter);
  vec4 texFlow = texture2D(uTexFlow, uvFlow);

  // Mobile wipe
  vec2 uvRatio = generateCoverUv(uvFlow, uScreenRes, vec2(1.0));
  float wipeMask = distance(uvRatio, vec2(0.45, 0.2));
  wipeMask = map(wipeMask, 0.0, 1.0, 0.0, 1.0);
  wipeMask = smoothstep(wipeMask, wipeMask + 0.225, uMobileWipe);

  // Mask
  float subscenePeekIntensity = 0.3125;
  float flow = length((texFlow.rgb + vec3(1.0, 1.0, 0.0)) * 0.5);
  flow = mix(flow, 1.0, wipeMask);
  float flowSmoothed = smoothstep(1.0 - subscenePeekIntensity, 1.0, flow);
  float flowMask = flowSmoothed * 0.9;
  flowMask = step(texNoiseBlue.r, flowMask);

  // Rounded borders
  float maskRoundedSize = 1.0 - 0.3 * (1.0 - flowSmoothed);
  float maskRoundedRadius = 0.5 - 0.3 * flowSmoothed;

  vec2 uvRounded = mod(uvJitter * vec2(mosaicResX, mosaicResY), vec2(1.0));
  uvRounded = uvRounded * 2.0 - 1.0;
  float maskRounded = sdRoundedBox(uvRounded, vec2(maskRoundedSize), vec4(maskRoundedRadius));
  maskRounded = step(0.0, maskRounded);
  maskRounded = 1.0 - maskRounded;

  flowMask *= maskRounded;

  // Mix
  color = mix(texAlpha.rgb, texBeta.rgb, flowMask);

  // Debug
  // color = vec3(maskRounded);

  // Output
  gl_FragColor = vec4(color, 1.0);

  #include <colorspace_fragment>
}
</frag>`,WD=`<vert>
// attribute vec2 uv;
// attribute vec3 position;

varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
}
</vert>

<frag>
precision highp float;

uniform sampler2D uMap;

uniform float uFalloff;
uniform float uAlpha;
uniform float uDissipation;
uniform float uScaleFrame;
uniform float uScaleFrameVelocity;
uniform float uCurlIntensity;

uniform float uTime;
uniform vec2 uScreenRes;
uniform float uAspectRatio;
uniform vec2 uMouse;
uniform vec2 uVelocity;
uniform float uStampFactor;

varying vec2 vUv;

<inject>uvs</inject>
<inject>snoise</inject>

void main() {
  // UVs
  vec2 uvCover = generateCoverUv(vUv, uScreenRes, vec2(1.0));

  // Sample previous render and fade 
  float velocityFactor = length(uVelocity) * 1.0;
  float fadeScale = uScaleFrame + uScaleFrameVelocity * velocityFactor;
  float curlIntensity = uCurlIntensity;
  // float curlIntensity = uCurlIntensity * velocityFactor;

  // Fade morph
  vec3 curlFactor = scurlnoise2d(uvCover * 4.0);
  vec2 scaleTarget = vec2(-0.1, 1.2);
  // vec2 scaleTarget = vec2(0.5, 0.5);

  // vec2 uvMorph = scaleUvTarget(vUv, fadeScale, vec2(0.0, 1.0));
  vec2 uvMorph = vUv;
  uvMorph += curlFactor.xy * curlFactor.z * curlIntensity;
  uvMorph = scaleUvTarget(uvMorph, fadeScale, scaleTarget);
  
  // Sample
  vec4 color = texture2D(uMap, uvMorph) * uDissipation;

  // Mouse and cursor
  vec2 cursor = vUv - uMouse;
  cursor.x *= uAspectRatio;

  // Stamp
  float stampSize = uFalloff * (0.5 + length(uVelocity) * 0.5);
  vec3 stamp = vec3(uVelocity * vec2(1, -1), 1.0 - pow(1.0 - min(1.0, length(uVelocity)), 3.0));
  float falloff = smoothstep(stampSize, 0.0, length(cursor)) * uAlpha;

  // Color mix
  // color.rgb = mix(color.rgb, stamp, vec3(falloff));
  color.rgb = color.rgb + stamp * falloff * uStampFactor;
  color.a = 1.0;

  // Debug
  // color.rgb = curlFactor;

  gl_FragColor = color;
}
</frag>`,XD=`<vert>
// attribute vec2 uv;
// attribute vec2 position;

varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0, 1);
}
</vert>

<frag>
precision highp float;
 
varying vec2 vUv;

uniform float uTime;
uniform vec2 uScreenRes;
uniform vec3 uColor;

void main() {
  vec3 color = uColor;

  gl_FragColor.rgb = color;
  gl_FragColor.a = 1.0;

  #include <colorspace_fragment>
}
</frag>`,qD=`<vert>
// attribute vec2 uv;
// attribute vec3 position;
// attribute vec3 normal;

// uniform mat4 modelViewMatrix;
// uniform mat4 projectionMatrix;
// uniform mat3 normalMatrix;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    vUv = uv;
    vPosition = position;
    vNormal = normalize(normalMatrix * normal);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
</vert>

<frag>
precision highp float;
 
uniform float uTime;
uniform sampler2D uTexMap;
uniform float uSpriteIndex;
uniform float uSpriteRowCount;
uniform float uSpriteColCount;
 
varying vec2 vUv;
varying vec3 vPosition;
 
void main() {
  vec3 color = vec3(0.0);
  float alpha = 0.0;

  // Sample map
  float currentRow = (uSpriteRowCount - 1.0) - floor(uSpriteIndex / uSpriteColCount);
  float currentCol = mod(uSpriteIndex, uSpriteColCount);

  float spritePosX = currentCol / uSpriteColCount;
  float spritePosY = currentRow / uSpriteRowCount;
  
  vec2 spriteUv = vec2(
    spritePosX + vUv.x / uSpriteColCount,
    spritePosY + vUv.y / uSpriteRowCount
  );

  vec4 texDiffuse = texture2D(uTexMap, spriteUv);

  color = texDiffuse.rgb;
  // Black to dark grey
  color = max(color, vec3(0.012));

  alpha = texDiffuse.a;
  alpha = step(0.1, alpha);

  gl_FragColor.rgb = color;
  gl_FragColor.a = alpha;

  #include <colorspace_fragment>
}
</frag>`,$D=`<vert>
// attribute vec2 uv;
// attribute vec3 position;
// attribute vec3 normal;

// uniform mat4 modelViewMatrix;
// uniform mat4 projectionMatrix;
// uniform mat3 normalMatrix;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    vUv = uv;
    vPosition = position;
    vNormal = normalize(normalMatrix * normal);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
</vert>

<frag>
precision highp float;
 
uniform float uTime;
uniform vec3 uColor;
uniform sampler2D uTexMap;
uniform float uSpriteIndex;
uniform float uSpriteRowCount;
uniform float uSpriteColCount;
 
varying vec2 vUv;
varying vec3 vPosition;
 
void main() {
  vec3 color = vec3(0.0);
  float alpha = 0.0;

  // Sample map
  // (uSpriteRowCount - 1.0) because of flipY
  float currentRow = (uSpriteRowCount - 1.0) - floor(uSpriteIndex / uSpriteColCount);
  float currentCol = mod(uSpriteIndex, uSpriteColCount);

  float spritePosX = currentCol / uSpriteColCount;
  float spritePosY = currentRow / uSpriteRowCount;

  vec2 spriteUv = vec2(
    spritePosX + vUv.x / uSpriteColCount,
    spritePosY + vUv.y / uSpriteRowCount
  );

  vec4 texDiffuse = texture2D(uTexMap, spriteUv);

  // Transparent red version
  // color = texDiffuse.rgb;
  // alpha = texDiffuse.a;
  // alpha = step(0.1, alpha);

  // BW version
  color = uColor;
  alpha = texDiffuse.r;

  gl_FragColor.rgb = color;
  gl_FragColor.a = alpha;

  #include <colorspace_fragment>
}
</frag>`,YD=`<vert>
// attribute vec2 uv;
// attribute vec3 position;
// attribute vec3 normal;

// uniform mat4 modelViewMatrix;
// uniform mat4 projectionMatrix;
// uniform mat3 normalMatrix;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    vUv = uv;
    vPosition = position;
    vNormal = normalize(normalMatrix * normal);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
</vert>

<frag>
precision highp float;
 
uniform float uTime;
uniform float uTimeQuarter;
uniform sampler2D uTexMap;
uniform sampler2D uTexNoise;
uniform vec2 uScreenRes;
uniform vec3 uColor;
uniform float uOpacity;
uniform float uSpriteIndex;
uniform float uSpriteRowCount;
uniform float uSpriteColCount;
uniform float uVisibility;
 
varying vec2 vUv;
varying vec3 vPosition;

<inject>uvs</inject>
 
void main() {
  vec3 color = vec3(0.0);
  float alpha = 0.0;

  // Screen uvs
  vec2 uvScreen = gl_FragCoord.xy / uScreenRes.xy;
  vec2 uvScreenCover = generateCoverUv(vUv, uScreenRes, vec2(1.0));

  // Sample map
  // (uSpriteRowCount - 1.0) because of flipY
  float currentRow = (uSpriteRowCount - 1.0) - floor(uSpriteIndex / uSpriteColCount);
  float currentCol = mod(uSpriteIndex, uSpriteColCount);

  float spritePosX = currentCol / uSpriteColCount;
  float spritePosY = currentRow / uSpriteRowCount;

  vec2 spriteUv = vec2(
    spritePosX + vUv.x / uSpriteColCount,
    spritePosY + vUv.y / uSpriteRowCount
  );

  vec4 texDiffuse = texture2D(uTexMap, spriteUv);
  vec4 texNoiseBlue = texture2D(uTexNoise, uvScreenCover * 0.5 + uTimeQuarter);

  color = uColor;
  // Black to dark grey
  color = max(color, vec3(0.012));

  float ditherFactor = 1.0 - uVisibility * 0.98;
  alpha = texDiffuse.r * step(ditherFactor, texNoiseBlue.r);
  alpha = step(0.1, alpha);
  alpha *= uOpacity;

  // color = texNoiseBlue.rgb;
  // alpha = 1.0;

  gl_FragColor.rgb = color;
  gl_FragColor.a = alpha;

  #include <colorspace_fragment>
}
</frag>`,jD=`<vert>
// attribute vec2 uv;
// attribute vec3 position;
// attribute vec3 normal;

// uniform mat4 modelViewMatrix;
// uniform mat4 projectionMatrix;
// uniform mat3 normalMatrix;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    vUv = uv;
    vPosition = position;
    vNormal = normalize(normalMatrix * normal);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
</vert>

<frag>
precision highp float;
 
uniform float uTime;
uniform float uTimeQuarter;
uniform sampler2D uTexMap;
uniform sampler2D uTexNoise;
uniform vec2 uScreenRes;
uniform float uSpriteIndex;
uniform float uSpriteRowCount;
uniform float uSpriteColCount;
uniform float uVisibility;
 
varying vec2 vUv;
varying vec3 vPosition;

<inject>uvs</inject>
 
void main() {
  vec3 color = vec3(0.0);
  float alpha = 0.0;

  // Screen uvs
  vec2 uvScreen = gl_FragCoord.xy / uScreenRes.xy;
  vec2 uvScreenCover = generateCoverUv(vUv, uScreenRes, vec2(1.0));

  // Sample map
  // (uSpriteRowCount - 1.0) because of flipY
  float currentRow = (uSpriteRowCount - 1.0) - floor(uSpriteIndex / uSpriteColCount);
  float currentCol = mod(uSpriteIndex, uSpriteColCount);

  float spritePosX = currentCol / uSpriteColCount;
  float spritePosY = currentRow / uSpriteRowCount;

  vec2 spriteUv = vec2(
    spritePosX + vUv.x / uSpriteColCount,
    spritePosY + vUv.y / uSpriteRowCount
  );

  vec4 texDiffuse = texture2D(uTexMap, spriteUv);
  vec4 texNoiseBlue = texture2D(uTexNoise, uvScreenCover * 0.5 + uTimeQuarter);

  color = texDiffuse.rgb;
  // Black to dark grey
  color = max(color, vec3(0.012));

  float ditherFactor = 1.0 - uVisibility * 0.98;
  alpha = texDiffuse.a;
  // alpha = texDiffuse.a * step(ditherFactor, texNoiseBlue.r);
  alpha = step(0.1, alpha);

  // color = texNoiseBlue.rgb;
  // alpha = 1.0;

  gl_FragColor.rgb = color;
  gl_FragColor.a = alpha;

  #include <colorspace_fragment>
}
</frag>`,KD=`<vert>
// attribute vec2 uv;
// attribute vec3 position;
// attribute vec3 normal;

// uniform mat4 modelViewMatrix;
// uniform mat4 projectionMatrix;
// uniform mat3 normalMatrix;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    vUv = uv;
    vPosition = position;
    vNormal = normalize(normalMatrix * normal);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
</vert>

<frag>
precision highp float;
 
uniform float uTime;
uniform float uTimeQuarter;
uniform sampler2D uTexMap;
uniform sampler2D uTexNoise;
uniform vec2 uScreenRes;
uniform float uSpriteIndex;
uniform float uSpriteRowCount;
uniform float uSpriteColCount;
uniform float uVisibility;
 
varying vec2 vUv;
varying vec3 vPosition;

<inject>uvs</inject>
 
void main() {
  vec3 color = vec3(0.0);
  float alpha = 0.0;

  // Screen uvs
  vec2 uvScreen = gl_FragCoord.xy / uScreenRes.xy;
  vec2 uvScreenCover = generateCoverUv(vUv, uScreenRes, vec2(1.0));

  // Sample map
  // (uSpriteRowCount - 1.0) because of flipY
  float currentRow = (uSpriteRowCount - 1.0) - floor(uSpriteIndex / uSpriteColCount);
  float currentCol = mod(uSpriteIndex, uSpriteColCount);

  float spritePosX = currentCol / uSpriteColCount;
  float spritePosY = currentRow / uSpriteRowCount;

  vec2 spriteUv = vec2(
    spritePosX + vUv.x / uSpriteColCount,
    spritePosY + vUv.y / uSpriteRowCount
  );

  vec4 texDiffuse = texture2D(uTexMap, spriteUv);
  vec4 texNoiseBlue = texture2D(uTexNoise, uvScreenCover * 0.5 + uTimeQuarter);

  color = texDiffuse.rgb;
  // Black to dark grey
  color = max(color, vec3(0.012));
  // White to grey
  // color = min(color, vec3(0.788));
  color = min(color, vec3(0.5));

  float ditherFactor = 1.0 - uVisibility * 0.98;
  // alpha = texDiffuse.a;
  alpha = texDiffuse.a * step(ditherFactor, texNoiseBlue.r);
  alpha = step(0.1, alpha);

  // color = texNoiseBlue.rgb;
  // alpha = 1.0;

  gl_FragColor.rgb = color;
  gl_FragColor.a = alpha;

  #include <colorspace_fragment>
}
</frag>`,ZD=`<vert>
// attribute vec2 uv;
// attribute vec3 position;
// attribute vec3 normal;

// uniform mat4 modelViewMatrix;
// uniform mat4 projectionMatrix;
// uniform mat3 normalMatrix;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    vUv = uv;
    vPosition = position;
    vNormal = normalize(normalMatrix * normal);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
</vert>

<frag>
precision highp float;
 
varying vec2 vUv;

uniform float uTime;
uniform vec2 uScreenRes;
uniform vec3 uColor;

float sdRoundedBox( in vec2 p, in vec2 b, in vec4 r ) {
  r.xy = (p.x>0.0)?r.xy : r.zw;
  r.x  = (p.y>0.0)?r.x  : r.y;
  vec2 q = abs(p)-b+r.x;
  return min(max(q.x,q.y),0.0) + length(max(q,0.0)) - r.x;
}

void main() {
  vec3 color = vec3(0.0);
  float alpha = 1.0;

  // Color
  color = uColor;
  // Black to dark grey
  color = max(color, vec3(0.012));

  // Mask
  vec2 uvMask = vUv * 2.0 - 1.0;

  float maskRoundedSize = 1.0;
  float maskRoundedRadius = 0.05;
  float maskRounded = sdRoundedBox(uvMask, vec2(maskRoundedSize), vec4(maskRoundedRadius));
  maskRounded = step(0.0, maskRounded);
  maskRounded = 1.0 - maskRounded;

  alpha = maskRounded;

  gl_FragColor.rgb = color;
  gl_FragColor.a = alpha;

  #include <colorspace_fragment>
}
</frag>`,QD=`vec2 generateCoverUv(vec2 uv, vec2 screenRes, vec2 videoRes) {
  vec2 s = screenRes; // Screen
  vec2 i = videoRes; // Image
  float rs = s.x / s.y;
  float ri = i.x / i.y;
  vec2 new = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x);
  vec2 offset = (rs < ri ? vec2((new.x - s.x) / 2.0, 0.0) : vec2(0.0, (new.y - s.y) / 2.0)) / new;
  vec2 videoUv = uv * s / new + offset;

  return videoUv;
}

// Scale UV centered on [0.5, 0.5]
vec2 scaleUv(vec2 uv, float scale) {
  float invScale = 1.0 / scale;

  vec2 scaledUv = uv * 2.0 - 1.0;
  scaledUv *= invScale;
  scaledUv = scaledUv * 0.5 + 0.5;

  return scaledUv;
}

vec2 scaleUvTarget(vec2 uv, float scale, vec2 center) {
  float invScale = 1.0 / scale;

  vec2 scaledUv = uv * 2.0 - center * 2.0;
  scaledUv *= invScale;
  scaledUv = scaledUv * 0.5 + center;

  return scaledUv;
}`,JD=`float when_eq(float x, float y) {
  return 1.0 - abs(sign(x - y));
}

float when_neq(float x, float y) {
  return abs(sign(x - y));
}

float when_gt(float x, float y) {
  return max(sign(x - y), 0.0);
}

float when_lt(float x, float y) {
  return max(sign(y - x), 0.0);
}

float when_ge(float x, float y) {
  return 1.0 - when_lt(x, y);
}

float when_le(float x, float y) {
  return 1.0 - when_gt(x, y);
}`,eL=`vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
  return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r) {
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec2 fade(vec2 t) {
  return t*t*t*(t*(t*6.0-15.0)+10.0);
}

// Classic Perlin noise
float cnoise(vec2 P) {
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod289(Pi); // To avoid truncation effects in permutation
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;

  vec4 i = permute(permute(ix) + iy);

  vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0 ;
  vec4 gy = abs(gx) - 0.5 ;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;

  vec2 g00 = vec2(gx.x,gy.x);
  vec2 g10 = vec2(gx.y,gy.y);
  vec2 g01 = vec2(gx.z,gy.z);
  vec2 g11 = vec2(gx.w,gy.w);

  vec4 norm = taylorInvSqrt(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));
  g00 *= norm.x;  
  g01 *= norm.y;  
  g10 *= norm.z;  
  g11 *= norm.w;  

  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));

  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}`,tL=`vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod289(vec2 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x) {
  return mod289(((x*34.0)+1.0)*x);
}

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                     -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
// First corner
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);

// Other corners
  vec2 i1;
  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0
  //i1.y = 1.0 - i1.x;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  // x0 = x0 - 0.0 + 0.0 * C.xx ;
  // x1 = x0 - i1 + 1.0 * C.xx ;
  // x2 = x0 - 1.0 + 2.0 * C.xx ;
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;

// Permutations
  i = mod289(i); // Avoid truncation effects in permutation
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
		+ i.x + vec3(0.0, i1.x, 1.0 ));

  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;

// Gradients: 41 points uniformly over a line, mapped onto a diamond.
// The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

// Normalise gradients implicitly by scaling m
// Approximation of: m *= inversesqrt( a0*a0 + h*h );
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );

// Compute final noise value at P
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

vec3 scurlnoise2d(vec2 v) {
  float s = snoise(v);
  float s1 = snoise(vec2(v.x - 19.1, v.y + 33.4));
  float s2 = snoise(vec2(v.y + 74.2, v.x - 124.5));
  vec3 c = vec3(s, s1, s2);
  return c;
}`,nL=`// Add
float blendAdd(float base, float blend) {
	return min(base+blend,1.0);
}

vec3 blendAdd(vec3 base, vec3 blend) {
	return min(base+blend,vec3(1.0));
}

vec3 blendAdd(vec3 base, vec3 blend, float opacity) {
	return (blendAdd(base, blend) * opacity + base * (1.0 - opacity));
}

// Average
vec3 blendAverage(vec3 base, vec3 blend) {
	return (base+blend)/2.0;
}

vec3 blendAverage(vec3 base, vec3 blend, float opacity) {
	return (blendAverage(base, blend) * opacity + base * (1.0 - opacity));
}

// Color Burn
float blendColorBurn(float base, float blend) {
	return (blend==0.0)?blend:max((1.0-((1.0-base)/blend)),0.0);
}

vec3 blendColorBurn(vec3 base, vec3 blend) {
	return vec3(blendColorBurn(base.r,blend.r),blendColorBurn(base.g,blend.g),blendColorBurn(base.b,blend.b));
}

vec3 blendColorBurn(vec3 base, vec3 blend, float opacity) {
	return (blendColorBurn(base, blend) * opacity + base * (1.0 - opacity));
}

// Color Dodge
float blendColorDodge(float base, float blend) {
	return (blend==1.0)?blend:min(base/(1.0-blend),1.0);
}

vec3 blendColorDodge(vec3 base, vec3 blend) {
	return vec3(blendColorDodge(base.r,blend.r),blendColorDodge(base.g,blend.g),blendColorDodge(base.b,blend.b));
}

vec3 blendColorDodge(vec3 base, vec3 blend, float opacity) {
	return (blendColorDodge(base, blend) * opacity + base * (1.0 - opacity));
}

// Darken
float blendDarken(float base, float blend) {
	return min(blend,base);
}

vec3 blendDarken(vec3 base, vec3 blend) {
	return vec3(blendDarken(base.r,blend.r),blendDarken(base.g,blend.g),blendDarken(base.b,blend.b));
}

vec3 blendDarken(vec3 base, vec3 blend, float opacity) {
	return (blendDarken(base, blend) * opacity + base * (1.0 - opacity));
}

// Difference
vec3 blendDifference(vec3 base, vec3 blend) {
	return abs(base-blend);
}

vec3 blendDifference(vec3 base, vec3 blend, float opacity) {
	return (blendDifference(base, blend) * opacity + base * (1.0 - opacity));
}

// Exclusion
vec3 blendExclusion(vec3 base, vec3 blend) {
	return base+blend-2.0*base*blend;
}

vec3 blendExclusion(vec3 base, vec3 blend, float opacity) {
	return (blendExclusion(base, blend) * opacity + base * (1.0 - opacity));
}

// Glow
vec3 blendGlow(vec3 base, vec3 blend) {
	return blendReflect(blend,base);
}

vec3 blendGlow(vec3 base, vec3 blend, float opacity) {
	return (blendGlow(base, blend) * opacity + base * (1.0 - opacity));
}

// Hard Light
vec3 blendHardLight(vec3 base, vec3 blend) {
	return blendOverlay(blend,base);
}

vec3 blendHardLight(vec3 base, vec3 blend, float opacity) {
	return (blendHardLight(base, blend) * opacity + base * (1.0 - opacity));
}

// Hard Mix
float blendHardMix(float base, float blend) {
	return (blendVividLight(base,blend)<0.5)?0.0:1.0;
}

vec3 blendHardMix(vec3 base, vec3 blend) {
	return vec3(blendHardMix(base.r,blend.r),blendHardMix(base.g,blend.g),blendHardMix(base.b,blend.b));
}

vec3 blendHardMix(vec3 base, vec3 blend, float opacity) {
	return (blendHardMix(base, blend) * opacity + base * (1.0 - opacity));
}

// Lighten
float blendLighten(float base, float blend) {
	return max(blend,base);
}

vec3 blendLighten(vec3 base, vec3 blend) {
	return vec3(blendLighten(base.r,blend.r),blendLighten(base.g,blend.g),blendLighten(base.b,blend.b));
}

vec3 blendLighten(vec3 base, vec3 blend, float opacity) {
	return (blendLighten(base, blend) * opacity + base * (1.0 - opacity));
}

// Linear Burn
float blendLinearBurn(float base, float blend) {
	// Note : Same implementation as BlendSubtractf
	return max(base+blend-1.0,0.0);
}

vec3 blendLinearBurn(vec3 base, vec3 blend) {
	// Note : Same implementation as BlendSubtract
	return max(base+blend-vec3(1.0),vec3(0.0));
}

vec3 blendLinearBurn(vec3 base, vec3 blend, float opacity) {
	return (blendLinearBurn(base, blend) * opacity + base * (1.0 - opacity));
}

// Linear Dodge
float blendLinearDodge(float base, float blend) {
	// Note : Same implementation as BlendAddf
	return min(base+blend,1.0);
}

vec3 blendLinearDodge(vec3 base, vec3 blend) {
	// Note : Same implementation as BlendAdd
	return min(base+blend,vec3(1.0));
}

vec3 blendLinearDodge(vec3 base, vec3 blend, float opacity) {
	return (blendLinearDodge(base, blend) * opacity + base * (1.0 - opacity));
}

// Linear Light
float blendLinearLight(float base, float blend) {
	return blend<0.5?blendLinearBurn(base,(2.0*blend)):blendLinearDodge(base,(2.0*(blend-0.5)));
}

vec3 blendLinearLight(vec3 base, vec3 blend) {
	return vec3(blendLinearLight(base.r,blend.r),blendLinearLight(base.g,blend.g),blendLinearLight(base.b,blend.b));
}

vec3 blendLinearLight(vec3 base, vec3 blend, float opacity) {
	return (blendLinearLight(base, blend) * opacity + base * (1.0 - opacity));
}

// Multiply
vec3 blendMultiply(vec3 base, vec3 blend) {
	return base * blend;
}

vec3 blendMultiply(vec3 base, vec3 blend, float opacity) {
	return (blendMultiply(base, blend) * opacity + base * (1.0 - opacity));
}

// Negation
vec3 blendNegation(vec3 base, vec3 blend) {
	return vec3(1.0)-abs(vec3(1.0)-base-blend);
}

vec3 blendNegation(vec3 base, vec3 blend, float opacity) {
	return (blendNegation(base, blend) * opacity + base * (1.0 - opacity));
}

// Overlay
float blendOverlay(float base, float blend) {
	return base<0.5?(2.0*base*blend):(1.0-2.0*(1.0-base)*(1.0-blend));
}

vec3 blendOverlay(vec3 base, vec3 blend) {
	return vec3(blendOverlay(base.r,blend.r),blendOverlay(base.g,blend.g),blendOverlay(base.b,blend.b));
}

vec3 blendOverlay(vec3 base, vec3 blend, float opacity) {
	return (blendOverlay(base, blend) * opacity + base * (1.0 - opacity));
}

// Phoenix
vec3 blendPhoenix(vec3 base, vec3 blend) {
	return min(base,blend)-max(base,blend)+vec3(1.0);
}

vec3 blendPhoenix(vec3 base, vec3 blend, float opacity) {
	return (blendPhoenix(base, blend) * opacity + base * (1.0 - opacity));
}

// Reflect
float blendReflect(float base, float blend) {
	return (blend==1.0)?blend:min(base*base/(1.0-blend),1.0);
}

vec3 blendReflect(vec3 base, vec3 blend) {
	return vec3(blendReflect(base.r,blend.r),blendReflect(base.g,blend.g),blendReflect(base.b,blend.b));
}

vec3 blendReflect(vec3 base, vec3 blend, float opacity) {
	return (blendReflect(base, blend) * opacity + base * (1.0 - opacity));
}

// Screen
float blendScreen(float base, float blend) {
	return 1.0-((1.0-base)*(1.0-blend));
}

vec3 blendScreen(vec3 base, vec3 blend) {
	return vec3(blendScreen(base.r,blend.r),blendScreen(base.g,blend.g),blendScreen(base.b,blend.b));
}

vec3 blendScreen(vec3 base, vec3 blend, float opacity) {
	return (blendScreen(base, blend) * opacity + base * (1.0 - opacity));
}

// Soft Light
float blendSoftLight(float base, float blend) {
	return (blend<0.5)?(2.0*base*blend+base*base*(1.0-2.0*blend)):(sqrt(base)*(2.0*blend-1.0)+2.0*base*(1.0-blend));
}

vec3 blendSoftLight(vec3 base, vec3 blend) {
	return vec3(blendSoftLight(base.r,blend.r),blendSoftLight(base.g,blend.g),blendSoftLight(base.b,blend.b));
}

vec3 blendSoftLight(vec3 base, vec3 blend, float opacity) {
	return (blendSoftLight(base, blend) * opacity + base * (1.0 - opacity));
}

// Subtract
float blendSubtract(float base, float blend) {
	return max(base+blend-1.0,0.0);
}

vec3 blendSubtract(vec3 base, vec3 blend) {
	return max(base+blend-vec3(1.0),vec3(0.0));
}

vec3 blendSubtract(vec3 base, vec3 blend, float opacity) {
	return (blendSubtract(base, blend) * opacity + base * (1.0 - opacity));
}

// Vivid Light
float blendVividLight(float base, float blend) {
	return (blend<0.5)?blendColorBurn(base,(2.0*blend)):blendColorDodge(base,(2.0*(blend-0.5)));
}

vec3 blendVividLight(vec3 base, vec3 blend) {
	return vec3(blendVividLight(base.r,blend.r),blendVividLight(base.g,blend.g),blendVividLight(base.b,blend.b));
}

vec3 blendVividLight(vec3 base, vec3 blend, float opacity) {
	return (blendVividLight(base, blend) * opacity + base * (1.0 - opacity));
}`,Wn={subComposition:GD,flowmapSmoke:WD,background:XD,headPart:qD,headPartSkullFlames:$D,scribble:YD,handPart:jD,handPartIllu:KD,uiBackground:ZD,commons:{uvs:QD,conditionals:JD,cnoise:eL,snoise:tL,blendModes:nL}},Mi=(n,{defines:e,vertPrefix:t,fragPrefix:i}={defines:"",vertPrefix:"",fragPrefix:""})=>{if(typeof n!="string")return console.error(`Parsed file is not a string, please check shader exists : ${n}`),{vert:af,frag:lf};if(!n.includes("<vert>")||!n.includes("</vert>")||!n.includes("<frag>")||!n.includes("</frag>"))return console.error(`Parsed file doesn't contain correct shader tags : ${n}`),{vert:af,frag:lf};for(;n.search(/<inject>(.*?)<\/inject>/g)>=0;){const o=of(n,"<inject>","</inject>");if(Wn.commons.hasOwnProperty(o))n=n.replace(`<inject>${o}</inject>`,Wn.commons[o]);else return console.error(`Parsed file contains incorrect commons : ${n}`),{vert:af,frag:lf}}let s=of(n,"<vert>","</vert>"),r=of(n,"<frag>","</frag>");return s=s.replace(/^\n+|\n+$/g,""),r=r.replace(/^\n+|\n+$/g,""),s=t+e+s,r=i+e+r,{vert:s,frag:r}},of=(n,e,t)=>n.substring(n.indexOf(e)+e.length,n.indexOf(t)),af=`
void main() {
  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
}`,lf=`
void main() {
  gl_FragColor.rgba = vec4(0.0, 0.0, 0.0, 1.0);
}`;let iL,sL;class rL{constructor(){this.urlParams=new URLSearchParams(window.location.search),this.isActive=this.urlParams.get("dev")!==null,this.isActive=!1,this.hasLoaded=!1,this.hasCreated=!1,this.queue=[],this.isActive&&this.init(),this.TAB_SCENE=0,this.TAB_ENTITIES=1}async init(){}getUrlParameter(e){return this.urlParams.get(e)}create(){this.pane=new iL({title:"GUI"}),this.pane.registerPlugin(sL),this.fpsGraph=this.pane.addBlade({view:"fpsgraph",label:"FPS",rows:2}),this.tabs=this.pane.addTab({pages:[{title:"Scenes"},{title:"Entities"}]}),this.sceneFolders={},this.sceneEntitiesFolders={},this.folderActions=this.tabs.pages[this.TAB_SCENE].addFolder({title:"Actions"}),this.queue.forEach(e=>{e()}),this.queue=[],this.pane.element.parentElement.style.position="fixed",this.pane.element.parentElement.style.zIndex=999999,this.pane.element.parentElement.style.width="300px",this.pane.element.parentElement.style.maxWidth="90%",this.hasCreated=!0}destroy(){}clear(){this.hasCreated&&this.tabs&&this.tabs.pages&&(this.tabs.pages[this.TAB_SCENE]&&this.tabs.pages[this.TAB_SCENE].children.forEach(e=>{e.dispose()}),this.tabs.pages[this.TAB_ENTITIES]&&this.tabs.pages[this.TAB_ENTITIES].children.forEach(e=>{e.dispose()}))}checkOrWaitLoading(e){this.isActive&&(this.hasLoaded&&this.queue.length===0?e():this.queue.push(e))}addScene(e,t=!1){this.checkOrWaitLoading(()=>{this.sceneFolders[e]=this.tabs.pages[this.TAB_SCENE].addFolder({title:e,expanded:t}),this.sceneEntitiesFolders[e]=this.tabs.pages[this.TAB_ENTITIES].addFolder({title:e,expanded:t})})}addAction({label:e,callback:t,scene:i}={label:"",callback:()=>{},scene:null}){this.checkOrWaitLoading(()=>{if(t===void 0)return console.warn(`GUI.addAction(${e}): callback is undefined`);(i!==null?this.sceneFolders[i]:this.tabs.pages[this.TAB_SCENE]).addButton({title:e}).on("click",t)})}addList({label:e,options:t,callback:i,scene:s}={label:"",options:[],callback:()=>{},scene:null}){this.checkOrWaitLoading(()=>{if(t.length===0)return console.warn(`GUI.addList(${e}): options array is empty`);(s!==null?this.sceneFolders[s]:this.tabs.pages[this.TAB_SCENE]).addBlade({view:"list",label:e,options:t,value:t[0].value}).on("change",i)})}addEntity({name:e,config:t,scene:i,expanded:s}={label:"",config:{},scene:null,expanded:!1}){this.checkOrWaitLoading(()=>{const o=(i!==null?this.sceneEntitiesFolders[i]:this.tabs.pages[this.TAB_ENTITIES]).addFolder({title:e,expanded:s||!1});for(const[a,l]of Object.entries(t))o.addBinding(l,"value",{...l.params,label:a});return o})}removeEntity(e){e&&e.dispose()}fpsCaptureBegin(){!this.isActive||!this.hasLoaded||!this.hasCreated||this.fpsGraph.begin()}fpsCaptureEnd(){!this.isActive||!this.hasLoaded||!this.hasCreated||this.fpsGraph.end()}addEventListeners(){}removeEventListeners(){}}const je=new rL;class Ub{constructor({name:e,scene:t,parent:i,config:s}){if(this.name=e||"Background",this.scene=t,this.parent=i||t.root,this.sceneVars=t.sceneVars,this.isActive=!1,this.config={color:{value:"#fcd25d"}},s)for(const[r,o]of Object.entries(s))this.config[r]!==void 0&&(this.config[r].value=o);this.createMesh()}destroy(){this.isActive=!1,this.removeEventListeners()}initDebug(){je.isActive&&je.addEntity({name:this.name,config:this.config,scene:this.scene.name})}createMesh(){const e=new Sn(2,2),t=Mi(Wn.background);this.material=new Wt({vertexShader:t.vert,fragmentShader:t.frag,uniforms:{uScreenRes:{value:[this.sceneVars.width,this.sceneVars.height]},uAspectRatio:{value:this.sceneVars.aspectRatio},uTime:{value:0},uColor:{value:new lt(this.config.color.value)}},depthTest:!1,depthWrite:!1}),this.mesh=new Nt(e,this.material),this.mesh.renderOrder=-1,this.parent.add(this.mesh),this.isActive=!0}addEventListeners(){}removeEventListeners(){}handleResize(){this.material.uniforms.uScreenRes.value=[this.sceneVars.width,this.sceneVars.height],this.material.uniforms.uAspectRatio.value=this.sceneVars.aspectRatio}handleAssetsLoad(){}update(e,t){this.isActive&&(this.material.uniforms.uTime.value=e*.001,je.isActive&&(this.material.uniforms.uColor.value=new lt(this.config.color.value)))}}var oL="2.0.4",Xd=500,X_="user-agent",_a="",q_="?",pu="function",fr="undefined",va="object",qd="string",Tn="browser",ws="cpu",Ki="device",Pi="engine",_i="os",ta="result",ye="name",me="type",Se="vendor",Me="version",An="architecture",Ol="major",_e="model",tl="console",Je="mobile",St="tablet",qt="smarttv",Gi="wearable",Ac="xr",nl="embedded",Va="inapp",am="brands",jr="formFactors",lm="fullVersionList",na="platform",cm="platformVersion",$u="bitness",Ar="sec-ch-ua",aL=Ar+"-full-version-list",lL=Ar+"-arch",cL=Ar+"-"+$u,uL=Ar+"-form-factors",hL=Ar+"-"+Je,fL=Ar+"-"+_e,Ob=Ar+"-"+na,dL=Ob+"-version",Fb=[am,lm,Je,_e,na,cm,An,jr,$u],Cc="Amazon",Lo="Apple",$_="ASUS",Y_="BlackBerry",Hr="Google",j_="Huawei",cf="Lenovo",K_="Honor",Rc="LG",uf="Microsoft",hf="Motorola",ff="Nvidia",Z_="OnePlus",df="OPPO",Ga="Samsung",Q_="Sharp",Wa="Sony",pf="Xiaomi",mf="Zebra",J_="Chrome",ev="Chromium",Js="Chromecast",jc="Edge",Xa="Firefox",qa="Opera",gf="Facebook",tv="Sogou",Io="Mobile ",$a=" Browser",$d="Windows",pL=typeof window!==fr,Cn=pL&&window.navigator?window.navigator:void 0,lr=Cn&&Cn.userAgentData?Cn.userAgentData:void 0,mL=function(n,e){var t={},i=e;if(!mu(e)){i={};for(var s in e)for(var r in e[s])i[r]=e[s][r].concat(i[r]?i[r]:[])}for(var o in n)t[o]=i[o]&&i[o].length%2===0?i[o].concat(n[o]):n[o];return t},Yu=function(n){for(var e={},t=0;t<n.length;t++)e[n[t].toUpperCase()]=n[t];return e},Yd=function(n,e){if(typeof n===va&&n.length>0){for(var t in n)if(Ps(e)==Ps(n[t]))return!0;return!1}return Ta(n)?Ps(e)==Ps(n):!1},mu=function(n,e){for(var t in n)return/^(browser|cpu|device|engine|os)$/.test(t)||(e?mu(n[t]):!1)},Ta=function(n){return typeof n===qd},_f=function(n){if(n){for(var e=[],t=xa(/\\?\"/g,n).split(","),i=0;i<t.length;i++)if(t[i].indexOf(";")>-1){var s=gu(t[i]).split(";v=");e[i]={brand:s[0],version:s[1]}}else e[i]=gu(t[i]);return e}},Ps=function(n){return Ta(n)?n.toLowerCase():n},vf=function(n){return Ta(n)?xa(/[^\d\.]/g,n).split(".")[0]:void 0},Ds=function(n){for(var e in n){var t=n[e];typeof t==va&&t.length==2?this[t[0]]=t[1]:this[t]=void 0}return this},xa=function(n,e){return Ta(e)?e.replace(n,_a):e},Ya=function(n){return xa(/\\?\"/g,n)},gu=function(n,e){if(Ta(n))return n=xa(/^\s\s*/,n),typeof e===fr?n:n.substring(0,Xd)},xf=function(n,e){if(!(!n||!e))for(var t=0,i,s,r,o,a,l;t<e.length&&!a;){var c=e[t],u=e[t+1];for(i=s=0;i<c.length&&!a&&c[i];)if(a=c[i++].exec(n),a)for(r=0;r<u.length;r++)l=a[++s],o=u[r],typeof o===va&&o.length>0?o.length===2?typeof o[1]==pu?this[o[0]]=o[1].call(this,l):this[o[0]]=o[1]:o.length>=3&&(typeof o[1]===pu&&!(o[1].exec&&o[1].test)?o.length>3?this[o[0]]=l?o[1].apply(this,o.slice(2)):void 0:this[o[0]]=l?o[1].call(this,l,o[2]):void 0:o.length==3?this[o[0]]=l?l.replace(o[1],o[2]):void 0:o.length==4?this[o[0]]=l?o[3].call(this,l.replace(o[1],o[2])):void 0:o.length>4&&(this[o[0]]=l?o[3].apply(this,[l.replace(o[1],o[2])].concat(o.slice(4))):void 0)):this[o]=l||void 0;t+=2}},$i=function(n,e){for(var t in e)if(typeof e[t]===va&&e[t].length>0){for(var i=0;i<e[t].length;i++)if(Yd(e[t][i],n))return t===q_?void 0:t}else if(Yd(e[t],n))return t===q_?void 0:t;return e.hasOwnProperty("*")?e["*"]:n},nv={ME:"4.90","NT 3.51":"3.51","NT 4.0":"4.0",2e3:["5.0","5.01"],XP:["5.1","5.2"],Vista:"6.0",7:"6.1",8:"6.2","8.1":"6.3",10:["6.4","10.0"],NT:""},iv={embedded:"Automotive",mobile:"Mobile",tablet:["Tablet","EInk"],smarttv:"TV",wearable:"Watch",xr:["VR","XR"],"?":["Desktop","Unknown"],"*":void 0},gL={Chrome:"Google Chrome",Edge:"Microsoft Edge","Edge WebView2":"Microsoft Edge WebView2","Chrome WebView":"Android WebView","Chrome Headless":"HeadlessChrome","Huawei Browser":"HuaweiBrowser","MIUI Browser":"Miui Browser","Opera Mobi":"OperaMobile",Yandex:"YaBrowser"},sv={browser:[[/\b(?:crmo|crios)\/([\w\.]+)/i],[Me,[ye,Io+"Chrome"]],[/webview.+edge\/([\w\.]+)/i],[Me,[ye,jc+" WebView"]],[/edg(?:e|ios|a)?\/([\w\.]+)/i],[Me,[ye,"Edge"]],[/(opera mini)\/([-\w\.]+)/i,/(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,/(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i],[ye,Me],[/opios[\/ ]+([\w\.]+)/i],[Me,[ye,qa+" Mini"]],[/\bop(?:rg)?x\/([\w\.]+)/i],[Me,[ye,qa+" GX"]],[/\bopr\/([\w\.]+)/i],[Me,[ye,qa]],[/\bb[ai]*d(?:uhd|[ub]*[aekoprswx]{5,6})[\/ ]?([\w\.]+)/i],[Me,[ye,"Baidu"]],[/\b(?:mxbrowser|mxios|myie2)\/?([-\w\.]*)\b/i],[Me,[ye,"Maxthon"]],[/(kindle)\/([\w\.]+)/i,/(lunascape|maxthon|netfront|jasmine|blazer|sleipnir)[\/ ]?([\w\.]*)/i,/(avant|iemobile|slim(?:browser|boat|jet))[\/ ]?([\d\.]*)/i,/(?:ms|\()(ie) ([\w\.]+)/i,/(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|duckduckgo|klar|helio|(?=comodo_)?dragon|otter|dooble|(?:lg |qute)browser)\/([-\w\.]+)/i,/(heytap|ovi|115|surf)browser\/([\d\.]+)/i,/(ecosia|weibo)(?:__| \w+@)([\d\.]+)/i],[ye,Me],[/quark(?:pc)?\/([-\w\.]+)/i],[Me,[ye,"Quark"]],[/\bddg\/([\w\.]+)/i],[Me,[ye,"DuckDuckGo"]],[/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],[Me,[ye,"UCBrowser"]],[/microm.+\bqbcore\/([\w\.]+)/i,/\bqbcore\/([\w\.]+).+microm/i,/micromessenger\/([\w\.]+)/i],[Me,[ye,"WeChat"]],[/konqueror\/([\w\.]+)/i],[Me,[ye,"Konqueror"]],[/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],[Me,[ye,"IE"]],[/ya(?:search)?browser\/([\w\.]+)/i],[Me,[ye,"Yandex"]],[/slbrowser\/([\w\.]+)/i],[Me,[ye,"Smart "+cf+$a]],[/(avast|avg)\/([\w\.]+)/i],[[ye,/(.+)/,"$1 Secure"+$a],Me],[/\bfocus\/([\w\.]+)/i],[Me,[ye,Xa+" Focus"]],[/\bopt\/([\w\.]+)/i],[Me,[ye,qa+" Touch"]],[/coc_coc\w+\/([\w\.]+)/i],[Me,[ye,"Coc Coc"]],[/dolfin\/([\w\.]+)/i],[Me,[ye,"Dolphin"]],[/coast\/([\w\.]+)/i],[Me,[ye,qa+" Coast"]],[/miuibrowser\/([\w\.]+)/i],[Me,[ye,"MIUI"+$a]],[/fxios\/([\w\.-]+)/i],[Me,[ye,Io+Xa]],[/\bqihoobrowser\/?([\w\.]*)/i],[Me,[ye,"360"]],[/\b(qq)\/([\w\.]+)/i],[[ye,/(.+)/,"$1Browser"],Me],[/(oculus|sailfish|huawei|vivo|pico)browser\/([\w\.]+)/i],[[ye,/(.+)/,"$1"+$a],Me],[/samsungbrowser\/([\w\.]+)/i],[Me,[ye,Ga+" Internet"]],[/metasr[\/ ]?([\d\.]+)/i],[Me,[ye,tv+" Explorer"]],[/(sogou)mo\w+\/([\d\.]+)/i],[[ye,tv+" Mobile"],Me],[/(electron)\/([\w\.]+) safari/i,/(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,/m?(qqbrowser|2345(?=browser|chrome|explorer))\w*[\/ ]?v?([\w\.]+)/i],[ye,Me],[/(lbbrowser|rekonq)/i],[ye],[/ome\/([\w\.]+) \w* ?(iron) saf/i,/ome\/([\w\.]+).+qihu (360)[es]e/i],[Me,ye],[/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],[[ye,gf],Me,[me,Va]],[/(kakao(?:talk|story))[\/ ]([\w\.]+)/i,/(naver)\(.*?(\d+\.[\w\.]+).*\)/i,/(daum)apps[\/ ]([\w\.]+)/i,/safari (line)\/([\w\.]+)/i,/\b(line)\/([\w\.]+)\/iab/i,/(alipay)client\/([\w\.]+)/i,/(twitter)(?:and| f.+e\/([\w\.]+))/i,/(instagram|snapchat|klarna)[\/ ]([-\w\.]+)/i],[ye,Me,[me,Va]],[/\bgsa\/([\w\.]+) .*safari\//i],[Me,[ye,"GSA"],[me,Va]],[/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i],[Me,[ye,"TikTok"],[me,Va]],[/\[(linkedin)app\]/i],[ye,[me,Va]],[/(chromium)[\/ ]([-\w\.]+)/i],[ye,Me],[/headlesschrome(?:\/([\w\.]+)| )/i],[Me,[ye,J_+" Headless"]],[/wv\).+chrome\/([\w\.]+).+edgw\//i],[Me,[ye,jc+" WebView2"]],[/ wv\).+(chrome)\/([\w\.]+)/i],[[ye,J_+" WebView"],Me],[/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],[Me,[ye,"Android"+$a]],[/chrome\/([\w\.]+) mobile/i],[Me,[ye,Io+"Chrome"]],[/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],[ye,Me],[/version\/([\w\.\,]+) .*mobile(?:\/\w+ | ?)safari/i],[Me,[ye,Io+"Safari"]],[/iphone .*mobile(?:\/\w+ | ?)safari/i],[[ye,Io+"Safari"]],[/version\/([\w\.\,]+) .*(safari)/i],[Me,ye],[/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],[ye,[Me,"1"]],[/(webkit|khtml)\/([\w\.]+)/i],[ye,Me],[/(?:mobile|tablet);.*(firefox)\/([\w\.-]+)/i],[[ye,Io+Xa],Me],[/(navigator|netscape\d?)\/([-\w\.]+)/i],[[ye,"Netscape"],Me],[/(wolvic|librewolf)\/([\w\.]+)/i],[ye,Me],[/mobile vr; rv:([\w\.]+)\).+firefox/i],[Me,[ye,Xa+" Reality"]],[/ekiohf.+(flow)\/([\w\.]+)/i,/(swiftfox)/i,/(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror)[\/ ]?([\w\.\+]+)/i,/(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,/(firefox)\/([\w\.]+)/i,/(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,/(amaya|dillo|doris|icab|ladybird|lynx|mosaic|netsurf|obigo|polaris|w3m|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,/\b(links) \(([\w\.]+)/i],[ye,[Me,/_/g,"."]],[/(cobalt)\/([\w\.]+)/i],[ye,[Me,/[^\d\.]+./,_a]]],cpu:[[/\b((amd|x|x86[-_]?|wow|win)64)\b/i],[[An,"amd64"]],[/(ia32(?=;))/i,/\b((i[346]|x)86)(pc)?\b/i],[[An,"ia32"]],[/\b(aarch64|arm(v?[89]e?l?|_?64))\b/i],[[An,"arm64"]],[/\b(arm(v[67])?ht?n?[fl]p?)\b/i],[[An,"armhf"]],[/( (ce|mobile); ppc;|\/[\w\.]+arm\b)/i],[[An,"arm"]],[/((ppc|powerpc)(64)?)( mac|;|\))/i],[[An,/ower/,_a,Ps]],[/ sun4\w[;\)]/i],[[An,"sparc"]],[/\b(avr32|ia64(?=;)|68k(?=\))|\barm(?=v([1-7]|[5-7]1)l?|;|eabi)|(irix|mips|sparc)(64)?\b|pa-risc)/i],[[An,Ps]]],device:[[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i],[_e,[Se,Ga],[me,St]],[/\b((?:s[cgp]h|gt|sm)-(?![lr])\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,/samsung[- ]((?!sm-[lr]|browser)[-\w]+)/i,/sec-(sgh\w+)/i],[_e,[Se,Ga],[me,Je]],[/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i],[_e,[Se,Lo],[me,Je]],[/\((ipad);[-\w\),; ]+apple/i,/applecoremedia\/[\w\.]+ \((ipad)/i,/\b(ipad)\d\d?,\d\d?[;\]].+ios/i],[_e,[Se,Lo],[me,St]],[/(macintosh);/i],[_e,[Se,Lo]],[/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],[_e,[Se,Q_],[me,Je]],[/\b((?:brt|eln|hey2?|gdi|jdn)-a?[lnw]09|(?:ag[rm]3?|jdn2|kob2)-a?[lw]0[09]hn)(?: bui|\)|;)/i],[_e,[Se,K_],[me,St]],[/honor([-\w ]+)[;\)]/i],[_e,[Se,K_],[me,Je]],[/\b((?:ag[rs][2356]?k?|bah[234]?|bg[2o]|bt[kv]|cmr|cpn|db[ry]2?|jdn2|got|kob2?k?|mon|pce|scm|sht?|[tw]gr|vrd)-[ad]?[lw][0125][09]b?|605hw|bg2-u03|(?:gem|fdr|m2|ple|t1)-[7a]0[1-4][lu]|t1-a2[13][lw]|mediapad[\w\. ]*(?= bui|\)))\b(?!.+d\/s)/i],[_e,[Se,j_],[me,St]],[/(?:huawei)([-\w ]+)[;\)]/i,/\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i],[_e,[Se,j_],[me,Je]],[/oid[^\)]+; (2[\dbc]{4}(182|283|rp\w{2})[cgl]|m2105k81a?c)(?: bui|\))/i,/\b((?:red)?mi[-_ ]?pad[\w- ]*)(?: bui|\))/i],[[_e,/_/g," "],[Se,pf],[me,St]],[/\b(poco[\w ]+|m2\d{3}j\d\d[a-z]{2})(?: bui|\))/i,/\b; (\w+) build\/hm\1/i,/\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,/\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,/oid[^\)]+; (m?[12][0-389][01]\w{3,6}[c-y])( bui|; wv|\))/i,/\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite|pro)?)(?: bui|\))/i,/ ([\w ]+) miui\/v?\d/i],[[_e,/_/g," "],[Se,pf],[me,Je]],[/droid.+; (cph2[3-6]\d[13579]|((gm|hd)19|(ac|be|in|kb)20|(d[en]|eb|le|mt)21|ne22)[0-2]\d|p[g-k]\w[1m]10)\b/i,/(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i],[_e,[Se,Z_],[me,Je]],[/; (\w+) bui.+ oppo/i,/\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i],[_e,[Se,df],[me,Je]],[/\b(opd2(\d{3}a?))(?: bui|\))/i],[_e,[Se,$i,{OnePlus:["203","304","403","404","413","415"],"*":df}],[me,St]],[/(vivo (5r?|6|8l?|go|one|s|x[il]?[2-4]?)[\w\+ ]*)(?: bui|\))/i],[_e,[Se,"BLU"],[me,Je]],[/; vivo (\w+)(?: bui|\))/i,/\b(v[12]\d{3}\w?[at])(?: bui|;)/i],[_e,[Se,"Vivo"],[me,Je]],[/\b(rmx[1-3]\d{3})(?: bui|;|\))/i],[_e,[Se,"Realme"],[me,Je]],[/(ideatab[-\w ]+|602lv|d-42a|a101lv|a2109a|a3500-hv|s[56]000|pb-6505[my]|tb-?x?\d{3,4}(?:f[cu]|xu|[av])|yt\d?-[jx]?\d+[lfmx])( bui|;|\)|\/)/i,/lenovo ?(b[68]0[08]0-?[hf]?|tab(?:[\w- ]+?)|tb[\w-]{6,7})( bui|;|\)|\/)/i],[_e,[Se,cf],[me,St]],[/lenovo[-_ ]?([-\w ]+?)(?: bui|\)|\/)/i],[_e,[Se,cf],[me,Je]],[/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,/\bmot(?:orola)?[- ]([\w\s]+)(\)| bui)/i,/((?:moto(?! 360)[-\w\(\) ]+|xt\d{3,4}[cgkosw\+]?[-\d]*|nexus 6)(?= bui|\)))/i],[_e,[Se,hf],[me,Je]],[/\b(mz60\d|xoom[2 ]{0,2}) build\//i],[_e,[Se,hf],[me,St]],[/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i],[_e,[Se,Rc],[me,St]],[/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,/\blg[-e;\/ ]+(?!.*(?:browser|netcast|android tv|watch|webos))(\w+)/i,/\blg-?([\d\w]+) bui/i],[_e,[Se,Rc],[me,Je]],[/(nokia) (t[12][01])/i],[Se,_e,[me,St]],[/(?:maemo|nokia).*(n900|lumia \d+|rm-\d+)/i,/nokia[-_ ]?(([-\w\. ]*))/i],[[_e,/_/g," "],[me,Je],[Se,"Nokia"]],[/(pixel (c|tablet))\b/i],[_e,[Se,Hr],[me,St]],[/droid.+;(?: google)? (g(01[13]a|020[aem]|025[jn]|1b60|1f8f|2ybb|4s1m|576d|5nz6|8hhn|8vou|a02099|c15s|d1yq|e2ae|ec77|gh2x|kv4x|p4bc|pj41|r83y|tt9q|ur25|wvk6)|pixel[\d ]*a?( pro)?( xl)?( fold)?( \(5g\))?)( bui|\))/i],[_e,[Se,Hr],[me,Je]],[/(google) (pixelbook( go)?)/i],[Se,_e],[/droid.+; (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-\w\w\d\d)(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i],[_e,[Se,Wa],[me,Je]],[/sony tablet [ps]/i,/\b(?:sony)?sgp\w+(?: bui|\))/i],[[_e,"Xperia Tablet"],[Se,Wa],[me,St]],[/(alexa)webm/i,/(kf[a-z]{2}wi|aeo(?!bc)\w\w)( bui|\))/i,/(kf[a-z]+)( bui|\)).+silk\//i],[_e,[Se,Cc],[me,St]],[/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],[[_e,/(.+)/g,"Fire Phone $1"],[Se,Cc],[me,Je]],[/(playbook);[-\w\),; ]+(rim)/i],[_e,Se,[me,St]],[/\b((?:bb[a-f]|st[hv])100-\d)/i,/\(bb10; (\w+)/i],[_e,[Se,Y_],[me,Je]],[/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i],[_e,[Se,$_],[me,St]],[/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],[_e,[Se,$_],[me,Je]],[/(nexus 9)/i],[_e,[Se,"HTC"],[me,St]],[/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,/(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,/(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i],[Se,[_e,/_/g," "],[me,Je]],[/tcl (xess p17aa)/i,/droid [\w\.]+; ((?:8[14]9[16]|9(?:0(?:48|60|8[01])|1(?:3[27]|66)|2(?:6[69]|9[56])|466))[gqswx])(_\w(\w|\w\w))?(\)| bui)/i],[_e,[Se,"TCL"],[me,St]],[/droid [\w\.]+; (418(?:7d|8v)|5087z|5102l|61(?:02[dh]|25[adfh]|27[ai]|56[dh]|59k|65[ah])|a509dl|t(?:43(?:0w|1[adepqu])|50(?:6d|7[adju])|6(?:09dl|10k|12b|71[efho]|76[hjk])|7(?:66[ahju]|67[hw]|7[045][bh]|71[hk]|73o|76[ho]|79w|81[hks]?|82h|90[bhsy]|99b)|810[hs]))(_\w(\w|\w\w))?(\)| bui)/i],[_e,[Se,"TCL"],[me,Je]],[/(itel) ((\w+))/i],[[Se,Ps],_e,[me,$i,{tablet:["p10001l","w7001"],"*":"mobile"}]],[/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],[_e,[Se,"Acer"],[me,St]],[/droid.+; (m[1-5] note) bui/i,/\bmz-([-\w]{2,})/i],[_e,[Se,"Meizu"],[me,Je]],[/; ((?:power )?armor(?:[\w ]{0,8}))(?: bui|\))/i],[_e,[Se,"Ulefone"],[me,Je]],[/; (energy ?\w+)(?: bui|\))/i,/; energizer ([\w ]+)(?: bui|\))/i],[_e,[Se,"Energizer"],[me,Je]],[/; cat (b35);/i,/; (b15q?|s22 flip|s48c|s62 pro)(?: bui|\))/i],[_e,[Se,"Cat"],[me,Je]],[/((?:new )?andromax[\w- ]+)(?: bui|\))/i],[_e,[Se,"Smartfren"],[me,Je]],[/droid.+; (a(in)?(0(15|59|6[35])|142)p?)/i],[_e,[Se,"Nothing"],[me,Je]],[/; (x67 5g|tikeasy \w+|ac[1789]\d\w+)( b|\))/i,/archos ?(5|gamepad2?|([\w ]*[t1789]|hello) ?\d+[\w ]*)( b|\))/i],[_e,[Se,"Archos"],[me,St]],[/archos ([\w ]+)( b|\))/i,/; (ac[3-6]\d\w{2,8})( b|\))/i],[_e,[Se,"Archos"],[me,Je]],[/; (n159v)/i],[_e,[Se,"HMD"],[me,Je]],[/(imo) (tab \w+)/i,/(infinix|tecno) (x1101b?|p904|dp(7c|8d|10a)( pro)?|p70[1-3]a?|p904|t1101)/i],[Se,_e,[me,St]],[/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus(?! zenw)|dell|jolla|meizu|motorola|polytron|tecno|micromax|advan)[-_ ]?([-\w]*)/i,/; (blu|hmd|imo|infinix|lava|oneplus|tcl)[_ ]([\w\+ ]+?)(?: bui|\)|; r)/i,/(hp) ([\w ]+\w)/i,/(microsoft); (lumia[\w ]+)/i,/(oppo) ?([\w ]+) bui/i],[Se,_e,[me,Je]],[/(kobo)\s(ereader|touch)/i,/(hp).+(touchpad(?!.+tablet)|tablet)/i,/(kindle)\/([\w\.]+)/i],[Se,_e,[me,St]],[/(surface duo)/i],[_e,[Se,uf],[me,St]],[/droid [\d\.]+; (fp\du?)(?: b|\))/i],[_e,[Se,"Fairphone"],[me,Je]],[/((?:tegranote|shield t(?!.+d tv))[\w- ]*?)(?: b|\))/i],[_e,[Se,ff],[me,St]],[/(sprint) (\w+)/i],[Se,_e,[me,Je]],[/(kin\.[onetw]{3})/i],[[_e,/\./g," "],[Se,uf],[me,Je]],[/droid.+; ([c6]+|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],[_e,[Se,mf],[me,St]],[/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],[_e,[Se,mf],[me,Je]],[/smart-tv.+(samsung)/i],[Se,[me,qt]],[/hbbtv.+maple;(\d+)/i],[[_e,/^/,"SmartTV"],[Se,Ga],[me,qt]],[/(vizio)(?: |.+model\/)(\w+-\w+)/i,/tcast.+(lg)e?. ([-\w]+)/i],[Se,_e,[me,qt]],[/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],[[Se,Rc],[me,qt]],[/(apple) ?tv/i],[Se,[_e,Lo+" TV"],[me,qt]],[/crkey.*devicetype\/chromecast/i],[[_e,Js+" Third Generation"],[Se,Hr],[me,qt]],[/crkey.*devicetype\/([^/]*)/i],[[_e,/^/,"Chromecast "],[Se,Hr],[me,qt]],[/fuchsia.*crkey/i],[[_e,Js+" Nest Hub"],[Se,Hr],[me,qt]],[/crkey/i],[[_e,Js],[Se,Hr],[me,qt]],[/(portaltv)/i],[_e,[Se,gf],[me,qt]],[/droid.+aft(\w+)( bui|\))/i],[_e,[Se,Cc],[me,qt]],[/(shield \w+ tv)/i],[_e,[Se,ff],[me,qt]],[/\(dtv[\);].+(aquos)/i,/(aquos-tv[\w ]+)\)/i],[_e,[Se,Q_],[me,qt]],[/(bravia[\w ]+)( bui|\))/i],[_e,[Se,Wa],[me,qt]],[/(mi(tv|box)-?\w+) bui/i],[_e,[Se,pf],[me,qt]],[/Hbbtv.*(technisat) (.*);/i],[Se,_e,[me,qt]],[/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,/hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i],[[Se,/.+\/(\w+)/,"$1",$i,{LG:"lge"}],[_e,gu],[me,qt]],[/droid.+; ([\w- ]+) (?:android tv|smart[- ]?tv)/i],[_e,[me,qt]],[/\b(android tv|smart[- ]?tv|opera tv|tv; rv:|large screen[\w ]+safari)\b/i],[[me,qt]],[/(playstation \w+)/i],[_e,[Se,Wa],[me,tl]],[/\b(xbox(?: one)?(?!; xbox))[\); ]/i],[_e,[Se,uf],[me,tl]],[/(ouya)/i,/(nintendo) (\w+)/i,/(retroid) (pocket ([^\)]+))/i],[Se,_e,[me,tl]],[/droid.+; (shield)( bui|\))/i],[_e,[Se,ff],[me,tl]],[/\b(sm-[lr]\d\d[0156][fnuw]?s?|gear live)\b/i],[_e,[Se,Ga],[me,Gi]],[/((pebble))app/i,/(asus|google|lg|oppo) ((pixel |zen)?watch[\w ]*)( bui|\))/i],[Se,_e,[me,Gi]],[/(ow(?:19|20)?we?[1-3]{1,3})/i],[_e,[Se,df],[me,Gi]],[/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i],[_e,[Se,Lo],[me,Gi]],[/(opwwe\d{3})/i],[_e,[Se,Z_],[me,Gi]],[/(moto 360)/i],[_e,[Se,hf],[me,Gi]],[/(smartwatch 3)/i],[_e,[Se,Wa],[me,Gi]],[/(g watch r)/i],[_e,[Se,Rc],[me,Gi]],[/droid.+; (wt63?0{2,3})\)/i],[_e,[Se,mf],[me,Gi]],[/droid.+; (glass) \d/i],[_e,[Se,Hr],[me,Ac]],[/(pico) (4|neo3(?: link|pro)?)/i],[Se,_e,[me,Ac]],[/(quest( \d| pro)?s?).+vr/i],[_e,[Se,gf],[me,Ac]],[/mobile vr; rv.+firefox/i],[[me,Ac]],[/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],[Se,[me,nl]],[/(aeobc)\b/i],[_e,[Se,Cc],[me,nl]],[/(homepod).+mac os/i],[_e,[Se,Lo],[me,nl]],[/windows iot/i],[[me,nl]],[/droid .+?; ([^;]+?)(?: bui|; wv\)|\) applew).+?(mobile|vr|\d) safari/i],[_e,[me,$i,{mobile:"Mobile",xr:"VR","*":St}]],[/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],[[me,St]],[/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i],[[me,Je]],[/droid .+?; ([\w\. -]+)( bui|\))/i],[_e,[Se,"Generic"]]],engine:[[/windows.+ edge\/([\w\.]+)/i],[Me,[ye,jc+"HTML"]],[/(arkweb)\/([\w\.]+)/i],[ye,Me],[/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],[Me,[ye,"Blink"]],[/(presto)\/([\w\.]+)/i,/(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna|servo)\/([\w\.]+)/i,/ekioh(flow)\/([\w\.]+)/i,/(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,/(icab)[\/ ]([23]\.[\d\.]+)/i,/\b(libweb)/i],[ye,Me],[/ladybird\//i],[[ye,"LibWeb"]],[/rv\:([\w\.]{1,9})\b.+(gecko)/i],[Me,ye]],os:[[/(windows nt) (6\.[23]); arm/i],[[ye,/N/,"R"],[Me,$i,nv]],[/(windows (?:phone|mobile|iot))(?: os)?[\/ ]?([\d\.]*( se)?)/i,/(windows)[\/ ](1[01]|2000|3\.1|7|8(\.1)?|9[58]|me|server 20\d\d( r2)?|vista|xp)/i],[ye,Me],[/windows nt ?([\d\.\)]*)(?!.+xbox)/i,/\bwin(?=3| ?9|n)(?:nt| 9x )?([\d\.;]*)/i],[[Me,/(;|\))/g,"",$i,nv],[ye,$d]],[/(windows ce)\/?([\d\.]*)/i],[ye,Me],[/[adehimnop]{4,7}\b(?:.*os ([\w]+) like mac|; opera)/i,/(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i,/cfnetwork\/.+darwin/i],[[Me,/_/g,"."],[ye,"iOS"]],[/(mac os x) ?([\w\. ]*)/i,/(macintosh|mac_powerpc\b)(?!.+(haiku|morphos))/i],[[ye,"macOS"],[Me,/_/g,"."]],[/android ([\d\.]+).*crkey/i],[Me,[ye,Js+" Android"]],[/fuchsia.*crkey\/([\d\.]+)/i],[Me,[ye,Js+" Fuchsia"]],[/crkey\/([\d\.]+).*devicetype\/smartspeaker/i],[Me,[ye,Js+" SmartSpeaker"]],[/linux.*crkey\/([\d\.]+)/i],[Me,[ye,Js+" Linux"]],[/crkey\/([\d\.]+)/i],[Me,[ye,Js]],[/droid ([\w\.]+)\b.+(android[- ]x86)/i],[Me,ye],[/(ubuntu) ([\w\.]+) like android/i],[[ye,/(.+)/,"$1 Touch"],Me],[/(harmonyos)[\/ ]?([\d\.]*)/i,/(android|bada|blackberry|kaios|maemo|meego|openharmony|qnx|rim tablet os|sailfish|series40|symbian|tizen)\w*[-\/\.; ]?([\d\.]*)/i],[ye,Me],[/\(bb(10);/i],[Me,[ye,Y_]],[/(?:symbian ?os|symbos|s60(?=;)|series ?60)[-\/ ]?([\w\.]*)/i],[Me,[ye,"Symbian"]],[/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i],[Me,[ye,Xa+" OS"]],[/\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i,/webos(?:[ \/]?|\.tv-20(?=2[2-9]))(\d[\d\.]*)/i],[Me,[ye,"webOS"]],[/web0s;.+?(?:chr[o0]me|safari)\/(\d+)/i],[[Me,$i,{25:"120",24:"108",23:"94",22:"87",6:"79",5:"68",4:"53",3:"38",2:"538",1:"537","*":"TV"}],[ye,"webOS"]],[/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i],[Me,[ye,"watchOS"]],[/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i],[[ye,"Chrome OS"],Me],[/panasonic;(viera)/i,/(netrange)mmh/i,/(nettv)\/(\d+\.[\w\.]+)/i,/(nintendo|playstation) (\w+)/i,/(xbox); +xbox ([^\);]+)/i,/(pico) .+os([\w\.]+)/i,/\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,/linux.+(mint)[\/\(\) ]?([\w\.]*)/i,/(mageia|vectorlinux|fuchsia|arcaos|arch(?= ?linux))[;l ]([\d\.]*)/i,/([kxln]?ubuntu|debian|suse|opensuse|gentoo|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire|knoppix)(?: gnu[\/ ]linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,/((?:open)?solaris)[-\/ ]?([\w\.]*)/i,/\b(aix)[; ]([1-9\.]{0,4})/i,/(hurd|linux|morphos)(?: (?:arm|x86|ppc)\w*| ?)([\w\.]*)/i,/(gnu) ?([\w\.]*)/i,/\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,/(haiku) ?(r\d)?/i],[ye,Me],[/(sunos) ?([\d\.]*)/i],[[ye,"Solaris"],Me],[/\b(beos|os\/2|amigaos|openvms|hp-ux|serenityos)/i,/(unix) ?([\w\.]*)/i],[ye,Me]]},Pc=function(){var n={init:{},isIgnore:{},isIgnoreRgx:{},toString:{}};return Ds.call(n.init,[[Tn,[ye,Me,Ol,me]],[ws,[An]],[Ki,[me,_e,Se]],[Pi,[ye,Me]],[_i,[ye,Me]]]),Ds.call(n.isIgnore,[[Tn,[Me,Ol]],[Pi,[Me]],[_i,[Me]]]),Ds.call(n.isIgnoreRgx,[[Tn,/ ?browser$/i],[_i,/ ?os$/i]]),Ds.call(n.toString,[[Tn,[ye,Me]],[ws,[An]],[Ki,[Se,_e]],[Pi,[ye,Me]],[_i,[ye,Me]]]),n}(),_L=function(n,e){var t=Pc.init[e],i=Pc.isIgnore[e]||0,s=Pc.isIgnoreRgx[e]||0,r=Pc.toString[e]||0;function o(){Ds.call(this,t)}return o.prototype.getItem=function(){return n},o.prototype.withClientHints=function(){return lr?lr.getHighEntropyValues(Fb).then(function(a){return n.setCH(new Nb(a,!1)).parseCH().get()}):n.parseCH().get()},o.prototype.withFeatureCheck=function(){return n.detectFeature().get()},e!=ta&&(o.prototype.is=function(a){var l=!1;for(var c in this)if(this.hasOwnProperty(c)&&!Yd(i,c)&&Ps(s?xa(s,this[c]):this[c])==Ps(s?xa(s,a):a)){if(l=!0,a!=fr)break}else if(a==fr&&l){l=!l;break}return l},o.prototype.toString=function(){var a=_a;for(var l in r)typeof this[r[l]]!==fr&&(a+=(a?" ":_a)+this[r[l]]);return a||fr}),lr||(o.prototype.then=function(a){var l=this,c=function(){for(var h in l)l.hasOwnProperty(h)&&(this[h]=l[h])};c.prototype={is:o.prototype.is,toString:o.prototype.toString};var u=new c;return a(u),u}),new o};function Nb(n,e){if(n=n||{},Ds.call(this,Fb),e)Ds.call(this,[[am,_f(n[Ar])],[lm,_f(n[aL])],[Je,/\?1/.test(n[hL])],[_e,Ya(n[fL])],[na,Ya(n[Ob])],[cm,Ya(n[dL])],[An,Ya(n[lL])],[jr,_f(n[uL])],[$u,Ya(n[cL])]]);else for(var t in n)this.hasOwnProperty(t)&&typeof n[t]!==fr&&(this[t]=n[t])}function rv(n,e,t,i){return this.get=function(s){return s?this.data.hasOwnProperty(s)?this.data[s]:void 0:this.data},this.set=function(s,r){return this.data[s]=r,this},this.setCH=function(s){return this.uaCH=s,this},this.detectFeature=function(){if(Cn&&Cn.userAgent==this.ua)switch(this.itemType){case Tn:Cn.brave&&typeof Cn.brave.isBrave==pu&&this.set(ye,"Brave");break;case Ki:!this.get(me)&&lr&&lr[Je]&&this.set(me,Je),this.get(_e)=="Macintosh"&&Cn&&typeof Cn.standalone!==fr&&Cn.maxTouchPoints&&Cn.maxTouchPoints>2&&this.set(_e,"iPad").set(me,St);break;case _i:!this.get(ye)&&lr&&lr[na]&&this.set(ye,lr[na]);break;case ta:var s=this.data,r=function(o){return s[o].getItem().detectFeature().get()};this.set(Tn,r(Tn)).set(ws,r(ws)).set(Ki,r(Ki)).set(Pi,r(Pi)).set(_i,r(_i))}return this},this.parseUA=function(){return this.itemType!=ta&&xf.call(this.data,this.ua,this.rgxMap),this.itemType==Tn&&this.set(Ol,vf(this.get(Me))),this},this.parseCH=function(){var s=this.uaCH,r=this.rgxMap;switch(this.itemType){case Tn:case Pi:var o=s[lm]||s[am],a;if(o)for(var l in o){var c=o[l].brand||o[l],u=o[l].version;this.itemType==Tn&&!/not.a.brand/i.test(c)&&(!a||/Chrom/.test(a)&&c!=ev||a==jc&&/WebView2/.test(c))&&(c=$i(c,gL),a=this.get(ye),a&&!/Chrom/.test(a)&&/Chrom/.test(c)||this.set(ye,c).set(Me,u).set(Ol,vf(u)),a=c),this.itemType==Pi&&c==ev&&this.set(Me,u)}break;case ws:var h=s[An];h&&(h&&s[$u]=="64"&&(h+="64"),xf.call(this.data,h+";",r));break;case Ki:if(s[Je]&&this.set(me,Je),s[_e]&&(this.set(_e,s[_e]),!this.get(me)||!this.get(Se))){var f={};xf.call(f,"droid 9; "+s[_e]+")",r),!this.get(me)&&f.type&&this.set(me,f.type),!this.get(Se)&&f.vendor&&this.set(Se,f.vendor)}if(s[jr]){var d;if(typeof s[jr]!="string")for(var g=0;!d&&g<s[jr].length;)d=$i(s[jr][g++],iv);else d=$i(s[jr],iv);this.set(me,d)}break;case _i:var _=s[na];if(_){var m=s[cm];_==$d&&(m=parseInt(vf(m),10)>=13?"11":"10"),this.set(ye,_).set(Me,m)}this.get(ye)==$d&&s[_e]=="Xbox"&&this.set(ye,"Xbox").set(Me,void 0);break;case ta:var p=this.data,x=function(b){return p[b].getItem().setCH(s).parseCH().get()};this.set(Tn,x(Tn)).set(ws,x(ws)).set(Ki,x(Ki)).set(Pi,x(Pi)).set(_i,x(_i))}return this},Ds.call(this,[["itemType",n],["ua",e],["uaCH",i],["rgxMap",t],["data",_L(this,n)]]),this}function zs(n,e,t){if(typeof n===va?(mu(n,!0)?(typeof e===va&&(t=e),e=n):(t=n,e=void 0),n=void 0):typeof n===qd&&!mu(e,!0)&&(t=e,e=void 0),t&&typeof t.append===pu){var i={};t.forEach(function(l,c){i[c]=l}),t=i}if(!(this instanceof zs))return new zs(n,e,t).getResult();var s=typeof n===qd?n:t&&t[X_]?t[X_]:Cn&&Cn.userAgent?Cn.userAgent:_a,r=new Nb(t,!0),o=e?mL(sv,e):sv,a=function(l){return l==ta?function(){return new rv(l,s,o,r).set("ua",s).set(Tn,this.getBrowser()).set(ws,this.getCPU()).set(Ki,this.getDevice()).set(Pi,this.getEngine()).set(_i,this.getOS()).get()}:function(){return new rv(l,s,o[l],r).parseUA().get()}};return Ds.call(this,[["getBrowser",a(Tn)],["getCPU",a(ws)],["getDevice",a(Ki)],["getEngine",a(Pi)],["getOS",a(_i)],["getResult",a(ta)],["getUA",function(){return s}],["setUA",function(l){return Ta(l)&&(s=l.length>Xd?gu(l,Xd):l),this}]]).setUA(s),this}zs.VERSION=oL;zs.BROWSER=Yu([ye,Me,Ol,me]);zs.CPU=Yu([An]);zs.DEVICE=Yu([_e,Se,me,tl,Je,qt,St,Gi,nl]);zs.ENGINE=zs.OS=Yu([ye,Me]);class vL{constructor(){this.uaParser=new zs,this.device=this.uaParser.getDevice(),this.isMobile=this.device.type==="mobile"||window.innerWidth<768,this.isTablet=this.device.type==="tablet"&&window.innerWidth>=768,this.isDesktop=!this.isMobile&&!this.isTablet,this.isIOS=this.device.vendor==="Apple"}}const ot=new vL;class xL{constructor(){this.isActive=!1,this.isVisible=!0,this.shouldLimitFps=!0,this.rafId=null,this.maxFps=144,this.fpsInterval=1e3/this.maxFps,this.lastDate=Date.now(),this.dt=0,this.now=0,this.handlers={},this.addEventListeners()}addEventListeners(){this.bindedHandleVisibilityChange=this.handleVisibilityChange.bind(this),document.addEventListener("visibilitychange",this.bindedHandleVisibilityChange)}removeEventListeners(){document.removeEventListener("visibilitychange",this.bindedHandleVisibilityChange)}handleVisibilityChange(){this.isVisible=document.visibilityState==="visible"}subscribe(e,t){if(this.handlers[e]){console.warn(`RAF handler with id ${e} already exists`);return}this.isActive||(this.isActive=!0,this.update()),this.handlers[e]=t}unsubscribe(e){delete this.handlers[e],Object.keys(this.handlers).length===0&&(this.isActive=!1,cancelAnimationFrame(this.rafId))}update(e=0){if(window.__introTornDown){this.isActive=!1;return}this.rafId=requestAnimationFrame(this.update.bind(this)),this.isActive&&this.isVisible&&(this.now=Date.now(),this.dt=this.now-this.lastDate,!(this.shouldLimitFps&&this.dt<this.fpsInterval)&&(Object.keys(this.handlers).forEach(t=>{this.handlers[t](e,this.dt)}),this.lastDate=this.now))}}const _u=new xL,bL=(n,e)=>{let t,i=0;return(...s)=>{clearTimeout(t);const r=performance.now();r-i>e?n(...s):t=setTimeout(()=>n(...s),e),i=r}},SL=(n,e)=>{let t,i=0;return(...s)=>{const r=performance.now(),o=r-i;o>e?(i=r,n(...s)):(clearTimeout(t),t=setTimeout(()=>{i=performance.now(),n(...s)},e-o))}},Bb=SL(()=>Be.trigger("resize",{width:window.innerWidth,height:window.innerHeight}),16);window.addEventListener("resize",Bb,{passive:!0});const yL=n=>{const e=Be.on("resize",n);return Bb(),e};class ML{constructor(){this.domTarget=window,this.screenDimensions=new qe(this.domTarget.innerWidth,this.domTarget.innerHeight),this.lastTime=0,this.preventIOSGestures=!0,this.hasMoved=!1,this.isDown=!1,this.isDragging=!1,this.position=new qe(0),this.positionLast=new qe(0),this.positionLastRel=new qe(0),this.positionRel=new qe(0),this.positionRelCenter=new qe(0),this.distanceTravelled=0,this.distanceTravelledRel=0,this.dragActivationThreshold=.01,this.drag=new qe(0),this.dragFirst=new qe(0),this.dragLast=new qe(0),this.dragTotal=new qe(0),this.dragTotalRel=new qe(0),this.isEased=!0,this.easing=.075,this.positionEased=new qe(.01),this.positionEasedRel=new qe(.01),this.positionEasedRelCenter=new qe(.01),this.velocity=new qe(0),this.velocityEased=new qe(0),this.addEventListeners()}updateDomTarget(e){this.removeEventListeners(),this.domTarget=e,this.addEventListeners(),this.handleResize()}resume(){this.addEventListeners()}pause(){this.removeEventListeners(),this.isDown&&this.handleUp()}addEventListeners(){this.offResize=yL(this.handleResize.bind(this)),this.bindedMove=this.handleMove.bind(this),this.bindedDown=this.handleDown.bind(this),this.bindedUp=this.handleUp.bind(this),this.bindedTouchMove=this.handleTouchMove.bind(this),this.bindedTouchStart=this.handleTouchStart.bind(this),this.bindedTouchEnd=this.handleTouchEnd.bind(this),this.bindedIosGestureChange=this.handleIosGestureChange.bind(this),this.bindedIosGestureEnd=this.handleIosGestureEnd.bind(this),ot.isDesktop?(this.domTarget.addEventListener("mousemove",this.bindedMove,{passive:!0}),this.domTarget.addEventListener("mousedown",this.bindedDown,{passive:!0}),this.domTarget.addEventListener("mouseup",this.bindedUp,{passive:!0})):(document.addEventListener("touchmove",this.bindedTouchMove,{passive:!0}),document.addEventListener("touchstart",this.bindedTouchStart,{passive:!0}),document.addEventListener("touchend",this.bindedTouchEnd,{passive:!0}),this.preventIOSGestures&&(document.addEventListener("gesturestart",this.bindedIosGestureChange),document.addEventListener("gesturechange",this.bindedIosGestureChange),document.addEventListener("gestureend",this.bindedIosGestureEnd))),this.isEased&&_u.subscribe("mouse",this.update.bind(this))}removeEventListeners(){this.offResize(),ot.isDesktop?(this.domTarget.removeEventListener("mousemove",this.bindedMove),this.domTarget.removeEventListener("mousedown",this.bindedDown),this.domTarget.removeEventListener("mouseup",this.bindedUp)):(this.domTarget.removeEventListener("touchmove",this.bindedTouchMove),this.domTarget.removeEventListener("touchstart",this.bindedTouchStart),this.domTarget.removeEventListener("touchend",this.bindedTouchEnd)),this.preventIOSGestures&&(document.removeEventListener("gesturestart",this.bindedIosGestureChange),document.removeEventListener("gesturechange",this.bindedIosGestureChange),document.removeEventListener("gestureend",this.bindedIosGestureEnd)),this.isEased&&_u.unsubscribe("mouse")}handleResize(){this.screenDimensions.set(this.domTarget.innerWidth,this.domTarget.innerHeight)}handleMove(e){this.hasMoved||(this.hasMoved=!0),this.positionLast.copy(this.position),this.position.set(e.clientX,e.clientY),this.positionRel.set(e.clientX/this.screenDimensions.x,1-e.clientY/this.screenDimensions.y),this.positionRelCenter.set((this.positionRel.x-.5)*2,(this.positionRel.y-.5)*2),Be.trigger(Fe.MOUSE_MOVE,{position:this.position,positionRel:this.positionRel,positionRelCenter:this.positionRelCenter}),this.isDown&&(this.drag.set(this.position.x-this.dragLast.x,this.position.y-this.dragLast.y),this.dragLast.set(this.position.x,this.position.y),this.dragTotal.set(this.position.x-this.dragFirst.x,this.position.y-this.dragFirst.y),this.dragTotalRel.set(this.dragTotal.x/this.screenDimensions.x,this.dragTotal.y/this.screenDimensions.y),this.dragTotal.length()>this.dragActivationThreshold&&(this.isDragging||(this.isDragging=!0,Be.trigger(Fe.MOUSE_DRAG_START,{drag:this.drag,dragTotal:this.dragTotal,dragTotalRel:this.dragTotalRel})),Be.trigger(Fe.MOUSE_DRAG_MOVE,{drag:this.drag,dragTotal:this.dragTotal,dragTotalRel:this.dragTotalRel})))}handleTouchMove(e){const t=e.touches[0]?e.touches[0]:e;this.handleMove(t)}handleDown(e){this.isDown=!0,this.positionLast.copy(this.position),this.position.set(e.clientX,e.clientY),this.positionRel.set(e.clientX/this.screenDimensions.x,1-e.clientY/this.screenDimensions.y),this.positionRelCenter.set((this.positionRel.x-.5)*2,(this.positionRel.y-.5)*2),this.dragFirst.copy(this.position),Be.trigger(Fe.MOUSE_DOWN,{position:this.position,positionRel:this.positionRel,positionRelCenter:this.positionRelCenter})}handleTouchStart(e){const t=e.touches[0]?e.touches[0]:e;this.handleDown(t)}handleUp(e){this.isDown=!1,Be.trigger(Fe.MOUSE_UP,{position:this.position,positionRel:this.positionRel,positionRelCenter:this.positionRelCenter}),this.isDragging&&(this.isDragging=!1,this.drag.set(0,0),this.dragTotal.set(0,0),this.dragTotalRel.set(0,0),Be.trigger(Fe.MOUSE_DRAG_END,{drag:this.drag,dragTotal:this.dragTotal,dragTotalRel:this.dragTotalRel}))}handleTouchEnd(e){const t=e.touches[0]?e.touches[0]:e;this.handleUp(t)}handleIosGestureChange(e){e.preventDefault(),document.body.style.zoom=.99}handleIosGestureEnd(e){document.body.style.zoom=1}update(e){this.positionEased.lerp(this.position,this.easing),this.positionEasedRel.lerp(this.positionRel,this.easing),this.positionEasedRelCenter.lerp(this.positionRelCenter,this.easing);const t=Math.max(14,e-this.lastTime),i=this.positionLast.x-this.position.x,s=this.positionLast.y-this.position.y;this.velocity.set(i/t,s/t),this.velocityEased.lerp(this.velocity,.1),this.distanceTravelled=this.position.distanceTo(this.positionLast),this.distanceTravelledRel=this.positionRel.distanceTo(this.positionLastRel),this.lastTime=e,this.positionLast.copy(this.position),this.positionLastRel.copy(this.positionRel)}}const Ln=new ML;/*!
 * EasePack 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Jn,Dc,kb=function(){return Jn||typeof window<"u"&&(Jn=window.gsap)&&Jn.registerPlugin&&Jn},jd=function(e,t){return!!(typeof e>"u"?t:e&&!~(e+"").indexOf("false"))},EL=function(e){if(Jn=e||kb(),Jn){Dc=Jn.registerEase;var t=Jn.parseEase(),i=function(o){return function(a){var l=.5+a/2;o.config=function(c){return o(2*(1-c)*c*l+c*c)}}},s;for(s in t)t[s].config||i(t[s]);Dc("slow",ho),Dc("expoScale",um),Dc("rough",Fl);for(s in gl)s!=="version"&&Jn.core.globals(s,gl[s])}},zb=function(e,t,i){e=Math.min(1,e||.7);var s=e<1?t||t===0?t:.7:0,r=(1-e)/2,o=r+e,a=jd(i);return function(l){var c=l+(.5-l)*s;return l<r?a?1-(l=1-l/r)*l:c-(l=1-l/r)*l*l*l*c:l>o?a?l===1?0:1-(l=(l-o)/r)*l:c+(l-c)*(l=(l-o)/r)*l*l*l:a?1:c}},Hb=function(e,t,i){var s=Math.log(t/e),r=t-e;return i&&(i=Jn.parseEase(i)),function(o){return(e*Math.exp(s*(i?i(o):o))-e)/r}},bf=function(e,t,i){this.t=e,this.v=t,i&&(this.next=i,i.prev=this,this.c=i.v-t,this.gap=i.t-e)},Vb=function(e){typeof e!="object"&&(e={points:+e||20});for(var t=e.taper||"none",i=[],s=0,r=(+e.points||20)|0,o=r,a=jd(e.randomize,!0),l=jd(e.clamp),c=Jn?Jn.parseEase(e.template):0,u=(+e.strength||1)*.4,h,f,d,g,_,m,p;--o>-1;)h=a?Math.random():1/r*o,f=c?c(h):h,t==="none"?d=u:t==="out"?(g=1-h,d=g*g*u):t==="in"?d=h*h*u:h<.5?(g=h*2,d=g*g*.5*u):(g=(1-h)*2,d=g*g*.5*u),a?f+=Math.random()*d-d*.5:o%2?f+=d*.5:f-=d*.5,l&&(f>1?f=1:f<0&&(f=0)),i[s++]={x:h,y:f};for(i.sort(function(x,b){return x.x-b.x}),m=new bf(1,1,null),o=r;o--;)_=i[o],m=new bf(_.x,_.y,m);return p=new bf(0,0,m.t?m:m.next),function(x){var b=p;if(x>b.t){for(;b.next&&x>=b.t;)b=b.next;b=b.prev}else for(;b.prev&&x<=b.t;)b=b.prev;return p=b,b.v+(x-b.t)/b.gap*b.c}},ho=zb(.7);ho.ease=ho;ho.config=zb;var um=Hb(1,2);um.config=Hb;var Fl=Vb();Fl.ease=Fl;Fl.config=Vb;var gl={SlowMo:ho,RoughEase:Fl,ExpoScaleEase:um};for(var ov in gl)gl[ov].register=EL,gl[ov].version="3.12.5";kb()&&Jn.registerPlugin(ho);/*!
 * paths 3.12.5
 * https://gsap.com
 *
 * Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var wL=/[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,TL=/[\+\-]?\d*\.?\d+e[\+\-]?\d+/ig,AL=Math.PI/180,Lc=Math.sin,Ic=Math.cos,_l=Math.abs,ja=Math.sqrt,CL=function(e){return typeof e=="number"},av=1e5,er=function(e){return Math.round(e*av)/av||0};function RL(n,e,t,i,s,r,o){for(var a=n.length,l,c,u,h,f;--a>-1;)for(l=n[a],c=l.length,u=0;u<c;u+=2)h=l[u],f=l[u+1],l[u]=h*e+f*i+r,l[u+1]=h*t+f*s+o;return n._dirty=1,n}function PL(n,e,t,i,s,r,o,a,l){if(!(n===a&&e===l)){t=_l(t),i=_l(i);var c=s%360*AL,u=Ic(c),h=Lc(c),f=Math.PI,d=f*2,g=(n-a)/2,_=(e-l)/2,m=u*g+h*_,p=-h*g+u*_,x=m*m,b=p*p,v=x/(t*t)+b/(i*i);v>1&&(t=ja(v)*t,i=ja(v)*i);var C=t*t,A=i*i,T=(C*A-C*b-A*x)/(C*b+A*x);T<0&&(T=0);var L=(r===o?-1:1)*ja(T),M=L*(t*p/i),y=L*-(i*m/t),D=(n+a)/2,F=(e+l)/2,N=D+(u*M-h*y),K=F+(h*M+u*y),j=(m-M)/t,H=(p-y)/i,W=(-m-M)/t,B=(-p-y)/i,pe=j*j+H*H,be=(H<0?-1:1)*Math.acos(j/ja(pe)),ue=(j*B-H*W<0?-1:1)*Math.acos((j*W+H*B)/ja(pe*(W*W+B*B)));isNaN(ue)&&(ue=f),!o&&ue>0?ue-=d:o&&ue<0&&(ue+=d),be%=d,ue%=d;var ce=Math.ceil(_l(ue)/(d/4)),he=[],k=ue/ce,G=4/3*Lc(k/2)/(1+Ic(k/2)),ie=u*t,U=h*t,Y=h*-i,Z=u*i,re;for(re=0;re<ce;re++)s=be+re*k,m=Ic(s),p=Lc(s),j=Ic(s+=k),H=Lc(s),he.push(m-G*p,p+G*m,j+G*H,H-G*j,j,H);for(re=0;re<he.length;re+=2)m=he[re],p=he[re+1],he[re]=m*ie+p*Y+N,he[re+1]=m*U+p*Z+K;return he[re-2]=a,he[re-1]=l,he}}function DL(n){var e=(n+"").replace(TL,function(M){var y=+M;return y<1e-4&&y>-1e-4?0:y}).match(wL)||[],t=[],i=0,s=0,r=2/3,o=e.length,a=0,l="ERROR: malformed path: "+n,c,u,h,f,d,g,_,m,p,x,b,v,C,A,T,L=function(y,D,F,N){x=(F-y)/3,b=(N-D)/3,_.push(y+x,D+b,F-x,N-b,F,N)};if(!n||!isNaN(e[0])||isNaN(e[1]))return console.log(l),t;for(c=0;c<o;c++)if(C=d,isNaN(e[c])?(d=e[c].toUpperCase(),g=d!==e[c]):c--,h=+e[c+1],f=+e[c+2],g&&(h+=i,f+=s),c||(m=h,p=f),d==="M")_&&(_.length<8?t.length-=1:a+=_.length),i=m=h,s=p=f,_=[h,f],t.push(_),c+=2,d="L";else if(d==="C")_||(_=[0,0]),g||(i=s=0),_.push(h,f,i+e[c+3]*1,s+e[c+4]*1,i+=e[c+5]*1,s+=e[c+6]*1),c+=6;else if(d==="S")x=i,b=s,(C==="C"||C==="S")&&(x+=i-_[_.length-4],b+=s-_[_.length-3]),g||(i=s=0),_.push(x,b,h,f,i+=e[c+3]*1,s+=e[c+4]*1),c+=4;else if(d==="Q")x=i+(h-i)*r,b=s+(f-s)*r,g||(i=s=0),i+=e[c+3]*1,s+=e[c+4]*1,_.push(x,b,i+(h-i)*r,s+(f-s)*r,i,s),c+=4;else if(d==="T")x=i-_[_.length-4],b=s-_[_.length-3],_.push(i+x,s+b,h+(i+x*1.5-h)*r,f+(s+b*1.5-f)*r,i=h,s=f),c+=2;else if(d==="H")L(i,s,i=h,s),c+=1;else if(d==="V")L(i,s,i,s=h+(g?s-i:0)),c+=1;else if(d==="L"||d==="Z")d==="Z"&&(h=m,f=p,_.closed=!0),(d==="L"||_l(i-h)>.5||_l(s-f)>.5)&&(L(i,s,h,f),d==="L"&&(c+=2)),i=h,s=f;else if(d==="A"){if(A=e[c+4],T=e[c+5],x=e[c+6],b=e[c+7],u=7,A.length>1&&(A.length<3?(b=x,x=T,u--):(b=T,x=A.substr(2),u-=2),T=A.charAt(1),A=A.charAt(0)),v=PL(i,s,+e[c+1],+e[c+2],+e[c+3],+A,+T,(g?i:0)+x*1,(g?s:0)+b*1),c+=u,v)for(u=0;u<v.length;u++)_.push(v[u]);i=_[_.length-2],s=_[_.length-1]}else console.log(l);return c=_.length,c<6?(t.pop(),c=0):_[0]===_[c-2]&&_[1]===_[c-1]&&(_.closed=!0),t.totalPoints=a+c,t}function LL(n){CL(n[0])&&(n=[n]);var e="",t=n.length,i,s,r,o;for(s=0;s<t;s++){for(o=n[s],e+="M"+er(o[0])+","+er(o[1])+" C",i=o.length,r=2;r<i;r++)e+=er(o[r++])+","+er(o[r++])+" "+er(o[r++])+","+er(o[r++])+" "+er(o[r++])+","+er(o[r])+" ";o.closed&&(e+="z")}return e}/*!
 * CustomEase 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Dn,Gb,Wb=function(){return Dn||typeof window<"u"&&(Dn=window.gsap)&&Dn.registerPlugin&&Dn},lv=function(){Dn=Wb(),Dn?(Dn.registerEase("_CE",ju.create),Gb=1):console.warn("Please gsap.registerPlugin(CustomEase)")},IL=1e20,Uc=function(e){return~~(e*1e3+(e<0?-.5:.5))/1e3},UL=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/gi,OL=/[cLlsSaAhHvVtTqQ]/g,FL=function(e){var t=e.length,i=IL,s;for(s=1;s<t;s+=6)+e[s]<i&&(i=+e[s]);return i},NL=function(e,t,i){!i&&i!==0&&(i=Math.max(+e[e.length-1],+e[1]));var s=+e[0]*-1,r=-i,o=e.length,a=1/(+e[o-2]+s),l=-t||(Math.abs(+e[o-1]-+e[1])<.01*(+e[o-2]-+e[0])?FL(e)+r:+e[o-1]+r),c;for(l?l=1/l:l=-a,c=0;c<o;c+=2)e[c]=(+e[c]+s)*a,e[c+1]=(+e[c+1]+r)*l},BL=function n(e,t,i,s,r,o,a,l,c,u,h){var f=(e+i)/2,d=(t+s)/2,g=(i+r)/2,_=(s+o)/2,m=(r+a)/2,p=(o+l)/2,x=(f+g)/2,b=(d+_)/2,v=(g+m)/2,C=(_+p)/2,A=(x+v)/2,T=(b+C)/2,L=a-e,M=l-t,y=Math.abs((i-a)*M-(s-l)*L),D=Math.abs((r-a)*M-(o-l)*L),F;return u||(u=[{x:e,y:t},{x:a,y:l}],h=1),u.splice(h||u.length-1,0,{x:A,y:T}),(y+D)*(y+D)>c*(L*L+M*M)&&(F=u.length,n(e,t,f,d,x,b,A,T,c,u,h),n(A,T,v,C,m,p,a,l,c,u,h+1+(u.length-F))),u},ju=function(){function n(t,i,s){Gb||lv(),this.id=t,this.setData(i,s)}var e=n.prototype;return e.setData=function(i,s){s=s||{},i=i||"0,0,1,1";var r=i.match(UL),o=1,a=[],l=[],c=s.precision||1,u=c<=1,h,f,d,g,_,m,p,x,b;if(this.data=i,(OL.test(i)||~i.indexOf("M")&&i.indexOf("C")<0)&&(r=DL(i)[0]),h=r.length,h===4)r.unshift(0,0),r.push(1,1),h=8;else if((h-2)%6)throw"Invalid CustomEase";for((+r[0]!=0||+r[h-2]!=1)&&NL(r,s.height,s.originY),this.segment=r,g=2;g<h;g+=6)f={x:+r[g-2],y:+r[g-1]},d={x:+r[g+4],y:+r[g+5]},a.push(f,d),BL(f.x,f.y,+r[g],+r[g+1],+r[g+2],+r[g+3],d.x,d.y,1/(c*2e5),a,a.length-1);for(h=a.length,g=0;g<h;g++)p=a[g],x=a[g-1]||p,(p.x>x.x||x.y!==p.y&&x.x===p.x||p===x)&&p.x<=1?(x.cx=p.x-x.x,x.cy=p.y-x.y,x.n=p,x.nx=p.x,u&&g>1&&Math.abs(x.cy/x.cx-a[g-2].cy/a[g-2].cx)>2&&(u=0),x.cx<o&&(x.cx?o=x.cx:(x.cx=.001,g===h-1&&(x.x-=.001,o=Math.min(o,.001),u=0)))):(a.splice(g--,1),h--);if(h=1/o+1|0,_=1/h,m=0,p=a[0],u){for(g=0;g<h;g++)b=g*_,p.nx<b&&(p=a[++m]),f=p.y+(b-p.x)/p.cx*p.cy,l[g]={x:b,cx:_,y:f,cy:0,nx:9},g&&(l[g-1].cy=f-l[g-1].y);l[h-1].cy=a[a.length-1].y-f}else{for(g=0;g<h;g++)p.nx<g*_&&(p=a[++m]),l[g]=p;m<a.length-1&&(l[g-1]=a[a.length-2])}return this.ease=function(v){var C=l[v*h|0]||l[h-1];return C.nx<v&&(C=C.n),C.y+(v-C.x)/C.cx*C.cy},this.ease.custom=this,this.id&&Dn&&Dn.registerEase(this.id,this.ease),this},e.getSVGData=function(i){return n.getSVGData(this,i)},n.create=function(i,s,r){return new n(i,s,r).ease},n.register=function(i){Dn=i,lv()},n.get=function(i){return Dn.parseEase(i)},n.getSVGData=function(i,s){s=s||{};var r=s.width||100,o=s.height||100,a=s.x||0,l=(s.y||0)+o,c=Dn.utils.toArray(s.path)[0],u,h,f,d,g,_,m,p,x,b;if(s.invert&&(o=-o,l=0),typeof i=="string"&&(i=Dn.parseEase(i)),i.custom&&(i=i.custom),i instanceof n)u=LL(RL([i.segment],r,0,0,-o,a,l));else{for(u=[a,l],m=Math.max(5,(s.precision||1)*200),d=1/m,m+=2,p=5/m,x=Uc(a+d*r),b=Uc(l+i(d)*-o),h=(b-l)/(x-a),f=2;f<m;f++)g=Uc(a+f*d*r),_=Uc(l+i(f*d)*-o),(Math.abs((_-b)/(g-x)-h)>p||f===m-1)&&(u.push(x,b),h=(_-b)/(g-x)),x=g,b=_;u="M"+u.join(",")}return c&&c.setAttribute("d",u),u},n}();Wb()&&Dn.registerPlugin(ju);ju.version="3.12.5";Oe.registerPlugin(ho,ju);const Ne=n=>{n&&n.kill()};class Xb{constructor({name:e,scene:t,parent:i,config:s,data:r}){if(this.name=e||"Head Face",this.scene=t,this.parent=i||t.root,this.data=r,this.sceneVars=t.sceneVars,this.parts=[],this.isActive=!1,this.isInteractive=!1,this.isHovering=!1,this.isDragging=!1,this.config={},s)for(const[o,a]of Object.entries(s))this.config[o]!==void 0&&(this.config[o].value=a);this.animPosition=new z(0,0,0),this.deviceOrientationTarget=new qe(0,0),this.partsTarget=new qe(0,0),this.baseScale=.825,this.hoverFactor=0,this.dragFactor=0,this.createMesh(),this.createParts(),this.addEventListeners(),this.isActive=!0,this.isInteractive=!0}destroy(){this.isActive=!1,this.isInteractive=!1,this.group.parent.remove(this.group),this.parts.forEach(e=>{e.destroy()}),this.parts=[],this.removeEventListeners()}initDebug(){je.isActive&&je.addEntity({name:this.name,config:this.config,scene:this.scene.name})}createMesh(){this.group=new Vt,this.group.position.copy(this.animPosition),this.group.scale.set(this.baseScale,this.baseScale,1),this.parent.add(this.group)}createParts(){}animateShow(){Ne(this.tlShow);const e=this.parts.map(t=>t.animScale);return this.tlShow=Oe.timeline().fromTo(e,{x:0,y:0,z:1},{x:1,y:1,z:1,duration:1.15,stagger:.035,ease:"elastic.out(1.0,0.35)"},0),this.tlShow}animateHide(){Ne(this.tlHide);const e=this.parts.map(t=>t.animScale);return this.tlHide=Oe.timeline().to(e,{x:0,y:0,z:0,duration:.85,stagger:.015,ease:"elastic.out(1.0,0.75)"},0),this.tlHide}animateHoverIn(){Ne(this.tlHoverIn),Ne(this.tlHoverOut),this.tlHoverIn=Oe.timeline({}).to(this,{hoverFactor:1,duration:.5,ease:"power3.out"})}animateHoverOut(){Ne(this.tlHoverIn),Ne(this.tlHoverOut),this.tlHoverOut=Oe.timeline({}).to(this,{hoverFactor:0,duration:.5,ease:"power3.out"})}animateDragIn(){Ne(this.tlDragIn),Ne(this.tlDragOut),this.tlDragIn=Oe.timeline({}).to(this,{dragFactor:1,hoverFactor:0,duration:.5,ease:"power4.out"})}animateDragOut(){Ne(this.tlDragIn),Ne(this.tlDragOut),this.tlDragOut=Oe.timeline({}).to(this,{dragFactor:0,duration:1.5,ease:"elastic.out(1.75,0.3)"})}addEventListeners(){this.offMouseDown=Be.on(Fe.MOUSE_DOWN,this.handleMouseDown.bind(this)),this.offMouseUp=Be.on(Fe.MOUSE_UP,this.handleMouseUp.bind(this)),this.offFingerDragStart=Be.on(Fe.FINGER_DRAG_START,this.handleFingerDragStart.bind(this)),this.offFingerDragEnd=Be.on(Fe.FINGER_DRAG_END,this.handleFingerDragEnd.bind(this))}removeEventListeners(){this.offMouseDown(),this.offMouseUp(),this.offFingerDragStart(),this.offFingerDragEnd()}handleResize(){}handleAssetsLoad(){}handleRaycastTrigger(e){e.length>0&&!this.isHovering?this.handleFaceMouseEnter():e.length===0&&this.isHovering&&this.handleFaceMouseLeave()}handleFaceMouseEnter(){this.scene.isDraggingSomething||!Ln.hasMoved||(this.isHovering=!0,document.body.style.cursor="grab",document.title=ar.surprised,this.animateHoverIn())}handleFaceMouseLeave(){this.scene.isDraggingSomething||!Ln.hasMoved||(this.isHovering=!1,this.isDragging||(document.body.style.cursor=null,document.title=ar.default,this.animateHoverOut()))}handleMouseDown(){this.isInteractive&&this.isHovering&&(this.isDragging=!0,this.animateDragIn(),Be.trigger(Fe.FACE_DRAG_START),document.body.style.cursor="grabbing",document.title=ar.frowning)}handleMouseUp(){this.isInteractive&&this.isDragging&&(this.isDragging=!1,this.animateDragOut(),Be.trigger(Fe.FACE_DRAG_END),document.body.style.cursor=this.isHovering?"grab":null,document.title=this.isHovering?ar.surprised:ar.default)}handleFingerDragStart(){}handleFingerDragEnd(){}update(e,t){if(this.isActive){if(je.isActive,ot.isDesktop&&this.scene.raycaster&&this.isInteractive){const u=this.scene.raycaster.intersectObjects([this.group],!0);this.handleRaycastTrigger(u)}ot.isDesktop?this.partsTarget.copy(Ln.positionEasedRelCenter):this.partsTarget.copy(this.deviceOrientationTarget);const i=new z(0),s=new z(0);let r=this.baseScale;const o=new z(r);i.copy(this.animPosition),i.x+=this.partsTarget.x*.05,i.y+=this.partsTarget.y*.035,r+=this.hoverFactor*.15;const a=Math.abs(Ln.dragTotalRel.x)+Math.abs(Ln.dragTotalRel.y);i.x+=this.partsTarget.x*.8*this.dragFactor,i.y+=this.partsTarget.y*.55*this.dragFactor,r+=-this.dragFactor*(.15+.1*a),i.x+=Math.cos(e*.075)*this.dragFactor*(.0035+a*.005),i.y+=Math.sin(e*.075+.1)*this.dragFactor*(.0035+a*.005);const l=1-this.dragFactor,c=e*.0125;i.x+=Math.sin(c*.5)*l*.035,i.y+=Math.cos(c)*l*.025,s.z-=Math.sin(c*.5)*l*.035,this.group.position.copy(i),this.group.rotation.set(s.x,s.y,s.z),o.setScalar(r),this.group.scale.copy(o),this.partsTarget.x-=i.x*5,this.partsTarget.y-=i.y*5,this.parts.forEach(u=>{u.update(e,t)})}}updateQuarter(e,t){this.parts.forEach(i=>{i.updateQuarter&&i.updateQuarter(e,t)})}}class Aa{constructor({name:e,scene:t,parent:i,config:s,data:r,head:o}){if(this.name=e||"Head Part",this.scene=t,this.parent=i||t.root,this.data=r,this.head=o,this.sceneVars=t.sceneVars,this.isActive=!1,this.config={},s)for(const[a,l]of Object.entries(s))this.config[a]!==void 0&&(this.config[a].value=l);this.animPosition=new z(0,0,0),this.animScale=new z(1,1,1),this.createMesh()}destroy(){this.isActive=!1,this.removeEventListeners()}initDebug(){je.isActive&&je.addEntity({name:this.name,config:this.config,scene:this.scene.name})}createMesh(){this.group=new Vt;const e=2,t=new Sn(e,e),i=Mi(Wn.headPart);this.material=new Wt({vertexShader:i.vert,fragmentShader:i.frag,uniforms:{uTime:{value:0},uTexMap:{value:this.scene.textures[this.data.textureSheet]},uSpriteIndex:{value:this.data.textures.default.index},uSpriteRowCount:{value:this.data.textures.default.row},uSpriteColCount:{value:this.data.textures.default.col}},transparent:!0,depthTest:!1,depthWrite:!1}),this.mesh=new Nt(t,this.material),this.mesh.renderOrder=this.data.renderOrder,this.mesh.position.set(this.data.position[0],this.data.position[1],this.data.position[2]),this.mesh.scale.set(this.data.scale[0],this.data.scale[1],this.data.scale[2]),this.group.add(this.mesh),this.parent.add(this.group),this.isActive=!0}addEventListeners(){}removeEventListeners(){}handleResize(){}handleAssetsLoad(){}update(e,t){if(this.isActive){je.isActive;const i=new z,s=new z,r=new z;i.copy(this.animPosition),i.x+=this.head.partsTarget.x*this.data.parallaxAmount,i.y+=this.head.partsTarget.y*this.data.parallaxAmount,r.copy(this.animScale),this.group.position.copy(i),this.group.rotation.set(s.x,s.y,s.z),this.group.scale.copy(r)}}updateQuarter(e,t){}}class cv extends Aa{constructor(e){super(e),this.shouldBlink=!0,this.blinkTimer=-this.data.blinkDelay,this.blinkThreshold=2800,this.blinkDuration=140}setTextureDefault(){this.material.uniforms.uSpriteIndex.value=this.data.textures.default.index,this.material.uniforms.uSpriteRowCount.value=this.data.textures.default.row,this.material.uniforms.uSpriteColCount.value=this.data.textures.default.col}setTextureClosed(){this.material.uniforms.uSpriteIndex.value=this.data.textures.closed.index,this.material.uniforms.uSpriteRowCount.value=this.data.textures.closed.row,this.material.uniforms.uSpriteColCount.value=this.data.textures.closed.col}animateBlink(){this.setTextureClosed(),this.timeoutBlink=setTimeout(()=>{this.setTextureDefault()},this.blinkDuration)}handleDragStart(){this.timeoutBlink&&clearTimeout(this.timeoutBlink),this.shouldBlink=!1}handleDragEnd(){this.shouldBlink=!0,this.blinkTimer=-this.data.blinkDelay}update(e,t){super.update(e,t),this.shouldBlink&&(this.blinkTimer+=t,this.blinkTimer>=this.blinkThreshold&&(this.animateBlink(),this.blinkTimer=this.blinkTimer%this.blinkThreshold))}}class kL extends Aa{constructor(e){super(e)}setTextureDefault(){this.material.uniforms.uSpriteIndex.value=this.data.textures.default.index,this.material.uniforms.uSpriteRowCount.value=this.data.textures.default.row,this.material.uniforms.uSpriteColCount.value=this.data.textures.default.col}setTextureLaugh(){this.material.uniforms.uSpriteIndex.value=this.data.textures.laugh.index,this.material.uniforms.uSpriteRowCount.value=this.data.textures.laugh.row,this.material.uniforms.uSpriteColCount.value=this.data.textures.laugh.col}setTextureWow(){this.material.uniforms.uSpriteIndex.value=this.data.textures.wow.index,this.material.uniforms.uSpriteRowCount.value=this.data.textures.wow.row,this.material.uniforms.uSpriteColCount.value=this.data.textures.wow.col}setTextureMeh(){this.material.uniforms.uSpriteIndex.value=this.data.textures.meh.index,this.material.uniforms.uSpriteRowCount.value=this.data.textures.meh.row,this.material.uniforms.uSpriteColCount.value=this.data.textures.meh.col}handleFaceMouseEnter(){this.head.isDragging||this.setTextureWow()}handleFaceMouseLeave(){this.head.isDragging||this.setTextureDefault()}handleDragStart(){}handleDragEnd(){}update(e,t){super.update(e,t)}}const pi={head:{name:"Face Head",textureSheet:"sheet_parts_1",textures:{default:{index:1,col:2,row:2}},renderOrder:3,position:[0,0,0],scale:[1,1,1],parallaxAmount:.1},hairBack:{name:"Face Hair Back",textureSheet:"sheet_parts_1",textures:{default:{index:0,col:2,row:2}},renderOrder:1,position:[0,0,0],scale:[1,1,1],parallaxAmount:.06},hairFront:{name:"Face Hair Front",textureSheet:"sheet_parts_1",textures:{default:{index:2,col:2,row:2}},renderOrder:5,position:[0,0,0],scale:[1,1,1],parallaxAmount:.125},earLeft:{name:"Face Ear Left",textureSheet:"sheet_parts_2",textures:{default:{index:2,col:4,row:4}},renderOrder:2,position:[-.461,-.416,0],scale:[.377,.377,.377],parallaxAmount:.075},earRight:{name:"Face Ear Right",textureSheet:"sheet_parts_2",textures:{default:{index:3,col:4,row:4}},renderOrder:2,position:[.621,.085,0],scale:[.377,.377,.377],parallaxAmount:.075},eyeLeft:{name:"Face Eye Left",textureSheet:"sheet_parts_1",textures:{default:{index:36,col:8,row:8},closed:{index:44,col:8,row:8}},renderOrder:4,position:[-.053,-.1,0],scale:[.144,.144,.144],parallaxAmount:.135,blinkDelay:0},eyeRight:{name:"Face Eye Right",textureSheet:"sheet_parts_1",textures:{default:{index:52,col:8,row:8},closed:{index:60,col:8,row:8}},renderOrder:4,position:[.35,.073,0],scale:[.144,.144,.144],parallaxAmount:.135,blinkDelay:70},mouth:{name:"Face Mouth",textureSheet:"sheet_parts_2",textures:{default:{index:14,col:4,row:4},laugh:{index:6,col:4,row:4},meh:{index:7,col:4,row:4},wow:{index:11,col:4,row:4},pout:{index:10,col:4,row:4}},renderOrder:4,position:[.285,-.339,0],scale:[.44,.44,.44],parallaxAmount:.125},nose:{name:"Face Nose",textureSheet:"sheet_parts_2",textures:{default:{index:54,col:8,row:8}},renderOrder:4,position:[.187,-.047,0],scale:[.099,.099,.099],parallaxAmount:.13}},tr={flames:{name:"Skull Flames",spriteSheet:"sheet_skull_flames",textures:{default:{index:0,col:3,row:2}},renderOrder:1,position:[-.309,.527,0],scale:[1.03,1.03,1.03],parallaxAmount:.06},top:{name:"Skull Top",textureSheet:"sheet_parts_2",textures:{default:{index:2,col:2,row:2}},renderOrder:3,position:[.059,.1,0],scale:[.682,.682,.682],parallaxAmount:.12},bottom:{name:"Skull Bottom",textureSheet:"sheet_parts_2",textures:{default:{index:0,col:2,row:2}},renderOrder:2,position:[.185,-.525,0],scale:[.576,.576,.576],parallaxAmount:.1},eyeLeft:{name:"Skull Eye Left",textureSheet:"sheet_parts_2",textures:{default:{index:55,col:8,row:8}},renderOrder:4,position:[-.071,-.173,0],scale:[.151,.151,.151],parallaxAmount:.13},eyeRight:{name:"Skull Eye Right",textureSheet:"sheet_parts_2",textures:{default:{index:62,col:8,row:8}},renderOrder:4,position:[.399,.068,0],scale:[.146,.146,.146],parallaxAmount:.13},nose:{name:"Skull Nose",textureSheet:"sheet_parts_2",textures:{default:{index:63,col:8,row:8}},renderOrder:4,position:[.191,-.051,0],scale:[.094,.094,.094],parallaxAmount:.12}};class zL extends Xb{constructor(e){super(e)}createParts(){[pi.head,pi.hairBack,pi.hairFront,pi.earLeft,pi.earRight,pi.nose].forEach(t=>{const i={name:t.name,scene:this.scene,parent:this.group,data:t,head:this},s=new Aa(i);this.parts.push(s)}),this.partEyeLeft=new cv({name:pi.eyeLeft.name,scene:this.scene,parent:this.group,data:pi.eyeLeft,head:this}),this.partEyeRight=new cv({name:pi.eyeRight.name,scene:this.scene,parent:this.group,data:pi.eyeRight,head:this}),this.partMouth=new kL({name:pi.mouth.name,scene:this.scene,parent:this.group,data:pi.mouth,head:this}),this.parts.push(this.partEyeLeft,this.partEyeRight,this.partMouth)}animateMoveLeft(){Ne(this.tlMoveLeft),this.isInteractive=!1;const e=this.parts.map(i=>i.animPosition),t=this.parts.map(i=>i.animScale);return this.tlMoveLeft=Oe.timeline().to(e,{x:-2.5,y:0,z:0,duration:1.15,stagger:.025,ease:"elastic.out(1.0,0.5)"},0).to(t,{x:1.5,y:.9,z:1,duration:.15,ease:"power3.out"},0).to(t,{x:1.2,y:1.2,z:1,duration:1,stagger:.025,ease:"elastic.out(0.8,0.75)"},.15),this.tlMoveLeft}animateMoveCenter(){Ne(this.tlMoveCenter),this.isInteractive=!0;const e=this.parts.map(i=>i.animPosition),t=this.parts.map(i=>i.animScale);return this.tlMoveCenter=Oe.timeline().to(e,{x:0,y:0,z:0,duration:1.15,stagger:.025,ease:"elastic.out(1.0,0.5)"},0).to(t,{x:1.5,y:.9,z:1,duration:.15,ease:"power3.out"},0).to(t,{x:1,y:1,z:1,duration:1,stagger:.025,ease:"elastic.out(0.8,0.75)"},0),this.tlMoveCenter}animateMoveOutside(){Ne(this.tlMoveOutside),this.isInteractive=!1;const e=this.parts.map(i=>i.animPosition),t=this.parts.map(i=>i.animScale);return this.tlMoveOutside=Oe.timeline().to(e,{x:-7,y:0,z:0,duration:1.15,stagger:.02,ease:"elastic.out(1.0,0.5)"},0).to(t,{x:1.5,y:.9,z:1,duration:.15,ease:"power3.out"},0).to(t,{x:1.1,y:1.1,z:1,duration:1,stagger:.02,ease:"elastic.out(0.8,0.75)"},.15),this.tlMoveOutside}animateDragIn(){super.animateDragIn(),this.tlDragIn.call(()=>{this.partEyeLeft.setTextureClosed(),this.partEyeRight.setTextureClosed(),this.partMouth.setTextureMeh()},null,0)}animateDragOut(){super.animateDragOut(),this.tlDragOut.call(()=>{this.partMouth.setTextureLaugh()},null,0),this.tlDragOut.call(()=>{this.partEyeLeft.setTextureDefault(),this.partEyeRight.setTextureDefault(),this.partMouth.setTextureDefault()},null,.35)}handleFaceMouseEnter(){super.handleFaceMouseEnter(),!(this.scene.isDraggingSomething||!Ln.hasMoved)&&this.partMouth.handleFaceMouseEnter()}handleFaceMouseLeave(){super.handleFaceMouseLeave(),!(this.scene.isDraggingSomething||!Ln.hasMoved)&&this.partMouth.handleFaceMouseLeave()}handleMouseDown(e){super.handleMouseDown(e),this.isDragging&&(this.partEyeLeft.handleDragStart(),this.partEyeRight.handleDragStart(),this.partMouth.handleDragStart())}handleMouseUp(e){super.handleMouseUp(e),this.partEyeLeft.handleDragEnd(),this.partEyeRight.handleDragEnd(),this.partMouth.handleDragEnd()}handleFingerDragStart(){super.handleFingerDragStart(),this.partMouth.handleFaceMouseEnter(),document.title=ar.surprised}handleFingerDragEnd(){super.handleFingerDragStart(),this.partMouth.handleFaceMouseLeave(),document.title=ar.default}}class qb{constructor({name:e,scene:t,parent:i,config:s,data:r}){if(this.name=e||"Scribble",this.scene=t,this.parent=i||t.root,this.data=r,this.sceneVars=t.sceneVars,this.isActive=!1,this.config={visibility:{value:1,params:{min:0,max:1,step:.01}}},s)for(const[o,a]of Object.entries(s))this.config[o]!==void 0&&(this.config[o].value=a);this.animPosition=new z(this.data.position[0]*this.sceneVars.vWidth,this.data.position[1]*this.sceneVars.vHeight,this.data.position[2]),this.animRotation=new z(this.data.rotation[0]||0,this.data.rotation[1]||0,this.data.rotation[2]||0),this.animScale=new z(1,1,1),this.createMesh()}destroy(){this.isActive=!1,this.removeEventListeners()}initDebug(){je.isActive&&je.addEntity({name:this.name,config:this.config,scene:this.scene.name})}createMesh(){this.group=new Vt;const e=2,t=new Sn(e,e),i=Mi(Wn.scribble);this.material=new Wt({vertexShader:i.vert,fragmentShader:i.frag,uniforms:{uTime:{value:0},uTimeQuarter:{value:0},uTexMap:{value:this.scene.textures[this.data.textureId]},uTexNoise:{value:this.scene.textures.noise_blue_1},uScreenRes:{value:[this.sceneVars.width,this.sceneVars.height]},uColor:{value:new lt(this.data.color)},uOpacity:{value:this.data.opacity},uSpriteIndex:{value:this.data.index},uSpriteRowCount:{value:this.data.rowCount},uSpriteColCount:{value:this.data.colCount},uVisibility:this.config.visibility},transparent:!0,depthTest:!1,depthWrite:!1}),this.mesh=new Nt(t,this.material),this.mesh.renderOrder=this.data.renderOrder,this.group.position.set(this.data.position[0]*this.sceneVars.vWidth,this.data.position[1]*this.sceneVars.vHeight,this.data.position[2]),this.mesh.scale.set(this.data.scale[0],this.data.scale[1],this.data.scale[2]),this.group.add(this.mesh),this.parent.add(this.group),this.isActive=!0}addEventListeners(){}removeEventListeners(){}handleResize(){this.animPosition.set(this.data.position[0]*this.sceneVars.vWidth,this.data.position[1]*this.sceneVars.vHeight,this.data.position[2]),this.material.uniforms.uScreenRes.value=[this.sceneVars.width,this.sceneVars.height]}handleAssetsLoad(){}update(e,t){if(this.isActive){je.isActive,this.material.uniforms.uTime.value=e*.001;const i=new z,s=new z,r=new z;i.copy(this.animPosition),s.copy(this.animRotation),r.copy(this.animScale),this.group.position.copy(i),this.group.rotation.set(s.x,s.y,s.z),this.group.scale.copy(r)}}updateQuarter(e,t){this.material.uniforms.uTimeQuarter.value=e*.001}}let HL=class{constructor({name:e,scene:t,parent:i,config:s}){if(this.name=e||"Scribbles Alpha",this.scene=t,this.parent=i||t.root,this.sceneVars=t.sceneVars,this.entities=[],this.isActive=!1,this.config={color:{value:"#000000"}},s)for(const[r,o]of Object.entries(s))this.config[r]!==void 0&&(this.config[r].value=o);this.createScribbles(),this.isActive=!0}destroy(){this.isActive=!1,this.removeEventListeners()}initDebug(){je.isActive&&(je.addEntity({name:this.name,config:this.config,scene:this.scene.name}),this.entities.forEach(e=>{e.initDebug&&e.initDebug()}))}createScribbles(){this.group=new Vt,this.parent.add(this.group);const e={title:{position:ot.isMobile?[-.015,.275,0]:[-.015,.3,0],rotation:[0,0,0],scale:[1,1,1],renderOrder:0,textureId:"scribbles_sheet",index:0,rowCount:3,colCount:4,color:"#1F1A1B",opacity:1},me:{position:ot.isMobile?[-.3,-.225,0]:[-.175,-.125,0],rotation:ot.isMobile?[0,0,Math.PI*.1]:[0,0,0],scale:[.5,.5,1],renderOrder:0,textureId:"scribbles_sheet",index:2,rowCount:3,colCount:4,color:"#1F1A1B",opacity:1},tipCursor:{position:[-.04,-.335,0],rotation:[0,0,0],scale:[.5,.5,1],renderOrder:0,textureId:"scribbles_sheet",index:4,rowCount:3,colCount:4,color:"#1F1A1B",opacity:.75},tipGrab:{position:[.04,-.335,0],rotation:[0,0,0],scale:[.5,.5,1],renderOrder:0,textureId:"scribbles_sheet",index:5,rowCount:3,colCount:4,color:"#1F1A1B",opacity:.75},tipMore:{position:[.325,-.015,0],rotation:[0,0,0],scale:[.5,.5,1],renderOrder:0,textureId:"scribbles_sheet",index:6,rowCount:3,colCount:4,color:"#1F1A1B",opacity:.75}};ot.isDesktop||(delete e.tipCursor,delete e.tipGrab,delete e.tipMore),Object.keys(e).forEach(t=>{const i=new qb({name:`Scribble ${t}`,scene:this.scene,parent:this.group,data:e[t]});this.entities.push(i)})}animateShow(){Ne(this.tlShow);const e=this.entities.map(i=>i.animScale),t=this.entities.map(i=>i.config.visibility);return this.tlShow=Oe.timeline().fromTo(e,{x:.5,y:.5,z:1},{x:1,y:1,z:1,duration:1,stagger:.035,ease:"elastic.out(1.0,0.3)"},.1).fromTo(t,{value:0},{value:1,duration:.3,stagger:.035,ease:"steps(12)"},0),this.tlShow}animateHide(){Ne(this.tlHide);const e=this.entities.map(i=>i.animScale),t=this.entities.map(i=>i.config.visibility);return this.tlHide=Oe.timeline().to(e,{x:.75,y:.75,z:1,duration:.25,stagger:.02,ease:"elastic.in(1.0,0.3)"},0).to(t,{value:0,duration:.2,stagger:.02,ease:"steps(10)"},.1),this.tlHide}animateMoveLeft(){Ne(this.tlMoveLeft);const e=this.entities.slice(0,this.entities.length).map(i=>i.animScale),t=this.entities.slice(0,this.entities.length).map(i=>i.config.visibility);return this.tlMoveLeft=Oe.timeline().to(e,{x:.75,y:.75,z:1,duration:.25,stagger:.02,ease:"elastic.in(1.0,0.3)"},0).to(t,{value:0,duration:.2,stagger:.02,ease:"steps(10)"},.1),this.tlMoveLeft}animateMoveCenter(){const e=this.entities.slice(0,this.entities.length).map(i=>i.animScale),t=this.entities.slice(0,this.entities.length).map(i=>i.config.visibility);return this.tlMoveCenter=Oe.timeline().fromTo(e,{x:.5,y:.5,z:1},{x:1,y:1,z:1,duration:1,stagger:.035,ease:"elastic.out(1.0,0.3)"},.1).fromTo(t,{value:0},{value:1,duration:.3,stagger:.035,ease:"steps(12)"},0),this.tlMoveCenter}animateMoveOutside(){}addEventListeners(){}removeEventListeners(){}handleResize(){this.entities.forEach(e=>{e.handleResize()})}handleAssetsLoad(){}update(e,t){this.isActive&&this.entities.forEach(i=>{i.update(e,t)})}updateQuarter(e,t){this.entities.forEach(i=>{i.updateQuarter(e,t)})}};class VL{constructor({name:e,scene:t,parent:i,config:s,data:r}){if(this.name=e||"Hand Palm",this.scene=t,this.parent=i||t.root,this.data=r,this.sceneVars=t.sceneVars,this.isActive=!1,this.config={},s)for(const[o,a]of Object.entries(s))this.config[o]!==void 0&&(this.config[o].value=a);this.isHidden=!0,this.visiblePosition=new z(this.data.position[0],this.data.position[1],this.data.position[2]),this.hiddenPosition=new z(1,0,0),this.animPosition=new z,this.animPosition.copy(this.visiblePosition),this.animScale=new z(1,1,1),this.createMesh()}destroy(){this.isActive=!1,this.removeEventListeners()}initDebug(){je.isActive&&je.addEntity({name:this.name,config:this.config,scene:this.scene.name})}createMesh(){this.group=new Vt;const e=2,t=new Sn(e,e),i=Mi(Wn.handPart);this.material=new Wt({vertexShader:i.vert,fragmentShader:i.frag,uniforms:{uTime:{value:0},uTimeQuarter:{value:0},uTexMap:{value:this.scene.textures[this.data.textureId]},uTexNoise:{value:this.scene.textures.noise_blue_1},uScreenRes:{value:[this.sceneVars.width,this.sceneVars.height]},uSpriteIndex:{value:this.data.index},uSpriteRowCount:{value:this.data.rowCount},uSpriteColCount:{value:this.data.colCount},uVisibility:{value:1}},transparent:!0,depthTest:!1,depthWrite:!1,side:bn}),this.mesh=new Nt(t,this.material),this.mesh.renderOrder=this.data.renderOrder,this.group.position.copy(this.animPosition),this.mesh.position.set(-2*this.data.scale[0]*.5,0,0),this.mesh.scale.set(this.data.scale[0],this.data.scale[1],this.data.scale[2]),this.group.add(this.mesh),this.parent.add(this.group),this.isActive=!0}show(){this.isHidden=!1,this.animateShow()}hide(){this.isHidden=!0,this.animateHide()}animateShow({onStart:e,onComplete:t}={}){return Ne(this.tlShow),this.tlShow=Oe.timeline({onStart:e,onComplete:t}).to(this.animPosition,{x:this.visiblePosition.x,y:this.visiblePosition.y,z:this.visiblePosition.z,duration:.5,ease:"expo.out"},0),this.tlShow}animateHide({onStart:e,onComplete:t}={}){return Ne(this.tlShow),this.tlShow=Oe.timeline({onStart:e,onComplete:t}).to(this.animPosition,{x:this.hiddenPosition.x,y:this.hiddenPosition.y,z:this.hiddenPosition.z,duration:.5,ease:"expo.out"},0),this.tlShow}addEventListeners(){}removeEventListeners(){}handleResize(){this.visiblePosition.set(this.data.position[0]*this.sceneVars.vWidth,this.data.position[1]*this.sceneVars.vHeight,this.data.position[2]),this.material.uniforms.uScreenRes.value=[this.sceneVars.width,this.sceneVars.height]}handleAssetsLoad(){}update(e,t){if(this.isActive){je.isActive;const i=new z,s=new z,r=new z;i.copy(this.animPosition),r.copy(this.animScale),this.group.position.copy(i),this.group.rotation.set(s.x,s.y,s.z),this.group.scale.copy(r),this.material.uniforms.uTime.value=e*.001}}updateQuarter(e,t){this.material.uniforms.uTimeQuarter.value=e*.001}}class GL{constructor({name:e,scene:t,parent:i,config:s,data:r,hand:o}){if(this.name=e||"Hand Finger",this.scene=t,this.parent=i||t.root,this.data=r,this.hand=o,this.sceneVars=t.sceneVars,this.isActive=!1,this.config={},s)for(const[a,l]of Object.entries(s))this.config[a]!==void 0&&(this.config[a].value=l);this.isHidden=!1,this.dragIntensity=0,this.visiblePosition=new z(this.data.position[0],this.data.position[1],this.data.position[2]),this.hiddenPosition=new z(.75,0,0),this.animPosition=new z,this.animPosition.copy(this.visiblePosition),this.animScale=new z(1,1,1),this.createMesh(),this.addEventListeners()}destroy(){this.isActive=!1,this.removeEventListeners()}initDebug(){je.isActive&&je.addEntity({name:this.name,config:this.config,scene:this.scene.name})}createMesh(){this.group=new Vt;const e=2,t=new Sn(e,e),i=Mi(Wn.handPart);this.material=new Wt({vertexShader:i.vert,fragmentShader:i.frag,uniforms:{uTime:{value:0},uTimeQuarter:{value:0},uTexMap:{value:this.scene.textures[this.data.textureId]},uTexNoise:{value:this.scene.textures.noise_blue_1},uScreenRes:{value:[this.sceneVars.width,this.sceneVars.height]},uSpriteIndex:{value:this.data.index},uSpriteRowCount:{value:this.data.rowCount},uSpriteColCount:{value:this.data.colCount},uVisibility:{value:1}},transparent:!0,depthTest:!1,depthWrite:!1,side:bn}),this.mesh=new Nt(t,this.material),this.mesh.renderOrder=this.data.renderOrder,this.group.position.copy(this.animPosition),this.mesh.position.set(-2*this.data.scale[0]*.5,0,0),this.mesh.scale.set(this.data.scale[0],this.data.scale[1],this.data.scale[2]),this.group.add(this.mesh),this.parent.add(this.group),this.isActive=!0,this.isInteractive=!0}show(){this.isHidden=!1,this.isInteractive=!0,this.animateShow()}hide(){this.isHidden=!0,this.isInteractive=!1,this.animateHide()}animateHoverIn({onStart:e,onComplete:t}={}){Ne(this.tlHover),this.tlHover=Oe.timeline({onStart:e,onComplete:t}).to(this.animScale,{x:1.1,y:1.1,z:1.1,duration:.4,ease:"expo.out"})}animateHoverOut({onStart:e,onComplete:t}={}){Ne(this.tlHover),this.tlHover=Oe.timeline({onStart:e,onComplete:t}).to(this.animScale,{x:1,y:1,z:1,duration:.3,ease:"power3.out"})}animateReset({onStart:e,onComplete:t}={}){Ne(this.tlDragIn),Ne(this.tlDragOut),this.tlDragOut=Oe.timeline({onStart:e,onComplete:t}).to(this,{dragIntensity:0,duration:.5,ease:"elastic.out(0.9,0.3)"})}animateShow({onStart:e,onComplete:t}={}){Ne(this.tlHide),this.tlHide=Oe.timeline({onStart:e,onComplete:t}).to(this.animPosition,{x:this.visiblePosition.x,y:this.visiblePosition.y,z:this.visiblePosition.z,duration:.5,ease:"expo.out"},0)}animateHide({onStart:e,onComplete:t}={}){Ne(this.tlDragIn),Ne(this.tlDragOut),Ne(this.tlHide),this.tlHide=Oe.timeline({onStart:e,onComplete:t}).to(this.animPosition,{x:this.hiddenPosition.x,y:this.hiddenPosition.y,z:this.hiddenPosition.z,duration:.5,ease:"expo.out"},0).to(this,{dragIntensity:0,duration:.5,ease:"elastic.out(0.9,0.3)"},0)}addEventListeners(){this.offMouseDown=Be.on(Fe.MOUSE_DOWN,this.handleMouseDown.bind(this)),this.offMouseUp=Be.on(Fe.MOUSE_UP,this.handleMouseUp.bind(this))}removeEventListeners(){this.offMouseDown(),this.offMouseUp()}handleResize(){this.material.uniforms.uScreenRes.value=[this.sceneVars.width,this.sceneVars.height]}handleAssetsLoad(){}handleRaycastTrigger(e){this.isInteractive&&(e.length>0&&!this.isHovering?this.handleMouseEnter():e.length===0&&this.isHovering&&this.handleMouseLeave())}handleMouseEnter(){this.isHovering=!0,document.body.style.cursor="grab",this.animateHoverIn()}handleMouseLeave(){this.isHovering=!1,this.isDragging||(document.body.style.cursor=null),this.animateHoverOut()}handleMouseDown(){this.isHovering&&(this.isDragging=!0,Be.trigger(Fe.FINGER_DRAG_START),document.body.style.cursor="grabbing")}handleMouseUp(){this.isDragging&&(this.isDragging=!1,this.dragIntensity>=.333?this.hand.showUI():this.animateReset(),Be.trigger(Fe.FINGER_DRAG_END),document.body.style.cursor=this.isHovering?"grab":null)}update(e,t){if(this.isActive){if(je.isActive,ot.isDesktop&&this.scene.raycaster&&this.isInteractive){const o=this.scene.raycaster.intersectObjects([this.group],!0);this.handleRaycastTrigger(o)}const i=new z,s=new z,r=new z;i.copy(this.animPosition),r.copy(this.animScale),this.isDragging&&(this.dragIntensity=Math.max(0,Ln.dragTotalRel.x*-1)),i.x+=this.sceneVars.vWidth*this.dragIntensity*.0015,r.x+=this.sceneVars.vWidth*this.dragIntensity*.4,r.y-=this.sceneVars.vWidth*this.dragIntensity*.01,this.group.position.copy(i),this.group.rotation.set(s.x,s.y,s.z),this.group.scale.copy(r),this.material.uniforms.uTime.value=e*.001}}updateQuarter(e,t){this.material.uniforms.uTimeQuarter.value=e*.001}}class WL{constructor({name:e,scene:t,parent:i,config:s,data:r,hand:o}){if(this.name=e||"Hand Close",this.scene=t,this.parent=i||t.root,this.data=r,this.hand=o,this.sceneVars=t.sceneVars,this.isActive=!1,this.config={},s)for(const[a,l]of Object.entries(s))this.config[a]!==void 0&&(this.config[a].value=l);this.isHidden=!0,this.visiblePosition=new z(this.data.position[0],this.data.position[1],this.data.position[2]),this.hiddenPosition=new z(1,this.data.position[1],0),this.animPosition=new z,this.animPosition.copy(this.hiddenPosition),this.animScale=new z(1,1,1),this.createMesh(),this.addEventListeners()}destroy(){this.isActive=!1,this.removeEventListeners()}initDebug(){je.isActive&&je.addEntity({name:this.name,config:this.config,scene:this.scene.name})}createMesh(){this.group=new Vt;const e=2,t=new Sn(e,e),i=Mi(Wn.handPart);this.material=new Wt({vertexShader:i.vert,fragmentShader:i.frag,uniforms:{uTime:{value:0},uTimeQuarter:{value:0},uTexMap:{value:this.scene.textures[this.data.textureId]},uTexNoise:{value:this.scene.textures.noise_blue_1},uScreenRes:{value:[this.sceneVars.width,this.sceneVars.height]},uSpriteIndex:{value:this.data.index},uSpriteRowCount:{value:this.data.rowCount},uSpriteColCount:{value:this.data.colCount},uVisibility:{value:1}},transparent:!0,depthTest:!1,depthWrite:!1,side:bn}),this.mesh=new Nt(t,this.material),this.mesh.renderOrder=this.data.renderOrder,this.group.position.copy(this.animPosition),this.mesh.position.set(-2*this.data.scale[0]*.5,0,0),this.mesh.scale.set(this.data.scale[0],this.data.scale[1],this.data.scale[2]),this.group.add(this.mesh),this.parent.add(this.group),this.createRaycastMesh(),this.isActive=!0}createRaycastMesh(){const t=new Sn(2,2),i=new zp({color:16777215,side:bn,transparent:!0,depthTest:!1,depthWrite:!1,opacity:0});this.raycastMesh=new Nt(t,i),this.raycastMesh.renderOrder=this.data.renderOrder,this.raycastMesh.position.set(-2*this.data.scale[0]*.35,0,0),this.raycastMesh.scale.set(this.data.scale[0]*.75,this.data.scale[1]*.95,this.data.scale[2]*.85),this.group.add(this.raycastMesh)}show(){this.isHidden=!1,this.isInteractive=!0,this.animateShow()}hide(){this.isHidden=!0,this.isInteractive=!1,this.animateHide()}animateShow({onStart:e,onComplete:t}={}){Ne(this.tlShow),this.tlShow=Oe.timeline({onStart:e,onComplete:t}).to(this.animPosition,{x:this.visiblePosition.x,y:this.visiblePosition.y,z:this.visiblePosition.z,duration:.5,ease:"expo.out"},0)}animateHide({onStart:e,onComplete:t}={}){Ne(this.tlShow),this.tlShow=Oe.timeline({onStart:e,onComplete:t}).to(this.animPosition,{x:this.hiddenPosition.x,y:this.hiddenPosition.y,z:this.hiddenPosition.z,duration:.5,ease:"expo.out"},0)}animateHoverIn({onStart:e,onComplete:t}={}){Ne(this.tlHover),this.tlHover=Oe.timeline({onStart:e,onComplete:t}).to(this.animScale,{x:1.1,y:1.1,z:1.1,duration:.4,ease:"expo.out"})}animateHoverOut({onStart:e,onComplete:t}={}){Ne(this.tlHover),this.tlHover=Oe.timeline({onStart:e,onComplete:t}).to(this.animScale,{x:1,y:1,z:1,duration:.3,ease:"power3.out"})}addEventListeners(){this.offMouseUp=Be.on(Fe.MOUSE_UP,this.handleMouseUp.bind(this))}removeEventListeners(){this.offMouseUp()}handleResize(){this.visiblePosition.set(this.data.position[0]*this.sceneVars.vWidth,this.data.position[1]*this.sceneVars.vHeight,this.data.position[2]),this.material.uniforms.uScreenRes.value=[this.sceneVars.width,this.sceneVars.height]}handleAssetsLoad(){}handleRaycastTrigger(e){e.length>0&&!this.isHovering?this.handleMouseEnter():e.length===0&&this.isHovering&&this.handleMouseLeave()}handleMouseEnter(){this.isHovering=!0,document.body.style.cursor="pointer",this.animateHoverIn()}handleMouseLeave(){this.isHovering=!1,this.isDragging||(document.body.style.cursor=null),this.animateHoverOut()}handleMouseUp(){this.isHovering&&(this.isInteractive=!1,this.isHovering=!1,document.body.style.cursor=null,this.hand.hideUI())}update(e,t){if(this.isActive){if(je.isActive,ot.isDesktop&&this.scene.raycaster){const o=this.scene.raycaster.intersectObjects([this.raycastMesh],!1);this.handleRaycastTrigger(o)}const i=new z,s=new z,r=new z;i.copy(this.animPosition),r.copy(this.animScale),this.group.position.copy(i),this.group.rotation.set(s.x,s.y,s.z),this.group.scale.copy(r),this.material.uniforms.uTime.value=e*.001}}updateQuarter(e,t){this.material.uniforms.uTimeQuarter.value=e*.001}}class XL{constructor({name:e,scene:t,parent:i,config:s,data:r}){if(this.name=e||"HandBackground",this.scene=t,this.parent=i||t.root,this.data=r,this.sceneVars=t.sceneVars,this.isActive=!1,this.config={color:{value:"#000000"}},s)for(const[o,a]of Object.entries(s))this.config[o]!==void 0&&(this.config[o].value=a);this.scaleVisible=1,this.scaleHidden=.75,this.animPosition=new z,this.animScale=new z(this.scaleHidden,this.scaleHidden,this.scaleHidden),this.createMesh()}destroy(){this.isActive=!1,this.removeEventListeners()}initDebug(){je.isActive&&je.addEntity({name:this.name,config:this.config,scene:this.scene.name})}createMesh(){this.group=new Vt,this.size=2;const e=new Sn(this.size,this.size),t=Mi(Wn.uiBackground);this.material=new Wt({vertexShader:t.vert,fragmentShader:t.frag,uniforms:{uScreenRes:{value:[this.sceneVars.width,this.sceneVars.height]},uAspectRatio:{value:this.sceneVars.aspectRatio},uTime:{value:0},uTimeQuarter:{value:0},uColor:{value:new lt(this.config.color.value)}},transparent:!0,depthTest:!1,depthWrite:!1,side:bn}),this.mesh=new Nt(e,this.material),this.mesh.renderOrder=this.data.renderOrder,this.group.position.set(this.data.position[0]*this.sceneVars.vWidth,this.data.position[1]*this.sceneVars.vHeight,this.data.position[2]),this.mesh.position.set(this.size*this.data.scale[0]*.5,0,0),this.mesh.scale.set(this.data.scale[0],this.data.scale[1],this.data.scale[2]),this.mesh.visible=!1,this.group.add(this.mesh),this.parent.add(this.group),this.isActive=!1}show(){this.isActive=!1,this.isHidden=!0,this.mesh.visible=!1}hide(){const e=()=>{this.isActive=!1,this.isHidden=!0};this.animateHide({onComplete:e})}animateShow({onStart:e,onComplete:t}={}){Ne(this.tlShow),this.tlShow=Oe.timeline({onStart:e,onComplete:t}).to(this.animScale,{x:this.scaleVisible,y:this.scaleVisible,z:this.scaleVisible,duration:1,ease:"elastic.out(0.9,0.5)"},0)}animateHide({onStart:e,onComplete:t}={}){Ne(this.tlShow),this.tlShow=Oe.timeline({onStart:e,onComplete:t}).to(this.animScale,{x:this.scaleHidden,y:this.scaleHidden,z:this.scaleHidden,duration:1,ease:"elastic.out(0.9,0.5)"},0)}addEventListeners(){}removeEventListeners(){}handleResize(){this.group.position.set(this.data.position[0]*this.sceneVars.vWidth,this.data.position[1]*this.sceneVars.vHeight,this.data.position[2]);const e=this.data.scale[0]+(this.sceneVars.aspectRatio-2);this.mesh.position.set(this.size*e*.5,0,0),this.mesh.scale.set(e,this.data.scale[1],this.data.scale[2]),this.material.uniforms.uScreenRes.value=[this.sceneVars.width,this.sceneVars.height],this.material.uniforms.uAspectRatio.value=this.sceneVars.aspectRatio}handleAssetsLoad(){}update(e,t){if(this.isActive){const i=new z,s=new z,r=new z;i.copy(this.animPosition),r.copy(this.animScale),this.group.position.copy(i),this.group.rotation.set(s.x,s.y,s.z),this.group.scale.copy(r),this.material.uniforms.uTime.value=e*.001,je.isActive&&(this.material.uniforms.uColor.value=new lt(this.config.color.value))}}updateQuarter(e,t){this.material.uniforms.uTimeQuarter.value=e*.001}}class qL{constructor({name:e,scene:t,parent:i,config:s,data:r}){if(this.name=e||"Hand About Illu",this.scene=t,this.parent=i||t.root,this.data=r,this.sceneVars=t.sceneVars,this.isActive=!1,this.isAnimated=!1,this.config={},s)for(const[o,a]of Object.entries(s))this.config[o]!==void 0&&(this.config[o].value=a);this.isHidden=!0,this.visiblePosition=new z(this.data.position[0],this.data.position[1],this.data.position[2]),this.hiddenPosition=new z(this.data.position[0]*3,this.data.position[1]*.5,this.data.position[2]),this.animPosition=new z,this.animPosition.copy(this.hiddenPosition),this.animScale=new z(1,1,1),this.eigthCount=0,this.createMesh()}destroy(){this.isActive=!1,this.removeEventListeners()}initDebug(){je.isActive&&je.addEntity({name:this.name,config:this.config,scene:this.scene.name})}createMesh(){this.group=new Vt;const e=2,t=new Sn(e,e),i=Mi(Wn.handPartIllu);typeof this.data.index=="number"?(this.isAnimated=!1,this.seqIndexCurrent=this.data.index):(this.isAnimated=!0,this.seqIndexCurrent=this.data.index[0],this.seqIndexStart=this.data.index[0],this.seqIndexEnd=this.data.index[this.data.index.length-1]),this.material=new Wt({vertexShader:i.vert,fragmentShader:i.frag,uniforms:{uTime:{value:0},uTimeQuarter:{value:0},uTexMap:{value:this.scene.textures[this.data.textureId]},uTexNoise:{value:this.scene.textures.noise_blue_1},uScreenRes:{value:[this.sceneVars.width,this.sceneVars.height]},uSpriteIndex:{value:this.seqCurrentIndex},uSpriteRowCount:{value:this.data.rowCount},uSpriteColCount:{value:this.data.colCount},uVisibility:{value:1}},transparent:!0,depthTest:!1,depthWrite:!1,side:bn}),this.mesh=new Nt(t,this.material),this.mesh.renderOrder=this.data.renderOrder,this.group.position.copy(this.animPosition),this.mesh.scale.set(this.data.scale[0],this.data.scale[1],this.data.scale[2]),this.group.add(this.mesh),this.parent.add(this.group),this.isActive=!0}show(){this.isActive=!0,this.isHidden=!1,this.animateShow()}hide(){const e=()=>{this.isActive=!1,this.isHidden=!0};this.animateHide({onComplete:e})}animateShow({onStart:e,onComplete:t}={}){return Ne(this.tlShow),this.tlShow=Oe.timeline({onStart:e,onComplete:t}).to(this.animPosition,{x:this.visiblePosition.x,y:this.visiblePosition.y,z:this.visiblePosition.z,duration:1,ease:"elastic.out(0.8,0.75)"},0),this.tlShow}animateHide({onStart:e,onComplete:t}={}){return Ne(this.tlShow),this.tlShow=Oe.timeline({onStart:e,onComplete:t}).to(this.animPosition,{x:this.hiddenPosition.x,y:this.hiddenPosition.y,z:this.hiddenPosition.z,duration:.5,ease:"expo.out"},0),this.tlShow}addEventListeners(){}removeEventListeners(){}handleResize(){if(this.sceneVars.width<1440||this.sceneVars.height<790){this.isActive=!1,this.group.visible=!1;return}else this.isActive=!0,this.group.visible=!0;this.sceneVars.height>=1080?this.visiblePosition.set(this.data.positionTall[0]*this.sceneVars.vWidth,this.data.positionTall[1]*this.sceneVars.vHeight,this.data.positionTall[2]):this.visiblePosition.set(this.data.position[0]*this.sceneVars.vWidth,this.data.position[1]*this.sceneVars.vHeight,this.data.position[2]),this.hiddenPosition.set(this.data.position[0]*this.sceneVars.vWidth*2,this.data.position[1]*this.sceneVars.vHeight*.5,this.data.position[2]),this.isHidden?this.animPosition.copy(this.hiddenPosition):this.animPosition.copy(this.visiblePosition),this.material.uniforms.uScreenRes.value=[this.sceneVars.width,this.sceneVars.height]}handleAssetsLoad(){}update(e,t){if(this.isActive){je.isActive;const i=new z,s=new z,r=new z;i.copy(this.animPosition),r.copy(this.animScale),this.group.position.copy(i),this.group.rotation.set(s.x,s.y,s.z),this.group.scale.copy(r),this.material.uniforms.uTime.value=e*.001}}updateQuarter(e,t){this.material.uniforms.uTimeQuarter.value=e*.001,this.isAnimated&&(this.eigthCount=(this.eigthCount+1)%2,this.eigthCount===0&&(this.eigthCount=0,this.upadeEigth(e,t)))}upadeEigth(e,t){this.isAnimated&&(this.seqIndexCurrent+=1,this.seqIndexCurrent>this.seqIndexEnd&&(this.seqIndexCurrent=this.seqIndexStart),this.material.uniforms.uSpriteIndex.value=this.seqIndexCurrent)}}class $L{constructor({name:e,scene:t,parent:i,config:s,data:r}){if(this.name=e||"Hand Palm Small",this.scene=t,this.parent=i||t.root,this.data=r,this.sceneVars=t.sceneVars,this.isActive=!1,this.config={},s)for(const[o,a]of Object.entries(s))this.config[o]!==void 0&&(this.config[o].value=a);this.isHidden=!0,this.visiblePosition=new z(this.data.position[0],this.data.position[1],this.data.position[2]),this.hiddenPosition=new z(1,0,0),this.animPosition=new z,this.animPosition.copy(this.visiblePosition),this.animScale=new z(1,1,1),this.createMesh()}destroy(){this.isActive=!1,this.removeEventListeners()}initDebug(){je.isActive&&je.addEntity({name:this.name,config:this.config,scene:this.scene.name})}createMesh(){this.group=new Vt;const e=2,t=new Sn(e,e),i=Mi(Wn.handPartIllu);this.material=new Wt({vertexShader:i.vert,fragmentShader:i.frag,uniforms:{uTime:{value:0},uTimeQuarter:{value:0},uTexMap:{value:this.scene.textures[this.data.textureId]},uTexNoise:{value:this.scene.textures.noise_blue_1},uScreenRes:{value:[this.sceneVars.width,this.sceneVars.height]},uSpriteIndex:{value:this.data.index},uSpriteRowCount:{value:this.data.rowCount},uSpriteColCount:{value:this.data.colCount},uVisibility:{value:1}},transparent:!0,depthTest:!1,depthWrite:!1,side:bn}),this.mesh=new Nt(t,this.material),this.mesh.renderOrder=this.data.renderOrder,this.group.position.copy(this.animPosition),this.mesh.scale.set(this.data.scale[0],this.data.scale[1],this.data.scale[2]),this.group.add(this.mesh),this.parent.add(this.group),this.isActive=!0}show(){this.isHidden=!1,this.animateShow()}hide(){this.isHidden=!0,this.animateHide()}animateShow({onStart:e,onComplete:t}={}){return Ne(this.tlShow),this.tlShow=Oe.timeline({onStart:e,onComplete:t}).to(this.animPosition,{x:this.visiblePosition.x,y:this.visiblePosition.y,z:this.visiblePosition.z,duration:1.1,ease:"elastic.out(0.9,0.7)"},0),this.tlShow}animateHide({onStart:e,onComplete:t}={}){return Ne(this.tlShow),this.tlShow=Oe.timeline({onStart:e,onComplete:t}).to(this.animPosition,{x:this.hiddenPosition.x,y:this.hiddenPosition.y,z:this.hiddenPosition.z,duration:.5,ease:"expo.out"},0),this.tlShow}addEventListeners(){}removeEventListeners(){}handleResize(){if(this.sceneVars.width<1024||this.sceneVars.width>=1440){this.isActive=!1,this.group.visible=!1;return}else this.isActive=!0,this.group.visible=!0;this.visiblePosition.set(this.data.position[0]*this.sceneVars.vWidth,this.data.position[1]*this.sceneVars.vHeight,this.data.position[2]),this.hiddenPosition.set(this.data.position[0]*this.sceneVars.vWidth*2,this.data.position[1]*this.sceneVars.vHeight*.5,this.data.position[2]),this.mesh.scale.set(this.data.scale[0]*this.sceneVars.aspectRatio,this.data.scale[1]*this.sceneVars.aspectRatio,this.data.scale[2]),this.isHidden?this.animPosition.copy(this.hiddenPosition):this.animPosition.copy(this.visiblePosition),this.material.uniforms.uScreenRes.value=[this.sceneVars.width,this.sceneVars.height]}handleAssetsLoad(){}update(e,t){if(this.isActive){je.isActive;const i=new z,s=new z,r=new z;i.copy(this.animPosition),r.copy(this.animScale),this.group.position.copy(i),this.group.rotation.set(s.x,s.y,s.z),this.group.scale.copy(r),this.material.uniforms.uTime.value=e*.001}}updateQuarter(e,t){this.material.uniforms.uTimeQuarter.value=e*.001}}const YL=(n,e,t)=>{const i=jL((t-n)/(e-n),0,1);return i*i*(3-2*i)},jL=(n,e,t)=>Math.min(Math.max(n,e),t);class KL{constructor({name:e,scene:t,parent:i,config:s}){if(this.name=e||"Hand UI",this.scene=t,this.parent=i||t.root,this.sceneVars=t.sceneVars,this.entities=[],this.outPosition=new z(.7,0,0),this.basePosition=new z(.5,0,0),this.openPosition=new z(0,0,0),this.isActive=!1,this.animPosition=new z(this.outPosition.x,this.outPosition.y,this.outPosition.z),this.animScale=new z(1,1,1),this.followFactor=1,this.eigthCount=0,this.config={},s)for(const[r,o]of Object.entries(s))this.config[r]!==void 0&&(this.config[r].value=o);this.createParts(),this.addEventListeners(),this.isActive=!0}destroy(){this.isActive=!1,this.removeEventListeners()}initDebug(){je.isActive&&(je.addEntity({name:this.name,config:this.config,scene:this.scene.name}),this.entities.forEach(e=>{e.initDebug&&e.initDebug()}))}createParts(){this.group=new Vt,this.parent.add(this.group),this.group.position.copy(this.animPosition),this.dragPalm=new VL({name:"Hand Palm",scene:this.scene,parent:this.group,hand:this,data:{position:[0,0,0],scale:[.4,.4,1],renderOrder:10,textureId:"hand_sheet",index:1,rowCount:2,colCount:2}}),this.dragFinger=new GL({name:"Hand Finger",scene:this.scene,parent:this.group,hand:this,data:{position:[-.3,-.0375,0],scale:[.27,.27,1],renderOrder:11,textureId:"hand_sheet",index:0,rowCount:2,colCount:2}}),window.__introHandController=this,window.__resetIntroHand=function(){try{const a=window.__introHandController?.dragFinger;a&&(a.dragIntensity=0)}catch{}},this.closeSign=new WL({name:"Hand Palm",scene:this.scene,parent:this.group,hand:this,data:{position:[.005,.05,0],scale:[.55,.55,1],renderOrder:11,textureId:"hand_sheet",index:2,rowCount:2,colCount:2}}),this.uiBackground=new XL({name:"UI Background",scene:this.scene,parent:this.group,hand:this,data:{position:[0,0,0],scale:[2,2,1],renderOrder:12}}),this.illuBig=new qL({name:"About Illu Big",scene:this.scene,parent:this.group,hand:this,data:{position:[.25,.28,0],positionTall:[.25,.185,0],scale:[1.1,1.1,1],renderOrder:13,textureId:"scribbles_about_sheet",index:[2,3],rowCount:2,colCount:2}}),this.illuSmall=new $L({name:"About Illu Small",scene:this.scene,parent:this.group,hand:this,data:{position:[.4,.2,0],scale:[.4,.4,1],renderOrder:14,textureId:"scribbles_about_sheet",index:0,rowCount:2,colCount:2}}),this.entities.push(this.dragPalm,this.dragFinger,this.closeSign,this.uiBackground,this.illuBig,this.illuSmall)}showUI(){this.hideUIOutside(),window.dispatchEvent(new CustomEvent("intro:pull"))}hideUI(){this.dragPalm.show(),this.dragFinger.show(),this.closeSign.hide(),this.uiBackground.hide(),this.illuBig.hide(),this.illuSmall.hide(),this.animateHideUI(),Be.trigger(Fe.UI_HIDE)}hideUIOutside(){this.dragPalm.hide(),this.dragFinger.hide(),this.closeSign.hide(),this.uiBackground.hide(),this.illuBig.hide(),this.illuSmall.hide(),this.animateHideUIOutside()}animateShow(){return Ne(this.tlShow),this.tlShow=Oe.timeline().fromTo(this.animPosition,{x:this.outPosition.x,y:this.outPosition.y,z:this.outPosition.z},{x:this.basePosition.x,y:this.basePosition.y,z:this.basePosition.z,duration:.75,stagger:.035,ease:"expo.out"},0),this.tlShow}animateShowUI(){return Ne(this.tlUI),this.tlUI=Oe.timeline().to(this,{followFactor:0,duration:.75,ease:"expo.out"},0).to(this.animPosition,{x:this.openPosition.x,y:this.openPosition.y,z:this.openPosition.z,duration:1,ease:"elastic.out(0.8,0.75)"},0),this.tlUI}animateHideUI(){return Ne(this.tlUI),this.tlUI=Oe.timeline().to(this,{followFactor:1,duration:.5,ease:"expo.out"},0).to(this.animPosition,{x:this.basePosition.x,y:this.basePosition.y,z:this.basePosition.z,duration:.75,ease:"elastic.out(0.8,0.75)"},0),this.tlUI}animateHideUIOutside(){return Ne(this.tlUI),this.tlUI=Oe.timeline().to(this.animPosition,{x:this.outPosition.x,y:this.outPosition.y,z:this.outPosition.z,duration:.75,ease:"elastic.out(0.8,0.75)"},0),this.tlUI}addEventListeners(){this.offMediaShow=Be.on(Fe.MEDIA_SHOW,this.handleMediaShow.bind(this)),this.offMediaHide=Be.on(Fe.MEDIA_HIDE,this.handleMediaHide.bind(this))}removeEventListeners(){this.offMediaShow(),this.offMediaHide()}handleResize(){this.entities.forEach(e=>{e.handleResize()})}handleAssetsLoad(){}handleMediaShow(){this.hideUIOutside()}handleMediaHide(){this.showUI()}update(e,t){if(this.isActive){const i=new z(0),s=new z(0);let r=1;const o=new z(r);i.x=this.animPosition.x*this.sceneVars.vWidth,i.y=this.animPosition.y*this.sceneVars.vHeight,i.z=this.animPosition.z,i.y+=Ln.positionEasedRelCenter.y*.25*this.followFactor;const a=YL(.3,.75,this.dragFinger.dragIntensity);i.x+=Math.cos(e*.1)*this.dragFinger.dragIntensity*(.0025+a*.0025),i.y+=Math.sin(e*.1)*this.dragFinger.dragIntensity*(.0025+a*.0025),this.entities.forEach(l=>{l.update(e,t)}),this.group.position.copy(i),this.group.rotation.set(s.x,s.y,s.z),o.setScalar(r),this.group.scale.copy(o)}}updateQuarter(e,t){this.entities.forEach(i=>{i.updateQuarter(e,t)})}}const ZL=()=>{requestAnimationFrame(()=>{Be.trigger("scroll",{x:window.scrollX,y:window.scrollY})})};window.addEventListener("scroll",ZL,{passive:!0});const hm=n=>Be.on("scroll",n);class QL extends Ib{constructor(e){super(e),this.name="Scene Three Sub Alpha",this.currentCamera=null,this.entities=[],this.textures=this.parentScene.textures,this.isDraggingSomething=!1,this.hasFirstRender=!1,this.isSwitchHidden=!1,this.isHeadHidden=!1,this.init()}init(){this.root=new Vt,this.scene.add(this.root),ot.isDesktop||this.root.position.set(0,.25,0),this.initCamera(),this.initRaycast()}initCamera(){this.camera=new Pn(45,this.sceneVars.aspectRatio,.1,1e3),this.camera.position.set(0,0,5),this.camera.lookAt(0,0,0),this.currentCamera=this.camera}initRaycast(){this.raycaster=new Lx}initComponents(){this.background=new Ub({scene:this,parent:this.root,config:{color:"#ff0b36"}}),this.entities=[...this.entities,this.background],this.headFace=new zL({scene:this,parent:this.root}),this.entities.push(this.headFace),this.scribbles=new HL({scene:this,parent:this.root}),this.entities.push(this.scribbles),ot.isDesktop&&(this.handUI=new KL({scene:this,parent:this.root}),this.entities.push(this.handUI))}initDebug(){je.addScene(this.name,!0),this.entities.forEach(e=>{e.initDebug&&e.initDebug()})}loadTextures(){return[]}loadModels(){return[]}animateShow(){Ne(this.tlShow),this.tlShow=Oe.timeline({delay:.5}),this.tlShow.add(this.headFace.animateShow(),.1),this.tlShow.add(this.scribbles.animateShow(),.1),this.mobileSwitch&&this.tlShow.add(this.mobileSwitch.show(),.25),this.handUI&&this.tlShow.add(this.handUI.animateShow(),.75)}animateUIShow(){Ne(this.tlUI),this.tlUI=Oe.timeline(),this.tlUI.add(this.headFace.animateMoveLeft(),.05),this.tlUI.add(this.scribbles.animateHide(),0)}animateUIHide(){Ne(this.tlUI),this.tlUI=Oe.timeline(),this.tlUI.add(this.headFace.animateMoveCenter(),.05),this.tlUI.add(this.scribbles.animateShow(),.2)}handleMediaShow(){Ne(this.tlMedia),this.tlMedia=Oe.timeline(),ot.isDesktop&&this.tlMedia.add(this.headFace.animateMoveOutside(),0)}handleMediaHide(){Ne(this.tlMedia),this.tlMedia=Oe.timeline(),ot.isDesktop&&this.tlMedia.add(this.headFace.animateMoveLeft(),0)}handleScribblesHide(){this.scribbles.animateHide()}addEventListeners(){this.offScroll=hm(this.handleScroll.bind(this)),this.offFaceDragStart=Be.on(Fe.FACE_DRAG_START,this.handleDragStart.bind(this)),this.offFaceDragEnd=Be.on(Fe.FACE_DRAG_END,this.handleFaceEnd.bind(this)),this.offFingerDragStart=Be.on(Fe.FINGER_DRAG_START,this.handleDragStart.bind(this)),this.offFingerDragEnd=Be.on(Fe.FINGER_DRAG_END,this.handleFaceEnd.bind(this)),this.offScribblesHide=Be.on(Fe.SCRIBBLES_HIDE,this.handleScribblesHide.bind(this))}removeEventListeners(){this.offScroll(),this.offFaceDragStart(),this.offFaceDragEnd(),this.offFingerDragStart(),this.offFingerDragEnd(),this.offScribblesHide()}handleAfterLoad(){this.initComponents(),je.isActive&&this.initDebug()}handleResize(){super.handleResize()}handleScroll({y:e}){if(ot.isDesktop)return;const t=e/this.sceneVars.height,i=.25;t>i&&!this.isHeadHidden?(this.isHeadHidden=!0,this.headFace.animateHide(),this.scribbles.animateHide()):t<=i&&this.isHeadHidden&&(this.isHeadHidden=!1,this.headFace.animateShow(),this.scribbles.animateShow())}handleFirstRender(){Be.trigger(Fe.FIRST_RENDER),this.animateShow()}handleDragStart(){this.isDraggingSomething=!0}handleFaceEnd(){this.isDraggingSomething=!1}handleUIShow(){this.animateUIShow()}handleUIHide(){this.animateUIHide()}update(e,t){this.isActive&&(this.hasFirstRender||(this.hasFirstRender=!0,this.handleFirstRender()),this.raycaster.setFromCamera(Ln.positionRelCenter,this.currentCamera),this.entities.forEach(i=>{i&&i.update(e,t)}),this.renderer.setRenderTarget(this.renderTarget),this.renderer.clear(),this.composer?this.composer.render():this.renderer.render(this.scene,this.currentCamera),this.renderer.setRenderTarget(null))}updateQuarter(e,t){this.entities.forEach(i=>{i&&i.updateQuarter&&i.updateQuarter(e,t)})}}class JL extends Aa{constructor(e){super(e)}createMesh(){this.spriteIndex=0,this.spriteIndexMax=4,this.spriteRowCount=this.data.textures.default.row,this.spriteColCount=this.data.textures.default.col,this.group=new Vt;const e=2,t=new Sn(e,e),i=Mi(Wn.headPartSkullFlames);this.material=new Wt({vertexShader:i.vert,fragmentShader:i.frag,uniforms:{uTime:{value:0},uColor:{value:new lt(16714550)},uTexMap:{value:this.scene.textures[this.data.spriteSheet]},uSpriteIndex:{value:this.spriteIndex},uSpriteRowCount:{value:this.spriteRowCount},uSpriteColCount:{value:this.spriteColCount}},transparent:!0,depthTest:!1,depthWrite:!1}),this.mesh=new Nt(t,this.material),this.mesh.renderOrder=this.data.renderOrder,this.mesh.position.set(this.data.position[0],this.data.position[1],this.data.position[2]),this.mesh.scale.set(this.data.scale[0],this.data.scale[1],this.data.scale[2]),this.group.add(this.mesh),this.parent.add(this.group),this.isActive=!0}update(e,t){super.update(e,t)}updateQuarter(e,t){super.updateQuarter(e,t),this.spriteIndex=(this.spriteIndex+1)%this.spriteIndexMax,this.material.uniforms.uSpriteIndex.value=this.spriteIndex}}class e2 extends Aa{constructor(e){super(e)}update(e,t){super.update(e,t)}updateQuarter(e,t){super.updateQuarter(e,t);const i=new z(this.data.position[0],this.data.position[1],this.data.position[2]);this.mesh.position.copy(i)}}class t2 extends Xb{constructor(e){super(e)}createParts(){[tr.top,tr.eyeLeft,tr.eyeRight,tr.nose].forEach(t=>{const i={name:t.name,scene:this.scene,parent:this.group,data:t,head:this},s=new Aa(i);this.parts.push(s)}),this.partFlames=new JL({name:tr.flames.name,scene:this.scene,parent:this.group,data:tr.flames,head:this}),this.partBottom=new e2({name:tr.bottom.name,scene:this.scene,parent:this.group,data:tr.bottom,head:this}),this.parts.push(this.partFlames,this.partBottom)}}class n2{constructor({name:e,scene:t,parent:i,config:s}){if(this.name=e||"ScribblesAlpha",this.scene=t,this.parent=i||t.root,this.sceneVars=t.sceneVars,this.entities=[],this.isActive=!1,this.config={color:{value:"#000000"}},s)for(const[r,o]of Object.entries(s))this.config[r]!==void 0&&(this.config[r].value=o);this.createScribbles(),this.isActive=!0}destroy(){this.isActive=!1,this.removeEventListeners()}initDebug(){je.isActive&&je.addEntity({name:this.name,config:this.config,scene:this.scene.name})}createScribbles(){this.group=new Vt,this.parent.add(this.group);const e={title:{position:[-.015,.295,0],rotation:[0,0,0],scale:[.925,.925,1],renderOrder:0,textureId:"scribbles_sheet",index:1,rowCount:3,colCount:4,color:"#FFFFFF",opacity:1},me:{position:ot.isMobile?[-.3,-.225,0]:[-.175,-.125,0],rotation:ot.isMobile?[0,0,Math.PI*.1]:[0,0,0],scale:ot.isMobile?[.475,.475,1]:[.5,.5,1],renderOrder:0,textureId:"scribbles_sheet",index:3,rowCount:3,colCount:4,color:"#FFFFFF",opacity:1},isaac:{position:[0,-.335,0],rotation:[0,0,0],scale:[.5,.5,1],renderOrder:0,textureId:"scribbles_sheet",index:7,rowCount:3,colCount:4,color:"#FFFFFF",opacity:1}};ot.isDesktop||delete e.isaac,Object.keys(e).forEach(t=>{const i=new qb({name:`Scribble ${t}`,scene:this.scene,parent:this.root,data:e[t]});this.entities.push(i)})}animateShow(){Ne(this.tlShow);const e=this.entities.map(i=>i.animScale),t=this.entities.map(i=>i.config.visibility);return this.tlShow=Oe.timeline().fromTo(e,{x:.5,y:.5,z:1},{x:1,y:1,z:1,duration:1,stagger:.035,ease:"elastic.out(1.0,0.3)"},.1).fromTo(t,{value:0},{value:1,duration:.3,stagger:.035,ease:"steps(12)"},0),this.tlShow}animateHide(){Ne(this.tlHide);const e=this.entities.map(i=>i.animScale),t=this.entities.map(i=>i.config.visibility);return this.tlHide=Oe.timeline().to(e,{x:.75,y:.75,z:1,duration:.25,stagger:.02,ease:"elastic.in(1.0,0.3)"},0).to(t,{value:0,duration:.2,stagger:.02,ease:"steps(10)"},.1),this.tlHide}addEventListeners(){}removeEventListeners(){}handleResize(){this.entities.forEach(e=>{e.handleResize()})}handleAssetsLoad(){}update(e,t){this.isActive&&this.entities.forEach(i=>{i.update(e,t)})}updateQuarter(e,t){this.entities.forEach(i=>{i.updateQuarter(e,t)})}}class i2 extends Ib{constructor(e){super(e),this.name="Scene Three Sub Beta",this.currentCamera=null,this.entities=[],this.textures=this.parentScene.textures,this.isHoveringFace=!1,this.init()}init(){this.root=new Vt,this.scene.add(this.root),ot.isDesktop||this.root.position.set(0,.25,0),this.initCamera(),this.initRaycast()}initCamera(){this.camera=new Pn(45,this.sceneVars.aspectRatio,.1,1e3),this.camera.position.set(0,0,5),this.camera.lookAt(0,0,0),this.currentCamera=this.camera}initRaycast(){this.raycaster=new Lx}initComponents(){this.background=new Ub({scene:this,parent:this.root,config:{color:"#1F1A1B"}}),this.entities=[...this.entities,this.background],this.partsWrapper=new Vt,this.root.add(this.partsWrapper),this.headSkull=new t2({scene:this,parent:this.partsWrapper}),this.entities.push(this.headSkull),this.scribbles=new n2({scene:this,parent:this.root}),this.entities.push(this.scribbles)}initDebug(){je.addScene(this.name,!0)}loadTextures(){return[]}loadModels(){return[]}addEventListeners(){this.offScroll=hm(this.handleScroll.bind(this))}removeEventListeners(){this.offScroll()}handleAfterLoad(){this.initComponents(),je.isActive&&this.initDebug()}handleResize(){super.handleResize()}handleScroll({y:e}){if(ot.isDesktop)return;const t=e/this.sceneVars.height,i=.25;t>i&&!this.isHeadHidden?(this.isHeadHidden=!0,this.headSkull.animateHide(),this.scribbles.animateHide()):t<=i&&this.isHeadHidden&&(this.isHeadHidden=!1,this.headSkull.animateShow(),this.scribbles.animateShow())}handleUIShow(){this.scribbles.group.visible=!1,this.headSkull.group.visible=!1,this.headSkull.isInteractive=!1}handleUIHide(){this.scribbles.group.visible=!0,this.headSkull.group.visible=!0,this.headSkull.isInteractive=!0}handleMediaShow(){}handleMediaHide(){}update(e,t){this.isActive&&(this.raycaster.setFromCamera(Ln.positionRelCenter,this.currentCamera),this.entities.forEach(i=>{i&&i.update(e,t)}),this.renderer.setRenderTarget(this.renderTarget),this.renderer.clear(),this.composer?this.composer.render():this.renderer.render(this.scene,this.currentCamera),this.renderer.setRenderTarget(null))}updateQuarter(e,t){this.entities.forEach(i=>{i&&i.updateQuarter&&i.updateQuarter(e,t)})}}const s2=()=>{const n=Mi(Wn.subComposition);let e=20;return ot.isMobile&&(e=4),ot.isTablet&&(e=16),new Wt({defines:{},uniforms:{uTimeQuarter:{value:0},uScreenRes:{value:[1,1]},uTex:{value:null},uTexAlpha:{value:null},uTexBeta:{value:null},uTexFlow:{value:null},uTexNoiseBlue:{value:null},uTexNoiseColor:{value:null},uMosaicResX:{value:e},uMobileWipe:{value:0}},vertexShader:n.vert,fragmentShader:n.frag})};class r2 extends AP{constructor(){super(s2(),"uTex"),this._uniforms=this.fullscreenMaterial.uniforms,this._defines=this.fullscreenMaterial.defines}get timeQuarter(){return this._uniforms.uTimeQuarter.value}set timeQuarter(e){this._uniforms.uTimeQuarter.value=e}get screenRes(){return this._uniforms.uScreenRes.value}set screenRes(e){this._uniforms.uScreenRes.value=e}get texAlpha(){return this._uniforms.uTexAlpha.value}set texAlpha(e){this._uniforms.uTexAlpha.value=e}get texBeta(){return this._uniforms.uTexBeta.value}set texBeta(e){this._uniforms.uTexBeta.value=e}get texFlow(){return this._uniforms.uTexFlow.value}set texFlow(e){this._uniforms.uTexFlow.value=e}get texNoiseBlue(){return this._uniforms.uTexNoiseBlue.value}set texNoiseBlue(e){this._uniforms.uTexNoiseBlue.value=e}get texNoiseColor(){return this._uniforms.uTexNoiseColor.value}set texNoiseColor(e){this._uniforms.uTexNoiseColor.value=e}get mobileWipe(){return this._uniforms.uMobileWipe.value}set mobileWipe(e){this._uniforms.uMobileWipe.value=e}}class o2{constructor(e,{size:t,falloff:i,alpha:s,dissipation:r,scaleFrame:o,scaleFrameVelocity:a,curlIntensity:l,type:c}={size:128,falloff:.25,alpha:1,dissipation:.975,scaleFrame:1.1,scaleFrameVelocity:.1,curlIntensity:.005,type:Fs}){this.scene=e,this.renderer=e.renderer,this.sceneVars=e.sceneVars,this.isActive=!!ot.isDesktop,this.isInteractive=!0,this.isDraggingEntity=!1,this.size=t,this.falloff=i,this.alpha=s,this.dissipation=r,this.scaleFrame=o,this.scaleFrameVelocity=a,this.curlIntensity=l,this.type=c,this.output={value:null},this.oldClearColor=new lt,this.dummyCamera=new Vu,this.createMask(),this.createFBOs(),this.createMesh(),this.addEventListeners()}destroy(){console.log("Flowmap.js:53","MISSING DESTROY LOGIC"),this.removeEventListeners()}createMask(){this.mask={read:null,write:null,swap:()=>{let e=this.mask.read;this.mask.read=this.mask.write,this.mask.write=e,this.output.value=this.mask.read.texture}}}createFBOs(){this.type||(this.type=Fs);const e={width:this.size,height:this.size,options:{type:this.type,format:vi,depthBuffer:!1,stencilBuffer:!1}};this.mask.read=new ai(e.width,e.height,e.options),this.mask.read.texture.name="Flowmap Read",this.mask.read.texture.generateMipmaps=!1,this.mask.write=new ai(e.width,e.height,e.options),this.mask.write.texture.name="Flowmap Write",this.mask.write.texture.generateMipmaps=!1,this.mask.swap()}createFullscreenTriangle(){const e=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),t=new Float32Array([0,0,2,0,0,2]),i=new Vs;return i.setAttribute("position",new Nn(e,3)),i.setAttribute("uv",new Nn(t,2)),i}createMesh(){this.geometry=this.createFullscreenTriangle();const e=Mi(Wn.flowmapSmoke);this.material=new Wt({vertexShader:e.vert,fragmentShader:e.frag,uniforms:{uMap:this.output,uFalloff:{value:this.falloff*.5},uAlpha:{value:this.alpha},uDissipation:{value:this.dissipation},uScaleFrame:{value:this.scaleFrame},uScaleFrameVelocity:{value:this.scaleFrameVelocity},uCurlIntensity:{value:this.curlIntensity},uScreenRes:{value:[this.sceneVars.width,this.sceneVars.height]},uAspectRatio:{value:this.sceneVars.aspectRatio},uTime:{value:1},uMouse:{value:new qe},uVelocity:{value:new qe},uStampFactor:{value:0}},depthTest:!1,depthWrite:!1}),this.mesh=new Nt(this.geometry,this.material)}addEventListeners(){this.offFaceDragStart=Be.on(Fe.FACE_DRAG_START,this.handleFaceDragStart.bind(this)),this.offFaceDragEnd=Be.on(Fe.FACE_DRAG_END,this.handleFaceDragEnd.bind(this)),this.offFingerDragStart=Be.on(Fe.FINGER_DRAG_START,this.handleFingerDragStart.bind(this)),this.offFingerDragEnd=Be.on(Fe.FINGER_DRAG_END,this.handleFingerDragEnd.bind(this))}removeEventListeners(){this.offFaceDragStart(),this.offFaceDragEnd(),this.offFingerDragStart(),this.offFingerDragEnd()}handleResize(){this.material.uniforms.uScreenRes.value=[this.sceneVars.width,this.sceneVars.height],this.material.uniforms.uAspectRatio.value=this.sceneVars.aspectRatio}handleFaceDragStart(){this.isDraggingEntity=!0}handleFaceDragEnd(){this.isDraggingEntity=!1}handleFingerDragStart(){this.isDraggingEntity=!0}handleFingerDragEnd(){this.isDraggingEntity=!1}handleUIShow(){this.isInteractive=!1}handleUIHide(){this.isInteractive=!0}update(e,t){if(!this.isActive)return;const i=Ln.isDown&&!this.isDraggingEntity&&this.isInteractive;this.material.uniforms.uTime.value=e*.001,this.material.uniforms.uMouse.value=Ln.positionEasedRel,this.material.uniforms.uVelocity.value=Ln.velocityEased,this.material.uniforms.uStampFactor.value=i?1:0,this.renderer.getClearColor(this.oldClearColor);const s=this.renderer.getClearAlpha(),r=this.renderer.autoClear;this.renderer.autoClear=!1,this.renderer.setClearColor(0,1),this.renderer.setRenderTarget(this.mask.write),this.renderer.clear(),this.renderer.render(this.mesh,this.dummyCamera),this.renderer.setClearColor(this.oldClearColor,s),this.renderer.autoClear=r,this.renderer.setRenderTarget(null),this.mask.swap()}}const uv={textures:{commons:{white:{src:"webgl/textures/commons/white.jpg",options:["repeat"]},black:{src:"webgl/textures/commons/black.jpg",options:["repeat"]}},noises:{noise_blue_1:{src:"webgl/textures/noises/noise_blue_1.webp",options:["repeat"]},noise_perlin_color:{src:"webgl/textures/noises/noise_perlin_color.webp",options:["repeat"]}},placeholders:{uv_check:{src:"webgl/textures/placeholders/uv_check.png",options:["repeat"]},face_merge:{src:"webgl/textures/placeholders/face-merge-alpha.png",options:["repeat","flipY","nearestFilter"]},skull_merge:{src:"webgl/textures/placeholders/skull-merge-alpha.png",options:["repeat","flipY","nearestFilter"]}},scribbles:{scribbles_sheet:{src:"webgl/textures/scribbles/tex_scribbles_2.webp",options:["repeat","flipY","nearestFilter"]},scribbles_about_sheet:{src:"webgl/textures/scribbles/tex_about.webp",options:["repeat","flipY","nearestFilter"]}},hand:{hand_sheet:{src:"webgl/textures/hand/tex_hand.webp",options:["repeat","flipY","nearestFilter"]}},headParts:{sheet_skull_flames:{src:"webgl/textures/headParts/tex_sheet_flames_bw.webp",options:["clamp","flipY","nearestFilter"]},sheet_parts_1:{src:"webgl/textures/headParts/tex_sheet_parts_1.webp",options:["clamp","flipY","nearestFilter"]},sheet_parts_2:{src:"webgl/textures/headParts/tex_sheet_parts_2.webp",options:["clamp","flipY","nearestFilter"]}},pbr:{}}},a2=new mP,l2=n=>{let e=()=>{};const t=new Promise(s=>{e=s}),i=a2.load(n.src,e);return i.colorSpace=zt,i.loaded=t,n.options&&(n.options.includes("repeat")&&(i.wrapS=wl,i.wrapT=wl),n.options.includes("clamp")&&(i.wrapS=As,i.wrapT=As),n.options.includes("flipY")?i.flipY=!0:i.flipY=!1,n.options.includes("nomipmaps")&&(i.generateMipmaps=!1),n.options.includes("nearestFilter")&&(i.magFilter=vn,i.minFilter=vn)),i};class c2 extends Lb{constructor(e){super(e),this.props=e,this.name="Scene Three Sub",this.currentCamera=null,this.entities=[],this.textures={},this.stepQuarterRender=0,this.init()}enable(){super.enable(),this.subscenes.forEach(e=>{e.enable()})}disable(){super.disable(),this.subscenes.forEach(e=>{e.disable()})}destroy(){super.destroy(),this.subscenes.forEach(e=>{e.destroy()})}init(){this.root=new Vt,this.scene.add(this.root),this.initCamera(),this.initPost(),this.initSubscenes(),this.initComponents()}initSubscenes(){this.subsceneAlpha=new QL({...this.props,parentScene:this}),this.subsceneBeta=new i2({...this.props,parentScene:this}),this.subscenes=[this.subsceneAlpha,this.subsceneBeta]}initComponents(){this.flowmap=new o2(this,{size:128,falloff:.6,alpha:1,dissipation:.985,scaleFrame:.9925,scaleFrameVelocity:0,curlIntensity:.01,type:Fs}),this.entities=[...this.entities,this.flowmap]}initCamera(){this.camera=new Pn(45,this.sceneVars.aspectRatio,.1,1e3),this.camera.position.set(0,0,5),this.camera.lookAt(0,0,0),this.currentCamera=this.camera}initPost(){const e=this.renderer.getContext(),t=e.getParameter(e.MAX_SAMPLES);this.composer=new TP(this.renderer,{frameBufferType:Fs,multisampling:ot.isDesktop?Math.min(2,t):0}),this.composer.setSize(this.sceneVars.width,this.sceneVars.height),this.passSubComposition=new r2,this.composer.addPass(this.passSubComposition)}initDebug(){je.addScene(this.name,!0)}load(){let e=[];return this.hasLoaded?(this.shouldTriggerLoadEvents&&(Be.trigger(Fe.WEBGL_LOAD_PROGRESS,{progress:1}),Be.trigger(Fe.WEBGL_LOAD_COMPLETE)),e):(e=[...e,...this.loadTextures()],e=[...e,...this.loadModels()],this.subscenes.forEach((i,s)=>{e=[...e,i.load()]}),this.manageLoadPromises(e,{start:Fe.WEBGL_LOAD_START,progress:Fe.WEBGL_LOAD_PROGRESS,complete:Fe.WEBGL_LOAD_COMPLETE},this.handleAssetsLoad.bind(this)))}loadTextures(){const e=[],t=i=>{for(const s in uv.textures[i]){const r=uv.textures[i][s],o=l2(r);this.textures[s]=o,e.push(o.loaded)}};return t("commons"),t("noises"),t("scribbles"),t("hand"),t("headParts"),e}loadModels(){return[]}addEventListeners(){this.offUIShow=Be.on(Fe.UI_SHOW,this.handleUIShow.bind(this)),this.offUIHide=Be.on(Fe.UI_HIDE,this.handleUIHide.bind(this)),this.offMediaShow=Be.on(Fe.MEDIA_SHOW,this.handleMediaShow.bind(this)),this.offMediaHide=Be.on(Fe.MEDIA_HIDE,this.handleMediaHide.bind(this)),this.offMobileSwitchToggle=Be.on(Fe.MOBILE_SWITCH_TOGGLE,this.handleMobileSwitchToggle.bind(this))}removeEventListeners(){this.offUIShow(),this.offUIHide(),this.offMediaShow(),this.offMediaHide(),this.offMobileSwitchToggle()}handleAfterLoad(){je.isActive&&this.initDebug(),this.composer&&(this.passSubComposition.texAlpha=this.subsceneAlpha.renderTarget.texture,this.passSubComposition.texBeta=this.subsceneBeta.renderTarget.texture,this.passSubComposition.texFlow=this.flowmap.output.value,this.passSubComposition.texNoiseBlue=this.textures.noise_blue_1,this.passSubComposition.texNoiseColor=this.textures.noise_perlin_color)}handleResize(){super.handleResize(),this.composer&&(this.composer.setSize(this.sceneVars.width,this.sceneVars.height),this.passSubComposition.screenRes=[this.sceneVars.width,this.sceneVars.height]),this.subscenes.forEach(e=>{e.handleResize()})}handleUIShow(){this.flowmap.handleUIShow(),this.subscenes.forEach(e=>{e.handleUIShow()})}handleUIHide(){this.flowmap.handleUIHide(),this.subscenes.forEach(e=>{e.handleUIHide()})}handleMediaShow(){this.subscenes.forEach(e=>{e.handleMediaShow()})}handleMediaHide(){this.subscenes.forEach(e=>{e.handleMediaHide()})}handleMobileSwitchToggle({isSwitchOn:e}){Ne(this.tlMobileWipe),this.tlMobileWipe=Oe.timeline().to(this.passSubComposition,{mobileWipe:e?0:1,duration:.75,ease:"power3.out"})}update(e,t){this.isActive&&(this.stepQuarterRender=(this.stepQuarterRender+1)%16,this.stepQuarterRender===0&&this.updateQuarter(e,t),this.entities.forEach(i=>{i&&i.update(e,t)}),this.subscenes.forEach(i=>{i&&i.update(e,t)}),this.composer&&this.composer.render())}updateQuarter(e,t){this.entities.forEach(i=>{i&&i.updateQuarter&&i.updateQuarter(e,t)}),this.subscenes.forEach(i=>{i&&i.updateQuarter&&i.updateQuarter(e,t)}),this.passSubComposition.timeQuarter=e*.001}}class u2{constructor({canvas:e}){this.canvas=e,this.isRendering=!1,this.isWindowVisible=!0,this.isDesktop=ot.isDesktop,window.isDesktop=this.isDesktop,this.initRenderer(),this.sceneSub=new c2({manager:this,isDesktop:this.isDesktop}),this.currentScene=null,this.addEventListeners(),this.isRendering=!0}destroy(){this.currentScene.destroy(),this.currentScene=null,this.removeEventListeners(),je.isActive&&je.clear()}initRenderer(){this.pixelRatio=Math.min(window.devicePixelRatio?window.devicePixelRatio:1,2),this.renderer=new hP({canvas:this.canvas,antialias:!1,stencil:!1,depth:!0,alpha:!1,powerPreference:"high-performance"}),this.renderer.outputColorSpace=zt,this.renderer.setPixelRatio(this.pixelRatio),this.renderer.setClearColor(new lt(16714550),1),this.gl=this.renderer.gl}findScene(e){switch(e.name){case"sub":return this.sceneSub;default:return this.sceneSub}}setScene(e){this.currentScene=e}addEventListeners(){this.isDesktop&&(this.debouncedHandleResize=bL(this.handleResize.bind(this),33),window.addEventListener("resize",this.debouncedHandleResize,{passive:!0}),this.resizeObserver=new ResizeObserver(this.debouncedHandleResize),this.resizeObserver.observe(this.canvas.parentNode)),this.bindedHandleVisibilityChange=this.handleVisibilityChange.bind(this),document.addEventListener("visibilitychange",this.bindedHandleVisibilityChange)}removeEventListeners(){this.isDesktop&&(window.removeEventListener("resize",this.debouncedHandleResize),this.resizeObserver.disconnect()),document.removeEventListener("visibilitychange",this.bindedHandleVisibilityChange)}handleResize(){const e=this.canvas.parentNode;this.renderer.setSize(e.offsetWidth,e.offsetHeight),this.pixelRatio=Math.min(window.devicePixelRatio?window.devicePixelRatio:1,2),this.renderer.setPixelRatio(this.pixelRatio),this.currentScene.handleResize()}async handleRouteChange({route:e}){this.currentScene.disable(),this.currentScene=this.findScene(e),await this.currentScene.load(),this.currentScene.enable()}handleVisibilityChange(){const e=document.visibilityState==="visible";this.isWindowVisible=e,this.currentScene&&this.currentScene.handleVisibilityChange(e)}update(e=0,t=0){this.isRendering&&this.isWindowVisible&&this.currentScene&&(je.isActive&&je.fpsCaptureBegin(),this.currentScene.update(e,t),je.isActive&&je.fpsCaptureEnd())}}const Ei=(n,e)=>{const t=n.__vccOpts||n;for(const[i,s]of e)t[i]=s;return t},h2={class:"webgl-container"},f2={__name:"WebglContainer",setup(n){const e=lw(),t=cw(),i=at(null);let s=null;return ci(async()=>{await e.isReady(),s=new u2({canvas:i.value});const r=s.findScene("sub");s.setScene(r),await r.load(),r.enable(),cl(t,async o=>{s.handleRouteChange({route:o})}),_u.subscribe("webgl",s.update.bind(s))}),yi(()=>{_u.unsubscribe("webgl"),s.destroy()}),(r,o)=>(tn(),Vn("div",h2,[Ke("canvas",{ref_key:"refCanvas",ref:i,class:"webgl-container__canvas"},null,512)]))}},d2=Ei(f2,[["__scopeId","data-v-751cee21"]]),p2={class:"content"},m2={__name:"App",setup(n){return ci(()=>{window.history.scrollRestoration="manual"}),(e,t)=>(tn(),Vn(Ri,null,[Ft(d2),Ke("div",p2,[Ft(Oi(tx))])],64))}};/*!
 * OverlayScrollbars
 * Version: 2.11.4
 *
 * Copyright (c) Rene Haas | KingSora.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 */const Kn=(n,e)=>{const{o:t,i,u:s}=n;let r=t,o;const a=(u,h)=>{const f=r,d=u,g=h||(i?!i(f,d):f!==d);return(g||s)&&(r=d,o=f),[r,g,o]};return[e?u=>a(e(r,o),u):a,u=>[r,!!u,o]]},g2=typeof window<"u"&&typeof HTMLElement<"u"&&!!window.document,On=g2?window:{},$b=Math.max,_2=Math.min,Kd=Math.round,vu=Math.abs,hv=Math.sign,Yb=On.cancelAnimationFrame,fm=On.requestAnimationFrame,dm=On.setTimeout,jb=On.clearTimeout,Ku=n=>typeof On[n]<"u"?On[n]:void 0,v2=Ku("MutationObserver"),fv=Ku("IntersectionObserver"),ko=Ku("ResizeObserver"),il=Ku("ScrollTimeline"),pm=n=>n===void 0,Zu=n=>n===null,Os=n=>typeof n=="number",jl=n=>typeof n=="string",Qu=n=>typeof n=="boolean",zi=n=>typeof n=="function",Bi=n=>Array.isArray(n),xu=n=>typeof n=="object"&&!Bi(n)&&!Zu(n),mm=n=>{const e=!!n&&n.length,t=Os(e)&&e>-1&&e%1==0;return Bi(n)||!zi(n)&&t?e>0&&xu(n)?e-1 in n:!0:!1},bu=n=>!!n&&n.constructor===Object,Su=n=>n instanceof HTMLElement,Ju=n=>n instanceof Element;function Mt(n,e){if(mm(n))for(let t=0;t<n.length&&e(n[t],t,n)!==!1;t++);else n&&Mt(Object.keys(n),t=>e(n[t],t,n));return n}const Kb=(n,e)=>n.indexOf(e)>=0,Nl=(n,e)=>n.concat(e),Ot=(n,e,t)=>(!jl(e)&&mm(e)?Array.prototype.push.apply(n,e):n.push(e),n),Cr=n=>Array.from(n||[]),gm=n=>Bi(n)?n:!jl(n)&&mm(n)?Cr(n):[n],yu=n=>!!n&&!n.length,Zd=n=>Cr(new Set(n)),ri=(n,e,t)=>{Mt(n,s=>s?s.apply(void 0,e||[]):!0),t||(n.length=0)},Zb="paddingTop",Qb="paddingRight",Jb="paddingLeft",eS="paddingBottom",tS="marginLeft",nS="marginRight",iS="marginBottom",_m="overflowX",vm="overflowY",eh="width",th="height",Ts="visible",Ii="hidden",ba="scroll",x2=n=>{const e=String(n||"");return e?e[0].toUpperCase()+e.slice(1):""},nh=(n,e,t,i)=>{if(n&&e){let s=!0;return Mt(t,r=>{const o=n[r],a=e[r];o!==a&&(s=!1)}),s}return!1},sS=(n,e)=>nh(n,e,["w","h"]),Kc=(n,e)=>nh(n,e,["x","y"]),b2=(n,e)=>nh(n,e,["t","r","b","l"]),Ze=(n,...e)=>n.bind(0,...e),zo=n=>{let e;const t=n?dm:fm,i=n?jb:Yb;return[s=>{i(e),e=t(()=>s(),zi(n)?n():n)},()=>i(e)]},dv=n=>{const e=zi(n)?n():n;if(Os(e)){const t=e?dm:fm,i=e?jb:Yb;return s=>{const r=t(()=>s(),e);return()=>{i(r)}}}return e&&e._},Mu=(n,e)=>{const{p:t,v:i,S:s,m:r}=e||{};let o,a,l,c,u;const h=function(m){a&&a(),o&&o(),u=a=o=l=void 0,n.apply(this,m)},f=_=>r&&l?r(l,_):_,d=()=>{a&&h(f(c)||c)},g=function(){const m=Cr(arguments),p=dv(t);if(p){const x=dv(i),v=f(m)||m,C=h.bind(0,v);a&&a(),s&&!u?(C(),u=!0,a=p(()=>u=void 0)):(a=p(C),x&&!o&&(o=x(d))),l=c=v}else h(m)};return g.O=d,g},rS=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),ki=n=>n?Object.keys(n):[],ft=(n,e,t,i,s,r,o)=>{const a=[e,t,i,s,r,o];return(typeof n!="object"||Zu(n))&&!zi(n)&&(n={}),Mt(a,l=>{Mt(l,(c,u)=>{const h=l[u];if(n===h)return!0;const f=Bi(h);if(h&&bu(h)){const d=n[u];let g=d;f&&!Bi(d)?g=[]:!f&&!bu(d)&&(g={}),n[u]=ft(g,h)}else n[u]=f?h.slice():h})}),n},oS=(n,e)=>Mt(ft({},n),(t,i,s)=>{t===void 0?delete s[i]:t&&bu(t)&&(s[i]=oS(t))}),xm=n=>!ki(n).length,Bl=()=>{},aS=(n,e,t)=>$b(n,_2(e,t)),so=n=>Zd((Bi(n)?n:(n||"").split(" ")).filter(e=>e)),bm=(n,e)=>n&&n.getAttribute(e),pv=(n,e)=>n&&n.hasAttribute(e),Ss=(n,e,t)=>{Mt(so(e),i=>{n&&n.setAttribute(i,String(t||""))})},Wi=(n,e)=>{Mt(so(e),t=>n&&n.removeAttribute(t))},ih=(n,e)=>{const t=so(bm(n,e)),i=Ze(Ss,n,e),s=(r,o)=>{const a=new Set(t);return Mt(so(r),l=>{a[o](l)}),Cr(a).join(" ")};return{$:r=>i(s(r,"delete")),C:r=>i(s(r,"add")),H:r=>{const o=so(r);return o.reduce((a,l)=>a&&t.includes(l),o.length>0)}}},lS=(n,e,t)=>(ih(n,e).$(t),Ze(Sm,n,e,t)),Sm=(n,e,t)=>(ih(n,e).C(t),Ze(lS,n,e,t)),Eu=(n,e,t,i)=>(i?Sm:lS)(n,e,t),ym=(n,e,t)=>ih(n,e).H(t),cS=n=>ih(n,"class"),uS=(n,e)=>{cS(n).$(e)},Mm=(n,e)=>(cS(n).C(e),Ze(uS,n,e)),hS=(n,e)=>{const t=e?Ju(e)&&e:document;return t?Cr(t.querySelectorAll(n)):[]},S2=(n,e)=>{const t=e?Ju(e)&&e:document;return t&&t.querySelector(n)},Qd=(n,e)=>Ju(n)&&n.matches(e),fS=n=>Qd(n,"body"),Jd=n=>n?Cr(n.childNodes):[],kl=n=>n&&n.parentElement,Ho=(n,e)=>Ju(n)&&n.closest(e),ep=n=>document.activeElement,y2=(n,e,t)=>{const i=Ho(n,e),s=n&&S2(t,i),r=Ho(s,e)===i;return i&&s?i===n||s===n||r&&Ho(Ho(n,t),e)!==i:!1},Sa=n=>{Mt(gm(n),e=>{const t=kl(e);e&&t&&t.removeChild(e)})},In=(n,e)=>Ze(Sa,n&&e&&Mt(gm(e),t=>{t&&n.appendChild(t)}));let dS;const M2=()=>dS,E2=n=>{dS=n},ia=n=>{const e=document.createElement("div");return Ss(e,"class",n),e},pS=n=>{const e=ia(),t=M2(),i=n.trim();return e.innerHTML=t?t.createHTML(i):i,Mt(Jd(e),s=>Sa(s))},mv=(n,e)=>n.getPropertyValue(e)||n[e]||"",mS=n=>{const e=n||0;return isFinite(e)?e:0},Oc=n=>mS(parseFloat(n||"")),tp=n=>Math.round(n*1e4)/1e4,gS=n=>`${tp(mS(n))}px`;function zl(n,e){n&&e&&Mt(e,(t,i)=>{try{const s=n.style,r=Zu(t)||Qu(t)?"":Os(t)?gS(t):t;i.indexOf("--")===0?s.setProperty(i,r):s[i]=r}catch{}})}function as(n,e,t){const i=jl(e);let s=i?"":{};if(n){const r=On.getComputedStyle(n,t)||n.style;s=i?mv(r,e):Cr(e).reduce((o,a)=>(o[a]=mv(r,a),o),s)}return s}const gv=(n,e,t)=>{const i=e?`${e}-`:"",s=t?`-${t}`:"",r=`${i}top${s}`,o=`${i}right${s}`,a=`${i}bottom${s}`,l=`${i}left${s}`,c=as(n,[r,o,a,l]);return{t:Oc(c[r]),r:Oc(c[o]),b:Oc(c[a]),l:Oc(c[l])}},Sf=(n,e)=>`translate${xu(n)?`(${n.x},${n.y})`:`${e?"X":"Y"}(${n})`}`,w2=n=>!!(n.offsetWidth||n.offsetHeight||n.getClientRects().length),T2={w:0,h:0},sh=(n,e)=>e?{w:e[`${n}Width`],h:e[`${n}Height`]}:T2,A2=n=>sh("inner",n||On),sa=Ze(sh,"offset"),_S=Ze(sh,"client"),wu=Ze(sh,"scroll"),Em=n=>{const e=parseFloat(as(n,eh))||0,t=parseFloat(as(n,th))||0;return{w:e-Kd(e),h:t-Kd(t)}},yf=n=>n.getBoundingClientRect(),C2=n=>!!n&&w2(n),np=n=>!!(n&&(n[th]||n[eh])),vS=(n,e)=>{const t=np(n);return!np(e)&&t},_v=(n,e,t,i)=>{Mt(so(e),s=>{n&&n.removeEventListener(s,t,i)})},Pt=(n,e,t,i)=>{var s;const r=(s=i&&i.T)!=null?s:!0,o=i&&i.I||!1,a=i&&i.A||!1,l={passive:r,capture:o};return Ze(ri,so(e).map(c=>{const u=a?h=>{_v(n,c,u,o),t&&t(h)}:t;return n&&n.addEventListener(c,u,l),Ze(_v,n,c,u,o)}))},xS=n=>n.stopPropagation(),ip=n=>n.preventDefault(),bS=n=>xS(n)||ip(n),es=(n,e)=>{const{x:t,y:i}=Os(e)?{x:e,y:e}:e||{};Os(t)&&(n.scrollLeft=t),Os(i)&&(n.scrollTop=i)},ei=n=>({x:n.scrollLeft,y:n.scrollTop}),SS=()=>({D:{x:0,y:0},M:{x:0,y:0}}),R2=(n,e)=>{const{D:t,M:i}=n,{w:s,h:r}=e,o=(h,f,d)=>{let g=hv(h)*d,_=hv(f)*d;if(g===_){const m=vu(h),p=vu(f);_=m>p?0:_,g=m<p?0:g}return g=g===_?0:g,[g+0,_+0]},[a,l]=o(t.x,i.x,s),[c,u]=o(t.y,i.y,r);return{D:{x:a,y:c},M:{x:l,y:u}}},Mf=({D:n,M:e})=>{const t=(i,s)=>i===0&&i<=s;return{x:t(n.x,e.x),y:t(n.y,e.y)}},vv=({D:n,M:e},t)=>{const i=(s,r,o)=>aS(0,1,(s-o)/(s-r)||0);return{x:i(n.x,e.x,t.x),y:i(n.y,e.y,t.y)}},sp=n=>{n&&n.focus&&n.focus({preventScroll:!0})},xv=(n,e)=>{Mt(gm(e),n)},rp=n=>{const e=new Map,t=(r,o)=>{if(r){const a=e.get(r);xv(l=>{a&&a[l?"delete":"clear"](l)},o)}else e.forEach(a=>{a.clear()}),e.clear()},i=(r,o)=>{if(jl(r)){const c=e.get(r)||new Set;return e.set(r,c),xv(u=>{zi(u)&&c.add(u)},o),Ze(t,r,o)}Qu(o)&&o&&t();const a=ki(r),l=[];return Mt(a,c=>{const u=r[c];u&&Ot(l,i(c,u))}),Ze(ri,l)},s=(r,o)=>{Mt(Cr(e.get(r)),a=>{o&&!yu(o)?a.apply(0,o):a()})};return i(n||{}),[i,t,s]},yS={},MS={},P2=n=>{Mt(n,e=>Mt(e,(t,i)=>{yS[i]=e[i]}))},ES=(n,e,t)=>ki(n).map(i=>{const{static:s,instance:r}=n[i],[o,a,l]=t||[],c=t?r:s;if(c){const u=t?c(o,a,e):c(e);return(l||MS)[i]=u}}),Kl=n=>MS[n],D2="__osOptionsValidationPlugin",Ca="data-overlayscrollbars",Zc="os-environment",Fc=`${Zc}-scrollbar-hidden`,Ef=`${Ca}-initialize`,Qc="noClipping",bv=`${Ca}-body`,gr=Ca,L2="host",ys=`${Ca}-viewport`,I2=_m,U2=vm,O2="arrange",wS="measuring",F2="scrolling",TS="scrollbarHidden",N2="noContent",op=`${Ca}-padding`,Sv=`${Ca}-content`,wm="os-size-observer",B2=`${wm}-appear`,k2=`${wm}-listener`,z2="os-trinsic-observer",H2="os-theme-none",ui="os-scrollbar",V2=`${ui}-rtl`,G2=`${ui}-horizontal`,W2=`${ui}-vertical`,AS=`${ui}-track`,Tm=`${ui}-handle`,X2=`${ui}-visible`,q2=`${ui}-cornerless`,yv=`${ui}-interaction`,Mv=`${ui}-unusable`,ap=`${ui}-auto-hide`,Ev=`${ap}-hidden`,wv=`${ui}-wheel`,$2=`${AS}-interactive`,Y2=`${Tm}-interactive`,j2="__osSizeObserverPlugin",K2=(n,e)=>{const{k:t}=e,[i,s]=n("showNativeOverlaidScrollbars");return[i&&t.x&&t.y,s]},Vo=n=>n.indexOf(Ts)===0,Z2=n=>n.replace(`${Ts}-`,""),lp=(n,e)=>{if(n==="auto")return e?ba:Ii;const t=n||Ii;return[Ii,ba,Ts].includes(t)?t:Ii},Q2=(n,e)=>{const{overflowX:t,overflowY:i}=as(n,[_m,vm]);return{x:lp(t,e.x),y:lp(i,e.y)}},CS="__osScrollbarsHidingPlugin",J2="__osClickScrollPlugin",Tv=n=>JSON.stringify(n,(e,t)=>{if(zi(t))throw 0;return t}),Av=(n,e)=>n?`${e}`.split(".").reduce((t,i)=>t&&rS(t,i)?t[i]:void 0,n):void 0,eI={paddingAbsolute:!1,showNativeOverlaidScrollbars:!1,update:{elementEvents:[["img","load"]],debounce:[0,33],attributes:null,ignoreMutation:null},overflow:{x:"scroll",y:"scroll"},scrollbars:{theme:"os-theme-dark",visibility:"auto",autoHide:"never",autoHideDelay:1300,autoHideSuspend:!1,dragScroll:!0,clickScroll:!1,pointers:["mouse","touch","pen"]}},RS=(n,e)=>{const t={},i=Nl(ki(e),ki(n));return Mt(i,s=>{const r=n[s],o=e[s];if(xu(r)&&xu(o))ft(t[s]={},RS(r,o)),xm(t[s])&&delete t[s];else if(rS(e,s)&&o!==r){let a=!0;if(Bi(r)||Bi(o))try{Tv(r)===Tv(o)&&(a=!1)}catch{}a&&(t[s]=o)}}),t},Cv=(n,e,t)=>i=>[Av(n,i),t||Av(e,i)!==void 0];let PS;const tI=()=>PS,nI=n=>{PS=n};let wf;const iI=()=>{const n=(v,C,A)=>{In(document.body,v),In(document.body,v);const T=_S(v),L=sa(v),M=Em(C);return A&&Sa(v),{x:L.h-T.h+M.h,y:L.w-T.w+M.w}},e=v=>{let C=!1;const A=Mm(v,Fc);try{C=as(v,"scrollbar-width")==="none"||as(v,"display","::-webkit-scrollbar")==="none"}catch{}return A(),C},t=`.${Zc}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${Zc} div{width:200%;height:200%;margin:10px 0}.${Fc}{scrollbar-width:none!important}.${Fc}::-webkit-scrollbar,.${Fc}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`,s=pS(`<div class="${Zc}"><div></div><style>${t}</style></div>`)[0],r=s.firstChild,o=s.lastChild,a=tI();a&&(o.nonce=a);const[l,,c]=rp(),[u,h]=Kn({o:n(s,r),i:Kc},Ze(n,s,r,!0)),[f]=h(),d=e(s),g={x:f.x===0,y:f.y===0},_={elements:{host:null,padding:!d,viewport:v=>d&&fS(v)&&v,content:!1},scrollbars:{slot:!0},cancel:{nativeScrollbarsOverlaid:!1,body:null}},m=ft({},eI),p=Ze(ft,{},m),x=Ze(ft,{},_),b={P:f,k:g,U:d,J:!!il,G:Ze(l,"r"),K:x,Z:v=>ft(_,v)&&x(),tt:p,nt:v=>ft(m,v)&&p(),ot:ft({},_),st:ft({},m)};if(Wi(s,"style"),Sa(s),Pt(On,"resize",()=>{c("r",[])}),zi(On.matchMedia)&&!d&&(!g.x||!g.y)){const v=C=>{const A=On.matchMedia(`(resolution: ${On.devicePixelRatio}dppx)`);Pt(A,"change",()=>{C(),v(C)},{A:!0})};v(()=>{const[C,A]=u();ft(b.P,C),c("r",[A])})}return b},ls=()=>(wf||(wf=iI()),wf),sI=(n,e,t)=>{let i=!1;const s=t?new WeakMap:!1,r=()=>{i=!0},o=a=>{if(s&&t){const l=t.map(c=>{const[u,h]=c||[];return[h&&u?(a||hS)(u,n):[],h]});Mt(l,c=>Mt(c[0],u=>{const h=c[1],f=s.get(u)||[];if(n.contains(u)&&h){const g=Pt(u,h,_=>{i?(g(),s.delete(u)):e(_)});s.set(u,Ot(f,g))}else ri(f),s.delete(u)}))}};return o(),[r,o]},Rv=(n,e,t,i)=>{let s=!1;const{et:r,ct:o,rt:a,it:l,lt:c,ut:u}=i||{},h=Mu(()=>s&&t(!0),{p:33,v:99}),[f,d]=sI(n,h,a),g=r||[],_=o||[],m=Nl(g,_),p=(b,v)=>{if(!yu(v)){const C=c||Bl,A=u||Bl,T=[],L=[];let M=!1,y=!1;if(Mt(v,D=>{const{attributeName:F,target:N,type:K,oldValue:j,addedNodes:H,removedNodes:W}=D,B=K==="attributes",pe=K==="childList",be=n===N,ue=B&&F,ce=ue&&bm(N,F||""),he=jl(ce)?ce:null,k=ue&&j!==he,G=Kb(_,F)&&k;if(e&&(pe||!be)){const ie=B&&k,U=ie&&l&&Qd(N,l),Z=(U?!C(N,F,j,he):!B||ie)&&!A(D,!!U,n,i);Mt(H,re=>Ot(T,re)),Mt(W,re=>Ot(T,re)),y=y||Z}!e&&be&&k&&!C(N,F,j,he)&&(Ot(L,F),M=M||G)}),d(D=>Zd(T).reduce((F,N)=>(Ot(F,hS(D,N)),Qd(N,D)?Ot(F,N):F),[])),e)return!b&&y&&t(!1),[!1];if(!yu(L)||M){const D=[Zd(L),M];return b||t.apply(0,D),D}}},x=new v2(Ze(p,!1));return[()=>(x.observe(n,{attributes:!0,attributeOldValue:!0,attributeFilter:m,subtree:e,childList:e,characterData:e}),s=!0,()=>{s&&(f(),x.disconnect(),s=!1)}),()=>{if(s)return h.O(),p(!0,x.takeRecords())}]};let Vr=null;const DS=(n,e,t)=>{const{ft:i}=t||{},s=Kl(j2),[r]=Kn({o:!1,u:!0});return()=>{const o=[],l=pS(`<div class="${wm}"><div class="${k2}"></div></div>`)[0],c=l.firstChild,u=h=>{const f=Bi(h)&&!yu(h);let d=!1,g=!1;if(f){const _=h[0],[m,,p]=r(_.contentRect),x=np(m);g=vS(m,p),d=!g&&!x}else g=h===!0;d||e({_t:!0,ft:g})};if(ko){if(!Qu(Vr)){const g=new ko(Bl);g.observe(n,{get box(){Vr=!0}}),Vr=Vr||!1,g.disconnect()}const h=Mu(u,{p:0,v:0}),f=g=>h(g),d=new ko(f);if(d.observe(Vr?n:c),Ot(o,[()=>{d.disconnect()},!Vr&&In(n,l)]),Vr){const g=new ko(f);g.observe(n,{box:"border-box"}),Ot(o,()=>g.disconnect())}}else if(s){const[h,f]=s(c,u,i);Ot(o,Nl([Mm(l,B2),Pt(l,"animationstart",h),In(n,l)],f))}else return Bl;return Ze(ri,o)}},rI=(n,e)=>{let t;const i=l=>l.h===0||l.isIntersecting||l.intersectionRatio>0,s=ia(z2),[r]=Kn({o:!1}),o=(l,c)=>{if(l){const u=r(i(l)),[,h]=u;return h&&!c&&e(u)&&[u]}},a=(l,c)=>o(c.pop(),l);return[()=>{const l=[];if(fv)t=new fv(Ze(a,!1),{root:n}),t.observe(s),Ot(l,()=>{t.disconnect()});else{const c=()=>{const u=sa(s);o(u)};Ot(l,DS(s,c)()),c()}return Ze(ri,Ot(l,In(n,s)))},()=>t&&a(!0,t.takeRecords())]},oI=(n,e,t,i)=>{let s,r,o,a,l,c;const u=`[${gr}]`,h=`[${ys}]`,f=["id","class","style","open","wrap","cols","rows"],{dt:d,vt:g,L:_,gt:m,ht:p,V:x,bt:b,wt:v,yt:C,St:A}=n,T=G=>as(G,"direction")==="rtl",L={Ot:!1,B:T(d)},M=ls(),y=Kl(CS),[D]=Kn({i:sS,o:{w:0,h:0}},()=>{const G=y&&y.R(n,e,L,M,t).Y,U=!(b&&x)&&ym(g,gr,Qc),Y=!x&&v(O2),Z=Y&&ei(m),re=Z&&A(),Pe=C(wS,U),P=Y&&G&&G(),I=wu(_),E=Em(_);return P&&P(),es(m,Z),re&&re(),U&&Pe(),{w:I.w+E.w,h:I.h+E.h}}),F=Mu(i,{p:()=>s,v:()=>r,m(G,ie){const[U]=G,[Y]=ie;return[Nl(ki(U),ki(Y)).reduce((Z,re)=>(Z[re]=U[re]||Y[re],Z),{})]}}),N=G=>{const ie=T(d);ft(G,{$t:c!==ie}),ft(L,{B:ie}),c=ie},K=(G,ie)=>{const[U,Y]=G,Z={Ct:Y};return ft(L,{Ot:U}),ie||i(Z),Z},j=({_t:G,ft:ie})=>{const Y=!(G&&!ie)&&M.U?F:i,Z={_t:G||ie,ft:ie};N(Z),Y(Z)},H=(G,ie)=>{const[,U]=D(),Y={xt:U};return N(Y),U&&!ie&&(G?i:F)(Y),Y},W=(G,ie,U)=>{const Y={Ht:ie};return N(Y),ie&&!U&&F(Y),Y},[B,pe]=p?rI(g,K):[],be=!x&&DS(g,j,{ft:!0}),[ue,ce]=Rv(g,!1,W,{ct:f,et:f}),he=x&&ko&&new ko(G=>{const ie=G[G.length-1].contentRect;j({_t:!0,ft:vS(ie,l)}),l=ie}),k=Mu(()=>{const[,G]=D();i({xt:G})},{p:222,S:!0});return[()=>{he&&he.observe(g);const G=be&&be(),ie=B&&B(),U=ue(),Y=M.G(Z=>{Z?F({Et:Z}):k()});return()=>{he&&he.disconnect(),G&&G(),ie&&ie(),a&&a(),U(),Y()}},({zt:G,Tt:ie,It:U})=>{const Y={},[Z]=G("update.ignoreMutation"),[re,Pe]=G("update.attributes"),[P,I]=G("update.elementEvents"),[E,se]=G("update.debounce"),J=I||Pe,Q=ie||U,le=de=>zi(Z)&&Z(de);if(J){o&&o(),a&&a();const[de,ee]=Rv(p||_,!0,H,{et:Nl(f,re||[]),rt:P,it:u,ut:(w,S)=>{const{target:O,attributeName:q}=w;return(!S&&q&&!x?y2(O,u,h):!1)||!!Ho(O,`.${ui}`)||!!le(w)}});a=de(),o=ee}if(se)if(F.O(),Bi(E)){const de=E[0],ee=E[1];s=Os(de)&&de,r=Os(ee)&&ee}else Os(E)?(s=E,r=!1):(s=!1,r=!1);if(Q){const de=ce(),ee=pe&&pe(),w=o&&o();de&&ft(Y,W(de[0],de[1],Q)),ee&&ft(Y,K(ee[0],Q)),w&&ft(Y,H(w[0],Q))}return N(Y),Y},L]},LS=(n,e)=>zi(e)?e.apply(0,n):e,aI=(n,e,t,i)=>{const s=pm(i)?t:i;return LS(n,s)||e.apply(0,n)},IS=(n,e,t,i)=>{const s=pm(i)?t:i,r=LS(n,s);return!!r&&(Su(r)?r:e.apply(0,n))},lI=(n,e)=>{const{nativeScrollbarsOverlaid:t,body:i}=e||{},{k:s,U:r,K:o}=ls(),{nativeScrollbarsOverlaid:a,body:l}=o().cancel,c=t??a,u=pm(i)?l:i,h=(s.x||s.y)&&c,f=n&&(Zu(u)?!r:u);return!!h||!!f},cI=(n,e,t,i)=>{const s="--os-viewport-percent",r="--os-scroll-percent",o="--os-scroll-direction",{K:a}=ls(),{scrollbars:l}=a(),{slot:c}=l,{dt:u,vt:h,L:f,At:d,gt:g,bt:_,V:m}=e,{scrollbars:p}=d?{}:n,{slot:x}=p||{},b=[],v=[],C=[],A=IS([u,h,f],()=>m&&_?u:h,c,x),T=ue=>{if(il){let ce=null,he=[];const k=new il({source:g,axis:ue}),G=()=>{ce&&ce.cancel(),ce=null};return{kt:U=>{const{Dt:Y}=t,Z=Mf(Y)[ue],re=ue==="x",Pe=[Sf(0,re),Sf(`calc(100cq${re?"w":"h"} + -100%)`,re)],P=Z?Pe:Pe.reverse();return he[0]===P[0]&&he[1]===P[1]||(G(),he=P,ce=U.Mt.animate({clear:["left"],transform:P},{timeline:k})),G}}}},L={x:T("x"),y:T("y")},M=()=>{const{Rt:ue,Vt:ce}=t,he=(k,G)=>aS(0,1,k/(k+G)||0);return{x:he(ce.x,ue.x),y:he(ce.y,ue.y)}},y=(ue,ce,he)=>{const k=he?Mm:uS;Mt(ue,G=>{k(G.Lt,ce)})},D=(ue,ce)=>{Mt(ue,he=>{const[k,G]=ce(he);zl(k,G)})},F=(ue,ce,he)=>{const k=Qu(he),G=k?he:!0,ie=k?!he:!0;G&&y(v,ue,ce),ie&&y(C,ue,ce)},N=()=>{const ue=M(),ce=he=>k=>[k.Lt,{[s]:tp(he)+""}];D(v,ce(ue.x)),D(C,ce(ue.y))},K=()=>{if(!il){const{Dt:ue}=t,ce=vv(ue,ei(g)),he=k=>G=>[G.Lt,{[r]:tp(k)+""}];D(v,he(ce.x)),D(C,he(ce.y))}},j=()=>{const{Dt:ue}=t,ce=Mf(ue),he=k=>G=>[G.Lt,{[o]:k?"0":"1"}];D(v,he(ce.x)),D(C,he(ce.y)),il&&(v.forEach(L.x.kt),C.forEach(L.y.kt))},H=()=>{if(m&&!_){const{Rt:ue,Dt:ce}=t,he=Mf(ce),k=vv(ce,ei(g)),G=ie=>{const{Lt:U}=ie,Y=kl(U)===f&&U,Z=(re,Pe,P)=>{const I=Pe*re;return gS(P?I:-I)};return[Y,Y&&{transform:Sf({x:Z(k.x,ue.x,he.x),y:Z(k.y,ue.y,he.y)})}]};D(v,G),D(C,G)}},W=ue=>{const ce=ue?"x":"y",k=ia(`${ui} ${ue?G2:W2}`),G=ia(AS),ie=ia(Tm),U={Lt:k,Ut:G,Mt:ie},Y=L[ce];return Ot(ue?v:C,U),Ot(b,[In(k,G),In(G,ie),Ze(Sa,k),Y&&Y.kt(U),i(U,F,ue)]),U},B=Ze(W,!0),pe=Ze(W,!1),be=()=>(In(A,v[0].Lt),In(A,C[0].Lt),Ze(ri,b));return B(),pe(),[{Pt:N,Nt:K,qt:j,Bt:H,Ft:F,jt:{Xt:v,Yt:B,Wt:Ze(D,v)},Jt:{Xt:C,Yt:pe,Wt:Ze(D,C)}},be]},uI=(n,e,t,i)=>(s,r,o)=>{const{vt:a,L:l,V:c,gt:u,Gt:h,St:f}=e,{Lt:d,Ut:g,Mt:_}=s,[m,p]=zo(333),[x,b]=zo(444),v=T=>{zi(u.scrollBy)&&u.scrollBy({behavior:"smooth",left:T.x,top:T.y})},C=()=>{const T="pointerup pointercancel lostpointercapture",L=`client${o?"X":"Y"}`,M=o?eh:th,y=o?"left":"top",D=o?"w":"h",F=o?"x":"y",N=(j,H)=>W=>{const{Rt:B}=t,pe=sa(g)[D]-sa(_)[D],ue=H*W/pe*B[F];es(u,{[F]:j+ue})},K=[];return Pt(g,"pointerdown",j=>{const H=Ho(j.target,`.${Tm}`)===_,W=H?_:g,B=n.scrollbars,pe=B[H?"dragScroll":"clickScroll"],{button:be,isPrimary:ue,pointerType:ce}=j,{pointers:he}=B;if(be===0&&ue&&pe&&(he||[]).includes(ce)){ri(K),b();const G=!H&&(j.shiftKey||pe==="instant"),ie=Ze(yf,_),U=Ze(yf,g),Y=(S,O)=>(S||ie())[y]-(O||U())[y],Z=Kd(yf(u)[M])/sa(u)[D]||1,re=N(ei(u)[F],1/Z),Pe=j[L],P=ie(),I=U(),E=P[M],se=Y(P,I)+E/2,J=Pe-I[y],Q=H?0:J-se,le=S=>{ri(w),W.releasePointerCapture(S.pointerId)},de=H||G,ee=f(),w=[Pt(h,T,le),Pt(h,"selectstart",S=>ip(S),{T:!1}),Pt(g,T,le),de&&Pt(g,"pointermove",S=>re(Q+(S[L]-Pe))),de&&(()=>{const S=ei(u);ee();const O=ei(u),q={x:O.x-S.x,y:O.y-S.y};(vu(q.x)>3||vu(q.y)>3)&&(f(),es(u,S),v(q),x(ee))})];if(W.setPointerCapture(j.pointerId),G)re(Q);else if(!H){const S=Kl(J2);if(S){const O=S(re,Q,E,q=>{q?ee():Ot(w,ee)});Ot(w,O),Ot(K,Ze(O,!0))}}}})};let A=!0;return Ze(ri,[Pt(_,"pointermove pointerleave",i),Pt(d,"pointerenter",()=>{r(yv,!0)}),Pt(d,"pointerleave pointercancel",()=>{r(yv,!1)}),!c&&Pt(d,"mousedown",()=>{const T=ep();(pv(T,ys)||pv(T,gr)||T===document.body)&&dm(Ze(sp,l),25)}),Pt(d,"wheel",T=>{const{deltaX:L,deltaY:M,deltaMode:y}=T;A&&y===0&&kl(d)===a&&v({x:L,y:M}),A=!1,r(wv,!0),m(()=>{A=!0,r(wv)}),ip(T)},{T:!1,I:!0}),Pt(d,"pointerdown",()=>{const T=Pt(h,"click",M=>{L(),bS(M)},{A:!0,I:!0,T:!1}),L=Pt(h,"pointerup pointercancel",()=>{L(),setTimeout(T,150)},{I:!0,T:!0})},{I:!0,T:!0}),C(),p,b])},hI=(n,e,t,i,s,r)=>{let o,a,l,c,u,h=Bl,f=0;const d=["mouse","pen"],g=ce=>d.includes(ce.pointerType),[_,m]=zo(),[p,x]=zo(100),[b,v]=zo(100),[C,A]=zo(()=>f),[T,L]=cI(n,s,i,uI(e,s,i,ce=>g(ce)&&B())),{vt:M,Kt:y,bt:D}=s,{Ft:F,Pt:N,Nt:K,qt:j,Bt:H}=T,W=(ce,he)=>{if(A(),ce)F(Ev);else{const k=Ze(F,Ev,!0);f>0&&!he?C(k):k()}},B=()=>{(l?!o:!c)&&(W(!0),p(()=>{W(!1)}))},pe=ce=>{F(ap,ce,!0),F(ap,ce,!1)},be=ce=>{g(ce)&&(o=l,l&&W(!0))},ue=[A,x,v,m,()=>h(),Pt(M,"pointerover",be,{A:!0}),Pt(M,"pointerenter",be),Pt(M,"pointerleave",ce=>{g(ce)&&(o=!1,l&&W(!1))}),Pt(M,"pointermove",ce=>{g(ce)&&a&&B()}),Pt(y,"scroll",ce=>{_(()=>{K(),B()}),r(ce),H()})];return[()=>Ze(ri,Ot(ue,L())),({zt:ce,It:he,Qt:k,Zt:G})=>{const{tn:ie,nn:U,sn:Y,en:Z}=G||{},{$t:re,ft:Pe}=k||{},{B:P}=t,{k:I}=ls(),{cn:E,j:se}=i,[J,Q]=ce("showNativeOverlaidScrollbars"),[le,de]=ce("scrollbars.theme"),[ee,w]=ce("scrollbars.visibility"),[S,O]=ce("scrollbars.autoHide"),[q,ne]=ce("scrollbars.autoHideSuspend"),[te]=ce("scrollbars.autoHideDelay"),[Ee,ve]=ce("scrollbars.dragScroll"),[Te,Xe]=ce("scrollbars.clickScroll"),[xe,Ce]=ce("overflow"),ke=Pe&&!he,$e=se.x||se.y,Ae=ie||U||Z||re||he,Ye=Y||w||Ce,We=J&&I.x&&I.y,dt=(V,Re,fe)=>{const ge=V.includes(ba)&&(ee===Ts||ee==="auto"&&Re===ba);return F(X2,ge,fe),ge};if(f=te,ke&&(q&&$e?(pe(!1),h(),b(()=>{h=Pt(y,"scroll",Ze(pe,!0),{A:!0})})):pe(!0)),Q&&F(H2,We),de&&(F(u),F(le,!0),u=le),ne&&!q&&pe(!0),O&&(a=S==="move",l=S==="leave",c=S==="never",W(c,!0)),ve&&F(Y2,Ee),Xe&&F($2,!!Te),Ye){const V=dt(xe.x,E.x,!0),Re=dt(xe.y,E.y,!1);F(q2,!(V&&Re))}Ae&&(K(),N(),H(),Z&&j(),F(Mv,!se.x,!0),F(Mv,!se.y,!1),F(V2,P&&!D))},{},T]},fI=n=>{const e=ls(),{K:t,U:i}=e,{elements:s}=t(),{padding:r,viewport:o,content:a}=s,l=Su(n),c=l?{}:n,{elements:u}=c,{padding:h,viewport:f,content:d}=u||{},g=l?n:c.target,_=fS(g),m=g.ownerDocument,p=m.documentElement,x=()=>m.defaultView||On,b=Ze(aI,[g]),v=Ze(IS,[g]),C=Ze(ia,""),A=Ze(b,C,o),T=Ze(v,C,a),L=E=>{const se=sa(E),J=wu(E),Q=as(E,_m),le=as(E,vm);return J.w-se.w>0&&!Vo(Q)||J.h-se.h>0&&!Vo(le)},M=A(f),y=M===g,D=y&&_,F=!y&&T(d),N=!y&&M===F,K=D?p:M,j=D?K:g,H=!y&&v(C,r,h),W=!N&&F,B=[W,K,H,j].map(E=>Su(E)&&!kl(E)&&E),pe=E=>E&&Kb(B,E),be=!pe(K)&&L(K)?K:g,ue=D?p:K,he={dt:g,vt:j,L:K,rn:H,ht:W,gt:ue,Kt:D?m:K,ln:_?p:be,Gt:m,bt:_,At:l,V:y,an:x,wt:E=>ym(K,ys,E),yt:(E,se)=>Eu(K,ys,E,se),St:()=>Eu(ue,ys,F2,!0)},{dt:k,vt:G,rn:ie,L:U,ht:Y}=he,Z=[()=>{Wi(G,[gr,Ef]),Wi(k,Ef),_&&Wi(p,[Ef,gr])}];let re=Jd([Y,U,ie,G,k].find(E=>E&&!pe(E)));const Pe=D?k:Y||U,P=Ze(ri,Z);return[he,()=>{const E=x(),se=ep(),J=w=>{In(kl(w),Jd(w)),Sa(w)},Q=w=>Pt(w,"focusin focusout focus blur",bS,{I:!0,T:!1}),le="tabindex",de=bm(U,le),ee=Q(se);return Ss(G,gr,y?"":L2),Ss(ie,op,""),Ss(U,ys,""),Ss(Y,Sv,""),y||(Ss(U,le,de||"-1"),_&&Ss(p,bv,"")),In(Pe,re),In(G,ie),In(ie||G,!y&&U),In(U,Y),Ot(Z,[ee,()=>{const w=ep(),S=pe(U),O=S&&w===U?k:w,q=Q(O);Wi(ie,op),Wi(Y,Sv),Wi(U,ys),_&&Wi(p,bv),de?Ss(U,le,de):Wi(U,le),pe(Y)&&J(Y),S&&J(U),pe(ie)&&J(ie),sp(O),q()}]),i&&!y&&(Sm(U,ys,TS),Ot(Z,Ze(Wi,U,ys))),sp(!y&&_&&se===k&&E.top===E?U:se),ee(),re=0,P},P]},dI=({ht:n})=>({Qt:e,un:t,It:i})=>{const{Ct:s}=e||{},{Ot:r}=t;n&&(s||i)&&zl(n,{[th]:r&&"100%"})},pI=({vt:n,rn:e,L:t,V:i},s)=>{const[r,o]=Kn({i:b2,o:gv()},Ze(gv,n,"padding",""));return({zt:a,Qt:l,un:c,It:u})=>{let[h,f]=o(u);const{U:d}=ls(),{_t:g,xt:_,$t:m}=l||{},{B:p}=c,[x,b]=a("paddingAbsolute");(g||f||(u||_))&&([h,f]=r(u));const C=!i&&(b||m||f);if(C){const A=!x||!e&&!d,T=h.r+h.l,L=h.t+h.b,M={[nS]:A&&!p?-T:0,[iS]:A?-L:0,[tS]:A&&p?-T:0,top:A?-h.t:0,right:A?p?-h.r:"auto":0,left:A?p?"auto":-h.l:0,[eh]:A&&`calc(100% + ${T}px)`},y={[Zb]:A?h.t:0,[Qb]:A?h.r:0,[eS]:A?h.b:0,[Jb]:A?h.l:0};zl(e||t,M),zl(t,y),ft(s,{rn:h,fn:!A,F:e?y:ft({},M,y)})}return{_n:C}}},mI=(n,e)=>{const t=ls(),{vt:i,rn:s,L:r,V:o,Kt:a,gt:l,bt:c,yt:u,an:h}=n,{U:f}=t,d=c&&o,g=Ze($b,0),_={display:()=>!1,direction:he=>he!=="ltr",flexDirection:he=>he.endsWith("-reverse"),writingMode:he=>he!=="horizontal-tb"},m=ki(_),p={i:sS,o:{w:0,h:0}},x={i:Kc,o:{}},b=he=>{u(wS,!d&&he)},v=he=>{if(!m.some(P=>{const I=he[P];return I&&_[P](I)}))return{D:{x:0,y:0},M:{x:1,y:1}};b(!0);const G=ei(l),ie=u(N2,!0),U=Pt(a,ba,P=>{const I=ei(l);P.isTrusted&&I.x===G.x&&I.y===G.y&&xS(P)},{I:!0,A:!0});es(l,{x:0,y:0}),ie();const Y=ei(l),Z=wu(l);es(l,{x:Z.w,y:Z.h});const re=ei(l);es(l,{x:re.x-Y.x<1&&-Z.w,y:re.y-Y.y<1&&-Z.h});const Pe=ei(l);return es(l,G),fm(()=>U()),{D:Y,M:Pe}},C=(he,k)=>{const G=On.devicePixelRatio%1!==0?1:0,ie={w:g(he.w-k.w),h:g(he.h-k.h)};return{w:ie.w>G?ie.w:0,h:ie.h>G?ie.h:0}},A=(he,k)=>{const G=(ie,U,Y,Z)=>{const re=ie===Ts?Ii:Z2(ie),Pe=Vo(ie),P=Vo(Y);return!U&&!Z?Ii:Pe&&P?Ts:Pe?U&&Z?re:U?Ts:Ii:U?re:P&&Z?Ts:Ii};return{x:G(k.x,he.x,k.y,he.y),y:G(k.y,he.y,k.x,he.x)}},T=he=>{const k=ie=>[Ts,Ii,ba].map(U=>ce(lp(U),ie)),G=k(!0).concat(k()).join(" ");u(G),u(ki(he).map(ie=>ce(he[ie],ie==="x")).join(" "),!0)},[L,M]=Kn(p,Ze(Em,r)),[y,D]=Kn(p,Ze(wu,r)),[F,N]=Kn(p),[K]=Kn(x),[j,H]=Kn(p),[W]=Kn(x),[B]=Kn({i:(he,k)=>nh(he,k,m),o:{}},()=>C2(r)?as(r,m):{}),[pe,be]=Kn({i:(he,k)=>Kc(he.D,k.D)&&Kc(he.M,k.M),o:SS()}),ue=Kl(CS),ce=(he,k)=>`${k?I2:U2}${x2(he)}`;return({zt:he,Qt:k,un:G,It:ie},{_n:U})=>{const{_t:Y,Ht:Z,xt:re,$t:Pe,ft:P,Et:I}=k||{},E=ue&&ue.R(n,e,G,t,he),{X:se,Y:J,W:Q}=E||{},[le,de]=K2(he,t),[ee,w]=he("overflow"),S=Vo(ee.x),O=Vo(ee.y),q=Y||U||re||Pe||I||de;let ne=M(ie),te=D(ie),Ee=N(ie),ve=H(ie);if(de&&f&&u(TS,!le),q){ym(i,gr,Qc)&&b(!0);const yn=J&&J(),[Mn]=ne=L(ie),[Rr]=te=y(ie),Pr=_S(r),hi=d&&A2(h()),Ra={w:g(Rr.w+Mn.w),h:g(Rr.h+Mn.h)},Pa={w:g((hi?hi.w:Pr.w+g(Pr.w-Rr.w))+Mn.w),h:g((hi?hi.h:Pr.h+g(Pr.h-Rr.h))+Mn.h)};yn&&yn(),ve=j(Pa),Ee=F(C(Ra,Pa),ie)}const[Te,Xe]=ve,[xe,Ce]=Ee,[ke,$e]=te,[Ae,Ye]=ne,[We,dt]=K({x:xe.w>0,y:xe.h>0}),V=S&&O&&(We.x||We.y)||S&&We.x&&!We.y||O&&We.y&&!We.x,Re=U||Pe||I||Ye||$e||Xe||Ce||w||de||q||Z&&d,[fe,ge]=B(ie),Le=Pe||P||ge||dt||ie,[Ie,tt]=Le?pe(v(fe),ie):be();let bt=A(We,ee);b(!1),Re&&(T(bt),bt=Q2(r,We),Q&&se&&(se(bt,ke,Ae),zl(r,Q(bt))));const[Zt,pt]=W(bt);return Eu(i,gr,Qc,V),Eu(s,op,Qc,V),ft(e,{cn:Zt,Vt:{x:Te.w,y:Te.h},Rt:{x:xe.w,y:xe.h},j:We,Dt:R2(Ie,xe)}),{sn:pt,tn:Xe,nn:Ce,en:tt||Ce,dn:Le}}},gI=n=>{const[e,t,i]=fI(n),s={rn:{t:0,r:0,b:0,l:0},fn:!1,F:{[nS]:0,[iS]:0,[tS]:0,[Zb]:0,[Qb]:0,[eS]:0,[Jb]:0},Vt:{x:0,y:0},Rt:{x:0,y:0},cn:{x:Ii,y:Ii},j:{x:!1,y:!1},Dt:SS()},{dt:r,gt:o,V:a,St:l}=e,{U:c,k:u}=ls(),h=!c&&(u.x||u.y),f=[dI(e),pI(e,s),mI(e,s)];return[t,d=>{const g={},m=h&&ei(o),p=m&&l();return Mt(f,x=>{ft(g,x(d,g)||{})}),es(o,m),p&&p(),a||es(r,0),g},s,e,i]},_I=(n,e,t,i,s)=>{let r=!1;const o=Cv(e,{}),[a,l,c,u,h]=gI(n),[f,d,g]=oI(u,c,o,v=>{b({},v)}),[_,m,,p]=hI(n,e,g,c,u,s),x=v=>ki(v).some(C=>!!v[C]),b=(v,C)=>{if(t())return!1;const{pn:A,It:T,Tt:L,vn:M}=v,y=A||{},D=!!T||!r,F={zt:Cv(e,y,D),pn:y,It:D};if(M)return m(F),!1;const N=C||d(ft({},F,{Tt:L})),K=l(ft({},F,{un:g,Qt:N}));m(ft({},F,{Qt:N,Zt:K}));const j=x(N),H=x(K),W=j||H||!xm(y)||D;return r=!0,W&&i(v,{Qt:N,Zt:K}),W};return[()=>{const{ln:v,gt:C,St:A}=u,T=ei(v),L=[f(),a(),_()],M=A();return es(C,T),M(),Ze(ri,L)},b,()=>({gn:g,hn:c}),{bn:u,wn:p},h]},Am=new WeakMap,vI=(n,e)=>{Am.set(n,e)},xI=n=>{Am.delete(n)},US=n=>Am.get(n),yr=(n,e,t)=>{const{tt:i}=ls(),s=Su(n),r=s?n:n.target,o=US(r);if(e&&!o){let a=!1;const l=[],c={},u=y=>{const D=oS(y),F=Kl(D2);return F?F(D,!0):D},h=ft({},i(),u(e)),[f,d,g]=rp(),[_,m,p]=rp(t),x=(y,D)=>{p(y,D),g(y,D)},[b,v,C,A,T]=_I(n,h,()=>a,({pn:y,It:D},{Qt:F,Zt:N})=>{const{_t:K,$t:j,Ct:H,xt:W,Ht:B,ft:pe}=F,{tn:be,nn:ue,sn:ce,en:he}=N;x("updated",[M,{updateHints:{sizeChanged:!!K,directionChanged:!!j,heightIntrinsicChanged:!!H,overflowEdgeChanged:!!be,overflowAmountChanged:!!ue,overflowStyleChanged:!!ce,scrollCoordinatesChanged:!!he,contentMutation:!!W,hostMutation:!!B,appear:!!pe},changedOptions:y||{},force:!!D}])},y=>x("scroll",[M,y])),L=y=>{xI(r),ri(l),a=!0,x("destroyed",[M,y]),d(),m()},M={options(y,D){if(y){const F=D?i():{},N=RS(h,ft(F,u(y)));xm(N)||(ft(h,N),v({pn:N}))}return ft({},h)},on:_,off:(y,D)=>{y&&D&&m(y,D)},state(){const{gn:y,hn:D}=C(),{B:F}=y,{Vt:N,Rt:K,cn:j,j:H,rn:W,fn:B,Dt:pe}=D;return ft({},{overflowEdge:N,overflowAmount:K,overflowStyle:j,hasOverflow:H,scrollCoordinates:{start:pe.D,end:pe.M},padding:W,paddingAbsolute:B,directionRTL:F,destroyed:a})},elements(){const{dt:y,vt:D,rn:F,L:N,ht:K,gt:j,Kt:H}=A.bn,{jt:W,Jt:B}=A.wn,pe=ue=>{const{Mt:ce,Ut:he,Lt:k}=ue;return{scrollbar:k,track:he,handle:ce}},be=ue=>{const{Xt:ce,Yt:he}=ue,k=pe(ce[0]);return ft({},k,{clone:()=>{const G=pe(he());return v({vn:!0}),G}})};return ft({},{target:y,host:D,padding:F||N,viewport:N,content:K||N,scrollOffsetElement:j,scrollEventElement:H,scrollbarHorizontal:be(W),scrollbarVertical:be(B)})},update:y=>v({It:y,Tt:!0}),destroy:Ze(L,!1),plugin:y=>c[ki(y)[0]]};return Ot(l,[T]),vI(r,M),ES(yS,yr,[M,f,c]),lI(A.bn.bt,!s&&n.cancel)?(L(!0),M):(Ot(l,b()),x("initialized",[M]),M.update(),M)}return o};yr.plugin=n=>{const e=Bi(n),t=e?n:[n],i=t.map(s=>ES(s,yr)[0]);return P2(t),e?i:i[0]};yr.valid=n=>{const e=n&&n.elements,t=zi(e)&&e();return bu(t)&&!!US(t.target)};yr.env=()=>{const{P:n,k:e,U:t,J:i,ot:s,st:r,K:o,Z:a,tt:l,nt:c}=ls();return ft({},{scrollbarsSize:n,scrollbarsOverlaid:e,scrollbarsHiding:t,scrollTimeline:i,staticDefaultInitialization:s,staticDefaultOptions:r,getDefaultInitialization:o,setDefaultInitialization:a,getDefaultOptions:l,setDefaultOptions:c})};yr.nonce=nI;yr.trustedTypePolicy=E2;let Tf=-1,Pv=!1;function bI({el:n,ratio:e=1,useParent:t=!1,debug:i=!1}={}){Tf===-1&&(Tf=typeof CSS<"u"&&typeof CSS.supports=="function"&&CSS.supports("text-wrap","balance"));const s=t?n.parentElement:n;if(!s)return;const r=window.getComputedStyle(n);if(Tf&&r.textWrap==="balance"){i&&!Pv&&(console.warn("`text-wrap: balance` is supported by this browser, no need to use `balanceText` here"),Pv=!0);return}const o=d=>n.style.maxWidth=`${Math.ceil(d)}px`;n.style.maxWidth="";const a=s.clientWidth,l=s.clientHeight;let c=a/2-.25,u=a+.5,h,f=0;if(a){for(;c+1<u&&f<2e3;)h=Math.round((c+u)/2),o(h),s.clientHeight===l?u=h:c=h,f++;o(u*e+a*(1-e))}}function mi(n,e){return!n||n.length===0?[]:n.nodeName?[n]:[].slice.call(n[0].nodeName?n:document.querySelectorAll(n))}const SI=" ",yI=" ",Dv=[" ",SI,yI],Lv=["DIV","H1","H2","H3","H4","H5","H6","P","UL","OL","LI"];class Tu{constructor(e,t={lineThreshold:.2,type:"lines",noAriaLabel:!1,noBalance:!1,balanceRatio:1,minLines:1,handleCJT:!1}){us(this,"isSplit",!1);us(this,"chars",[]);us(this,"words",[]);us(this,"lines",[]);us(this,"originals",[]);us(this,"lineParents",[]);us(this,"elements",[]);us(this,"options",{});this.elements=mi(e),this.options=t,this.options.lineThreshold=typeof this.options.lineThreshold=="number"?this.options.lineThreshold:.2,this.options.noAriaLabel=typeof this.options.noAriaLabel=="boolean"?this.options.noAriaLabel:!1,this.options.noBalance=typeof this.options.noBalance=="boolean"?this.options.noBalance:!1,this.options.minLines=typeof this.options.minLines=="number"?this.options.minLines:1,this.options.handleCJT=typeof this.options.handleCJT=="boolean"?this.options.handleCJT:!1,this.options.type=typeof this.options.type=="string"?this.options.type:"lines",this.split()}split(){this.isSplit&&this.revert();const e=(this.options.type||"lines").split(",").map(r=>r.trim()),t=~e.indexOf("lines"),i=~e.indexOf("words"),s=~e.indexOf("chars");this.elements.forEach((r,o)=>{if(r.__isParent=!0,this.originals[o]=r.innerHTML.trim(),r.innerHTML=r.innerHTML.trim().split(/\u200b/).join("<wbr>"),this.balance(r),i||t||s){if(this.words.push(...this.splitElement(r,"word",/\s+/,!0)),this.words.length===1&&this.words[0].offsetWidth<r.parentElement.offsetWidth&&this.lineParents.forEach(a=>a.style.removeProperty("max-width")),t){if(this.detectLinesTop(r,this.words,this.options.lineThreshold),!this.checkMinLines(r,this.words)||(r.style.removeProperty("width"),this.attachBr(r,this.words),this.splitBr(r),this.replaceWords(r,(t||i)&&!s),this.lines.push(...this.splitLines(r)),!this.checkBalance(r,o)))return;this.safeCheckBalance=0}t&&!i&&!s&&(this.lines.forEach(a=>{a.__words.forEach(l=>{l.insertAdjacentHTML("beforebegin",l.textContent),l.remove()}),a.normalize()}),this.words.length=0,this.chars.length=0),s&&(this.words.forEach(a=>this.chars.push(...this.splitElement(a,"char","",!1))),i||(this.chars.forEach(a=>{a.parentElement.insertAdjacentHTML("beforebegin",a.outerHTML),a.remove()}),this.chars=mi(r.getElementsByClassName("char")),this.words.forEach(a=>a.remove()),this.words.length=0))}!this.options.noAriaLabel&&(s||i)&&(this.recursiveAriaLabel(r),mi(r.querySelectorAll("a, button")).forEach(this.createAriaLabel))}),this.isSplit=!0}recursiveAriaLabel(e){const t=mi(e.childNodes).filter(i=>Lv.includes(i.tagName));t.length?t.forEach(i=>{this.recursiveAriaLabel(i)}):this.createAriaLabel(e)}createAriaLabel(e){const t=document.createElement("span");t.classList.add("sr-only"),t.style.setProperty("position","absolute"),t.style.setProperty("width","1px"),t.style.setProperty("height","1px"),t.style.setProperty("padding","0"),t.style.setProperty("margin","-1px"),t.style.setProperty("overflow","hidden"),t.style.setProperty("clip","rect(0, 0, 0, 0)"),t.style.setProperty("white-space","nowrap"),t.style.setProperty("border","0"),t.textContent=e.textContent,e.appendChild(t)}checkBalance(e,t){var s;if(this.options.noBalance)return!0;const i=this.lines.filter(r=>r.scrollWidth>r.parentElement.offsetWidth);for(let r=0;r<i.length;r++){const o=i[r],a=(s=o.__words[0])==null?void 0:s.textContent;if(o.__wordCount===1&&a.match(/\b\w+-\w+\b/)&&this.safeCheckBalance<=5){const l=a.split("-").join("-&#8203;");return this.originals[t]=this.originals[t].replace(a,l),this.safeCheckBalance++,this.revert(),this.split(),!1}o.parentElement.style.removeProperty("max-width")}return!0}revert(){this.originals.length!==0&&(this.elements.forEach((e,t)=>e.innerHTML=this.originals[t]),[this.lines,this.words,this.chars,this.originals].forEach(e=>e.length=0),this.isSplit=!1)}recursiveBalance(e){e.normalize(),mi(e.childNodes).forEach(t=>{t.normalize(),t.__lineParent=!!(t.tagName&&t.hasChildNodes()&&Lv.includes(t.tagName)),t.__lineParent&&(e!=null&&e.__lineParent)&&!e.__isParent&&(e.__lineParent=!1),this.recursiveBalance(t)})}recursiveCheckLineParent(e,t){mi(e.childNodes).forEach(i=>{i.__lineParent&&(i.__idx=null,i.textContent.replace(/\s+/g," ").trim().length>0&&(i.__lines=[this.createLine()],t.push(i))),this.recursiveCheckLineParent(i,t)})}balance(e){this.lineParents=[],this.recursiveBalance(e),this.recursiveCheckLineParent(e,this.lineParents);let t=!0;this.lineParents.length||(this.lineParents.push(e),e.__lines=[this.createLine()],e.__lineParent=!0,e.__idx=null,t=!1),e.__lineParent=!0,this.options.noBalance||this.lineParents.forEach(i=>bI({el:i,ratio:this.options.balanceRatio,useParent:t}))}recursiveFindBr(e,t,i=!0){e.normalize(),mi(e.childNodes).forEach(s=>{s.tagName==="BR"&&(!i||!s.__newBR)?t.push(s):this.recursiveFindBr(s,t,i)})}findAllBr(e,t=!0){const i=[];return this.recursiveFindBr(e,i,t),i}splitBr(e){let t=0;const i=this.findAllBr(e);for(;t<i.length;){let s=0,r=i[t++].parentElement;if(!r)return this.splitBr(e);for(;!r.__lineParent;){if(s++>=100)return;if(!r.parentElement)return this.splitBr(e);const o=r.innerHTML,a=r.cloneNode(),l=a.tagName.toLowerCase(),c=a.outerHTML.split(`</${l}>`).join(""),u=o.split(/<br\b[^>]*>/).join(`</${l}><br>${c.trim()}`);r=r.parentElement,r.innerHTML=r.innerHTML.replace(o.trim(),u.trim()),mi(r.childNodes).forEach(h=>{h.tagName==="BR"?h.__newBR=!0:h.nodeType!==3&&h.textContent.trim().length===0&&h.remove()})}}}isNextBr(e){var t;return((t=e.nextElementSibling)==null?void 0:t.tagName)==="BR"}isPrevBr(e){var t;return((t=e.previousElementSibling)==null?void 0:t.tagName)==="BR"}attachBr(e,t){var r;let i,s=((r=t[0])==null?void 0:r.__top)||0;t.forEach((o,a)=>{const l=t[a-1];if(s!==o.__top&&l){const c=this.findLineParent(o);c.__idx||(c.__idx=`l${o.__top}`),!this.isPrevBr(o.parentElement)&&!this.isPrevBr(o)&&!this.isNextBr(l)&&(!i||(i==null?void 0:i.__idx)===c.__idx)&&o.insertAdjacentHTML("beforebegin","<br>"),i=c,s=o.__top}})}findLineParent(e){let t=e.parentElement,i=!1;for(;!i;)t.__lineParent&&(i=t),t=t.parentElement;return i}replaceWords(e,t){Array.from(e.getElementsByClassName("word")).forEach((i,s)=>{i.replaceWith(this.words[s]),i.__isCJT&&t&&(this.words[s].innerHTML=this.words[s].textContent)})}isCJTChar(e){return/[\u4E00-\u9FFF\u3400-\u4DBF\u3040-\u309F\u30A0-\u30FF\uAC00-\uD7AF\u0E00-\u0E7F]/.test(e)}handleRawElement(e,t,i,s,r,o,a){const l=t.wholeText||"";let c=l;if(!c.trim().length){a.push(document.createTextNode(l));return}if(i==="word"||i==="char"){if(c=l.trim(),Dv.includes(l[0])&&a.push(document.createTextNode(l[0])),this.options.handleCJT&&i==="word"){const u=c.split(/(\s+)/).filter(Boolean);for(let h=0;h<u.length;h++){const f=u[h];if(/^\s+$/.test(f)){a.push(document.createTextNode(f));continue}let d="",g=!1;for(let _=0;_<f.length;_++){const m=f[_],p=this.isCJTChar(m);if(p!==g||_===f.length-1){if(_===f.length-1&&(d+=m),d){const x=this.createElement(e,i,d);o.push(x),a.push(x),g&&(x.__isCJT=!0,this.chars.push(...this.splitElement(x,"char","",!1)))}d=_===f.length-1?"":m,g=p}else d+=m}}}else i==="char"?Array.from(c).forEach(h=>{const f=this.createElement(e,i,h);o.push(f),a.push(f)}):c.split(/([\s\u00A0\u202F]+)/).forEach((h,f)=>{if(f%2===1)a.push(document.createTextNode(h));else if(h){const d=this.createElement(e,i,h);o.push(d),a.push(d)}});Dv.includes(l[l.length-1])&&a.push(document.createTextNode(l[l.length-1]))}}splitElement(e,t,i,s){e.normalize();const r=[],o=document.createDocumentFragment(),a=[];return mi(e.childNodes).forEach(l=>{if(l.tagName&&!l.hasChildNodes())return a.push(l);l.childNodes.length?(a.push(l),r.push(...this.splitElement(l,t,i,s))):this.handleRawElement(o,l,t,i,s,r,a)}),a.forEach(l=>o.appendChild(l)),e.innerHTML="",e.appendChild(o),r}offsetTop(e,t){let i=t.offsetParent,s=0,r=e;for(;r&&r!==t&&r!==i;)s+=r.offsetTop,r=r.offsetParent;return s}detectLinesTop(e,t,i){let s=-999;const r=window.getComputedStyle(e),a=parseFloat(r.fontSize||0)*i,l=t.map(c=>{const u=Math.round(this.offsetTop(c,e));return Math.abs(u-s)>a&&(s=u),c.__top=s,c.__top});return[...new Set(l)]}splitLines(e){const t=[];this.findAllBr(e,!1).forEach(r=>{var l;const o=this.findLineParent(r),a=this.createLine();a.__isLine=!0,(l=o==null?void 0:o.__lines)==null||l.push(a)});let s=0;return this.lineParents.forEach((r,o)=>{let a=0;o>0&&s++,mi(r.childNodes).forEach(l=>{l.tagName==="BR"?(s++,a++,l.remove()):(r.__lines[a].appendChild(l),mi(l.childNodes).forEach(c=>c.__lineIndex=s),l.__lineIndex=s)}),r.__lines.forEach(l=>r.appendChild(l)),t.push(...r.__lines)}),t.forEach(r=>{r.__words=mi(r.getElementsByClassName("word")),r.__wordCount=r.__words.length}),t}createLine(e){const t=document.createElement("span");return t.style.setProperty("display","block"),t.className="line",e?e.appendChild(t):t}createElement(e,t,i){const s=document.createElement("span");return t==="word"&&s.style.setProperty("display","inline-block"),s.className=t,s.textContent=i,s.setAttribute("aria-hidden",!0),e.appendChild(s)}checkMinLines(e,t){if(this.options.minLines<=1||this.options.minLines>1&&t.length<=1)return!0;let i=t[0].__top,s=1;t.forEach(l=>{const c=l.__top;c>i&&(i=c,s++)});const r=this.options.minLines-s;r>1&&!this.warned&&(this.warned=!0,console.warn(`SplitText is ran ${r} times. Careful as this option might be expensive 🫰`.toUpperCase(),e));const o=this.words[this.words.length-1];let a=o.offsetLeft+o.offsetWidth*.9;return e.offsetWidth<a&&(a=e.offsetWidth-o.offsetWidth*.5),s<this.options.minLines&&a>0?(e.style.width=`${a}px`,this.revert(),this.balance(e),this.split(),!1):!0}}const MI=["href","target","rel"],EI={__name:"CtaLink",props:{label:{type:String,required:!1,default:"Link"},href:{type:String,required:!1,default:null},target:{type:String,required:!1,default:null},rel:{type:String,required:!1,default:null}},setup(n){const e=n,t=at(null),i=at(null),s=at(null),r=at(null),o=u=>{Ne(s.value),s.value=Oe.timeline().fromTo(t.value,{x:0},{x:16,color:"#ffffff",duration:.5,ease:"power4.out"},0).fromTo(u.chars,{scaleX:1},{scaleX:.5,duration:.05,stagger:.02,ease:"power2.out"},.075).to(u.chars,{scaleX:1,duration:.5,stagger:.02,ease:"elastic.out(1, 0.5)"},.125).fromTo(u.chars,{x:0},{x:16,color:"#ffffff",duration:.5,stagger:.02,ease:"elastic.out(1, 0.5)"},.075)},a=u=>{Ne(s.value),s.value=Oe.timeline().to(t.value,{x:0,color:"#C9C9C9",duration:.5,ease:"power4.out"},0).to(u.chars,{x:0,scaleX:1,color:"#C9C9C9",duration:.5,stagger:.01,ease:"power3.out"},.05)},l=u=>{ot.isDesktop&&r.value&&o(r.value)},c=u=>{ot.isDesktop&&r.value&&a(r.value)};return ci(()=>{r.value=new Tu(i.value,{type:"chars",noBalance:!0})}),yi(()=>{}),(u,h)=>(tn(),Vn("a",{class:"cta-link",href:e.href,target:e.target,rel:e.rel,onMouseenter:l,onMouseleave:c},[Ke("span",{ref_key:"refDomIcon",ref:t,class:"cta-link__icon label-link"},"→",512),Ke("span",{ref_key:"refDomLabel",ref:i,class:"cta-link__label label-link"},ro(e.label),513)],40,MI))}},cp=Ei(EI,[["__scopeId","data-v-ab875eaf"]]),wI=n=>{var e=document.createElement("textarea");e.value=n,e.style.top="0",e.style.left="0",e.style.position="fixed",document.body.appendChild(e),e.focus(),e.select();try{var t=document.execCommand("copy"),i=t?"successful":"unsuccessful"}catch{}document.body.removeChild(e)},TI=n=>{if(!navigator.clipboard){wI(n);return}navigator.clipboard.writeText(n).then(function(){},function(e){})},AI={class:"cta-copy__tooltip tooltip"},CI={__name:"CtaCopy",props:{label:{type:String,required:!1,default:"Link"},content:{type:String,required:!1,default:""}},setup(n){const e=n,t=at(null),i=at(null),s=at(null),r=at(null),o=at(null),a=at(null),l=at(null),c=_=>{Ne(r.value),r.value=Oe.timeline().fromTo(t.value,{x:0},{x:16,color:"#ffffff",duration:.5,ease:"power4.out"},0).fromTo(_.chars,{scaleX:1},{scaleX:.5,duration:.05,stagger:.02,ease:"power2.out"},.075).to(_.chars,{scaleX:1,duration:.5,stagger:.02,ease:"elastic.out(1, 0.5)"},.125).fromTo(_.chars,{x:0},{x:16,color:"#ffffff",duration:.5,stagger:.02,ease:"elastic.out(1, 0.5)"},.075)},u=_=>{Ne(r.value),r.value=Oe.timeline().to(t.value,{x:0,color:"#C9C9C9",duration:.5,ease:"power4.out"},0).to(_.chars,{x:0,scaleX:1,color:"#C9C9C9",duration:.5,stagger:.01,ease:"power3.out"},.05)},h=_=>{Ne(o.value),o.value=Oe.timeline().fromTo(_.chars,{yPercent:100,color:"#C9C9C9"},{yPercent:0,color:"#ffffff",duration:.75,stagger:.02,ease:"elastic.out(1, 0.75)"},0).to(_.chars,{yPercent:100,color:"#C9C9C9",duration:.5,stagger:.02,ease:"expo.in"},.75)},f=_=>{TI(e.content),h(l.value)},d=_=>{a.value&&c(a.value)},g=_=>{a.value&&u(a.value)};return ci(()=>{a.value=new Tu(i.value,{type:"chars",noBalance:!0}),l.value=new Tu(s.value,{type:"chars",noBalance:!0}),Oe.set(l.value.chars,{yPercent:100})}),yi(()=>{}),(_,m)=>(tn(),Vn("button",{class:"cta-copy",onClick:f,onMouseenter:d,onMouseleave:g},[Ke("span",{ref_key:"refDomIcon",ref:t,class:"cta-copy__icon label-link"},"→",512),Ke("span",{ref_key:"refDomLabel",ref:i,class:"cta-copy__label label-link"},ro(e.label),513),Ke("div",AI,[Ke("span",{ref_key:"refDomTooltipLabel",ref:s,class:"tooltip__label label-link"},"Copied!",512)])],32))}},RI=Ei(CI,[["__scopeId","data-v-96afd8fa"]]),PI={class:"about__contact contact"},DI={__name:"About",props:{isLight:{type:Boolean,default:!1}},setup(n){return ci(()=>{}),yi(()=>{}),(e,t)=>(tn(),Vn("div",{class:ss(["about",{"is-light":n.isLight}])},[t[0]||(t[0]=Ke("h3",{class:"about__title title"},[Yo(" Sup, I'm Harshit Chauhan,"),Ke("br"),Yo(" Creative Developer"),Ke("br"),Yo(" Based in Mumbai, India ")],-1)),t[1]||(t[1]=Ke("div",{class:"about__description text text--grey"},[Ke("p",null," I usually roam the internet designing concepts, building lively front-end apps and immersive webgl experiences. "),Ke("p",null," Passionate about animation and storytelling, I work with clients and agencies to bring ideas to digital life in the most creative ways possible. "),Ke("p",null,"I also make latte art in my free time.")],-1)),Ke("div",PI,[Ft(cp,{class:"contact__link",href:"https://www.linkedin.com/in/adrien-lamy",label:"Linkedin",target:"_blank",rel:"noopener noreferrer"}),Ft(cp,{class:"contact__link",href:"https://github.com/harsh4k",label:"Portfolio",target:"_blank",rel:"noopener noreferrer"}),Ft(RI,{class:"contact__link",label:"harshitsinhchauhan250@gmail.com",content:"harshitsinhchauhan250@gmail.com"})])],2))}},LI=Ei(DI,[["__scopeId","data-v-9fa0393a"]]),II={__name:"CtaMedia",props:{label:{type:String,required:!1,default:"Link"},mediaKey:{type:String,required:!1,default:null}},setup(n){const e=n,t=at(null),i=at(null),s=at(null),r=at(null),o=h=>{Ne(s.value),s.value=Oe.timeline().fromTo(t.value,{x:0},{x:16,color:"#ffffff",duration:.5,ease:"power4.out"},0).fromTo(h.chars,{scaleX:1},{scaleX:.5,duration:.05,stagger:.02,ease:"power2.out"},.075).to(h.chars,{scaleX:1,duration:.5,stagger:.02,ease:"elastic.out(1, 0.5)"},.125).fromTo(h.chars,{x:0},{x:16,color:"#ffffff",duration:.5,stagger:.02,ease:"elastic.out(1, 0.5)"},.075)},a=h=>{Ne(s.value),s.value=Oe.timeline().to(t.value,{x:0,color:"#C9C9C9",duration:.5,ease:"power4.out"},0).to(h.chars,{x:0,scaleX:1,color:"#C9C9C9",duration:.5,stagger:.01,ease:"power3.out"},.05)},l=h=>{Be.trigger(Fe.MEDIA_SHOW,{mediaKey:e.mediaKey})},c=h=>{ot.isDesktop&&r.value&&o(r.value)},u=h=>{ot.isDesktop&&r.value&&a(r.value)};return ci(()=>{r.value=new Tu(i.value,{type:"chars",noBalance:!0})}),yi(()=>{}),(h,f)=>(tn(),Vn("button",{class:"cta-media",onClick:l,onMouseenter:c,onMouseleave:u},[Ke("span",{ref_key:"refDomIcon",ref:t,class:"cta-media__icon label-link"},"→",512),Ke("span",{ref_key:"refDomLabel",ref:i,class:"cta-media__label label-link"},ro(e.label),513)],32))}},UI=Ei(II,[["__scopeId","data-v-26f22f9e"]]),OI={class:"project"},FI={class:"project__first"},NI={class:"project__title text"},BI={class:"project__description text text--grey"},kI={__name:"Project",props:{data:{type:Object,required:!0}},setup(n){const e=n;return ci(()=>{}),yi(()=>{}),(t,i)=>(tn(),Vn("div",OI,[Ke("div",FI,[Ke("div",NI,ro(e.data.title),1),i[0]||(i[0]=Ke("span",{class:"project__line"},null,-1)),e.data.mediaKey?(tn(),Of(UI,{key:0,label:"Watch",mediaKey:e.data.mediaKey},null,8,["mediaKey"])):(tn(),Of(cp,{key:1,class:"project__link",href:e.data.link,label:e.data.linkLabel||"Visit",target:"_blank",rel:"noopener noreferrer"},null,8,["href","label"]))]),Ke("div",BI,ro(e.data.description),1)]))}},zI=Ei(kI,[["__scopeId","data-v-3276e106"]]),OS={melius:{id:"melius",title:"Melius",description:"Webgl + FE - with View Source",link:"#",linkLabel:"Visit"},blastexplore:{id:"blastexplore",title:"Blast Explore",description:"Webgl - ft. Dorian Lods",link:"#",linkLabel:"Visit"},claynosaurz:{id:"claynosaurz",title:"Claynosaurz Booster Packs",description:"WebGL - with Claynosaurz",mediaKey:"claynosaurz",mediaSrc:"/videos/claynosaurz.webm"},myli:{id:"myli",title:"Myli.io",description:"Frontend",link:"#",linkLabel:"Visit"},lvmh:{id:"lvmh",title:"The Maison of All Victories",description:"WebGL - with Cosmic Shelter",link:"#",linkLabel:"Case"},"virgin-galactic":{id:"virgin-galactic",title:"Virgin Galactic",description:"WebGL - at Dogstudio",link:"#",linkLabel:"Case"},"sprite-marvel":{id:"sprite-marvel",title:"Sprite X Marvel",description:"WebGL - at Dogstudio",link:"#",linkLabel:"Case"},"dept-pioneer":{id:"dept-pioneer",title:"Dept Pioneer",description:"WebGL - at Dogstudio",link:"#",linkLabel:"Case"},"copie-double":{id:"copie-double",title:"Copie Double",description:"GameDev - at Gobelins",link:"#",linkLabel:"Visit"}},HI={class:"projects__list"},VI={__name:"Projects",props:{isLight:{type:Boolean,default:!1}},setup(n){const e=Object.values(OS);return ci(()=>{}),yi(()=>{}),(t,i)=>(tn(),Vn("div",{class:ss(["projects",{"is-light":n.isLight}])},[i[0]||(i[0]=Ke("h3",{class:"projects__title title"},"What am I doing",-1)),Ke("div",HI,[(tn(!0),Vn(Ri,null,Yy(Oi(e),s=>(tn(),Of(zI,{key:s.id,data:s},null,8,["data"]))),128))])],2))}},GI=Ei(VI,[["__scopeId","data-v-4d67b69f"]]),WI={__name:"SidePanel",setup(n){const e=at(null),t=at(null),i=at(null),s=at(null),r=at(null),o=at(!ot.isDesktop),a=at(!0),l=at(!1);let c=null,u=null,h=null,f=null,d=null,g=null;const _={scrollbars:{autoHide:"scroll",autoHideDelay:600},overflow:{x:"hidden",y:"scroll"}},m=()=>{Oe.fromTo(e.value,{y:"10svh",scale:.9},{y:0,scale:1,duration:1,delay:1,ease:"elastic.out(1.0,0.8)"})},p=({onComplete:T}={})=>{Ne(c),c=Oe.timeline({onComplete:T}).fromTo([i.value,s.value],{opacity:0},{opacity:1,duration:.5,ease:"power3.out"},0).fromTo([i.value,s.value],{x:"50vw",scaleX:.5,scaleY:.35},{x:0,scaleX:1,scaleY:1,duration:1.15,stagger:.035,ease:"elastic.out(0.9,0.75)"},0),ot.isDesktop||c.fromTo(e.value,{y:"100svh",scale:.5},{y:0,scale:1,duration:1.15,stagger:.035,ease:"elastic.out(0.9,0.75)"},0)},x=({onComplete:T}={})=>{c=Oe.timeline({onComplete:T}).to([i.value,s.value],{opacity:0,duration:.35,ease:"power3.out"},0).to([i.value,s.value],{x:"50vw",scale:.5,duration:1,ease:"elastic.out(0.8,0.75)"},0),ot.isDesktop||c.to(e.value,{y:"100svh",scale:.5,duration:1,ease:"elastic.out(0.8,0.75)"},0)},b=()=>{getSelection().empty(),p({onComplete:()=>{o.value=!0}})},v=()=>{Ne(c),x({onComplete:()=>{o.value=!1}})},C=({isSwitchOn:T})=>{a.value=T},A=()=>{const T=window.innerHeight<750&&window.innerWidth<1400;T!==l.value&&(l.value=T,T?r.value=yr(t.value,_):r.value.destroy())};return ci(()=>{ot.isDesktop&&(Oe.set([i.value,s.value],{opacity:0}),A(),window.addEventListener("resize",A)),ot.isDesktop||(Oe.set(e.value,{y:"10svh"}),Be.on(Fe.FIRST_RENDER,()=>{m()})),u=Be.on(Fe.UI_SHOW,b.bind(this)),h=Be.on(Fe.UI_HIDE,v.bind(this)),f=Be.on(Fe.MEDIA_SHOW,v.bind(this)),d=Be.on(Fe.MEDIA_HIDE,b.bind(this)),g=Be.on(Fe.MOBILE_SWITCH_TOGGLE,C.bind(this)),console.log("Font : Comic CAT by Vitaly Lazarenko"),console.log("Website : Me by Me")}),yi(()=>{u(),h(),f(),d(),g(),window.removeEventListener("resize",A)}),(T,L)=>(tn(),Vn("div",{ref_key:"refElPanel",ref:e,class:ss(["side-panel",{"is-light":!a.value,"is-desktop":Oi(ot).isDesktop}])},[Ke("div",{ref_key:"refElContent",ref:t,class:ss(["side-panel__content",{"is-hidden":!o.value}])},[Ke("div",{ref_key:"refElColLeft",ref:i,class:"content-column content-column--left"},[Ft(LI,{isLight:!a.value},null,8,["isLight"])],512),Ke("div",{ref_key:"refElColRight",ref:s,class:"content-column content-column--right"},[Ft(GI,{isLight:!a.value},null,8,["isLight"])],512)],2)],2))}},XI=Ei(WI,[["__scopeId","data-v-a7079280"]]),qI="/images/media/tex-phone-close.webp",$I="/images/media/tex-phone-portrait-back.webp",YI="/images/media/tex-phone-portrait-front.webp",jI="/images/media/tex-phone-landscape-back.webp",KI="/images/media/tex-phone-landscape-front.webp",ZI=()=>{let n=0;const e=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream;return{stop:()=>{document.body.classList.add("has-scroll-lock"),document.documentElement.classList.add("has-scroll-lock"),e&&(n=window.scrollY)},resume:()=>{document.body.classList.remove("has-scroll-lock"),document.documentElement.classList.remove("has-scroll-lock"),e&&window.scrollTo(0,n)}}},Iv=ZI(),QI={__name:"MediaLayer",setup(n){const e=at(null),t=at(null),i=at(null),s=at(null),r=at(null),o=at(!1),a=at(!1),l=at(null);let c=null;const u=()=>{f({onComplete:()=>{Iv.resume(),Be.trigger(Fe.MEDIA_HIDE),i.value.pause(),i.value.currentTime=0,i.value.src=""}})},h=({onStart:m,onComplete:p}={})=>{o.value=!0,Ne(c),c=Oe.timeline({delay:.15,onStart:m,onComplete:p}),c.fromTo(t.value,{y:"100vh",scaleX:.5,scaleY:.75,rotate:-30},{y:0,scaleX:1,scaleY:1,rotate:0,duration:1,ease:"elastic.out(1.0,0.75)"},0).fromTo(s.value,{scaleY:0},{scaleY:1,duration:.5,ease:"expo.out"},.15).fromTo(r.value,{opacity:1},{opacity:0,duration:.5,ease:"expo.out"},.25),a.value||c.fromTo(e.value,{y:"25vh",scale:0},{y:0,scale:1,duration:.75,ease:"elastic.out(1.0,0.75)"},.15)},f=({onStart:m,onComplete:p}={})=>{o.value=!1,Ne(c),c=Oe.timeline().call(p,null,.25).to(e.value,{y:"25vh",scale:0,duration:.5,ease:"power4.inOut"},0).to(t.value,{y:"100vh",scaleX:.5,scaleY:.8,rotate:-30,duration:.5,ease:"power4.inOut"},0)},d=()=>{o.value=!1,Ne(c),c=Oe.to(t.value,{scaleX:2.5,scaleY:2.5,duration:20,ease:"linear"})},g=m=>{let p=null;Iv.stop(),m.mediaKey==="konami"?(i.value.src="/videos/salut-cest-frank-leboeuf-vous-voulez-savoir-combien-vaut-votre-voiture.mp4",i.value.autoplay=!0,i.value.controls=!1,a.value=!0,i.value.onended=()=>{i.value.controls=!0,a.value=!1,u()},p=()=>{d()},document.title=ar.frank):(l.value=OS[m.mediaKey],i.value.src=l.value.mediaSrc),i.value.load(),h({onComplete:p})};let _=null;return ci(()=>{Oe.set(e.value,{scale:0}),Oe.set(t.value,{y:"100vh",scaleX:.75,scaleY:1.1}),_=Be.on(Fe.MEDIA_SHOW,g)}),yi(()=>{_()}),(m,p)=>(tn(),Vn("div",{class:ss(["media-layer",{"is-visible":o.value}])},[Ke("button",{ref_key:"refElCloseButton",ref:e,class:"media-layer__close-button close-button",onClick:u},p[0]||(p[0]=[Ke("img",{class:"close-button__icon",src:qI,alt:"Close"},null,-1)]),512),Ke("div",{ref_key:"refElPlayer",ref:t,class:"media-layer__player media-player"},[Ke("div",{ref_key:"refElVideoWrapper",ref:s,class:"media-player__video video-wrapper"},[Ke("video",{ref_key:"refElVideo",ref:i,class:"video-wrapper__video",alt:"Media Layer",controls:"",autoplay:"",playsinline:""},p[1]||(p[1]=[Ke("source",{type:"video/mp4"},null,-1)]),512),Ke("div",{ref_key:"refElVideoFlash",ref:r,class:"video-wrapper__flash"},null,512)],512),p[2]||(p[2]=Ke("img",{class:"media-player__visual media-player__visual--back media-player__visual--mobile",src:$I,alt:"Media Layer Visual Back"},null,-1)),p[3]||(p[3]=Ke("img",{class:"media-player__visual media-player__visual--front media-player__visual--mobile",src:YI,alt:"Media Layer Visual Front"},null,-1)),p[4]||(p[4]=Ke("img",{class:"media-player__visual media-player__visual--back media-player__visual--desktop",src:jI,alt:"Media Layer Visual Back"},null,-1)),p[5]||(p[5]=Ke("img",{class:"media-player__visual media-player__visual--front media-player__visual--desktop",src:KI,alt:"Media Layer Visual Front"},null,-1))],512)],2))}},JI=Ei(QI,[["__scopeId","data-v-3e5d6f1a"]]),e3="/images/ctas/tex-ui-switch-fe-on.webp",t3="/images/ctas/tex-ui-switch-fe-off.webp",n3={class:"sr-only"},i3={__name:"MobileSwitch",setup(n){const e=at(null),t=at(!0),i=at(!1),s=at(null),r=at(()=>{}),o=()=>{t.value=!t.value,Be.trigger(Fe.MOBILE_SWITCH_TOGGLE,{isSwitchOn:t.value})},a=({onStart:f,onComplete:d,delay:g=0}={})=>(i.value=!1,c({onStart:f,onComplete:d,delay:g})),l=({onStart:f,onComplete:d,delay:g=0}={})=>(i.value=!0,u({onStart:f,onComplete:d,delay:g})),c=({onStart:f,onComplete:d,delay:g=0}={})=>(Ne(s.value),s.value=Oe.timeline({onStart:f,onComplete:d,delay:g}).fromTo(e.value,{scale:0},{scale:1,duration:.9,ease:"elastic.out(1.0,0.45)"},0),s),u=({onStart:f,onComplete:d,delay:g=0}={})=>(Ne(s.value),s.value=Oe.timeline({onStart:f,onComplete:d,delay:g}).to(e.value,{scale:0,duration:.35,ease:"expo.out"},0),s),h=({y:f})=>{if(ot.isDesktop)return;const d=f/window.innerHeight,g=.01;d>g&&!i.value?l():d<=g&&i.value&&a()};return ci(()=>{Oe.set(e.value,{scale:0}),ot.isDesktop||(r.value=hm(h),Be.on(Fe.FIRST_RENDER,()=>{a({delay:.85})}))}),yi(()=>{r.value()}),(f,d)=>(tn(),Vn("button",{ref_key:"refEl",ref:e,class:ss(["mobile-switch",{"is-on":t.value,"is-hidden":i.value,"is-tablet":Oi(ot).isTablet}]),onClick:o},[Ke("span",n3,"Switch to "+ro(t.value?"Dark mode":"Light mode"),1),d[0]||(d[0]=Ke("img",{class:"mobile-switch__image mobile-switch__image--on",src:e3,alt:"Mobile Switch On"},null,-1)),d[1]||(d[1]=Ke("img",{class:"mobile-switch__image mobile-switch__image--off",src:t3,alt:"Mobile Switch Off"},null,-1))],2))}},s3=Ei(i3,[["__scopeId","data-v-1b45cffb"]]),r3={__name:"ResponsiveLayer",props:{label:{type:String,required:!1,default:"Anchor"}},setup(n){return(e,t)=>(tn(),Vn("div",{class:ss(["responsive-layer",{"is-desktop":Oi(ot).isDesktop}])},t[0]||(t[0]=[Ke("div",{class:"responsive-layer__message title title--white"},[Yo(" Please don't break my website. "),Ke("br"),Yo(" Responsive has been a nightmare, I promise I'll fix it soon. ")],-1)]),2))}},o3=Ei(r3,[["__scopeId","data-v-1b244d33"]]);function a3(n){const e=["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];let t=0;const i=s=>{s.key===e[t]?(t+=1,t===e.length&&(t=0,n())):t=0};ci(()=>{window.addEventListener("keydown",i)}),yi(()=>{window.removeEventListener("keydown",i)})}const l3={class:"page view-home"},c3={__name:"ViewHome",setup(n){return a3(()=>{Be.trigger(Fe.MEDIA_SHOW,{mediaKey:"konami"}),Be.trigger(Fe.SCRIBBLES_HIDE)}),(t,i)=>(tn(),Vn("main",l3,[i[0]||(i[0]=Ke("p",{class:"sr-only"},"Who am I? Harshit Chauhan",-1)),i[1]||(i[1]=Ke("h2",{class:"sr-only"},"Somewhat Creative Developer",-1)),Ft(XI),Ft(s3),Ft(JI),Ft(o3)]))}},u3=Ei(c3,[["__scopeId","data-v-64670ca8"]]),h3=ow({history:NE("/"),routes:[{path:"/",name:"home",component:u3}]}),FS=sE(m2);FS.use(h3);FS.mount("#app");
