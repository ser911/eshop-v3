import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category';
import { W_ProductsService } from '../../services/w-products.service';
import { W_Product } from '../../models/w-product';

@Component({
  selector: 'eshop-frontend-carousel-products-brands',
  templateUrl: './carousel-products-brands.component.html',
  styles: [
  ]
})
export class CarouselProductsBrandsComponent implements OnInit {
  isChecked = false;
  binaryProp = true;
  currentId: string;
  brandName: string;
  @Input() product: Product;
  products: Product[] = [];
  wProds: Product[] = [];
  brandAllProds: Product[] = [];
  filteredProducts: Product[] = [];
  w_filteredProducts: Product[] = [];
  firstFilter : Product[] = [];
  secondFilter : Product[]  = [];
  categories: Category[] = [];
  selectedAny = false;
  selected_1 = false;
  selected_2 = false;



  constructor(private route: ActivatedRoute,
    private productsService: ProductsService,
    private catService : CategoriesService,) { }

  ngOnInit(): void {
    this._retrieveId();
    this._getCategories();
    this._getMProdByBrand();
    this._getWprodByBrand();
    this._distributeProds();
  }


  private _retrieveId(){
    this.route.params.subscribe((params)=>{
       this.currentId = params.brandId;
       this.brandName = params.brandName;
      //  console.log(this.currentId);    
      //  console.log(this.brandName);   
       })
  }

  private _getCategories(){
    this.catService.getCategories().subscribe(resCats =>{
      this.categories = resCats;
    })
  }

  private _getMProdByBrand(categoriesFilter?: string[]){
    this.productsService.getMProducts(categoriesFilter).subscribe((products)=>{
      this.products = products;
      console.log(this.products);
      
  
       let filteredByBrand = [];
       filteredByBrand = this.products.filter(prod => prod.brand === this.currentId);
       console.log(filteredByBrand);
       

    
      // this.filteredProducts = filteredByBrand;
     
      const uniqueProds = [...filteredByBrand.reduce((map, obj) => map.set(obj.name, obj), new Map()).values()];
      console.log(uniqueProds);
      

      for (let i = 0; i < uniqueProds.length; i++) {
        this.brandAllProds.push(uniqueProds[i])
         
       }
      
      // filteredByBrand = uniqueProds;
      // console.log(filteredByBrand);
      

    });    
  }

  private _getWprodByBrand(categoriesFilter?: string[]){
         
      
    this.productsService.getWProducts(categoriesFilter).subscribe((products)=>{
      this.wProds = products;
      console.log(this.wProds);
      
    let filteredByBrand = [];        
    filteredByBrand = this.wProds.filter(prod => prod.brand === this.currentId)
    console.log(filteredByBrand);
    

    // this.w_filteredProducts = filteredByBrand;

    const uniqueProds = [...filteredByBrand.reduce((map, obj) => map.set(obj.name, obj), new Map()).values()];
    console.log(uniqueProds);

    // this.w_filteredProducts = w_uniqueProds;

    for (let i = 0; i < uniqueProds.length; i++) {
     this.brandAllProds.push(uniqueProds[i])
      
    }
    console.log(this.brandAllProds);
    
    })
  }

  private _distributeProds(){
    
  }

  menOnly(){
    // if(this.selected_1){
    //   this.selected_1 = false;
    // }else{

    //   this.selected_1 = true;
    //   this.firstFilter =  this.filteredProducts.filter((x)=> x.sex === 'M');
    //     console.log(this.firstFilter);
    // }
     
  }
  womenOnly(){
    if(this.selected_2){
      this.selected_2 = false;
    }else{

      this.selected_2 = true;
      this.secondFilter =  this.filteredProducts.filter((x)=> x.sex === 'F');
      console.log(this.secondFilter);
    }
  }



}
