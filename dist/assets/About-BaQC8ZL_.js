import{c as r,u as y,r as o,P as h,j as e,m as t,E as g,L as u,A as b}from"./index-CWKCthxy.js";import{B as w}from"./brush-fdEJ2fZ5.js";import{R as f}from"./rotate-ccw-C8YwMYE0.js";/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=r("Brain",[["path",{d:"M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",key:"l5xja"}],["path",{d:"M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z",key:"ep3f8r"}],["path",{d:"M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4",key:"1p4c4q"}],["path",{d:"M17.599 6.5a3 3 0 0 0 .399-1.375",key:"tmeiqw"}],["path",{d:"M6.003 5.125A3 3 0 0 0 6.401 6.5",key:"105sqy"}],["path",{d:"M3.477 10.896a4 4 0 0 1 .585-.396",key:"ql3yin"}],["path",{d:"M19.938 10.5a4 4 0 0 1 .585.396",key:"1qfode"}],["path",{d:"M6 18a4 4 0 0 1-1.967-.516",key:"2e4loj"}],["path",{d:"M19.967 17.484A4 4 0 0 1 18 18",key:"159ez6"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=r("Target",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=r("Zap",[["polygon",{points:"13 2 3 14 12 14 11 22 21 10 12 10 13 2",key:"45s27k"}]]);function T(){const{t:a}=y(),[N,l]=o.useState(!1),[c,n]=o.useState(!1),d=[{icon:w,title:a("about.skill1.title"),desc:a("about.skill1.desc"),percentage:95},{icon:h,title:a("about.skill2.title"),desc:a("about.skill2.desc"),percentage:90},{icon:j,title:a("about.skill3.title"),desc:a("about.skill3.desc"),percentage:88},{icon:k,title:a("about.skill4.title"),desc:a("about.skill4.desc"),percentage:92}],x=()=>{l(!0),document.body.classList.add("powerpoint-ugly-mode"),setTimeout(()=>{n(!0)},2e3)},m=()=>{l(!1),n(!1),document.body.classList.remove("powerpoint-ugly-mode")},p=()=>{document.body.innerHTML=`
      <div style='
        background: #000;
        color: #0f0;
        font-family: "Courier New", monospace;
        padding: 5rem;
        text-align: center;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 1.5rem;
        line-height: 1.8;
        position: relative;
        overflow: hidden;
      '>
        <div style='
          border: 2px solid #0f0; 
          padding: 2rem; 
          margin-bottom: 2rem; 
          animation: blink 1s infinite;
          text-shadow: 0 0 10px #0f0;
        '>
          ⚠️ GAME OVER ⚠️
        </div>
        <div style='margin-bottom: 2rem; text-shadow: 0 0 5px #0f0;'>
          Ton portfolio est devenu une plaquette PowerPoint de 2010.
        </div>
        <div style='font-size: 1rem; opacity: 0.7; animation: fadeInOut 2s infinite;'>
          Tu as choisi... mal.
        </div>
        <div style='
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 0, 0.03) 2px,
            rgba(0, 255, 0, 0.03) 4px
          );
          pointer-events: none;
          animation: scanlines 0.1s linear infinite;
        '></div>
        <style>
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0.3; }
          }
          @keyframes fadeInOut {
            0%, 100% { opacity: 0.7; }
            50% { opacity: 0.3; }
          }
          @keyframes scanlines {
            0% { transform: translateY(0); }
            100% { transform: translateY(4px); }
          }
        </style>
      </div>
    `};return e.jsxs("section",{id:"about",className:"py-16 sm:py-24 lg:py-32 bg-white dark:bg-black relative overflow-hidden",children:[e.jsx("div",{className:"absolute inset-0 section-pattern opacity-50"}),e.jsx("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:e.jsxs("div",{className:"grid lg:grid-cols-2 gap-12 lg:gap-20 items-center",children:[e.jsxs(t.div,{initial:{opacity:0,x:-50},whileInView:{opacity:1,x:0},transition:{duration:.8},viewport:{once:!0},className:"space-y-8 lg:space-y-10 relative z-10",children:[e.jsxs("div",{className:"space-y-4 sm:space-y-6",children:[e.jsxs(t.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},transition:{delay:.2},className:"flex items-center gap-3 justify-center lg:justify-start",children:[e.jsx(t.div,{initial:{width:0},whileInView:{width:32},transition:{delay:.4,duration:.8},className:"h-1 bg-black dark:bg-white sm:w-12"}),e.jsx("span",{className:"text-gray-500 dark:text-gray-400 font-medium tracking-wider uppercase text-xs sm:text-sm",children:a("about.subtitle")})]}),e.jsxs(t.h2,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},transition:{delay:.3},className:"text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-black dark:text-white text-center lg:text-left",children:[e.jsx(t.span,{initial:{opacity:0,y:30},whileInView:{opacity:1,y:0},transition:{delay:.4},className:"block",children:a("about.title1")}),e.jsx(t.span,{initial:{opacity:0,y:30},whileInView:{opacity:1,y:0},transition:{delay:.5},className:"block font-light italic",children:a("about.title2")})]}),e.jsx(t.p,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},transition:{delay:.7},className:"text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed text-center lg:text-left text-balance",children:a("about.description1")}),e.jsx(t.p,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},transition:{delay:.8},className:"text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed text-center lg:text-left text-balance",children:a("about.description2")})]}),e.jsx(t.div,{initial:{opacity:0,y:30},whileInView:{opacity:1,y:0},transition:{delay:.9},className:"space-y-4 sm:space-y-6",children:d.map((i,s)=>e.jsxs(t.div,{initial:{opacity:0,x:-20},whileInView:{opacity:1,x:0},transition:{delay:1+s*.1},whileHover:{x:10,transition:{duration:.2}},className:"group cursor-pointer",children:[e.jsxs("div",{className:"flex items-center justify-between mb-2 sm:mb-3",children:[e.jsxs("div",{className:"flex items-center gap-2 sm:gap-3",children:[e.jsx(t.div,{whileHover:{scale:1.2,rotate:10},transition:{duration:.2},children:e.jsx(i.icon,{className:"w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white transition-colors"})}),e.jsx("span",{className:"font-semibold text-black dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors text-sm sm:text-base",children:i.title})]}),e.jsxs("span",{className:"text-gray-600 dark:text-gray-400 text-xs sm:text-sm group-hover:text-gray-800 dark:group-hover:text-gray-300 transition-colors",children:[i.percentage,"%"]})]}),e.jsx("div",{className:"w-full bg-gray-200 dark:bg-gray-800 rounded-full h-1.5 sm:h-2 overflow-hidden",children:e.jsx(t.div,{initial:{width:0},whileInView:{width:`${i.percentage}%`},transition:{delay:1.2+s*.1,duration:1.2,ease:"easeOut"},className:"bg-black dark:bg-white h-1.5 sm:h-2 rounded-full relative",children:e.jsx(t.div,{animate:{x:["-100%","100%"]},transition:{duration:2,repeat:1/0,ease:"easeInOut",delay:1.5+s*.1},className:"absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-black/30 to-transparent"})})}),e.jsx("p",{className:"text-xs sm:text-sm text-gray-500 dark:text-gray-500 mt-1 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors",children:i.desc})]},i.title))}),e.jsx(t.div,{initial:{opacity:0,y:30},whileInView:{opacity:1,y:0},transition:{delay:1.5},className:"flex justify-center lg:justify-start pt-6",children:e.jsxs("div",{className:"about-buttons flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto",children:[e.jsxs(t.a,{href:"https://www.linkedin.com/in/theo-blondel-6952432aa/",target:"_blank",rel:"noopener noreferrer",whileHover:{scale:1.02,y:-2},whileTap:{scale:.98},className:"primary-button bg-black dark:bg-white text-white dark:text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium flex items-center justify-center gap-3 hover:bg-gray-800 dark:hover:bg-gray-200 transition-all group text-sm sm:text-base flex-1 sm:flex-none",children:[e.jsx(v,{className:"w-4 h-4 sm:w-5 sm:h-5"}),a("about.learnMore"),e.jsx(t.div,{whileHover:{x:5},transition:{duration:.2},children:e.jsx(g,{className:"w-4 h-4 sm:w-5 sm:h-5"})})]}),e.jsxs(t.button,{onClick:x,whileHover:{scale:1.02,y:-2},whileTap:{scale:.98},className:"ugly-mode-button border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium flex items-center justify-center gap-3 hover:border-black dark:hover:border-white hover:bg-gray-50 dark:hover:bg-gray-900 transition-all group text-sm sm:text-base flex-1 sm:flex-none",children:[e.jsx(f,{className:"w-4 h-4 sm:w-5 sm:h-5"}),a("about.whatAmIFor")]})]})})]}),e.jsx(t.div,{initial:{opacity:0,x:50},whileInView:{opacity:1,x:0},transition:{duration:.8},viewport:{once:!0},className:"relative order-first lg:order-last",children:e.jsxs("div",{className:"relative w-full max-w-sm sm:max-w-lg mx-auto",children:[e.jsx(t.div,{animate:{y:[0,-15,0]},transition:{duration:8,repeat:1/0,ease:"easeInOut"},whileHover:{scale:1.02,transition:{duration:.3}},className:"aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl cursor-pointer border-4 border-gray-100 dark:border-gray-800",children:e.jsx(u,{src:"/theo1photo.png",alt:"Theo Blondel Illustration",className:"w-full h-full object-cover"})}),e.jsx(t.div,{initial:{opacity:0,scale:.8},whileInView:{opacity:1,scale:1},transition:{delay:.5,duration:.5},whileHover:{scale:1.05,y:-5,rotate:2},className:"absolute -bottom-4 -right-4 sm:-bottom-8 sm:-right-8 bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-xl border border-gray-100 dark:border-gray-800 cursor-pointer",children:e.jsxs(t.div,{animate:{y:[0,-12,0],rotate:[0,5,0]},transition:{duration:7,repeat:1/0,ease:"easeInOut"},className:"text-center",children:[e.jsx("div",{className:"text-xl sm:text-3xl font-bold text-black dark:text-white mb-1",children:"5+"}),e.jsx("div",{className:"text-xs sm:text-sm text-gray-600 dark:text-gray-400",children:"Years Experience"})]})}),e.jsx(t.div,{initial:{opacity:0,scale:.8},whileInView:{opacity:1,scale:1},transition:{delay:.7,duration:.5},whileHover:{scale:1.05,y:-5,rotate:-2},className:"absolute -top-3 -left-3 sm:-top-6 sm:-left-6 bg-black dark:bg-white text-white dark:text-black rounded-lg sm:rounded-xl p-2 sm:p-4 shadow-xl cursor-pointer",children:e.jsxs(t.div,{animate:{x:[0,8,0],rotate:[0,-3,0]},transition:{duration:9,repeat:1/0,ease:"easeInOut"},className:"text-center",children:[e.jsx("div",{className:"text-base sm:text-lg font-bold",children:"220+"}),e.jsx("div",{className:"text-xs opacity-80",children:"Projects"})]})})]})})]})}),e.jsx(b,{children:c&&e.jsx(t.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"fixed inset-0 z-50 flex items-end justify-center p-4 pointer-events-none",children:e.jsx(t.div,{initial:{y:100,scale:.9},animate:{y:0,scale:1},exit:{y:100,scale:.9},transition:{type:"spring",stiffness:300,damping:25},className:"bg-white dark:bg-gray-900 rounded-t-3xl p-8 max-w-2xl w-full shadow-2xl border-t-4 border-blue-500 pointer-events-auto",children:e.jsxs("div",{className:"text-center",children:[e.jsx(t.div,{animate:{rotate:[0,10,-10,0],scale:[1,1.1,1]},transition:{duration:.5,repeat:1/0},className:"text-6xl mb-6",children:"🤮"}),e.jsx("h3",{className:"text-2xl sm:text-3xl font-bold text-black dark:text-white mb-4",children:"Alors, qu'est-ce que tu en penses ?"}),e.jsx("p",{className:"text-gray-600 dark:text-gray-400 mb-8 text-lg",children:"Tu viens de voir ce que ça aurait donné si j’avais continué dans un style PowerPoint corporate des années 2010."}),e.jsxs("div",{className:"flex flex-col sm:flex-row gap-4 justify-center",children:[e.jsx(t.button,{onClick:m,whileHover:{scale:1.05,y:-2},whileTap:{scale:.95},className:"bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-medium flex items-center justify-center gap-3 transition-all shadow-lg text-lg",children:"🔙 Revenir à mon vrai travail"}),e.jsx(t.button,{onClick:p,whileHover:{scale:1.05,y:-2},whileTap:{scale:.95},className:"bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full font-medium flex items-center justify-center gap-3 transition-all shadow-lg text-lg",children:"🪦 Restons sur ce magnifique site"})]})]})})})})]})}export{T as default};
