"use strict";(self.webpackChunkakllasumaq=self.webpackChunkakllasumaq||[]).push([[771],{8771:(A,g,s)=>{s.r(g),s.d(g,{ProductsModule:()=>q});var r=s(6814),m=s(8645),a=s(9773),t=s(4946),v=s(3197),h=s(2239),u=s(1365),n=s(95),_=s(7422);function f(e,d){if(1&e){const o=t.EpF();t.TgZ(0,"div",3)(1,"div",4),t._UZ(2,"img",5),t.TgZ(3,"div",6)(4,"h5",7),t._uU(5),t.qZA(),t.TgZ(6,"p",8),t._uU(7),t.qZA(),t.TgZ(8,"button",9),t._uU(9,"Ver m\xe1s"),t.qZA(),t.TgZ(10,"button",10),t.NdJ("click",function(){const p=t.CHM(o).$implicit,l=t.oxw(2);return t.KtG(l.addProductToCart(p.id))}),t._uU(11,"Add to Cart"),t.qZA()()()()}if(2&e){const o=d.$implicit;t.xp6(2),t.Q6J("routerLink","/products/"+o.id)("src",o.image,t.LSH),t.xp6(3),t.Oqu(o.name),t.xp6(2),t.Oqu(o.description),t.xp6(1),t.Q6J("routerLink","/products/"+o.id)}}function C(e,d){if(1&e&&(t.TgZ(0,"div",1),t.YNc(1,f,12,5,"div",2),t.qZA()),2&e){const o=t.oxw();t.xp6(1),t.Q6J("ngForOf",o.products)}}let Z=(()=>{class e{constructor(o){this.cartSvc=o,this.products=[]}addProductToCart(o){this.cartSvc.setCartItems({productId:o,quantity:1})}static#t=this.\u0275fac=function(c){return new(c||e)(t.Y36(_.N))};static#o=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-product-list"]],inputs:{products:"products"},decls:1,vars:1,consts:[["class","row",4,"ngIf"],[1,"row"],["class","col-md-4",4,"ngFor","ngForOf"],[1,"col-md-4"],[1,"card","product-card","bg-card"],["alt","Cosmetic Product",1,"card-img-top",3,"routerLink","src"],[1,"card-body"],[1,"card-title"],[1,"card-text"],[1,"btn","m-2",3,"routerLink"],[1,"btn",3,"click"]],template:function(c,i){1&c&&t.YNc(0,C,2,1,"div",0),2&c&&t.Q6J("ngIf",i.products)},dependencies:[r.sg,r.O5,u.rH]})}return e})();function x(e,d){if(1&e){const o=t.EpF();t.TgZ(0,"li")(1,"input",11),t.NdJ("ngModelChange",function(i){const l=t.CHM(o).$implicit;return t.KtG(l.checked=i)})("change",function(){t.CHM(o);const i=t.oxw(2);return t.KtG(i.categoryFilter())}),t.qZA(),t._uU(2),t.qZA()}if(2&e){const o=d.$implicit;t.xp6(1),t.Q6J("ngModel",o.checked),t.xp6(1),t.hij("",o.name," ")}}function T(e,d){if(1&e&&(t.TgZ(0,"div",3)(1,"div",7)(2,"ul",9),t.YNc(3,x,3,2,"li",10),t.qZA()()()),2&e){const o=t.oxw();t.xp6(3),t.Q6J("ngForOf",o.categories)}}function y(e,d){if(1&e){const o=t.EpF();t.TgZ(0,"div",1)(1,"div",2)(2,"div",3)(3,"div",4),t._UZ(4,"img",5),t.qZA(),t.TgZ(5,"div",4)(6,"div",3)(7,"div",6)(8,"h3",7),t._uU(9),t.qZA()(),t.TgZ(10,"div",8)(11,"p"),t._uU(12),t.qZA()(),t.TgZ(13,"div",8)(14,"div",3)(15,"div",9)(16,"label",10),t._uU(17,"Price"),t.qZA(),t.TgZ(18,"div",11),t._uU(19),t.ALo(20,"currency"),t.qZA()()()(),t.TgZ(21,"div",8)(22,"div",3)(23,"div",9)(24,"label",12),t._uU(25,"Quantity"),t.qZA(),t.TgZ(26,"input",13),t.NdJ("ngModelChange",function(i){t.CHM(o);const p=t.oxw();return t.KtG(p.quanity=i)}),t.qZA()()()(),t.TgZ(27,"div",14)(28,"button",15),t._uU(29,"Buy now"),t.qZA(),t.TgZ(30,"button",16),t.NdJ("click",function(){t.CHM(o);const i=t.oxw();return t.KtG(i.addProductToCart())}),t._uU(31,"Add to cart"),t.qZA()()()()()()()}if(2&e){const o=t.oxw();t.xp6(4),t.Q6J("src",o.product.image,t.LSH)("alt",o.product.name),t.xp6(5),t.Oqu(o.product.name),t.xp6(3),t.Oqu(o.product.description),t.xp6(7),t.Oqu(t.xi3(20,6,o.product.price,"PEN")),t.xp6(7),t.Q6J("ngModel",o.quanity)}}const P=[{path:"",component:(()=>{class e{constructor(o,c,i){this.categoriesSvc=o,this.productsSvc=c,this.activatedRoute=i,this.categories=[],this.products=[],this.endSubs$=new m.x}ngOnInit(){this.activatedRoute.params.subscribe(o=>{o.categoryid?this._getProducts([o.categoryid]):this._getProducts()}),this._getCategories()}_getCategories(){this.categoriesSvc.getCategories().pipe((0,a.R)(this.endSubs$)).subscribe(o=>{this.categories=o})}_getProducts(o){this.productsSvc.getProducts(o).pipe((0,a.R)(this.endSubs$)).subscribe(c=>{this.products=c})}categoryFilter(){const o=this.categories.filter(c=>c.checked).map(c=>c._id);this._getProducts(o)}ngOnDestroy(){this.endSubs$.next(),this.endSubs$.complete()}static#t=this.\u0275fac=function(c){return new(c||e)(t.Y36(v.G),t.Y36(h.s),t.Y36(u.gz))};static#o=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-products"]],decls:15,vars:2,consts:[[1,"section"],[1,"container"],[1,"text-center","section-title"],[1,"row"],[1,"col-md-3"],["class","row",4,"ngIf"],[1,"col-md-9"],[1,"col-md-12"],[3,"products"],[2,"list-style-type","none"],[4,"ngFor","ngForOf"],["type","checkbox",1,"me-2",3,"ngModel","ngModelChange","change"]],template:function(c,i){1&c&&(t.TgZ(0,"section",0)(1,"div",1)(2,"h2",2),t._uU(3,"Nuestros productos"),t.qZA(),t.TgZ(4,"div",3)(5,"div",4)(6,"div")(7,"h4"),t._uU(8,"Categorias"),t.qZA(),t._UZ(9,"br"),t.YNc(10,T,4,1,"div",5),t.qZA()(),t.TgZ(11,"div",6)(12,"div",3)(13,"div",7),t._UZ(14,"app-product-list",8),t.qZA()()()()()()),2&c&&(t.xp6(10),t.Q6J("ngIf",i.categories),t.xp6(4),t.Q6J("products",i.products))},dependencies:[r.sg,r.O5,n.Wl,n.JJ,n.On,Z]})}return e})()},{path:":productid",component:(()=>{class e{constructor(o,c,i){this.activatedRoute=o,this.productsSvc=c,this.cartSvc=i,this.quanity=1,this.endSubs$=new m.x}ngOnInit(){this.activatedRoute.params.subscribe(o=>{this.productid=o.productid}),this._getProduct(this.productid)}addToCart(){}_getProduct(o){this.productsSvc.getProduct(o).pipe((0,a.R)(this.endSubs$)).subscribe(c=>{this.product=c})}addProductToCart(){this.cartSvc.setCartItems({productId:this.product.id,quantity:this.quanity})}ngOnDestroy(){this.endSubs$.next(),this.endSubs$.complete()}static#t=this.\u0275fac=function(c){return new(c||e)(t.Y36(u.gz),t.Y36(h.s),t.Y36(_.N))};static#o=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-description"]],decls:1,vars:1,consts:[["class","section",4,"ngIf"],[1,"section"],[1,"container","bg-description"],[1,"row"],[1,"col-md-6"],[3,"src","alt"],[1,"col-md-12","pt-3","pb-3"],[1,"text-center"],[1,"col-md-12","p-3"],[1,"col-md-4"],["for","priceProduct",1,"form-label"],["id","priceProduct"],["for","productQuantity",1,"form-label"],["id","productQuantity","type","number","min","1","max","100",1,"form-control",3,"ngModel","ngModelChange"],[1,"col-md-12"],[1,"btn","me-2"],[1,"btn",3,"click"]],template:function(c,i){1&c&&t.YNc(0,y,32,9,"div",0),2&c&&t.Q6J("ngIf",i.product)},dependencies:[r.O5,n.Fj,n.wV,n.JJ,n.qQ,n.Fd,n.On,r.H9]})}return e})()}];let q=(()=>{class e{static#t=this.\u0275fac=function(c){return new(c||e)};static#o=this.\u0275mod=t.oAB({type:e});static#c=this.\u0275inj=t.cJS({providers:[v.G],imports:[r.ez,u.Bz.forChild(P),n.u5]})}return e})()}}]);