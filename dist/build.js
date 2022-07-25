!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.VueNativeSock=e():t.VueNativeSock=e()}(self,(()=>(()=>{"use strict";var t={d:(e,o)=>{for(var n in o)t.o(o,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:o[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function n(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function s(t,e,o){return e&&n(t.prototype,e),o&&n(t,o),Object.defineProperty(t,"prototype",{writable:!1}),t}t.r(e),t.d(e,{default:()=>c});const i=new(function(){function t(){o(this,t),this.listeners=new Map}return s(t,[{key:"addListener",value:function(t,e,o){return"function"==typeof e&&(this.listeners.has(t)||this.listeners.set(t,[]),this.listeners.get(t).push({callback:e,vm:o}),!0)}},{key:"removeListener",value:function(t,e,o){var n,s=this.listeners.get(t);return!!(s&&s.length&&(n=s.reduce((function(t,n,s){return"function"==typeof n.callback&&n.callback===e&&n.vm===o&&(t=s),t}),-1))>-1)&&(s.splice(n,1),this.listeners.set(t,s),!0)}},{key:"emit",value:function(t){for(var e=arguments.length,o=new Array(e>1?e-1:0),n=1;n<e;n++)o[n-1]=arguments[n];var s=this.listeners.get(t);return!(!s||!s.length)&&(s.forEach((function(t){var e;(e=t.callback).call.apply(e,[t.vm].concat(o))})),!0)}}]),t}());var r=function(){function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(o(this,t),this.format=n.format&&n.format.toLowerCase(),e.startsWith("//")){var s="https:"===window.location.protocol?"wss":"ws";e="".concat(s,":").concat(e)}this.connectionUrl=e,this.opts=n,this.reconnection=this.opts.reconnection||!1,this.reconnectionAttempts=this.opts.reconnectionAttempts||1/0,this.reconnectionDelay=this.opts.reconnectionDelay||1e3,this.reconnectTimeoutId=0,this.reconnectionCount=0,this.passToStoreHandler=this.opts.passToStoreHandler||!1,this.connect(e,n),n.store&&(this.store=n.store),n.mutations&&(this.mutations=n.mutations),this.onEvent()}return s(t,[{key:"connect",value:function(t){var e=this,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=o.protocol||"";return this.WebSocket=o.WebSocket||(""===n?new WebSocket(t):new WebSocket(t,n)),"json"===this.format&&("sendObj"in this.WebSocket||(this.WebSocket.sendObj=function(t){return e.WebSocket.send(JSON.stringify(t))})),this.WebSocket}},{key:"reconnect",value:function(){var t=this;this.reconnectionCount<=this.reconnectionAttempts?(this.reconnectionCount++,clearTimeout(this.reconnectTimeoutId),this.reconnectTimeoutId=setTimeout((function(){t.store&&t.passToStore("SOCKET_RECONNECT",t.reconnectionCount),t.connect(t.connectionUrl,t.opts),t.onEvent()}),this.reconnectionDelay)):this.store&&this.passToStore("SOCKET_RECONNECT_ERROR",!0)}},{key:"onEvent",value:function(){var t=this;["onmessage","onclose","onerror","onopen"].forEach((function(e){t.WebSocket[e]=function(o){i.emit(e,o),t.store&&t.passToStore("SOCKET_"+e,o),t.reconnection&&"onopen"===e&&(t.opts.$setInstance(o.currentTarget),t.reconnectionCount=0),t.reconnection&&"onclose"===e&&t.reconnect()}}))}},{key:"passToStore",value:function(t,e){this.passToStoreHandler?this.passToStoreHandler(t,e,this.defaultPassToStore.bind(this)):this.defaultPassToStore(t,e)}},{key:"defaultPassToStore",value:function(t,e){if(t.startsWith("SOCKET_")){var o="commit",n=t.toUpperCase(),s=e;"json"===this.format&&e.data&&((s=JSON.parse(e.data)).mutation?n=[s.namespace||"",s.mutation].filter((function(t){return!!t})).join("/"):s.action&&(o="dispatch",n=[s.namespace||"",s.action].filter((function(t){return!!t})).join("/"))),this.mutations&&(n=this.mutations[n]||n),this.store[o](n,s)}}}]),t}();const c={install:function(t,e){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!e&&!o.connectManually)throw new Error("[vue-native-socket] cannot locate connection");var n=null;o.$setInstance=function(e){t.prototype.$socket=e},o.connectManually?(t.prototype.$connect=function(){var s=arguments.length>0&&void 0!==arguments[0]?arguments[0]:e,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:o;i.$setInstance=o.$setInstance,n=new r(s,i),t.prototype.$socket=n.WebSocket},t.prototype.$disconnect=function(){n&&n.reconnection&&(n.reconnection=!1,clearTimeout(n.reconnectTimeoutId)),t.prototype.$socket&&(t.prototype.$socket.close(),delete t.prototype.$socket)}):(n=new r(e,o),t.prototype.$socket=n.WebSocket);var s="undefined"!=typeof Proxy&&"function"==typeof Proxy&&/native code/.test(Proxy.toString());t.mixin({created:function(){var t=this,e=this,o=this.$options.sockets;s?(this.$options.sockets=new Proxy({},{set:function(t,o,n){return i.addListener(o,n,e),t[o]=n,!0},deleteProperty:function(t,o){return i.removeListener(o,e.$options.sockets[o],e),delete t.key,!0}}),o&&Object.keys(o).forEach((function(e){t.$options.sockets[e]=o[e]}))):(Object.seal(this.$options.sockets),o&&Object.keys(o).forEach((function(t){i.addListener(t,o[t],e)})))},beforeDestroy:function(){var t=this;if(s){var e=this.$options.sockets;e&&Object.keys(e).forEach((function(e){delete t.$options.sockets[e]}))}}})}};return e})()));
//# sourceMappingURL=build.js.map