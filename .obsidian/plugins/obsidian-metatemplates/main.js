'use strict';

var obsidian = require('obsidian');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var TemplateSuggestModal = /** @class */ (function (_super) {
    __extends(TemplateSuggestModal, _super);
    function TemplateSuggestModal(app, plugin, creating) {
        var _this = _super.call(this, app) || this;
        _this.app = app;
        _this.plugin = plugin;
        _this.creating = creating;
        return _this;
    }
    TemplateSuggestModal.prototype.getItems = function () {
        this.plugin.reloadTemplates();
        return this.plugin.templates;
    };
    TemplateSuggestModal.prototype.getItemText = function (item) {
        return item.basename;
    };
    TemplateSuggestModal.prototype.onChooseItem = function (item) {
        if (this.creating) {
            this.plugin.createNoteFromTemplate(item);
        }
        else {
            this.plugin.insertTemplate(item);
        }
    };
    return TemplateSuggestModal;
}(obsidian.FuzzySuggestModal));

var DEFAULT_SETTINGS = {
    templateFolder: 'templates',
    dateFormat: 'YYMMDD',
    timeFormat: 'HHmm'
};
var MetatemplatesSettingTab = /** @class */ (function (_super) {
    __extends(MetatemplatesSettingTab, _super);
    function MetatemplatesSettingTab(app, plugin) {
        var _this = _super.call(this, app, plugin) || this;
        _this.plugin = plugin;
        return _this;
    }
    MetatemplatesSettingTab.prototype.display = function () {
        var _this = this;
        var containerEl = this.containerEl;
        containerEl.empty();
        containerEl.createEl('h2', { text: 'Metatemplates Settings' });
        new obsidian.Setting(containerEl)
            .setName('Template folder location')
            .setDesc('Files in this folder will be available as templates.')
            .addText(function (text) { return text
            .setPlaceholder('Example: folder1/folder2')
            .setValue(_this.plugin.settings.templateFolder)
            .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.plugin.settings.templateFolder = value;
                        return [4 /*yield*/, this.plugin.saveSettings()];
                    case 1:
                        _a.sent();
                        this.plugin.reloadTemplates();
                        return [2 /*return*/];
                }
            });
        }); }); });
        new obsidian.Setting(containerEl)
            .setName('Date format')
            .setDesc('<<date>> in the template file will be replaced with this value.')
            .addText(function (text) { return text
            .setPlaceholder('Example: YY.MM.DD')
            .setValue(_this.plugin.settings.dateFormat)
            .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.plugin.settings.dateFormat = value;
                        return [4 /*yield*/, this.plugin.saveSettings()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }); });
        new obsidian.Setting(containerEl)
            .setName('Time format')
            .setDesc('<<time>> in the template file will be replaced with this value.')
            .addText(function (text) { return text
            .setPlaceholder('Example: HH:mm.ss')
            .setValue(_this.plugin.settings.timeFormat)
            .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.plugin.settings.timeFormat = value;
                        return [4 /*yield*/, this.plugin.saveSettings()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }); });
    };
    return MetatemplatesSettingTab;
}(obsidian.PluginSettingTab));

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}

function commonjsRequire (target) {
	throw new Error('Could not dynamically require "' + target + '". Please configure the dynamicRequireTargets option of @rollup/plugin-commonjs appropriately for this require call to behave properly.');
}

var jsYaml = createCommonjsModule(function (module, exports) {
!function(e){module.exports=e();}(function(){return function e(t,n,i){function r(a,s){if(!n[a]){if(!t[a]){var u="function"==typeof commonjsRequire&&commonjsRequire;if(!s&&u)return u(a,!0);if(o)return o(a,!0);var c=new Error("Cannot find module '"+a+"'");throw c.code="MODULE_NOT_FOUND",c}var l=n[a]={exports:{}};t[a][0].call(l.exports,function(e){var n=t[a][1][e];return r(n?n:e)},l,l.exports,e,t,n,i);}return n[a].exports}for(var o="function"==typeof commonjsRequire&&commonjsRequire,a=0;a<i.length;a++)r(i[a]);return r}({1:[function(e,t,n){function i(e){return function(){throw new Error("Function "+e+" is deprecated and cannot be used.")}}var r=e("./js-yaml/loader"),o=e("./js-yaml/dumper");t.exports.Type=e("./js-yaml/type"),t.exports.Schema=e("./js-yaml/schema"),t.exports.FAILSAFE_SCHEMA=e("./js-yaml/schema/failsafe"),t.exports.JSON_SCHEMA=e("./js-yaml/schema/json"),t.exports.CORE_SCHEMA=e("./js-yaml/schema/core"),t.exports.DEFAULT_SAFE_SCHEMA=e("./js-yaml/schema/default_safe"),t.exports.DEFAULT_FULL_SCHEMA=e("./js-yaml/schema/default_full"),t.exports.load=r.load,t.exports.loadAll=r.loadAll,t.exports.safeLoad=r.safeLoad,t.exports.safeLoadAll=r.safeLoadAll,t.exports.dump=o.dump,t.exports.safeDump=o.safeDump,t.exports.YAMLException=e("./js-yaml/exception"),t.exports.MINIMAL_SCHEMA=e("./js-yaml/schema/failsafe"),t.exports.SAFE_SCHEMA=e("./js-yaml/schema/default_safe"),t.exports.DEFAULT_SCHEMA=e("./js-yaml/schema/default_full"),t.exports.scan=i("scan"),t.exports.parse=i("parse"),t.exports.compose=i("compose"),t.exports.addConstructor=i("addConstructor");},{"./js-yaml/dumper":3,"./js-yaml/exception":4,"./js-yaml/loader":5,"./js-yaml/schema":7,"./js-yaml/schema/core":8,"./js-yaml/schema/default_full":9,"./js-yaml/schema/default_safe":10,"./js-yaml/schema/failsafe":11,"./js-yaml/schema/json":12,"./js-yaml/type":13}],2:[function(e,t,n){function i(e){return "undefined"==typeof e||null===e}function r(e){return "object"==typeof e&&null!==e}function o(e){return Array.isArray(e)?e:i(e)?[]:[e]}function a(e,t){var n,i,r,o;if(t)for(o=Object.keys(t),n=0,i=o.length;i>n;n+=1)r=o[n],e[r]=t[r];return e}function s(e,t){var n,i="";for(n=0;t>n;n+=1)i+=e;return i}function u(e){return 0===e&&Number.NEGATIVE_INFINITY===1/e}t.exports.isNothing=i,t.exports.isObject=r,t.exports.toArray=o,t.exports.repeat=s,t.exports.isNegativeZero=u,t.exports.extend=a;},{}],3:[function(e,t,n){function i(e,t){var n,i,r,o,a,s,u;if(null===t)return {};for(n={},i=Object.keys(t),r=0,o=i.length;o>r;r+=1)a=i[r],s=String(t[a]),"!!"===a.slice(0,2)&&(a="tag:yaml.org,2002:"+a.slice(2)),u=e.compiledTypeMap[a],u&&F.call(u.styleAliases,s)&&(s=u.styleAliases[s]),n[a]=s;return n}function r(e){var t,n,i;if(t=e.toString(16).toUpperCase(),255>=e)n="x",i=2;else if(65535>=e)n="u",i=4;else {if(!(4294967295>=e))throw new I("code point within a string may not be greater than 0xFFFFFFFF");n="U",i=8;}return "\\"+n+j.repeat("0",i-t.length)+t}function o(e){this.schema=e.schema||S,this.indent=Math.max(1,e.indent||2),this.skipInvalid=e.skipInvalid||!1,this.flowLevel=j.isNothing(e.flowLevel)?-1:e.flowLevel,this.styleMap=i(this.schema,e.styles||null),this.sortKeys=e.sortKeys||!1,this.implicitTypes=this.schema.compiledImplicit,this.explicitTypes=this.schema.compiledExplicit,this.tag=null,this.result="",this.duplicates=[],this.usedDuplicates=null;}function a(e,t){for(var n,i=j.repeat(" ",t),r=0,o=-1,a="",s=e.length;s>r;)o=e.indexOf("\n",r),-1===o?(n=e.slice(r),r=s):(n=e.slice(r,o+1),r=o+1),n.length&&"\n"!==n&&(a+=i),a+=n;return a}function s(e,t){return "\n"+j.repeat(" ",e.indent*t)}function u(e,t){var n,i,r;for(n=0,i=e.implicitTypes.length;i>n;n+=1)if(r=e.implicitTypes[n],r.resolve(t))return !0;return !1}function c(e){this.source=e,this.result="",this.checkpoint=0;}function l(e,t,n){var i,r,o,s,l,f,m,g,y,x,v,A,b,w,C,k,j,I,S,O,E;if(0===t.length)return void(e.dump="''");if(-1!==te.indexOf(t))return void(e.dump="'"+t+"'");for(i=!0,r=t.length?t.charCodeAt(0):0,o=M===r||M===t.charCodeAt(t.length-1),(K===r||G===r||V===r||J===r)&&(i=!1),o?(i=!1,s=!1,l=!1):(s=!0,l=!0),f=!0,m=new c(t),g=!1,y=0,x=0,v=e.indent*n,A=80,40>v?A-=v:A=40,w=0;w<t.length;w++){if(b=t.charCodeAt(w),i){if(h(b))continue;i=!1;}f&&b===P&&(f=!1),C=ee[b],k=d(b),(C||k)&&(b!==T&&b!==D&&b!==P?(s=!1,l=!1):b===T&&(g=!0,f=!1,w>0&&(j=t.charCodeAt(w-1),j===M&&(l=!1,s=!1)),s&&(I=w-y,y=w,I>x&&(x=I))),b!==D&&(f=!1),m.takeUpTo(w),m.escapeChar());}if(i&&u(e,t)&&(i=!1),S="",(s||l)&&(O=0,t.charCodeAt(t.length-1)===T&&(O+=1,t.charCodeAt(t.length-2)===T&&(O+=1)),0===O?S="-":2===O&&(S="+")),l&&A>x&&(s=!1),g||(l=!1),i)e.dump=t;else if(f)e.dump="'"+t+"'";else if(s)E=p(t,A),e.dump=">"+S+"\n"+a(E,v);else if(l)S||(t=t.replace(/\n$/,"")),e.dump="|"+S+"\n"+a(t,v);else {if(!m)throw new Error("Failed to dump scalar value");m.finish(),e.dump='"'+m.result+'"';}}function p(e,t){var n,i="",r=0,o=e.length,a=/\n+$/.exec(e);for(a&&(o=a.index+1);o>r;)n=e.indexOf("\n",r),n>o||-1===n?(i&&(i+="\n\n"),i+=f(e.slice(r,o),t),r=o):(i&&(i+="\n\n"),i+=f(e.slice(r,n),t),r=n+1);return a&&"\n"!==a[0]&&(i+=a[0]),i}function f(e,t){if(""===e)return e;for(var n,i,r,o=/[^\s] [^\s]/g,a="",s=0,u=0,c=o.exec(e);c;)n=c.index,n-u>t&&(i=s!==u?s:n,a&&(a+="\n"),r=e.slice(u,i),a+=r,u=i+1),s=n+1,c=o.exec(e);return a&&(a+="\n"),a+=u!==s&&e.length-u>t?e.slice(u,s)+"\n"+e.slice(s+1):e.slice(u)}function h(e){return N!==e&&T!==e&&_!==e&&B!==e&&W!==e&&Z!==e&&z!==e&&X!==e&&U!==e&&q!==e&&$!==e&&L!==e&&Q!==e&&H!==e&&P!==e&&D!==e&&Y!==e&&R!==e&&!ee[e]&&!d(e)}function d(e){return !(e>=32&&126>=e||133===e||e>=160&&55295>=e||e>=57344&&65533>=e||e>=65536&&1114111>=e)}function m(e,t,n){var i,r,o="",a=e.tag;for(i=0,r=n.length;r>i;i+=1)A(e,t,n[i],!1,!1)&&(0!==i&&(o+=", "),o+=e.dump);e.tag=a,e.dump="["+o+"]";}function g(e,t,n,i){var r,o,a="",u=e.tag;for(r=0,o=n.length;o>r;r+=1)A(e,t+1,n[r],!0,!0)&&(i&&0===r||(a+=s(e,t)),a+="- "+e.dump);e.tag=u,e.dump=a||"[]";}function y(e,t,n){var i,r,o,a,s,u="",c=e.tag,l=Object.keys(n);for(i=0,r=l.length;r>i;i+=1)s="",0!==i&&(s+=", "),o=l[i],a=n[o],A(e,t,o,!1,!1)&&(e.dump.length>1024&&(s+="? "),s+=e.dump+": ",A(e,t,a,!1,!1)&&(s+=e.dump,u+=s));e.tag=c,e.dump="{"+u+"}";}function x(e,t,n,i){var r,o,a,u,c,l,p="",f=e.tag,h=Object.keys(n);if(e.sortKeys===!0)h.sort();else if("function"==typeof e.sortKeys)h.sort(e.sortKeys);else if(e.sortKeys)throw new I("sortKeys must be a boolean or a function");for(r=0,o=h.length;o>r;r+=1)l="",i&&0===r||(l+=s(e,t)),a=h[r],u=n[a],A(e,t+1,a,!0,!0)&&(c=null!==e.tag&&"?"!==e.tag||e.dump&&e.dump.length>1024,c&&(l+=e.dump&&T===e.dump.charCodeAt(0)?"?":"? "),l+=e.dump,c&&(l+=s(e,t)),A(e,t+1,u,!0,c)&&(l+=e.dump&&T===e.dump.charCodeAt(0)?":":": ",l+=e.dump,p+=l));e.tag=f,e.dump=p||"{}";}function v(e,t,n){var i,r,o,a,s,u;for(r=n?e.explicitTypes:e.implicitTypes,o=0,a=r.length;a>o;o+=1)if(s=r[o],(s.instanceOf||s.predicate)&&(!s.instanceOf||"object"==typeof t&&t instanceof s.instanceOf)&&(!s.predicate||s.predicate(t))){if(e.tag=n?s.tag:"?",s.represent){if(u=e.styleMap[s.tag]||s.defaultStyle,"[object Function]"===E.call(s.represent))i=s.represent(t,u);else {if(!F.call(s.represent,u))throw new I("!<"+s.tag+'> tag resolver accepts not "'+u+'" style');i=s.represent[u](t,u);}e.dump=i;}return !0}return !1}function A(e,t,n,i,r){e.tag=null,e.dump=n,v(e,n,!1)||v(e,n,!0);var o=E.call(e.dump);i&&(i=0>e.flowLevel||e.flowLevel>t),(null!==e.tag&&"?"!==e.tag||2!==e.indent&&t>0)&&(r=!1);var a,s,u="[object Object]"===o||"[object Array]"===o;if(u&&(a=e.duplicates.indexOf(n),s=-1!==a),s&&e.usedDuplicates[a])e.dump="*ref_"+a;else {if(u&&s&&!e.usedDuplicates[a]&&(e.usedDuplicates[a]=!0),"[object Object]"===o)i&&0!==Object.keys(e.dump).length?(x(e,t,e.dump,r),s&&(e.dump="&ref_"+a+(0===t?"\n":"")+e.dump)):(y(e,t,e.dump),s&&(e.dump="&ref_"+a+" "+e.dump));else if("[object Array]"===o)i&&0!==e.dump.length?(g(e,t,e.dump,r),s&&(e.dump="&ref_"+a+(0===t?"\n":"")+e.dump)):(m(e,t,e.dump),s&&(e.dump="&ref_"+a+" "+e.dump));else {if("[object String]"!==o){if(e.skipInvalid)return !1;throw new I("unacceptable kind of an object to dump "+o)}"?"!==e.tag&&l(e,e.dump,t);}null!==e.tag&&"?"!==e.tag&&(e.dump="!<"+e.tag+"> "+e.dump);}return !0}function b(e,t){var n,i,r=[],o=[];for(w(e,r,o),n=0,i=o.length;i>n;n+=1)t.duplicates.push(r[o[n]]);t.usedDuplicates=new Array(i);}function w(e,t,n){{var i,r,o;E.call(e);}if(null!==e&&"object"==typeof e)if(r=t.indexOf(e),-1!==r)-1===n.indexOf(r)&&n.push(r);else if(t.push(e),Array.isArray(e))for(r=0,o=e.length;o>r;r+=1)w(e[r],t,n);else for(i=Object.keys(e),r=0,o=i.length;o>r;r+=1)w(e[i[r]],t,n);}function C(e,t){t=t||{};var n=new o(t);return b(e,n),A(n,0,e,!0,!0)?n.dump+"\n":""}function k(e,t){return C(e,j.extend({schema:O},t))}var j=e("./common"),I=e("./exception"),S=e("./schema/default_full"),O=e("./schema/default_safe"),E=Object.prototype.toString,F=Object.prototype.hasOwnProperty,N=9,T=10,_=13,M=32,L=33,D=34,U=35,Y=37,q=38,P=39,$=42,B=44,K=45,R=58,H=62,G=63,V=64,W=91,Z=93,J=96,z=123,Q=124,X=125,ee={};ee[0]="\\0",ee[7]="\\a",ee[8]="\\b",ee[9]="\\t",ee[10]="\\n",ee[11]="\\v",ee[12]="\\f",ee[13]="\\r",ee[27]="\\e",ee[34]='\\"',ee[92]="\\\\",ee[133]="\\N",ee[160]="\\_",ee[8232]="\\L",ee[8233]="\\P";var te=["y","Y","yes","Yes","YES","on","On","ON","n","N","no","No","NO","off","Off","OFF"];c.prototype.takeUpTo=function(e){var t;if(e<this.checkpoint)throw t=new Error("position should be > checkpoint"),t.position=e,t.checkpoint=this.checkpoint,t;return this.result+=this.source.slice(this.checkpoint,e),this.checkpoint=e,this},c.prototype.escapeChar=function(){var e,t;return e=this.source.charCodeAt(this.checkpoint),t=ee[e]||r(e),this.result+=t,this.checkpoint+=1,this},c.prototype.finish=function(){this.source.length>this.checkpoint&&this.takeUpTo(this.source.length);},t.exports.dump=C,t.exports.safeDump=k;},{"./common":2,"./exception":4,"./schema/default_full":9,"./schema/default_safe":10}],4:[function(e,t,n){function i(e,t){this.name="YAMLException",this.reason=e,this.mark=t,this.message=this.toString(!1);}i.prototype.toString=function(e){var t;return t="JS-YAML: "+(this.reason||"(unknown reason)"),!e&&this.mark&&(t+=" "+this.mark.toString()),t},t.exports=i;},{}],5:[function(e,t,n){function i(e){return 10===e||13===e}function r(e){return 9===e||32===e}function o(e){return 9===e||32===e||10===e||13===e}function a(e){return 44===e||91===e||93===e||123===e||125===e}function s(e){var t;return e>=48&&57>=e?e-48:(t=32|e,t>=97&&102>=t?t-97+10:-1)}function u(e){return 120===e?2:117===e?4:85===e?8:0}function c(e){return e>=48&&57>=e?e-48:-1}function l(e){return 48===e?"\x00":97===e?"":98===e?"\b":116===e?"	":9===e?"	":110===e?"\n":118===e?"":102===e?"\f":114===e?"\r":101===e?"":32===e?" ":34===e?'"':47===e?"/":92===e?"\\":78===e?"":95===e?" ":76===e?"\u2028":80===e?"\u2029":""}function p(e){return 65535>=e?String.fromCharCode(e):String.fromCharCode((e-65536>>10)+55296,(e-65536&1023)+56320)}function f(e,t){this.input=e,this.filename=t.filename||null,this.schema=t.schema||R,this.onWarning=t.onWarning||null,this.legacy=t.legacy||!1,this.implicitTypes=this.schema.compiledImplicit,this.typeMap=this.schema.compiledTypeMap,this.length=e.length,this.position=0,this.line=0,this.lineStart=0,this.lineIndent=0,this.documents=[];}function h(e,t){return new $(t,new B(e.filename,e.input,e.position,e.line,e.position-e.lineStart))}function d(e,t){throw h(e,t)}function m(e,t){var n=h(e,t);if(!e.onWarning)throw n;e.onWarning.call(null,n);}function g(e,t,n,i){var r,o,a,s;if(n>t){if(s=e.input.slice(t,n),i)for(r=0,o=s.length;o>r;r+=1)a=s.charCodeAt(r),9===a||a>=32&&1114111>=a||d(e,"expected valid JSON character");e.result+=s;}}function y(e,t,n){var i,r,o,a;for(P.isObject(n)||d(e,"cannot merge mappings; the provided source object is unacceptable"),i=Object.keys(n),o=0,a=i.length;a>o;o+=1)r=i[o],H.call(t,r)||(t[r]=n[r]);}function x(e,t,n,i,r){var o,a;if(i=String(i),null===t&&(t={}),"tag:yaml.org,2002:merge"===n)if(Array.isArray(r))for(o=0,a=r.length;a>o;o+=1)y(e,t,r[o]);else y(e,t,r);else t[i]=r;return t}function v(e){var t;t=e.input.charCodeAt(e.position),10===t?e.position++:13===t?(e.position++,10===e.input.charCodeAt(e.position)&&e.position++):d(e,"a line break is expected"),e.line+=1,e.lineStart=e.position;}function A(e,t,n){for(var o=0,a=e.input.charCodeAt(e.position);0!==a;){for(;r(a);)a=e.input.charCodeAt(++e.position);if(t&&35===a)do a=e.input.charCodeAt(++e.position);while(10!==a&&13!==a&&0!==a);if(!i(a))break;for(v(e),a=e.input.charCodeAt(e.position),o++,e.lineIndent=0;32===a;)e.lineIndent++,a=e.input.charCodeAt(++e.position);}return -1!==n&&0!==o&&e.lineIndent<n&&m(e,"deficient indentation"),o}function b(e){var t,n=e.position;return t=e.input.charCodeAt(n),45!==t&&46!==t||e.input.charCodeAt(n+1)!==t||e.input.charCodeAt(n+2)!==t||(n+=3,t=e.input.charCodeAt(n),0!==t&&!o(t))?!1:!0}function w(e,t){1===t?e.result+=" ":t>1&&(e.result+=P.repeat("\n",t-1));}function C(e,t,n){var s,u,c,l,p,f,h,d,m,y=e.kind,x=e.result;if(m=e.input.charCodeAt(e.position),o(m)||a(m)||35===m||38===m||42===m||33===m||124===m||62===m||39===m||34===m||37===m||64===m||96===m)return !1;if((63===m||45===m)&&(u=e.input.charCodeAt(e.position+1),o(u)||n&&a(u)))return !1;for(e.kind="scalar",e.result="",c=l=e.position,p=!1;0!==m;){if(58===m){if(u=e.input.charCodeAt(e.position+1),o(u)||n&&a(u))break}else if(35===m){if(s=e.input.charCodeAt(e.position-1),o(s))break}else {if(e.position===e.lineStart&&b(e)||n&&a(m))break;if(i(m)){if(f=e.line,h=e.lineStart,d=e.lineIndent,A(e,!1,-1),e.lineIndent>=t){p=!0,m=e.input.charCodeAt(e.position);continue}e.position=l,e.line=f,e.lineStart=h,e.lineIndent=d;break}}p&&(g(e,c,l,!1),w(e,e.line-f),c=l=e.position,p=!1),r(m)||(l=e.position+1),m=e.input.charCodeAt(++e.position);}return g(e,c,l,!1),e.result?!0:(e.kind=y,e.result=x,!1)}function k(e,t){var n,r,o;if(n=e.input.charCodeAt(e.position),39!==n)return !1;for(e.kind="scalar",e.result="",e.position++,r=o=e.position;0!==(n=e.input.charCodeAt(e.position));)if(39===n){if(g(e,r,e.position,!0),n=e.input.charCodeAt(++e.position),39!==n)return !0;r=o=e.position,e.position++;}else i(n)?(g(e,r,o,!0),w(e,A(e,!1,t)),r=o=e.position):e.position===e.lineStart&&b(e)?d(e,"unexpected end of the document within a single quoted scalar"):(e.position++,o=e.position);d(e,"unexpected end of the stream within a single quoted scalar");}function j(e,t){var n,r,o,a,c,l;if(l=e.input.charCodeAt(e.position),34!==l)return !1;for(e.kind="scalar",e.result="",e.position++,n=r=e.position;0!==(l=e.input.charCodeAt(e.position));){if(34===l)return g(e,n,e.position,!0),e.position++,!0;if(92===l){if(g(e,n,e.position,!0),l=e.input.charCodeAt(++e.position),i(l))A(e,!1,t);else if(256>l&&re[l])e.result+=oe[l],e.position++;else if((c=u(l))>0){for(o=c,a=0;o>0;o--)l=e.input.charCodeAt(++e.position),(c=s(l))>=0?a=(a<<4)+c:d(e,"expected hexadecimal character");e.result+=p(a),e.position++;}else d(e,"unknown escape sequence");n=r=e.position;}else i(l)?(g(e,n,r,!0),w(e,A(e,!1,t)),n=r=e.position):e.position===e.lineStart&&b(e)?d(e,"unexpected end of the document within a double quoted scalar"):(e.position++,r=e.position);}d(e,"unexpected end of the stream within a double quoted scalar");}function I(e,t){var n,i,r,a,s,u,c,l,p,f,h,m=!0,g=e.tag,y=e.anchor;if(h=e.input.charCodeAt(e.position),91===h)a=93,c=!1,i=[];else {if(123!==h)return !1;a=125,c=!0,i={};}for(null!==e.anchor&&(e.anchorMap[e.anchor]=i),h=e.input.charCodeAt(++e.position);0!==h;){if(A(e,!0,t),h=e.input.charCodeAt(e.position),h===a)return e.position++,e.tag=g,e.anchor=y,e.kind=c?"mapping":"sequence",e.result=i,!0;m||d(e,"missed comma between flow collection entries"),p=l=f=null,s=u=!1,63===h&&(r=e.input.charCodeAt(e.position+1),o(r)&&(s=u=!0,e.position++,A(e,!0,t))),n=e.line,_(e,t,G,!1,!0),p=e.tag,l=e.result,A(e,!0,t),h=e.input.charCodeAt(e.position),!u&&e.line!==n||58!==h||(s=!0,h=e.input.charCodeAt(++e.position),A(e,!0,t),_(e,t,G,!1,!0),f=e.result),c?x(e,i,p,l,f):i.push(s?x(e,null,p,l,f):l),A(e,!0,t),h=e.input.charCodeAt(e.position),44===h?(m=!0,h=e.input.charCodeAt(++e.position)):m=!1;}d(e,"unexpected end of the stream within a flow collection");}function S(e,t){var n,o,a,s,u=J,l=!1,p=t,f=0,h=!1;if(s=e.input.charCodeAt(e.position),124===s)o=!1;else {if(62!==s)return !1;o=!0;}for(e.kind="scalar",e.result="";0!==s;)if(s=e.input.charCodeAt(++e.position),43===s||45===s)J===u?u=43===s?Q:z:d(e,"repeat of a chomping mode identifier");else {if(!((a=c(s))>=0))break;0===a?d(e,"bad explicit indentation width of a block scalar; it cannot be less than one"):l?d(e,"repeat of an indentation width identifier"):(p=t+a-1,l=!0);}if(r(s)){do s=e.input.charCodeAt(++e.position);while(r(s));if(35===s)do s=e.input.charCodeAt(++e.position);while(!i(s)&&0!==s)}for(;0!==s;){for(v(e),e.lineIndent=0,s=e.input.charCodeAt(e.position);(!l||e.lineIndent<p)&&32===s;)e.lineIndent++,s=e.input.charCodeAt(++e.position);if(!l&&e.lineIndent>p&&(p=e.lineIndent),i(s))f++;else {if(e.lineIndent<p){u===Q?e.result+=P.repeat("\n",f):u===J&&l&&(e.result+="\n");break}for(o?r(s)?(h=!0,e.result+=P.repeat("\n",f+1)):h?(h=!1,e.result+=P.repeat("\n",f+1)):0===f?l&&(e.result+=" "):e.result+=P.repeat("\n",f):l&&(e.result+=P.repeat("\n",f+1)),l=!0,f=0,n=e.position;!i(s)&&0!==s;)s=e.input.charCodeAt(++e.position);g(e,n,e.position,!1);}}return !0}function O(e,t){var n,i,r,a=e.tag,s=e.anchor,u=[],c=!1;for(null!==e.anchor&&(e.anchorMap[e.anchor]=u),r=e.input.charCodeAt(e.position);0!==r&&45===r&&(i=e.input.charCodeAt(e.position+1),o(i));)if(c=!0,e.position++,A(e,!0,-1)&&e.lineIndent<=t)u.push(null),r=e.input.charCodeAt(e.position);else if(n=e.line,_(e,t,W,!1,!0),u.push(e.result),A(e,!0,-1),r=e.input.charCodeAt(e.position),(e.line===n||e.lineIndent>t)&&0!==r)d(e,"bad indentation of a sequence entry");else if(e.lineIndent<t)break;return c?(e.tag=a,e.anchor=s,e.kind="sequence",e.result=u,!0):!1}function E(e,t,n){var i,a,s,u,c=e.tag,l=e.anchor,p={},f=null,h=null,m=null,g=!1,y=!1;for(null!==e.anchor&&(e.anchorMap[e.anchor]=p),u=e.input.charCodeAt(e.position);0!==u;){if(i=e.input.charCodeAt(e.position+1),s=e.line,63!==u&&58!==u||!o(i)){if(!_(e,n,V,!1,!0))break;if(e.line===s){for(u=e.input.charCodeAt(e.position);r(u);)u=e.input.charCodeAt(++e.position);if(58===u)u=e.input.charCodeAt(++e.position),o(u)||d(e,"a whitespace character is expected after the key-value separator within a block mapping"),g&&(x(e,p,f,h,null),f=h=m=null),y=!0,g=!1,a=!1,f=e.tag,h=e.result;else {if(!y)return e.tag=c,e.anchor=l,!0;d(e,"can not read an implicit mapping pair; a colon is missed");}}else {if(!y)return e.tag=c,e.anchor=l,!0;d(e,"can not read a block mapping entry; a multiline key may not be an implicit key");}}else 63===u?(g&&(x(e,p,f,h,null),f=h=m=null),y=!0,g=!0,a=!0):g?(g=!1,a=!0):d(e,"incomplete explicit mapping pair; a key node is missed"),e.position+=1,u=i;if((e.line===s||e.lineIndent>t)&&(_(e,t,Z,!0,a)&&(g?h=e.result:m=e.result),g||(x(e,p,f,h,m),f=h=m=null),A(e,!0,-1),u=e.input.charCodeAt(e.position)),e.lineIndent>t&&0!==u)d(e,"bad indentation of a mapping entry");else if(e.lineIndent<t)break}return g&&x(e,p,f,h,null),y&&(e.tag=c,e.anchor=l,e.kind="mapping",e.result=p),y}function F(e){var t,n,i,r,a=!1,s=!1;if(r=e.input.charCodeAt(e.position),33!==r)return !1;if(null!==e.tag&&d(e,"duplication of a tag property"),r=e.input.charCodeAt(++e.position),60===r?(a=!0,r=e.input.charCodeAt(++e.position)):33===r?(s=!0,n="!!",r=e.input.charCodeAt(++e.position)):n="!",t=e.position,a){do r=e.input.charCodeAt(++e.position);while(0!==r&&62!==r);e.position<e.length?(i=e.input.slice(t,e.position),r=e.input.charCodeAt(++e.position)):d(e,"unexpected end of the stream within a verbatim tag");}else {for(;0!==r&&!o(r);)33===r&&(s?d(e,"tag suffix cannot contain exclamation marks"):(n=e.input.slice(t-1,e.position+1),ne.test(n)||d(e,"named tag handle cannot contain such characters"),s=!0,t=e.position+1)),r=e.input.charCodeAt(++e.position);i=e.input.slice(t,e.position),te.test(i)&&d(e,"tag suffix cannot contain flow indicator characters");}return i&&!ie.test(i)&&d(e,"tag name cannot contain such characters: "+i),a?e.tag=i:H.call(e.tagMap,n)?e.tag=e.tagMap[n]+i:"!"===n?e.tag="!"+i:"!!"===n?e.tag="tag:yaml.org,2002:"+i:d(e,'undeclared tag handle "'+n+'"'),!0}function N(e){var t,n;if(n=e.input.charCodeAt(e.position),38!==n)return !1;for(null!==e.anchor&&d(e,"duplication of an anchor property"),n=e.input.charCodeAt(++e.position),t=e.position;0!==n&&!o(n)&&!a(n);)n=e.input.charCodeAt(++e.position);return e.position===t&&d(e,"name of an anchor node must contain at least one character"),e.anchor=e.input.slice(t,e.position),!0}function T(e){{var t,n,i;e.length,e.input;}if(i=e.input.charCodeAt(e.position),42!==i)return !1;for(i=e.input.charCodeAt(++e.position),t=e.position;0!==i&&!o(i)&&!a(i);)i=e.input.charCodeAt(++e.position);return e.position===t&&d(e,"name of an alias node must contain at least one character"),n=e.input.slice(t,e.position),e.anchorMap.hasOwnProperty(n)||d(e,'unidentified alias "'+n+'"'),e.result=e.anchorMap[n],A(e,!0,-1),!0}function _(e,t,n,i,r){var o,a,s,u,c,l,p,f,h=1,g=!1,y=!1;if(e.tag=null,e.anchor=null,e.kind=null,e.result=null,o=a=s=Z===n||W===n,i&&A(e,!0,-1)&&(g=!0,e.lineIndent>t?h=1:e.lineIndent===t?h=0:e.lineIndent<t&&(h=-1)),1===h)for(;F(e)||N(e);)A(e,!0,-1)?(g=!0,s=o,e.lineIndent>t?h=1:e.lineIndent===t?h=0:e.lineIndent<t&&(h=-1)):s=!1;if(s&&(s=g||r),(1===h||Z===n)&&(p=G===n||V===n?t:t+1,f=e.position-e.lineStart,1===h?s&&(O(e,f)||E(e,f,p))||I(e,p)?y=!0:(a&&S(e,p)||k(e,p)||j(e,p)?y=!0:T(e)?(y=!0,(null!==e.tag||null!==e.anchor)&&d(e,"alias node should not have any properties")):C(e,p,G===n)&&(y=!0,null===e.tag&&(e.tag="?")),null!==e.anchor&&(e.anchorMap[e.anchor]=e.result)):0===h&&(y=s&&O(e,f))),null!==e.tag&&"!"!==e.tag)if("?"===e.tag){for(u=0,c=e.implicitTypes.length;c>u;u+=1)if(l=e.implicitTypes[u],l.resolve(e.result)){e.result=l.construct(e.result),e.tag=l.tag,null!==e.anchor&&(e.anchorMap[e.anchor]=e.result);break}}else H.call(e.typeMap,e.tag)?(l=e.typeMap[e.tag],null!==e.result&&l.kind!==e.kind&&d(e,"unacceptable node kind for !<"+e.tag+'> tag; it should be "'+l.kind+'", not "'+e.kind+'"'),l.resolve(e.result)?(e.result=l.construct(e.result),null!==e.anchor&&(e.anchorMap[e.anchor]=e.result)):d(e,"cannot resolve a node with !<"+e.tag+"> explicit tag")):m(e,"unknown tag !<"+e.tag+">");return null!==e.tag||null!==e.anchor||y}function M(e){var t,n,a,s,u=e.position,c=!1;for(e.version=null,e.checkLineBreaks=e.legacy,e.tagMap={},e.anchorMap={};0!==(s=e.input.charCodeAt(e.position))&&(A(e,!0,-1),s=e.input.charCodeAt(e.position),!(e.lineIndent>0||37!==s));){for(c=!0,s=e.input.charCodeAt(++e.position),t=e.position;0!==s&&!o(s);)s=e.input.charCodeAt(++e.position);for(n=e.input.slice(t,e.position),a=[],n.length<1&&d(e,"directive name must not be less than one character in length");0!==s;){for(;r(s);)s=e.input.charCodeAt(++e.position);if(35===s){do s=e.input.charCodeAt(++e.position);while(0!==s&&!i(s));break}if(i(s))break;for(t=e.position;0!==s&&!o(s);)s=e.input.charCodeAt(++e.position);a.push(e.input.slice(t,e.position));}0!==s&&v(e),H.call(se,n)?se[n](e,n,a):m(e,'unknown document directive "'+n+'"');}return A(e,!0,-1),0===e.lineIndent&&45===e.input.charCodeAt(e.position)&&45===e.input.charCodeAt(e.position+1)&&45===e.input.charCodeAt(e.position+2)?(e.position+=3,A(e,!0,-1)):c&&d(e,"directives end mark is expected"),_(e,e.lineIndent-1,Z,!1,!0),A(e,!0,-1),e.checkLineBreaks&&ee.test(e.input.slice(u,e.position))&&m(e,"non-ASCII line breaks are interpreted as content"),e.documents.push(e.result),e.position===e.lineStart&&b(e)?void(46===e.input.charCodeAt(e.position)&&(e.position+=3,A(e,!0,-1))):void(e.position<e.length-1&&d(e,"end of the stream or a document separator is expected"))}function L(e,t){e=String(e),t=t||{},0!==e.length&&(10!==e.charCodeAt(e.length-1)&&13!==e.charCodeAt(e.length-1)&&(e+="\n"),65279===e.charCodeAt(0)&&(e=e.slice(1)));var n=new f(e,t);for(X.test(n.input)&&d(n,"the stream contains non-printable characters"),n.input+="\x00";32===n.input.charCodeAt(n.position);)n.lineIndent+=1,n.position+=1;for(;n.position<n.length-1;)M(n);return n.documents}function D(e,t,n){var i,r,o=L(e,n);for(i=0,r=o.length;r>i;i+=1)t(o[i]);}function U(e,t){var n=L(e,t);if(0===n.length)return void 0;if(1===n.length)return n[0];throw new $("expected a single document in the stream, but found more")}function Y(e,t,n){D(e,t,P.extend({schema:K},n));}function q(e,t){return U(e,P.extend({schema:K},t))}for(var P=e("./common"),$=e("./exception"),B=e("./mark"),K=e("./schema/default_safe"),R=e("./schema/default_full"),H=Object.prototype.hasOwnProperty,G=1,V=2,W=3,Z=4,J=1,z=2,Q=3,X=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,ee=/[\x85\u2028\u2029]/,te=/[,\[\]\{\}]/,ne=/^(?:!|!!|![a-z\-]+!)$/i,ie=/^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i,re=new Array(256),oe=new Array(256),ae=0;256>ae;ae++)re[ae]=l(ae)?1:0,oe[ae]=l(ae);var se={YAML:function(e,t,n){var i,r,o;null!==e.version&&d(e,"duplication of %YAML directive"),1!==n.length&&d(e,"YAML directive accepts exactly one argument"),i=/^([0-9]+)\.([0-9]+)$/.exec(n[0]),null===i&&d(e,"ill-formed argument of the YAML directive"),r=parseInt(i[1],10),o=parseInt(i[2],10),1!==r&&d(e,"unacceptable YAML version of the document"),e.version=n[0],e.checkLineBreaks=2>o,1!==o&&2!==o&&m(e,"unsupported YAML version of the document");},TAG:function(e,t,n){var i,r;2!==n.length&&d(e,"TAG directive accepts exactly two arguments"),i=n[0],r=n[1],ne.test(i)||d(e,"ill-formed tag handle (first argument) of the TAG directive"),H.call(e.tagMap,i)&&d(e,'there is a previously declared suffix for "'+i+'" tag handle'),ie.test(r)||d(e,"ill-formed tag prefix (second argument) of the TAG directive"),e.tagMap[i]=r;}};t.exports.loadAll=D,t.exports.load=U,t.exports.safeLoadAll=Y,t.exports.safeLoad=q;},{"./common":2,"./exception":4,"./mark":6,"./schema/default_full":9,"./schema/default_safe":10}],6:[function(e,t,n){function i(e,t,n,i,r){this.name=e,this.buffer=t,this.position=n,this.line=i,this.column=r;}var r=e("./common");i.prototype.getSnippet=function(e,t){var n,i,o,a,s;if(!this.buffer)return null;for(e=e||4,t=t||75,n="",i=this.position;i>0&&-1==="\x00\r\n\u2028\u2029".indexOf(this.buffer.charAt(i-1));)if(i-=1,this.position-i>t/2-1){n=" ... ",i+=5;break}for(o="",a=this.position;a<this.buffer.length&&-1==="\x00\r\n\u2028\u2029".indexOf(this.buffer.charAt(a));)if(a+=1,a-this.position>t/2-1){o=" ... ",a-=5;break}return s=this.buffer.slice(i,a),r.repeat(" ",e)+n+s+o+"\n"+r.repeat(" ",e+this.position-i+n.length)+"^"},i.prototype.toString=function(e){var t,n="";return this.name&&(n+='in "'+this.name+'" '),n+="at line "+(this.line+1)+", column "+(this.column+1),e||(t=this.getSnippet(),t&&(n+=":\n"+t)),n},t.exports=i;},{"./common":2}],7:[function(e,t,n){function i(e,t,n){var r=[];return e.include.forEach(function(e){n=i(e,t,n);}),e[t].forEach(function(e){n.forEach(function(t,n){t.tag===e.tag&&r.push(n);}),n.push(e);}),n.filter(function(e,t){return -1===r.indexOf(t)})}function r(){function e(e){i[e.tag]=e;}var t,n,i={};for(t=0,n=arguments.length;n>t;t+=1)arguments[t].forEach(e);return i}function o(e){this.include=e.include||[],this.implicit=e.implicit||[],this.explicit=e.explicit||[],this.implicit.forEach(function(e){if(e.loadKind&&"scalar"!==e.loadKind)throw new s("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.")}),this.compiledImplicit=i(this,"implicit",[]),this.compiledExplicit=i(this,"explicit",[]),this.compiledTypeMap=r(this.compiledImplicit,this.compiledExplicit);}var a=e("./common"),s=e("./exception"),u=e("./type");o.DEFAULT=null,o.create=function(){var e,t;switch(arguments.length){case 1:e=o.DEFAULT,t=arguments[0];break;case 2:e=arguments[0],t=arguments[1];break;default:throw new s("Wrong number of arguments for Schema.create function")}if(e=a.toArray(e),t=a.toArray(t),!e.every(function(e){return e instanceof o}))throw new s("Specified list of super schemas (or a single Schema object) contains a non-Schema object.");if(!t.every(function(e){return e instanceof u}))throw new s("Specified list of YAML types (or a single Type object) contains a non-Type object.");return new o({include:e,explicit:t})},t.exports=o;},{"./common":2,"./exception":4,"./type":13}],8:[function(e,t,n){var i=e("../schema");t.exports=new i({include:[e("./json")]});},{"../schema":7,"./json":12}],9:[function(e,t,n){var i=e("../schema");t.exports=i.DEFAULT=new i({include:[e("./default_safe")],explicit:[e("../type/js/undefined"),e("../type/js/regexp"),e("../type/js/function")]});},{"../schema":7,"../type/js/function":18,"../type/js/regexp":19,"../type/js/undefined":20,"./default_safe":10}],10:[function(e,t,n){var i=e("../schema");t.exports=new i({include:[e("./core")],implicit:[e("../type/timestamp"),e("../type/merge")],explicit:[e("../type/binary"),e("../type/omap"),e("../type/pairs"),e("../type/set")]});},{"../schema":7,"../type/binary":14,"../type/merge":22,"../type/omap":24,"../type/pairs":25,"../type/set":27,"../type/timestamp":29,"./core":8}],11:[function(e,t,n){var i=e("../schema");t.exports=new i({explicit:[e("../type/str"),e("../type/seq"),e("../type/map")]});},{"../schema":7,"../type/map":21,"../type/seq":26,"../type/str":28}],12:[function(e,t,n){var i=e("../schema");t.exports=new i({include:[e("./failsafe")],implicit:[e("../type/null"),e("../type/bool"),e("../type/int"),e("../type/float")]});},{"../schema":7,"../type/bool":15,"../type/float":16,"../type/int":17,"../type/null":23,"./failsafe":11}],13:[function(e,t,n){function i(e){var t={};return null!==e&&Object.keys(e).forEach(function(n){e[n].forEach(function(e){t[String(e)]=n;});}),t}function r(e,t){if(t=t||{},Object.keys(t).forEach(function(t){if(-1===a.indexOf(t))throw new o('Unknown option "'+t+'" is met in definition of "'+e+'" YAML type.')}),this.tag=e,this.kind=t.kind||null,this.resolve=t.resolve||function(){return !0},this.construct=t.construct||function(e){return e},this.instanceOf=t.instanceOf||null,this.predicate=t.predicate||null,this.represent=t.represent||null,this.defaultStyle=t.defaultStyle||null,this.styleAliases=i(t.styleAliases||null),-1===s.indexOf(this.kind))throw new o('Unknown kind "'+this.kind+'" is specified for "'+e+'" YAML type.')}var o=e("./exception"),a=["kind","resolve","construct","instanceOf","predicate","represent","defaultStyle","styleAliases"],s=["scalar","sequence","mapping"];t.exports=r;},{"./exception":4}],14:[function(e,t,n){function i(e){if(null===e)return !1;var t,n,i=0,r=e.length,o=c;for(n=0;r>n;n++)if(t=o.indexOf(e.charAt(n)),!(t>64)){if(0>t)return !1;i+=6;}return i%8===0}function r(e){var t,n,i=e.replace(/[\r\n=]/g,""),r=i.length,o=c,a=0,u=[];for(t=0;r>t;t++)t%4===0&&t&&(u.push(a>>16&255),u.push(a>>8&255),u.push(255&a)),a=a<<6|o.indexOf(i.charAt(t));return n=r%4*6,0===n?(u.push(a>>16&255),u.push(a>>8&255),u.push(255&a)):18===n?(u.push(a>>10&255),u.push(a>>2&255)):12===n&&u.push(a>>4&255),s?new s(u):u}function o(e){var t,n,i="",r=0,o=e.length,a=c;for(t=0;o>t;t++)t%3===0&&t&&(i+=a[r>>18&63],i+=a[r>>12&63],i+=a[r>>6&63],i+=a[63&r]),r=(r<<8)+e[t];return n=o%3,0===n?(i+=a[r>>18&63],i+=a[r>>12&63],i+=a[r>>6&63],i+=a[63&r]):2===n?(i+=a[r>>10&63],i+=a[r>>4&63],i+=a[r<<2&63],i+=a[64]):1===n&&(i+=a[r>>2&63],i+=a[r<<4&63],i+=a[64],i+=a[64]),i}function a(e){return s&&s.isBuffer(e)}var s=e("buffer").Buffer,u=e("../type"),c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";t.exports=new u("tag:yaml.org,2002:binary",{kind:"scalar",resolve:i,construct:r,predicate:a,represent:o});},{"../type":13,buffer:30}],15:[function(e,t,n){function i(e){if(null===e)return !1;var t=e.length;return 4===t&&("true"===e||"True"===e||"TRUE"===e)||5===t&&("false"===e||"False"===e||"FALSE"===e);

}function r(e){return "true"===e||"True"===e||"TRUE"===e}function o(e){return "[object Boolean]"===Object.prototype.toString.call(e)}var a=e("../type");t.exports=new a("tag:yaml.org,2002:bool",{kind:"scalar",resolve:i,construct:r,predicate:o,represent:{lowercase:function(e){return e?"true":"false"},uppercase:function(e){return e?"TRUE":"FALSE"},camelcase:function(e){return e?"True":"False"}},defaultStyle:"lowercase"});},{"../type":13}],16:[function(e,t,n){function i(e){if(null===e)return !1;return c.test(e)?!0:!1}function r(e){var t,n,i,r;return t=e.replace(/_/g,"").toLowerCase(),n="-"===t[0]?-1:1,r=[],0<="+-".indexOf(t[0])&&(t=t.slice(1)),".inf"===t?1===n?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY:".nan"===t?0/0:0<=t.indexOf(":")?(t.split(":").forEach(function(e){r.unshift(parseFloat(e,10));}),t=0,i=1,r.forEach(function(e){t+=e*i,i*=60;}),n*t):n*parseFloat(t,10)}function o(e,t){if(isNaN(e))switch(t){case"lowercase":return ".nan";case"uppercase":return ".NAN";case"camelcase":return ".NaN"}else if(Number.POSITIVE_INFINITY===e)switch(t){case"lowercase":return ".inf";case"uppercase":return ".INF";case"camelcase":return ".Inf"}else if(Number.NEGATIVE_INFINITY===e)switch(t){case"lowercase":return "-.inf";case"uppercase":return "-.INF";case"camelcase":return "-.Inf"}else if(s.isNegativeZero(e))return "-0.0";return e.toString(10)}function a(e){return "[object Number]"===Object.prototype.toString.call(e)&&(0!==e%1||s.isNegativeZero(e))}var s=e("../common"),u=e("../type"),c=new RegExp("^(?:[-+]?(?:[0-9][0-9_]*)\\.[0-9_]*(?:[eE][-+][0-9]+)?|\\.[0-9_]+(?:[eE][-+][0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");t.exports=new u("tag:yaml.org,2002:float",{kind:"scalar",resolve:i,construct:r,predicate:a,represent:o,defaultStyle:"lowercase"});},{"../common":2,"../type":13}],17:[function(e,t,n){function i(e){return e>=48&&57>=e||e>=65&&70>=e||e>=97&&102>=e}function r(e){return e>=48&&55>=e}function o(e){return e>=48&&57>=e}function a(e){if(null===e)return !1;var t,n=e.length,a=0,s=!1;if(!n)return !1;if(t=e[a],("-"===t||"+"===t)&&(t=e[++a]),"0"===t){if(a+1===n)return !0;if(t=e[++a],"b"===t){for(a++;n>a;a++)if(t=e[a],"_"!==t){if("0"!==t&&"1"!==t)return !1;s=!0;}return s}if("x"===t){for(a++;n>a;a++)if(t=e[a],"_"!==t){if(!i(e.charCodeAt(a)))return !1;s=!0;}return s}for(;n>a;a++)if(t=e[a],"_"!==t){if(!r(e.charCodeAt(a)))return !1;s=!0;}return s}for(;n>a;a++)if(t=e[a],"_"!==t){if(":"===t)break;if(!o(e.charCodeAt(a)))return !1;s=!0;}return s?":"!==t?!0:/^(:[0-5]?[0-9])+$/.test(e.slice(a)):!1}function s(e){var t,n,i=e,r=1,o=[];return -1!==i.indexOf("_")&&(i=i.replace(/_/g,"")),t=i[0],("-"===t||"+"===t)&&("-"===t&&(r=-1),i=i.slice(1),t=i[0]),"0"===i?0:"0"===t?"b"===i[1]?r*parseInt(i.slice(2),2):"x"===i[1]?r*parseInt(i,16):r*parseInt(i,8):-1!==i.indexOf(":")?(i.split(":").forEach(function(e){o.unshift(parseInt(e,10));}),i=0,n=1,o.forEach(function(e){i+=e*n,n*=60;}),r*i):r*parseInt(i,10)}function u(e){return "[object Number]"===Object.prototype.toString.call(e)&&0===e%1&&!c.isNegativeZero(e)}var c=e("../common"),l=e("../type");t.exports=new l("tag:yaml.org,2002:int",{kind:"scalar",resolve:a,construct:s,predicate:u,represent:{binary:function(e){return "0b"+e.toString(2)},octal:function(e){return "0"+e.toString(8)},decimal:function(e){return e.toString(10)},hexadecimal:function(e){return "0x"+e.toString(16).toUpperCase()}},defaultStyle:"decimal",styleAliases:{binary:[2,"bin"],octal:[8,"oct"],decimal:[10,"dec"],hexadecimal:[16,"hex"]}});},{"../common":2,"../type":13}],18:[function(e,t,n){function i(e){if(null===e)return !1;try{var t="("+e+")",n=s.parse(t,{range:!0});return "Program"!==n.type||1!==n.body.length||"ExpressionStatement"!==n.body[0].type||"FunctionExpression"!==n.body[0].expression.type?!1:!0}catch(i){return !1}}function r(e){var t,n="("+e+")",i=s.parse(n,{range:!0}),r=[];if("Program"!==i.type||1!==i.body.length||"ExpressionStatement"!==i.body[0].type||"FunctionExpression"!==i.body[0].expression.type)throw new Error("Failed to resolve function");return i.body[0].expression.params.forEach(function(e){r.push(e.name);}),t=i.body[0].expression.body.range,new Function(r,n.slice(t[0]+1,t[1]-1))}function o(e){return e.toString()}function a(e){return "[object Function]"===Object.prototype.toString.call(e)}var s;try{s=e("esprima");}catch(u){"undefined"!=typeof window&&(s=window.esprima);}var c=e("../../type");t.exports=new c("tag:yaml.org,2002:js/function",{kind:"scalar",resolve:i,construct:r,predicate:a,represent:o});},{"../../type":13,esprima:"esprima"}],19:[function(e,t,n){function i(e){if(null===e)return !1;if(0===e.length)return !1;var t=e,n=/\/([gim]*)$/.exec(e),i="";if("/"===t[0]){if(n&&(i=n[1]),i.length>3)return !1;if("/"!==t[t.length-i.length-1])return !1;t=t.slice(1,t.length-i.length-1);}try{{new RegExp(t,i);}return !0}catch(r){return !1}}function r(e){var t=e,n=/\/([gim]*)$/.exec(e),i="";return "/"===t[0]&&(n&&(i=n[1]),t=t.slice(1,t.length-i.length-1)),new RegExp(t,i)}function o(e){var t="/"+e.source+"/";return e.global&&(t+="g"),e.multiline&&(t+="m"),e.ignoreCase&&(t+="i"),t}function a(e){return "[object RegExp]"===Object.prototype.toString.call(e)}var s=e("../../type");t.exports=new s("tag:yaml.org,2002:js/regexp",{kind:"scalar",resolve:i,construct:r,predicate:a,represent:o});},{"../../type":13}],20:[function(e,t,n){function i(){return !0}function r(){return void 0}function o(){return ""}function a(e){return "undefined"==typeof e}var s=e("../../type");t.exports=new s("tag:yaml.org,2002:js/undefined",{kind:"scalar",resolve:i,construct:r,predicate:a,represent:o});},{"../../type":13}],21:[function(e,t,n){var i=e("../type");t.exports=new i("tag:yaml.org,2002:map",{kind:"mapping",construct:function(e){return null!==e?e:{}}});},{"../type":13}],22:[function(e,t,n){function i(e){return "<<"===e||null===e}var r=e("../type");t.exports=new r("tag:yaml.org,2002:merge",{kind:"scalar",resolve:i});},{"../type":13}],23:[function(e,t,n){function i(e){if(null===e)return !0;var t=e.length;return 1===t&&"~"===e||4===t&&("null"===e||"Null"===e||"NULL"===e)}function r(){return null}function o(e){return null===e}var a=e("../type");t.exports=new a("tag:yaml.org,2002:null",{kind:"scalar",resolve:i,construct:r,predicate:o,represent:{canonical:function(){return "~"},lowercase:function(){return "null"},uppercase:function(){return "NULL"},camelcase:function(){return "Null"}},defaultStyle:"lowercase"});},{"../type":13}],24:[function(e,t,n){function i(e){if(null===e)return !0;var t,n,i,r,o,u=[],c=e;for(t=0,n=c.length;n>t;t+=1){if(i=c[t],o=!1,"[object Object]"!==s.call(i))return !1;for(r in i)if(a.call(i,r)){if(o)return !1;o=!0;}if(!o)return !1;if(-1!==u.indexOf(r))return !1;u.push(r);}return !0}function r(e){return null!==e?e:[]}var o=e("../type"),a=Object.prototype.hasOwnProperty,s=Object.prototype.toString;t.exports=new o("tag:yaml.org,2002:omap",{kind:"sequence",resolve:i,construct:r});},{"../type":13}],25:[function(e,t,n){function i(e){if(null===e)return !0;var t,n,i,r,o,s=e;for(o=new Array(s.length),t=0,n=s.length;n>t;t+=1){if(i=s[t],"[object Object]"!==a.call(i))return !1;if(r=Object.keys(i),1!==r.length)return !1;o[t]=[r[0],i[r[0]]];}return !0}function r(e){if(null===e)return [];var t,n,i,r,o,a=e;for(o=new Array(a.length),t=0,n=a.length;n>t;t+=1)i=a[t],r=Object.keys(i),o[t]=[r[0],i[r[0]]];return o}var o=e("../type"),a=Object.prototype.toString;t.exports=new o("tag:yaml.org,2002:pairs",{kind:"sequence",resolve:i,construct:r});},{"../type":13}],26:[function(e,t,n){var i=e("../type");t.exports=new i("tag:yaml.org,2002:seq",{kind:"sequence",construct:function(e){return null!==e?e:[]}});},{"../type":13}],27:[function(e,t,n){function i(e){if(null===e)return !0;var t,n=e;for(t in n)if(a.call(n,t)&&null!==n[t])return !1;return !0}function r(e){return null!==e?e:{}}var o=e("../type"),a=Object.prototype.hasOwnProperty;t.exports=new o("tag:yaml.org,2002:set",{kind:"mapping",resolve:i,construct:r});},{"../type":13}],28:[function(e,t,n){var i=e("../type");t.exports=new i("tag:yaml.org,2002:str",{kind:"scalar",construct:function(e){return null!==e?e:""}});},{"../type":13}],29:[function(e,t,n){function i(e){if(null===e)return !1;var t;return t=s.exec(e),null===t?!1:!0}function r(e){var t,n,i,r,o,a,u,c,l,p,f=0,h=null;if(t=s.exec(e),null===t)throw new Error("Date resolve error");if(n=+t[1],i=+t[2]-1,r=+t[3],!t[4])return new Date(Date.UTC(n,i,r));if(o=+t[4],a=+t[5],u=+t[6],t[7]){for(f=t[7].slice(0,3);f.length<3;)f+="0";f=+f;}return t[9]&&(c=+t[10],l=+(t[11]||0),h=6e4*(60*c+l),"-"===t[9]&&(h=-h)),p=new Date(Date.UTC(n,i,r,o,a,u,f)),h&&p.setTime(p.getTime()-h),p}function o(e){return e.toISOString()}var a=e("../type"),s=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?)?$");t.exports=new a("tag:yaml.org,2002:timestamp",{kind:"scalar",resolve:i,construct:r,instanceOf:Date,represent:o});},{"../type":13}],30:[function(e,t,n){},{}],"/":[function(e,t,n){var i=e("./lib/js-yaml.js");t.exports=i;},{"./lib/js-yaml.js":1}]},{},[])("/")});
});

var Metatemplates = /** @class */ (function (_super) {
    __extends(Metatemplates, _super);
    function Metatemplates() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Metatemplates.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('loading plugin: metatemplates');
                        return [4 /*yield*/, this.loadSettings()];
                    case 1:
                        _a.sent();
                        this.addSettingTab(new MetatemplatesSettingTab(this.app, this));
                        this.addCommand({
                            id: 'reload-templates',
                            name: 'Reload templates',
                            callback: function () {
                                _this.reloadTemplates();
                            }
                        });
                        this.addCommand({
                            id: 'insert-template',
                            name: 'Insert template',
                            checkCallback: function (checking) {
                                var leaf = _this.app.workspace.activeLeaf;
                                if (leaf) {
                                    if (!checking) {
                                        new TemplateSuggestModal(_this.app, _this, false).open();
                                    }
                                    return true;
                                }
                                return false;
                            }
                        });
                        this.addCommand({
                            id: 'create-from-template',
                            name: 'Create from template',
                            callback: function () {
                                new TemplateSuggestModal(_this.app, _this, true).open();
                            }
                        });
                        this.app.metadataCache.on('changed', function (file) {
                            var _a;
                            if (file.path.indexOf(_this.settings.templateFolder) === 0) {
                                return;
                            }
                            var fm = (_a = _this.app.metadataCache.getFileCache(file)) === null || _a === void 0 ? void 0 : _a.frontmatter;
                            var fnf = _this.type2titles.get(obsidian.parseFrontMatterEntry(fm, 'type'));
                            var newfn = _this.fnf2fn(fm, fnf);
                            if (newfn) {
                                var newpath = file.path.substring(0, file.path.lastIndexOf('/')) + '/' + newfn + '.md';
                                if (newpath && newpath != file.path) {
                                    _this.app.fileManager.renameFile(file, newpath);
                                }
                            }
                        });
                        this.app.workspace.on('layout-ready', function () {
                            _this.reloadTemplates();
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Metatemplates.prototype.reloadTemplates = function () {
        var _a, _b;
        var files = this.app.vault.getMarkdownFiles();
        this.templates = [];
        this.type2titles = new Map();
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var file = files_1[_i];
            if (file.path.indexOf(this.settings.templateFolder) === 0) {
                this.templates.push(file);
                var fm = (_a = this.app.metadataCache.getFileCache(file)) === null || _a === void 0 ? void 0 : _a.frontmatter;
                var type = obsidian.parseFrontMatterEntry(fm, 'type');
                var nameFormat = obsidian.parseFrontMatterEntry(fm, 'nameFormat');
                this.type2titles.set(type, nameFormat);
            }
        }
        console.log("metatemplates: loaded " + (((_b = this.type2titles) === null || _b === void 0 ? void 0 : _b.size) || 'err: nomap') + " templates!");
    };
    Metatemplates.prototype.fnf2fn = function (fm, fnf) {
        var newfn = fnf;
        if (!newfn) {
            return;
        }
        var startInd = newfn.indexOf("<<");
        var endInd = newfn.indexOf(">>");
        while (startInd > -1 && endInd > startInd + 1) {
            var attrName = newfn.substring(startInd + 2, endInd);
            if (fm[attrName]) {
                newfn = newfn.substring(0, startInd) + fm[attrName] + newfn.substring(endInd + 2);
            }
            else {
                newfn = newfn.substring(0, startInd) + attrName + newfn.substring(endInd + 2);
            }
            startInd = newfn.indexOf("<<");
            endInd = newfn.indexOf(">>");
        }
        newfn = newfn.replace(/[/\\?%*:|"<>]/g, '-');
        return newfn;
    };
    Metatemplates.prototype.insertTemplate = function (templateFile) {
        return __awaiter(this, void 0, void 0, function () {
            var active_view, editor, doc, content;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        active_view = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView);
                        if (active_view == null) {
                            return [2 /*return*/];
                        }
                        editor = active_view.sourceMode.cmEditor;
                        doc = editor.getDoc();
                        return [4 /*yield*/, this.app.vault.read(templateFile)];
                    case 1:
                        content = _a.sent();
                        return [4 /*yield*/, this.fillTemplate(content)];
                    case 2:
                        content = _a.sent();
                        doc.replaceSelection(content);
                        editor.focus();
                        return [2 /*return*/];
                }
            });
        });
    };
    Metatemplates.prototype.createNoteFromTemplate = function (templateFile) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var fm, destFolder, newPath, content, newfile;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        fm = (_a = this.app.metadataCache.getFileCache(templateFile)) === null || _a === void 0 ? void 0 : _a.frontmatter;
                        destFolder = obsidian.parseFrontMatterEntry(fm, 'destFolder');
                        newPath = (destFolder || '') + '/' + moment().format('YYMMDD@HHmmss') + '.md';
                        return [4 /*yield*/, this.app.vault.read(templateFile)];
                    case 1:
                        content = _b.sent();
                        return [4 /*yield*/, this.fillTemplate(content)];
                    case 2:
                        content = _b.sent();
                        newfile = this.app.vault.create(newPath, content);
                        newfile.then(function (file) {
                            var leaf = _this.app.workspace.activeLeaf;
                            if (leaf) {
                                leaf.openFile(file);
                                _this.app.workspace.setActiveLeaf(leaf);
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Metatemplates.prototype.fillTemplate = function (content) {
        return __awaiter(this, void 0, void 0, function () {
            var startInd, endInd, fmraw, fmparsed, dump, ans;
            return __generator(this, function (_a) {
                startInd = content.indexOf('---') + 4;
                endInd = content.substring(startInd).indexOf('---') - 1;
                fmraw = content.substring(startInd, startInd + endInd);
                fmparsed = jsYaml.load(fmraw);
                if (fmparsed['nameFormat']) {
                    delete fmparsed['nameFormat'];
                }
                if (fmparsed['destFolder']) {
                    delete fmparsed['destFolder'];
                }
                dump = jsYaml.dump(fmparsed);
                // have to typecast to <any> because TypeScript isn't updated for
                // strings to have a replaceAll() method
                dump = dump.replaceAll("null", "");
                dump = dump.replaceAll("\n  - ''", " ['']");
                dump = dump.replaceAll("<<date>>", moment().format(this.settings.dateFormat));
                dump = dump.replaceAll("<<time>>", moment().format(this.settings.timeFormat));
                ans = '---\n' + dump + content.substring(content.lastIndexOf('---'));
                return [2 /*return*/, ans];
            });
        });
    };
    Metatemplates.prototype.onunload = function () {
        console.log('unloading plugin: metatemplates');
    };
    Metatemplates.prototype.loadSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this;
                        _c = (_b = Object).assign;
                        _d = [DEFAULT_SETTINGS];
                        return [4 /*yield*/, this.loadData()];
                    case 1:
                        _a.settings = _c.apply(_b, _d.concat([_e.sent()]));
                        return [2 /*return*/];
                }
            });
        });
    };
    Metatemplates.prototype.saveSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.saveData(this.settings)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Metatemplates;
}(obsidian.Plugin));

module.exports = Metatemplates;


/* nosourcemap */