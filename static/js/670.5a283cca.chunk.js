"use strict";(self.webpackChunkart_comp_project=self.webpackChunkart_comp_project||[]).push([[670],{6670:function(e,t,n){n.r(t);var a=n(1413),l=n(885),i=n(390),r=n(9914),s=n(3948),u=n(5121),o=n(3237),c=n(2559);function f(e){var t,n=(0,i.useState)(!0),r=(0,l.Z)(n,2),s=r[0],f=r[1],m=(0,i.useState)(null!==(t=e.fallBack)&&void 0!==t?t:[]),h=(0,l.Z)(m,2),x=h[0],b=h[1],d=(0,i.useContext)(o.U).user;return(0,i.useEffect)((function(){var t;(f(!0),!e.fallBack&&d)&&(null===d||void 0===d||null===(t=d.functions)||void 0===t||t.getSaffronArtFilters(e.filterKey,e.isDate).then((function(t){e.isDate?b(t.result.map((function(e){return{value:e._id,label:new Date(e._id)}})).sort((function(e,t){return e.label.getTime()-t.label.getTime()})).map((function(e){return(0,a.Z)((0,a.Z)({},e),{},{label:e.label.toDateString()})}))):b(t.result.map((function(e){return{value:e._id,label:e._id}})).filter((function(e){return!!e.value})).sort((function(e,t){return e.label.localeCompare(t.label)}))),f(!1)})).catch((function(e){console.log(e),f(!1)})).finally((function(e){return console.log(e)})))}),[d]),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("span",{className:"text-white",children:e.label}),(0,c.jsx)(u.ZP,{isMulti:!0,name:e.filterKey,title:e.filterKey,options:x,onChange:e.onChange,isLoading:s,menuPlacement:"top"})]})}t.default=function(e){var t=(0,i.useContext)(o.U),n=t.filters,a=t.setFilters,l=function(e,t){var l=new Map(n);l.set(e,t.map((function(e){return e.value}))),console.log(l),a(l)};return(0,c.jsxs)(r.Z,{className:"py-1",children:[(0,c.jsx)(s.Z,{xs:12,className:"mb-3",children:(0,c.jsx)(f,{isMulti:!0,filterKey:"artist_name",label:"Artists",onChange:function(e){return l("artist_name",e)}})}),(0,c.jsx)(s.Z,{xs:12,className:"mb-3",children:(0,c.jsx)(f,{isMulti:!0,filterKey:"category",label:"Art Category",onChange:function(e){return l("category",e)}})}),(0,c.jsx)(s.Z,{xs:12,className:"mb-3",children:(0,c.jsx)(f,{isMulti:!0,filterKey:"auction_name",label:"Auction",onChange:function(e){return l("auction_name",e)}})}),(0,c.jsx)(s.Z,{xs:12,className:"mb-3",children:(0,c.jsx)(f,{isMulti:!0,filterKey:"auction_house",label:"Auction House",onChange:function(e){return l("auction_house",e)}})}),(0,c.jsx)(s.Z,{xs:12,className:"mb-3",children:(0,c.jsx)(f,{isMulti:!0,filterKey:"auction_date",label:"Auction Date",onChange:function(e){return l("auction_date",e)},isDate:!0})})]})}}}]);
//# sourceMappingURL=670.5a283cca.chunk.js.map