import{Q as J,b as N}from"./use-dark.d85c521f.js";import{e as w}from"./QBtn.251daa3f.js";import{u as P,Q as E,_ as Q,c as D}from"./localStorage.38810204.js";import{Q as A,a as F,b as T,c as B,C as W}from"./ClosePopup.668ed691.js";import{f as G,h as R,Q as h}from"./scroll.b5e4fcc4.js";import{T as j,k as M,i as H,c as S,u as z}from"./types.1201977b.js";import{d as K,A as Z,r as k,a as X,B as Y,V as ee,D as te,I as ae,G as t,F as i,K as oe,H as C,W as x,u as le}from"./index.135a5d6f.js";const L={[j.Empty]:"Object",[j.String]:"String",[j.Number]:"Integer",[j.Boolean]:"Boolean"},q=d=>{var s;return(s=L[d])!=null?s:d},U=d=>{let s=d,r=0;for(;s.endsWith("[]");)s=s.substring(0,s.length-2),r+=1;let e=q(s);for(let c=0;c<r;c++)e=`List<${e}>`;return e};function*se(d,s){var _;const r=M(d),e=s==null?void 0:s.keepBrief,c=s==null?void 0:s.useJackson,v=s==null?void 0:s.useLombok,p=[],a=[];let g=0,f=0;for(const{name:b,type:O}of r){if(!H(O))continue;v&&a.push("@Data"),a.push(`public class ${b} {`);const u=O,l=Object.keys(u);for(const o of l){const m=u[o];let n;m.endsWith("[]")?(f+=1,n=U(m)):n=q(m);const y=S(o,!1);if(e&&y===o||!c){a.push(`    private ${n} ${o};`);continue}c&&(e?y!==o&&S(y,!1)!==o&&(a.push(`    @JsonProperty("${o}")`),g+=1):(a.push(`    @JsonProperty("${o}")`),g+=1)),a.push(`    private ${n} ${y};`)}if(!v)for(const o of l){const m=u[o],n=(_=L[m])!=null?_:m,y=n.endsWith("[]")?U(n):n,$=S(o,!1),V=S(o);a.push("    "),a.push(`    public ${y} get${V}() {`),a.push(`        return this.${$};`),a.push("    }"),a.push("    "),a.push(`    public void set${V}(${y} ${$}) {`),a.push(`        this.${$} = ${$};`),a.push("    }")}a.push(`}
`)}g&&p.push("import com.fasterxml.jackson.annotation.JsonProperty;"),v&&p.push("import lombok.Data;"),f&&(p.push(""),p.push("import java.util.List;")),p.length>0&&p.push("");for(const b of p)yield b;for(const b of a)yield b}function*ie(d,s){const r=M(d);yield"import lombok.RequiredArgsConstructor;",yield"import lombok.extern.slf4j.Slf4j;",yield"import org.springframework.web.bind.annotation.*;",yield"";for(const{name:e}of r)yield"@Slf4j",yield"@RestController",yield"@RequiredArgsConstructor",yield`@RequestMapping("/${z(e)}")`,yield`public class ${e}Controller {`,yield"",yield'    @GetMapping(value = "")',yield`    public ${e}ListOutput getAll() {`,yield"        throw new UnsupportedOperationException();",yield"    }",yield"",yield'    @GetMapping(value = "{id}")',yield`    public ${e}DetailOutput get(@PathVariable Integer id) {`,yield"        throw new UnsupportedOperationException();",yield"    }",yield"",yield'    @PostMapping(value = "")',yield`    public Object post(@RequestBody ${e}CreateInput input) {`,yield"        throw new UnsupportedOperationException();",yield"    }",yield"",yield'    @PutMapping(value = "{id}")',yield`    public Object put(@PathVariable Integer id, @RequestBody ${e}UpdateInput input) {`,yield"        throw new UnsupportedOperationException();",yield"    }",yield"",yield'    @DeleteMapping(value = "{id}")',yield"    public Boolean delete(@PathVariable Integer id) {",yield"        throw new UnsupportedOperationException();",yield"    }",yield"}",yield""}function*ne(d,s){const r=M(d);for(const{name:e}of r)yield`// ${e}Mapper.java`,yield"import com.baomidou.mybatisplus.core.mapper.BaseMapper;",yield"import org.apache.ibatis.annotations.Mapper;",yield"",yield"@Mapper",yield`public interface ${e}Mapper extends BaseMapper<${e}> {`,yield"",yield"}",yield"",yield`// ${e}Repository.java`,yield"import com.baomidou.mybatisplus.extension.plugins.pagination.Page;",yield"import com.baomidou.mybatisplus.extension.service.IService;",yield"",yield`public interface ${e}Repository extends IService<${e}> {`,yield"",yield"}",yield"",yield`// ${e}RepositoryImpl.java`,yield"import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;",yield"import org.springframework.stereotype.Service;",yield"",yield"@Service",yield`public class ${e}RepositoryImpl extends ServiceImpl<${e}Mapper, ${e}> implements ${e}Repository {`,yield"",yield"}"}var re={type:se,rest:ie,mybatisplus:ne};const ue={class:"q-pa-md"},pe={class:"q-pa-md"},de=C("div",{class:"text-h6"},"Settings",-1),he=K({__name:"Java",setup(d){const s=Z(),r=P(),e=k(""),c=k(""),v=k(""),p=k(!1),a=k({keepBrief:!0,useJackson:!0,useLombok:!0}),g=k();X(async()=>{const u=Object.keys(a.value);for(const l of u)r.assign(`/transform/java/${l}`,o=>a.value[l]=o);e.value=r.get("/transform/mysql/input")||JSON.stringify({id:1,userId:1,title:"delectus aut autem",completed:!1,created:"2024-01-06T13:39:32.006Z"},null,2),await f(e.value)}),Y(async u=>{await f(e.value,u.query.kind)});const f=async(u,l)=>{var m;v.value="";const o=ee(a.value);r.set("/transform/input",u);try{const n=JSON.parse(u),y=re[l!=null?l:s.query.kind];c.value=(m=Array.from(y(n,o)).join(`
`))!=null?m:""}catch(n){if(n instanceof SyntaxError)v.value=n.message;else throw n}},_=async()=>{const u=Object.keys(a.value);for(const l of u)r.set(`/transform/java/${l}`,a.value[l]);await f(e.value)},b=async()=>{await g.value.formatDoc()},O=async()=>{e.value=""},I=async()=>{await D(c.value)};return(u,l)=>(te(),ae(oe,null,[t(E,{"model-value":50},{before:i(()=>[C("div",ue,[t(J,{class:"text-primary"},{default:i(()=>[t(N,null,{default:i(()=>[x("JSON")]),_:1}),t(w,{flat:"",round:"",dense:"",icon:"format_align_left",onClick:b}),t(w,{flat:"",round:"",dense:"",icon:"delete",onClick:O})]),_:1}),t(Q,{text:e.value,"onUpdate:text":l[0]||(l[0]=o=>e.value=o),language:"json",onChanged:f,ref_key:"inputEditor",ref:g},null,8,["text"])])]),after:i(()=>[C("div",pe,[t(J,{class:"text-primary"},{default:i(()=>[t(N,null,{default:i(()=>[x("JAVA")]),_:1}),t(w,{flat:"",round:"",dense:"",icon:"settings",onClick:l[1]||(l[1]=o=>p.value=!p.value)}),t(w,{flat:"",round:"",dense:"",icon:"content_copy",onClick:I})]),_:1}),t(Q,{text:c.value,language:"csharp"},null,8,["text"])])]),_:1}),t(A,{modelValue:p.value,"onUpdate:modelValue":l[5]||(l[5]=o=>p.value=o),onHide:_},{default:i(()=>[t(G,{style:{width:"60vw","max-width":"80vw"}},{default:i(()=>[t(R,{class:"row items-center q-pb-none"},{default:i(()=>[de,t(F),le(t(w,{icon:"close",flat:"",round:"",dense:""},null,512),[[W]])]),_:1}),t(R,null,{default:i(()=>[t(T,null,{default:i(()=>[t(h,{header:""},{default:i(()=>[x("Common")]),_:1}),t(h,null,{default:i(()=>[t(B,{modelValue:a.value.keepBrief,"onUpdate:modelValue":l[2]||(l[2]=o=>a.value.keepBrief=o),label:"use less attributes"},null,8,["modelValue"])]),_:1})]),_:1}),t(T,null,{default:i(()=>[t(h,{header:""},{default:i(()=>[x("Jackson")]),_:1}),t(h,null,{default:i(()=>[t(B,{modelValue:a.value.useJackson,"onUpdate:modelValue":l[3]||(l[3]=o=>a.value.useJackson=o),label:"use Jackson"},null,8,["modelValue"])]),_:1})]),_:1}),t(T,null,{default:i(()=>[t(h,{header:""},{default:i(()=>[x("Lombok")]),_:1}),t(h,null,{default:i(()=>[t(B,{modelValue:a.value.useLombok,"onUpdate:modelValue":l[4]||(l[4]=o=>a.value.useLombok=o),label:"use Lombok"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])],64))}});export{he as default};
