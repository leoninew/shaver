import{b as N,Q as k}from"./use-dark.d85c521f.js";import{e as T}from"./QBtn.251daa3f.js";import{u as S,Q as w,_ as x,c as $}from"./localStorage.38810204.js";import{T as b,k as j,i as B}from"./types.1201977b.js";import{d as L,A as Q,r as f,a as C,B as I,V as M,D as R,E as A,F as p,H as E,G as r,W as O}from"./index.135a5d6f.js";const V={[b.String]:"TEXT",[b.Number]:"INTEGER",[b.Boolean]:"TINYINT(1)"},q=(h,a)=>{var s;return(s=V[h])!=null?s:"?"};function*D(h,a){const s=j(h),m=a==null?void 0:a.useNotNull;a==null||a.useVarchar;const e=Array();for(const{name:l,type:c}of s){if(!B(c))continue;const u=c,d=[];let y=0;for(const t of Object.keys(u)){const n=q(u[t]);d.push({memberName:t,memberType:n}),t.length>y&&(y=t.length)}e.push(`DROP TABLE IF EXISTS \`${l}\`;`),e.push(`CREATE TABLE \`${l}\` (`);for(const{memberName:t,memberType:n}of d){const o=" ".repeat(y-t.length)+n;/^id$/i.test(t)?e.push(`  \`${t}\` ${o} PRIMARY KEY`):(e.push(`  \`${t}\` ${o}`),m&&(e[e.length-1]=e[e.length-1]+" NOT NULL")),e[e.length-1]=e[e.length-1]+","}if(d.length>0){const t=e[e.length-1].length;e[e.length-1]=e[e.length-1].substring(0,t-1)}e.push(`);
`)}for(const l of e)yield l}const J={class:"q-pa-md"},U={class:"q-pa-md"},H=L({__name:"MySQL",setup(h){Q();const a=S(),s=f(""),m=f(""),e=f(""),l=f(!1),c=f({}),v=f();C(async()=>{const n=Object.keys(c.value);for(const o of n)a.assign(`/transform/java/${o}`,i=>c.value[o]=i);s.value=a.get("/transform/mysql/input")||JSON.stringify({id:1,userId:1,title:"delectus aut autem",completed:!1,created:"2024-01-06T13:39:32.006Z"},null,2),await u(s.value)}),I(async n=>{await u(s.value,n.query.kind)});const u=async(n,o)=>{var _;e.value="";const i=M(c.value);a.set("/transform/input",n);try{const g=JSON.parse(n);m.value=(_=Array.from(D(g,i)).join(`
`))!=null?_:""}catch(g){if(g instanceof SyntaxError)e.value=g.message;else throw g}},d=async()=>{await v.value.formatDoc()},y=async()=>{s.value=""},t=async()=>{await $(m.value)};return(n,o)=>(R(),A(w,{"model-value":50},{before:p(()=>[E("div",J,[r(k,{class:"text-primary"},{default:p(()=>[r(N,null,{default:p(()=>[O("JSON")]),_:1}),r(T,{flat:"",round:"",dense:"",icon:"format_align_left",onClick:d}),r(T,{flat:"",round:"",dense:"",icon:"delete",onClick:y})]),_:1}),r(x,{text:s.value,"onUpdate:text":o[0]||(o[0]=i=>s.value=i),language:"json",onChanged:u,ref_key:"inputEditor",ref:v},null,8,["text"])])]),after:p(()=>[E("div",U,[r(k,{class:"text-primary"},{default:p(()=>[r(N,null,{default:p(()=>[O("MySQL")]),_:1}),r(T,{flat:"",round:"",dense:"",icon:"settings",onClick:o[1]||(o[1]=i=>l.value=!l.value),disable:""}),r(T,{flat:"",round:"",dense:"",icon:"content_copy",onClick:t})]),_:1}),r(x,{text:m.value,language:"sql"},null,8,["text"])])]),_:1}))}});export{H as default};