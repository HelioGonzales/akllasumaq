"use strict";(self.webpackChunkakllasumaq=self.webpackChunkakllasumaq||[]).push([[478],{9478:(y,n,a)=>{a.r(n),a.d(n,{HomeModule:()=>C});var i=a(6814),r=a(4670),m=a(8645),u=a(9773),e=a(4946),p=a(3197);let d=(()=>{class t{static#e=this.\u0275fac=function(o){return new(o||t)};static#t=this.\u0275cmp=e.Xpm({type:t,selectors:[["app-hero"]],decls:6,vars:0,consts:[["id","hero",1,"hero"],[1,"hero-image"],[1,"hero-image-opacity"],[1,"hero-image-title"]],template:function(o,c){1&o&&(e.TgZ(0,"section",0)(1,"article",1)(2,"aside",2)(3,"div")(4,"h2",3),e._uU(5,"Bienvenidos a Akllasumaq"),e.qZA()()()()())}})}return t})(),g=(()=>{class t{static#e=this.\u0275fac=function(o){return new(o||t)};static#t=this.\u0275cmp=e.Xpm({type:t,selectors:[["app-welcome"]],decls:13,vars:0,consts:[["id","welcome",1,"welcome","section","container","full-lg-screen"],[1,"text-center"],["src","../../../../assets/images/patty_rivas.jpg","alt","Patricia Rivas",1,"welcome-image"]],template:function(o,c){1&o&&(e.TgZ(0,"section",0)(1,"article")(2,"aside",1)(3,"h1"),e._uU(4,"Saluda y belleza de la Piel"),e.qZA(),e._UZ(5,"br"),e.TgZ(6,"h2"),e._uU(7,"Cosmetica Natural"),e.qZA(),e._UZ(8,"br"),e.TgZ(9,"p"),e._uU(10," Desde la antig\xfcedad, las personas han confiado su Belleza y Cuidado Personal a lo que nos ofrece la Naturaleza. Es por eso que en Akllasumaq tenemos una l\xednea de productos Hechos a Mano, elaborados con Activos 100% Naturales, que marcan la diferencia en el mundo de la Belleza y han demostrado sus beneficios en la Piel, durante el tiempo que hemos descubierto sus propiedades y lo demuestra la satisfacci\xf3n de nuestros clientes. "),e.qZA()()(),e.TgZ(11,"article"),e._UZ(12,"img",2),e.qZA()())}})}return t})();function h(t,l){if(1&t&&(e.TgZ(0,"div",6)(1,"div",7),e._UZ(2,"img",8),e.qZA()()),2&t){const s=l.$implicit;e.xp6(1),e.Q6J("routerLink","/products/categories/"+s._id),e.xp6(1),e.Q6J("src",s.image,e.LSH)("alt",s.name)}}function f(t,l){if(1&t&&(e.TgZ(0,"div",2)(1,"h2",3),e._uU(2,"Productos"),e.qZA(),e._UZ(3,"br"),e.TgZ(4,"div",4),e.YNc(5,h,3,3,"div",5),e.qZA()()),2&t){const s=e.oxw();e.xp6(5),e.Q6J("ngForOf",s.categories)}}let v=(()=>{class t{constructor(){this.categories=[]}static#e=this.\u0275fac=function(o){return new(o||t)};static#t=this.\u0275cmp=e.Xpm({type:t,selectors:[["app-products-home"]],inputs:{categories:"categories"},decls:2,vars:1,consts:[[1,"products-carousel","section","bg-green-light","full-lg-screen"],["class","container",4,"ngIf"],[1,"container"],[1,"text-center","section-title"],[1,"row"],["class","col-md-4",4,"ngFor","ngForOf"],[1,"col-md-4"],[1,"card","category-card",3,"routerLink"],[1,"card-img-top",3,"src","alt"]],template:function(o,c){1&o&&(e.TgZ(0,"section",0),e.YNc(1,f,6,1,"div",1),e.qZA()),2&o&&(e.xp6(1),e.Q6J("ngIf",c.categories))},dependencies:[i.sg,i.O5,r.rH]})}return t})();const Z=[{path:"",component:(()=>{class t{constructor(s){this.categoriesSvc=s,this.categories=[],this.endSubs$=new m.x}ngOnInit(){this._getCategories()}_getCategories(){this.categoriesSvc.getCategories().pipe((0,u.R)(this.endSubs$)).subscribe(s=>{this.categories=s})}ngOnDestroy(){this.endSubs$.next(),this.endSubs$.complete()}static#e=this.\u0275fac=function(o){return new(o||t)(e.Y36(p.G))};static#t=this.\u0275cmp=e.Xpm({type:t,selectors:[["app-home"]],decls:3,vars:1,consts:[[3,"categories"]],template:function(o,c){1&o&&e._UZ(0,"app-hero")(1,"app-welcome")(2,"app-products-home",0),2&o&&(e.xp6(2),e.Q6J("categories",c.categories))},dependencies:[d,g,v]})}return t})()}];let C=(()=>{class t{static#e=this.\u0275fac=function(o){return new(o||t)};static#t=this.\u0275mod=e.oAB({type:t});static#o=this.\u0275inj=e.cJS({imports:[i.ez,r.Bz.forChild(Z)]})}return t})()}}]);