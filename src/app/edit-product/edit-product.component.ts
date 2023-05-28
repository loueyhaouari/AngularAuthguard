import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit{
productId!:string;
product!:Product;
productFormGroup!:FormGroup;
//route:ActivatedRoute pour récupérer l'id
  //pur ultiliser le service ProdService dans le code HTML il faut mettre public
  constructor(private route:ActivatedRoute,public prodService:ProductService,private fb:FormBuilder) {
  this.productId=this.route.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.prodService.getProduct(this.productId).subscribe({
      next:(product)=>{
        this.product=product;
        this.productFormGroup=this.fb.group({
          name:this.fb.control(this.product.name,[Validators.required,Validators.minLength(4)]),
          price:this.fb.control(this.product.price,[Validators.required,Validators.min(200)]),
          promotion:this.fb.control(this.product.promotion,[Validators.required]),

        })
      },error:err => {
        console.log(err);
      }
    })
  }

//map on l'utilise pour parcourir la  liste des produits
  handleUpdateProduct() {

let p=this.productFormGroup.value;
p.id=this.product.id;
this.prodService.updateProduct(p).subscribe({
  next:(prod)=>{
    alert("Product Updated success")
  },error:err => {
    console.log(err);
  }
})
  }
}
