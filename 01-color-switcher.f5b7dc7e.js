const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),o=document.querySelector("body");let n=null;t.addEventListener("click",(()=>{t.disabled=!0,n=setInterval((()=>{const t=`#${Math.floor(16777215*Math.random()).toString(16)}`;o.style.backgroundColor=t}),1e3)})),e.addEventListener("click",(()=>{t.disabled=!1,clearInterval(n)}));
//# sourceMappingURL=01-color-switcher.f5b7dc7e.js.map
