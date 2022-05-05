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
  wProds: W_Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];

  constructor(private route: ActivatedRoute,
    private productsService: ProductsService,
    private catService : CategoriesService,) { }

  ngOnInit(): void {
    this._retrieveId();
  }


  private _retrieveId(){
    this.route.params.subscribe((params)=>{
       this.currentId = params.brandId;
       this.brandName = params.brandName;
       console.log(this.currentId);    
       console.log(this.brandName);   
       })
  }
}
